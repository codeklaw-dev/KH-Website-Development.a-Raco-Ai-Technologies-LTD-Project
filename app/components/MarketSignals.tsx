import { getMarketNews } from "../lib/marketNews";
import { newsSources } from "../data/marketNewsSources";
import type { NewsItem } from "../data/marketNewsSources";

function relativeDate(iso: string | null): { label: string; dateTime?: string } {
  if (!iso) return { label: "Market context" };
  const then = Date.parse(iso);
  if (!Number.isFinite(then)) return { label: "Market context" };

  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days <= 0) return { label: "Today", dateTime: iso };
  if (days === 1) return { label: "Yesterday", dateTime: iso };
  if (days < 21) return { label: `${days} days ago`, dateTime: iso };
  const weeks = Math.round(days / 7);
  return { label: `${weeks} weeks ago`, dateTime: iso };
}

function SignalTile({ item, lead }: { item: NewsItem; lead?: boolean }) {
  const external = /^https?:\/\//i.test(item.link);
  const { label, dateTime } = relativeDate(item.publishedAt);

  const classes = ["signal-tile"];
  if (lead) classes.push("signal-lead");
  if (item.image) classes.push("has-image");

  return (
    <a
      className={classes.join(" ")}
      href={item.link}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {item.image ? (
        <span className="signal-shade" style={{ backgroundImage: `url(${item.image})` }} aria-hidden="true" />
      ) : null}
      <span className="signal-meta">
        <b>{item.category}</b>
        {dateTime ? <time dateTime={dateTime}>{label}</time> : <time>{label}</time>}
      </span>
      <h3>{item.title}</h3>
      <span className="signal-source">
        <em>{item.source}</em>
        <i aria-hidden="true">↗︎</i>
      </span>
    </a>
  );
}

export function MarketSignalsSkeleton() {
  return (
    <div className="signal-bento signal-bento-loading" aria-hidden="true">
      <span className="signal-tile signal-lead" />
      <span className="signal-board" />
      {Array.from({ length: 6 }, (_, index) => <span className="signal-tile" key={index} />)}
    </div>
  );
}

export async function MarketSignals() {
  const { items, mode, fetchedAt } = await getMarketNews();
  if (!items.length) return null;

  const [lead, ...rest] = items;
  const board =
    mode === "seed"
      ? { status: "Standing context", detail: "Live headlines unavailable" }
      : mode === "stale"
        ? { status: "Last refreshed", detail: relativeDate(fetchedAt).label.toLowerCase() }
        : { status: "Updated hourly", detail: `${newsSources.length} trade sources` };

  return (
    <div className="signal-bento">
      <SignalTile item={lead} lead />
      <div className="signal-board">
        <span>Market signals</span>
        <strong>Timber &amp; steel,<br />as it moves.</strong>
        <p>
          {board.status}
          <i aria-hidden="true">·</i>
          {board.detail}
        </p>
      </div>
      {rest.map((item, index) => <SignalTile item={item} key={`${item.source}-${index}`} />)}
    </div>
  );
}
