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

      <section className="ops-overview">
        <div className="ops-stat" data-reveal="left"><strong>27</strong><span>Acres of storage<br />and staging capacity</span></div>
        <div className="ops-overview-copy" data-reveal="up"><p className="eyebrow">Infrastructure with a purpose</p><h2>Space only matters<br /><em>when it moves well.</em></h2></div>
        <p data-reveal="right">KH Wood&apos;s operating footprint supports high-volume stockholding, organised handling, and supply coordination for recurring demand and project schedules.</p>
      </section>

      <section className="operations-flow">
        <div className="flow-spine" aria-hidden="true"><span /></div>
        {[['01','Arrive','Imported and locally sourced materials enter a controlled receiving process.','/assets/logistics-truck.jpg'],['02','Store','Stock is organised for visibility, protection, and practical access.','/assets/yard-stock.jpg'],['03','Stage','Materials are selected, grouped, and prepared around the requirement.','/assets/forklift-operations.jpg'],['04','Dispatch','Loads are coordinated for commercial, construction, and project destinations.','/assets/yard-loading.jpg']].map(([n,title,text,image], index)=><article className={`flow-step step-${index+1}`} key={title} data-reveal={index%2 ? 'right':'left'}><div className="flow-image"><Image src={image} alt={`${title} stage at KH Wood`} fill sizes="(max-width: 820px) 100vw, 32vw" /></div><div className="flow-copy"><span>{n}</span><h3>{title}</h3><p>{text}</p></div></article>)}
      </section>

      <section className="facility-gallery">
        <div className="facility-gallery-title" data-reveal="left"><p className="eyebrow">Inside the operation</p><h2>Capacity you can<br /><em>see and understand.</em></h2><p>Real photography from the storage and handling environment—because operational credibility should be visible.</p></div>
        <figure className="gallery-a" data-reveal="up"><Image src="/assets/yard-stock.jpg" alt="Organised wood stock in the KH Wood yard" fill sizes="(max-width: 820px) 100vw, 55vw" /><figcaption>Stockholding · Inventory readiness</figcaption></figure>
        <figure className="gallery-b" data-reveal="right"><Image src="/assets/pallet-stacks.jpg" alt="Palletised materials prepared in storage" fill sizes="(max-width: 820px) 100vw, 35vw" /><figcaption>Staged materials · Commercial supply</figcaption></figure>
        <figure className="gallery-c" data-reveal="left"><Image src="/assets/forklift-operations.jpg" alt="Forklift handling materials" fill sizes="(max-width: 820px) 100vw, 35vw" /><figcaption>Handling · Yard movement</figcaption></figure>
        <figure className="gallery-d" data-reveal="right"><Image src="/assets/yard-loading.jpg" alt="Loading activity for KH Wood dispatch" fill sizes="(max-width: 820px) 100vw, 55vw" /><figcaption>Dispatch · Load coordination</figcaption></figure>
      </section>

      <section className="control-system">
        <div className="control-system-copy" data-reveal="left"><p className="eyebrow">Practical supply control</p><h2>Visibility at<br /><em>every handover.</em></h2><p>KH Wood&apos;s process is designed to keep commercial teams informed and requirements aligned as materials move through the operation.</p><a className="text-link" href="/contact?type=supply">Plan a requirement <span>↗</span></a></div>
        <div className="control-system-grid">
          {[['Requirement review','Confirm product, volume, destination, and timing before coordination begins.'],['Availability alignment','Match the request to current stock, sourcing route, and practical lead time.'],['Staging visibility','Prepare loads around the agreed requirement and dispatch sequence.'],['Communication','Keep the commercial contact informed as the supply plan moves forward.']].map(([title,text],index)=><article key={title} data-reveal="right"><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="operation-scenarios">
        <div className="scenario-head" data-reveal><p className="eyebrow">Built for different demand patterns</p><h2>One operation.<br />Three supply realities.</h2></div>
        <div className="scenario-grid"><article data-reveal="left"><span>Recurring</span><h3>Ongoing commercial demand</h3><p>Inventory planning and repeat supply for established purchasing patterns.</p></article><article data-reveal="up"><span>Project</span><h3>Programme-led requirements</h3><p>Staging and dispatch coordination around project location, phasing, and timing.</p></article><article data-reveal="right"><span>Market entry</span><h3>New product positioning</h3><p>Physical capacity to support international products entering the Iraqi market.</p></article></div>
      </section>

      <section className="operations-board">
        <div className="board-heading" data-reveal="left"><p className="eyebrow">Operational capabilities</p><h2>Ready for everyday<br /><em>and exceptional demand.</em></h2></div>
        <div className="board-grid" data-reveal="right">
          <div><span>01</span><p>Inventory readiness</p></div><div><span>02</span><p>Forklift handling</p></div><div><span>03</span><p>Stock staging</p></div><div><span>04</span><p>Bulk load coordination</p></div><div><span>05</span><p>Import support</p></div><div><span>06</span><p>Project dispatch</p></div>
        </div>
      </section>

      <section className="ops-close"><div data-reveal><p className="eyebrow">Plan the requirement</p><h2>Volume, timing,<br /><em>destination.</em></h2></div><p data-reveal>Bring us the operating realities of the project. We&apos;ll help shape a practical supply plan around them.</p><a className="button button-red" href="/contact?type=supply">Discuss supply logistics <span>↗</span></a></section>
    </SiteShell>
  );
}
