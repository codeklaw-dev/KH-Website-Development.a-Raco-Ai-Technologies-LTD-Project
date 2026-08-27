export const partners = [
  { id: "arrow", src: "/assets/partners/client-arrow.png", name: "Arrow Plywood" },
  { id: "khparma", src: "/assets/partners/client-kh-parma.png", name: "KH Parma" },
  { id: "doka", src: "/assets/partners/client-doka.png", name: "Doka" },
  { id: "lkh", src: "/assets/partners/client-lkh.png", name: "LKH" },
  { id: "abualtaj", src: "/assets/partners/client-abu-al-taj.png", name: "Abu Al-Taj" },
  { id: "tb5", src: "/assets/partners/client-5tb.png", name: "5TB" },
  { id: "tb", src: "/assets/partners/client-tb.png", name: "TB" },
] as const;

export type PartnerId = (typeof partners)[number]["id"];

export function getPartners(ids?: readonly PartnerId[]) {
  if (!ids?.length) return [...partners];
  const selected = new Set(ids);
  return partners.filter((partner) => selected.has(partner.id));
}
