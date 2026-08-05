import { SiteShell } from "../components/SiteShell";
import Link from "next/link";

export const metadata = {
  title: "Our Company | KH Wood",
  description: "KH Wood's heritage, leadership, values, and operating presence across Iraq and Jordan.",
};

const leaders = [
  ["Amer Khodeer", "Co-Founder", "Asian supplier relationships and business development"],
  ["Abbas Khodeer", "Co-Founder", "European partner relationships and market development"],
  ["Thamer Khodeer", "Co-Founder", "Client relationships and Asian market development"],
];

export default function CompanyPage() {
  return (
    <SiteShell active="company">
      <section className="company-hero inner-hero">
        <img className="company-hero-image cover-image" src="/assets/company-hero.jpg" alt="" aria-hidden="true" fetchPriority="high" />
        <div className="company-hero-wash" aria-hidden="true" />
        <div className="company-hero-vignette" aria-hidden="true" />
        <div className="company-monogram" aria-hidden="true">KH</div>
        <div className="company-hero-copy">
          <p className="eyebrow hero-animate one">The company</p>
          <h1 className="hero-animate two">A name in the trade,<br /><em>built to endure.</em></h1>
          <p className="hero-animate three">From carpentry bench to international supply chain, KH Wood has always been built on relationships.</p>
          <div className="company-hero-note hero-animate four"><span>Our foundation</span><b>Trust, adaptability &amp; long-term thinking</b></div>
        </div>
      </section>

      <nav className="page-rail" aria-label="Company page sections"><span>Company overview</span><a href="#story">Our story</a><a href="#sectors">Sectors</a><a href="#values">Values</a><a href="#leadership">Leadership</a><a href="#locations">Locations</a></nav>

      <section className="company-proof" aria-label="Company highlights">
        <div data-reveal><strong>27</strong><p>Acres of storage capacity maintained for high-volume readiness</p></div>
        <div data-reveal><strong>50+</strong><p>Countries across the company&apos;s international market network</p></div>
        <div data-reveal><strong>3</strong><p>Senior co-founders with complementary regional expertise</p></div>
        <div data-reveal><span>IRQ</span><i>↔</i><span>JOR</span><p>A connected presence across Iraq and Jordan</p></div>
      </section>

      <section className="origin-story" id="story">
        <aside data-reveal="left"><span>01</span><p>Where it began</p></aside>
        <div className="origin-copy" data-reveal="up"><p className="eyebrow">A craft became a company</p><h2>Rooted in making.<br /><em>Grown through trust.</em></h2><p className="large-copy">Founded by Khodeer Abbas Turki, the business carries forward the Jubur (Al-Jubouri) clan&apos;s culture of hospitality, responsibility, and commercial relationships built to last.</p></div>
        <div className="origin-detail" data-reveal="right"><p>The company grew with the Iraqi market—from carpentry roots to large-scale importing, stockholding, distribution, and representation.</p><p>Today a new generation pairs that heritage with international supplier relationships and modern operational discipline.</p></div>
      </section>

      <section className="company-evolution">
        <div className="evolution-head" data-reveal="left"><p className="eyebrow">The KH Wood journey</p><h2>Craft became<br /><em>capacity.</em></h2><p>The company&apos;s growth has never been a break from its origins. Each stage added scale while preserving owner accountability.</p></div>
        <div className="evolution-track">
          <article data-reveal="right"><time>Origin</time><div><h3>Carpentry roots</h3><p>First-hand understanding of wood, workmanship, and the expectations of local customers.</p></div></article>
          <article data-reveal="right"><time>Expansion</time><div><h3>Supplier relationships</h3><p>Long-term connections across Asian and European markets broadened product access.</p></div></article>
          <article data-reveal="right"><time>Scale</time><div><h3>National supply</h3><p>Storage, staging, and distribution grew to support larger commercial and infrastructure needs.</p></div></article>
          <article data-reveal="right"><time>Today</time><div><h3>International market partner</h3><p>KH Wood now connects global manufacturers with practical, locally led access to Iraq.</p></div></article>
        </div>
      </section>

      <section className="heritage-film" aria-label="KH Wood heritage film">
        <video autoPlay muted loop playsInline preload="metadata" poster="/assets/kh-concept-poster-6e9dbb18.jpg"><source src="/assets/kh-concept.mp4" type="video/mp4" /></video>
        <div className="heritage-film-shade" />
        <div className="heritage-film-copy" data-reveal="up"><span>Material in motion · KH heritage</span><h2>Handled by people.<br /><em>Carried by relationships.</em></h2><p>Wood has always moved through hands, places, and generations. That human continuity still shapes how KH Wood does business today.</p></div>
      </section>

      <section className="sector-field" id="sectors">
        <div className="sector-field-head" data-reveal><p className="eyebrow">Enterprise client sectors</p><h2>Where dependable supply<br /><em>has to perform.</em></h2></div>
        <div className="sector-mosaic">
          <article className="sector-large sector-infrastructure" data-reveal="left"><img className="cover-image" src="/assets/company-sector-infrastructure.jpg" alt="Timber stock and handling operations supporting public infrastructure supply" loading="lazy" decoding="async" /><div><span>Infrastructure</span><h3>Bridges, roads &amp; public works</h3><p>High-volume requirements coordinated around programme and destination.</p></div></article>
          <article className="sector-built-environment" data-reveal="up"><img className="cover-image" src="/assets/company-sector-built-environment.jpg" alt="Engineered timber structure being assembled for a building project" loading="lazy" decoding="async" /><div><span>Built environment</span><h3>Residential &amp; commercial construction</h3></div></article>
          <article className="sector-industry" data-reveal="right"><img className="cover-image" src="/assets/company-sector-industry.jpg" alt="Industrial timber facility loading a truck for dispatch" loading="lazy" decoding="async" /><div><span>Industry</span><h3>Manufacturing &amp; facility supply</h3></div></article>
          <article className="sector-text" data-reveal="right"><span>Public procurement</span><h3>Structured supply for institutional requirements.</h3><p>Structured documentation and supply continuity for tender-driven requirements.</p></article>
        </div>
      </section>

      <section className="mission-statement">
        <img className="cover-image" src="/assets/imported-timber.jpg" alt="Timber structure representing KH Wood's mission" loading="lazy" decoding="async" />
        <div className="mission-shade" />
        <div data-reveal="up"><p className="eyebrow">Our mission</p><blockquote>“To connect Iraq&apos;s wood, construction, and infrastructure markets with reliable supply, principal-led execution, and long-term international partnerships.”</blockquote><Link className="button button-red" href="/partners">Explore partnership opportunities <span>↗</span></Link></div>
      </section>

      <section className="values-band" id="values">
        <div className="values-heading" data-reveal><p className="eyebrow">How we work</p><h2>Four values.<br />One standard.</h2></div>
        <div className="value-stack">
          {[['01','Trust','We do what we say and communicate clearly when conditions change.'],['02','Adaptability','We respond to changing specifications, markets, and project realities.'],['03','Balance','We align commercial ambition with responsible, practical execution.'],['04','Community','We recognise our responsibility to the markets and people around us.'],['05','Continuous improvement','Every shipment and partnership should make the next one stronger.'],['06','Cost consciousness','Value is protected through disciplined sourcing and operational choices.'],['07','Creative solutions','Complex requirements deserve thoughtful, workable answers.'],['08','Customer focus','The requirement—not the catalogue—shapes the supply response.'],['09','Excellence','We hold the commercial detail to a consistently high standard.'],['10','Social responsibility','Long-term business depends on responsible decisions and conduct.'],['11','Transparency','Clear expectations and honest information build durable relationships.']].map(([number,title,text], index) => <article key={title} data-reveal style={{transitionDelay:`${(index%4)*45}ms`}}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="leadership-editorial" id="leadership">
        <div className="leadership-intro" data-reveal="left"><p className="eyebrow">Ownership &amp; leadership</p><h2>Different markets.<br /><em>Shared direction.</em></h2><p>Three co-founders, each holding a distinct supplier network and decades of commercial experience.</p></div>
        <div className="leader-list">
          {leaders.map(([name, role, focus], index) => <article key={name} data-reveal="right"><span>0{index + 1}</span><div className="leader-initials">{name.split(' ').map((part) => part[0]).join('')}</div><div><small>{role}</small><h3>{name}</h3><p>{focus}</p></div></article>)}
        </div>
      </section>

      <section className="footprint" id="locations">
        <img className="footprint-photo cover-image" src="/assets/yard-wide.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="footprint-wash" aria-hidden="true" />
        <div className="footprint-map" aria-hidden="true" data-reveal="scale">
          <img src="/assets/world-map.svg" alt="" width={800} height={400} loading="lazy" decoding="async" />
          <b className="pin amman"><i /><span>Amman</span></b>
          <b className="pin baghdad"><i /><span>Baghdad</span></b>
          <b className="pin basra"><i /><span>Basra</span></b>
        </div>
        <div className="footprint-copy" data-reveal="up"><p className="eyebrow">Our footprint</p><h2>Local presence.<br /><em>Regional reach.</em></h2><div className="office-list"><p><span>Baghdad</span>Al-Basatin area, Iraq</p><p><span>Basra</span>Al-Istiqlal Street / Al-Ashar, Iraq</p><p><span>Amman</span>Gardens / Wasfi Al-Tal corridor, Jordan</p></div><Link className="text-link" href="/contact">Contact an office <span>↗</span></Link></div>
      </section>

      <section className="company-commitment">
        <div className="commitment-mark" data-reveal="scale"><span>KH</span><small>What the name stands for</small></div>
        <div className="commitment-copy" data-reveal="right"><p className="eyebrow">A long-term operating standard</p><h2>Reputation is built<br /><em>shipment by shipment.</em></h2><p>The Khodeer name is attached to every commercial relationship. That sets one expectation: be clear about what is possible, stay accountable to the agreed process, and build business that lasts.</p><div className="commitment-points"><span>Direct senior involvement</span><span>Commercial transparency</span><span>Respect for local context</span><span>Long-term partner thinking</span></div><Link className="button button-red" href="/contact">Speak with KH Wood <b>↗</b></Link></div>
      </section>
    </SiteShell>
  );
}
