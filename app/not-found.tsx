import Link from "next/link";

export default function NotFound() {
  return (
    <main className="route-error">
      <span>KH / 404</span>
      <h1>This route is<br /><em>not in our yard.</em></h1>
      <p>The address may have changed or the page no longer exists.</p>
      <Link className="button button-red" href="/">Return home <b>↗</b></Link>
    </main>
  );
}
