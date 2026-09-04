const experience = [
  { years: '2021 - present', role: 'Sales Advisor & Visual Merchandiser', company: 'Stockmann, Tampere', text: 'Customer service, visual merchandising and day-to-day retail operations. Own Brands Ambassador since 2025.' },
  { years: '2024 - 2025', role: 'Full-time Visual Merchandiser, fixed-term cover', company: 'Stockmann, Tampere', text: 'Covered a year-long sick leave as a full-time Visual Merchandiser, with responsibility for commercial visual presentation.' },
  { years: '2018 - 2021', role: 'Full-time Visual Merchandiser', company: 'Monki, Tampere', text: 'Created commercial visual displays and supported a consistent in-store customer experience.' },
  { years: '2013 - 2018', role: 'Sales Advisor, Keyholder & Visual Merchandiser Substitute', company: 'H&M, Lahti Centre', text: 'Worked in sales, store operations, visual merchandising and keyholder responsibilities.' },
]

const technicalSkills = ['React', 'JavaScript', 'Node.js', 'Express', 'Python', 'FastAPI', 'MongoDB', 'Mongoose', 'REST APIs', 'Authentication', 'OpenAI API', 'LLM applications', 'CrewAI', 'AI agents', 'Git', 'GitHub', 'Stripe', 'Resend', 'Cloudinary', 'Redis', 'Render', 'TypeScript', 'NestJS', 'PostgreSQL', 'PostGIS']

function CvPage() {
  return <main className="cv-page">
    <div className="cv-background cv-background-one" /><div className="cv-background cv-background-two" />
    <nav className="cv-nav"><a className="logo" href="/">TS<span>✦</span></a><a className="cv-back" href="/">← Back to portfolio</a></nav>
    <article className="cv-document">
      <header className="cv-header"><div><p className="eyebrow">CURRICULUM VITAE / 2025</p><h1>Tiina<br /><em>Siremaa.</em></h1><p className="cv-role">Full-stack developer · AI enthusiast · Visual creative</p></div><div className="cv-actions no-print"><a className="button ghost" href="/tiina-siremaa-cv.pdf" download>Download PDF ↓</a><button className="button primary" onClick={() => window.print()}>Print CV ↗</button></div></header>
      <section className="cv-intro"><p className="eyebrow">PROFILE</p><p>I am a Tampere-based full-stack developer with a background in visual merchandising, retail leadership and customer experience. I graduated as a software developer in 2025 and now build practical, user-friendly web and AI applications.</p></section>
      <div className="cv-grid"><section className="cv-section cv-experience"><p className="eyebrow">EXPERIENCE</p><h2>People, products<br />and visual thinking.</h2><div className="timeline">{experience.map((item) => <div className="timeline-item" key={`${item.years}-${item.company}`}><p className="timeline-years">{item.years}</p><div><h3>{item.role}</h3><p className="timeline-company">{item.company}</p><p>{item.text}</p></div></div>)}</div></section><aside className="cv-sidebar"><section className="cv-section"><p className="eyebrow">EDUCATION</p><div className="education-item"><p>2023 - 2025</p><h3>Vocational Qualification in ICT</h3><span>Software Developer · Careeria</span></div><div className="education-item"><p>2010 - 2014</p><h3>Bachelor of Business Administration</h3><span>Marketing · Lahti University of Applied Sciences</span></div></section><section className="cv-section"><p className="eyebrow">LANGUAGES</p><ul className="cv-list"><li><span>Finnish</span> Native</li><li><span>English</span> Excellent</li><li><span>Swedish</span> Good</li><li><span>Spanish</span> Basics</li></ul></section><section className="cv-section cv-strengths"><p className="eyebrow">STRENGTHS</p><p>Communication · Project management · Organising work · Visual planning · Customer understanding</p></section></aside></div>
      <section className="cv-section cv-tech"><p className="eyebrow">TECHNICAL TOOLKIT</p><div className="cv-tech-list">{technicalSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>
      <footer className="cv-footer"><div><strong>Based in Tampere, Finland</strong><span>Available for developer opportunities and collaborative projects.</span></div><div><a href="mailto:tiinatuuliak@gmail.com">tiinatuuliak@gmail.com</a><a href="https://www.linkedin.com/in/tiina-siremaa-7589a61b5/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></footer>
    </article>
  </main>
}

export default CvPage
