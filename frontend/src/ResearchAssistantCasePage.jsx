import { ArrowIcon } from './icons'

const screenshots = [
  { image: '/research-assistant/overview.png', title: 'Tutkimuksen lähtökohta', text: 'Kävijä voi vertailla kilpailijoita tai tarkastella markkinan tilannetta eri kysymyksillä.' },
  { image: '/research-assistant/agent-workflow.png', title: 'Kolmen agentin työnjako', text: 'Havainnot, analyysi ja lähteiden näkyvyys on eroteltu omiksi vaiheikseen.' },
  { image: '/research-assistant/reports.png', title: 'Luettavat esimerkkiraportit', text: 'Kaksi raporttia on avoinna ilman tunnusta, jotta sovelluksen tuloksia voi arvioida käytännössä.' },
]

function ResearchAssistantCasePage() {
  return <main className="research-case-page">
    <nav className="research-case-nav"><a className="logo" href="/">TS<span>✦</span></a><a className="cv-back" href="/"><ArrowIcon direction="left" /> Takaisin portfolioon</a></nav>

    <section className="research-case-hero">
      <div><p className="eyebrow">CASE STUDY / EXPERIMENTAL AI APPLICATION</p><h1>Tutkimus-<br /><em>assistentti.</em></h1><p>Kolmen tekoälyagentin sovellus tuottaa verkkolähteisiin perustuvia kilpailijavertailuja ja markkinakatsauksia. Painopiste on lähteiden jäljitettävyydessä, rakenteisessa tiedonsiirrossa ja luotettavuuden arvioinnissa.</p><div className="research-case-actions"><a className="button primary" href="https://airesearchassistant-production-967c.up.railway.app/" target="_blank" rel="noreferrer">Avaa live-demo <ArrowIcon /></a><a className="button ghost" href="https://github.com/TiinaTuuliaS/ai_research_assistant" target="_blank" rel="noreferrer">Katso koodi <ArrowIcon /></a></div></div>
      <div className="research-case-visual"><img src="/research-assistant/overview.png" alt="Tutkimusassistentin aloitusnäkymä" /><span>3 AGENTS</span></div>
    </section>

    <section className="research-case-summary"><div><p className="eyebrow">THE QUESTION</p><h2>Ei vain vastaus,<br /><em>vaan sen perusta.</em></h2></div><div><p>Sovellus tutkii käyttäjän kysymystä useasta näkökulmasta: tutkija kokoaa verkkolähteisiin perustuvia havaintoja, analyytikko vertailee niiden merkitystä ja kirjoittaja muodostaa rajatun loppuraportin.</p><p>Sovellus on julkisesti katseltava demo. Kaksi aitoa esimerkkiraporttia on luettavissa ilman kirjautumista, ja tutkimuksia voi tehdä kutsukoodilla, jota voi pyytää minulta. Rajaus auttaa pitämään kokeellisen sovelluksen API-kustannukset hallinnassa.</p></div></section>

    <section className="research-architecture"><div className="research-architecture-heading"><p className="eyebrow">SYSTEM DESIGN</p><h2>Kolme roolia,<br /><em>yksi raportti.</em></h2></div><div className="research-architecture-list"><article><span>01</span><h3>Tutkija</h3><p>Hakee ja kokoaa lähteistetyt havainnot Serper-haun sekä verkkosivujen tekstisisällön avulla.</p></article><article><span>02</span><h3>Analyytikko</h3><p>Vertailee havaintoja, tunnistaa niiden merkityksen ja rajaa epävarmoja päätelmiä.</p></article><article><span>03</span><h3>Kirjoittaja</h3><p>Muodostaa luettavan loppuraportin, jossa lähteet ja aineiston rajat ovat näkyvillä.</p></article></div></section>

    <section className="research-validation"><div><p className="eyebrow">STRUCTURED EVALUATION</p><h2>Pydantic tekee<br /><em>rakenteen näkyväksi.</em></h2></div><div><p>Agenttien tiedonsiirto perustuu Pydantic-malleihin, jotka validoivat havaintojen, lähdeviitteiden ja analyysin rakenteen ennen seuraavaa vaihetta.</p><p>Erilliset ohjelmalliset ja mallipohjaiset tarkistukset arvioivat lähdetukea ja päätelmien rajauksia. Pydantic ei itsessään varmista väitteiden totuutta — se varmistaa, että arvioitava tieto on oikeassa, käsiteltävässä muodossa.</p><div className="research-tech-list"><span>React</span><span>FastAPI</span><span>CrewAI</span><span>OpenAI GPT-4.1</span><span>Serper</span><span>Pydantic</span><span>SQLite</span><span>SQLAlchemy</span><span>Docker</span><span>Railway</span></div></div></section>

    <section className="research-limitations"><p className="eyebrow">DOCUMENTED LIMITATIONS</p><h2>Kokeellinen tarkoittaa myös<br /><em>läpinäkyvää epävarmuutta.</em></h2><p>Verkkolähteisiin ja kielimalleihin perustuvat raportit voivat sisältää virheitä, puutteita tai liian pitkälle meneviä päätelmiä. Esimerkkiraportteja ei ole erikseen faktantarkistettu. Lähteiden näkyvyys ja rakenteinen arviointi helpottavat raportin kriittistä lukemista, mutta eivät tee siitä automaattisesti totta.</p></section>

    <section className="research-gallery"><div><p className="eyebrow">SELECTED SCREENS</p><h2>Sovellus<br /><em>käytännössä.</em></h2></div><div className="research-snapshots">{screenshots.map((shot, index) => <figure key={shot.image}><img src={shot.image} alt={shot.title} loading="lazy" /><figcaption><span>0{index + 1}</span><div><h3>{shot.title}</h3><p>{shot.text}</p></div></figcaption></figure>)}</div></section>

    <footer className="case-footer"><span>TIINA SIREMAA / 2026</span><a href="/">Takaisin portfolioon <ArrowIcon /></a></footer>
  </main>
}

export default ResearchAssistantCasePage
