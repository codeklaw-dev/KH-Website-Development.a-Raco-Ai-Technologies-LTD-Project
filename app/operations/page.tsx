import { SiteShell } from "../components/SiteShell";
import Link from "next/link";

export const metadata = {
  title: "Storage, Handling & Distribution | KH Wood Operations",
  description: "See how KH Wood receives, stores, stages, and dispatches high-volume wood supply across Iraq.",
};

export default function OperationsPage() {
  return (
    <SiteShell active="operations">
      <section className="operations-hero inner-hero">
        <img className="operations-hero-image cover-image" src="/assets/yard-wide.jpg" alt="Wide view of the KH Wood storage facility" fetchPriority="high" />
        <div className="operations-hero-shade" />
        <div className="operations-hero-copy"><p className="eyebrow hero-animate one">Operations &amp; capacity</p><h1 className="hero-animate two">Stocked for scale.<br /><em>Run with control.</em></h1><p className="hero-animate three">From arrival and storage to staging and dispatch, our operation is organised around material readiness.</p></div>
        <div className="ops-status hero-animate four"><span><i /> Operations active</span><p>Storage · Handling · Dispatch</p></div>
      </section>

      <nav className="page-rail page-rail-dark" aria-label="Operations page sections"><span>Operational view</span><a href="#flow">Material flow</a><a href="#infrastructure">Warehousing &amp; logistics</a><a href="#demand">Demand patterns</a><a href="#questions">Questions</a></nav>

      <section className="ops-overview">
        <div className="ops-stat" data-reveal="left"><strong>27</strong><span>Acres</span></div>
        <div className="ops-overview-copy" data-reveal="up">
          <p className="eyebrow">Infrastructure with a purpose</p>
          <h2>Space only matters<br /><em>when it moves well.</em></h2>
          <p>KH Wood&apos;s operating footprint supports high-volume stockholding, organised handling, and supply coordination for recurring demand and project schedules.</p>
        </div>
      </section>

      <section className="operations-flow" id="flow">
        <div className="flow-head" data-reveal="up"><p className="eyebrow">Material flow</p><h2>Four stages,<br /><em>one continuous line.</em></h2></div>
        <div className="flow-track">
          {[['01','Arrive','Imported and locally sourced materials enter a controlled receiving process.','/assets/operations-flow-arrive.jpg'],['02','Store','Stock is organised for visibility, protection, and practical access.','/assets/operations-flow-store.jpg'],['03','Stage','Materials are selected, grouped, and prepared around the requirement.','/assets/operations-flow-stage.jpg'],['04','Dispatch','Loads are coordinated for commercial, construction, and project destinations.','/assets/operations-flow-dispatch.jpg']].map(([n,title,text,image], index)=>(
            <article className="flow-step" key={title} data-reveal="up" style={{transitionDelay:`${index*80}ms`}}>
              <div className="flow-image"><img className="cover-image" src={image} alt={`${title} stage at KH Wood`} loading="lazy" decoding="async" /><b>{n}</b></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="operations-infrastructure" id="infrastructure">
        <div className="infrastructure-heading" data-reveal="up">
          <div><p className="eyebrow">Warehousing &amp; logistics infrastructure</p><h2><strong>27 acres.</strong><br /><em>One national supply system.</em></h2></div>
          <p>KH Wood combines high-volume stockholding, practical handling, import coordination, and organised dispatch to support commercial and project demand across Iraq.</p>
        </div>

        <div className="infrastructure-mosaic">
          <figure className="infrastructure-main" data-reveal="left">
            <img className="cover-image" src="/assets/home-material-destinations.jpg" alt="Aerial view of KH Wood's extensive warehousing and timber storage infrastructure" loading="lazy" decoding="async" />
            <div className="infrastructure-image-shade" />
            <figcaption><strong>27</strong><span>Acres of operating capacity</span></figcaption>
          </figure>

          <article className="infrastructure-control" data-reveal="right">
            <span>Control at every handover</span>
            <h3>From arrival to nationwide dispatch.</h3>
            <p>One coordinated operating model connects incoming supply, protected stock, load preparation, and delivery planning.</p>
            <ol><li>Receive &amp; verify</li><li>Store &amp; organise</li><li>Stage &amp; load</li><li>Coordinate delivery</li></ol>
            <Link className="text-link" href="/contact?type=supply">Plan a requirement <span>↗</span></Link>
          </article>

          <figure className="infrastructure-road" data-reveal="right"><img className="cover-image" src="/assets/operations-national-logistics.jpg" alt="Freight vehicles travelling as part of a national logistics network" loading="lazy" decoding="async" /><figcaption>Nationwide delivery <span>Iraq</span></figcaption></figure>
          <figure className="infrastructure-port" data-reveal="left"><img className="cover-image" src="/assets/home-visible-capacity.jpg" alt="Imported timber being handled between port and warehouse" loading="lazy" decoding="async" /><figcaption>Import coordination <span>Port to yard</span></figcaption></figure>
          <figure className="infrastructure-fleet" data-reveal="up"><img className="cover-image" src="/assets/operations-flow-arrive.jpg" alt="KH Wood fleet staged for high-volume timber distribution" loading="lazy" decoding="async" /><figcaption>Fleet readiness <span>Volume at call</span></figcaption></figure>
        </div>

        <div className="infrastructure-controls" data-reveal="up">
          {[["01","Inventory visibility"],["02","Protected stockholding"],["03","Load staging"],["04","Nationwide coordination"]].map(([number,label])=><div key={number}><span>{number}</span><p>{label}</p></div>)}
        </div>
      </section>

      <section className="operation-scenarios" id="demand">
        <div className="scenario-head" data-reveal><p className="eyebrow">Built for different demand patterns</p><h2>One operation.<br />Three supply realities.</h2></div>
        <div className="scenario-grid"><article data-reveal="left"><span>Recurring</span><h3>Ongoing commercial demand</h3><p>Inventory planning and repeat supply for established purchasing patterns.</p></article><article data-reveal="up"><span>Project</span><h3>Programme-led requirements</h3><p>Staging and dispatch coordination around project location, phasing, and timing.</p></article><article data-reveal="right"><span>Market entry</span><h3>New product positioning</h3><p>Physical capacity to support international products entering the Iraqi market.</p></article></div>
      </section>

      <section className="operations-faq" id="questions">
        <div data-reveal="left"><p className="eyebrow">Operational questions</p><h2>Plan with<br /><em>the real variables.</em></h2></div>
        <div className="question-list"><details data-reveal><summary>What does the 27-acre footprint support?<span>+</span></summary><p>It supports high-volume stockholding, material organisation, staging, handling, and coordinated dispatch for commercial and project requirements.</p></details><details data-reveal><summary>Can supply be organised around project phases?<span>+</span></summary><p>Share the expected quantity, site, timing, and call-off pattern. KH Wood can assess a practical staging and dispatch plan around those requirements.</p></details><details data-reveal><summary>Does KH Wood manage imported products?<span>+</span></summary><p>Import and distribution coordination is part of the company&apos;s service model, especially for approved international manufacturer partnerships.</p></details><details data-reveal><summary>How should urgent requirements be raised?<span>+</span></summary><p>Use WhatsApp or the contact form with the product, volume, destination, and required date clearly stated. Availability and feasibility must be confirmed by the team.</p></details></div>
      </section>

      <section className="ops-close"><div data-reveal><p className="eyebrow">Plan the requirement</p><h2>Volume, timing,<br /><em>destination.</em></h2></div><p data-reveal>Bring us the operating realities of the project. We&apos;ll help shape a practical supply plan around them.</p><Link className="button button-red" href="/contact?type=supply">Discuss supply logistics <span>↗</span></Link></section>
    </SiteShell>
  );
}
