// Content for the population hubs (who the therapy is for). Plain language, in
// the Pathways Within voice, cleaned to the Eastern Keel copy rules. The
// Population model has no reviewer relation; clinician links drive E-E-A-T and
// the indexing gate.

export type PopulationContent = {
  slug: string;
  summary: string;
  body: string;
  contentApproved: boolean;
};

export const populationContent: PopulationContent[] = [
  {
    slug: "children",
    summary:
      "Warm, play based therapy that helps children name and work through big feelings.",
    body: "Children do not always have words for what they feel, so we meet them where they are. Through play, art, and stories, our clinicians give children a safe, age appropriate space to express themselves, make sense of worry or change, and build skills for big feelings.\n\nWe also guide parents and caregivers, because a child does best when the adults around them feel supported too. Whether your child is facing anxiety, a hard transition, behavior concerns, or a loss, we tailor the work to their age and personality.\n\nChild therapy is available across our Long Island offices.",
    contentApproved: true,
  },
  {
    slug: "teens",
    summary:
      "A judgment free space for teens to navigate stress, identity, and relationships.",
    body: "Adolescence is a lot, school pressure, friendships, identity, family, and a changing sense of self. Teens often want support that does not feel like another adult telling them what to do.\n\nOur clinicians offer a genuine, judgment free space where teens can be honest, build coping skills for school and social life, and figure out who they are. We balance respect for their privacy with the right involvement from parents.\n\nWe work with teens in person on Long Island and through telehealth.",
    contentApproved: true,
  },
  {
    slug: "adults",
    summary:
      "One on one therapy built around your goals, at a pace that fits your life.",
    body: "Whatever brings you in, anxiety, depression, trauma, a hard season, or simply wanting to understand yourself better, therapy gives you a confidential space to be heard and a plan built around what matters to you.\n\nOur adult clients come from every background. We match you with a clinician whose approach fits your goals, and we move at a pace that feels right for you.\n\nWe see adults across our five Long Island offices and online for residents of New York, New Jersey, North Carolina, and Florida.",
    contentApproved: true,
  },
  {
    slug: "couples",
    summary:
      "Support for partners to rebuild communication, trust, and connection.",
    body: "Every relationship hits hard stretches. Couples therapy is a space to slow down, understand the patterns you keep falling into, and learn new ways to talk and listen so you both feel heard.\n\nWe work with communication breakdowns, conflict, betrayal, life transitions, and the quiet distance that can build over time. Using research based approaches, we help you repair and reconnect, whether you are in crisis or simply want to feel close again.\n\nWe see couples in person on Long Island and online.",
    contentApproved: true,
  },
  {
    slug: "families",
    summary:
      "Work together as a family to ease conflict and strengthen relationships.",
    body: "Families are systems, and when one person is struggling, everyone feels it. Family therapy brings people together to ease conflict, improve how you talk and listen, and support each other through change.\n\nWe help with parenting challenges, blended family dynamics, a child or teen who is struggling, and the transitions that test even close families. The goal is stronger bonds and healthier ways of being together.\n\nFamily therapy is available across our Long Island offices and online.",
    contentApproved: true,
  },
  {
    slug: "veterans",
    summary:
      "Therapy attuned to the experiences of veterans, with respect for what you carry.",
    body: "Service changes you, and coming home brings its own challenges. Our clinicians offer care attuned to the experiences of veterans, from trauma and PTSD to stress, anger, and the work of transition.\n\nWe meet you with respect for what you carry and never ask you to explain yourself from scratch. We use trauma focused approaches, including EMDR, and we accept VA Community Care.\n\nCare is available in person on Long Island and online. The Veterans Crisis Line is available any time by dialing 988 and pressing 1.",
    contentApproved: true,
  },
  {
    slug: "first-responders",
    summary:
      "Care for first responders facing trauma, stress, and the weight of the job.",
    body: "First responders carry experiences most people never see. Repeated exposure to crisis takes a toll, and the culture of the job can make it hard to ask for help.\n\nOur clinicians understand the demands you face and offer confidential, judgment free support for trauma, stress, sleep, anger, and relationships. We use trauma focused approaches and move at your pace.\n\nWe provide this care in person on Long Island and online. If you are in crisis, call or text 988, or call 911.",
    contentApproved: true,
  },
  {
    slug: "college-students",
    summary:
      "Support for the pressure, transitions, and identity questions of the college years.",
    body: "The college years bring independence, pressure, and a lot of change at once, new environments, relationships, academic stress, and questions about who you are becoming. It is a common time for anxiety and depression to surface.\n\nOur clinicians offer a steady, judgment free space to manage stress, navigate transitions, and build skills that carry beyond school. Telehealth makes it easier to stay in care across semesters and breaks.\n\nWe work with students in person on Long Island and online.",
    contentApproved: true,
  },
  {
    slug: "lgbtqia",
    summary:
      "Affirming therapy that meets you with respect for your full identity.",
    body: "You deserve a therapist who sees and respects your full self. Our clinicians provide affirming care for LGBTQIA+ clients, with room for the experiences, relationships, and questions that matter to you, free of judgment.\n\nWe support identity, relationships, family, minority stress, and any of the concerns that bring anyone to therapy, in a space where you do not have to explain or defend who you are.\n\nWe offer affirming care in person on Long Island and online.",
    contentApproved: true,
  },
  {
    slug: "professionals",
    summary:
      "Therapy for the stress, burnout, and balance challenges of demanding careers.",
    body: "High performing careers carry real pressure, long hours, high stakes, and the quiet toll of always being on. Many professionals reach a point where stress, burnout, or anxiety start to affect their health and relationships.\n\nTherapy gives you a confidential space to step back, manage stress and perfectionism, set boundaries, and reconnect with what matters beyond work. We offer flexible scheduling and telehealth to fit a demanding life.\n\nWe see professionals in person on Long Island and online.",
    contentApproved: true,
  },
];
