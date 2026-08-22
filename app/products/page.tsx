import { SiteShell } from "../components/SiteShell";
import Link from "next/link";
import { productRanges } from "./productData";

export const metadata = {
  title: "Wood, Timber & Project Supply | KH Wood",
  description: "Explore KH Wood's commercial timber, panels, boards, construction wood, and bulk project supply capabilities in Iraq.",
};

const marqueeItems = [
  "Timber supply",
  "Panel products",
  "Project materials",
  "Bulk supply",
  "Market representation",
  "Construction wood",
  "Hardwood & softwood",
  "Plywood & boards",
  "Site delivery",
  "Import & sourcing",
];

export default function ProductsPage() {
  return (
    <SiteShell active="products">
      <section className="catalogue-intro">
        <p className="catalogue-side hero-animate one" data-reveal="left">01 — Product families</p>
        <div data-reveal="up"><h2 className="hero-animate two">What are you<br />looking for?</h2></div>
        <p className="catalogue-copy hero-animate three" data-reveal="right">Pick a range below. We handle quantity, delivery, and timing.</p>
      </section>

      <section className="product-catalogue">
        {productRanges.map((item, index) => <Link className={`catalogue-card card-${index + 1}`} href={`/products/${item.slug}`} key={item.title} data-reveal={index % 2 ? "right" : "left"}>
          <img className="cover-image" src={item.image} alt={item.title} loading="lazy" decoding="async" />
          <span className="catalogue-shade" />
          <span className="catalogue-number">{item.n}</span>
          <small>{item.tag}</small>
          <div><h3>{item.title}</h3><p>{item.copy}</p><b>Explore range <i>↗︎</i></b></div>
        </Link>)}
      </section>

      <section className="material-marquee" aria-label="KH Wood supply capabilities">
        <div>
          {[0, 1].map((copy) => <div key={copy} aria-hidden={copy === 1 || undefined}>
            {marqueeItems.map((item) => <span key={item}>{item}<i>◆</i></span>)}
          </div>)}
        </div>
      </section>

      <section className="products-support" id="services">
        <div className="products-support-heading" data-reveal="up"><p className="eyebrow">Beyond the stock</p><h2>We handle it all,<br /><em>start to finish.</em></h2></div>
        <div className="products-support-grid">
          <div data-reveal="left">
            <span>What we do</span>
            <ul>
              <li>Agency &amp; franchise representation</li>
              <li>Import coordination</li>
              <li>Bulk storage &amp; readiness</li>
              <li>Project supply support</li>
              <li>Market-entry support</li>
            </ul>
          </div>
          <div data-reveal="right">
            <span>Where it&apos;s used</span>
            <ul>
              <li>Construction &amp; civil works</li>
              <li>Manufacturing &amp; industrial use</li>
              <li>Residential &amp; commercial fit-out</li>
              <li>Public &amp; infrastructure projects</li>
              <li>Wholesale &amp; recurring supply</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Hidden on request. Kept for future use.
      <section className="product-cta"><div data-reveal><p className="eyebrow">Ready when you are</p><h2>Add what you need.<br />Send it in one go.</h2></div><p data-reveal>Browse the ranges above, add each one to your enquiry, then fill in the details once at the end.</p></section>
      */}
    </SiteShell>
  );
}
