import { SiteShell } from "../components/SiteShell";
import Image from "next/image";

export const metadata = {
  title: "Our Company | KH Wood",
  description: "Discover KH Wood's family heritage, leadership, values, and presence across Iraq and Jordan.",
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
        <div className="company-hero-copy">
          <p className="eyebrow hero-animate one">The company</p>
          <h1 className="hero-animate two">A family name,<br /><em>built to endure.</em></h1>
          <p className="hero-animate three">From the craft of carpentry to the scale of international supply, KH Wood has always been shaped by relationships.</p>
        </div>
        <figure className="company-portrait hero-animate four"><Image src="/assets/imported-timber.jpg" alt="Imported timber stock at KH Wood" fill priority sizes="(max-width: 820px) 100vw, 42vw" /><figcaption><span>Our foundation</span><b>Trust, adaptability &amp; long-term thinking</b></figcaption></figure>
        <div className="company-monogram" aria-hidden="true">KH</div>
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
        <div className="origin-copy" data-reveal="up"><p className="eyebrow">A craft became a company</p><h2>Rooted in making.<br /><em>Grown through trust.</em></h2><p className="large-copy">Founded by Khodeer Abbas Turki, the business carries forward the Al-Gburi family&apos;s culture of hospitality, responsibility, and commercial relationships that stand the test of time.</p></div>
        <div className="origin-detail" data-reveal="right"><p>The company evolved with the Iraqi market—from hands-on carpentry roots to large-scale importing, stockholding, distribution, and representation.</p><p>Today, a new generation combines that heritage with international supplier relationships and modern operational discipline.</p></div>
      </section>

      <section className="company-evolution">
        <div className="evolution-head" data-reveal="left"><p className="eyebrow">The KH Wood journey</p><h2>Craft became<br /><em>capacity.</em></h2><p>The company&apos;s growth has never been a break from its origins. Each stage added scale while preserving family accountability.</p></div>
        <div className="evolution-track">
          <article data-reveal="right"><time>Origin</time><div><h3>Carpentry roots</h3><p>First-hand understanding of wood, workmanship, and the expectations of local customers.</p></div></article>
          <article data-reveal="right"><time>Expansion</time><div><h3>Supplier relationships</h3><p>Long-term connections across Asian and European markets broadened product access.</p></div></article>
          <article data-reveal="right"><time>Scale</time><div><h3>National supply</h3><p>Storage, staging, and distribution grew to support larger commercial and infrastructure needs.</p></div></article>
          <article data-reveal="right"><time>Today</time><div><h3>International market partner</h3><p>KH Wood now connects global manufacturers with practical, locally led access to Iraq.</p></div></article>
        </div>
      </section>

      <section className="sector-field" id="sectors">
        <div className="sector-field-head" data-reveal><p className="eyebrow">Enterprise client sectors</p><h2>Where dependable supply<br /><em>has to perform.</em></h2></div>
        <div className="sector-mosaic">
          <article className="sector-large" data-reveal="left"><Image src="/assets/logistics-truck.jpg" alt="KH Wood truck supporting large-scale supply" fill sizes="(max-width: 820px) 100vw, 60vw" /><div><span>Infrastructure</span><h3>Bridges, roads &amp; public works</h3><p>High-volume requirements coordinated around programme and destination.</p></div></article>
          <article data-reveal="up"><Image src="/assets/formwork.jpg" alt="Construction wood materials" fill sizes="(max-width: 820px) 100vw, 40vw" /><div><span>Built environment</span><h3>Residential &amp; commercial construction</h3></div></article>
          <article data-reveal="right"><Image src="/assets/pallet-stacks.jpg" alt="Stock for industrial use" fill sizes="(max-width: 820px) 100vw, 40vw" /><div><span>Industry</span><h3>Manufacturing &amp; facility supply</h3></div></article>
          <article className="sector-text" data-reveal="right"><span>Public procurement</span><h3>Structured supply for institutional requirements.</h3><p>KH Wood supports serious commercial conversations without unsupported monopoly or dominance claims.</p></article>
        </div>
      </section>

      <section className="mission-statement">
        <Image src="/assets/imported-timber.jpg" alt="Timber structure representing KH Wood's mission" fill sizes="100vw" />
        <div className="mission-shade" />
        <div data-reveal="up"><p className="eyebrow">Our mission</p><blockquote>“To connect Iraq&apos;s wood, construction, and infrastructure markets with reliable supply, trusted family leadership, and long-term international partnerships.”</blockquote><a className="button button-red" href="/partners">Explore partnership opportunities <span>↗</span></a></div>
      </section>

      <section className="values-band" id="values">
        <div className="values-heading" data-reveal><p className="eyebrow">How we work</p><h2>Four values.<br />One standard.</h2></div>
        <div className="value-stack">
          {[['01','Trust','We do what we say and communicate clearly when conditions change.'],['02','Adaptability','We respond to changing specifications, markets, and project realities.'],['03','Balance','We align commercial ambition with responsible, practical execution.'],['04','Community','We recognise our responsibility to the markets and people around us.'],['05','Continuous improvement','Every shipment and partnership should make the next one stronger.'],['06','Cost consciousness','Value is protected through disciplined sourcing and operational choices.'],['07','Creative solutions','Complex requirements deserve thoughtful, workable answers.'],['08','Customer focus','The requirement—not the catalogue—shapes the supply response.'],['09','Excellence','We hold the commercial detail to a consistently high standard.'],['10','Social responsibility','Long-term business depends on responsible decisions and conduct.'],['11','Transparency','Clear expectations and honest information build durable relationships.']].map(([number,title,text], index) => <article key={title} data-reveal style={{transitionDelay:`${(index%4)*45}ms`}}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="leadership-editorial" id="leadership">
        <div className="leadership-intro" data-reveal="left"><p className="eyebrow">Family leadership</p><h2>Different markets.<br /><em>Shared direction.</em></h2><p>Three co-founders bring complementary regional knowledge, supplier networks, and decades of commercial experience.</p></div>
        <div className="leader-list">
          {leaders.map(([name, role, focus], index) => <article key={name} data-reveal="right"><span>0{index + 1}</span><div className="leader-initials">{name.split(' ').map((part) => part[0]).join('')}</div><div><small>{role}</small><h3>{name}</h3><p>{focus}</p></div></article>)}
        </div>
      </section>

      <section className="footprint" id="locations">
        <div className="footprint-map" aria-hidden="true" data-reveal="scale"><span className="map-line one" /><span className="map-line two" /><b className="dot baghdad">Baghdad</b><b className="dot basra">Basra</b><b className="dot amman">Amman</b><strong>IRQ<br /><i>↔</i><br />JOR</strong></div>
        <div className="footprint-copy" data-reveal="right"><p className="eyebrow">Our footprint</p><h2>Local presence.<br /><em>Regional reach.</em></h2><div className="office-list"><p><span>Baghdad</span>Al-Basatin area, Iraq</p><p><span>Basra</span>Al-Istiqlal Street / Al-Ashar, Iraq</p><p><span>Amman</span>Gardens / Wasfi Al-Tal corridor, Jordan</p></div><a className="text-link" href="/contact">Contact an office <span>↗</span></a></div>
      </section>

      <section className="company-commitment">
        <div className="commitment-mark" data-reveal="scale"><span>KH</span><small>What the name stands for</small></div>
        <div className="commitment-copy" data-reveal="right"><p className="eyebrow">A long-term operating standard</p><h2>Reputation is built<br /><em>shipment by shipment.</em></h2><p>KH Wood&apos;s family name is attached to every commercial relationship. That creates a simple expectation: be clear about what is possible, remain accountable for the agreed process, and build business that can last.</p><div className="commitment-points"><span>Direct senior involvement</span><span>Commercial transparency</span><span>Respect for local context</span><span>Long-term partner thinking</span></div><a className="button button-red" href="/contact">Speak with KH Wood <b>↗</b></a></div>
      </section>
    </SiteShell>
  );
}
