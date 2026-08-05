"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEnquiryCart } from "./EnquiryCart";
import { EnquiryItemFields } from "./EnquiryItemFields";
import { lockBodyScroll } from "./scrollLock";

export function EnquiryNavCta({ onNavigate, active }: { onNavigate?: () => void; active?: boolean }) {
  const { items, openDrawer } = useEnquiryCart();

  if (items.length === 0) {
    return (
      <Link href="/contact" className="nav-cta" aria-current={active ? "page" : undefined} onClick={onNavigate}><b className="nav-cta-label-full">Start an enquiry</b><b className="nav-cta-label-short">Enquiry</b> <span>↗︎</span></Link>
    );
  }

  return (
    <button className="nav-cta nav-cta-bag" type="button" onClick={() => { onNavigate?.(); openDrawer(); }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      <b>Your enquiry</b> <span>{items.length}</span>
    </button>
  );
}

export function EnquiryDrawer() {
  const { items, drawerOpen, closeDrawer, clear } = useEnquiryCart();
  const [status, setStatus] = useState("");
  const [confirmingClear, setConfirmingClear] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!drawerOpen) return;

    const previous = document.activeElement as HTMLElement | null;
    const release = lockBodyScroll();
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { closeDrawer(); return; }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      release();
      previous?.focus?.();
      setConfirmingClear(false);
    };
  }, [drawerOpen, closeDrawer]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `KH Wood enquiry — ${items.map((item) => item.title).join(", ")}`;
    const lines = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company")}`,
      `Country: ${data.get("country")}`,
      `Email: ${data.get("email")}`,
      `Phone / WhatsApp: ${data.get("phone")}`,
      "",
      "Products requested:",
      "",
      ...items.flatMap((item) => [
        `${item.n} — ${item.title}`,
        ...item.fields.map((field, index) => `  ${field.label}: ${item.values[index] || "—"}`),
        "",
      ]),
      data.get("message") ? `Additional notes:\n${data.get("message")}` : "",
    ];

    setStatus("Your email application is opening with this enquiry ready to send.");
    window.location.href = `mailto:info@khodeer.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  function goToContactPage() {
    closeDrawer();
    router.push("/contact");
  }

  return (
    <>
      <button className={`enquiry-scrim${drawerOpen ? " is-open" : ""}`} type="button" tabIndex={-1} aria-hidden="true" onClick={closeDrawer} />
      <aside ref={panelRef} className={`enquiry-drawer${drawerOpen ? " is-open" : ""}`} inert={!drawerOpen || undefined} aria-label="Your enquiry">
        <div className="enquiry-drawer-head">
          <div><span>Your enquiry</span><b>{items.length} product{items.length === 1 ? "" : "s"} selected</b></div>
          <div className="enquiry-drawer-head-actions">
            {items.length > 0 && (confirmingClear ? (
              <>
                <button type="button" className="drawer-clear-confirm" onClick={() => { clear(); setConfirmingClear(false); }}>Clear all?</button>
                <button type="button" className="drawer-clear-cancel" onClick={() => setConfirmingClear(false)}>Cancel</button>
              </>
            ) : (
              <button type="button" className="drawer-icon-button" onClick={() => setConfirmingClear(true)} aria-label="Clear all products from this enquiry">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            ))}
            <button type="button" ref={closeRef} className="drawer-icon-button" onClick={closeDrawer} aria-label="Close enquiry">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="enquiry-drawer-empty">Browse the range and add products you&apos;d like a quote for.</p>
        ) : (
          <form className="enquiry-drawer-form" onSubmit={submit}>
            <div className="enquiry-drawer-scroll">
            <div className="enquiry-drawer-contact">
              <span className="enquiry-drawer-label">Your details</span>
              <div className="field-row">
                <label><span>Your name *</span><input name="name" autoComplete="name" required placeholder="Full name" /></label>
                <label><span>Company *</span><input name="company" autoComplete="organization" required placeholder="Company name" /></label>
              </div>
              <div className="field-row">
                <label><span>Work email *</span><input name="email" type="email" autoComplete="email" required placeholder="name@company.com" /></label>
                <label><span>Phone / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" placeholder="+00 000 000 0000" /></label>
              </div>
              <label><span>Country *</span><input name="country" autoComplete="country-name" required placeholder="Country" /></label>
              <label><span>Anything else?</span><textarea name="message" rows={2} placeholder="Delivery destination, timeline, or other notes…" /></label>
            </div>

            <div className="enquiry-drawer-items">
              <span className="enquiry-drawer-label">Products in this enquiry</span>
              {items.map((item) => <EnquiryItemFields key={item.slug} item={item} />)}
            </div>
            </div>

            <div className="enquiry-drawer-actions">
              <p className="form-status" aria-live="polite">{status}</p>
              <button className="button button-red" type="submit">Send enquiry <span>↗︎</span></button>
              <button type="button" className="drawer-secondary" onClick={goToContactPage}>Finish on contact page ↗︎</button>
            </div>
          </form>
        )}
      </aside>
    </>
  );
}
