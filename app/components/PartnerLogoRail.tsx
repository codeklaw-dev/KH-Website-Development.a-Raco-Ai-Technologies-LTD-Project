const partnerLogos = [
  { src: "/assets/partners/partner-fsc.svg", name: "Forest Stewardship Council" },
  { src: "/assets/partners/partner-agt.svg", name: "AGT" },
  { src: "/assets/partners/partner-pefc.svg", name: "PEFC" },
  { src: "/assets/partners/partner-kastamonu.svg", name: "Kastamonu" },
  { src: "/assets/partners/partner-sawmill25.svg", name: "Sawmill 25" },
  { src: "/assets/partners/partner-spf.svg", name: "SPF Precut Lumber" },
];

export function PartnerLogoRail({ borderless = false }: { borderless?: boolean }) {
  return (
    <div className={`opportunity-logo-rail${borderless ? " home-partner-rail" : ""}`} tabIndex={0} aria-label="KH Wood partner and certification logos. Animation pauses while focused or hovered.">
      <div className="opportunity-logo-track">
        {[0, 1].map((group) => (
          <div className="opportunity-logo-group" key={group} aria-hidden={group === 1 ? "true" : undefined}>
            {partnerLogos.map((logo) => (
              <figure className="opportunity-logo-card" key={`${group}-${logo.name}`}>
                <img src={logo.src} alt={group === 0 ? logo.name : ""} loading="lazy" decoding="async" />
                <figcaption>{logo.name}</figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
