import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const copy = {
  fi: {
    nav: ['Minusta', 'Osaaminen', 'Ota yhteyttä'],
    eyebrow: 'OPEN TO WORK · AI & FULL-STACK',
    title: <>Hei, olen <em>Tiina.</em><br />Rakennan asioita,<br />jotka tuntuvat tulevaisuudelta.</>,
    intro: 'Visual merchandiserista full-stack-kehittäjäksi. Rakennan nyt LLM-sovelluksia ja etsin seuraavaa mahdollisuuttani teknologiassa.',
    chatTitle: 'Kysy minulta mitä vain',
    chatSubtitle: 'CV-chatbot · vastaa Tiinana',
    placeholder: 'Kirjoita kysymys...',
    send: 'Lähetä',
    quick: ['Kerro vahvuuksistasi', 'Mitä teknologioita käytät?', 'Miksi sopisit tiimiimme?', 'Kerro viimeisimmistä projekteistasi'],
    skills: 'Tech universe', contact: 'Ota yhteyttä', contactText: 'Keskustellaan mahdollisuuksista, projekteista tai hyvästä pizzasta.',
    name: 'Nimesi', email: 'Sähköpostisi', note: 'Mistä haluaisit keskustella?', sending: 'Lähetetään...', sent: 'Kiitos! Viestisi on matkalla Tiinalle ✦', error: 'Viestin lähetys ei onnistunut. Yritä hetken kuluttua uudelleen.',
    starter: 'Moi! Olen Tiinan CV-chatbot. Kysy vaikka osaamisesta, projekteista tai siitä, millainen tiimikaveri Tiina on.',
    unavailable: 'Chatti ei ole juuri nyt saatavilla. Kokeile myöhemmin uudelleen.'
  },
  en: {
    nav: ['About', 'Skills', 'Contact'], eyebrow: 'OPEN TO WORK · AI & FULL-STACK',
    title: <>Hi, I’m <em>Tiina.</em><br />I build things<br />that feel like the future.</>,
    intro: 'From visual merchandiser to full-stack developer. I now build LLM apps and am looking for my next opportunity in tech.',
    chatTitle: 'Ask me anything', chatSubtitle: 'CV chatbot · speaking as Tiina', placeholder: 'Type your question...', send: 'Send',
    quick: ['Tell me about your strengths', 'Which technologies do you use?', 'Why would you fit our team?', 'Tell me about your latest projects'],
    skills: 'Tech universe', contact: 'Get in touch', contactText: 'Let’s talk opportunities, projects or great pizza.',
    name: 'Your name', email: 'Your email', note: 'What would you like to talk about?', sending: 'Sending...', sent: 'Thank you! Your message is on its way to Tiina ✦', error: 'Sending failed. Please try again shortly.',
    starter: 'Hi! I’m Tiina’s CV chatbot. Ask about skills, projects or what Tiina is like as a teammate.', unavailable: 'Chat is unavailable right now. Please try again soon.'
  }
}

function App() {
  const [language, setLanguage] = useState('fi')
  const [messages, setMessages] = useState([{ role: 'assistant', content: copy.fi.starter }])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [contactState, setContactState] = useState('idle')
  const t = copy[language]

  const changeLanguage = (next) => {
    setLanguage(next)
    setMessages([{ role: 'assistant', content: copy[next].starter }])
  }

  async function sendMessage(value = question) {
    const text = value.trim()
    if (!text || loading) return
    const history = messages
    setMessages([...history, { role: 'user', content: text }])
    setQuestion(''); setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, history, language }) })
      if (!response.ok) throw new Error()
      const data = await response.json()
      setMessages((current) => [...current, { role: 'assistant', content: data.message }])
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: t.unavailable }])
    } finally { setLoading(false) }
  }

  async function sendContact(event) {
    event.preventDefault(); setContactState('sending')
    try {
      const response = await fetch(`${API_URL}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!response.ok) throw new Error()
      setContactState('sent'); setForm({ name: '', email: '', message: '' })
    } catch { setContactState('error') }
  }

  return <main>
    <div className="orb orb-one" /><div className="orb orb-two" /><div className="grid" />
    <nav><a className="logo" href="#top">TS<span>✦</span></a><div className="nav-links">{t.nav.map((item, i) => <a href={['#about','#skills','#contact'][i]} key={item}>{item}</a>)}</div><div className="language"><button className={language === 'fi' ? 'active' : ''} onClick={() => changeLanguage('fi')}>FI</button><button className={language === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>EN</button></div></nav>
    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="intro">{t.intro}</p><div className="hero-actions"><a className="button primary" href="#contact">{t.contact} <span>↗</span></a><a className="button ghost" href="https://www.linkedin.com/in/tiina-siremaa-7589a61b5/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div><div className="mini-stats"><span>✦ Tampere, Finland</span><span>◌ Available for opportunities</span></div></div><div className="identity-card"><img className="portrait-photo" src="/tiina-portrait.png" alt="Tiina Siremaa"/><div className="card-glow"/><p>TIINA SIREMAA</p><div className="card-bottom"><span>DEVELOPER<br/>+ CREATIVE</span><span>2026<br/>PORTFOLIO</span></div></div></section>
    <section className="content" id="about"><div className="chat-panel"><div className="panel-head"><div><p className="eyebrow small">AI POWERED</p><h2>{t.chatTitle}</h2></div><span className="online"><i/> ONLINE</span></div><p className="subtitle">{t.chatSubtitle}</p><div className="messages">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`message ${message.role}`}><span>{message.role === 'assistant' ? 'TS' : 'YOU'}</span><p>{message.content}</p></div>)}{loading && <div className="typing"><i/><i/><i/></div>}</div><div className="quick-list">{t.quick.map((item) => <button key={item} onClick={() => sendMessage(item)}>{item}<span>↗</span></button>)}</div><form className="chat-input" onSubmit={(event) => { event.preventDefault(); sendMessage() }}><input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={t.placeholder} maxLength="4000"/><button disabled={loading}>{t.send} <span>↑</span></button></form></div>
      <aside><section className="about-card"><p className="eyebrow small">01 / ABOUT</p><h2>Human-centred<br/>by nature.</h2><p>Developer, team player, cycling enthusiast and lifelong learner.</p><a href="https://github.com/TiinaTuuliaS" target="_blank" rel="noreferrer">GitHub profile ↗</a></section><section className="skills-card" id="skills"><p className="eyebrow small">02 / {t.skills}</p><div className="skill-cloud">{['Python','React','AI / LLMs','JavaScript','C#','Node.js','MongoDB','PostgreSQL','UX thinking'].map((skill) => <span key={skill}>{skill}</span>)}</div></section></aside></section>
    <section className="contact" id="contact"><div><p className="eyebrow">03 / CONTACT</p><h2>{t.contact}</h2><p>{t.contactText}</p></div><form onSubmit={sendContact}><input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder={t.name}/><input required type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder={t.email}/><textarea required value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} placeholder={t.note}/><button className="button primary" disabled={contactState === 'sending'}>{contactState === 'sending' ? t.sending : `${t.contact} ↗`}</button>{contactState === 'sent' && <p className="form-status success">{t.sent}</p>}{contactState === 'error' && <p className="form-status error">{t.error}</p>}</form></section>
    <footer><span>© 2026 TIINA SIREMAA</span><span>BUILT WITH CURIOSITY ✦</span></footer>
  </main>
}

export default App
