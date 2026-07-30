"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  ["Company", "/company"],
  ["Products", "/products"],
  ["Partners", "/partners"],
  ["Operations", "/operations"],
] as const;

export function SiteShell({ children, active, headerOnLight }: { children: ReactNode; active?: string; headerOnLight?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 28);
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -48px" },
    );

    const prepareReveal = (node: Element) => {
      if (node.classList.contains("is-visible") || node.classList.contains("reveal-ready")) return;
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94) {
        node.classList.add("is-visible");
        return;
      }
      node.classList.add("reveal-ready");
      observer.observe(node);
    };

    document.querySelectorAll("[data-reveal]").forEach(prepareReveal);
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches("[data-reveal]")) prepareReveal(node);
        node.querySelectorAll("[data-reveal]").forEach(prepareReveal);
      }));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const lightOrigin = headerOnLight ?? (active === "company" || active === "products");

  return (
    <>
      <div className="site-grain" aria-hidden="true" />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-active" : ""}${lightOrigin ? " light-origin" : ""}`}>
        <Link href="/" className="brand" aria-label="KH Wood home">
          <img src="/assets/kh-logo-transparent.png" alt="Khodeer Abbas & Partners Co." width={1088} height={245} fetchPriority="high" />
        </Link>
        <nav className={`nav-links${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <Link key={href} href={href} aria-current={active === label.toLowerCase() ? "page" : undefined} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
          <Link href="/contact" className="nav-cta" aria-current={active === "contact" ? "page" : undefined} onClick={() => setMenuOpen(false)}>Start an enquiry <span>↗</span></Link>
        </nav>
        <button className={`menu-button${menuOpen ? " is-open" : ""}`} type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
      </header>

      <main id="main-content" className="page-enter">{children}</main>

      <footer className="site-footer">
        <div className="footer-lead">
          <div className="footer-brand">
            <img src="/assets/kh-logo-transparent.png" alt="Khodeer Abbas & Partners Co." width={1088} height={245} loading="lazy" decoding="async" />
            <p>Family-led wood supply and market access, built around the realities of Iraq.</p>
          </div>
          <Link className="footer-enquiry" href="/contact"><small>Have a requirement?</small><span>Let&apos;s move it forward <i>↗</i></span></Link>
        </div>
        <div className="footer-columns">
          <div><span>Explore</span><Link href="/company">Our company</Link><Link href="/products">Products</Link><Link href="/operations">Operations</Link></div>
          <div><span>Work with us</span><Link href="/partners">Enter the Iraqi market</Link><Link href="/contact?type=supply">Request product supply</Link><Link href="/contact?type=partner">Discuss representation</Link></div>
          <div><span>Contact</span><a href="mailto:info@khodeer.com">info@khodeer.com</a><a href="https://wa.me/962795185588" target="_blank" rel="noreferrer">WhatsApp +962 79 518 5588</a></div>
          <div><span>Locations</span><p>Baghdad · Iraq</p><p>Basra · Iraq</p><p>Amman · Jordan</p></div>
        </div>
        <div className="footer-bottom"><p>© 2026 KH Wood</p><p>Khodeer Abbas &amp; Partners Co.</p><a href="#main-content">Back to top ↑</a></div>
      </footer>

      <a className="whatsapp-bubble" href="https://wa.me/962795185588?text=Hello%20KH%20Wood%2C%20I%27d%20like%20to%20make%20an%20enquiry." target="_blank" rel="noreferrer" aria-label="Chat with KH Wood on WhatsApp"><span>WA</span><i>Chat with us</i></a>
    </>
  );
}

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState("");
  const inquiryRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const type = search.get("type");
    const product = search.get("product");
    if (inquiryRef.current) {
      inquiryRef.current.value = type === "partner" ? "International partnership" : type === "supply" ? "Product supply" : "";
    }
    if (product && messageRef.current) {
      const label = product.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      messageRef.current.value = `Product range: ${label}\n\n`;
    }
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
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
      "",
      `${data.get("message")}`,
    ].join("\n");

    setStatus("Your email application is opening with this enquiry ready to send.");
    window.location.href = `mailto:info@khodeer.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className={`enquiry-form${compact ? " compact" : ""}`} onSubmit={submit}>
      <div className="field-row">
        <label><span>Your name *</span><input name="name" autoComplete="name" required placeholder="Full name" /></label>
        <label><span>Company *</span><input name="company" autoComplete="organization" required placeholder="Company name" /></label>
      </div>
      <div className="field-row">
        <label><span>Work email *</span><input name="email" type="email" autoComplete="email" required placeholder="name@company.com" /></label>
        <label><span>Phone / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" placeholder="+00 000 000 0000" /></label>
      </div>
      <div className="field-row">
        <label><span>Country *</span><input name="country" autoComplete="country-name" required placeholder="Country" /></label>
        <label><span>I&apos;m interested in *</span><select ref={inquiryRef} name="inquiry" defaultValue="" required><option value="" disabled>Select one</option><option>Product supply</option><option>Project requirement</option><option>International partnership</option><option>Agency representation</option><option>General enquiry</option></select></label>
      </div>
      <label><span>Tell us what you need *</span><textarea ref={messageRef} name="message" rows={compact ? 3 : 5} required placeholder="Product, volume, project location, timeline, or partnership opportunity…" /></label>
      <div className="form-action"><p>We&apos;ll route your enquiry to the right commercial contact.</p><button className="button button-white" type="submit">Send enquiry <span>↗</span></button></div>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  );
}
