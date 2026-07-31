export type OrderField = { label: string; type: "select" | "text"; options?: string[]; placeholder?: string };

export type ProductRange = {
  slug: string;
  n: string;
  title: string;
  shortTitle: string;
  tag: string;
  copy: string;
  eyebrow: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  secondaryImage: string;
  secondaryAlt: string;
  applications: string[];
  options: { title: string; copy: string }[];
  orderFields: OrderField[];
  principle: string;
  process: { title: string; copy: string }[];
  ctaLabel: string;
  theme: "material" | "technical" | "project" | "scale" | "market";
};

export const productRanges: ProductRange[] = [
  {
    slug: "wood-timber",
    n: "01",
    title: "Wood & timber",
    shortTitle: "Timber",
    tag: "Core range",
    copy: "Hardwood and softwood for construction, manufacturing, fit-out, and commercial use.",
    eyebrow: "Material-led supply",
    headline: "Start with the job. We’ll match the timber.",
    intro: "Tell us how the material will be worked, loaded, finished, and used. KH Wood can then align species, grade, section, volume, and supply route around the real requirement.",
    image: "/assets/timber-range.jpg",
    imageAlt: "A commercial range of timber boards and sections",
    secondaryImage: "/assets/hardwood.jpg",
    secondaryAlt: "Hardwood bundles prepared for supply",
    applications: ["Construction and carpentry", "Furniture and manufacturing", "Interior fit-out", "Industrial and recurring supply"],
    options: [
      { title: "Hardwood", copy: "For applications where character, durability, finish, or specific performance matters." },
      { title: "Softwood", copy: "Practical material routes for construction, framing, joinery, packaging, and general commercial use." },
      { title: "Sawn sections", copy: "Dimensions, grading, moisture expectations, and finish discussed around the application." },
    ],
    orderFields: [
      { label: "Application or end use", type: "select", options: ["Construction & carpentry", "Furniture & manufacturing", "Interior fit-out", "Industrial / recurring supply", "Other (specify in notes)"] },
      { label: "Wood type", type: "select", options: ["Hardwood", "Softwood", "Sawn sections", "No preference — advise me"] },
      { label: "Grade", type: "select", options: ["Select / premium grade", "Standard / commercial grade", "Utility / economy grade", "Not sure yet"] },
      { label: "Dimensions & finish", type: "text", placeholder: "e.g. 50×100mm, planed, kiln-dried" },
      { label: "Volume needed", type: "select", options: ["Trial order (under 5m³)", "5–20m³", "20–100m³", "100m³+ / recurring"] },
      { label: "Delivery timing", type: "select", options: ["Within 2 weeks", "2–4 weeks", "1–2 months", "Ongoing / recurring supply"] },
    ],
    principle: "The most useful timber enquiry starts with performance—not a generic price list.",
    process: [
      { title: "Define", copy: "We clarify use, specification, quantity, and destination." },
      { title: "Align", copy: "The team assesses stock, sourcing options, and practical alternatives." },
      { title: "Supply", copy: "Availability, commercial terms, staging, and delivery are confirmed." },
    ],
    ctaLabel: "Request timber supply",
    theme: "material",
  },
  {
    slug: "panels-boards",
    n: "02",
    title: "Panels & boards",
    shortTitle: "Panels",
    tag: "Specified supply",
    copy: "Plywood, engineered panels, and board products aligned to thickness, grade, finish, and volume.",
    eyebrow: "Specification-led range",
    headline: "Thickness. Face. Core. Every detail has a job.",
    intro: "Panels are not interchangeable. KH Wood helps commercial buyers define the construction, finish, dimensions, and performance needed before the supply route is confirmed.",
    image: "/assets/plywood-close.jpg",
    imageAlt: "Close view of stacked plywood panels",
    secondaryImage: "/assets/timber-range.jpg",
    secondaryAlt: "Panels and timber presented in a warehouse",
    applications: ["Formwork and construction", "Furniture production", "Cabinetry and joinery", "Fit-out and interior works"],
    options: [
      { title: "Plywood", copy: "Panel construction, thickness, face quality, bonding, and intended use reviewed together." },
      { title: "Engineered panels", copy: "Board formats considered around machining, finishing, consistency, and project needs." },
      { title: "Commercial boards", copy: "Volume supply shaped around repeat production, fit-out schedules, or site demand." },
    ],
    orderFields: [
      { label: "Panel type", type: "select", options: ["Plywood", "MDF / engineered board", "OSB", "Commercial board", "Not sure — advise me"] },
      { label: "Intended use", type: "select", options: ["Formwork & construction", "Furniture production", "Cabinetry & joinery", "Fit-out & interior works"] },
      { label: "Thickness", type: "select", options: ["6mm", "9mm", "12mm", "18mm", "25mm", "Other / mixed thicknesses"] },
      { label: "Face, grade, or finish", type: "text", placeholder: "e.g. birch face, melamine, raw, A/B grade" },
      { label: "Standards or documentation required", type: "select", options: ["None specified", "CE marked", "FSC certified", "Specific standard — see notes"] },
      { label: "Quantity & destination", type: "text", placeholder: "e.g. 200 sheets to Baghdad site" },
    ],
    principle: "A clear panel specification protects finish, programme, and cost before the order moves.",
    process: [
      { title: "Specify", copy: "Share the build-up, dimensions, finish, and performance expectation." },
      { title: "Validate", copy: "We align the requirement with available or sourced product options." },
      { title: "Coordinate", copy: "Volume, timing, handling, and destination shape the final supply plan." },
    ],
    ctaLabel: "Send a panel specification",
    theme: "technical",
  },
  {
    slug: "project-materials",
    n: "03",
    title: "Project materials",
    shortTitle: "Projects",
    tag: "Programme ready",
    copy: "Construction-related wood products sourced around programme, application, and delivery needs.",
    eyebrow: "Construction supply",
    headline: "Materials aligned to the programme—not added after it.",
    intro: "For project teams, product choice is only one part of the requirement. KH Wood brings specification, volume, phasing, site access, and timing into the same commercial conversation.",
    image: "/assets/structural-timber.jpg",
    imageAlt: "Timber framing prepared inside a construction facility",
    secondaryImage: "/assets/formwork.jpg",
    secondaryAlt: "Construction timber and formwork materials",
    applications: ["Residential developments", "Commercial construction", "Civil and infrastructure works", "Temporary works and site use"],
    options: [
      { title: "Structural use", copy: "Timber and related material requirements assessed against use, section, and project documentation." },
      { title: "Formwork support", copy: "Panel and timber supply coordinated around concrete programmes and practical site demand." },
      { title: "Phased supply", copy: "Staging and dispatch considered against work packages, call-offs, and destination." },
    ],
    orderFields: [
      { label: "Project type", type: "select", options: ["Residential development", "Commercial construction", "Civil / infrastructure works", "Temporary works / site use"] },
      { label: "Material need", type: "select", options: ["Structural timber", "Formwork panels", "Mixed / general supply", "Not sure — advise me"] },
      { label: "Project phase", type: "select", options: ["Planning / early stage", "Phase 1 underway", "Mid-project top-up", "Final phase / snagging"] },
      { label: "Drawings or bill of quantities available", type: "select", options: ["Yes, can share on request", "Partial documentation", "Not yet prepared"] },
      { label: "Site location & access", type: "text", placeholder: "e.g. Basra industrial zone, truck access" },
      { label: "Delivery window", type: "text", placeholder: "e.g. Starting next month, phased over 6 weeks" },
    ],
    principle: "Project supply performs best when material decisions and delivery realities are resolved together.",
    process: [
      { title: "Review", copy: "The team reads the requirement in the context of the programme." },
      { title: "Plan", copy: "Products, quantities, phases, and delivery assumptions are aligned." },
      { title: "Execute", copy: "Stock, staging, and dispatch are coordinated around confirmed needs." },
    ],
    ctaLabel: "Discuss a project requirement",
    theme: "project",
  },
  {
    slug: "bulk-requirements",
    n: "04",
    title: "Bulk requirements",
    shortTitle: "Bulk supply",
    tag: "High volume",
    copy: "Large-volume procurement with storage, staging, call-off, and dispatch coordination.",
    eyebrow: "Volume with control",
    headline: "Scale the order without losing visibility.",
    intro: "Large-volume supply needs more than product availability. It needs a clear commercial brief, practical stock position, handling capacity, and an agreed dispatch rhythm.",
    image: "/assets/yard-stock.jpg",
    imageAlt: "Large-volume wood stock held at the KH Wood yard",
    secondaryImage: "/assets/yard-loading.jpg",
    secondaryAlt: "Forklift staging a bulk wood requirement",
    applications: ["Wholesale and repeat purchasing", "Multi-phase construction", "Manufacturing programmes", "National and regional distribution"],
    options: [
      { title: "Stock position", copy: "Supply can be considered against current availability, sourcing lead time, and continuity needs." },
      { title: "Staged call-off", copy: "Volume may be prepared around agreed phases rather than treated as one undifferentiated movement." },
      { title: "Dispatch planning", copy: "Destination, vehicle access, load configuration, and timing become part of the order brief." },
    ],
    orderFields: [
      { label: "Product category", type: "select", options: ["Timber", "Panels & boards", "Mixed / multiple products"] },
      { label: "Total volume", type: "text", placeholder: "e.g. 200m³ or 500 sheets" },
      { label: "Call-off pattern", type: "select", options: ["Single delivery", "Weekly call-off", "Monthly call-off", "Custom schedule — see notes"] },
      { label: "Storage support needed", type: "select", options: ["We hold our own stock", "We need staged storage support", "Not sure yet"] },
      { label: "Decision timeline", type: "select", options: ["This week", "This month", "Next quarter", "Just exploring options"] },
    ],
    principle: "Volume becomes dependable when stock, timing, and responsibility stay visible.",
    process: [
      { title: "Forecast", copy: "We establish total need, timing, and expected consumption." },
      { title: "Position", copy: "Stock and sourcing are assessed against continuity and space." },
      { title: "Release", copy: "Confirmed loads move against the agreed call-off and destination." },
    ],
    ctaLabel: "Plan a bulk requirement",
    theme: "scale",
  },
  {
    slug: "agency-representation",
    n: "05",
    title: "Agency representation",
    shortTitle: "Representation",
    tag: "Market access",
    copy: "Distribution and representation pathways for international wood and construction-material brands.",
    eyebrow: "For international manufacturers",
    headline: "A product range needs a credible route into Iraq.",
    intro: "KH Wood connects international manufacturers with local commercial understanding, relationships, stock infrastructure, and the operating detail required to develop a market responsibly.",
    image: "/assets/iraq-market.jpg",
    imageAlt: "Aerial view across an Iraqi city and commercial district",
    secondaryImage: "/assets/logistics-truck.jpg",
    secondaryAlt: "KH Wood logistics supporting local market distribution",
    applications: ["Exclusive agency discussions", "Distribution partnerships", "Franchise opportunities", "New-category market development"],
    options: [
      { title: "Market evaluation", copy: "Product relevance, customer profile, documentation, pricing position, and opportunity are reviewed." },
      { title: "Local representation", copy: "A practical role is defined across introductions, commercial development, feedback, and accountability." },
      { title: "Operating route", copy: "Import, stock, availability, and distribution planning turn interest into a workable market presence." },
    ],
    orderFields: [
      { label: "Partnership model", type: "select", options: ["Exclusive agency", "Distribution partnership", "Franchise", "Not sure — open to discussion"] },
      { label: "Product category", type: "select", options: ["Timber / wood", "Panels & boards", "Construction materials", "Other (specify in notes)"] },
      { label: "Current export markets", type: "text", placeholder: "e.g. GCC, Turkey, Europe" },
      { label: "Certifications available", type: "select", options: ["Yes, can provide on request", "Some, partial documentation", "Not yet / in progress"] },
      { label: "Target timeline", type: "select", options: ["Ready to move now", "Within 6 months", "Exploratory / long-term"] },
    ],
    principle: "The strongest market-entry conversations begin with evidence, clarity, and long-term intent.",
    process: [
      { title: "Evaluate", copy: "We assess product relevance and the commercial case for Iraq." },
      { title: "Structure", copy: "Territory, responsibilities, operating model, and expectations are defined." },
      { title: "Develop", copy: "Market access, stock readiness, feedback, and growth are managed locally." },
    ],
    ctaLabel: "Discuss representation",
    theme: "market",
  },
];

export function getProductRange(slug: string) {
  return productRanges.find((product) => product.slug === slug);
}
