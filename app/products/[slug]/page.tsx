import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/SiteShell";
import { ProductRangeNav } from "../../components/ProductRangeNav";
import { ProductAddToEnquiry } from "../../components/ProductAddToEnquiry";
import { PartnerLogoRail } from "../../components/PartnerLogoRail";
import { getProductRange, productRanges } from "../productData";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productRanges.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductRange((await params).slug);
  if (!product) return {};
  return {
    title: `${product.title} | KH Wood Iraq`,
    description: `${product.copy} Discuss specifications, volume, availability, and delivery with KH Wood.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProductRange((await params).slug);
  if (!product) notFound();

  return (
    <SiteShell active="products">
      <article className={`product-detail detail-${product.theme}`}>
        <ProductRangeNav ranges={productRanges} current={product.slug} />

        <section className="detail-hero">
          <img className="cover-image" src={product.image} alt={product.imageAlt} fetchPriority="high" />
          <div className="detail-hero-shade" />
          <div className="detail-breadcrumb hero-animate one"><Link href="/products">All products</Link><span>/</span><b>{product.n}</b></div>
          <div className="detail-hero-copy">
            <p className="eyebrow hero-animate one">{product.eyebrow}</p>
            <h1 className="hero-animate two">{product.headline}</h1>
            <p className="hero-animate three">{product.intro}</p>
            <div className="hero-animate four"><ProductAddToEnquiry slug={product.slug} title={product.title} n={product.n} fields={product.orderFields} /></div>
          </div>
          <div className="detail-hero-index hero-animate four"><span>{product.n}</span><small>{product.tag}</small></div>
        </section>

        <section className="detail-overview" id="overview">
          <img className="detail-overview-image cover-image" src={product.secondaryImage} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <div className="detail-overview-wash" aria-hidden="true" />
          <div className="detail-overview-heading" data-reveal="up"><p className="eyebrow">{product.eyebrow}</p><h2>Where it works.<br /><em>What you can choose.</em></h2></div>
          <div className="detail-overview-body">
            <div className="detail-overview-uses" data-reveal="left">
              <span className="detail-overview-label">Where it works</span>
              {product.applications.map((application, itemIndex) => <p key={application}><b>0{itemIndex + 1}</b>{application}</p>)}
            </div>
            <div className="detail-overview-options" data-reveal="right">
              <span className="detail-overview-label">Ways to specify it</span>
              {product.options.map((option, itemIndex) => <article key={option.title}><b>0{itemIndex + 1}</b><h3>{option.title}</h3><p>{option.copy}</p></article>)}
            </div>
          </div>
          <blockquote data-reveal>“{product.principle}”</blockquote>
        </section>

        <section className="detail-partners" aria-labelledby="detail-partners-heading">
          <div className="detail-partners-heading" data-reveal="up">
            <p className="eyebrow">Relevant partners &amp; standards</p>
            <h2 id="detail-partners-heading">Connected to the<br /><em>{product.shortTitle.toLowerCase()} range.</em></h2>
            <p>The network shown here updates with each product range, keeping the most relevant manufacturers and standards in view.</p>
          </div>
          <PartnerLogoRail partnerIds={product.partnerIds} />
        </section>

        <section className="detail-brief" id="brief">
          <div className="detail-brief-copy" data-reveal="left"><p className="eyebrow">Ready for a quote?</p><h2>Add it to<br /><em>your enquiry.</em></h2><p>Add this range to your enquiry, browse others you need, then fill in the details once and send it all together.</p><ProductAddToEnquiry slug={product.slug} title={product.title} n={product.n} fields={product.orderFields} /></div>
          <ol className="detail-checklist">
            {product.orderFields.map((item, itemIndex) => <li key={item.label} data-reveal="right"><span>0{itemIndex + 1}</span><p>{item.label}</p><i>✓</i></li>)}
          </ol>
        </section>
      </article>
    </SiteShell>
  );
}
