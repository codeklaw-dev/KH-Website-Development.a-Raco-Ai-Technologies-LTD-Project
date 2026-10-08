import { SiteShell } from "../components/SiteShell";
import Link from "next/link";
import { productRanges } from "./productData";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata("Wood, Timber & Project Supply | KH Wood", "Explore KH Wood's commercial timber, panels, boards, construction wood, and bulk project supply capabilities in Iraq.", "/products");

const galleryImages = [
  { file: "port-cargo.webp", width: 1280, height: 575, label: "In transit", caption: "Panel cargo at the port", alt: "Pallets of wood panels beside a cargo vessel at port" },
  { file: "branded-warehouse.webp", width: 959, height: 1280, label: "Ready stock", caption: "Branded bundles in storage", alt: "Banded KH Wood and partner bundles stacked in a warehouse" },
  { file: "formwork-panel.webp", width: 1280, height: 959, label: "Panel range", caption: "Film-faced formwork panels", alt: "Close view of red film-faced formwork panels" },
  { file: "warehouse-stacks.webp", width: 800, height: 600, label: "Stock holding", caption: "Warehouse panel stacks", alt: "Rows of banded wood panel bundles stored indoors" },
  { file: "timber-bundles.webp", width: 1024, height: 768, label: "Timber range", caption: "Sawn timber bundles", alt: "Neatly stacked bundles of sawn timber boards" },
  { file: "kh-panel-stacks.webp", width: 909, height: 658, label: "Ready stock", caption: "KH Wood panel stock", alt: "Tall stacks of KH Wood branded panel bundles" },
  { file: "port-lifting.webp", width: 1280, height: 575, label: "In transit", caption: "Handling cargo at port", alt: "Crane lifting wood cargo alongside a ship at port" },
  { file: "film-faced-panels.webp", width: 900, height: 1600, label: "Panel range", caption: "Film-faced panel surface", alt: "Red film-faced panels with printed surface markings" },
  { file: "banded-boards.webp", width: 960, height: 1280, label: "Ready stock", caption: "Banded board bundles", alt: "Rows of yellow and blue banded board bundles" },
  { file: "kh-stacked-stock.webp", width: 959, height: 1280, label: "Stock holding", caption: "KH Wood stock in the yard", alt: "KH Wood branded panel bundles stacked in storage" },
  { file: "yard-panel-stock.webp", width: 600, height: 800, label: "Stock holding", caption: "Protected panel stock", alt: "Wrapped wood panel bundles stacked in a yard" },
  { file: "packed-warehouse-stock.webp", width: 960, height: 1280, label: "Ready stock", caption: "Packed warehouse inventory", alt: "Packed panel bundles held inside a warehouse" },
];

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
        <div data-reveal="up"><h1 className="hero-animate two">Wood, timber<br />&amp; project supply.</h1></div>
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

      <section className="products-gallery" id="gallery" aria-labelledby="products-gallery-heading">
        <div className="products-gallery-heading" data-reveal="up">
          <p className="eyebrow">From stock to site / 02</p>
          <h2 id="products-gallery-heading">Material you can see.<br /><em>Capacity you can trust.</em></h2>
          <p>A closer look at timber, panels, ready stock, and the handling behind every supply route.</p>
        </div>
        <div className="products-gallery-grid">
          {galleryImages.map((image, index) => (
            <figure className="products-gallery-item" key={image.file} data-reveal={index % 2 ? "right" : "left"}>
              <img src={`/assets/product-gallery/${image.file}`} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" />
              <figcaption><span>{image.label}</span><strong>{image.caption}</strong></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Hidden on request. Kept for future use.
      <section className="product-cta"><div data-reveal><p className="eyebrow">Ready when you are</p><h2>Add what you need.<br />Send it in one go.</h2></div><p data-reveal>Browse the ranges above, add each one to your enquiry, then fill in the details once at the end.</p></section>
      */}
    </SiteShell>
  );
}
