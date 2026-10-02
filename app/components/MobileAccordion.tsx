"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Collapsible section used to keep the enquiry compact on phones.
 *
 * The markup is identical on every screen size; CSS forces the panel open and
 * hides the trigger above the phone breakpoint, so desktop behaviour is
 * untouched and there is no second DOM to keep in sync.
 *
 * Collapsed panels still render their fields (they are clipped, not removed),
 * so a `required` field inside a closed section would block submission with no
 * visible cause. The wrapper listens for `invalid` in the capture phase — the
 * event does not bubble — and opens itself so the browser can focus and report
 * on the offending field.
 */
export function MobileAccordion({
  title,
  meta,
  children,
  action,
  defaultOpen = false,
}: {
  title: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reveal = () => setOpen(true);
    root.addEventListener("invalid", reveal, true);
    return () => root.removeEventListener("invalid", reveal, true);
  }, []);

  return (
    <div ref={rootRef} className={`m-acc${open ? " is-open" : ""}`}>
      <div className="m-acc-bar">
        <button className="m-acc-toggle" type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span className="m-acc-title">{title}</span>
          {meta ? <span className="m-acc-meta">{meta}</span> : null}
          <svg className="m-acc-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {action ? <div className="m-acc-action">{action}</div> : null}
      </div>
      <div className="m-acc-panel">
        <div className="m-acc-panel-inner">{children}</div>
      </div>
    </div>
  );
}
