import type { PartnerId } from "../data/partnerData";

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
  partnerIds: PartnerId[];
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
    intro: "Tell us how the material will be worked, finished, and used. We align species, grade, section, volume, and supply route around the real requirement.",
    image: "/assets/timber-range.jpg",
    imageAlt: "A commercial range of timber boards and sections",
    secondaryImage: "/assets/hardwood.jpg",
    secondaryAlt: "Hardwood bundles prepared for supply",
    applications: ["Construction and carpentry", "Furniture and manufacturing", "Interior fit-out", "Industrial and recurring supply"],
    options: [
      { title: "Hardwood", copy: "Where character, durability, finish, or specific performance matters." },
      { title: "Softwood", copy: "For construction, framing, joinery, packaging, and general commercial use." },
      { title: "Sawn sections", copy: "Dimensions, grading, moisture, and finish set around the application." },
    ],
    orderFields: [
      { label: "Application or end use", type: "select", options: ["Construction & carpentry", "Furniture & manufacturing", "Interior fit-out", "Industrial / recurring supply", "Other (specify in notes)"] },
      { label: "Wood type", type: "select", options: ["Hardwood", "Softwood", "Sawn sections", "No preference, advise me"] },
      { label: "Grade", type: "select", options: ["Select / premium grade", "Standard / commercial grade", "Utility / economy grade", "Not sure yet"] },
      { label: "Dimensions & finish", type: "text", placeholder: "e.g. 50×100mm, planed, kiln-dried" },
      { label: "Volume needed", type: "select", options: ["Trial order (under 5m³)", "5–20m³", "20–100m³", "100m³+ / recurring"] },
      { label: "Delivery timing", type: "select", options: ["Within 2 weeks", "2–4 weeks", "1–2 months", "Ongoing / recurring supply"] },
    ],
    principle: "The most useful timber enquiry starts with performance, not a generic price list.",
    process: [
      { title: "Define", copy: "Use, specification, quantity, and destination clarified." },
      { title: "Align", copy: "Stock, sourcing options, and practical alternatives assessed." },
      { title: "Supply", copy: "Availability, terms, staging, and delivery confirmed." },
    ],
    ctaLabel: "Request timber supply",
    theme: "material",
    partnerIds: ["sawmill25", "spf", "fsc", "pefc"],
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
    intro: "Panels are not interchangeable. We help buyers define construction, finish, dimensions, and performance before the supply route is confirmed.",
    image: "/assets/plywood-close.jpg",
    imageAlt: "Close view of stacked plywood panels",
    secondaryImage: "/assets/timber-range.jpg",
    secondaryAlt: "Panels and timber presented in a warehouse",
    applications: ["Formwork and construction", "Furniture production", "Cabinetry and joinery", "Fit-out and interior works"],
    options: [
      { title: "Plywood", copy: "Construction, thickness, face quality, bonding, and use reviewed together." },
      { title: "Engineered panels", copy: "Formats matched to machining, finishing, and consistency needs." },
      { title: "Commercial boards", copy: "Volume supply shaped around production, fit-out schedules, or site demand." },
    ],
    orderFields: [
      { label: "Panel type", type: "select", options: ["Plywood", "MDF / engineered board", "OSB", "Commercial board", "Not sure, advise me"] },
      { label: "Intended use", type: "select", options: ["Formwork & construction", "Furniture production", "Cabinetry & joinery", "Fit-out & interior works"] },
      { label: "Thickness", type: "select", options: ["6mm", "9mm", "12mm", "18mm", "25mm", "Other / mixed thicknesses"] },
      { label: "Face, grade, or finish", type: "text", placeholder: "e.g. birch face, melamine, raw, A/B grade" },
      { label: "Standards or documentation required", type: "select", options: ["None specified", "CE marked", "FSC certified", "Specific standard, see notes"] },
      { label: "Quantity & destination", type: "text", placeholder: "e.g. 200 sheets to Baghdad site" },
    ],
    principle: "A clear panel specification protects finish, programme, and cost before the order moves.",
    process: [
      { title: "Specify", copy: "Build-up, dimensions, finish, and performance expectation shared." },
      { title: "Validate", copy: "Requirement matched to available or sourced product options." },
      { title: "Coordinate", copy: "Volume, timing, handling, and destination shape the supply plan." },
    ],
    ctaLabel: "Send a panel specification",
    theme: "technical",
    partnerIds: ["agt", "kastamonu", "fsc", "pefc"],
  },
  {
    slug: "project-materials",
    n: "03",
    title: "Project materials",
    shortTitle: "Projects",
    tag: "Programme ready",
    copy: "Construction-related wood products sourced around programme, application, and delivery needs.",
    eyebrow: "Construction supply",
    headline: "Materials aligned to the programme, not added after it.",
    intro: "Product choice is only part of the requirement. We bring specification, volume, phasing, site access, and timing into one conversation.",
    image: "/assets/structural-timber.jpg",
    imageAlt: "Timber framing prepared inside a construction facility",
    secondaryImage: "/assets/formwork.jpg",
    secondaryAlt: "Construction timber and formwork materials",
    applications: ["Residential developments", "Commercial construction", "Civil and infrastructure works", "Temporary works and site use"],
    options: [
      { title: "Structural use", copy: "Requirements assessed against use, section, and project documentation." },
      { title: "Formwork support", copy: "Panel and timber supply coordinated around concrete programmes." },
      { title: "Phased supply", copy: "Staging and dispatch set against work packages, call-offs, and destination." },
    ],
    orderFields: [
      { label: "Project type", type: "select", options: ["Residential development", "Commercial construction", "Civil / infrastructure works", "Temporary works / site use"] },
      { label: "Material need", type: "select", options: ["Structural timber", "Formwork panels", "Mixed / general supply", "Not sure, advise me"] },
      { label: "Project phase", type: "select", options: ["Planning / early stage", "Phase 1 underway", "Mid-project top-up", "Final phase / snagging"] },
      { label: "Drawings or bill of quantities available", type: "select", options: ["Yes, can share on request", "Partial documentation", "Not yet prepared"] },
      { label: "Site location & access", type: "text", placeholder: "e.g. Basra industrial zone, truck access" },
      { label: "Delivery window", type: "text", placeholder: "e.g. Starting next month, phased over 6 weeks" },
    ],
    principle: "Project supply performs best when material decisions and delivery are resolved together.",
    process: [
      { title: "Review", copy: "The requirement read in the context of the programme." },
      { title: "Plan", copy: "Products, quantities, phases, and delivery assumptions aligned." },
      { title: "Execute", copy: "Stock, staging, and dispatch coordinated around confirmed needs." },
    ],
    ctaLabel: "Discuss a project requirement",
    theme: "project",
    partnerIds: ["agt", "kastamonu", "sawmill25", "spf", "fsc"],
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
    intro: "Large-volume supply needs more than availability. It needs a clear brief, a real stock position, handling capacity, and an agreed dispatch rhythm.",
    image: "/assets/yard-stock.jpg",
    imageAlt: "Large-volume wood stock held at the KH Wood yard",
    secondaryImage: "/assets/yard-loading.jpg",
    secondaryAlt: "Forklift staging a bulk wood requirement",
    applications: ["Wholesale and repeat purchasing", "Multi-phase construction", "Manufacturing programmes", "National and regional distribution"],
    options: [
      { title: "Stock position", copy: "Supply weighed against current availability, lead time, and continuity." },
      { title: "Staged call-off", copy: "Volume prepared around agreed phases, not one undifferentiated movement." },
      { title: "Dispatch planning", copy: "Destination, access, load configuration, and timing form part of the brief." },
    ],
    orderFields: [
      { label: "Product category", type: "select", options: ["Timber", "Panels & boards", "Mixed / multiple products"] },
      { label: "Total volume", type: "text", placeholder: "e.g. 200m³ or 500 sheets" },
      { label: "Call-off pattern", type: "select", options: ["Single delivery", "Weekly call-off", "Monthly call-off", "Custom schedule, see notes"] },
      { label: "Storage support needed", type: "select", options: ["We hold our own stock", "We need staged storage support", "Not sure yet"] },
      { label: "Decision timeline", type: "select", options: ["This week", "This month", "Next quarter", "Just exploring options"] },
    ],
    principle: "Volume becomes dependable when stock, timing, and responsibility stay visible.",
    process: [
      { title: "Forecast", copy: "Total need, timing, and expected consumption established." },
      { title: "Position", copy: "Stock and sourcing assessed against continuity and space." },
      { title: "Release", copy: "Confirmed loads move against the agreed call-off and destination." },
    ],
    ctaLabel: "Plan a bulk requirement",
    theme: "scale",
    partnerIds: ["kastamonu", "sawmill25", "spf", "agt", "pefc"],
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
    intro: "We connect international manufacturers with local commercial understanding, relationships, stock infrastructure, and the operating detail a market needs.",
    image: "/assets/iraq-market.jpg",
    imageAlt: "Aerial view across an Iraqi city and commercial district",
    secondaryImage: "/assets/logistics-truck.jpg",
    secondaryAlt: "KH Wood logistics supporting local market distribution",
    applications: ["Exclusive agency discussions", "Distribution partnerships", "Franchise opportunities", "New-category market development"],
    options: [
      { title: "Market evaluation", copy: "Product relevance, customer profile, documentation, and pricing reviewed." },
      { title: "Local representation", copy: "A defined role across introductions, development, feedback, and accountability." },
      { title: "Operating route", copy: "Import, stock, and distribution turn interest into a working market presence." },
    ],
    orderFields: [
      { label: "Partnership model", type: "select", options: ["Exclusive agency", "Distribution partnership", "Franchise", "Not sure, open to discussion"] },
      { label: "Product category", type: "select", options: ["Timber / wood", "Panels & boards", "Construction materials", "Other (specify in notes)"] },
      { label: "Current export markets", type: "text", placeholder: "e.g. GCC, Turkey, Europe" },
      { label: "Certifications available", type: "select", options: ["Yes, can provide on request", "Some, partial documentation", "Not yet / in progress"] },
      { label: "Target timeline", type: "select", options: ["Ready to move now", "Within 6 months", "Exploratory / long-term"] },
    ],
    principle: "The strongest market-entry conversations begin with evidence, clarity, and long-term intent.",
    process: [
      { title: "Evaluate", copy: "Product relevance and the commercial case for Iraq assessed." },
      { title: "Structure", copy: "Territory, responsibilities, operating model, and expectations defined." },
      { title: "Develop", copy: "Market access, stock readiness, feedback, and growth managed locally." },
    ],
    ctaLabel: "Discuss representation",
    theme: "market",
    partnerIds: ["agt", "kastamonu", "sawmill25", "spf", "fsc", "pefc"],
  },
];

export function getProductRange(slug: string) {
  return productRanges.find((product) => product.slug === slug);
}
