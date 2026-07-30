"use client";

import { FormEvent, useEffect, useState } from "react";

const products = [
  { number: "01", title: "Wood & timber", text: "Hardwood and softwood supply for construction, manufacturing, and commercial requirements." },
  { number: "02", title: "Panels & boards", text: "Engineered panels and board products aligned to specification, volume, and delivery needs." },
  { number: "03", title: "Infrastructure materials", text: "Construction-related wood materials for demanding public, industrial, and private projects." },
  { number: "04", title: "Bulk project supply", text: "Large-volume sourcing, staging, inventory coordination, and dependable project support." },
  { number: "05", title: "Agency representation", text: "A trusted route to Iraq for international manufacturers seeking long-term local representation." },
];

const leaders = [
  { name: "Amer Khodeer", role: "Co-Founder", experience: "More than three decades of experience", focus: "Asian market relationships and supplier development" },
  { name: "Abbas Khodeer", role: "Co-Founder", experience: "Nearly three decades of experience", focus: "European market relationships and partner development" },
  { name: "Thamer Khodeer", role: "Co-Founder", experience: "Almost four decades of experience", focus: "Client relationships and Asian market development" },
];

const offices = [
  { city: "Baghdad", country: "Iraq", address: "Al-Basatin area" },
  { city: "Basra", country: "Iraq", address: "Al-Istiqlal Street / Al-Ashar area" },
  { city: "Amman", country: "Jordan", address: "Gardens / Wasfi Al-Tal Street corridor" },
];

const faqs = [
  ["What products does KH Wood supply?", "KH Wood supplies timber, panel and board products, construction-related wood materials, and bulk project requirements."],
  ["Can KH Wood support large projects?", "The company’s storage and staging footprint is designed for high-volume commercial, construction, and infrastructure requirements."],
  ["Do you work with international manufacturers?", "Yes. KH Wood supports international manufacturers seeking representation, distribution, and practical access to the Iraqi market."],
  ["How do I start an enquiry?", "Choose either product supply or international partnership in the form below. The KH Wood team will route your request to the right contact."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 40);
      setProgress(documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.13, rootMargin: "0px 0px -40px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `KH Wood ${data.get("inquiry")} enquiry — ${data.get("company")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company")}`,
      `Country: ${data.get("country")}`,
      `Email: ${data.get("email")}`,
      `Phone / WhatsApp: ${data.get("phone")}`,
      `Enquiry type: ${data.get("inquiry")}`,
      `Interest: ${data.get("interest")}`,
      "",
      `${data.get("message")}`,
    ].join("\n");

    setFormStatus("Your email app is opening with this enquiry ready to send.");
    window.location.href = `mailto:info@khodeer.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <a href="#top" className="brand" aria-label="KH Wood home" onClick={closeMenu}>
          <img src="/assets/kh-logo.png" alt="Khodeer Abbas & Partners Co." />
        </a>
        <nav className={`nav-links${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <a href="#heritage" onClick={closeMenu}>Company</a>
          <a href="#products" onClick={closeMenu}>Products</a>
          <a href="#partners" onClick={closeMenu}>Partners</a>
          <a href="#operations" onClick={closeMenu}>Operations</a>
          <a href="#contact" className="nav-cta" onClick={closeMenu}>Contact <span>↗</span></a>
        </nav>
        <button className={`menu-button${menuOpen ? " is-open" : ""}`} type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
      </header>

      <section className="hero" id="top">
        <video className="hero-video" autoPlay muted loop playsInline poster="/assets/kh-yard-poster.jpg" aria-hidden="true">
          <source src="/assets/kh-yard.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <p className="kicker hero-kicker">Family-led since the beginning <span>•</span> Iraq &amp; Jordan</p>
          <h1><span>Iraq&apos;s trusted</span><br />wood supply partner.</h1>
          <p className="hero-copy">For buyers who need dependable supply. For manufacturers who need a credible route into Iraq.</p>
          <div className="hero-actions">
            <a className="button button-red" href="#buyers">Source materials <span>↗</span></a>
            <a className="button button-outline" href="#partners">Enter the Iraqi market <span>↗</span></a>
          </div>
        </div>
        <div className="hero-side-note"><span>KH</span><p>Built on family values.<br />Scaled for modern supply.</p></div>
        <a href="#pathways" className="scroll-cue" aria-label="Scroll to explore"><span>Explore</span><i>↓</i></a>
      </section>

      <section className="pathways" id="pathways" aria-label="Choose your path">
        <div className="pathway-intro" data-reveal>
          <span className="section-index">01 — Start here</span>
          <h2>Two ambitions.<br />One trusted partner.</h2>
          <p>KH Wood connects both sides of the market: ambitious Iraqi buyers and international manufacturers ready to grow.</p>
        </div>
        <a className="pathway-card buyer-path" href="#buyers" data-reveal>
          <img src="/assets/hardwood.jpg" alt="Commercial hardwood bundles ready for supply" />
          <div className="pathway-shade" />
          <span className="path-number">01</span>
          <div><p>For buyers &amp; projects</p><h3>Source with confidence.</h3><span className="circle-arrow">↘</span></div>
        </a>
        <a className="pathway-card partner-path" href="#partners" data-reveal>
          <img src="/assets/logistics-truck.jpg" alt="Wood supply truck at the KH Wood storage facility" />
          <div className="pathway-shade" />
          <span className="path-number">02</span>
          <div><p>For global manufacturers</p><h3>Grow into Iraq.</h3><span className="circle-arrow">↘</span></div>
        </a>
      </section>

      <section className="proof-bar" aria-label="Company highlights">
        <article data-reveal><strong>27</strong><p>Acres of storage<br />and staging capacity</p></article>
        <article data-reveal><strong>50<span>+</span></strong><p>Countries within the<br />company&apos;s market network</p></article>
        <article data-reveal><strong>30<span>+</span></strong><p>Years of family<br />leadership experience</p></article>
        <article className="proof-note" data-reveal><i>Built for volume.<br />Run on trust.</i><small>Client-supplied figures<br />to be verified before launch</small></article>
      </section>

      <section className="heritage section" id="heritage">
        <div className="section-topline" data-reveal><span>02</span><p>Heritage &amp; company</p><i /></div>
        <div className="heritage-copy" data-reveal>
          <p className="kicker">Rooted in craft. Ready for scale.</p>
          <h2>A family legacy,<br /><em>still moving forward.</em></h2>
        </div>
        <div className="heritage-layout">
          <div className="heritage-monogram" data-reveal aria-hidden="true"><span>KH</span><small>Khodeer family<br />Al-Gburi heritage</small></div>
          <div className="heritage-story" data-reveal>
            <p className="story-lead">KH Wood grew from carpentry roots into a large-scale Iraqi wood supply and distribution business.</p>
            <p>Founded by Khodeer Abbas Turki, the company carries forward a family tradition shaped by hospitality, trust, adaptability, and relationships that last. That heritage now supports a modern supply operation connecting international partners with construction, manufacturing, and infrastructure demand across Iraq.</p>
            <a className="text-link" href="#leadership">Meet the family leadership <span>↗</span></a>
          </div>
          <figure className="heritage-image" data-reveal>
            <img src="/assets/yard-wide.jpg" alt="KH Wood storage yard and warehouse" />
            <figcaption><span>Real operations</span><p>Iraq-based storage and supply readiness</p></figcaption>
          </figure>
        </div>
      </section>

      <section className="products section" id="buyers">
        <div className="section-topline" data-reveal><span>03</span><p>For buyers &amp; project teams</p><i /></div>
        <div className="split-heading" data-reveal>
          <div><p className="kicker">Materials that move projects</p><h2>Supply built around<br /><em>your requirements.</em></h2></div>
          <div><p>From everyday commercial demand to major projects, KH Wood coordinates products, volume, storage, and delivery around the realities of the Iraqi market.</p><a href="#contact" className="text-link">Request a quote <span>↗</span></a></div>
        </div>
        <div className="product-list" id="products">
          {products.map((product, index) => (
            <article className="product-card" key={product.number} data-reveal style={{ transitionDelay: `${index * 55}ms` }}>
              <span>{product.number}</span><div><h3>{product.title}</h3><p>{product.text}</p></div><i>↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="operations" id="operations">
        <div className="operations-copy" data-reveal>
          <div className="section-topline light-line"><span>04</span><p>Operational capacity</p><i /></div>
          <p className="kicker">Stock. Stage. Supply.</p>
          <h2>Capacity you can<br /><em>see for yourself.</em></h2>
          <p className="operations-lead">A large storage footprint supports high-volume stockholding, practical staging, and responsive supply coordination.</p>
          <ul>
            <li><span>01</span>Storage and inventory readiness</li>
            <li><span>02</span>Staging and dispatch coordination</li>
            <li><span>03</span>Commercial and project supply support</li>
            <li><span>04</span>Import and distribution coordination</li>
          </ul>
          <a className="button button-white" href="#contact">Discuss a requirement <span>↗</span></a>
        </div>
        <div className="operations-gallery">
          <figure className="op-main" data-reveal><img src="/assets/yard-loading.jpg" alt="Forklift operating in the KH Wood storage yard" /><figcaption>Daily operations</figcaption></figure>
          <figure data-reveal><img src="/assets/pallet-stacks.jpg" alt="Wood stock stored for distribution" /><figcaption>Supply readiness</figcaption></figure>
          <figure data-reveal><img src="/assets/forklift-operations.jpg" alt="Forklift moving wood stock in the warehouse" /><figcaption>Staging &amp; handling</figcaption></figure>
        </div>
      </section>

      <section className="partner-section section" id="partners">
        <div className="section-topline" data-reveal><span>05</span><p>For international manufacturers</p><i /></div>
        <div className="partner-hero">
          <div className="partner-heading" data-reveal><p className="kicker">A credible route into Iraq</p><h2>Global ambition.<br /><em>Local execution.</em></h2></div>
          <div className="partner-copy" data-reveal><p>KH Wood helps manufacturers turn market interest into practical access through local representation, established relationships, and supply infrastructure.</p><a className="button button-black" href="#contact">Start a partnership conversation <span>↗</span></a></div>
        </div>
        <div className="partner-process">
          <article data-reveal><span>01</span><h3>Market fit</h3><p>Align the product, commercial model, and opportunity.</p></article>
          <article data-reveal><span>02</span><h3>Representation</h3><p>Structure local agency or franchise representation.</p></article>
          <article data-reveal><span>03</span><h3>Import &amp; stock</h3><p>Coordinate entry, storage, and supply readiness.</p></article>
          <article data-reveal><span>04</span><h3>Market growth</h3><p>Build durable access through local relationships.</p></article>
        </div>
        <div className="partner-image" data-reveal><img src="/assets/logistics-truck.jpg" alt="KH Wood logistics truck loaded with timber stock" /><div><span>Market-entry support</span><strong>Iraq</strong><p>One experienced local partner from introduction to implementation.</p></div></div>
      </section>

      <section className="evidence section" id="evidence">
        <div className="section-topline light-line" data-reveal><span>06</span><p>Proof &amp; credentials</p><i /></div>
        <div className="evidence-heading" data-reveal><p className="kicker">Reserved for approved evidence</p><h2>The details that<br /><em>make trust tangible.</em></h2><p>These sections are ready for the verified material the KH Wood team will provide before launch.</p></div>
        <div className="evidence-grid">
          <article data-reveal><span>01</span><h3>Selected clients</h3><p>Approved client and project names will appear here.</p><small>Content pending</small></article>
          <article data-reveal><span>02</span><h3>Certifications</h3><p>Verified standards, registrations, and certifications will appear here.</p><small>Content pending</small></article>
          <article data-reveal><span>03</span><h3>Partner brands</h3><p>Approved supplier and principal logos will appear here.</p><small>Content pending</small></article>
          <article data-reveal><span>04</span><h3>Client stories</h3><p>Verified testimonials and project outcomes will appear here.</p><small>Content pending</small></article>
        </div>
      </section>

      <section className="leadership section" id="leadership">
        <div className="section-topline" data-reveal><span>07</span><p>Family leadership</p><i /></div>
        <div className="split-heading" data-reveal>
          <div><p className="kicker">Experience across continents</p><h2>Family-led.<br /><em>Future-facing.</em></h2></div>
          <p>Three co-founders bring decades of supplier development, client relationships, and first-hand knowledge of the Iraqi market.</p>
        </div>
        <div className="leader-grid">
          {leaders.map((leader, index) => (
            <article className="leader-card" key={leader.name} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
              <div className="leader-top"><span>0{index + 1}</span><i>{leader.name.split(" ").map((part) => part[0]).join("")}</i></div>
              <p>{leader.role}</p><h3>{leader.name}</h3>
              <div className="leader-details"><span>{leader.experience}</span><span>{leader.focus}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="faq section">
        <div className="faq-heading" data-reveal><span className="section-index">08 — Common questions</span><h2>Clear answers,<br /><em>from the start.</em></h2></div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} data-reveal><summary><span>0{index + 1}</span><strong>{question}</strong><i>+</i></summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-intro" data-reveal>
          <p className="kicker">Start a commercial conversation</p>
          <h2>What can we<br /><em>move forward?</em></h2>
          <p>Tell us whether you&apos;re sourcing products, planning a project, or exploring representation in Iraq.</p>
          <div className="direct-contact"><a href="mailto:info@khodeer.com">info@khodeer.com <span>↗</span></a><a href="https://wa.me/962795185588" target="_blank" rel="noreferrer">WhatsApp us <span>↗</span></a></div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} data-reveal>
          <div className="field-row"><label><span>Your name *</span><input name="name" type="text" autoComplete="name" required placeholder="Full name" /></label><label><span>Company *</span><input name="company" type="text" autoComplete="organization" required placeholder="Company name" /></label></div>
          <div className="field-row"><label><span>Country *</span><input name="country" type="text" autoComplete="country-name" required placeholder="Country" /></label><label><span>Email *</span><input name="email" type="email" autoComplete="email" required placeholder="name@company.com" /></label></div>
          <div className="field-row"><label><span>Phone / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" placeholder="+00 000 000 0000" /></label><label><span>Enquiry type *</span><select name="inquiry" defaultValue="" required><option value="" disabled>Select one</option><option>Product supply</option><option>Project requirement</option><option>International partnership</option><option>Supplier enquiry</option><option>General</option></select></label></div>
          <label><span>Products or partnership interest</span><input name="interest" type="text" placeholder="Timber, panels, representation, project supply..." /></label>
          <label><span>How can we help? *</span><textarea name="message" rows={4} required placeholder="Tell us about your requirement or opportunity." /></label>
          <div className="form-footer"><p>By sending this enquiry, you agree that KH Wood may use these details to respond to your request.</p><button type="submit" className="button button-white">Send enquiry <span>↗</span></button></div>
          <p className="form-status" aria-live="polite">{formStatus}</p>
        </form>
      </section>

      <section className="offices">
        <div className="offices-heading" data-reveal><span className="section-index">Our footprint</span><h2>Local presence.<br />Regional reach.</h2></div>
        <div className="office-grid">
          {offices.map((office, index) => <article key={office.city} data-reveal><span>0{index + 1}</span><h3>{office.city}</h3><p>{office.country}</p><small>{office.address}</small></article>)}
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <div className="footer-brand"><img src="/assets/kh-logo.png" alt="Khodeer Abbas & Partners Co." /><p>Iraq&apos;s trusted wood supply partner—for projects at home and partnerships from around the world.</p></div>
          <div className="footer-cta"><span>Have a requirement?</span><a href="#contact">Let&apos;s talk business <i>↗</i></a></div>
        </div>
        <div className="footer-grid">
          <div><span>Supply</span><a href="#products">Wood &amp; timber</a><a href="#products">Panels &amp; boards</a><a href="#products">Project supply</a><a href="#operations">Operations</a></div>
          <div><span>Partnership</span><a href="#partners">Market entry</a><a href="#partners">Agency representation</a><a href="#partners">Import coordination</a><a href="#evidence">Credentials</a></div>
          <div><span>Company</span><a href="#heritage">Our heritage</a><a href="#leadership">Leadership</a><a href="#contact">Contact</a><a href="mailto:info@khodeer.com">info@khodeer.com</a></div>
          <div><span>Offices</span><p>Baghdad · Al-Basatin</p><p>Basra · Al-Ashar</p><p>Amman · Gardens</p><a href="https://wa.me/962795185588" target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
        </div>
        <div className="footer-bottom"><p>© 2026 KH Wood. All rights reserved.</p><p>Khodeer Abbas &amp; Partners Co.</p><a href="#top">Back to top ↑</a></div>
      </footer>

      <a className="whatsapp-bubble" href="https://wa.me/962795185588?text=Hello%20KH%20Wood%2C%20I%27d%20like%20to%20make%20an%20enquiry." target="_blank" rel="noreferrer" aria-label="Chat with KH Wood on WhatsApp"><span>WA</span><i>Chat with us</i></a>
    </main>
  );
}
