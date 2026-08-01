export const partners = [
  { id: "fsc", src: "/assets/partners/partner-fsc.svg", name: "Forest Stewardship Council", kind: "Certification" },
  { id: "agt", src: "/assets/partners/partner-agt.svg", name: "AGT", kind: "Manufacturing partner" },
  { id: "pefc", src: "/assets/partners/partner-pefc.svg", name: "PEFC", kind: "Certification" },
  { id: "kastamonu", src: "/assets/partners/partner-kastamonu.svg", name: "Kastamonu", kind: "Panel partner" },
  { id: "sawmill25", src: "/assets/partners/partner-sawmill25.svg", name: "Sawmill 25", kind: "Timber partner" },
  { id: "spf", src: "/assets/partners/partner-spf.svg", name: "SPF Precut Lumber", kind: "Timber partner" },
] as const;

export type PartnerId = (typeof partners)[number]["id"];

export function getPartners(ids?: readonly PartnerId[]) {
  if (!ids?.length) return [...partners];
  const selected = new Set(ids);
  return partners.filter((partner) => selected.has(partner.id));
}
