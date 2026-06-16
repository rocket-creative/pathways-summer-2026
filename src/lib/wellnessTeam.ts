// The Pathways Within Wellness team, pulled from the live site about page
// (pathwayswithinwellness.com/about). Headshots live in
// public/images/wellness/team. Bios are normalized to the Eastern Keel copy
// rules (no hyphens in body copy, no em or en dashes, no AI filler).

export type WellnessTeamMember = {
  slug: string;
  name: string;
  role: string;
  credentials?: string;
  bio: string[];
  image: { src: string; alt: string };
};

export const wellnessTeam: WellnessTeamMember[] = [
  {
    slug: "rachel-lessard",
    name: "Rachel Lessard",
    role: "Owner",
    credentials:
      "Licensed Clinical Social Worker, Certified Angel Card Reader, and Level 2 Reiki Practitioner",
    bio: [
      "There is nothing I love more than combining mind, body, and spirit practices to achieve true wellness. I am always learning and evolving, and I feel it is my life's purpose to do so and to hold space for those on their own journeys of healing and growth.",
    ],
    image: {
      src: "/images/wellness/team/rachel-lessard.webp",
      alt: "Rachel Lessard, owner of Pathways Within Wellness",
    },
  },
  {
    slug: "christine-cervo",
    name: "Christine Cervo",
    role: "Massage Therapist",
    bio: [
      "Christine is a licensed massage therapist and a graduate of the New York College of Health Professions. While there she took extra classes specializing in aromatherapy, reflexology, sports massage, and prenatal massage. Christine is dedicated to helping people feel better through massage therapy.",
    ],
    image: {
      src: "/images/wellness/team/christine-cervo.webp",
      alt: "Christine Cervo, massage therapist at Pathways Within Wellness",
    },
  },
  {
    slug: "angela-gestone",
    name: "Angela Gestone",
    role: "Licensed Esthetician and Brow Specialist",
    bio: [
      "With over a decade of hands on experience in skincare and brow artistry, I have built my career around one mission: enhancing natural beauty with precision and purpose. After graduating from the New York Institute of Beauty in 2013, I found my passion in brows, because they truly have the power to transform a face.",
      "Since 2017 I have specialized in microshading and microblading, helping clients achieve brows that stay flawless with no pencil needed. My background includes years of advanced training, corrective work, and running my own business from 2017 to 2025, all while being a dedicated mom of two. My approach is personal, detailed, and always tailored to each individual client.",
    ],
    image: {
      src: "/images/wellness/team/angela-gestone.webp",
      alt: "Angela Gestone, licensed esthetician and brow specialist at Pathways Within Wellness",
    },
  },
  {
    slug: "gloria-saladino",
    name: "Gloria Saladino",
    role: "Front Desk Manager",
    bio: [
      "As front desk manager at Pathways Within, I am here to ensure every client's experience is welcoming, smooth, and supportive. I am proud to be part of a team that honors whole person wellness, whether through our clinical therapy services or our holistic body care.",
    ],
    image: {
      src: "/images/wellness/team/gloria-saladino.webp",
      alt: "Gloria Saladino, front desk manager at Pathways Within Wellness",
    },
  },
];
