import { ArrowIcon } from './icons'

const windows = [
  { image: '/visual-work/window-knitwear.png', label: '01', title: 'Knitwear in motion', description: 'Ripustetut neuleet, köysirytmi ja värien kerrostuminen tekevät ikkunasta kevyen mutta pysäyttävän.' },
  { image: '/visual-work/window-jeanious.png', label: '02', title: 'Jeanious style', description: 'Kolmen mallinuken ryhmä, jossa väri, siluetti ja typografia muodostavat yhden kampanjahetken.' },
  { image: '/visual-work/window-get-set-equal.png', label: '03', title: 'Girls Get Equal', description: 'Kampanjaikkuna, jossa tarina pysyy näkyvissä myös lasin, valon ja myymäläympäristön läpi.' },
  { image: '/visual-work/window-holiday.png', label: '04', title: 'Holiday window', description: 'Sesonkiesillepano: kontrastit, tekstuurit ja juhlavalaistus yhtenäisenä kokonaisuutena.' },
  { image: '/visual-work/mannequin-orange-window.png', label: '05', title: 'Colour block', description: 'Rohkea värikehys, neonvalot ja kolmen mallinuken ryhmä tekevät kampanjasta pysäyttävän.' },
]

const inStoreWork = [
  { image: '/visual-work/stockmann-holiday-group.png', title: 'Seasonal storytelling', text: 'Sesonkiryhmä, jossa mittakaava, materiaalit ja lahjaidea rakentavat yhden tarinan.' },
  { image: '/visual-work/stockmann-blue-green.png', title: 'Colour as a guide', text: 'Valkoiset mallinuket, sininen ja vihreä muodostavat selkeän reitin katseelle.' },
  { image: '/visual-work/pink-mannequin-group.png', title: 'Playful proportion', text: 'Rytmiä, kerroksia ja rohkea värimaailma mallinukkeryhmässä.' },
  { image: '/visual-work/coach-display.png', title: 'Product composition', text: 'Tuoteryhmittely, tyhjä tila ja materiaalit nostavat valikoiman esiin.' },
  { image: '/visual-work/interior-pastels.png', title: 'Colour-coded space', text: 'Värit, valaisimet ja pöytäryhmät sitovat osaston yhdeksi tunnistettavaksi kokonaisuudeksi.' },
  { image: '/visual-work/interior-winter-tree.png', title: 'Seasonal focus point', text: 'Sesonkiteema rakentuu katseenvangitsijasta ja sitä tukevasta tuote-esillepanosta.' },
  { image: '/visual-work/in-store-holiday-tailoring.png', title: 'Festive tailoring', text: 'Materiaaleilla, mittakaavalla ja punaisen aksenteilla rakennettu juhlahetki.' },
  { image: '/visual-work/in-store-pastel-mannequins.png', title: 'Soft contrast', text: 'Pastellisävyt, valkoinen ja peilipinnat luovat kevyen mutta tarkasti rytmitetyn kokonaisuuden.' },
]

function VisualWorkPage() {
  return <main className="visual-work-page">
    <nav className="visual-work-nav"><a className="logo" href="/">TS<span>✦</span></a><a className="cv-back" href="/"><ArrowIcon direction="left" /> Takaisin portfolioon</a></nav>

    <section className="visual-work-hero">
      <div className="visual-work-hero-copy"><p className="eyebrow">SELECTED ARCHIVE / VISUAL MERCHANDISING</p><h1>Visual<br /><em>work.</em></h1><div className="visual-work-intro"><p>Työskentelen edelleen visualistina kehittäjäpolkuni rinnalla. Rakennan esillepanoja, joissa värit, tuotteet, tila ja kaupallinen tavoite kohtaavat.</p><p>Valikoidut työt kertovat tavastani havainnoida kokonaisuuksia, tehdä harkittuja päätöksiä nopeasti ja rakentaa selkeä reitti katseelle.</p></div></div>
      <figure className="visual-work-hero-image"><img src="/visual-work/work-in-progress.png" alt="Näyteikkuna rakenteilla tikkaiden kanssa" loading="eager" /><figcaption>WORK IN PROGRESS</figcaption></figure>
    </section>

    <section className="visual-work-statement"><p className="eyebrow">SPATIAL STORYTELLING</p><h2>Hyvä esillepano tekee<br /><em>tilasta kertovan.</em></h2><p>Visual merchandising on opettanut minulle sommittelua, värien käyttöä ja käyttäjän näkökulman ajattelua. Samat taidot kulkevat mukana myös digitaalisia tuotteita suunnitellessa ja rakentaessa.</p></section>

    <section className="visual-work-gallery"><div className="visual-work-gallery-heading"><p className="eyebrow">SELECTED WINDOWS</p><p>Valokaari toimii sarjan kehyksenä: jokaisessa ikkunassa sama rakenne, mutta oma kampanja, värimaailma ja rytmi.</p></div><div className="visual-work-grid">{windows.map((window, index) => <figure className={`visual-work-shot visual-work-shot-${index + 1}`} key={window.image}><img src={window.image} alt={window.title} loading={index > 0 ? 'lazy' : 'eager'} /><figcaption><span>{window.label}</span><div><h3>{window.title}</h3><p>{window.description}</p></div></figcaption></figure>)}</div></section>

    <section className="visual-work-instore"><div className="visual-work-instore-heading"><p className="eyebrow">IN-STORE STYLING</p><p>Valikoituja sisätiloja, mallinukkeryhmiä ja tuote-esillepanoja.</p></div><div className="visual-work-instore-grid">{inStoreWork.map((work, index) => <figure key={work.image}><img src={work.image} alt={work.title} loading="lazy" /><figcaption><span>0{index + 1}</span><div><h3>{work.title}</h3><p>{work.text}</p></div></figcaption></figure>)}</div></section>

    <section className="visual-work-note"><div><p className="eyebrow">FROM PHYSICAL TO DIGITAL</p><h2>Luova tausta ei jäänyt<br /><em>edelliseen rooliin.</em></h2></div><p>Näyteikkunassa sekunneissa tehtävä valinta on sama haaste kuin käyttöliittymässä: mikä huomataan ensin, mikä tuntuu olennaiselta ja mikä saa pysähtymään. Visualistin työ on luonut pohjan ihmislähtöiselle tavalleni kehittää.</p></section>

    <footer className="case-footer"><span>TIINA SIREMAA / VISUAL WORK</span><a href="/">Takaisin portfolioon <ArrowIcon /></a></footer>
  </main>
}

export default VisualWorkPage
