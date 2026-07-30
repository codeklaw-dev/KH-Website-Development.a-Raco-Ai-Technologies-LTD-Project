import { SiteShell } from "./components/SiteShell";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "KH Wood | Wood Supply & Market Access in Iraq",
  description: "Family-led timber and construction wood supply for Iraqi projects, plus trusted market access for international manufacturers.",
};

export default function Home() {
  return (
    <SiteShell>
      <section className="home-hero">
        <video autoPlay muted loop playsInline poster="/assets/kh-yard-poster.jpg" aria-hidden="true"><source src="/assets/kh-yard.mp4" type="video/mp4" /></video>
        <div className="home-hero-shade" />
        <div className="home-hero-content">
          <p className="eyebrow hero-animate one">Iraq &amp; Jordan · Family-led supply</p>
          <h1 className="hero-animate two">Wood moves<br /><em>business forward.</em></h1>
          <p className="hero-intro hero-animate three">A dependable supply partner for Iraqi projects—and a credible route into Iraq for international manufacturers.</p>
          <div className="hero-actions hero-animate four">
            <Link className="button button-red" href="/products">I need materials <span>↗</span></Link>
            <Link className="button button-ghost" href="/partners">I want to enter Iraq <span>↗</span></Link>
          </div>
        </div>
        <div className="hero-marker"><span>KH / 01</span><p>Supply · Distribution<br />Market access</p></div>
        <a className="hero-scroll" href="#choose">Explore <span>↓</span></a>
      </section>

      <section className="decision" id="choose">
        <div className="decision-heading" data-reveal="up">
          <p className="eyebrow">Choose your route</p>
          <h2>What brings you<br /><em>to KH Wood?</em></h2>
        </div>
        <div className="decision-cards">
          <Link href="/products" className="decision-card buyer" data-reveal="left">
            <span className="card-index">01 / Buyers &amp; projects</span>
            <div><h3>Source the right materials.</h3><p>Explore timber, panels, construction wood, and bulk project supply.</p></div>
            <b>View products <i>↗</i></b>
          </Link>
          <Link href="/partners" className="decision-card partner" data-reveal="right">
            <span className="card-index">02 / Global manufacturers</span>
            <div><h3>Build your route into Iraq.</h3><p>Understand our representation, import, stocking, and market-development model.</p></div>
            <b>Explore partnerships <i>↗</i></b>
          </Link>
        </div>
      </section>

      <section className="trust-strip" aria-label="KH Wood company facts">
        <div data-reveal><strong>30+</strong><span>Years of family<br />leadership experience</span></div>
        <div data-reveal><strong>27</strong><span>Acres of storage<br />and staging space</span></div>
        <div data-reveal><strong>3</strong><span>Offices across<br />Iraq and Jordan</span></div>
        <Link href="/company" data-reveal><small>Why companies choose KH Wood</small><b>Meet the company <i>↗</i></b></Link>
      </section>

      <section className="home-story">
        <div className="home-story-photo" data-reveal="left"><Image src="/assets/yard-wide.jpg" alt="KH Wood storage yard in Iraq" fill sizes="(max-width: 820px) 100vw, 58vw" /><span>Baghdad · Iraq</span></div>
        <div className="home-story-copy" data-reveal="right">
          <p className="eyebrow">Heritage with momentum</p>
          <h2>Family values.<br /><em>Commercial discipline.</em></h2>
          <p>KH Wood grew from carpentry roots into a modern supply and distribution business. The values stayed the same: accountability, hospitality, adaptability, and relationships built to last.</p>
          <Link className="text-link" href="/company">Read our story <span>↗</span></Link>
        </div>
      </section>

      <section className="home-capability">
        <div className="capability-title" data-reveal><p className="eyebrow">Visible capacity</p><h2>Built to stock.<br />Ready to supply.</h2></div>
        <div className="capability-visual" data-reveal="scale">
          <Image src="/assets/yard-loading.jpg" alt="Forklift moving packaged wood at a KH Wood facility" fill sizes="(max-width: 560px) 100vw, 88vw" />
          <Link href="/operations"><span>See how we operate</span><i>↗</i></Link>
        </div>
        <div className="capability-list" data-reveal>
          <p>Inventory readiness</p><p>Staging and handling</p><p>Import coordination</p><p>Project dispatch</p>
        </div>
      </section>

      <section className="home-cta" data-reveal="up">
        <p className="eyebrow">Your next move</p>
        <h2>Tell us what you&apos;re<br /><em>working towards.</em></h2>
        <Link className="button button-black" href="/contact">Start a commercial conversation <span>↗</span></Link>
      </section>
    </SiteShell>
  );
}
