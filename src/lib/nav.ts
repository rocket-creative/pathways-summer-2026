// The full site navigation, the single source of truth for the desktop header
// dropdowns and the mobile menu. Every static page is reachable from here.
// Programmatic leaves (condition x town, payer x town, metro x condition) are
// intentionally not listed; they are reached from their hubs.

export type NavLink = { href: string; label: string; external?: boolean };
export type NavGroup = { heading: string; links: NavLink[] };
export type NavSection = { label: string; href: string; groups: NavGroup[] };

export const navSections: NavSection[] = [
  {
    label: "Therapy",
    href: "/therapy",
    groups: [
      {
        heading: "Pathway to Wisdom",
        links: [
          { href: "/therapy", label: "Therapy overview" },
          { href: "/clinicians", label: "Provider directory" },
          { href: "/insurance", label: "Insurance" },
          { href: "/guide", label: "Guides" },
          { href: "/resources", label: "Resources" },
        ],
      },
      {
        heading: "Services",
        links: [
          { href: "/services", label: "All services" },
          { href: "/services/individual", label: "Individual therapy" },
          { href: "/services/couples", label: "Couples therapy" },
          { href: "/services/family", label: "Family therapy" },
          { href: "/services/child", label: "Child therapy" },
          { href: "/services/teen", label: "Teen therapy" },
          { href: "/services/trauma", label: "Trauma therapy" },
          {
            href: "/services/weight-loss-surgery-support",
            label: "Weight loss surgery support",
          },
          {
            href: "/services/veterans-and-first-responders",
            label: "Veterans and first responders",
          },
        ],
      },
      {
        heading: "Who we help",
        links: [
          { href: "/for/children", label: "Children" },
          { href: "/for/teens", label: "Teens" },
          { href: "/for/adults", label: "Adults" },
          { href: "/for/couples", label: "Couples" },
          { href: "/for/families", label: "Families" },
          { href: "/for/veterans", label: "Veterans" },
          { href: "/for/first-responders", label: "First responders" },
          { href: "/for/college-students", label: "College students" },
          { href: "/for/lgbtqia", label: "LGBTQIA+" },
          { href: "/for/professionals", label: "Professionals" },
        ],
      },
      {
        heading: "Online therapy",
        links: [
          { href: "/online-therapy/new-york", label: "New York" },
          { href: "/online-therapy/new-jersey", label: "New Jersey" },
          { href: "/online-therapy/north-carolina", label: "North Carolina" },
          { href: "/online-therapy/florida", label: "Florida" },
        ],
      },
    ],
  },
  {
    label: "Wellness",
    href: "/wellness",
    groups: [
      {
        heading: "Pathway to Wellness",
        links: [
          { href: "/wellness", label: "Wellness overview" },
          {
            href: "https://pathwayswithinwellness.com",
            label: "Wellness site",
            external: true,
          },
        ],
      },
      {
        heading: "Bodywork",
        links: [
          { href: "/wellness/massage", label: "Massage" },
          { href: "/wellness/acupuncture", label: "Acupuncture" },
        ],
      },
      {
        heading: "Energy work",
        links: [
          { href: "/wellness/energy-work", label: "Energy work" },
          { href: "/wellness/reiki", label: "Reiki" },
          {
            href: "/wellness/integrative-energy-therapy",
            label: "Integrative energy therapy",
          },
        ],
      },
      {
        heading: "Treatments",
        links: [
          { href: "/wellness/iv-vitamin-infusion", label: "IV vitamin infusion" },
          { href: "/wellness/cryotherapy", label: "Cryotherapy" },
          { href: "/wellness/body-sculpting", label: "Body sculpting" },
          { href: "/wellness/face-treatments", label: "Skincare" },
          { href: "/wellness/body-treatments", label: "Body treatments" },
          { href: "/wellness/hair", label: "Hair restoration and removal" },
          { href: "/wellness/bundles", label: "Bundles" },
        ],
      },
    ],
  },
  {
    label: "Locations",
    href: "/locations",
    groups: [
      {
        heading: "Offices",
        links: [
          { href: "/locations", label: "All locations" },
          { href: "/clinicians", label: "Provider directory" },
          { href: "/locations/smithtown", label: "Smithtown" },
          { href: "/locations/garden-city", label: "Garden City" },
          { href: "/locations/massapequa", label: "Massapequa" },
          { href: "/locations/port-jefferson", label: "Port Jefferson" },
          { href: "/locations/rockville-centre", label: "Rockville Centre" },
        ],
      },
    ],
  },
  {
    label: "Practice",
    href: "/about",
    groups: [
      {
        heading: "About",
        links: [
          { href: "/about", label: "About us" },
          { href: "/faq", label: "FAQ" },
          { href: "/payment-plans", label: "Payment options" },
          { href: "/careers", label: "Careers" },
          { href: "/contact", label: "Contact" },
        ],
      },
    ],
  },
];
