"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEnquiryCart } from "./EnquiryCart";
import { EnquiryItemFields } from "./EnquiryItemFields";

export function EnquiryNavCta({ onNavigate, active }: { onNavigate?: () => void; active?: boolean }) {
  const { items, openDrawer } = useEnquiryCart();

  if (items.length === 0) {
    return (
      <Link href="/contact" className="nav-cta" aria-current={active ? "page" : undefined} onClick={onNavigate}>Start an enquiry <span>↗</span></Link>
    );
  }

  return (
    <button className="nav-cta nav-cta-bag" type="button" onClick={openDrawer}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      Your enquiry <span>{items.length}</span>
    </button>
  );
}

export function EnquiryDrawer() {
  const { items, drawerOpen, closeDrawer, clear } = useEnquiryCart();
  const [status, setStatus] = useState("");
  const router = useRouter();

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
      <aside className={`enquiry-drawer${drawerOpen ? " is-open" : ""}`} aria-hidden={!drawerOpen} aria-label="Your enquiry">
        <div className="enquiry-drawer-head">
          <div><span>Your enquiry</span><b>{items.length} product{items.length === 1 ? "" : "s"} selected</b></div>
          <button type="button" onClick={closeDrawer} aria-label="Close enquiry">✕</button>
        </div>

        {items.length === 0 ? (
          <p className="enquiry-drawer-empty">Browse the range and add products you&apos;d like a quote for.</p>
        ) : (
          <form className="enquiry-drawer-form" onSubmit={submit}>
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

            <div className="enquiry-drawer-actions">
              <button type="button" className="text-link" onClick={clear}>Clear all</button>
              <div className="enquiry-drawer-actions-primary">
                <button type="button" className="button button-ghost-dark" onClick={goToContactPage}>Finish on contact page</button>
                <button className="button button-red" type="submit">Send enquiry <span>↗</span></button>
              </div>
            </div>
            <p className="form-status" aria-live="polite">{status}</p>
          </form>
        )}
      </aside>
    </>
  );
}
