const snapshots = [
  { image: '/dreamland-case/products.png', alt: 'Dreamlandin tuotekatalogi koru- ja aurinkolasikategorioineen', number: '01', title: 'Tuotteiden löytäminen', text: 'Kategoriat ja visuaaliset tuotekortit tekevät valikoiman selaamisesta selkeää.' },
  { image: '/dreamland-case/cart-coupon.png', alt: 'Dreamlandin ostoskori ja alennuskoodikenttä', number: '02', title: 'Ostoskori ja kuponki', text: 'Ostoskorin määrät, tilausten yhteenveto ja alennuskoodit kuuluvat samaan sujuvaan ostopolkuun.' },
  { image: '/dreamland-case/admin-analytics.png', alt: 'Dreamlandin hallintapaneelin myyntianalytiikka', number: '03', title: 'Hallinta ja analytiikka', text: 'Roolisuojattu admin-näkymä kokoaa tuotteiden, tilausten ja myynnin seurannan yhteen.' },
  { image: '/dreamland-case/order-success.png', alt: 'Dreamlandin onnistuneen tilauksen vahvistusnäkymä', number: '04', title: 'Tilausvahvistus', text: 'Maksun jälkeen käyttäjälle annetaan selkeä vahvistus ja seuraavat askeleet.' },
]

function DreamlandCasePage() {
  return <main className="dreamland-case-page">
    <div className="dreamland-orb dreamland-orb-one" /><div className="dreamland-orb dreamland-orb-two" />
    <nav className="dreamland-case-nav"><a className="logo" href="/">TS<span>✦</span></a><a className="cv-back" href="/">← Takaisin portfolioon</a></nav>
    <section className="dreamland-case-hero">
      <div><p className="eyebrow">CASE STUDY / FULL-STACK E-COMMERCE</p><h1>Dreamland<br /><em>v2.</em></h1><p>Fiktiiviselle korubrändille rakennettu verkkokauppa, jossa koko ostokokemus kulkee tuotekategorioista maksun vahvistukseen ja hallintanäkymään asti.</p><div className="dreamland-case-actions"><a className="button primary" href="https://verkkokauppa-projekti.onrender.com/" target="_blank" rel="noreferrer">Avaa live-demo ↗</a><a className="button ghost" href="https://github.com/TiinaTuuliaS/dreamland-v2" target="_blank" rel="noreferrer">Katso koodi ↗</a></div></div>
      <div className="dreamland-showcase" aria-label="Dreamlandin visuaalinen identiteetti"><span>✦</span><p>DREAM<br />LAND</p><small>SOFT FUTURE<br />JEWELRY</small><i /><b /></div>
    </section>
    <section className="dreamland-story"><div><p className="eyebrow">THE JOURNEY</p><h2>Lopputyöstä<br />versioon kaksi.</h2></div><div className="dreamland-story-copy"><p>Dreamland sai alkunsa opintojeni lopputyönä. Halusin palata ideaan myöhemmin ja rakentaa siitä laajemman full-stack-projektin: samalla pääsin syventämään sekä asiakaspolkujen että palvelinpuolen toteutuksen osaamista.</p><p>Dreamland v2 yhdistää visuaalisen verkkokaupan käyttökokemuksen autentikointiin, ostoskoriin, maksamiseen, sähköpostivahvistuksiin ja ylläpidon työkaluihin.</p></div></section>
    <section className="dreamland-build" aria-labelledby="dreamland-build-title"><div className="dreamland-build-heading"><p className="eyebrow">WHAT I BUILT</p><h2 id="dreamland-build-title">Koko polku,<br /><em>ei vain etusivu.</em></h2></div><ul><li><strong>Asiakaskokemus</strong><span>Rekisteröinti, kirjautuminen, kategoriat, tuotesivut ja ostoskori.</span></li><li><strong>Ostopolku</strong><span>Alennuskoodit, Stripe Checkout ja tilausvahvistukset sähköpostiin.</span></li><li><strong>Hallintatyökalut</strong><span>Roolisuojattu tuotteiden hallinta sekä myynnin analytiikka.</span></li><li><strong>Tekninen toteutus</strong><span>React, Vite, Node.js, Express, MongoDB, JWT, Stripe, Resend, Cloudinary ja Redis.</span></li></ul></section>
    <section className="dreamland-gallery" aria-labelledby="dreamland-gallery-title"><div className="dreamland-gallery-heading"><p className="eyebrow">EARLIER BUILD / SELECTED SCREENS</p><h2 id="dreamland-gallery-title">Miltä matka<br /><em>näytti.</em></h2><p>Nämä valitut näkymät ovat Dreamlandin aiemmasta toteutuksesta. Ne kertovat projektin lähtökohdasta; v2 jatkaa samaa ideaa laajempana full-stack-sovelluksena.</p></div><div className="dreamland-snapshots">{snapshots.map((snapshot) => <figure key={snapshot.image}><div className="dreamland-image-wrap"><img src={snapshot.image} alt={snapshot.alt} loading="lazy" /></div><figcaption><span>{snapshot.number}</span><div><h3>{snapshot.title}</h3><p>{snapshot.text}</p></div></figcaption></figure>)}</div></section>
    <footer className="case-footer"><span>TIINA SIREMAA / 2026</span><a href="/">Takaisin portfolioon ↗</a></footer>
  </main>
}

export default DreamlandCasePage
