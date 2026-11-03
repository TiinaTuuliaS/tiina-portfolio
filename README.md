# Tiina Siremaa - Developer Portfolio

An interactive, bilingual portfolio built as a small product experience rather than a static list of links. It brings together selected full-stack projects, visual merchandising work, a responsive CV, direct contact options and an AI-powered CV chatbot.

The portfolio is available in Finnish and English. The selected language is retained locally while visitors move between pages.

## What visitors can do

- Explore the technical toolkit, background and selected work.
- Use the Finnish or English AI CV chatbot to ask about experience, projects and ways of working.
- Read, print or download the current CV.
- Read dedicated case pages for Dreamland v2, the AI Market Research Assistant, the portfolio CV chatbot, ha.ku and Konkari.
- Browse a separate Visual work archive of window displays, mannequin groups and in-store styling.
- Open demos and GitHub repositories where they are available.
- Send a message through the contact form.

## Portfolio projects

### Dreamland v2

A full-stack e-commerce application for a fictional jewellery brand. It includes customer registration and login, product categories, cart flows, discount coupons, Stripe Checkout, order confirmation emails and a role-protected admin dashboard for product management and sales analytics.

- [Live demo](https://verkkokauppa-projekti.onrender.com/)
- [GitHub repository](https://github.com/TiinaTuuliaS/dreamland-v2)

### AI Market Research Assistant

An experimental application in which three AI agents produce source-backed competitor comparisons and market overviews. The project focuses on source traceability, structured data flow and evaluation of system reliability. Public visitors can read two example reports; new research is limited to invited testers to keep experimental API costs manageable.

- [Live demo](https://airesearchassistant-production-967c.up.railway.app/)
- [GitHub repository](https://github.com/TiinaTuuliaS/ai_research_assistant)

### Portfolio & AI CV Chat

This portfolio is also a full-stack work sample. The chatbot answers from editable CV and project context, the contact form delivers messages through Resend, and the dedicated CV view can be printed or downloaded as a PDF.

- [GitHub repository](https://github.com/TiinaTuuliaS/tiina-portfolio)

### ha.ku - work in progress

A browser-based, Y2K-inspired music studio for composing beats, building ideas and saving sounds locally. A planned AI assistant will help users choose sound worlds that fit their chosen music style; it will support composition rather than compose for the user.

- [GitHub repository](https://github.com/TiinaTuuliaS/ha.kumusic)

### Konkari - work in progress

A hiking application that brings map data, national park destinations and hikers' observations into one view. The project explores practical map interactions, offline observations, community features and geospatial data.

- [GitHub repository](https://github.com/TiinaTuuliaS/Retkeilyapp)

### Visual work

A selected archive of visual merchandising work. The separate page shows window displays, mannequin groups, in-store styling and the connection between physical spatial storytelling and human-centred digital product thinking.

## Technology

### This portfolio

- React and Vite
- CSS-based responsive design system
- Python, FastAPI and Uvicorn
- OpenAI Responses API for the CV chatbot
- Resend for contact-form email delivery
- Docker and Railway for deployment

The chatbot uses the OpenAI Responses API directly. CrewAI belongs to the separate AI Market Research Assistant, not to this portfolio chatbot.

### Portfolio-wide technical themes

The featured work also demonstrates TypeScript, C#, Node.js, Express, NestJS, Azure, MongoDB, SQLite, SQLAlchemy, PostgreSQL, PostGIS, Pydantic, Web Audio API, IndexedDB, automated testing and integrations such as Stripe, Cloudinary and Redis.

## How the CV chatbot works

The FastAPI backend loads editable profile and project context from `me/summary.txt` and `me/projects.txt`. When a visitor asks a question, the backend sends the relevant context and conversation history to the OpenAI Responses API, then returns the answer to the React interface.

This keeps personal context and API keys on the server side: the browser never receives the OpenAI key. The chatbot has lightweight rate limits for both cost control and abuse prevention.

## Project structure

```text
frontend/                         React portfolio interface
  src/                            Pages, case studies, styles and language state
  public/                         Portfolio images, screenshots and downloadable CV PDF

backend/                          FastAPI application
  app/main.py                     Chat, contact and health API routes

me/                               Editable source material for the CV chatbot
  summary.txt                     Profile, experience and technical background
  projects.txt                    Project-specific context for chatbot answers
```

## Run locally

You need Node.js, npm and Python installed.

### 1. Create environment files

Copy the example files and add real keys only to `.env`. Never add keys to the frontend or commit them to Git.

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

## Updating content

- Update `me/summary.txt` and `me/projects.txt` when experience, projects or goals change. Restart the backend afterwards because it loads this context at startup.
- Update the home page, project cards and Tech universe in `frontend/src/App.jsx`.
- Update the CV in `frontend/src/CvPage.jsx`, its responsive styles in `frontend/src/cv.css`, and the downloadable PDF in `frontend/public/tiina-siremaa-cv.pdf`.
- Update the current hero image at `frontend/public/tiina-portrait-2026.jpeg`.
- Update case-study copy in the corresponding page component under `frontend/src/`.
- Update the visual merchandising archive in `frontend/src/VisualWorkPage.jsx` and `frontend/public/visual-work/`.

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

This repository is ready to deploy as two Railway services. Keeping the React site and the FastAPI backend separate means browser users never receive API keys, while the portfolio can still use the chat and contact form.

First, push these changes to GitHub. Railway deploys from the repository.

### 1. Backend service

Create a service called `backend` from this repository.

- Leave **Root Directory** empty (the repository root).
- Add the service variable `RAILWAY_DOCKERFILE_PATH=Dockerfile.backend`.
- Generate a public domain under **Networking**.
- Set **Healthcheck Path** to `/health`.

Then add the backend service variables:

```env
OPENAI_API_KEY=...
RESEND_API_KEY=...
RESEND_FROM=...
CONTACT_TO_EMAIL=...
FRONTEND_ORIGIN=https://${{frontend.RAILWAY_PUBLIC_DOMAIN}}
```

`OPENAI_MODEL` is optional; without it the backend uses `gpt-4o-mini`. Do not put API keys in GitHub or in frontend variables.

### 2. Frontend service

Create another service called `frontend` from the same repository.

- Set **Root Directory** to `/frontend`.
- Railway automatically finds `frontend/Dockerfile`.
- Generate a public domain under **Networking**.
- Add this variable:

```env
VITE_API_URL=https://${{backend.RAILWAY_PUBLIC_DOMAIN}}
```

`VITE_API_URL` is not a secret: it is the backend's public address. Vite reads it while building the site, so changing it requires a frontend redeploy. The included Caddy configuration also sends direct routes such as `/cv` and the case-study URLs back to the React app.
