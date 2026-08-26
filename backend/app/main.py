import html
import os
from pathlib import Path

import resend
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel, EmailStr, Field
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[2]
load_dotenv(ROOT / ".env")


class ChatMessage(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    history: list[ChatMessage] = Field(default_factory=list, max_length=16)
    language: str = Field(default="fi", pattern="^(fi|en)$")


class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    message: str = Field(min_length=5, max_length=2000)


def load_profile() -> str:
    summary = (ROOT / "me" / "summary.txt").read_text(encoding="utf-8")
    pdf_text = ""
    try:
        reader = PdfReader(ROOT / "me" / "linkedin.pdf")
        pdf_text = "\n".join(page.extract_text() or "" for page in reader.pages)
    except Exception:
        # The written summary is enough for local development if the PDF is absent.
        pass
    return f"## Summary\n{summary}\n\n## LinkedIn profile\n{pdf_text}"


PROFILE = load_profile()
app = FastAPI(title="Tiina's CV Chatbot API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


def instructions(language: str) -> str:
    language_rule = "Respond in English." if language == "en" else "Vastaa aina suomeksi."
    return f"""You are Tiina Siremaa's CV chatbot on her portfolio site.
{language_rule}
Answer faithfully and only from the profile below about Tiina's background, skills,
experience and projects. Be warm, concise and helpful to a potential employer or client.
If the information is not in the profile, say that you do not know. Never invent facts.
If someone wants to contact Tiina, invite them to use the contact form in the page.

{PROFILE}"""


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/chat")
def chat(request: ChatRequest) -> dict[str, str]:
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(503, "Chat is not configured yet.")
    try:
        messages = [message.model_dump() for message in request.history]
        messages.append({"role": "user", "content": request.message})
        response = OpenAI().responses.create(
            model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            instructions=instructions(request.language),
            input=messages,
            store=False,
        )
        return {"message": response.output_text}
    except Exception as error:
        raise HTTPException(502, "The chat service is temporarily unavailable.") from error


@app.post("/api/contact")
async def contact(request: ContactRequest) -> dict[str, bool]:
    api_key = os.getenv("RESEND_API_KEY")
    recipient = os.getenv("CONTACT_TO_EMAIL")
    sender = os.getenv("RESEND_FROM")
    if not all([api_key, recipient, sender]):
        raise HTTPException(503, "Contact form is not configured yet.")

    resend.api_key = api_key
    safe_name = html.escape(request.name)
    safe_message = html.escape(request.message).replace("\n", "<br>")
    try:
        await resend.Emails.send_async({
            "from": sender,
            "to": [recipient],
            "reply_to": request.email,
            "subject": f"Portfolio contact: {request.name}",
            "html": f"<h2>New portfolio contact</h2><p><b>Name:</b> {safe_name}</p>"
                    f"<p><b>Email:</b> {request.email}</p><p>{safe_message}</p>",
        })
        return {"sent": True}
    except Exception as error:
        raise HTTPException(502, "The email could not be sent. Please try again shortly.") from error
