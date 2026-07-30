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

      <section className="origin-story">
        <aside data-reveal="left"><span>01</span><p>Where it began</p></aside>
        <div className="origin-copy" data-reveal="up"><p className="eyebrow">A craft became a company</p><h2>Rooted in making.<br /><em>Grown through trust.</em></h2><p className="large-copy">Founded by Khodeer Abbas Turki, the business carries forward the Al-Gburi family&apos;s culture of hospitality, responsibility, and commercial relationships that stand the test of time.</p></div>
        <div className="origin-detail" data-reveal="right"><p>The company evolved with the Iraqi market—from hands-on carpentry roots to large-scale importing, stockholding, distribution, and representation.</p><p>Today, a new generation combines that heritage with international supplier relationships and modern operational discipline.</p></div>
      </section>

      <section className="values-band">
        <div className="values-heading" data-reveal><p className="eyebrow">How we work</p><h2>Four values.<br />One standard.</h2></div>
        <div className="value-stack">
          {[['01','Accountability','We take ownership of the detail—from agreement through delivery.'],['02','Hospitality','Commercial relationships are human relationships, treated with care and respect.'],['03','Adaptability','We respond to changing specifications, markets, and project realities.'],['04','Continuity','We build partnerships for the long term, not for the next transaction.']].map(([number,title,text], index) => <article key={title} data-reveal style={{transitionDelay:`${index*60}ms`}}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="leadership-editorial">
        <div className="leadership-intro" data-reveal="left"><p className="eyebrow">Family leadership</p><h2>Different markets.<br /><em>Shared direction.</em></h2><p>Three co-founders bring complementary regional knowledge, supplier networks, and decades of commercial experience.</p></div>
        <div className="leader-list">
          {leaders.map(([name, role, focus], index) => <article key={name} data-reveal="right"><span>0{index + 1}</span><div className="leader-initials">{name.split(' ').map((part) => part[0]).join('')}</div><div><small>{role}</small><h3>{name}</h3><p>{focus}</p></div></article>)}
        </div>
      </section>

      <section className="footprint">
        <div className="footprint-map" aria-hidden="true" data-reveal="scale"><span className="map-line one" /><span className="map-line two" /><b className="dot baghdad">Baghdad</b><b className="dot basra">Basra</b><b className="dot amman">Amman</b><strong>IRQ<br /><i>↔</i><br />JOR</strong></div>
        <div className="footprint-copy" data-reveal="right"><p className="eyebrow">Our footprint</p><h2>Local presence.<br /><em>Regional reach.</em></h2><div className="office-list"><p><span>Baghdad</span>Al-Basatin area, Iraq</p><p><span>Basra</span>Al-Istiqlal Street / Al-Ashar, Iraq</p><p><span>Amman</span>Gardens / Wasfi Al-Tal corridor, Jordan</p></div><a className="text-link" href="/contact">Contact an office <span>↗</span></a></div>
      </section>
    </SiteShell>
  );
}
