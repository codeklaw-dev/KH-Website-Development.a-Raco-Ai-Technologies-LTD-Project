import { SiteShell } from "../components/SiteShell";
import Image from "next/image";

export const metadata = {
  title: "Storage, Handling & Distribution | KH Wood Operations",
  description: "See how KH Wood receives, stores, stages, and dispatches high-volume wood supply across Iraq.",
};

export default function OperationsPage() {
  return (
    <SiteShell active="operations">
      <section className="operations-hero inner-hero">
        <Image className="operations-hero-image" src="/assets/yard-wide.jpg" alt="Wide view of the KH Wood storage facility" fill priority sizes="100vw" />
        <div className="operations-hero-shade" />
        <div className="operations-hero-copy"><p className="eyebrow hero-animate one">Operations &amp; capacity</p><h1 className="hero-animate two">Stocked for scale.<br /><em>Run with control.</em></h1><p className="hero-animate three">From arrival and storage to staging and dispatch, our operation is organised around material readiness.</p></div>
        <div className="ops-status hero-animate four"><span><i /> Operations active</span><p>Storage · Handling · Dispatch</p></div>
      </section>

      <nav className="page-rail page-rail-dark" aria-label="Operations page sections"><span>Operational view</span><a href="#flow">Material flow</a><a href="#facility">Facility</a><a href="#controls">Controls</a><a href="#capacity">Capabilities</a><a href="#questions">Questions</a></nav>

      <section className="ops-overview">
        <div className="ops-stat" data-reveal="left"><strong>27</strong><span>Acres of storage<br />and staging capacity</span></div>
        <div className="ops-overview-copy" data-reveal="up"><p className="eyebrow">Infrastructure with a purpose</p><h2>Space only matters<br /><em>when it moves well.</em></h2></div>
        <p data-reveal="right">KH Wood&apos;s operating footprint supports high-volume stockholding, organised handling, and supply coordination for recurring demand and project schedules.</p>
      </section>

      <section className="operations-flow" id="flow">
        <div className="flow-spine" aria-hidden="true"><span /></div>
        {[['01','Arrive','Imported and locally sourced materials enter a controlled receiving process.','/assets/logistics-truck.jpg'],['02','Store','Stock is organised for visibility, protection, and practical access.','/assets/yard-stock.jpg'],['03','Stage','Materials are selected, grouped, and prepared around the requirement.','/assets/forklift-operations.jpg'],['04','Dispatch','Loads are coordinated for commercial, construction, and project destinations.','/assets/yard-loading.jpg']].map(([n,title,text,image], index)=><article className={`flow-step step-${index+1}`} key={title} data-reveal={index%2 ? 'right':'left'}><div className="flow-image"><Image src={image} alt={`${title} stage at KH Wood`} fill sizes="(max-width: 820px) 100vw, 32vw" /></div><div className="flow-copy"><span>{n}</span><h3>{title}</h3><p>{text}</p></div></article>)}
      </section>

      <section className="facility-gallery" id="facility">
        <div className="facility-gallery-title" data-reveal="left"><p className="eyebrow">Inside the operation</p><h2>Capacity you can<br /><em>see and understand.</em></h2><p>Real photography from the storage and handling environment—because operational credibility should be visible.</p></div>
        <figure className="gallery-a" data-reveal="up"><Image src="/assets/yard-stock.jpg" alt="Organised wood stock in the KH Wood yard" fill sizes="(max-width: 820px) 100vw, 55vw" /><figcaption>Stockholding · Inventory readiness</figcaption></figure>
        <figure className="gallery-b" data-reveal="right"><Image src="/assets/pallet-stacks.jpg" alt="Palletised materials prepared in storage" fill sizes="(max-width: 820px) 100vw, 35vw" /><figcaption>Staged materials · Commercial supply</figcaption></figure>
        <figure className="gallery-c" data-reveal="left"><Image src="/assets/forklift-operations.jpg" alt="Forklift handling materials" fill sizes="(max-width: 820px) 100vw, 35vw" /><figcaption>Handling · Yard movement</figcaption></figure>
        <figure className="gallery-d" data-reveal="right"><Image src="/assets/yard-loading.jpg" alt="Loading activity for KH Wood dispatch" fill sizes="(max-width: 820px) 100vw, 55vw" /><figcaption>Dispatch · Load coordination</figcaption></figure>
      </section>

      <section className="control-system" id="controls">
        <div className="control-system-copy" data-reveal="left"><p className="eyebrow">Practical supply control</p><h2>Visibility at<br /><em>every handover.</em></h2><p>KH Wood&apos;s process is designed to keep commercial teams informed and requirements aligned as materials move through the operation.</p><a className="text-link" href="/contact?type=supply">Plan a requirement <span>↗</span></a></div>
        <div className="control-system-grid">
          {[['Requirement review','Confirm product, volume, destination, and timing before coordination begins.'],['Availability alignment','Match the request to current stock, sourcing route, and practical lead time.'],['Staging visibility','Prepare loads around the agreed requirement and dispatch sequence.'],['Communication','Keep the commercial contact informed as the supply plan moves forward.']].map(([title,text],index)=><article key={title} data-reveal="right"><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="capacity-blueprint">
        <div className="blueprint-grid" aria-hidden="true" />
        <div className="blueprint-head" data-reveal="left"><p className="eyebrow">The operating blueprint</p><h2>Physical space.<br /><em>Commercial purpose.</em></h2><p>The 27-acre footprint supports a connected set of operational jobs—not simply storage.</p></div>
        <div className="blueprint-diagram" data-reveal="scale"><div className="blueprint-core"><strong>27</strong><span>Acres</span></div><div className="blueprint-node node-a"><span>Receive</span><small>Inbound coordination</small></div><div className="blueprint-node node-b"><span>Hold</span><small>Stock readiness</small></div><div className="blueprint-node node-c"><span>Prepare</span><small>Staging &amp; handling</small></div><div className="blueprint-node node-d"><span>Dispatch</span><small>Supply execution</small></div></div>
      </section>

      <section className="operation-scenarios">
        <div className="scenario-head" data-reveal><p className="eyebrow">Built for different demand patterns</p><h2>One operation.<br />Three supply realities.</h2></div>
        <div className="scenario-grid"><article data-reveal="left"><span>Recurring</span><h3>Ongoing commercial demand</h3><p>Inventory planning and repeat supply for established purchasing patterns.</p></article><article data-reveal="up"><span>Project</span><h3>Programme-led requirements</h3><p>Staging and dispatch coordination around project location, phasing, and timing.</p></article><article data-reveal="right"><span>Market entry</span><h3>New product positioning</h3><p>Physical capacity to support international products entering the Iraqi market.</p></article></div>
      </section>

      <section className="operations-board" id="capacity">
        <div className="board-heading" data-reveal="left"><p className="eyebrow">Operational capabilities</p><h2>Ready for everyday<br /><em>and exceptional demand.</em></h2></div>
        <div className="board-grid" data-reveal="right">
          <div><span>01</span><p>Inventory readiness</p></div><div><span>02</span><p>Forklift handling</p></div><div><span>03</span><p>Stock staging</p></div><div><span>04</span><p>Bulk load coordination</p></div><div><span>05</span><p>Import support</p></div><div><span>06</span><p>Project dispatch</p></div>
        </div>
      </section>

      <section className="operations-faq" id="questions">
        <div data-reveal="left"><p className="eyebrow">Operational questions</p><h2>Plan with<br /><em>the real variables.</em></h2></div>
        <div className="question-list"><details data-reveal><summary>What does the 27-acre footprint support?<span>+</span></summary><p>It supports high-volume stockholding, material organisation, staging, handling, and coordinated dispatch for commercial and project requirements.</p></details><details data-reveal><summary>Can supply be organised around project phases?<span>+</span></summary><p>Share the expected quantity, site, timing, and call-off pattern. KH Wood can assess a practical staging and dispatch plan around those requirements.</p></details><details data-reveal><summary>Does KH Wood manage imported products?<span>+</span></summary><p>Import and distribution coordination is part of the company&apos;s service model, especially for approved international manufacturer partnerships.</p></details><details data-reveal><summary>How should urgent requirements be raised?<span>+</span></summary><p>Use WhatsApp or the contact form with the product, volume, destination, and required date clearly stated. Availability and feasibility must be confirmed by the team.</p></details></div>
      </section>

      <section className="ops-close"><div data-reveal><p className="eyebrow">Plan the requirement</p><h2>Volume, timing,<br /><em>destination.</em></h2></div><p data-reveal>Bring us the operating realities of the project. We&apos;ll help shape a practical supply plan around them.</p><a className="button button-red" href="/contact?type=supply">Discuss supply logistics <span>↗</span></a></section>
    </SiteShell>
  );
}
