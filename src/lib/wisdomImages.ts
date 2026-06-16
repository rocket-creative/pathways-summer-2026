// Real photography for the Pathway to Wisdom (therapy) pages. Images are keyed
// by the slugs used across conditions, modalities, populations, and named
// services. Each carries descriptive alt text. A slug absent from a map falls
// back to the editorial placeholder, so add an entry only once its image is
// confirmed. A photo may repeat across separate pages, never within one page.

import type { WellnessImage } from "@/lib/wellnessImages";

export type WisdomImage = WellnessImage;

const base = "/images/wisdom";

// Reusable, named photographs.
const photos = {
  session: {
    src: `${base}/therapy-session.jpg`,
    alt: "A therapist and client talking in a calm consulting room with an assessment on the table",
  },
  eye: {
    src: `${base}/eye.jpg`,
    alt: "A close view of a human eye, used for eye movement desensitization and reprocessing",
  },
  family: {
    src: `${base}/family-beach.jpg`,
    alt: "A family of four standing arm in arm looking out at the ocean",
  },
  couple: {
    src: `${base}/couple.jpg`,
    alt: "A couple holding hands by the sea, shoes in hand",
  },
  veteran: {
    src: `${base}/veteran.jpg`,
    alt: "A veteran in uniform saluting at an outdoor ceremony",
  },
  children: {
    src: `${base}/children.jpg`,
    alt: "Three children sitting at a table, each quietly covering their eyes, ears, or mouth",
  },
  teen: {
    src: `${base}/teen.jpg`,
    alt: "A young person resting their chin on their hand, looking out a window",
  },
  youngWoman: {
    src: `${base}/young-woman.jpg`,
    alt: "A young woman smiling outdoors in warm evening light",
  },
  distress: {
    src: `${base}/distress.jpg`,
    alt: "A person sitting on the floor with their head in their hands",
  },
  pensive: {
    src: `${base}/pensive.jpg`,
    alt: "A woman sitting with her knees drawn up, looking away in thought",
  },
  lookingOut: {
    src: `${base}/looking-out.jpg`,
    alt: "A woman seen from behind, sitting and looking out toward the horizon",
  },
  sunlight: {
    src: `${base}/sunlight.jpg`,
    alt: "A woman tilting her face up toward bright sunlight",
  },
  stones: {
    src: `${base}/balance-stones.jpg`,
    alt: "A stack of smooth balanced stones on a pebble beach by the ocean",
  },
  water: {
    src: `${base}/water-ripple.jpg`,
    alt: "A single ripple spreading across still, calm water",
  },
  mirror: {
    src: `${base}/mirror.jpg`,
    alt: "A woman considering her reflection in a bedroom mirror",
  },
} satisfies Record<string, WisdomImage>;

// Leads the home page hero and the therapy index hero.
export const wisdomHomeHero = photos.stones;
export const wisdomTherapyHero = photos.session;
export const wisdomAboutHero = photos.sunlight;

// /therapy/[topic] covers both conditions and modalities (shared slug space).
export const wisdomTopicImages: Record<string, WisdomImage> = {
  // Conditions
  anxiety: photos.pensive,
  depression: photos.sunlight,
  ptsd: photos.water,
  "complex-ptsd": photos.water,
  adhd: photos.session,
  "bipolar-disorder": photos.session,
  bpd: photos.pensive,
  ocd: photos.water,
  trauma: photos.lookingOut,
  grief: photos.lookingOut,
  "substance-use": photos.sunlight,
  "eating-disorders": photos.mirror,
  "panic-and-phobias": photos.pensive,
  insomnia: photos.water,
  "self-harm": photos.session,
  "domestic-violence-recovery": photos.lookingOut,
  "life-transitions": photos.sunlight,
  // Modalities
  emdr: photos.eye,
  cbt: photos.session,
  dbt: photos.stones,
  ifs: photos.water,
  "somatic-therapy": photos.stones,
  hypnotherapy: photos.water,
  "gottman-couples": photos.couple,
  "play-therapy": photos.children,
  "talk-therapy": photos.session,
  "light-therapy": photos.sunlight,
  "cognitive-processing": photos.session,
};

// /for/[population]
export const wisdomPopulationImages: Record<string, WisdomImage> = {
  children: photos.children,
  teens: photos.teen,
  adults: photos.session,
  couples: photos.couple,
  families: photos.family,
  veterans: photos.veteran,
  "first-responders": photos.veteran,
  "college-students": photos.youngWoman,
  lgbtqia: photos.youngWoman,
  professionals: photos.session,
};

// /services/[slug]
export const therapyServiceImages: Record<string, WisdomImage> = {
  individual: photos.session,
  couples: photos.couple,
  family: photos.family,
  child: photos.children,
  teen: photos.teen,
  trauma: photos.lookingOut,
  "weight-loss-surgery-support": photos.mirror,
  "veterans-and-first-responders": photos.veteran,
};

export { photos as wisdomPhotos };
