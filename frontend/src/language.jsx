import { useState } from 'react'

const LANGUAGE_KEY = 'tiina-portfolio-language'

function initialLanguage() {
  try { return localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'fi' } catch { return 'fi' }
}

export function useLanguage() {
  const [language, setLanguageState] = useState(initialLanguage)
  const setLanguage = (next) => {
    setLanguageState(next)
    try { localStorage.setItem(LANGUAGE_KEY, next) } catch {}
    document.documentElement.lang = next
  }
  return [language, setLanguage]
}

export function LanguageSwitch({ language, onChange }) {
  return <div className="language" aria-label="Language selection">
    <button type="button" className={language === 'fi' ? 'active' : ''} onClick={() => onChange('fi')} aria-pressed={language === 'fi'}>FI</button>
    <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => onChange('en')} aria-pressed={language === 'en'}>EN</button>
  </div>
}
