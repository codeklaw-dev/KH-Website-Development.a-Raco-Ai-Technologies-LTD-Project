import { SiteShell } from "../components/SiteShell";
import { PartnerLogoRail } from "../components/PartnerLogoRail";
import Link from "next/link";

export const metadata = {
  title: "Enter the Iraqi Market | KH Wood Partnerships",
  description: "Local representation, import coordination, stocking, and market development for international manufacturers entering Iraq.",
};

export default function PartnersPage() {
  return (
    <SiteShell active="partners">
      <section className="partners-hero inner-hero">
        <img className="partners-hero-image cover-image" src="/assets/partners-hero.jpg" alt="" aria-hidden="true" fetchPriority="high" />
        <div className="partners-hero-wash" aria-hidden="true" />
        <div className="partner-coordinate hero-animate one"><span>33.3152° N</span><i>44.3661° E</i></div>
        <div className="partners-hero-copy"><p className="eyebrow hero-animate one">For international manufacturers</p><h1 className="hero-animate two">Your route into<br /><em>the Iraqi market.</em></h1><p className="hero-animate three">Local representation, market knowledge, supply infrastructure, and commercial relationships—working as one route to growth.</p><Link className="button button-red hero-animate four" href="/contact?type=partner">Discuss a partnership <span>↗</span></Link></div>
      </section>

      <nav className="page-rail page-rail-dark" aria-label="Partners page sections"><span>Partner pathway</span><a href="#network">Who we work with</a><a href="#route">Market-entry route</a><a href="#models">Partnership models</a><a href="#facilities">Facilities</a><a href="#fit">Partnership fit</a></nav>

      <section className="market-fit" id="network">
        <div className="market-fit-heading">
          <div data-reveal="left"><p className="eyebrow">Why manufacturers work with us</p><h2>Getting in is easy.<br /><em>Selling here takes a partner.</em></h2></div>
          <p data-reveal="right">Introductions are simple. Selling in Iraq takes real relationships, stock already in the country, and someone who sees it through—that&apos;s what KH Wood brings. We work with manufacturers whose products fit real demand here and who want a serious local partner to sell them.</p>
        </div>
        <div className="market-fit-list" data-reveal>
          <span className="market-fit-list-label">Who we&apos;re building this network with</span>
          <div className="market-fit-list-grid">
            <p><span>01</span>International timber manufacturers</p>
            <p><span>02</span>Wood and raw-material suppliers</p>
            <p><span>03</span>Panel and board manufacturers</p>
            <p><span>04</span>Construction-material companies</p>
            <p><span>05</span>Exclusive distribution partners</p>
          </div>
        </div>
      </section>

      <section className="partners-logo-network" aria-labelledby="partners-logo-heading">
        <div data-reveal="up">
          <p className="eyebrow">Partner network</p>
          <h2 id="partners-logo-heading">Brands and standards.<br /><em>Connected through KH.</em></h2>
        </div>
        <PartnerLogoRail />
      </section>

      <section className="entry-path" id="route">
        <div className="entry-path-visual" data-reveal="left"><img className="cover-image" src="/assets/logistics-truck.jpg" alt="KH Wood logistics truck carrying timber" loading="lazy" decoding="async" /><div><span>From manufacturer</span><b>One connected route</b><span>To the Iraqi market</span></div></div>
        <div className="entry-steps">
          {[['01','Market fit','Align the product, opportunity, customer profile, and commercial model.'],['02','Representation','Structure a practical local agency, franchise, or distribution relationship.'],['03','Import & stock','Coordinate entry, storage, inventory readiness, and local availability.'],['04','Market growth','Build durable demand through established relationships and market feedback.']].map(([n,title,text],index)=><article key={title} data-reveal="right" style={{transitionDelay:`${index*70}ms`}}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </section>

      <section className="partnership-models" id="models">
        <div className="models-title" data-reveal><p className="eyebrow">Ways to work together</p><h2>One market.<br /><em>Three commercial routes.</em></h2></div>
        <div className="models-grid">
          <article data-reveal="left"><span>01</span><small>Long-term representation</small><h3>Exclusive agency</h3><p>A structured local relationship for manufacturers seeking focused representation and market development in Iraq.</p><ul><li>Local commercial presence</li><li>Customer development</li><li>Market feedback</li></ul></article>
          <article className="model-featured" data-reveal="up"><span>02</span><small>Stock-led market access</small><h3>Distribution</h3><p>A supply-led model supported by import coordination, storage readiness, and established local demand channels.</p><ul><li>Import coordination</li><li>Inventory positioning</li><li>Local supply execution</li></ul></article>
          <article data-reveal="right"><span>03</span><small>Brand-led expansion</small><h3>Franchise partnership</h3><p>A broader brand and operating relationship where product, market fit, and long-term ambition align.</p><ul><li>Market planning</li><li>Brand representation</li><li>Scalable development</li></ul></article>
        </div>
      </section>

      <section className="partner-lifecycle">
        <div className="lifecycle-head" data-reveal="left"><p className="eyebrow">From first hello to growing together</p><h2>Five simple steps.<br /><em>No surprises.</em></h2><p>We keep things clear from day one—so you always know what happens next, and what we&apos;re each responsible for.</p></div>
        <div className="lifecycle-line" aria-hidden="true"><span /></div>
        <div className="lifecycle-steps">
          <article data-reveal="right"><span>01</span><h3>Say hello</h3><p>Tell us about your products and where you&apos;d like to sell them in Iraq.</p><small>You get · A real answer, fast</small></article>
          <article data-reveal="right"><span>02</span><h3>We take a look</h3><p>We check the fit—your product, our market, and whether it makes sense for both of us.</p><small>You get · A clear yes or no</small></article>
          <article data-reveal="right"><span>03</span><h3>We shake on it</h3><p>We agree who does what, how we&apos;ll sell, and what success looks like.</p><small>You get · A simple, fair agreement</small></article>
          <article data-reveal="right"><span>04</span><h3>We get moving</h3><p>We bring in stock, set up storage, and start telling the market you&apos;re here.</p><small>You get · Ready to sell in Iraq</small></article>
          <article data-reveal="right"><span>05</span><h3>We grow together</h3><p>We listen to customers, keep the stock flowing, and build on what&apos;s working.</p><small>You get · Steady, lasting growth</small></article>
        </div>
      </section>

      <section className="facility-proof" id="facilities">
        <div className="facility-proof-head" data-reveal="left"><p className="eyebrow">Facility capabilities</p><h2>Partnership backed<br /><em>by physical capacity.</em></h2></div>
        <div className="facility-panels">
          <article data-reveal="up"><img className="cover-image" src="/assets/yard-stock.jpg" alt="KH Wood strategic stockholding yard" loading="lazy" decoding="async" /><div><span>Strategic storage network</span><h3>Product availability needs a place to live.</h3><p>Extensive storage capacity supports inventory continuity and practical distribution across Iraq.</p></div></article>
          <article data-reveal="right"><img className="cover-image" src="/assets/forklift-operations.jpg" alt="KH Wood staging and handling operation" loading="lazy" decoding="async" /><div><span>Staging &amp; dispatch</span><h3>Market access has an operational layer.</h3><p>Handling, preparation, and dispatch capability turn commercial plans into real local supply.</p></div></article>
        </div>
      </section>

      <section className="partner-advantage">
        <div className="advantage-heading" data-reveal="left"><p className="eyebrow">Why KH Wood</p><h2>A partner who can<br /><em>carry the detail.</em></h2></div>
        <div className="advantage-grid">
          <article data-reveal><span>Network</span><h3>Commercial relationships</h3><p>Long-standing connections across Iraqi construction, manufacturing, and supply.</p></article>
          <article data-reveal><span>Infrastructure</span><h3>Stocking capability</h3><p>Space and handling capacity to support real product availability.</p></article>
          <article data-reveal><span>Insight</span><h3>Local feedback</h3><p>Practical market intelligence that helps improve product-market alignment.</p></article>
          <article data-reveal><span>Continuity</span><h3>Ownership continuity</h3><p>Senior involvement and a long-term view of every partnership.</p></article>
        </div>
      </section>

      <section className="partner-readiness" id="fit">
        <div className="readiness-title" data-reveal="left"><p className="eyebrow">What makes a strong fit</p><h2>Clarity before<br /><em>commitment.</em></h2><p>We prefer a focused, evidence-led conversation about where the product fits and what success requires.</p></div>
        <div className="readiness-columns">
          <div data-reveal="up"><span>You bring</span><p>Proven product quality and documentation</p><p>Clear territory and partnership ambition</p><p>Commercially viable supply terms</p><p>Commitment to long-term market development</p></div>
          <div data-reveal="right"><span>KH Wood brings</span><p>Principal-led Iraqi market knowledge</p><p>Local relationships and commercial access</p><p>Storage and distribution readiness</p><p>Ongoing market feedback and execution</p></div>
        </div>
      </section>

      <section className="partner-faq">
        <div data-reveal="left"><p className="eyebrow">Partnership questions</p><h2>Start with<br /><em>the essentials.</em></h2></div>
        <div className="question-list"><details data-reveal><summary>Which international manufacturers are a good fit?<span>+</span></summary><p>Established timber, panel, board, and construction-material manufacturers with proven products, reliable supply, and a serious long-term ambition for Iraq.</p></details><details data-reveal><summary>Does KH Wood offer exclusive representation?<span>+</span></summary><p>Exclusive agency, distribution, and franchise structures can be considered where product fit, territory, commercial terms, and responsibilities are mutually aligned.</p></details><details data-reveal><summary>What should an introductory proposal include?<span>+</span></summary><p>Include a company profile, product catalogue, certifications or product documentation, current export markets, indicative commercial terms, and the partnership model you are seeking.</p></details><details data-reveal><summary>What happens after the first meeting?<span>+</span></summary><p>KH Wood evaluates relevance, market opportunity, supply readiness, and the practical operating model before agreeing a clear next step.</p></details></div>
      </section>

      <section className="partnership-fit">
        <div data-reveal="left"><p className="eyebrow">A good fit starts here</p><h2>Tell us your product,<br />market ambition,<br /><em>and preferred model.</em></h2></div>
        <div data-reveal="right"><p>We&apos;ll assess market relevance, operating requirements, and where KH Wood can add genuine value.</p><Link className="button button-white" href="/contact?type=partner">Start the conversation <span>↗</span></Link></div>
      </section>
    </SiteShell>
  );
}
