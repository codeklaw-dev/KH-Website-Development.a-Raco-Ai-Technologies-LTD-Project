import { getPartners, type PartnerId } from "../data/partnerData";

export function PartnerLogoRail({ borderless = false, partnerIds }: { borderless?: boolean; partnerIds?: readonly PartnerId[] }) {
  const partnerLogos = getPartners(partnerIds);

  return (
    <div className={`opportunity-logo-rail${borderless ? " home-partner-rail" : ""}`} tabIndex={0} aria-label="KH Wood client and partner logos. Animation pauses while focused or hovered.">
      <div className="opportunity-logo-track">
        {[0, 1].map((group) => (
          <div className="opportunity-logo-group" key={group} aria-hidden={group === 1 ? "true" : undefined}>
            {partnerLogos.map((logo) => (
              <figure className="opportunity-logo-card" key={`${group}-${logo.id}`}>
                <img src={logo.src} alt={group === 0 ? logo.name : ""} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
