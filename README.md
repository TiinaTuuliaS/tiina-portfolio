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

```powershell
npm run dev:backend
```

```powershell
npm run dev:frontend
```

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

## Build for production

Create an optimized frontend build with:

```powershell
npm run build
```

The build output is created in `frontend/dist/`.
