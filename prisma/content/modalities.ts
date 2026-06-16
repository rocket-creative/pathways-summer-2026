// Treatment method content for the modality hubs. The EMDR, IFS, somatic, and
// hypnotherapy bodies are adapted from the practice's own live pages and cleaned
// to the Eastern Keel copy rules. The remaining modalities use standard, plain
// language descriptions in the same voice. Each names a licensed reviewer.

export type ModalityContent = {
  slug: string;
  summary: string;
  body: string;
  reviewedBy?: string;
  contentApproved: boolean;
};

export const modalityContent: ModalityContent[] = [
  {
    slug: "emdr",
    summary:
      "Eye movement desensitization and reprocessing, to heal trauma without rehashing every detail.",
    body: "Are you ready to heal but less prepared to revisit the details of painful or repressed memories? With the support of a trained therapist, EMDR uses guided eye movements to help your brain reprocess what it has been holding, so you can heal without spending session after session rehashing the things that hurt you.\n\nThere is nothing wrong with you if you struggle to talk about what happened. Trauma is hard to process, and traditional talk therapy can ask you to revisit it at length. If that feels overwhelming, EMDR may be the tool you have been looking for.\n\nEMDR is internationally recognized, with more than three decades of research behind it. It is often used for PTSD and other trauma responses, and it can also help with anxiety, panic attacks, phobias, and the lingering effects of difficult experiences. We provide EMDR in person on Long Island and, where appropriate, by telehealth.",
    reviewedBy: "lee-wasser",
    contentApproved: true,
  },
  {
    slug: "ifs",
    summary:
      "Internal Family Systems, a gentle, evidence based way to understand and heal your inner parts.",
    body: "Internal Family Systems is an evidence based approach that helps you explore and heal the many parts within you, the protectors, the wounded parts you have exiled, and the core Self that holds wisdom and compassion.\n\nAt Pathways Within, IFS is a gentle approach that does not pathologize you. Rather than trying to fix you, we support you in building a more compassionate relationship with all of your parts, even the ones that feel painful, confusing, or hard to face.\n\nIFS can help if you struggle with overwhelming emotions or inner conflict, feel stuck in patterns of self criticism or avoidance, or want to explore the roots of trauma, anxiety, or depression. In sessions, your therapist guides you to slow down, notice what is happening inside, and relate to your inner experience with care and curiosity. Over time this brings greater clarity, calm, and connection.",
    reviewedBy: "ksusha-cascio",
    contentApproved: true,
  },
  {
    slug: "somatic-therapy",
    summary:
      "Body centered therapy that releases trauma held in the nervous system.",
    body: "Our bodies have long memories. Whether or not we recall an experience, it can live on in the nervous system, in the gut, in the head, neck, and shoulders. These are the places where trauma hides from plain view, and somatic therapy works to release the tension that trauma leaves behind.\n\nSoma is Greek for body, and that is the cornerstone of somatic psychotherapy. It focuses on the body and how trauma has settled into your physical being. We can be very good at rationalizing how we feel, but the body tends to tell the truth.\n\nYou stay in control of your comfort throughout. If touch does not feel right, that is completely normal, and the work can happen through movement and awareness instead. We provide somatic therapy in person on Long Island and online.",
    reviewedBy: "lauren-hollander",
    contentApproved: true,
  },
  {
    slug: "hypnotherapy",
    summary:
      "Guided, gentle trance work to access the unconscious mind and release patterns that no longer serve you.",
    body: "Do you ever wish you could mute the noise of the world and turn inward to understand what you are feeling? Hypnotherapy is the intentional guiding of a gentle trance state that gives your unconscious mind some time in the driver's seat. By easing the weight of conscious effort, it can help you release the lingering grip of psychological, emotional, and physical experiences.\n\nHypnotherapy is not stage hypnosis. There is no motivation to deceive or manipulate you. Reaching the unconscious mind is simply a way to offer you freedom from the world around you so you can use the healing that is already possible within you.\n\nHypnotherapy brings mind and body together to create real changes in thought and behavior. If you are ready to release the patterns that no longer serve you, guided hypnosis with a trained clinician may be a good fit. We offer it in person and online.",
    reviewedBy: "rachel-lessard",
    contentApproved: true,
  },
  {
    slug: "cbt",
    summary:
      "Cognitive behavioral therapy, practical work on the thoughts and behaviors that shape how you feel.",
    body: "Cognitive behavioral therapy is one of the most studied and effective approaches in mental health. It works from a simple idea: the way we think shapes the way we feel and act, and those patterns can be examined and changed.\n\nIn CBT we identify the thoughts that fuel anxiety, low mood, or stress, test how accurate and helpful they really are, and build more balanced ways of thinking and responding. It is active and collaborative, and you leave with concrete tools you can use between sessions.\n\nOur clinicians use CBT for anxiety, depression, trauma, and more, in person on Long Island and through telehealth.",
    reviewedBy: "samantha-tavel",
    contentApproved: true,
  },
  {
    slug: "dbt",
    summary:
      "Dialectical behavior therapy, skills for intense emotions, distress, and relationships.",
    body: "Dialectical behavior therapy was developed for people who feel emotions intensely and need practical, reliable skills for the hardest moments. It balances acceptance and change, meeting you with compassion while building real tools for a steadier life.\n\nDBT skills fall into four areas: mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness. Together they help you ride out strong feelings without acting in ways you regret, and communicate your needs more clearly.\n\nThis approach can help with intense emotions, self harm urges, and unstable relationships. We offer it in person and online.",
    reviewedBy: "kathleen-dimartino",
    contentApproved: true,
  },
  {
    slug: "gottman-couples",
    summary:
      "Research based couples therapy to rebuild communication, trust, and friendship.",
    body: "Strong relationships are built on more than love. The Gottman approach to couples therapy grows out of decades of research on what actually keeps partners connected, and what slowly pulls them apart.\n\nIn sessions we map the patterns in your relationship, strengthen friendship and fondness, and replace cycles of criticism and defensiveness with ways of talking that let you both feel heard. We work with conflict, betrayal, and the ordinary distance that builds over time.\n\nWhether you are in crisis or simply want to feel close again, we work with couples in person on Long Island and online.",
    reviewedBy: "rachel-lessard",
    contentApproved: true,
  },
  {
    slug: "play-therapy",
    summary:
      "Play based therapy that helps children express and work through their feelings.",
    body: "Children do not always have the words for what they feel, but they have play. Play therapy gives children a natural, age appropriate way to express themselves, work through difficult experiences, and build coping skills, all in a warm and safe space.\n\nThrough play, art, and stories, a trained clinician helps a child process worries, big feelings, and changes at home or school, and gives parents guidance to support them. The work meets children where they are developmentally rather than asking them to sit and talk like adults.\n\nWe offer play based therapy for children across our Long Island offices.",
    reviewedBy: "samantha-juravich",
    contentApproved: true,
  },
  {
    slug: "talk-therapy",
    summary:
      "Classic one on one counseling, a confidential space to be heard and understood.",
    body: "Talk therapy is the foundation of mental health care, a confidential conversation with a trained professional who is on your side. Its power rests on two things: your willingness to look honestly at yourself, and the support and skill your therapist brings to the work.\n\nThe goal is greater self awareness and practical tools for a more meaningful life. Having someone unbiased to talk to is helpful on its own. Add the knowledge of a skilled clinician, and you have a real path forward.\n\nWe offer talk therapy for individuals, couples, and families, in person across Long Island and online.",
    reviewedBy: "kaitlyn-kelly",
    contentApproved: true,
  },
  {
    slug: "light-therapy",
    summary:
      "Light based support for mood and seasonal changes, alongside therapy.",
    body: "Light therapy uses timed exposure to bright light to support mood, sleep, and energy, particularly for people affected by seasonal shifts in daylight. It is often used alongside talk therapy rather than on its own.\n\nWe can talk through whether light therapy fits your situation and how to use it safely as part of a broader plan for your mental health.",
    contentApproved: false,
  },
  {
    slug: "cognitive-processing",
    summary:
      "Cognitive processing therapy, a structured, evidence based approach for trauma and PTSD.",
    body: "Cognitive processing therapy is a structured, evidence based treatment for PTSD and the aftermath of trauma. It focuses on the stuck points, the beliefs about yourself, others, and the world that trauma can leave behind.\n\nTogether we examine how the trauma changed the way you think, gently challenge the conclusions that keep you stuck, and build a more balanced understanding that lets you move forward. The approach is collaborative and paced to feel manageable.\n\nWe offer this care in person on Long Island and online.",
    reviewedBy: "laura-desilva",
    contentApproved: true,
  },
];
