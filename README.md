# Tiina's CV Chatbot

A bilingual portfolio chatbot with a React/Vite frontend, FastAPI backend, OpenAI Responses API and a Resend-powered contact form.

## Run locally

1. Copy `.env.example` to `.env` and fill in the backend values. Copy `frontend/.env.example` to `frontend/.env` and set the deployed API URL. `RESEND_FROM` must use a sender/domain verified in Resend.
2. Create and activate a Python virtual environment, then install backend dependencies:

   ```powershell
   py -m venv backend\.venv
   .\backend\.venv\Scripts\Activate.ps1
   pip install -r backend\requirements.txt
   cd backend
   uvicorn app.main:app --reload
   ```

3. In another terminal, start the frontend:

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Configuration

- `OPENAI_API_KEY`: server-only OpenAI API key.
- `OPENAI_MODEL`: defaults to `gpt-4o-mini`.
- `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO_EMAIL`: enable the contact form email.
- `FRONTEND_ORIGIN`: the only browser origin permitted to call the API.
- `frontend/.env` / `VITE_API_URL`: public backend URL used by the browser.

The backend reads `me/summary.txt` and `me/linkedin.pdf` as the CV chatbot's source material. Keep personal API keys out of the frontend and out of Git.
