/**
 * Public trade-press feeds used by the /partners market signals bento.
 * Every entry was reachability-checked before being added. Keep this list
 * short and curated: each one is a live network call on a cache miss.
 */
export const newsSources = [
  { id: "ibn", url: "https://www.iraq-businessnews.com/feed/", source: "Iraq Business News", tier: "iraq" },
  { id: "ibn-trade", url: "https://www.iraq-businessnews.com/category/industry-trade/feed/", source: "Iraq Business News", tier: "iraq" },
  { id: "gwm", url: "https://www.globalwoodmarketsinfo.com/feed/", source: "Global Wood Markets", tier: "timber" },
  { id: "woodcentral", url: "https://www.woodcentral.com.au/feed/", source: "Wood Central", tier: "timber" },
  { id: "timberbiz", url: "https://timberbiz.com.au/feed/", source: "Timberbiz", tier: "timber" },
  { id: "wwn", url: "https://www.woodworkingnetwork.com/rss.xml", source: "Woodworking Network", tier: "timber" },
  { id: "gmk", url: "https://www.gmk.center/en/feed/", source: "GMK Center", tier: "steel" },
  { id: "hsn", url: "https://www.hellenicshippingnews.com/feed/", source: "Hellenic Shipping News", tier: "freight" },
] as const;

export type NewsSource = (typeof newsSources)[number];

/**
 * Scoring keywords. Matched on word boundaries, never as substrings:
 * "Iraq Stock Market Report" must not score as a story about a port.
 */
export const localKeywords = ["iraq", "iraqi", "baghdad", "basra", "basrah", "erbil", "mosul", "kurdistan", "umm qasr"];
export const regionKeywords = ["middle east", "mena", "gulf", "gcc", "turkey", "turkish", "iran", "iranian", "jordan", "syria", "saudi", "uae", "kuwait", "levant"];
export const tradeKeywords = ["timber", "lumber", "sawmill", "sawnwood", "plywood", "panel", "panels", "mdf", "osb", "hardwood", "softwood", "log", "logs", "wood", "steel", "rebar", "iron", "billet", "hrc", "scrap", "construction", "cement", "housing", "import", "imports", "export", "exports", "tariff", "tariffs", "freight", "shipping", "port", "ports", "customs", "supply"];

const steelKeywords = ["steel", "rebar", "iron", "billet", "hrc", "scrap", "metallurg"];
const timberKeywords = ["timber", "lumber", "sawmill", "sawnwood", "plywood", "panel", "panels", "mdf", "osb", "hardwood", "softwood", "wood", "forest"];

/**
 * The materials this page is actually about. An item qualifies only if it
 * mentions one of these, or pairs a place we trade with a trade term.
 * Without this gate the Iraq feeds flood the bento with banking and politics.
 */
export const materialKeywords = [...steelKeywords, ...timberKeywords];

export type Category = "Iraq" | "Steel" | "Timber" | "Trade";

/** Label a headline by what it is actually about, local relevance winning. */
export function categorise(title: string, hits: { local: boolean }): Category {
  const text = title.toLowerCase();
  if (hits.local) return "Iraq";
  if (timberKeywords.some((word) => text.includes(word))) return "Timber";
  if (steelKeywords.some((word) => text.includes(word))) return "Steel";
  return "Trade";
}

export type NewsItem = {
  title: string;
  link: string;
  source: string;
  publishedAt: string | null;
  category: Category;
  /** Publisher artwork, hotlinked. Null when the article exposes none. */
  image: string | null;
};

/**
 * Last-resort content. Only rendered when every feed fails AND nothing is
 * cached, so a partner never lands on an empty or broken section. These are
 * standing facts about how KH Wood operates, not reported news, and the
 * bento labels them as such.
 */
export const seedItems: readonly NewsItem[] = [
  { title: "Iraq continues to import the majority of its construction timber and panel products", link: "/products", source: "KH Wood", publishedAt: null, category: "Iraq", image: null },
  { title: "Turkey, Iran and the Gulf remain the primary overland corridors into the Iraqi market", link: "/operations", source: "KH Wood", publishedAt: null, category: "Trade", image: null },
  { title: "Stock held inside the country is what separates a supplier from a catalogue", link: "/operations#storage", source: "KH Wood", publishedAt: null, category: "Trade", image: null },
  { title: "Panel and board demand tracks Iraqi residential and fit-out construction", link: "/products", source: "KH Wood", publishedAt: null, category: "Timber", image: null },
  { title: "Steel and timber arrive on the same projects, and rarely on the same schedule", link: "/operations", source: "KH Wood", publishedAt: null, category: "Steel", image: null },
  { title: "Import coordination, customs and storage decide whether a shipment lands on time", link: "/operations", source: "KH Wood", publishedAt: null, category: "Trade", image: null },
  { title: "Market representation in Iraq is a relationship business before it is a supply one", link: "/partners#models", source: "KH Wood", publishedAt: null, category: "Iraq", image: null },
];
