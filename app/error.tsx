"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="route-error">
      <span>KH / Connection interrupted</span>
      <h1>This page didn&apos;t<br /><em>arrive cleanly.</em></h1>
      <p>Your connection may have paused during navigation. Retry the page without losing your place.</p>
      <button className="button button-red" type="button" onClick={reset}>Try again <b>↻</b></button>
      <Link href="/">Return home ↗︎</Link>
    </main>
  );
}
