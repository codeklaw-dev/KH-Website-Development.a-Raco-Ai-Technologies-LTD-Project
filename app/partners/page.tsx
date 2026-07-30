import { SiteShell } from "../components/SiteShell";
import Image from "next/image";

export const metadata = {
  title: "Enter the Iraqi Market | KH Wood Partnerships",
  description: "Local representation, import coordination, stocking, and market development for international manufacturers entering Iraq.",
};

export default function PartnersPage() {
  return (
    <SiteShell active="partners">
      <section className="partners-hero inner-hero">
        <div className="partner-coordinate hero-animate one"><span>33.3152° N</span><i>44.3661° E</i></div>
        <div className="partners-hero-copy"><p className="eyebrow hero-animate one">For international manufacturers</p><h1 className="hero-animate two">Your route into<br /><em>the Iraqi market.</em></h1><p className="hero-animate three">Local representation, market knowledge, supply infrastructure, and commercial relationships—working as one route to growth.</p><a className="button button-red hero-animate four" href="/contact?type=partner">Discuss a partnership <span>↗</span></a></div>
        <div className="partner-orbit" aria-hidden="true"><span /><span /><span /><b>IRQ</b></div>
      </section>

      <section className="market-case">
        <div className="market-case-number" data-reveal="left">01</div>
        <div className="market-case-copy" data-reveal="up"><p className="eyebrow">Market access with substance</p><h2>Interest is easy.<br /><em>Execution is local.</em></h2></div>
        <div className="market-case-note" data-reveal="right"><p>Entering a market requires more than introductions. KH Wood connects your product to the relationships, stock position, coordination, and follow-through needed to make it commercially real.</p></div>
      </section>

      <section className="entry-path">
        <div className="entry-path-visual" data-reveal="left"><Image src="/assets/logistics-truck.jpg" alt="KH Wood logistics truck carrying timber" fill sizes="(max-width: 820px) 100vw, 53vw" /><div><span>From manufacturer</span><b>One connected route</b><span>To the Iraqi market</span></div></div>
        <div className="entry-steps">
          {[['01','Market fit','Align the product, opportunity, customer profile, and commercial model.'],['02','Representation','Structure a practical local agency, franchise, or distribution relationship.'],['03','Import & stock','Coordinate entry, storage, inventory readiness, and local availability.'],['04','Market growth','Build durable demand through established relationships and market feedback.']].map(([n,title,text],index)=><article key={title} data-reveal="right" style={{transitionDelay:`${index*70}ms`}}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </section>

      <section className="partner-advantage">
        <div className="advantage-heading" data-reveal="left"><p className="eyebrow">Why KH Wood</p><h2>A partner who can<br /><em>carry the detail.</em></h2></div>
        <div className="advantage-grid">
          <article data-reveal><span>Network</span><h3>Commercial relationships</h3><p>Long-standing connections across Iraqi construction, manufacturing, and supply.</p></article>
          <article data-reveal><span>Infrastructure</span><h3>Stocking capability</h3><p>Space and handling capacity to support real product availability.</p></article>
          <article data-reveal><span>Insight</span><h3>Local feedback</h3><p>Practical market intelligence that helps improve product-market alignment.</p></article>
          <article data-reveal><span>Continuity</span><h3>Family leadership</h3><p>Senior involvement and a long-term view of every partnership.</p></article>
        </div>
      </section>

      <section className="partnership-fit">
        <div data-reveal="left"><p className="eyebrow">A good fit starts here</p><h2>Tell us your product,<br />market ambition,<br /><em>and preferred model.</em></h2></div>
        <div data-reveal="right"><p>We&apos;ll assess market relevance, operating requirements, and where KH Wood can add genuine value.</p><a className="button button-white" href="/contact?type=partner">Start the conversation <span>↗</span></a></div>
      </section>
    </SiteShell>
  );
}
