import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import CvPage from './CvPage'
import CvChatbotPage from './CvChatbotPage'
import './styles.css'
import './portrait.css'
import './skills.css'
import './palette.css'
import './cv.css'
import './chat.css'
import './chatbot-case.css'

const currentPath = window.location.pathname.replace(/\/$/, '')

createRoot(document.getElementById('root')).render(
  <StrictMode>{currentPath === '/cv' ? <CvPage /> : currentPath === '/projects/cv-chatbot' ? <CvChatbotPage /> : <App />}</StrictMode>,
)
