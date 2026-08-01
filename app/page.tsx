import { SiteShell } from "./components/SiteShell";
import { LegacyScroll } from "./components/LegacyScroll";
import Link from "next/link";

export const metadata = {
  title: "KH Wood | Wood Supply & Market Access in Iraq",
  description: "Principal-led timber and construction supply for Iraqi projects, plus proven market access for international manufacturers.",
};

export default function Home() {
  return (
    <SiteShell>
      <section className="home-hero">
        <video autoPlay muted loop playsInline poster="/assets/kh-yard-poster.jpg" aria-hidden="true"><source src="/assets/kh-yard.mp4" type="video/mp4" /></video>
        <div className="home-hero-shade" />
        <div className="home-hero-content">
          <p className="eyebrow hero-animate one">Iraq &amp; Jordan · Principal-led supply</p>
          <h1 className="hero-animate two">Wood moves<br /><em>business forward.</em></h1>
          <p className="hero-intro hero-animate three">A dependable supply partner for Iraqi projects, a credible route into Iraq for international manufacturers, and a franchise worth carrying for local distributors.</p>
          <div className="hero-actions hero-animate four">
            <Link className="button button-red" href="/products">I need materials <span>↗</span></Link>
            <Link className="button button-ghost" href="/partners">I want to enter Iraq <span>↗</span></Link>
          </div>
        </div>
        <div className="hero-marker"><span>KH / 01</span><p>Supply · Distribution<br />Market access</p></div>
        <a className="hero-scroll" href="#legacy">Explore <span>↓</span></a>
      </section>

      <LegacyScroll />

      <section className="decision" id="choose">
        <video className="decision-video" autoPlay muted loop playsInline aria-hidden="true"><source src="/assets/kh-routes.mp4" type="video/mp4" /></video>
        <div className="decision-shade" />
        <div className="decision-heading" data-reveal="up">
          <p className="eyebrow">Choose your route</p>
          <h2>What brings you<br /><em>to KH Wood?</em></h2>
        </div>
        <div className="decision-cards">
          <Link href="/products" className="decision-card buyer" data-reveal="left">
            <span className="card-index">01 / Buyers &amp; projects</span>
            <div><h3>Source the right materials.</h3><p>Timber, panels, construction wood, and bulk project supply&mdash;from stock held in Iraq.</p></div>
            <b>View products <i>↗</i></b>
          </Link>
          <Link href="/partners" className="decision-card partner" data-reveal="up">
            <span className="card-index">02 / Global manufacturers</span>
            <div><h3>Build your route into Iraq.</h3><p>Agency, distribution, and market entry for manufacturers seeking a local operating partner.</p></div>
            <b>Explore partnerships <i>↗</i></b>
          </Link>
          <Link href="/franchise" className="decision-card franchise" data-reveal="right">
            <span className="card-index">03 / Distributors &amp; traders</span>
            <div><h3>Carry the KH name.</h3><p>Take a franchise in your territory: exclusive brands, stocked yards, and principal-led backing.</p></div>
            <b>Franchise opportunities <i>↗</i></b>
          </Link>
        </div>
      </section>

      <section className="network-gallery" id="network" aria-labelledby="network-heading">
        <div className="network-heading" data-reveal="up">
          <p className="eyebrow">Operational footprint</p>
          <h2 id="network-heading">One network.<br /><em>Built to deliver.</em></h2>
        </div>
        <div className="network-grid">
          <article className="network-card big" data-reveal="left">
            <img className="cover-image" src="/assets/network-jordan-hub.jpg" alt="Aerial view of the KH Timber and Wood Industries yard in Jordan" loading="lazy" decoding="async" />
            <div className="network-shade" />
            <div className="network-info">
              <b>03<span>Countries of operation</span></b>
              <h3>Jordan operations hub</h3>
              <p>KH Timber &amp; Wood Industries in Amman connects European and Asian suppliers to the Iraqi market through one coordinated yard.</p>
            </div>
          </article>
          <article className="network-card" data-reveal="up">
            <img className="cover-image" src="/assets/network-warehouse-bay.jpg" alt="KH warehouse bay stacked with banded timber and panel inventory" loading="lazy" decoding="async" />
            <div className="network-shade" />
            <div className="network-info">
              <b>27<span>Acres kept stocked</span></b>
              <h3>Ready inventory</h3>
              <p>Storage that stays full, so national-scale orders ship without waiting on the next vessel.</p>
            </div>
          </article>
          <article className="network-card" data-reveal="up">
            <img className="cover-image" src="/assets/network-partner-majlis.jpg" alt="KH leadership meeting international partners in a wood-panelled majlis" loading="lazy" decoding="async" />
            <div className="network-shade" />
            <div className="network-info">
              <b>30+<span>Years of leadership</span></b>
              <h3>Partner relationships</h3>
              <p>Principal-led relationships, from first meeting to standing agreement.</p>
            </div>
          </article>
          <article className="network-card wide" data-reveal="right">
            <img className="cover-image" src="/assets/network-logistics-aerial.jpg" alt="Aerial view of KH warehouses with trucks loading for dispatch" loading="lazy" decoding="async" />
            <div className="network-shade" />
            <div className="network-caption">
              <h3>Scaled operations</h3>
              <p>End-to-end logistics across our full warehouse network.</p>
            </div>
            <div className="network-info">
              <b>50+<span>Supplier countries served</span></b>
              <h3>Dispatch, coordinated</h3>
              <p>Import, staging, and project delivery managed as one flow&mdash;from port arrival to site handover.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="global-logistics" id="logistics" aria-labelledby="logistics-heading">
        <img className="cover-image" src="/assets/global-port.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="global-logistics-shade" />
        <div className="global-logistics-copy" data-reveal="up">
          <p className="eyebrow">Global logistics</p>
          <h2 id="logistics-heading">Sourced worldwide.<br /><em>Delivered in Iraq.</em></h2>
          <p>Supplier mills ship by sea to regional ports, cross by road through Jordan, and land in stocked KH yards ready for national distribution. One operator coordinates the whole chain&mdash;vessel, border, warehouse, site.</p>
        </div>
        <div className="global-logistics-facts" data-reveal>
          <div><strong>50+</strong><span>Supplier countries<br />sourced from</span></div>
          <div><strong>Sea + road</strong><span>Freight coordinated<br />end to end</span></div>
          <div><strong>3</strong><span>Hubs: Baghdad,<br />Basra, Amman</span></div>
        </div>
      </section>

      <section className="sectors-served" id="sectors" aria-labelledby="sectors-heading">
        <div className="sectors-heading" data-reveal="up">
          <p className="eyebrow">Where our material lands</p>
          <h2 id="sectors-heading">Supplying the work<br /><em>that builds Iraq.</em></h2>
        </div>
        <div className="sectors-list">
          <article data-reveal><span>01</span><div><h3>National infrastructure</h3><p>Bridges, roads, and public works programmes requiring dependable volume and staged delivery.</p></div></article>
          <article data-reveal><span>02</span><div><h3>Construction at scale</h3><p>Large residential and commercial developments, supplied through phased project schedules.</p></div></article>
          <article data-reveal><span>03</span><div><h3>Public-sector procurement</h3><p>Government and public procurement channels, met with documentation and supply continuity.</p></div></article>
          <article data-reveal><span>04</span><div><h3>Industrial &amp; manufacturing</h3><p>Facilities requiring wood and construction-related materials as a working input, not a one-off order.</p></div></article>
        </div>
        <div className="sectors-action" data-reveal>
          <p>Working on a project in any of these sectors?</p>
          <Link className="button button-black" href="/contact?type=supply">Discuss a project requirement <span>↗</span></Link>
        </div>
      </section>

      <section className="home-story">
        <div className="home-story-photo" data-reveal="left"><img className="cover-image" src="/assets/yard-wide.jpg" alt="KH Wood storage yard in Iraq" loading="lazy" decoding="async" /><span>Baghdad · Iraq</span></div>
        <div className="home-story-copy" data-reveal="right">
          <p className="eyebrow">Heritage with momentum</p>
          <h2>Three generations.<br /><em>Commercial discipline.</em></h2>
          <p>KH Wood grew from carpentry roots into a modern supply and distribution business. The standard never changed: accountability, adaptability, and relationships built to last.</p>
          <Link className="text-link" href="/company">Read our story <span>↗</span></Link>
        </div>
      </section>

      <section className="home-capability">
        <div className="capability-title" data-reveal><p className="eyebrow">Visible capacity</p><h2>Built to stock.<br />Ready to supply.</h2></div>
        <div className="capability-visual" data-reveal="scale">
          <img className="cover-image" src="/assets/yard-loading.jpg" alt="Forklift moving packaged wood at a KH Wood facility" loading="lazy" decoding="async" />
          <Link href="/operations"><span>See how we operate</span><i>↗</i></Link>
        </div>
        <div className="capability-list" data-reveal>
          <p>Inventory readiness</p><p>Staging and handling</p><p>Import coordination</p><p>Project dispatch</p>
        </div>
      </section>

      <section className="home-process" id="process" aria-labelledby="process-heading">
        <div className="process-heading" data-reveal="up">
          <p className="eyebrow">How it works</p>
          <h2 id="process-heading">A clear route,<br /><em>either direction.</em></h2>
        </div>
        <div className="process-tracks">
          <div className="process-track" data-reveal="left">
            <span className="process-track-label">For buyers &amp; projects</span>
            <ol>
              <li><b>01</b><div><h3>Enquire with your spec</h3><p>Share quantities, grades, and delivery timelines by form, email, or WhatsApp.</p></div></li>
              <li><b>02</b><div><h3>Quote from live stock</h3><p>Pricing and availability confirmed against inventory already on the ground in Iraq.</p></div></li>
              <li><b>03</b><div><h3>Dispatch &amp; delivery</h3><p>Staged, loaded, and delivered to site&mdash;with volumes held for phased projects.</p></div></li>
            </ol>
            <Link className="text-link" href="/products">Browse materials <span>↗</span></Link>
          </div>
          <div className="process-track partner" data-reveal="right">
            <span className="process-track-label">For international manufacturers</span>
            <ol>
              <li><b>01</b><div><h3>Introduce your line</h3><p>Tell us about your products, capacity, and ambitions for the Iraqi market.</p></div></li>
              <li><b>02</b><div><h3>Market &amp; fit assessment</h3><p>We evaluate demand, pricing position, and the right entry model together.</p></div></li>
              <li><b>03</b><div><h3>Representation &amp; rollout</h3><p>Agency or franchise terms, import coordination, stocking, and market development.</p></div></li>
            </ol>
            <Link className="text-link" href="/partners">Explore partnership <span>↗</span></Link>
          </div>
        </div>
      </section>

      <section className="contact-strip" id="reach-us" aria-labelledby="contact-strip-heading">
        <div className="contact-strip-lead" data-reveal="up">
          <p className="eyebrow">Your next move</p>
          <h2 id="contact-strip-heading">Tell us what you&apos;re<br /><em>working towards.</em></h2>
          <div className="contact-strip-actions">
            <Link className="button button-red" href="/contact">Start a commercial conversation <span>↗</span></Link>
            <a className="button button-ghost" href="https://wa.me/962795185588?text=Hello%20KH%20Wood%2C%20I%27d%20like%20to%20make%20an%20enquiry." target="_blank" rel="noreferrer">WhatsApp us <span>↗</span></a>
          </div>
          <a className="contact-strip-mail" href="mailto:info@khodeer.com">info@khodeer.com</a>
          <Link className="contact-strip-profile" href="/contact?type=profile"><small>For manufacturers &amp; partners</small><b>Request the KH Wood company profile <i>↗</i></b></Link>
        </div>
        <div className="contact-strip-offices" data-reveal>
          <div><span>Baghdad · Iraq</span><p>Al-Basatin area</p></div>
          <div><span>Basra · Iraq</span><p>Al-Istiqlal Street, Al-Ashar</p></div>
          <div><span>Amman · Jordan</span><p>Gardens, Wasfi Al-Tal Street</p></div>
        </div>
      </section>
    </SiteShell>
  );
}
