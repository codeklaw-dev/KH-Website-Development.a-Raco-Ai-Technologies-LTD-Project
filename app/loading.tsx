export default function Loading() {
  return (
    <main className="route-status" aria-live="polite" aria-busy="true">
      <div className="route-status-mark">KH</div>
      <div className="route-status-copy"><span>Loading the next section</span><div className="route-status-line"><i /></div></div>
    </main>
  );
}
