import { SiteShell } from "../components/SiteShell";
import Link from "next/link";

export const metadata = {
  title: "Wood, Timber & Project Supply | KH Wood",
  description: "Explore KH Wood's commercial timber, panels, boards, construction wood, and bulk project supply capabilities in Iraq.",
};

const range = [
  { n: "01", title: "Wood & timber", copy: "Hardwood and softwood for construction, manufacturing, fit-out, and commercial use.", image: "/assets/hardwood.jpg", tag: "Core range" },
  { n: "02", title: "Panels & boards", copy: "Engineered panels and board products aligned to thickness, grade, finish, and volume.", image: "/assets/formwork.jpg", tag: "Specified supply" },
  { n: "03", title: "Project materials", copy: "Construction-related wood products sourced around programme, application, and delivery needs.", image: "/assets/timber-bundles.jpg", tag: "Project ready" },
  { n: "04", title: "Bulk requirements", copy: "Large-volume procurement with storage, staging, call-off, and dispatch coordination.", image: "/assets/yard-stock.jpg", tag: "High volume" },
  { n: "05", title: "Agency representation", copy: "Exclusive distribution and franchise pathways for international wood and construction-material brands.", image: "/assets/logistics-truck.jpg", tag: "Market access" },
];

export default function ProductsPage() {
  return (
    <SiteShell active="products">
      <section className="products-hero inner-hero">
        <div className="products-hero-title"><p className="eyebrow hero-animate one">Products &amp; supply</p><h1 className="hero-animate two">The right stock.<br /><em>The right scale.</em></h1></div>
        <div className="products-hero-note hero-animate three"><span>For buyers &amp; project teams</span><p>Tell us what the material needs to do, how much you need, and where it needs to go. We&apos;ll build the supply route around the requirement.</p><Link href="/contact?type=supply">Request a quote ↗</Link></div>
        <div className="products-hero-image hero-animate four"><img className="cover-image" src="/assets/hardwood.jpg" alt="Commercial hardwood bundles" fetchPriority="high" /></div>
      </section>

      <section className="catalogue-intro">
        <p className="catalogue-side" data-reveal="left">01 — Product families</p>
        <div data-reveal="up"><h2>Start with the use.<br /><em>We&apos;ll solve the supply.</em></h2></div>
        <p className="catalogue-copy" data-reveal="right">Our role goes beyond a list of stock. KH Wood helps buyers match product, quantity, availability, and delivery to the practical needs of the project.</p>
      </section>

      <section className="product-catalogue">
        {range.map((item, index) => <Link className={`catalogue-card card-${index + 1}`} href="/contact?type=supply" key={item.title} data-reveal={index % 2 ? "right" : "left"}>
          <img className="cover-image" src={item.image} alt={item.title} loading="lazy" decoding="async" />
          <span className="catalogue-shade" />
          <span className="catalogue-number">{item.n}</span>
          <small>{item.tag}</small>
          <div><h3>{item.title}</h3><p>{item.copy}</p><b>Enquire <i>↗</i></b></div>
        </Link>)}
      </section>

      <section className="material-marquee" aria-label="KH Wood supply capabilities"><div><span>Timber supply</span><i>◆</i><span>Panel products</span><i>◆</i><span>Project materials</span><i>◆</i><span>Bulk supply</span><i>◆</i><span>Market representation</span><i>◆</i></div></section>

      <section className="service-ledger">
        <div className="service-ledger-head" data-reveal="left"><p className="eyebrow">Comprehensive services</p><h2>More than stock<br /><em>on the ground.</em></h2><p>Our commercial role connects sourcing, market access, inventory, and project execution.</p></div>
        <div className="service-ledger-list">
          {[['Agency & franchise representation','Managing exclusive international partnerships and building a credible local market presence.','Representation'],['Import coordination','Supporting the practical movement of products into Iraq and aligning supply with demand.','Coordination'],['Bulk storage readiness','Maintaining space and handling capacity for continuity and high-volume response.','Capacity'],['Project supply support','Shaping material supply around programme, site, quantity, and delivery requirements.','Projects'],['Market-entry support','Helping international manufacturers understand opportunity, operating realities, and route to market.','Growth']].map(([title,text,label],index)=><article key={title} data-reveal="right"><span>0{index+1}</span><div><small>{label}</small><h3>{title}</h3><p>{text}</p></div><i>↗</i></article>)}
        </div>
      </section>

      <section className="application-field">
        <div className="application-image" data-reveal="left"><img className="cover-image" src="/assets/timber-bundles.jpg" alt="Timber bundles prepared for commercial applications" loading="lazy" decoding="async" /><div><span>From stock to site</span><strong>One supply partner.<br />Multiple applications.</strong></div></div>
        <div className="application-copy" data-reveal="right"><p className="eyebrow">Where our materials work</p><h2>Specified for<br /><em>real demand.</em></h2><ul><li><span>01</span>Construction &amp; civil works</li><li><span>02</span>Manufacturing &amp; industrial use</li><li><span>03</span>Residential &amp; commercial fit-out</li><li><span>04</span>Public and infrastructure procurement</li><li><span>05</span>Wholesale and recurring supply</li></ul></div>
      </section>

      <section className="supply-method">
        <div className="method-title" data-reveal="left"><p className="eyebrow">A clearer enquiry</p><h2>Four details help us<br /><em>move faster.</em></h2></div>
        <ol className="method-steps">
          <li data-reveal><span>01</span><div><b>Application</b><p>What will the material be used for?</p></div></li>
          <li data-reveal><span>02</span><div><b>Specification</b><p>Species, grade, dimensions, finish, or standard.</p></div></li>
          <li data-reveal><span>03</span><div><b>Volume</b><p>Required quantity and expected call-off pattern.</p></div></li>
          <li data-reveal><span>04</span><div><b>Destination</b><p>Project location and target delivery window.</p></div></li>
        </ol>
      </section>

      <section className="product-questions">
        <div data-reveal="left"><p className="eyebrow">Before you enquire</p><h2>Useful answers for<br /><em>serious buyers.</em></h2></div>
        <div className="question-list">
          <details data-reveal><summary>Can KH Wood support large-volume project requirements?<span>+</span></summary><p>Yes. The company&apos;s stated 27-acre storage footprint is designed to support high-volume stockholding, staging, and coordinated supply.</p></details>
          <details data-reveal><summary>Can you source around a specification?<span>+</span></summary><p>Share the application, species or product type, dimensions, grade, volume, and destination. The team will assess the most practical supply response.</p></details>
          <details data-reveal><summary>Do you only supply wood?<span>+</span></summary><p>KH Wood focuses on timber, panels, boards, construction-related wood materials, and selected international representation opportunities.</p></details>
          <details data-reveal><summary>What information helps with pricing?<span>+</span></summary><p>Quantity, specification, target delivery date, project location, and any required call-off schedule help the team evaluate the requirement efficiently.</p></details>
        </div>
      </section>

      <section className="product-cta"><div data-reveal><p className="eyebrow">Have a specification?</p><h2>Send the requirement.<br />We&apos;ll take it from there.</h2></div><Link className="button button-red" href="/contact?type=supply">Request product supply <span>↗</span></Link></section>
    </SiteShell>
  );
}
