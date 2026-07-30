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

      <section className="partner-network">
        <div className="network-intro" data-reveal="left"><p className="eyebrow">Strategic partnership network</p><h2>Built for manufacturers<br /><em>ready to commit.</em></h2><p>KH Wood is interested in product categories that can answer real Iraqi market demand and benefit from a serious local operating partner.</p></div>
        <div className="network-rings" aria-hidden="true" data-reveal="scale"><span /><span /><span /><b>KH</b></div>
        <div className="network-list" data-reveal="right"><p><span>01</span>International timber manufacturers</p><p><span>02</span>Wood and raw-material suppliers</p><p><span>03</span>Panel and board manufacturers</p><p><span>04</span>Construction-material companies</p><p><span>05</span>Exclusive distribution partners</p></div>
      </section>

      <section className="entry-path">
        <div className="entry-path-visual" data-reveal="left"><Image src="/assets/logistics-truck.jpg" alt="KH Wood logistics truck carrying timber" fill sizes="(max-width: 820px) 100vw, 53vw" /><div><span>From manufacturer</span><b>One connected route</b><span>To the Iraqi market</span></div></div>
        <div className="entry-steps">
          {[['01','Market fit','Align the product, opportunity, customer profile, and commercial model.'],['02','Representation','Structure a practical local agency, franchise, or distribution relationship.'],['03','Import & stock','Coordinate entry, storage, inventory readiness, and local availability.'],['04','Market growth','Build durable demand through established relationships and market feedback.']].map(([n,title,text],index)=><article key={title} data-reveal="right" style={{transitionDelay:`${index*70}ms`}}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </section>

      <section className="partnership-models">
        <div className="models-title" data-reveal><p className="eyebrow">Ways to work together</p><h2>One market.<br /><em>Three commercial routes.</em></h2></div>
        <div className="models-grid">
          <article data-reveal="left"><span>01</span><small>Long-term representation</small><h3>Exclusive agency</h3><p>A structured local relationship for manufacturers seeking focused representation and market development in Iraq.</p><ul><li>Local commercial presence</li><li>Customer development</li><li>Market feedback</li></ul></article>
          <article className="model-featured" data-reveal="up"><span>02</span><small>Stock-led market access</small><h3>Distribution</h3><p>A supply-led model supported by import coordination, storage readiness, and established local demand channels.</p><ul><li>Import coordination</li><li>Inventory positioning</li><li>Local supply execution</li></ul></article>
          <article data-reveal="right"><span>03</span><small>Brand-led expansion</small><h3>Franchise partnership</h3><p>A broader brand and operating relationship where product, market fit, and long-term ambition align.</p><ul><li>Market planning</li><li>Brand representation</li><li>Scalable development</li></ul></article>
        </div>
      </section>

      <section className="facility-proof">
        <div className="facility-proof-head" data-reveal="left"><p className="eyebrow">Facility capabilities</p><h2>Partnership backed<br /><em>by physical capacity.</em></h2></div>
        <div className="facility-panels">
          <article data-reveal="up"><Image src="/assets/yard-stock.jpg" alt="KH Wood strategic stockholding yard" fill sizes="(max-width: 820px) 100vw, 50vw" /><div><span>Strategic storage network</span><h3>Product availability needs a place to live.</h3><p>Extensive storage capacity supports inventory continuity and practical distribution across Iraq.</p></div></article>
          <article data-reveal="right"><Image src="/assets/forklift-operations.jpg" alt="KH Wood staging and handling operation" fill sizes="(max-width: 820px) 100vw, 50vw" /><div><span>Staging &amp; dispatch</span><h3>Market access has an operational layer.</h3><p>Handling, preparation, and dispatch capability turn commercial plans into real local supply.</p></div></article>
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

      <section className="partner-readiness">
        <div className="readiness-title" data-reveal="left"><p className="eyebrow">What makes a strong fit</p><h2>Clarity before<br /><em>commitment.</em></h2><p>We prefer a focused, evidence-led conversation about where the product fits and what success requires.</p></div>
        <div className="readiness-columns">
          <div data-reveal="up"><span>You bring</span><p>Proven product quality and documentation</p><p>Clear territory and partnership ambition</p><p>Commercially viable supply terms</p><p>Commitment to long-term market development</p></div>
          <div data-reveal="right"><span>KH Wood brings</span><p>Family-led Iraqi market knowledge</p><p>Local relationships and commercial access</p><p>Storage and distribution readiness</p><p>Ongoing market feedback and execution</p></div>
        </div>
      </section>

      <section className="partnership-fit">
        <div data-reveal="left"><p className="eyebrow">A good fit starts here</p><h2>Tell us your product,<br />market ambition,<br /><em>and preferred model.</em></h2></div>
        <div data-reveal="right"><p>We&apos;ll assess market relevance, operating requirements, and where KH Wood can add genuine value.</p><a className="button button-white" href="/contact?type=partner">Start the conversation <span>↗</span></a></div>
      </section>
    </SiteShell>
  );
}
