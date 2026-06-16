// Plain language clinical content for the condition hubs. Grounded in standard
// public domain clinical understanding (symptoms, how therapy helps), written
// in the Pathways Within voice and cleaned to the Eastern Keel copy rules.
// Nothing here is a treatment guarantee. Each entry names a licensed reviewer
// (E-E-A-T). Conditions no clinician currently lists stay reviewed by null and,
// because the hub gate also needs a clinician, render but remain noindex.
//
// icd10 is the common reference code, shown for orientation only.

export type ConditionContent = {
  slug: string;
  icd10?: string;
  summary: string;
  body: string;
  reviewedBy?: string;
  contentApproved: boolean;
};

export const conditionContent: ConditionContent[] = [
  {
    slug: "anxiety",
    icd10: "F41.1",
    summary:
      "Therapy for the worry, tension, and racing thoughts that keep you from living the life you want.",
    body: "Anxiety is more than ordinary stress. It can show up as constant worry, a racing mind, trouble sleeping, a tight chest, or a sense of dread that does not match what is actually happening around you. When it builds, it can start to shape the choices you make and the things you avoid.\n\nIn therapy we look at what feeds your anxiety and how it moves through your body and your day. You learn practical tools to calm a spiraling mind, face the situations you have been avoiding at a pace that feels safe, and respond to worry instead of being run by it.\n\nOur Long Island clinicians treat anxiety in person and by telehealth, and we confirm your insurance benefits before your first visit. If you are in crisis, call or text 988 for the Suicide and Crisis Lifeline, or call 911.",
    reviewedBy: "rachel-lessard",
    contentApproved: true,
  },
  {
    slug: "depression",
    icd10: "F32.9",
    summary:
      "Support for the heaviness, low mood, and loss of interest that can make daily life feel out of reach.",
    body: "Depression is more than a low mood. It can drain your energy and motivation, flatten the things you used to enjoy, disrupt your sleep and appetite, and convince you that nothing will change. It can be quiet and easy to hide, which is part of what makes it so isolating.\n\nTherapy gives you a place to be honest about how you feel and to understand what is keeping the heaviness in place. Together we work on small, reachable steps, on the thoughts that pull you down, and on rebuilding connection to the people and activities that matter to you.\n\nWe see clients across our five Long Island offices and online, and we confirm your benefits before you begin. If you are thinking about harming yourself, call or text 988, or call 911.",
    reviewedBy: "laura-desilva",
    contentApproved: true,
  },
  {
    slug: "ptsd",
    icd10: "F43.10",
    summary:
      "Trauma focused care for the flashbacks, hypervigilance, and avoidance that follow a frightening event.",
    body: "Post traumatic stress can follow any event that overwhelmed your sense of safety. It can look like flashbacks or nightmares, being constantly on guard, feeling numb or cut off, and avoiding anything that reminds you of what happened. These are normal responses to an abnormal experience, and they are treatable.\n\nOur clinicians use trauma focused approaches, including EMDR, to help your nervous system process what it has been holding. We move at your pace, build a sense of safety first, and never ask you to relive more than you are ready for.\n\nCare is available in person on Long Island and through telehealth. If you are in immediate danger or crisis, call or text 988, or call 911. Veterans can reach the Veterans Crisis Line by dialing 988 and pressing 1.",
    reviewedBy: "lauren-hollander",
    contentApproved: true,
  },
  {
    slug: "complex-ptsd",
    icd10: "F43.1",
    summary:
      "Care for the lasting effects of repeated or prolonged trauma, often beginning early in life.",
    body: "Complex post traumatic stress grows out of trauma that was repeated or prolonged, often in relationships where you could not easily leave or feel safe. Alongside the symptoms of PTSD, it can affect how you see yourself, how you manage emotions, and how you trust and connect with others.\n\nTherapy for complex trauma is paced and relational. We focus first on stability and safety, then on understanding the patterns that protected you, and gradually on processing the experiences underneath them. Internal Family Systems and other parts based approaches can be a gentle way into this work.\n\nWe offer this care in person and online. If you are in crisis, call or text 988, or call 911.",
    reviewedBy: "ksusha-cascio",
    contentApproved: true,
  },
  {
    slug: "adhd",
    icd10: "F90.9",
    summary:
      "Support for focus, organization, and follow through, for teens and adults living with ADHD.",
    body: "Attention difficulties are not about a lack of effort. ADHD affects the brain's ability to manage focus, time, organization, and impulses. It can mean starting many things and finishing few, missing details, feeling restless, or carrying a long history of being told to just try harder.\n\nIn therapy we build systems that fit how your mind actually works, rather than forcing it into one that does not. We work on routines, on emotional regulation, and on the self criticism that so often comes with years of struggle.\n\nWe see teens and adults across Long Island and online, and we coordinate with prescribers when medication is part of your care.",
    reviewedBy: "samantha-tavel",
    contentApproved: true,
  },
  {
    slug: "bipolar-disorder",
    icd10: "F31.9",
    summary:
      "Therapy that supports stability through the highs and lows of bipolar disorder.",
    body: "Bipolar disorder involves shifts in mood, energy, and activity that go beyond ordinary ups and downs. Periods of elevated or irritable mood and high energy alternate with periods of depression, and the swings can disrupt sleep, relationships, work, and a sense of who you are.\n\nTherapy works alongside medical care to help you recognize early warning signs, steady your routines and sleep, and build skills for the depressive and elevated phases. Over time you gain a clearer map of your own patterns and more say in how you respond to them.\n\nOur Long Island clinicians provide this care in person and online and coordinate with your prescriber.",
    reviewedBy: "joe-bush",
    contentApproved: true,
  },
  {
    slug: "bpd",
    icd10: "F60.3",
    summary:
      "Compassionate, skills based care for intense emotions and unstable relationships.",
    body: "Borderline personality disorder is marked by intense emotions, a shifting sense of self, fear of abandonment, and relationships that swing between closeness and conflict. Underneath the symptoms is often deep sensitivity and pain, and the condition responds well to the right kind of support.\n\nTherapy focuses on practical skills for riding out strong emotions, tolerating distress without acting on it, and communicating needs in relationships. Dialectical approaches and a steady, nonjudging relationship with your therapist are central to the work.\n\nWe offer this care across our offices and online. If you are having thoughts of self harm, call or text 988, or call 911.",
    reviewedBy: "lauren-hollander",
    contentApproved: true,
  },
  {
    slug: "ocd",
    icd10: "F42.9",
    summary:
      "Care for the intrusive thoughts and compulsions that take up time and cause distress.",
    body: "Obsessive compulsive disorder involves unwanted, intrusive thoughts or images and the repeated behaviors or mental rituals people use to relieve the anxiety those thoughts create. The relief is brief, and the cycle tends to grow, taking up more and more time and energy.\n\nEvidence based therapy helps you face the thoughts and feared situations gradually, without performing the usual ritual, so your brain learns that the anxiety passes on its own. We go at a pace you can manage and build confidence with each step.\n\nThis care is available in person on Long Island and through telehealth.",
    reviewedBy: "joe-bush",
    contentApproved: true,
  },
  {
    slug: "trauma",
    icd10: "F43",
    summary:
      "Trauma informed therapy to help you feel safe and at home in yourself again.",
    body: "Trauma is not only what happened to you. It is what your mind and body learned in order to survive it. It can live on as anxiety, numbness, anger, trouble trusting, or a sense that you are never quite safe, even long after the event has passed.\n\nOur clinicians work in a trauma informed way, which means safety, choice, and pacing come first. We use approaches such as EMDR, somatic work, and parts based therapy to help your nervous system finish processing what it has been carrying.\n\nWe provide trauma care in person across Long Island and online. If you are in crisis, call or text 988, or call 911.",
    reviewedBy: "lee-wasser",
    contentApproved: true,
  },
  {
    slug: "grief",
    icd10: "F43.8",
    summary:
      "A place to carry loss, when grief stays heavy or complicated long after.",
    body: "Grief is the natural response to losing someone or something that mattered. It does not follow a tidy timeline, and it can return in waves long after others expect you to have moved on. Sometimes grief becomes complicated, staying so intense that it interrupts daily life.\n\nTherapy offers a place to feel what you feel without being rushed or fixed. We make room for the relationship you lost, help you carry it in a way you can live with, and gently tend to the guilt, anger, or numbness that often comes with loss.\n\nWe see clients in person on Long Island and online.",
    reviewedBy: "laura-desilva",
    contentApproved: true,
  },
  {
    slug: "substance-use",
    icd10: "F10 to F19",
    summary:
      "Nonjudging support for changing your relationship with alcohol or other substances.",
    body: "Substance use exists on a spectrum, and people turn to alcohol or drugs for real reasons, often to cope with pain, stress, or trauma. Change is possible, and it tends to last when the underlying needs are understood rather than shamed.\n\nTherapy meets you where you are, whether you want to cut back, stop, or simply understand your patterns. We look at what the substance has been doing for you, build other ways to meet those needs, and plan for the moments that feel risky.\n\nThis care is available in person and online. If you are in crisis, call or text 988, or call 911.",
    reviewedBy: "lee-wasser",
    contentApproved: true,
  },
  {
    slug: "eating-disorders",
    icd10: "F50.9",
    summary:
      "Care for a difficult relationship with food, eating, and body image.",
    body: "Eating disorders are serious conditions that affect how a person eats, thinks about food, and relates to their body. They are not about vanity or willpower. They often grow from anxiety, trauma, or a need for control, and they can have real effects on physical health.\n\nTherapy helps you understand what the eating behaviors are doing for you, challenge the thoughts that drive them, and rebuild a steadier relationship with food and body. We coordinate with medical providers and dietitians when that is part of safe care.\n\nWe offer this support in person on Long Island and online.",
    contentApproved: true,
  },
  {
    slug: "panic-and-phobias",
    icd10: "F41.0",
    summary:
      "Relief from panic attacks and the specific fears that shrink your world.",
    body: "A panic attack is a sudden surge of fear with intense physical symptoms, a pounding heart, shortness of breath, dizziness, or a feeling that something terrible is about to happen. Phobias are strong, specific fears that lead you to avoid certain places or situations. Both can quietly narrow your life.\n\nTherapy helps you understand what is happening in your body during panic, so the symptoms feel less frightening, and gradually face feared situations so your confidence grows. Most people find that panic loses its grip with the right tools and support.\n\nCare is available in person and through telehealth.",
    reviewedBy: "rachel-lessard",
    contentApproved: true,
  },
  {
    slug: "insomnia",
    icd10: "F51.01",
    summary:
      "Support for the nights you cannot fall asleep, stay asleep, or rest.",
    body: "Insomnia is trouble falling asleep, staying asleep, or getting rest that leaves you recovered. It often feeds on itself, as worry about sleep makes sleep harder, and it can deepen anxiety and low mood during the day.\n\nTherapy addresses the thoughts and habits that keep you awake, builds a wind down routine and a steadier sleep schedule, and eases the anxiety that surrounds bedtime. These approaches are well studied and effective for chronic sleeplessness.\n\nWe provide this care in person on Long Island and online.",
    contentApproved: true,
  },
  {
    slug: "self-harm",
    summary:
      "Steady, nonjudging care for self harm and the pain underneath it.",
    body: "Self harm is often a way of coping with emotional pain that feels unbearable in the moment. It is not attention seeking, and it does not mean someone wants to die, though it deserves to be taken seriously and supported with care rather than shame.\n\nTherapy looks at what self harm has been doing for you and builds other ways to feel and release intense emotion. We focus on safety, on understanding the feelings underneath, and on skills that work in the hardest moments.\n\nThis care is available in person and online. If you are hurting yourself or thinking about it, you deserve support now. Call or text 988, or call 911.",
    reviewedBy: "kathleen-dimartino",
    contentApproved: true,
  },
  {
    slug: "domestic-violence-recovery",
    summary:
      "Recovery focused therapy for survivors of abuse, assault, and coercive relationships.",
    body: "Recovering from an abusive or coercive relationship takes time, and the effects can last well after you are physically safe. Survivors often carry anxiety, hypervigilance, self doubt, and grief, alongside the work of rebuilding a life and a sense of self.\n\nTherapy offers a safe, paced space to process what happened, rebuild trust in yourself, and rediscover strength, confidence, and joy. We follow your lead and never push faster than feels safe.\n\nWe see survivors in person on Long Island and online. If you are in immediate danger, call 911. You can reach the National Domestic Violence Hotline at 800 799 7233.",
    reviewedBy: "nicole-duffy",
    contentApproved: true,
  },
  {
    slug: "life-transitions",
    icd10: "F43.20",
    summary:
      "Support through the changes that reshape your life, expected or not.",
    body: "Big changes can shake even the most resilient person. A move, a new job, a divorce, becoming a parent, an empty nest, retirement, or the loss of a role can all stir up anxiety, grief, and questions about who you are now.\n\nTherapy gives you a steady place to find your footing. We make sense of what is changing, tend to the feelings that come with it, and help you set goals and boundaries that fit the life you are moving toward.\n\nWe offer this support in person across Long Island and online.",
    reviewedBy: "anna-ostrow",
    contentApproved: true,
  },
];
