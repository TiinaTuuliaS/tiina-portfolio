# Tiina's Developer Portfolio

An interactive portfolio for getting to know me beyond a traditional CV. It brings together selected full-stack projects, a printable CV, direct contact options and an AI-powered chat that answers questions about my experience, work and way of thinking.

The goal is simple: make the portfolio feel like a small product experience, not just a list of links.

## Live experience

Visitors can:

- Explore my technical skills, background and selected work.
- Read the web-based CV, print it or download the original PDF.
- Ask the AI CV chat about my experience, projects or working style in Finnish or English.
- Explore Dreamland v2, a full-stack e-commerce case with links to its live demo and source code.
- Send a message through the contact form.

## Featured project

### Dreamland v2

A full-stack e-commerce application for a fictional jewellery brand. Customers can browse products by category, create an account, manage a cart, use discount coupons and complete a Stripe Checkout payment. The project also has a role-protected admin dashboard for managing products and sales analytics.

- [Live demo](https://verkkokauppa-projekti.onrender.com/)
- [GitHub repository](https://github.com/TiinaTuuliaS/dreamland-v2)

## Technology

### Frontend

- React
- Vite
- CSS

### Backend

- Python
- FastAPI
- Uvicorn

### AI and integrations

- OpenAI Responses API for the CV chatbot
- Resend for contact-form emails
- CrewAI is part of my wider AI development toolkit, but is not used by this chatbot implementation.

### Development

- Git and GitHub
- npm
- Python virtual environments

## How the CV chatbot works

The backend reads the editable profile text in `me/summary.txt` and supporting CV material. When a visitor asks a question, the FastAPI endpoint sends the relevant context and conversation history to the OpenAI Responses API. The answer is then returned to the React interface.

This keeps personal details and API keys on the server side — the browser never receives the OpenAI key.

## Project structure

```text
frontend/                   React portfolio interface
  src/                      Pages, components and styles
  public/                   Image assets and downloadable CV PDF

backend/                    FastAPI application
  app/main.py               Chat, contact and health API routes

me/                         Source material for the CV chatbot
  summary.txt               Main editable profile summary
  linkedin.pdf              Supporting profile information
```

## Run locally

You need Node.js, npm and Python installed.

### 1. Create environment files

Copy the example files and add your real keys only to `.env`. Never add keys to the frontend or commit them to Git.

```powershell
Copy-Item .env.example .env
Copy-Item frontend\.env.example frontend\.env
```

### 2. Install dependencies

```powershell
py -m venv backend\.venv
.\backend\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt

cd frontend
npm install
cd ..
```

### 3. Start the app

Open two terminals in the project root and run one command in each:

npm run dev:backend

npm run dev:frontend

Open the address Vite shows in the terminal, usually [http://localhost:5173](http://localhost:5173).

## Environment variables

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Server-only key for the AI CV chat |
| `OPENAI_MODEL` | OpenAI model used by the chat; defaults to `gpt-4o-mini` |
| `RESEND_API_KEY` | Server-only key for contact-form emails |
| `RESEND_FROM` | Verified Resend sender address |
| `CONTACT_TO_EMAIL` | Address that receives contact messages |
| `FRONTEND_ORIGIN` | Deployed frontend URL allowed by the API |
| `VITE_API_URL` | Public backend URL, stored in `frontend/.env` |

`RESEND_FROM` must use an address or domain verified in Resend. `.env` is ignored by Git; `.env.example` files are safe to commit because they contain no secrets.

## Updating the content

- Update `me/summary.txt` when your experience, projects or goals change. The CV chatbot uses it as its main source.
- Replace `frontend/public/tiina-portrait.png` when you want to update the hero image.
- Update visible portfolio copy, skills and project cards in `frontend/src/App.jsx`.
- Update the CV page in `frontend/src/CvPage.jsx` and its printable styles in `frontend/src/cv.css`.

## API routes

| Route | Purpose |
| --- | --- |
| `GET /health` | Simple backend health check |
| `POST /api/chat` | Sends a message and conversation history to the CV chatbot |
| `POST /api/contact` | Sends a contact form message through Resend |

## Public-use limits

To protect the OpenAI and email integrations from accidental or abusive use, the backend applies lightweight per-visitor limits: chat allows 8 messages per 10 minutes and 25 per rolling 24 hours, while the contact form allows 3 messages per hour. The first version stores these counters in the backend process, which is appropriate for this small portfolio. A persistent store such as Redis can be added later if traffic grows.

## Build for production

Create an optimized frontend build with:

```powershell
npm run build
```

The build output is created in `frontend/dist/`.

## Deploy on Railway

This repository is ready to deploy as two Railway services. Keeping the React
site and the FastAPI backend separate means browser users never receive API
keys, while the portfolio can still use the chat and contact form.

First, push these changes to GitHub. Railway deploys from the repository.

### 1. Backend service

Create a service called `backend` from this repository.

- Leave **Root Directory** empty (the repository root).
- Add the service variable `RAILWAY_DOCKERFILE_PATH=Dockerfile.backend`.
- Generate a public domain under **Networking**.
- Set **Healthcheck Path** to `/health`.

Then add your real values under the backend service's Variables:

```env
OPENAI_API_KEY=...
RESEND_API_KEY=...
RESEND_FROM=...
CONTACT_TO_EMAIL=...
FRONTEND_ORIGIN=https://${{frontend.RAILWAY_PUBLIC_DOMAIN}}
```

`OPENAI_MODEL` is optional; without it the backend uses `gpt-4o-mini`. Do not
put API keys in GitHub or in frontend variables.

### 2. Frontend service

Create another service called `frontend` from the same repository.

- Set **Root Directory** to `/frontend`.
- Railway automatically finds `frontend/Dockerfile`.
- Generate a public domain under **Networking**.
- Add this Variable:

```env
VITE_API_URL=https://${{backend.RAILWAY_PUBLIC_DOMAIN}}
```

`VITE_API_URL` is not a secret: it is the backend's public address. Vite reads
it while building the site, so changing it requires a frontend redeploy. The
included Caddy configuration also sends direct routes such as `/cv` back to the
React app.

After both domains exist, Railway resolves the service references above
automatically. If you choose different service names, replace `backend` and
`frontend` in the references with those names.
