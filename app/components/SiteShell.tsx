"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EnquiryNavCta, EnquiryDrawer } from "./EnquiryDrawer";
import { useEnquiryCart } from "./EnquiryCart";
import { EnquiryItemFields } from "./EnquiryItemFields";
import { VideoAutoplay } from "./VideoAutoplay";
import { lockBodyScroll } from "./scrollLock";

const navigation = [
  ["Company", "/company"],
  ["Products", "/products"],
  ["Partners", "/partners"],
  ["Franchise", "/franchise"],
  ["Operations", "/operations"],
  ["Contact", "/contact"],
] as const;

const productRoutes = [
  ["Wood & timber", "/products/wood-timber"],
  ["Panels & boards", "/products/panels-boards"],
  ["Project materials", "/products/project-materials"],
  ["Bulk requirements", "/products/bulk-requirements"],
  ["Agency representation", "/products/agency-representation"],
] as const;

const audienceRoutes = [
  ["Buyers & projects", "Source materials from stock", "/products"],
  ["International manufacturers", "Your route into the Iraqi market", "/partners"],
  ["Distributors & franchisees", "Carry the KH name in your territory", "/franchise"],
] as const;

export function SiteShell({ children, active, headerOnLight }: { children: ReactNode; active?: string; headerOnLight?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // The progress bar is written straight to the DOM and `scrolled` only set
    // when it actually flips. Storing progress in state re-rendered the whole
    // shell — including every page below it — on each scroll event, which was
    // the bulk of the scroll jank. Reading scrollHeight is also a forced
    // layout, so it is cached and refreshed on resize instead of per frame.
    let raf = 0;
    let maxScroll = 0;
    let isScrolled = false;

    const measure = () => {
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    };

    const render = () => {
      raf = 0;
      const y = window.scrollY;
      if (progressRef.current) {
        progressRef.current.style.width = `${maxScroll > 0 ? (y / maxScroll) * 100 : 0}%`;
      }
      const next = y > 20;
      if (next !== isScrolled) {
        isScrolled = next;
        setScrolled(next);
      }
    };

    const handleScroll = () => { if (!raf) raf = requestAnimationFrame(render); };
    const handleResize = () => { measure(); handleScroll(); };

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
    window.addEventListener("resize", handleResize);
    measure();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const release = menuOpen ? lockBodyScroll() : undefined;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => { release?.(); window.removeEventListener("keydown", closeOnEscape); };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const lightOrigin = headerOnLight ?? active === "products";
  // Routes whose hero is light or starts flush under the header, so the
  // transparent state would be unreadable: keep the solid red bar from load.
  const SOLID_HEADER_ROUTES = ["/contact", "/products", "/partners"];
  const forceScrolledHeader = SOLID_HEADER_ROUTES.includes(pathname) || pathname.startsWith("/products/");
  const isScrolled = scrolled || forceScrolledHeader;

  return (
    <>
      <div className="site-grain" aria-hidden="true" />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true"><span ref={progressRef} /></div>
      <header className={`site-header${isScrolled ? " is-scrolled" : ""}${menuOpen ? " menu-active" : ""}${lightOrigin ? " light-origin" : ""}`}>
        <button className={`menu-button${menuOpen ? " is-open" : ""}`} type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="nav-panel" onClick={() => setMenuOpen((open) => !open)}>
          <i aria-hidden="true"><span /><span /></i>
          <b>{menuOpen ? "Close" : "Menu"}</b>
        </button>
        <Link href="/" className="brand" aria-label="KH Wood home">
          <img src="/assets/kh-logo-mark.png" alt="Khodeer Abbas & Partners Co." width={1047} height={236} fetchPriority="high" />
        </Link>
        <EnquiryNavCta onNavigate={() => setMenuOpen(false)} active={active === "contact"} />
      </header>

      <nav id="nav-panel" className={`nav-panel${menuOpen ? " is-open" : ""}`} aria-label="Main navigation" aria-hidden={!menuOpen}>
        <div className="nav-panel-inner">
          <div className="nav-primary">
            <span className="nav-group-label">Explore</span>
            {navigation.map(([label, href]) => (
              <Link key={href} href={href} tabIndex={menuOpen ? undefined : -1} aria-current={active === label.toLowerCase() ? "page" : undefined} onClick={() => setMenuOpen(false)}>{label}<i aria-hidden="true">↗︎</i></Link>
            ))}
          </div>
          <div className="nav-products">
            <span className="nav-group-label">Products &amp; services</span>
            {productRoutes.map(([label, href]) => (
              <Link key={href} href={href} tabIndex={menuOpen ? undefined : -1} onClick={() => setMenuOpen(false)}>{label}</Link>
            ))}
            <Link className="nav-products-all" href="/products#services" tabIndex={menuOpen ? undefined : -1} onClick={() => setMenuOpen(false)}>Services &amp; capabilities <i aria-hidden="true">↗︎</i></Link>
          </div>
          <div className="nav-audience">
            <span className="nav-group-label">Work with us</span>
            {audienceRoutes.map(([label, note, href]) => (
              <Link key={href} href={href} tabIndex={menuOpen ? undefined : -1} onClick={() => setMenuOpen(false)}><b>{label}</b><small>{note}</small></Link>
            ))}
            <div className="nav-contact">
              <a href="mailto:info@khodeer.com" tabIndex={menuOpen ? undefined : -1}>info@khodeer.com</a>
              <a href="https://wa.me/962795185588" target="_blank" rel="noreferrer" tabIndex={menuOpen ? undefined : -1}>WhatsApp +962 79 518 5588</a>
              <p>Baghdad · Basra · Amman</p>
            </div>
          </div>
        </div>
      </nav>
      <button className={`nav-scrim${menuOpen ? " is-open" : ""}`} type="button" tabIndex={-1} aria-hidden="true" onClick={() => setMenuOpen(false)} />

      <main id="main-content" className="page-enter">{children}</main>

      <footer className="site-footer">
        <div className="footer-lead">
          <div className="footer-brand">
            <img src="/assets/kh-logo-mark.png" alt="Khodeer Abbas & Partners Co." width={1047} height={236} loading="lazy" decoding="async" />
            <p>Three generations in the Iraqi timber trade.<br />Global partners, local execution.</p>
          </div>
          <Link className="footer-enquiry" href="/contact"><small>Have a requirement?</small><span>Let&apos;s move it forward <i>↗︎</i></span></Link>
        </div>
        <div className="footer-columns">
          <div><span>Explore</span><Link href="/company">Company</Link><Link href="/products">Products</Link><Link href="/operations">Operations</Link></div>
          <div><span>Work with us</span><Link href="/partners">Market entry</Link><Link href="/franchise">Franchise</Link><Link href="/contact?type=supply">Supply</Link><Link href="/contact?type=partner">Representation</Link></div>
          <div><span>Contact</span><a href="mailto:info@khodeer.com?subject=Sales%20enquiry">Sales</a><a href="mailto:purchasing@khodeer.com?subject=Supplier%20enquiry">Purchasing</a><a href="mailto:info@khodeer.com?subject=International%20partnership">Partnerships</a><a href="https://wa.me/962795185588" target="_blank" rel="noreferrer">WhatsApp</a></div>
          <div><span>Locations</span><p>Baghdad · Iraq</p><p>Basra · Iraq</p><p>Amman · Jordan</p></div>
        </div>
        <div className="footer-bottom"><p>© 2026 KH Wood</p><p>Khodeer Abbas &amp; Partners Co.</p><a href="#main-content">Back to top ↑︎</a></div>
      </footer>

      <a className="whatsapp-bubble" href="https://wa.me/962795185588?text=Hello%20KH%20Wood%2C%20I%27d%20like%20to%20make%20an%20enquiry." target="_blank" rel="noreferrer" aria-label="Chat with KH Wood on WhatsApp">
        <span aria-hidden="true">
          <svg viewBox="0 0 32 32" role="presentation"><path fill="currentColor" d="M16.04 3.2A12.75 12.75 0 0 0 5.1 22.52L3.2 29.46l7.1-1.86a12.74 12.74 0 1 0 5.74-24.4Zm0 22.98c-1.93 0-3.82-.52-5.46-1.5l-.4-.24-4.22 1.1 1.13-4.1-.26-.42a10.24 10.24 0 1 1 9.21 5.16Zm5.62-7.66c-.31-.16-1.82-.9-2.1-1-.28-.11-.49-.16-.69.15-.2.31-.8 1-.98 1.2-.18.2-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53a9.3 9.3 0 0 1-1.72-2.14c-.18-.31-.02-.48.14-.64.14-.14.31-.36.46-.54.16-.18.21-.31.31-.52.1-.2.05-.38-.03-.54-.08-.15-.69-1.66-.95-2.28-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.54.08-.82.38-.28.31-1.08 1.06-1.08 2.57 0 1.51 1.1 2.98 1.26 3.18.15.2 2.17 3.31 5.25 4.64.73.32 1.3.5 1.75.64.74.23 1.4.2 1.93.12.59-.09 1.82-.75 2.08-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.2-.59-.36Z" /></svg>
        </span>
        <i>Chat with us</i>
      </a>
      <EnquiryDrawer />
      <VideoAutoplay />
    </>
  );
}

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState("");
  const inquiryRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const { items } = useEnquiryCart();

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const type = search.get("type");
    const product = search.get("product");
    if (inquiryRef.current) {
      inquiryRef.current.value = type === "partner" ? "International partnership" : type === "supply" ? "Product supply" : type === "franchise" ? "Franchise or distribution" : type === "profile" ? "Company profile request" : "";
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
      `Partnership interest: ${data.get("interest") || "Not specified"}`,
      "",
      `${data.get("message")}`,
      ...(items.length > 0 ? [
        "",
        "Products in enquiry:",
        "",
        ...items.flatMap((item) => [
          `${item.n} — ${item.title}`,
          ...item.fields.map((field, index) => `  ${field.label}: ${item.values[index] || "—"}`),
          "",
        ]),
      ] : []),
    ].join("\n");

    setStatus("Your email application is opening with this enquiry ready to send.");
    window.location.href = `mailto:info@khodeer.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className={`enquiry-form${compact ? " compact" : ""}`} onSubmit={submit}>
      {items.length > 0 && (
        <div className="contact-cart-summary">
          <span>Your enquiry so far ({items.length})</span>
          {items.map((item) => <EnquiryItemFields key={item.slug} item={item} />)}
        </div>
      )}
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
        <label><span>I&apos;m interested in *</span><select ref={inquiryRef} name="inquiry" defaultValue="" required><option value="" disabled>Select one</option><option>Product supply</option><option>Project requirement</option><option>International partnership</option><option>Agency representation</option><option>Franchise or distribution</option><option>Company profile request</option><option>General enquiry</option></select></label>
      </div>
      <label><span>Partnership interest</span><select name="interest" defaultValue=""><option value="">Not applicable</option><option>Sole agency or franchise representation in Iraq</option><option>Distribution or local franchise territory</option><option>Import and distribution coordination</option><option>Bulk storage and supply readiness</option><option>Project supply support</option><option>Market-entry support</option></select></label>
      <label><span>Tell us what you need *</span><textarea ref={messageRef} name="message" rows={compact ? 3 : 5} required placeholder="Product, volume, project location, timeline, or partnership opportunity…" /></label>
      <div className="form-action"><p>We&apos;ll route your enquiry to the right commercial contact.</p><button className="button button-white" type="submit">Send enquiry <span>↗︎</span></button></div>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  );
}
