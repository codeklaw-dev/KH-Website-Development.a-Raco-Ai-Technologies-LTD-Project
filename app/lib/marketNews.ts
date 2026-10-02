import {
  categorise,
  localKeywords,
  materialKeywords,
  newsSources,
  regionKeywords,
  seedItems,
  tradeKeywords,
  type NewsItem,
} from "../data/marketNewsSources";

const CACHE_KEY = "https://kh-wood.local/_market-news/v1";
const CACHE_SECONDS = 3600;
const FEED_TIMEOUT_MS = 2000;
const MAX_AGE_DAYS = 45;
const MAX_ITEMS = 7;
const SOURCE_CAP = 2;
const CATEGORY_CAP = 3;
const MAX_TITLE = 130;

export type NewsMode = "live" | "stale" | "seed";
export type MarketNews = { items: readonly NewsItem[]; mode: NewsMode; fetchedAt: string | null };

const entities: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", hellip: "…",
};

/** Feed titles arrive wrapped in CDATA, entity-encoded, sometimes twice, and with stray markup. */
function decode(raw: string): string {
  let text = raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
  for (let pass = 0; pass < 2; pass += 1) {
    text = text.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
      .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
      .replace(/&([a-z]+);/gi, (match, name) => entities[name.toLowerCase()] ?? match);
  }
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function tag(block: string, name: string): string | null {
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return match ? match[1] : null;
}

/** Atom puts the URL in an attribute; RSS puts it in the element body. */
function extractLink(block: string): string | null {
  const href = block.match(/<link[^>]*\brel=["']alternate["'][^>]*\bhref=["']([^"']+)["']/i)
    ?? block.match(/<link[^>]*\bhref=["']([^"']+)["']/i);
  if (href) return href[1];
  const body = tag(block, "link");
  return body ? decode(body) : null;
}

function countMatches(text: string, words: readonly string[]): number {
  let total = 0;
  for (const word of words) {
    // Word boundaries only. Substring matching scores "Report" as "port".
    const pattern = new RegExp(`(^|[^a-z])${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z]|$)`, "i");
    if (pattern.test(text)) total += 1;
  }
  return total;
}

function parseFeed(xml: string, source: string): NewsItem[] {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) ?? [];
  const items: NewsItem[] = [];

  for (const block of blocks) {
    const rawTitle = tag(block, "title");
    const link = extractLink(block);
    if (!rawTitle || !link) continue;

    const title = decode(rawTitle);
    // Some feeds emit placeholder or interstitial rows when rate-limiting.
    if (title.length < 18 || /^access\b|temporarily restricted|^untitled/i.test(title)) continue;
    // Trade feeds carry a lot of diary filler. It is not market intelligence.
    if (/\b(webinar|seminar|expo|conference|tradeshow|trade show|awards?|appoints?|appointed|obituary|podcast|newsletter|subscribe)\b/i.test(title)) continue;
    if (!/^https?:\/\//i.test(link)) continue;

    const rawDate = tag(block, "pubDate") ?? tag(block, "published") ?? tag(block, "updated") ?? tag(block, "dc:date");
    const parsed = rawDate ? new Date(decode(rawDate)) : null;
    const publishedAt = parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString() : null;

    items.push({
      title: title.length > MAX_TITLE ? `${title.slice(0, MAX_TITLE - 1).trimEnd()}…` : title,
      link,
      source,
      publishedAt,
      category: "Trade",
    });
  }

  return items;
}

async function fetchFeed(url: string, source: string): Promise<NewsItem[]> {
  const response = await fetch(url, {
    headers: {
      "user-agent": "KHWoodBot/1.0 (+https://khodeer.com; market signals for khwood.iq)",
      accept: "application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.8",
    },
    signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
  });
  if (!response.ok) return [];
  return parseFeed(await response.text(), source);
}

function rank(items: NewsItem[]): NewsItem[] {
  const now = Date.now();
  const cutoff = now - MAX_AGE_DAYS * 86_400_000;
  const seen = new Set<string>();
  const scored: { item: NewsItem; score: number; tier: number }[] = [];

  for (const item of items) {
    const time = item.publishedAt ? Date.parse(item.publishedAt) : NaN;
    if (Number.isFinite(time) && time < cutoff) continue;

    // A feed carried twice (main + category) must not fill the bento with one story.
    const fingerprint = item.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (seen.has(fingerprint)) continue;
    seen.add(fingerprint);

    // Presence, not frequency: "Iraq" and "Iraqi" in one headline is still one
    // signal, otherwise repetition alone outranks relevance.
    const local = countMatches(item.title, localKeywords) > 0;
    const region = countMatches(item.title, regionKeywords) > 0;
    const material = countMatches(item.title, materialKeywords) > 0;
    const trade = Math.min(countMatches(item.title, tradeKeywords), 3);

    // Either it is about our materials, or it is about trade somewhere we
    // trade. Iraqi banking and Gulf politics are neither.
    if (!material && !((local || region) && trade > 0)) continue;

    // Recency decays the relevance score so a month-old Iraq item cannot
    // outrank this morning's timber story.
    const ageDays = Number.isFinite(time) ? Math.max(0, (now - time) / 86_400_000) : 14;
    const relevance = (local ? 3 : 0) + (region ? 1.5 : 0) + (material ? 2.5 : 0) + trade * 0.75;
    scored.push({
      item: { ...item, category: categorise(item.title, { local }) },
      score: relevance - ageDays * 0.12,
      tier: local ? 2 : region ? 1 : 0,
    });
  }

  scored.sort((a, b) => b.score - a.score);

  // No single publisher may own the bento, however well it scores.
  // Four timber feeds against one steel feed would otherwise make every
  // bento a timber bento. Caps first, then a relaxed pass to fill any gap.
  const perSource = new Map<string, number>();
  const perCategory = new Map<string, number>();
  const picked: NewsItem[] = [];
  for (const [sourceCap, categoryCap] of [[SOURCE_CAP, CATEGORY_CAP], [Infinity, Infinity]] as const) {
    for (const { item } of scored) {
      if (picked.length >= MAX_ITEMS) break;
      if (picked.includes(item)) continue;
      if ((perSource.get(item.source) ?? 0) >= sourceCap) continue;
      if ((perCategory.get(item.category) ?? 0) >= categoryCap) continue;
      perSource.set(item.source, (perSource.get(item.source) ?? 0) + 1);
      perCategory.set(item.category, (perCategory.get(item.category) ?? 0) + 1);
      picked.push(item);
    }
  }

  // Relevance decides what makes the cut; proximity decides who leads. The
  // best Iraq story takes the lead tile even if a global one scored higher.
  const tierOf = new Map(scored.map((entry) => [entry.item, entry.tier]));
  return picked
    .map((item, index) => ({ item, index }))
    .sort((a, b) => (tierOf.get(b.item) ?? 0) - (tierOf.get(a.item) ?? 0) || a.index - b.index)
    .map((entry) => entry.item);
}

/** The Cache API is absent in the Node test harness and in some dev runs. */
function cacheStore(): Cache | null {
  try {
    // `caches.default` is a Workers extension, absent from the DOM lib types
    // and absent entirely under Node.
    const store = (caches as CacheStorage & { default?: Cache }).default;
    return typeof caches !== "undefined" && store ? store : null;
  } catch {
    return null;
  }
}

async function readCache(): Promise<MarketNews | null> {
  const store = cacheStore();
  if (!store) return null;
  try {
    const hit = await store.match(CACHE_KEY);
    if (!hit) return null;
    const cached = (await hit.json()) as MarketNews;
    return cached?.items?.length ? cached : null;
  } catch {
    return null;
  }
}

async function writeCache(payload: MarketNews): Promise<void> {
  const store = cacheStore();
  if (!store) return;
  try {
    await store.put(
      CACHE_KEY,
      new Response(JSON.stringify(payload), {
        headers: { "content-type": "application/json", "cache-control": `max-age=${CACHE_SECONDS}` },
      }),
    );
  } catch {
    // A cache write failure must never cost the visitor the section.
  }
}

/**
 * Headlines only: title, publisher, timestamp, outbound link. No article body
 * or imagery is fetched, stored, or rendered.
 *
 * Degrades in three steps and never throws: live feeds -> stale cache -> seed.
 */
export async function getMarketNews(): Promise<MarketNews> {
  const cached = await readCache();
  if (cached) {
    const age = cached.fetchedAt ? Date.now() - Date.parse(cached.fetchedAt) : Infinity;
    if (Number.isFinite(age) && age < CACHE_SECONDS * 1000) return cached;
  }

  try {
    const settled = await Promise.allSettled(
      newsSources.map((feed) => fetchFeed(feed.url, feed.source)),
    );
    const collected = settled.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
    const items = rank(collected);

    if (items.length >= 4) {
      const payload: MarketNews = { items, mode: "live", fetchedAt: new Date().toISOString() };
      await writeCache(payload);
      return payload;
    }
  } catch {
    // Fall through to whatever we already have.
  }

  if (cached) return { ...cached, mode: "stale" };
  return { items: seedItems, mode: "seed", fetchedAt: null };
}
