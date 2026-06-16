import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { clinicians } from "./content/clinicians";
import { conditionContent } from "./content/conditions";
import { modalityContent } from "./content/modalities";
import { populationContent } from "./content/populations";
import { townContent } from "./content/towns";
import { insurerContent } from "./content/insurers";
import { stateContent } from "./content/telehealth";
import { guideContent } from "./content/guides";
import { wellnessServiceContent } from "./content/wellness";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Five Long Island therapy offices. NAP values are taken from the live site.
// Where the source site disagreed with itself, napVerified is false and the
// conflict is recorded in napNote for client confirmation. Nothing is invented.
const offices = [
  {
    slug: "smithtown",
    townName: "Smithtown",
    displayName: "Smithtown Therapy Office",
    addressLine: "496 Smithtown Bypass",
    suite: "Suite 203",
    city: "Smithtown",
    state: "NY",
    zip: "11787",
    sortOrder: 1,
    napVerified: true,
    napNote: null,
    county: "Suffolk",
  },
  {
    slug: "garden-city",
    townName: "Garden City",
    displayName: "Garden City Therapy Office",
    addressLine: "520 Franklin Ave",
    suite: "Suite L1",
    city: "Garden City",
    state: "NY",
    zip: "11520",
    sortOrder: 2,
    napVerified: false,
    napNote:
      "Needs client confirmation: seeded to match the live therapy site (520 Franklin Ave, Suite L1, 11520), but 11520 is geographically Hempstead's ZIP, not Garden City (11530). The sister wellness site lists a different address entirely (647 Franklin Ave, Lower Level, 11530).",
    county: "Nassau",
  },
  {
    slug: "massapequa",
    townName: "Massapequa",
    displayName: "Massapequa Therapy Office",
    addressLine: "4160 Merrick Rd",
    suite: "Suite 5 and Suite 7",
    city: "Massapequa",
    state: "NY",
    zip: "11758",
    sortOrder: 3,
    napVerified: true,
    napNote: null,
    county: "Nassau",
  },
  {
    slug: "port-jefferson",
    townName: "Port Jefferson",
    displayName: "Port Jefferson Therapy Office",
    addressLine: "1227 Main Street",
    suite: "Suite 101",
    city: "Port Jefferson",
    state: "NY",
    zip: "11777",
    sortOrder: 4,
    napVerified: true,
    napNote: null,
    county: "Suffolk",
  },
  {
    slug: "rockville-centre",
    townName: "Rockville Centre",
    displayName: "Rockville Centre Therapy Office",
    addressLine: "53 N Park Ave",
    suite: "Suite 203",
    city: "Rockville Centre",
    state: "NY",
    zip: "11570",
    sortOrder: 5,
    napVerified: true,
    napNote: null,
    county: "Nassau",
  },
];

// Accepted payers, from the FAQ page. outOfNetwork marks those flagged with an
// asterisk on the source site.
const insurers = [
  { name: "Aetna", outOfNetwork: false },
  { name: "Cigna", outOfNetwork: false },
  { name: "Optum", outOfNetwork: false },
  { name: "UHC", outOfNetwork: false },
  { name: "Oxford", outOfNetwork: false },
  { name: "UMR", outOfNetwork: false },
  { name: "Oscar", outOfNetwork: false },
  { name: "1199", outOfNetwork: false },
  { name: "Meritain", outOfNetwork: false },
  { name: "Magnacare", outOfNetwork: true },
  { name: "Humana", outOfNetwork: false },
  { name: "Medicare", outOfNetwork: false },
  { name: "NYSHIP", outOfNetwork: true },
  { name: "Student Resource", outOfNetwork: false },
  { name: "Allied Benefit", outOfNetwork: false },
  { name: "ComPsych", outOfNetwork: false },
  { name: "VA Community Care", outOfNetwork: false },
  { name: "MVP", outOfNetwork: false },
  { name: "Northwell Brighton Health", outOfNetwork: false },
];

// Taxonomy labels. Clinical content is layered on from the content modules.
const conditions: [string, string][] = [
  ["anxiety", "Anxiety"],
  ["depression", "Depression"],
  ["ptsd", "PTSD"],
  ["complex-ptsd", "Complex PTSD"],
  ["adhd", "ADHD"],
  ["bipolar-disorder", "Bipolar disorder"],
  ["bpd", "Borderline personality disorder"],
  ["ocd", "OCD"],
  ["trauma", "Trauma"],
  ["grief", "Grief"],
  ["substance-use", "Substance use"],
  ["eating-disorders", "Eating disorders"],
  ["panic-and-phobias", "Panic and phobias"],
  ["insomnia", "Insomnia"],
  ["self-harm", "Self harm"],
  ["domestic-violence-recovery", "Domestic violence recovery"],
  ["life-transitions", "Life transitions"],
];

const modalities: [string, string][] = [
  ["emdr", "EMDR"],
  ["cbt", "CBT"],
  ["dbt", "DBT"],
  ["ifs", "Internal Family Systems"],
  ["somatic-therapy", "Somatic therapy"],
  ["hypnotherapy", "Hypnotherapy"],
  ["gottman-couples", "Gottman couples therapy"],
  ["play-therapy", "Play therapy"],
  ["talk-therapy", "Talk therapy"],
  ["light-therapy", "Light therapy"],
  ["cognitive-processing", "Cognitive processing therapy"],
];

const populations: [string, string][] = [
  ["children", "Children"],
  ["teens", "Teens"],
  ["adults", "Adults"],
  ["couples", "Couples"],
  ["families", "Families"],
  ["veterans", "Veterans"],
  ["first-responders", "First responders"],
  ["college-students", "College students"],
  ["lgbtqia", "LGBTQIA+"],
  ["professionals", "Professionals"],
];

const states: [string, string, string][] = [
  ["new-york", "New York", "NY"],
  ["new-jersey", "New Jersey", "NJ"],
  ["north-carolina", "North Carolina", "NC"],
  ["florida", "Florida", "FL"],
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  // 1. Offices and their office towns.
  for (const office of offices) {
    const { county, ...officeData } = office;
    await prisma.office.upsert({
      where: { slug: office.slug },
      update: officeData,
      create: officeData,
    });
    await prisma.town.upsert({
      where: { slug: office.slug },
      update: { name: office.townName, county, isOfficeTown: true },
      create: {
        slug: office.slug,
        name: office.townName,
        county,
        isOfficeTown: true,
        sortOrder: office.sortOrder,
        offices: { connect: { slug: office.slug } },
      },
    });
  }

  // 2. Towns within range, with unique local detail and office links.
  for (const [index, town] of townContent.entries()) {
    const officeRefs = town.offices.map((slug) => ({ slug }));
    const data = {
      name: town.name,
      county: town.county,
      localDetail: town.localDetail,
      isOfficeTown: Boolean(town.isOfficeTown),
      sortOrder: index + 1,
    };
    await prisma.town.upsert({
      where: { slug: town.slug },
      update: { ...data, offices: { set: officeRefs } },
      create: { slug: town.slug, ...data, offices: { connect: officeRefs } },
    });
  }

  // 3. Insurers, with coverage copy.
  for (const [index, insurer] of insurers.entries()) {
    const slug = slugify(insurer.name);
    const content = insurerContent.find((c) => c.slug === slug);
    const data = {
      ...insurer,
      slug,
      sortOrder: index + 1,
      summary: content?.summary ?? null,
      contentApproved: content?.contentApproved ?? false,
    };
    await prisma.insurer.upsert({
      where: { slug },
      update: data,
      create: data,
    });
  }

  // 4. Conditions, modalities, populations: base label then authored content.
  for (const [index, [slug, name]] of conditions.entries()) {
    const content = conditionContent.find((c) => c.slug === slug);
    const data = {
      name,
      sortOrder: index + 1,
      icd10: content?.icd10 ?? null,
      summary: content?.summary ?? null,
      body: content?.body ?? null,
      contentApproved: content?.contentApproved ?? false,
    };
    await prisma.condition.upsert({
      where: { slug },
      update: data,
      create: { slug, ...data },
    });
  }

  for (const [index, [slug, name]] of modalities.entries()) {
    const content = modalityContent.find((c) => c.slug === slug);
    const data = {
      name,
      sortOrder: index + 1,
      summary: content?.summary ?? null,
      body: content?.body ?? null,
      contentApproved: content?.contentApproved ?? false,
    };
    await prisma.modality.upsert({
      where: { slug },
      update: data,
      create: { slug, ...data },
    });
  }

  for (const [index, [slug, name]] of populations.entries()) {
    const content = populationContent.find((c) => c.slug === slug);
    const data = {
      name,
      sortOrder: index + 1,
      summary: content?.summary ?? null,
      body: content?.body ?? null,
      contentApproved: content?.contentApproved ?? false,
    };
    await prisma.population.upsert({
      where: { slug },
      update: data,
      create: { slug, ...data },
    });
  }

  // 5. Wellness services.
  for (const [index, service] of wellnessServiceContent.entries()) {
    const data = { ...service, sortOrder: index + 1 };
    await prisma.wellnessService.upsert({
      where: { slug: service.slug },
      update: data,
      create: data,
    });
  }

  // 6. Telehealth states (the licensure fence) and their metros.
  for (const [index, [slug, name, code]] of states.entries()) {
    const content = stateContent.find((s) => s.slug === slug);
    const data = {
      name,
      code,
      licensed: true,
      sortOrder: index + 1,
      summary: content?.summary ?? null,
      contentApproved: content?.contentApproved ?? false,
    };
    await prisma.geoState.upsert({
      where: { slug },
      update: data,
      create: { slug, ...data },
    });
    if (content) {
      const state = await prisma.geoState.findUniqueOrThrow({ where: { slug } });
      for (const [mIndex, metro] of content.metros.entries()) {
        await prisma.metro.upsert({
          where: { slug: metro.slug },
          update: { name: metro.name, sortOrder: mIndex + 1, stateId: state.id },
          create: {
            slug: metro.slug,
            name: metro.name,
            sortOrder: mIndex + 1,
            stateId: state.id,
          },
        });
      }
    }
  }

  // 7. Clinicians, with office and specialty relations. Connect by slug; the
  // taxonomy and offices already exist from the steps above.
  for (const clinician of clinicians) {
    const officeRefs = clinician.offices.map((slug) => ({ slug }));
    const conditionRefs = clinician.conditions.map((slug) => ({ slug }));
    const modalityRefs = clinician.modalities.map((slug) => ({ slug }));
    const populationRefs = clinician.populations.map((slug) => ({ slug }));
    const base = {
      name: clinician.name,
      credentials: clinician.credentials ?? null,
      title: clinician.title ?? null,
      bio: clinician.bio,
    };
    await prisma.clinician.upsert({
      where: { slug: clinician.slug },
      update: {
        ...base,
        offices: { set: officeRefs },
        conditions: { set: conditionRefs },
        modalities: { set: modalityRefs },
        populations: { set: populationRefs },
      },
      create: {
        slug: clinician.slug,
        ...base,
        offices: { connect: officeRefs },
        conditions: { connect: conditionRefs },
        modalities: { connect: modalityRefs },
        populations: { connect: populationRefs },
      },
    });
  }

  // 8. Medical review authorship (E-E-A-T) for conditions and modalities.
  for (const content of conditionContent) {
    await prisma.condition.update({
      where: { slug: content.slug },
      data: content.reviewedBy
        ? { reviewedBy: { connect: { slug: content.reviewedBy } } }
        : { reviewedBy: { disconnect: true } },
    });
  }
  for (const content of modalityContent) {
    await prisma.modality.update({
      where: { slug: content.slug },
      data: content.reviewedBy
        ? { reviewedBy: { connect: { slug: content.reviewedBy } } }
        : { reviewedBy: { disconnect: true } },
    });
  }

  // 9. Guides, authored to a reviewer.
  for (const guide of guideContent) {
    const data = {
      title: guide.title,
      question: guide.question ?? null,
      body: guide.body,
      contentApproved: guide.contentApproved,
      publishedAt: new Date(guide.publishedAt),
      reviewedBy: guide.reviewedBy
        ? { connect: { slug: guide.reviewedBy } }
        : undefined,
    };
    await prisma.guide.upsert({
      where: { slug: guide.slug },
      update: data,
      create: { slug: guide.slug, ...data },
    });
  }

  const counts = {
    offices: await prisma.office.count(),
    towns: await prisma.town.count(),
    insurers: await prisma.insurer.count(),
    conditions: await prisma.condition.count(),
    conditionsApproved: await prisma.condition.count({
      where: { contentApproved: true },
    }),
    modalities: await prisma.modality.count(),
    populations: await prisma.population.count(),
    clinicians: await prisma.clinician.count(),
    states: await prisma.geoState.count(),
    metros: await prisma.metro.count(),
    wellnessServices: await prisma.wellnessService.count(),
    guides: await prisma.guide.count(),
  };
  console.log("Seeded:", counts);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
