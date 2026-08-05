import { ContactForm, SiteShell } from "../components/SiteShell";

export const metadata = {
  title: "Contact KH Wood | Product & Partnership Enquiries",
  description: "Contact KH Wood about product supply, project requirements, agency representation, or international partnerships.",
};

export default function ContactPage() {
  return (
    <SiteShell active="contact">
      <section className="contact-hero inner-hero">
        <div className="contact-hero-title"><p className="eyebrow hero-animate one">Contact KH Wood</p><h1 className="hero-animate two">Start with<br /><em>the requirement.</em></h1><p className="hero-animate three">Product supply, project demand, or market-entry partnership—tell us the commercial context and we&apos;ll connect you with the right person.</p></div>
        <div className="contact-direct hero-animate four"><span>Prefer a direct channel?</span><a href="mailto:info@khodeer.com">info@khodeer.com <i>↗︎</i></a><a href="https://wa.me/962795185588" target="_blank" rel="noreferrer">WhatsApp +962 79 518 5588 <i>↗︎</i></a></div>
      </section>

      <section className="contact-workspace">
        <div className="contact-form-heading" data-reveal="left"><span>01 / Enquiry details</span><h2>Give us enough<br /><em>to act on.</em></h2><p>Useful detail helps our team route and respond to your enquiry efficiently.</p></div>
        <div data-reveal="right"><ContactForm /></div>
      </section>

      <section className="office-directory">
        <div className="directory-heading" data-reveal><p className="eyebrow">Our offices</p><h2>Three locations.<br />One connected team.</h2></div>
        <div className="directory-list">
          <article data-reveal><span>IRQ / 01</span><h3>Baghdad</h3><p>Al-Basatin area</p><small>Iraq · Main commercial office</small><a href="https://www.google.com/maps/search/?api=1&query=Al-Basatin+Baghdad+Iraq" target="_blank" rel="noreferrer">Open in maps ↗︎</a></article>
          <article data-reveal><span>IRQ / 02</span><h3>Basra</h3><p>Al-Istiqlal Street / Al-Ashar area</p><small>Iraq · Southern market office</small><a href="https://www.google.com/maps/search/?api=1&query=Al-Ashar+Basra+Iraq" target="_blank" rel="noreferrer">Open in maps ↗︎</a></article>
          <article data-reveal><span>JOR / 03</span><h3>Amman</h3><p>Wasfi Al-Tal Street, Muhtaseb Building, 2nd Floor, Office 207</p><small>Amman 11190 · P.O. Box 928130 · Jordan</small><a href="https://www.google.com/maps/search/?api=1&query=Wasfi+Al+Tal+Street+Amman+Jordan" target="_blank" rel="noreferrer">Open in maps ↗︎</a></article>
        </div>
      </section>

      <section className="response-note"><span data-reveal>What happens next</span><div data-reveal><strong>01</strong><p>Your enquiry is reviewed and routed to the relevant commercial contact.</p></div><div data-reveal><strong>02</strong><p>We clarify product, project, or partnership requirements where needed.</p></div><div data-reveal><strong>03</strong><p>You receive a practical next step based on the opportunity.</p></div></section>
    </SiteShell>
  );
}
