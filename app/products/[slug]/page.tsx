import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/SiteShell";
import { getProductRange, productRanges } from "../productData";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productRanges.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductRange((await params).slug);
  if (!product) return {};
  return {
    title: `${product.title} Supply in Iraq | KH Wood`,
    description: `${product.copy} Discuss specifications, volume, availability, and delivery with KH Wood.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProductRange((await params).slug);
  if (!product) notFound();

  const index = productRanges.findIndex(({ slug }) => slug === product.slug);
  const previous = productRanges[(index - 1 + productRanges.length) % productRanges.length];
  const next = productRanges[(index + 1) % productRanges.length];

  return (
    <SiteShell active="products" headerOnLight={false}>
      <article className={`product-detail detail-${product.theme}`}>
        <section className="detail-hero">
          <img className="cover-image" src={product.image} alt={product.imageAlt} fetchPriority="high" />
          <div className="detail-hero-shade" />
          <div className="detail-breadcrumb hero-animate one"><Link href="/products">All products</Link><span>/</span><b>{product.n}</b></div>
          <div className="detail-hero-copy">
            <p className="eyebrow hero-animate one">{product.eyebrow}</p>
            <h1 className="hero-animate two">{product.headline}</h1>
            <p className="hero-animate three">{product.intro}</p>
            <Link className="button button-red hero-animate four" href={`/contact?type=${product.theme === "market" ? "partner" : "supply"}&product=${product.slug}`}>{product.ctaLabel} <span>↗</span></Link>
          </div>
          <div className="detail-hero-index hero-animate four"><span>{product.n}</span><small>{product.tag}</small></div>
        </section>

        <nav className="product-range-rail" aria-label="Browse product ranges">
          <span>Browse the range</span>
          {productRanges.map((item) => <Link key={item.slug} href={`/products/${item.slug}`} aria-current={item.slug === product.slug ? "page" : undefined}><small>{item.n}</small>{item.shortTitle}</Link>)}
        </nav>

        <section className="detail-fit">
          <div className="detail-fit-heading" data-reveal="left"><p className="eyebrow">Where it works</p><h2>Built around<br /><em>real demand.</em></h2></div>
          <div className="detail-applications">
            {product.applications.map((application, itemIndex) => <div key={application} data-reveal="right" style={{ transitionDelay: `${itemIndex * 55}ms` }}><span>0{itemIndex + 1}</span><p>{application}</p></div>)}
          </div>
          <blockquote data-reveal="up">“{product.principle}”</blockquote>
        </section>

        <section className="detail-options">
          <div className="detail-options-head" data-reveal="left"><span>{product.n} / Product route</span><h2>What we can<br /><em>help you define.</em></h2></div>
          <div className="detail-option-grid">
            {product.options.map((option, itemIndex) => <article key={option.title} data-reveal="up" style={{ transitionDelay: `${itemIndex * 70}ms` }}><span>0{itemIndex + 1}</span><h3>{option.title}</h3><p>{option.copy}</p></article>)}
          </div>
        </section>

        <section className="detail-visual-break">
          <img className="cover-image" src={product.secondaryImage} alt={product.secondaryAlt} loading="lazy" decoding="async" />
          <div className="detail-visual-shade" />
          <p data-reveal="left"><span>KH Wood / Iraq</span>Specification, stock, and supply—connected.</p>
        </section>

        <section className="detail-brief">
          <div className="detail-brief-copy" data-reveal="left"><p className="eyebrow">Build a useful enquiry</p><h2>Five details.<br /><em>A faster answer.</em></h2><p>Availability and exact specifications are confirmed per enquiry. Giving the team a complete brief helps us assess the right product and supply route sooner.</p><Link className="text-link" href={`/contact?type=${product.theme === "market" ? "partner" : "supply"}&product=${product.slug}`}>Send your requirement <span>↗</span></Link></div>
          <ol className="detail-checklist">
            {product.brief.map((item, itemIndex) => <li key={item} data-reveal="right"><span>0{itemIndex + 1}</span><p>{item}</p><i>✓</i></li>)}
          </ol>
        </section>

        <section className="detail-process">
          <div className="detail-process-title" data-reveal><p className="eyebrow">How the conversation moves</p><h2>Clear steps.<br />Commercial momentum.</h2></div>
          <div className="detail-process-grid">
            {product.process.map((step, itemIndex) => <article key={step.title} data-reveal="up" style={{ transitionDelay: `${itemIndex * 70}ms` }}><span>0{itemIndex + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}
          </div>
        </section>

        <section className="detail-range">
          <div className="detail-range-head" data-reveal="left"><p className="eyebrow">Continue browsing</p><h2>The KH Wood range.</h2></div>
          <div className="detail-range-grid">
            {productRanges.map((item) => <Link className={item.slug === product.slug ? "is-current" : ""} key={item.slug} href={`/products/${item.slug}`} data-reveal="up"><span>{item.n}</span><div><small>{item.tag}</small><h3>{item.title}</h3></div><i>{item.slug === product.slug ? "Current" : "↗"}</i></Link>)}
          </div>
        </section>

        <nav className="product-loop" aria-label="Previous and next product ranges">
          <Link href={`/products/${previous.slug}`}><small>← Previous range</small><strong>{previous.title}</strong></Link>
          <Link href={`/products/${next.slug}`}><small>Next range →</small><strong>{next.title}</strong></Link>
        </nav>
      </article>
    </SiteShell>
  );
}
