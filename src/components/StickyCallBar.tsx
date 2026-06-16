import { CallLink } from "@/components/CallLink";
import { site } from "@/lib/site";

// Mobile only sticky call bar. Body has matching bottom padding so it never
// covers the footer.
export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-background/95 backdrop-blur md:hidden">
      <CallLink
        source="sticky_bar"
        className="block w-full px-md py-md text-center text-sm uppercase tracking-[0.08em]"
      >
        Call {site.phoneDisplay}
      </CallLink>
    </div>
  );
}
