// Informational authority articles for /guide. Plain language, in the Pathways
// Within voice, cleaned to the Eastern Keel copy rules. Each is authored to a
// named licensed reviewer (E-E-A-T) and carries a publish date. Bodies split on
// blank lines into paragraphs.

export type GuideContent = {
  slug: string;
  title: string;
  question?: string;
  body: string;
  reviewedBy?: string;
  publishedAt: string;
  contentApproved: boolean;
};

export const guideContent: GuideContent[] = [
  {
    slug: "what-is-emdr-therapy",
    title: "What is EMDR therapy?",
    question: "What is EMDR therapy and how does it work?",
    body: "EMDR stands for eye movement desensitization and reprocessing. It is a structured therapy that helps the brain reprocess distressing memories so they lose their charge, without requiring you to talk through every painful detail.\n\nDuring a session, your therapist guides you through sets of side to side eye movements, or other forms of gentle bilateral stimulation, while you briefly hold a memory in mind. This appears to help the brain do the processing it could not finish at the time of the event, so the memory becomes less vivid and less distressing.\n\nEMDR has more than three decades of research behind it and is widely used for PTSD and trauma. It can also help with anxiety, panic, and phobias. At Pathways Within, we build a sense of safety first and move at a pace you can manage.\n\nIf you are in crisis, call or text 988, or call 911.",
    reviewedBy: "lee-wasser",
    publishedAt: "2026-01-15",
    contentApproved: true,
  },
  {
    slug: "signs-of-ptsd",
    title: "Signs of PTSD",
    question: "What are the signs of PTSD?",
    body: "Post traumatic stress can follow any event that overwhelmed your sense of safety. The signs tend to fall into a few groups, and they are normal responses to an abnormal experience.\n\nYou might notice intrusive symptoms such as flashbacks, nightmares, or unwanted memories. You might avoid people, places, or conversations that remind you of what happened. You might feel constantly on guard, easily startled, or unable to relax. And you might feel numb, distant, or changed in how you see yourself and the world.\n\nWhen these last more than a month and interfere with daily life, it is worth talking to a professional. PTSD is treatable, often with trauma focused approaches like EMDR.\n\nIf you are in crisis, call or text 988, or call 911. Veterans can dial 988 and press 1.",
    reviewedBy: "lauren-hollander",
    publishedAt: "2026-02-03",
    contentApproved: true,
  },
  {
    slug: "does-insurance-cover-therapy-in-new-york",
    title: "Does insurance cover therapy in New York?",
    question: "Does my insurance cover therapy in New York?",
    body: "In most cases, yes. New York requires health plans to cover mental health care comparably to medical care, so most insured residents have some coverage for therapy.\n\nWhat you pay depends on your specific plan, your copay or coinsurance, and whether your deductible has been met. In network care, where the practice has an agreement with your insurer, usually costs less than out of network care.\n\nPathways Within is in network with most major New York insurers, including Aetna, Cigna, Optum, UnitedHealthcare, Oxford, and others. We verify your specific benefits before your first visit, so you know your costs up front, with no surprises.\n\nTo check your coverage, give us a call and we will confirm your benefits for you.",
    reviewedBy: "ksusha-cascio",
    publishedAt: "2026-02-20",
    contentApproved: true,
  },
  {
    slug: "how-to-choose-a-therapist-on-long-island",
    title: "How to choose a therapist on Long Island",
    question: "How do I choose the right therapist?",
    body: "The most important factor in therapy is the relationship between you and your therapist, so it is worth finding someone you feel comfortable with.\n\nStart with the practical fit: location and parking, telehealth options, and whether the practice takes your insurance. Then consider the clinical fit. Look for a therapist with experience in what you are facing, whether that is anxiety, trauma, couples work, or support for your child.\n\nIt is normal to meet with someone and decide they are not the right match. A good practice will help you find a better fit rather than take it personally. At Pathways Within, we match you with a clinician based on your goals, and we can adjust if it is not working.\n\nGive us a call and we will help you find the right person on our team.",
    reviewedBy: "rachel-lessard",
    publishedAt: "2026-03-05",
    contentApproved: true,
  },
  {
    slug: "what-to-expect-at-your-first-therapy-session",
    title: "What to expect at your first therapy session",
    question: "What happens in a first therapy session?",
    body: "A first session is mostly about getting to know each other. Your therapist will ask what brought you in, a bit about your history, and what you hope to get out of therapy. There is no pressure to share more than you are ready to.\n\nYou will also cover the practical side: confidentiality and its limits, scheduling, and your goals for the work ahead. Many people feel nervous beforehand and relieved afterward.\n\nBefore that first visit, we confirm your insurance benefits so you know your costs. You do not need to prepare anything. Just come as you are.\n\nIf you have questions before you start, give us a call.",
    reviewedBy: "kaitlyn-kelly",
    publishedAt: "2026-03-22",
    contentApproved: true,
  },
  {
    slug: "what-is-somatic-therapy",
    title: "What is somatic therapy?",
    question: "What is somatic therapy and who is it for?",
    body: "Somatic therapy is a body centered approach to healing. The word soma is Greek for body, and the core idea is that stress and trauma do not only live in our thoughts. They settle into the nervous system and show up as tension, pain, or a sense of being on edge.\n\nIn a session, your therapist helps you notice what is happening in your body and gently work with it, through awareness, breath, and movement. This can release tension that talk alone does not reach.\n\nSomatic work can help with trauma, anxiety, and chronic stress. You stay in control of your comfort the entire time, and if touch does not feel right, the work happens through awareness and movement instead.\n\nWe offer somatic therapy in person on Long Island and online.",
    reviewedBy: "lauren-hollander",
    publishedAt: "2026-04-10",
    contentApproved: true,
  },
  {
    slug: "how-to-support-an-anxious-teen",
    title: "How to support an anxious teen",
    question: "How can I help my teenager with anxiety?",
    body: "Watching your teen struggle with anxiety is hard, and your instinct to fix it is loving. Often the most helpful thing is to listen first and reassure second.\n\nTry to validate what they feel rather than talk them out of it. Saying that something sounds really stressful lands better than saying there is nothing to worry about. Keep routines steady, protect sleep, and avoid making the anxiety the only topic in the house.\n\nGently encourage them to face the things they are avoiding in small steps, rather than removing every stressor, which can make anxiety grow. And know when to bring in support. If anxiety is interfering with school, friendships, or daily life, a therapist can help.\n\nOur clinicians work with teens across Long Island and online, in a space that feels judgment free to them.",
    reviewedBy: "joe-bush",
    publishedAt: "2026-04-28",
    contentApproved: true,
  },
];
