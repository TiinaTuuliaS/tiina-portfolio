from dotenv import load_dotenv
from openai import OpenAI
import json
import os
import requests
from pypdf import PdfReader
import gradio as gr


load_dotenv(override=True)


def push(text):
    requests.post(
        "https://api.pushover.net/1/messages.json",
        data={
            "token": os.getenv("PUSHOVER_TOKEN"),
            "user": os.getenv("PUSHOVER_USER"),
            "message": text,
        }
    )


def record_user_details(email, name="Name not provided", notes="not provided"):
    push(f"Recording {name} with email {email} and notes {notes}")
    return {"recorded": "ok"}


def record_unknown_question(question):
    push(f"Recording {question}")
    return {"recorded": "ok"}


record_user_details_json = {
    "name": "record_user_details",
    "description": "Use this tool to record that a user is interested in being in touch and provided an email address",
    "parameters": {
        "type": "object",
        "properties": {
            "email": {"type": "string", "description": "The email address of this user"},
            "name": {"type": "string", "description": "The user's name, if they provided it"},
            "notes": {"type": "string", "description": "Any additional information about the conversation that's worth recording to give context"},
        },
        "required": ["email"],
        "additionalProperties": False
    }
}

record_unknown_question_json = {
    "name": "record_unknown_question",
    "description": "Always use this tool to record any question that couldn't be answered as you didn't know the answer",
    "parameters": {
        "type": "object",
        "properties": {
            "question": {"type": "string", "description": "The question that couldn't be answered"},
        },
        "required": ["question"],
        "additionalProperties": False
    }
}

tools = [
    {"type": "function", "function": record_user_details_json},
    {"type": "function", "function": record_unknown_question_json},
]


class Me:
    def __init__(self):
        self.openai = OpenAI()
        self.name = "Tiina Siremaa"

        reader = PdfReader("me/linkedin.pdf")
        self.linkedin = ""
        for page in reader.pages:
            text = page.extract_text()
            if text:
                self.linkedin += text

        with open("me/summary.txt", "r", encoding="utf-8") as f:
            self.summary = f.read()

    def handle_tool_call(self, tool_calls):
        results = []
        for tool_call in tool_calls:
            tool_name = tool_call.function.name
            arguments = json.loads(tool_call.function.arguments)
            print(f"Tool called: {tool_name}", flush=True)
            tool = globals().get(tool_name)
            result = tool(**arguments) if tool else {}
            results.append(
                {"role": "tool", "content": json.dumps(result), "tool_call_id": tool_call.id}
            )
        return results

    def system_prompt(self, language="fi"):
        if language == "en":
            lang_instruction = "Always respond in English."
            steer_instruction = (
                "If the user is engaging in discussion, try to steer them towards getting in touch via email; "
                "ask for their email and record it using your record_user_details tool."
            )
        else:
            lang_instruction = "Vastaa aina suomeksi."
            steer_instruction = (
                "Jos käyttäjä keskustelee pidempään, ohjaa ystävällisesti siihen että he ottavat yhteyttä sähköpostilla; "
                "pyydä sähköposti ja tallenna se record_user_details-työkalulla."
            )

        system_prompt = (
            f"You are acting as {self.name}. "
            f"{lang_instruction} "
            f"You are answering questions on {self.name}'s website, particularly questions related to "
            f"{self.name}'s career, background, skills and experience. "
            f"Your responsibility is to represent {self.name} as faithfully as possible. "
            f"You are given a summary of {self.name}'s background and LinkedIn profile which you can use to answer questions. "
            f"Be professional, engaging and friendly, as if talking to a potential client or future employer. "
            f"If you don't know the answer to any question, use your record_unknown_question tool to record the question. "
            f"{steer_instruction}"
        )

        system_prompt += f"\n\n## Summary:\n{self.summary}\n\n## LinkedIn Profile:\n{self.linkedin}\n\n"
        system_prompt += f"With this context, please chat with the user, always staying in character as {self.name}."
        return system_prompt

    def chat(self, message, history, language="fi"):
        history = history or []
        messages = (
            [{"role": "system", "content": self.system_prompt(language)}]
            + history
            + [{"role": "user", "content": message}]
        )

        done = False
        while not done:
            response = self.openai.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                tools=tools
            )

            if response.choices[0].finish_reason == "tool_calls":
                message_obj = response.choices[0].message
                tool_calls = message_obj.tool_calls
                results = self.handle_tool_call(tool_calls)
                messages.append(message_obj)
                messages.extend(results)
            else:
                done = True

        return response.choices[0].message.content


if __name__ == "__main__":
    me = Me()

    custom_css = """
body {
    background: #f5f7fb;
    margin: 0;
}

.app-wrap {
    max-width: 1400px;
    margin: 0 auto;
    padding: 18px;
    min-height: 100vh;
    align-items: stretch;
}

.left h1 {
    margin: 0 0 6px 0;
    font-size: 26px;
    line-height: 1.15;
}

.left p {
    margin: 0 0 10px 0;
    opacity: .85;
}

.link {
    display: inline-block;
    margin: 0 0 14px 0;
    text-decoration: none;
    border: 1px solid rgba(0,0,0,.12);
    border-radius: 999px;
    padding: 6px 10px;
    color: inherit;
    background: white;
}

.cards-title {
    margin: 8px 0 8px 0;
    font-weight: 600;
    opacity: .9;
}

.qgrid button {
    width: 100%;
    text-align: left;
    border-radius: 10px !important;
    padding: 6px 8px !important;
    min-height: 36px !important;
    font-size: 13px !important;
    line-height: 1.2 !important;
    border: 1px solid rgba(0,0,0,.10) !important;
}

.footer {
    margin-top: 10px;
    opacity: .72;
    font-size: 12px;
}

.fill-height {
    min-height: calc(100vh - 36px);
    display: flex;
    flex-direction: column;
}

.chat-shell {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

.chat-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    border-radius: 18px;
    border: 1px solid rgba(0,0,0,.08);
    background: rgba(255,255,255,.88);
    backdrop-filter: blur(6px);
    padding: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,.05);
}

/* Groupin sisin wrapper */
.chat-card > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

/* ChatInterface wrapperit */
.chat-card .gradio-container,
.chat-card .gr-block,
.chat-card [class*="wrap"],
.chat-card [class*="container"] {
    min-height: 0;
}

/* Varsinainen chatinterface kokonaisuutena */
.chat-card .gr-chat-interface,
.chat-card [class*="chat-interface"] {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

/* Varsinainen keskusteluikkuna */
.chat-card [data-testid="chatbot"],
.chat-card .chatbot {
    flex: 1 !important;
    min-height: 0 !important;
    height: 100% !important;
    overflow-y: auto !important;
}
"""

    texts = {
        "fi": {
            "title": "<h1>💬 Tiinan CV-chatbot</h1>",
            "description": "<p>Kysy minusta, osaamisestani ja projekteistani. Vastaan CV:n ja profiilitietojen pohjalta.</p>",
            "footer": """
                <div class="footer">
                  Vinkki: kysy konkreettisesti esim. “mitä teit viime projektissa?” tai “miksi olisit hyvä tähän rooliin?”.
                </div>
            """,
            "quick_title": "**Pikakysymykset:**",
            "placeholder": "Kirjoita kysymys ja paina Enter…",
            "linkedin_label": "🔗 LinkedIn",
        },
        "en": {
            "title": "<h1>💬 Tiina's CV Chatbot</h1>",
            "description": "<p>Ask about my background, skills and projects. I respond based on my CV and profile.</p>",
            "footer": """
                <div class="footer">
                  Tip: ask something concrete like “what did you do in your last project?” or “why would you fit this role?”.
                </div>
            """,
            "quick_title": "**Quick questions:**",
            "placeholder": "Type a question and press Enter…",
            "linkedin_label": "🔗 LinkedIn",
        }
    }

    quick_questions_fi = [
        "Kerro lyhyesti taustastasi ja vahvuuksistasi",
        "Mitä teknologioita käytät eniten ja missä olet vahvimmillasi?",
        "Miten sinuun saa parhaiten yhteyden?",
        "Miksi olisit hyvä juuri meidän tiimiin?",
    ]

    quick_questions_en = [
        "Briefly tell me your background and strengths",
        "Which technologies do you use most, and what are you strongest at?",
        "What’s the best way to reach you?",
        "Why would you be a great fit for our team?",
    ]

    def send_quick(question, history, lang):
        history = history or []
        assistant = me.chat(question, history, lang)
        new_history = history + [
            {"role": "user", "content": question},
            {"role": "assistant", "content": assistant},
        ]
        return new_history, ""

    def on_language_change(lang):
        qs = quick_questions_en if lang == "en" else quick_questions_fi
        updates = [gr.update(value=q) for q in qs]

        return (
            lang,
            *updates,
            gr.update(placeholder=texts[lang]["placeholder"]),
            gr.update(value=texts[lang]["title"]),
            gr.update(value=texts[lang]["description"]),
            gr.update(value=texts[lang]["footer"]),
            gr.update(value=texts[lang]["quick_title"]),
            gr.update(
                value=f"""
                <a class="link" href="https://www.linkedin.com/in/tiina-siremaa-7589a61b5/" target="_blank" rel="noopener noreferrer">
                  {texts[lang]["linkedin_label"]}
                </a>
                """
            ),
        )

    with gr.Blocks(theme=gr.themes.Soft(), css=custom_css) as demo:
        with gr.Row(elem_classes=["app-wrap"]):

            with gr.Column(scale=1, min_width=320, elem_classes=["left"]):
                title_html = gr.HTML(texts["fi"]["title"])
                desc_html = gr.HTML(texts["fi"]["description"])

                linkedin_html = gr.HTML(
                    f"""
                    <a class="link" href="https://www.linkedin.com/in/tiina-siremaa-7589a61b5/" target="_blank" rel="noopener noreferrer">
                      {texts["fi"]["linkedin_label"]}
                    </a>
                    """
                )

                github_html = gr.HTML(
                    """
                    <a class="link" href="https://github.com/TiinaTuuliaS" target="_blank" rel="noopener noreferrer">
                        💻 GitHub
                    </a>
                    """
                )

                language = gr.Radio(
                    choices=[("Suomi", "fi"), ("English", "en")],
                    value="fi",
                    label="Language / Kieli",
                )
                lang_state = gr.State("fi")

                quick_title_md = gr.Markdown(
                    texts["fi"]["quick_title"],
                    elem_classes=["cards-title"]
                )

                with gr.Row(elem_classes=["qgrid"]):
                    with gr.Column():
                        btns_left = [gr.Button(q) for q in quick_questions_fi[::2]]
                    with gr.Column():
                        btns_right = [gr.Button(q) for q in quick_questions_fi[1::2]]

                all_btns = btns_left + btns_right

                footer_html = gr.HTML(texts["fi"]["footer"])

            with gr.Column(scale=5, min_width=700, elem_classes=["fill-height"]):
                with gr.Group(elem_classes=["chat-shell"]):
                    with gr.Group(elem_classes=["chat-card"]):
                        chatbot_ui = gr.Chatbot(height="100%")

                        chat = gr.ChatInterface(
                            fn=lambda message, history, lang: me.chat(message, history, lang),
                            additional_inputs=[lang_state],
                            chatbot=chatbot_ui,
                            title=None,
                            description=None,
                            textbox=gr.Textbox(
                                placeholder=texts["fi"]["placeholder"],
                                autofocus=True,
                            ),
                        )

            language.change(
                fn=on_language_change,
                inputs=[language],
                outputs=[
                    lang_state,
                    *all_btns,
                    chat.textbox,
                    title_html,
                    desc_html,
                    footer_html,
                    quick_title_md,
                    linkedin_html,
                ],
            )

            for b in all_btns:
                b.click(
                    fn=send_quick,
                    inputs=[b, chatbot_ui, lang_state],
                    outputs=[chatbot_ui, chat.textbox],
                )

    demo.launch()