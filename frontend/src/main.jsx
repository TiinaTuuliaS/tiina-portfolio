import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import CvPage from './CvPage'
import CvChatbotPage from './CvChatbotPage'
import DreamlandCasePage from './DreamlandCasePage'
import ResearchAssistantCasePage from './ResearchAssistantCasePage'
import VisualWorkPage from './VisualWorkPage'
import './styles.css'
import './portrait.css'
import './skills.css'
import './palette.css'
import './cv.css'
import './chat.css'
import './chatbot-case.css'
import './dreamland-case.css'
import './research-case.css'
import './visual-work.css'
import './emoji.css'
import './electric-peach.css'
import './editorial-theme.css'

const currentPath = window.location.pathname.replace(/\/$/, '')

createRoot(document.getElementById('root')).render(
  <StrictMode>{currentPath === '/cv' ? <CvPage /> : currentPath === '/visual-work' ? <VisualWorkPage /> : currentPath === '/projects/cv-chatbot' ? <CvChatbotPage /> : currentPath === '/projects/dreamland-v2' ? <DreamlandCasePage /> : currentPath === '/projects/research-assistant' ? <ResearchAssistantCasePage /> : <App />}</StrictMode>,
)
