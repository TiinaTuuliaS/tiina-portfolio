import { ArrowIcon } from './icons'
import { LanguageSwitch, useLanguage } from './language'

const technicalSkills = ['React', 'React Router', 'TypeScript', 'JavaScript', 'C#', 'Python', 'Node.js', 'Express', 'FastAPI', 'NestJS', 'Framer Motion', 'Azure', 'Docker', 'Railway', 'MongoDB', 'Mongoose', 'SQLite', 'SQLAlchemy', 'PostgreSQL', 'PostGIS', 'REST APIs', 'Authentication', 'OpenAI API', 'LLM applications', 'CrewAI', 'AI agents', 'Pydantic', 'unittest', 'Jest', 'React Testing Library', 'Git', 'GitHub', 'Stripe', 'Resend', 'Cloudinary', 'Redis']

const copy = {
  fi: {
    back: 'Takaisin portfolioon', download: 'Lataa PDF', print: 'Tulosta CV', role: 'Full-stack-kehittäjä · AI-innostuja · Visuaalinen luova tekijä', profile: 'PROFIILI', intro: 'Olen tamperelainen full-stack-kehittäjä, jolla on tausta visual merchandisingissa, vähittäiskaupan esihenkilötyössä ja asiakaskokemuksessa. Valmistuin ohjelmistokehittäjäksi vuonna 2025 ja rakennan käytännöllisiä, käyttäjäystävällisiä verkko- ja AI-sovelluksia.', experienceLabel: 'KOKEMUS', heading: <>Ihmiset, tuotteet<br />ja visuaalinen ajattelu.</>, education: 'KOULUTUS', languages: 'KIELET', strengths: 'VAHVUUDET', toolkit: 'TEKNINEN TYÖKALUPAKKI', based: 'Tampere, Suomi', available: 'Avoin kehittäjämahdollisuuksille ja yhteistyöprojekteille.', references: 'Suosittelijoiden yhteystiedot saat minulta pyydettäessä.', languageList: [['Suomi', 'Äidinkieli'], ['Englanti', 'Erinomainen'], ['Ruotsi', 'Hyvä'], ['Espanja', 'Perusteet']], strengthsText: 'Käyttäjälähtöinen ajattelu · Ongelmanratkaisu · Kokonaisuuksien hahmottaminen · Yhteistyö · Visuaalinen ajattelu',
    experience: [
      { years: '2021 – nykyhetki', role: 'Myyjä & visualisti', company: 'Stockmann, Tampere', text: 'Asiakaspalvelu, visual merchandising ja vähittäiskaupan päivittäiset tehtävät. Stockmannin brändilähettiläs vuodesta 2024 sekä työsuojelutoimikunnan jäsen 2023–2026.' },
      { years: '2024 – 2025', role: 'Päätoiminen visualisti, määräaikainen sijaisuus', company: 'Stockmann, Tampere', text: 'Vastasin vuoden mittaisessa sijaisuudessa kaupallisesta visuaalisesta esillepanosta.' },
      { years: '2018 – 2021', role: 'Päätoiminen visualisti', company: 'Monki, Tampere', text: 'Rakensin kaupallisia esillepanoja ja osallistuin yhtenäisen asiakaskokemuksen rakentamiseen myymälässä. Osallistuin myös useiden myymälöiden rakentamiseen ja avaamiseen. Kuuluin koko työsuhteeni ajan vastuuryhmään ja vastasin myymälän kaupallisesta tuloksesta yhdessä myymäläpäällikön kanssa. Vuonna 2021 sijaisin myymäläpäällikköä.' },
      { years: '2013 – 2018', role: 'Myyjä, avainhenkilö & visualistin sijainen', company: 'H&M, Lahden keskusta', text: 'Työskentelin myynnin, myymälätoimintojen, visual merchandisingin ja avainhenkilövastuiden parissa.' },
    ], educationItems: [['2023 – 2025', 'Tieto- ja viestintätekniikan ammattitutkinto', 'Ohjelmistokehittäjä · Careeria'], ['2010 – 2014', 'Tradenomi (AMK)', 'Markkinointi · Lahden ammattikorkeakoulu']] },
  en: {
    back: 'Back to portfolio', download: 'Download PDF', print: 'Print CV', role: 'Full-stack developer · AI enthusiast · Visual creative', profile: 'PROFILE', intro: 'I am a Tampere-based full-stack developer with a background in visual merchandising, retail leadership and customer experience. I graduated as a software developer in 2025 and build practical, user-friendly web and AI applications.', experienceLabel: 'EXPERIENCE', heading: <>People, products<br />and visual thinking.</>, education: 'EDUCATION', languages: 'LANGUAGES', strengths: 'STRENGTHS', toolkit: 'TECHNICAL TOOLKIT', based: 'Based in Tampere, Finland', available: 'Available for developer opportunities and collaborative projects.', references: 'References are available on request.', languageList: [['Finnish', 'Native'], ['English', 'Excellent'], ['Swedish', 'Good'], ['Spanish', 'Basics']], strengthsText: 'User-centred thinking · Problem-solving · Seeing the bigger picture · Collaboration · Visual thinking',
    experience: [
      { years: '2021 – present', role: 'Sales Advisor & Visual Merchandiser', company: 'Stockmann, Tampere', text: 'Customer service, visual merchandising and day-to-day retail operations. Stockmann Brand Ambassador since 2024 and Occupational Safety Committee member from 2023 to 2026.' },
      { years: '2024 – 2025', role: 'Full-time Visual Merchandiser, fixed-term cover', company: 'Stockmann, Tampere', text: 'Covered a year-long sick leave as a full-time Visual Merchandiser, with responsibility for commercial visual presentation.' },
      { years: '2018 – 2021', role: 'Full-time Visual Merchandiser', company: 'Monki, Tampere', text: 'Created commercial visual displays and contributed to a consistent in-store customer experience. I also took part in building and opening several stores. Throughout my employment, I served on the responsibility team and shared responsibility for the store’s commercial performance with the Store Manager. In 2021, I covered Store Manager duties.' },
      { years: '2013 – 2018', role: 'Sales Advisor, Keyholder & Visual Merchandiser Substitute', company: 'H&M, Lahti Centre', text: 'Worked in sales, store operations, visual merchandising and keyholder responsibilities.' },
    ], educationItems: [['2023 – 2025', 'Vocational Qualification in ICT', 'Software Developer · Careeria'], ['2010 – 2014', 'Bachelor of Business Administration', 'Marketing · Lahti University of Applied Sciences']] },
}

function CvPage() {
  const [language, setLanguage] = useLanguage()
  const t = copy[language]
  return <main className="cv-page">
    <div className="cv-background cv-background-one" /><div className="cv-background cv-background-two" />
    <nav className="cv-nav"><a className="logo" href="/">TS<span>✦</span></a><div className="page-nav-actions"><a className="cv-back" href="/"><ArrowIcon direction="left" /> {t.back}</a><LanguageSwitch language={language} onChange={setLanguage} /></div></nav>
    <article className="cv-document">
      <header className="cv-header"><div><p className="eyebrow">CURRICULUM VITAE / 2026</p><h1>Tiina<br /><em>Siremaa.</em></h1><p className="cv-role">{t.role}</p></div><div className="cv-header-aside"><figure className="cv-portrait"><img src="/tiina-portrait-2026.jpeg" alt="Tiina Siremaa" /><figcaption>TIINA / 2026</figcaption></figure><div className="cv-actions no-print"><a className="button ghost" href="/tiina-siremaa-cv.pdf?v=2026-11-03-3" download="tiina-siremaa-cv-2026.pdf">{t.download} <ArrowIcon direction="down" /></a><button className="button primary" onClick={() => window.print()}>{t.print} <ArrowIcon /></button></div></div></header>
      <section className="cv-intro"><p className="eyebrow">{t.profile}</p><p>{t.intro}</p></section>
      <div className="cv-grid"><section className="cv-section cv-experience"><p className="eyebrow">{t.experienceLabel}</p><h2>{t.heading}</h2><div className="timeline">{t.experience.map((item) => <div className="timeline-item" key={`${item.years}-${item.company}`}><p className="timeline-years">{item.years}</p><div><h3>{item.role}</h3><p className="timeline-company">{item.company}</p><p>{item.text}</p></div></div>)}</div></section><aside className="cv-sidebar"><section className="cv-section"><p className="eyebrow">{t.education}</p>{t.educationItems.map(([years, degree, school]) => <div className="education-item" key={degree}><p>{years}</p><h3>{degree}</h3><span>{school}</span></div>)}</section><section className="cv-section"><p className="eyebrow">{t.languages}</p><ul className="cv-list">{t.languageList.map(([name, level]) => <li key={name}><span>{name}</span> {level}</li>)}</ul></section><section className="cv-section cv-strengths"><p className="eyebrow">{t.strengths}</p><p>{t.strengthsText}</p></section></aside></div>
      <section className="cv-section cv-tech"><p className="eyebrow">{t.toolkit}</p><div className="cv-tech-list">{technicalSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>
      <p className="cv-references">{t.references}</p>
      <footer className="cv-footer"><div><strong>{t.based}</strong><span>{t.available}</span></div><div><a href="mailto:tiinatuuliak@gmail.com">tiinatuuliak@gmail.com</a><a href="https://www.linkedin.com/in/tiina-siremaa-7589a61b5/" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a></div></footer>
    </article>
  </main>
}

export default CvPage
