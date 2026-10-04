import { useEffect, useRef, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const quickQuestions = [
  'Mitä teknologioita käytät?',
  'Kerro projekteistasi teknisesti',
  'Miten työskentelet tiimissä?',
  'Mitä etsit seuraavaksi?',
]

function CvChatbotPage() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Moi! Olen Tiina. Kysy minulta vaikka osaamisestani, projekteistani tai siitä, millainen tiimikaveri olen.' }])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesRef = useRef(null)

  useEffect(() => {
    const container = messagesRef.current
    if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(value = question) {
    const text = value.trim()
    if (!text || loading) return

    const history = messages
    setMessages([...history, { role: 'user', content: text }])
    setQuestion('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history, language: 'fi' }),
      })

      if (response.status === 429) {
        setMessages((current) => [...current, { role: 'assistant', content: 'Olet lähettänyt monta kysymystä lyhyessä ajassa. Kokeile hetken kuluttua uudelleen.' }])
        return
      }
      if (!response.ok) throw new Error()

      const data = await response.json()
      setMessages((current) => [...current, { role: 'assistant', content: data.message }])
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: 'Chatti ei ole juuri nyt saatavilla. Kokeile myöhemmin uudelleen.' }])
    } finally {
      setLoading(false)
    }
  }

  return <main className="case-page">
    <div className="case-orb case-orb-one" /><div className="case-orb case-orb-two" />
    <nav className="case-nav"><a className="logo" href="/">TS<span>✦</span></a><a className="cv-back" href="/">← Takaisin portfolioon</a></nav>

    <section className="case-hero">
      <div><p className="eyebrow">CASE STUDY / AI-POWERED PORTFOLIO</p><h1>Portfolio<br /><em>&amp; AI CV Chat.</em></h1><p>Rakensin portfolioni tuotteena: se esittelee työni, tekee yhteydenotosta helppoa ja antaa rekrytoijalle mahdollisuuden kysyä kokemuksestani suoraan.</p></div>
      <div className="case-hero-card"><span>01</span><strong>Conversation<br />as a portfolio.</strong><p>React · FastAPI · OpenAI</p></div>
    </section>

    <section className="case-overview">
      <div className="case-story"><p className="eyebrow">THE IDEA</p><h2>CV voi olla myös keskustelu.</h2><p>Perinteinen CV on hyvä tiivistelmä, mutta se ei vastaa jatkokysymyksiin. Chatbot tekee portfoliosta tutkittavan: kävijä voi kysyä osaamisesta, projekteista, työskentelytavasta tai seuraavasta urasuunnasta omassa järjestyksessään.</p><p>Samalla projekti on oma full-stack-työnäytteeni — ei vain käyttöliittymä, vaan myös API, sisältökonteksti, julkinen deploy ja vastuulliset käyttörajat.</p></div>
      <div className="case-tech"><p className="eyebrow">TECHNICAL OVERVIEW</p><ul><li><strong>React + Vite</strong><span>Responsiivinen portfolio ja chat-käyttöliittymä.</span></li><li><strong>FastAPI</strong><span>Serveripuolen chat- ja yhteydenotto-API.</span></li><li><strong>OpenAI Responses API</strong><span>Vastaukset muodostuvat omasta CV- ja projektikontekstista.</span></li><li><strong>Resend</strong><span>Yhteydenottolomakkeen sähköpostitoimitus.</span></li><li><strong>Railway + Docker</strong><span>Frontend ja backend julkaistu erillisinä palveluina.</span></li></ul></div>
    </section>

    <section className="case-demo" aria-labelledby="live-demo-title">
      <div className="case-demo-intro"><p className="eyebrow">LIVE DEMO</p><h2 id="live-demo-title">Kokeile chattia.</h2><p>Demo käyttää samaa tuotannossa olevaa APIa kuin etusivun CV-chat. Kysymyksiä on suojattu kevyillä käyttörajoilla.</p></div>
      <div className="chat-panel case-chat-panel"><div className="panel-head"><div><p className="eyebrow small">TIINA'S CV CHAT</p><h2>Kysy minulta mitä vain</h2></div><span className="online"><i /> ONLINE</span></div><p className="subtitle">Vastaan Tiinana CV- ja projektikontekstin pohjalta.</p><div className="messages" ref={messagesRef}>{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`message ${message.role}`}>{message.role === 'assistant' ? <span className="chat-avatar" role="img" aria-label="Tiina kirjoittaa">👩‍💻</span> : <span>YOU</span>}<p>{message.content}</p></div>)}{loading && <div className="typing"><span className="typing-avatar" role="img" aria-label="Tiina kirjoittaa">👩‍💻</span><i /><i /><i /></div>}</div><form className="chat-input" onSubmit={(event) => { event.preventDefault(); sendMessage() }}><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Kirjoita kysymys..." maxLength="4000"/><button disabled={loading}>Lähetä <span>↑</span></button></form><div className="quick-list">{quickQuestions.map((item) => <button key={item} onClick={() => sendMessage(item)}>{item}<span>↗</span></button>)}</div></div>
    </section>

    <footer className="case-footer"><span>TIINA SIREMAA / 2026</span><a href="/">Takaisin portfolioon ↗</a></footer>
  </main>
}

export default CvChatbotPage
