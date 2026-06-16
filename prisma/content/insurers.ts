// Coverage copy for the payer hubs. Summaries describe Pathways Within's network
// status and the benefit verification process in plain language. Out of network
// payers say so plainly. Keyed by the slug the seed generates from the name.
// Confirm exact network status with the practice before publishing claims.

export type InsurerContent = {
  slug: string;
  summary: string;
  contentApproved: boolean;
};

export const insurerContent: InsurerContent[] = [
  {
    slug: "aetna",
    summary:
      "Pathways Within is in network with Aetna. We confirm your specific Aetna benefits, including any copay or deductible, before your first visit, so there are no surprises.",
    contentApproved: true,
  },
  {
    slug: "cigna",
    summary:
      "Pathways Within is in network with Cigna. We verify your Cigna mental health benefits before you begin, so you know your costs up front.",
    contentApproved: true,
  },
  {
    slug: "optum",
    summary:
      "Pathways Within is in network with Optum. We confirm your Optum behavioral health benefits before your first session.",
    contentApproved: true,
  },
  {
    slug: "uhc",
    summary:
      "Pathways Within is in network with UnitedHealthcare. We verify your UHC benefits before you begin, so your costs are clear from the start.",
    contentApproved: true,
  },
  {
    slug: "oxford",
    summary:
      "Pathways Within is in network with Oxford. We confirm your Oxford mental health benefits before your first visit.",
    contentApproved: true,
  },
  {
    slug: "umr",
    summary:
      "Pathways Within is in network with UMR. We verify your UMR behavioral health benefits before you begin.",
    contentApproved: true,
  },
  {
    slug: "oscar",
    summary:
      "Pathways Within is in network with Oscar. We confirm your Oscar benefits before your first session.",
    contentApproved: true,
  },
  {
    slug: "1199",
    summary:
      "Pathways Within is in network with 1199SEIU. We verify your 1199 mental health benefits before you begin care.",
    contentApproved: true,
  },
  {
    slug: "meritain",
    summary:
      "Pathways Within is in network with Meritain Health. We confirm your Meritain benefits before your first visit.",
    contentApproved: true,
  },
  {
    slug: "magnacare",
    summary:
      "Pathways Within sees clients with Magnacare on an out of network basis. If your plan includes out of network benefits, we can help you understand how to use them. We confirm the details before you begin.",
    contentApproved: true,
  },
  {
    slug: "humana",
    summary:
      "Pathways Within is in network with Humana. We verify your Humana behavioral health benefits before your first session.",
    contentApproved: true,
  },
  {
    slug: "medicare",
    summary:
      "Pathways Within accepts Medicare. We confirm your Medicare coverage for therapy before you begin care.",
    contentApproved: true,
  },
  {
    slug: "nyship",
    summary:
      "Pathways Within sees clients with NYSHIP on an out of network basis. If your plan includes out of network benefits, we can walk you through how to use them.",
    contentApproved: true,
  },
  {
    slug: "student-resource",
    summary:
      "Pathways Within is in network with Student Resources, a common student health plan. We verify your benefits before your first session.",
    contentApproved: true,
  },
  {
    slug: "allied-benefit",
    summary:
      "Pathways Within is in network with Allied Benefit Systems. We confirm your benefits before you begin care.",
    contentApproved: true,
  },
  {
    slug: "compsych",
    summary:
      "Pathways Within works with ComPsych, including EAP sessions where your plan provides them. We confirm the details and any session limits before you begin.",
    contentApproved: true,
  },
  {
    slug: "va-community-care",
    summary:
      "Pathways Within accepts VA Community Care, supporting veterans referred for mental health care in the community. We confirm your authorization before your first session.",
    contentApproved: true,
  },
  {
    slug: "mvp",
    summary:
      "Pathways Within is in network with MVP Health Care. We verify your MVP behavioral health benefits before you begin.",
    contentApproved: true,
  },
  {
    slug: "northwell-brighton-health",
    summary:
      "Pathways Within is in network with Northwell Brighton Health Plan. We confirm your benefits before your first visit.",
    contentApproved: true,
  },
];
