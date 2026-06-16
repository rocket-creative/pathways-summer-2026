// The named therapy service offerings, mirroring the live site's Services menu.
// Summaries and bodies are adapted from the practice's own live pages and
// cleaned to the Eastern Keel copy rules. These are service descriptions in the
// brand's voice, not clinical claims. Order follows the live site.

export type TherapyService = {
  slug: string;
  name: string;
  summary: string;
  body: string;
  bullets: string[];
};

export const therapyServices: TherapyService[] = [
  {
    slug: "individual",
    name: "Individual Therapy",
    summary:
      "One on one work with a licensed therapist, focused on your goals and moving at your pace.",
    body: "Individual therapy is classic one on one counseling. Its power rests on two things: your willingness to look honestly at the roots of what you are feeling, and a real dialogue with a trained professional who is on your side. The goal is greater self awareness and the tools to live a more meaningful life.\n\nHaving someone unbiased and nonjudging to talk to is helpful on its own. Add the support and knowledge of a skilled therapist, and you have a real path forward. Common reasons people come in include anxiety, depression, grief, anger, and low self esteem.\n\nOur therapists are trained, licensed, and experienced across many areas of counseling, and each works with the populations they know best. We are confident we have someone on our team who can help.",
    bullets: [
      "A confidential space to be heard",
      "Practical tools for daily life",
      "A plan built around what matters to you",
    ],
  },
  {
    slug: "couples",
    name: "Couples Therapy",
    summary:
      "Support for partners to rebuild communication, trust, and connection.",
    body: "Every relationship hits hard stretches. Couples therapy is a space to slow down, understand the patterns you keep falling into, and learn new ways to talk and listen so you both feel heard.\n\nWe work with communication breakdowns, conflict, betrayal, and the quiet distance that builds over time. Using research based approaches, we help you repair and reconnect, whether you are in crisis or simply want to feel close again.\n\nThe work is collaborative and paced to your relationship. We see couples in person across our Long Island offices and online.",
    bullets: [
      "New styles of communication",
      "Repair after conflict or betrayal",
      "A stronger, more secure relationship",
    ],
  },
  {
    slug: "family",
    name: "Family Therapy",
    summary:
      "Work together as a family to ease conflict and strengthen relationships.",
    body: "Families are systems, and when one person is struggling, everyone feels it. Family therapy brings people together to ease conflict, improve how you talk and listen, and support each other through change.\n\nWe help with parenting challenges, blended family dynamics, a child or teen who is struggling, and the transitions that test even close families. The goal is stronger bonds and healthier ways of being together.\n\nWe offer family therapy across our Long Island offices and online.",
    bullets: [
      "Healthier ways to talk and listen",
      "Support through change and transition",
      "Stronger bonds across the family",
    ],
  },
  {
    slug: "child",
    name: "Child Therapy",
    summary:
      "Play based, supportive therapy that helps children express and understand their feelings.",
    body: "Children do not always have words for what they feel, so we meet them where they are. Through play, art, and stories, our clinicians give children a warm, age appropriate space to express themselves, make sense of worry or change, and build skills for big feelings.\n\nWe also guide parents and caregivers, because a child does best when the adults around them feel supported too. Whether your child is facing anxiety, a hard transition, behavior concerns, or a loss, we tailor the work to their age and personality.\n\nChild therapy is available across our Long Island offices.",
    bullets: [
      "A warm, age appropriate space",
      "Tools for big feelings",
      "Guidance for parents and caregivers",
    ],
  },
  {
    slug: "teen",
    name: "Teen Therapy",
    summary:
      "A safe space for teens to navigate stress, identity, and relationships.",
    body: "Adolescence is a lot, school pressure, friendships, identity, family, and a changing sense of self. Teens often want support that does not feel like another adult telling them what to do.\n\nOur clinicians offer a genuine space, free of judgment, where teens can be honest, build coping skills for school and social life, and figure out who they are. We balance respect for their privacy with the right involvement from parents.\n\nWe work with teens in person on Long Island and through telehealth.",
    bullets: [
      "Support without judgment",
      "Coping skills for school and social life",
      "Room to figure out who they are",
    ],
  },
  {
    slug: "trauma",
    name: "Trauma Therapy",
    summary:
      "Trauma focused care to help you feel safe and secure again, including EMDR.",
    body: "Trauma is not only what happened to you. It is what your mind and body learned in order to survive it. It can live on as anxiety, numbness, anger, trouble trusting, or a sense that you are never quite safe, even long after the event has passed.\n\nOur clinicians work in a trauma informed way, which means safety, choice, and pacing come first. We use approaches such as EMDR, somatic work, and parts based therapy to help your nervous system finish processing what it has been carrying.\n\nWe provide trauma care in person across Long Island and online. If you are in crisis, call or text 988, or call 911.",
    bullets: [
      "Evidence based approaches such as EMDR",
      "Care that moves at your pace",
      "A path back to feeling like yourself",
    ],
  },
  {
    slug: "weight-loss-surgery-support",
    name: "Weight Loss Surgery Support",
    summary:
      "Psychological support before and after bariatric surgery, for the whole journey.",
    body: "Weight loss surgery changes far more than the body. Our clinicians provide the psychological evaluations many programs require before surgery, and the ongoing support that helps change last afterward.\n\nWe work with the emotional side of the journey: your relationship with food, body image, the adjustments that follow surgery, and the feelings that surface along the way. The goal is steady, lasting change supported from the inside out.\n\nThis care is available in person on Long Island and online.",
    bullets: [
      "Preparation and evaluations before surgery",
      "Support through recovery and change",
      "A focus on your relationship with food and body",
    ],
  },
  {
    slug: "veterans-and-first-responders",
    name: "Veterans and First Responders",
    summary:
      "Therapy attuned to the experiences of veterans and first responders.",
    body: "Service changes you, and the experiences you carry are not like everyone else's. Our clinicians offer care attuned to veterans and first responders, with respect for what you carry and no need to explain yourself from scratch.\n\nWe work with trauma, PTSD, stress, anger, sleep, and the work of transition, using trauma focused approaches including EMDR. We accept VA Community Care.\n\nCare is available in person on Long Island and online. If you are in crisis, call or text 988, or call 911. Veterans can dial 988 and press 1.",
    bullets: [
      "Clinicians who understand service",
      "Care for trauma, stress, and transition",
      "Respect for what you carry",
    ],
  },
];

export function getTherapyService(slug: string): TherapyService | undefined {
  return therapyServices.find((service) => service.slug === slug);
}
