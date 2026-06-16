// Frequently asked questions. Answers state only confirmed facts: accepted
// insurers, telehealth states, offices, parking, payment, and how to begin.
// Sourced from the live FAQ page and cleaned to the copy rules. Nothing is
// invented. Used by the FAQ page and its FAQPage schema.

export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "Do you accept insurance?",
    answer:
      "Yes. We are in network with most major New York insurers, including Aetna, Cigna, Optum, UnitedHealthcare, Oxford, UMR, Oscar, 1199, Meritain, Humana, Medicare, MVP, ComPsych, and more. We confirm your specific benefits before your first visit, so there are no surprises.",
  },
  {
    question: "What if I do not have insurance or my plan does not cover therapy?",
    answer:
      "If you are paying on your own, or your plan does not cover treatment, we may be able to offer a sliding scale. Reach out to our admissions coordinator and we will walk you through the options.",
  },
  {
    question: "What forms of payment do you accept?",
    answer:
      "For your convenience, we accept cash, major credit cards, and HSA or FSA funds, alongside insurance.",
  },
  {
    question: "Do you offer online therapy?",
    answer:
      "Yes. We offer secure video appointments for residents of New York, New Jersey, North Carolina, and Florida, on a private, encrypted platform.",
  },
  {
    question: "Where are your offices?",
    answer:
      "We have five Long Island offices: Smithtown, Garden City, Massapequa, Port Jefferson, and Rockville Centre.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes. Each of our offices has dedicated parking on site, to keep things easy before and after your appointment.",
  },
  {
    question: "How do I get started?",
    answer:
      "Call us and we will confirm your benefits and book an intake. You can also reach us by email to begin. We will match you with a clinician who fits your goals.",
  },
  {
    question: "What is the 360 degree approach?",
    answer:
      "Pathways Within cares for the whole person. Our therapy practice works alongside our sister wellness practice, so you can support your mind and your body in one place.",
  },
];
