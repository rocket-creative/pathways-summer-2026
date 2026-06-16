import { AnchorButton, buttonClass } from "@/components/ui/Button";
import { CallLink } from "@/components/CallLink";
import { Arrow } from "@/components/ui/Arrow";
import { RevealBlock } from "@/components/ui/RevealBlock";
import { site } from "@/lib/site";

// Shared conversion block. The "verify your benefits" button routes to the
// practice's existing HIPAA-compliant intake (prefilled with payer and
// location when known); no PHI is collected in this app. Falls back to a
// tracked phone call when no intake URL is configured.
export function EntityCta({
  payer,
  town,
}: {
  payer?: string;
  town?: string;
}) {
  const params = new URLSearchParams();
  if (payer) params.set("insurance", payer);
  if (town) params.set("location", town);
  const query = params.toString();
  const hasIntake = Boolean(site.intakeUrl);
  const benefitsHref = hasIntake
    ? `${site.intakeUrl}${query ? `?${query}` : ""}`
    : `tel:${site.phoneTel}`;

  return (
    <section
      aria-labelledby="cta-heading"
      className="mt-section border-t border-rule pt-lg"
    >
      <RevealBlock>
        <h2 id="cta-heading" className="max-w-[16ch] text-h2 font-medium">
          Start with a benefits check
        </h2>
        <p className="mt-md max-w-xl text-text-secondary">
          Verifying your benefits is the simplest first step. We confirm your
          coverage and book an intake, with no surprises before your first
          visit.
        </p>
        <div className="mt-lg flex flex-wrap items-center gap-md">
          <AnchorButton
            href={benefitsHref}
            variant="solid"
            arrow
            {...(hasIntake
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Verify your benefits
          </AnchorButton>
          <CallLink source="entity_cta" className={buttonClass("ghost")}>
            <span className="inline-flex items-center gap-sm">
              Call {site.phoneDisplay} <Arrow />
            </span>
          </CallLink>
        </div>
      </RevealBlock>
    </section>
  );
}
