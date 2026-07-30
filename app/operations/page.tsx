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
