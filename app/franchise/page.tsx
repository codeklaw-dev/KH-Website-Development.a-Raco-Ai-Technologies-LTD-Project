import { SiteShell } from "../components/SiteShell";
import { PartnerLogoRail } from "../components/PartnerLogoRail";
import Link from "next/link";

export const metadata = {
  title: "Franchise Opportunities | Carry the KH Wood Name",
  description: "Take a KH Wood franchise in your territory: international brands, stocked yards behind you, and a principal-led partner with decades in the Iraqi wood trade.",
};

export default function FranchisePage() {
  return (
    <SiteShell active="franchise">
      <section className="partners-hero franchise-hero inner-hero">
        <img className="cover-image franchise-hero-image" src="/assets/franchise-hero-port.jpg" alt="Timber arriving at a busy regional port and distribution yard" fetchPriority="high" decoding="async" />
        <div className="franchise-hero-wash" aria-hidden="true" />
        <div className="partner-coordinate hero-animate one"><span>Franchise</span><i>Opportunities</i></div>
        <div className="partners-hero-copy">
          <p className="eyebrow hero-animate one">Franchise opportunities</p>
          <h1 className="hero-animate two">Carry the KH name<br /><em>in your territory.</em></h1>
          <p className="hero-animate three">KH Wood franchises put international brands, stocked yards, and three decades of market standing behind established local traders. Your territory, your customers, our brands, stock, and backing.</p>
          <div className="hero-actions hero-animate four">
            <Link className="button button-red" href="/contact?type=franchise">Apply for a franchise <span>↗︎</span></Link>
            <Link className="button button-ghost" href="/partners">I&apos;m a manufacturer <span>↗︎</span></Link>
          </div>
        </div>
      </section>

      <nav className="page-rail page-rail-dark" aria-label="Franchise page sections"><span>Franchise</span><a href="#opportunity">The opportunity</a><a href="#package">What you get</a><a href="#fit">Who we look for</a><a href="#steps">How to join</a><a href="#apply">Apply</a></nav>

      <section className="market-case" id="opportunity">
        <div className="market-case-number" data-reveal="left">KH</div>
        <div className="market-case-copy" data-reveal="up"><p className="eyebrow">The opportunity</p><h2>Sell brands your market<br /><em>can&apos;t get anywhere else.</em></h2></div>
        <div className="market-case-note" data-reveal="right"><p>KH Wood holds exclusive agencies and franchises for international wood, panel, and construction-material brands. As a KH franchisee, those brands become yours to sell in your territory, drawn from stocked KH yards, not waiting on your own imports.</p></div>
        <PartnerLogoRail />
      </section>

      <section className="partner-advantage" id="package">
        <div className="advantage-heading" data-reveal="left"><p className="eyebrow">The franchise package</p><h2>What comes with<br /><em>the KH name.</em></h2></div>
        <div className="advantage-grid">
          <article data-reveal><span>Brands</span><h3>Exclusive portfolio</h3><p>Access to international brands KH represents in Iraq. Products your competitors can&apos;t carry.</p></article>
          <article data-reveal><span>Stock</span><h3>Yards behind you</h3><p>Draw inventory from KH facilities in Baghdad, Basra, and Amman. Sell from stock, not from promises.</p></article>
          <article data-reveal><span>Territory</span><h3>Protected ground</h3><p>Clear territory boundaries and pricing structure, managed centrally so franchisees don&apos;t undercut each other.</p></article>
          <article data-reveal><span>Backing</span><h3>A name that opens doors</h3><p>Three decades of Khodeer standing in the Iraqi wood trade, behind your storefront.</p></article>
        </div>
      </section>

      <section className="partner-readiness" id="fit">
        <div className="readiness-title" data-reveal="left"><p className="eyebrow">Who we look for</p><h2>Standing matters<br /><em>more than size.</em></h2><p>We franchise to traders we&apos;d trust with the Khodeer name: established, known in their market, building for the long term.</p></div>
        <div className="readiness-columns">
          <div data-reveal="up"><span>You bring</span><p>An established trade in wood or construction materials</p><p>Reputation and relationships in your territory</p><p>Premises and capacity to hold and move stock</p><p>Commitment to KH pricing and brand standards</p></div>
          <div data-reveal="right"><span>KH brings</span><p>Exclusive international brands to carry</p><p>Stocked yards and import coordination</p><p>Territory protection and clear commercial terms</p><p>Ongoing supply continuity and market support</p></div>
        </div>
      </section>

      <section className="entry-path" id="steps">
        <div className="entry-path-visual" data-reveal="left"><img className="cover-image" src="/assets/franchise-step-showroom.jpg" alt="Contemporary global wood showroom and collaboration lounge" loading="lazy" decoding="async" /><div><span>From application</span><b>Four steps</b><span>To trading under KH</span></div></div>
        <div className="entry-steps">
          {[['01','Introduce yourself','Tell us who you are, where you trade, and what you currently sell.'],['02','Territory assessment','We look at your market, your standing, and where a franchise fits the network.'],['03','Terms & territory','Franchise terms, pricing structure, brand standards, and territory are agreed clearly.'],['04','Stock & launch','Your first inventory moves from KH yards, and you start trading under the KH name.']].map(([n,title,text],index)=><article key={title} data-reveal="right" style={{transitionDelay:`${index*70}ms`}}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </section>

      <section className="franchise-logistics-proof" aria-labelledby="franchise-logistics-title">
        <img className="cover-image" src="/assets/franchise-logistics-truck.jpg" alt="KH Wood truck leaving a timber yard with a full load" loading="lazy" decoding="async" />
        <div className="franchise-logistics-shade" aria-hidden="true" />
        <div className="franchise-logistics-copy" data-reveal="up">
          <p className="eyebrow">Stock behind every territory</p>
          <h2 id="franchise-logistics-title">From KH yards.<br /><em>Into your market.</em></h2>
          <p>The franchise model is backed by KH-held inventory, import coordination, and practical dispatch support, so franchisees can focus on relationships and sales.</p>
          <span>Supply &nbsp;&middot;&nbsp; Logistics &nbsp;&middot;&nbsp; Territory support</span>
        </div>
      </section>

      <section className="partner-faq">
        <div data-reveal="left"><p className="eyebrow">Franchise questions</p><h2>Asked before<br /><em>signing anything.</em></h2></div>
        <div className="question-list">
          <details data-reveal><summary>What does a KH franchise actually give me?<span>+</span></summary><p>The right to sell KH-represented international brands in your territory, supplied from KH stocked yards, under agreed pricing and brand standards, with the KH name behind your business.</p></details>
          <details data-reveal><summary>Do I need to import anything myself?<span>+</span></summary><p>No. KH handles import, customs, and stocking. You draw inventory from KH yards and focus on selling in your market.</p></details>
          <details data-reveal><summary>Is my territory protected?<span>+</span></summary><p>Yes. Territories and pricing are managed centrally by KH, and holding the stock gives us the leverage to enforce them.</p></details>
          <details data-reveal><summary>What does it cost to join?<span>+</span></summary><p>Terms depend on territory and scale, and are agreed openly during the assessment stage. No hidden structures.</p></details>
          <details data-reveal><summary>I&apos;m a manufacturer, not a trader. Where do I go?<span>+</span></summary><p>Our partnerships page covers agency, distribution, and market entry for international manufacturers: <Link href="/partners">explore partnerships</Link>.</p></details>
        </div>
      </section>

      <section className="partnership-fit" id="apply">
        <div data-reveal="left"><p className="eyebrow">Apply for a franchise</p><h2>Your territory.<br />Your customers.<br /><em>The KH name.</em></h2></div>
        <div data-reveal="right"><p>Tell us where you trade and what you want to carry. If you&apos;re an international manufacturer looking to enter Iraq instead, start with our partnerships page.</p><Link className="button button-white" href="/contact?type=franchise">Apply now <span>↗︎</span></Link><Link className="text-link" href="/partners">For manufacturers: explore partnerships <span>↗︎</span></Link></div>
      </section>
    </SiteShell>
  );
}
