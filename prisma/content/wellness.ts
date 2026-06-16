// Wellness (medspa) services for the sister practice Pathways Within Wellness.
// Copy is adapted from the live site (pathwayswithinwellness.com), normalized to
// the Eastern Keel copy rules (no hyphens in body copy, no em or en dashes, no
// AI filler). The verbatim source lives in content/live-source/wellness__*.md.
//
// Note: the medspa offerings below carry prices and procedure claims taken from
// the live site. Treat prices and clinical claims as needing client and
// clinical confirmation before they are considered final.

export type WellnessSection = { heading: string; body: string[] };
export type WellnessOffering = {
  name: string;
  description: string;
  price?: string;
};
export type WellnessFaq = { question: string; answer: string };

export type WellnessServiceSeed = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  intro: string | null;
  bullets: string[];
  benefits: string[];
  sections: WellnessSection[];
  offerings: WellnessOffering[];
  faqs: WellnessFaq[];
  contentApproved: boolean;
};

export const wellnessServiceContent: WellnessServiceSeed[] = [
  {
    slug: "massage",
    name: "Massage",
    category: "Massage",
    summary: "Therapeutic and relaxation massage tailored to your body.",
    intro: "Massage is your gateway to relaxation and healing.",
    bullets: [
      "Relaxation massage",
      "Sports massage",
      "Pregnancy massage",
      "Swedish massage",
      "Hot stone massage",
    ],
    benefits: [
      "Lower stress levels",
      "Reduced muscle soreness",
      "Less tension and pain",
      "Clearer headspace",
      "Brightened and refreshed skin",
      "Better circulation",
      "More relaxation",
      "Increased energy",
      "Improved immune response",
      "More restful sleep",
    ],
    sections: [
      {
        heading: "Relaxation designed just for you",
        body: [
          "At Pathways Within, we pride ourselves on quality relaxation in a spa like environment. Our massages take this ethos further by ensuring that every client receives a service tailored to their needs.",
          "Our attention to detail begins from the very first moment, and we offer a variety of massage services so you walk out the door with less stress in your body and more calm in your soul.",
        ],
      },
      {
        heading: "Become a member",
        body: [
          "Alongside one time and standing appointments, we offer massage memberships for clients who want access to lasting relaxation. Our memberships grant 60 minutes on the table with one of our massage therapists every month, plus $25 toward any other service we offer.",
          "Members can bank monthly massages for up to three months, get early access to specials and deals, and lock in price stability from the time they sign up. Reach out if you would like to learn more or sign up today.",
        ],
      },
    ],
    offerings: [
      {
        name: "Lymphatic Drainage Massage",
        description:
          "A gentle massage that stimulates the lymphatic system, which removes waste and toxins from the body. Light pressure and rhythmic, circular movement help move lymph fluid through the vessels and toward the lymph nodes.",
      },
      {
        name: "Swedish Massage",
        description:
          "The classic massage you picture in a standard setting. Gentle, rhythmic, intentional pressure helps the muscles release tension and strain in tense areas like the lower back, shoulders, and neck.",
      },
      {
        name: "Reflexology Massage",
        description:
          "Focused on the extremities, reflexology uses pressure points in the hands and feet to activate and soothe corresponding body systems. Many clients say it reduces pain, increases relaxation, and improves sleep and anxiety.",
      },
      {
        name: "Prenatal Massage",
        description:
          "Similar to Swedish massage, with modified technique and positioning to accommodate a pregnant belly. The focus is comfort and relaxation, relieving swollen joints and sore muscles in a spa like setting.",
      },
      {
        name: "Hot Stone Massage",
        description:
          "Flat warm stones are heated to around 125 degrees and placed or moved along the body to release tension, pain, and symptoms of fatigue, nausea, and insomnia. The stones may be tapped, kneaded, stroked, or left to rest.",
      },
      {
        name: "Sport Massage",
        description:
          "For athletes aiming for elite performance without risk of injury or strain. Improve elasticity, fast track healing, and reduce tension by releasing tight spots and improving blood flow.",
      },
    ],
    faqs: [
      {
        question: "Does massage hurt?",
        answer:
          "Some massages can be uncomfortable, but they should never be outright painful unless you are working with a known condition, sensitivity, or sore spot that your massage therapist is aware of and you have given consent to release.",
      },
      {
        question: "What can I expect afterward?",
        answer:
          "You may be tender, sore, sleepy, or a little achy. Massage releases a lot of lymphatic build up, which can cause flu like symptoms in some people. Stay hydrated and plan to rest for a couple of hours afterward to maximize the benefit.",
      },
      {
        question: "What do I need to do to prepare?",
        answer:
          "Drink plenty of water before your massage and come dressed in light, comfortable clothing. We recommend showering the morning of and limiting heavily scented products or body treatments.",
      },
      {
        question: "Is it safe to get a massage?",
        answer:
          "Every body can benefit from expert massage, but not everyone can safely receive the same treatments. During your consultation, your therapist helps determine which style suits your needs, with safety at the center of the plan.",
      },
    ],
    contentApproved: true,
  },
  {
    slug: "acupuncture",
    name: "Acupuncture",
    category: "Acupuncture",
    summary:
      "Acupuncture to relieve pain, reduce stress, and support overall well being.",
    intro:
      "For thousands of years, acupuncture has been used to help manage, prevent, and overcome maladies of every imaginable type.",
    bullets: ["Relieves pain", "Reduces stress", "Promotes overall well being"],
    benefits: [
      "Reducing inflammation",
      "Chronic pain",
      "Better sleep",
      "Seasonal allergies",
      "Managing stress",
      "Relaxation",
      "PMS or menopause",
      "Fertility concerns",
      "Arthritis and joint irritation",
      "Healing injuries",
      "Blood pressure",
      "Migraines",
      "Swelling reduction",
      "Youthful skin",
      "General wellness",
    ],
    sections: [
      {
        heading: "What is acupuncture and how does it work?",
        body: [
          "Acupuncture stimulates your body's internal systems by engaging them through careful, precise insertion of very fine needles into key trigger points. A certified acupuncturist inserts the needles gently into the skin. The insertion is nearly painless, only enough sensation to disrupt the nerve signals and cue your body's response.",
          "The needles are left in long enough to engage the relevant body systems and jumpstart rejuvenation, healing, and relaxation in a calm, comfortable environment. Performed by a certified practitioner, acupuncture is a safe and beneficial alternative or complement to other treatments.",
        ],
      },
      {
        heading: "Acupuncture as a science and ancient art",
        body: [
          "Though modern medicine recognizes acupuncture as a valuable part of healing many conditions, it dates back much further. Rooted in traditional Chinese medicine, it has been used for thousands of years to relieve pain and restore the balance of the body's natural energies. The World Health Organization now recognizes it as a viable treatment for a number of conditions.",
          "The ancient practice focuses on the harmony of life energy, called qi, channeling it through established pathways called meridians. Acupuncture guides the qi back to its ideal location through the insertion of thin needles, rebalancing the body and helping to reduce pain.",
        ],
      },
      {
        heading: "The ideal addition to your wellness experience",
        body: [
          "Acupuncture can be added to many other services on our wellness menu to enhance their effectiveness. It can encourage relaxation or invigorate an energetic return to the outside world.",
          "However you choose to apply it, expect to spend an hour being treated to an experience unlike any other. Ask your booking consultant about combining treatments to curate a visit designed to meet your every need.",
        ],
      },
    ],
    offerings: [],
    faqs: [
      {
        question: "Does it hurt?",
        answer:
          "You may feel a pinch or some pressure as the needle is inserted, but this is unlikely. The needles are not much thicker than a strand of hair, and you are more likely to feel relaxed. There may be a sense of fullness while they are in, but no lasting pain.",
      },
      {
        question: "Is acupuncture safe?",
        answer:
          "Yes. When performed by skilled technicians and acupuncturists, acupuncture is a safe and comfortable experience with minimal risks. We use pre sterilized, packaged needles and discard them immediately after use. On rare occasions you may notice itching, soreness, or topical irritation. If you have sensitive skin or bruise easily, speak to your acupuncturist first.",
      },
      {
        question: "How long do results last?",
        answer:
          "It depends on where the acupuncture is applied and what it is intended to treat. Results can last from hours to months, and your plan can be tailored once you know how your body responds to this slow release balancing of energy and the nervous system.",
      },
      {
        question: "What if I am afraid of needles?",
        answer:
          "Our fine needles are unlike those used for a shot or a tattoo. They are so thin that they feel more like pressure than a pinch. If you have a fear of needles, talk to our booking coordinator and we will support you through it.",
      },
    ],
    contentApproved: true,
  },
  {
    slug: "energy-work",
    name: "Energy Work",
    category: "Energy Work",
    summary:
      "Energy work to reduce stress and address energy blocks, a complement to talk therapy.",
    intro: "Discover methods designed to balance your mind, body, and spirit.",
    bullets: [
      "Reduce stress",
      "Address energy blocks",
      "Enhance your inner spirit",
      "Complements talk therapy",
    ],
    benefits: [],
    sections: [
      {
        heading: "Reiki, universal life energy",
        body: [
          "Feel your stress melt away with this soothing, hands on practice that promotes deep relaxation and emotional clarity. Reiki suits anyone seeking peace, energetic balance, or a spiritual reset, whether on its own or alongside talk therapy.",
        ],
      },
      {
        heading: "Integrated Therapeutic Alignment, ITA",
        body: [
          "A gentle, energy based modality designed to bring the body, mind, emotions, and energy system back into balance. By working with key energetic connection points, ITA helps identify and release stored emotions, limiting beliefs, and patterns that contribute to stress, discomfort, or imbalance.",
        ],
      },
      {
        heading: "Integrative Energy Therapy, IET",
        body: [
          "Ready to release what has been holding you back? IET gently clears emotional blocks stored in the body and helps you feel lighter, more grounded, and open to positive change. It is especially supportive for those processing trauma, anxiety, or life transitions.",
        ],
      },
    ],
    offerings: [],
    faqs: [],
    contentApproved: true,
  },
  {
    slug: "reiki",
    name: "Reiki",
    category: "Energy Work",
    summary:
      "Usui Reiki, a hands on practice that promotes deep relaxation and emotional clarity.",
    intro:
      "Achieve inner peace and get more acquainted with your inner spirit with Reiki.",
    bullets: [],
    benefits: [
      "Just for today, do not worry",
      "Just for today, do not anger",
      "Honor your parents, teachers, and elders",
      "Earn your living honestly",
      "Show gratitude for every living thing",
    ],
    sections: [
      {
        heading: "What is Reiki?",
        body: [
          "Reiki is a technique developed in Japan to reduce stress and improve healing. It is founded on the idea that our bodies hold our life energy, and that when that reserve is low we are more likely to feel stress or get sick. When it is in ample supply, you feel better both physically and emotionally.",
          "Reiki complements our wisdom services because therapy often appeals to the intellectual part of our minds, while Reiki is more attuned to our spiritual side. It is not religious in nature, which suits both people of faith and those who are nonreligious, because it enhances your inner spirit regardless of belief.",
        ],
      },
      {
        heading: "A typical Reiki session",
        body: [
          "Reiki is like a healing massage, done with or without touch. You lie fully dressed on a comfortable table while your practitioner either hovers their hands around certain areas or, if you are comfortable, lightly touches them to support healing.",
          "People often report feeling heat or tingling where the practitioner is working, and sometimes memories or colors appear in their imagination. Some fall asleep because the practice is so peaceful. The best way to learn if Reiki is for you is to try it once.",
        ],
      },
    ],
    offerings: [],
    faqs: [],
    contentApproved: true,
  },
  {
    slug: "integrative-energy-therapy",
    name: "Integrative Energy Therapy",
    category: "Energy Work",
    summary:
      "A hands on healing therapy that seeks out trapped energy in the body and works it toward release.",
    intro:
      "Integrative Energy Therapy seeks out and breaks down the barriers holding you back from the inside out.",
    bullets: [],
    benefits: [],
    sections: [
      {
        heading: "Raising good vibrations",
        body: [
          "Everything that has ever happened to you still lives inside you, good, bad, and in between. When an experience becomes covered up, erased, or denied, it does not just disappear. It stagnates, creating disruptions in the transfer of energy from one space to another.",
          "Integrative Energy Therapy is the next generation of targeted physical healing for emotional health. It is a hands on therapy that seeks out trapped energy in your body. Using a Cellular Memory Map, we release stored trauma and untapped emotion from the spaces where your energy has become stuck, creating a blank slate for positive emotions.",
        ],
      },
      {
        heading: "Every body healing",
        body: [
          "Trauma does not need to stem from profound harm. We all experience it as we move through the world. Even if you are not sure what you would talk about in therapy, you may simply feel better when you give your energy a clear path to move through your physical and spiritual bodies.",
          "From regularly scheduled treatments to intermittent maintenance, the balance of benefit and time is as unique as the life you have lived. Our goal is to get you feeling your absolute best, with access to all the energy your body has to offer.",
        ],
      },
      {
        heading: "Spotlight, cellular memory",
        body: [
          "IET targets areas of the body where your cells take on your trauma. In a very literal sense, these cells become little sponges, soaking up the experiences you have. What has happened to you can become a visceral reaction in your body.",
          "The practice is colloquially called removing the issues from the tissues. By initiating a hands on release of those body spaces, IET finds your blocked energy pathways and slowly works them toward release. Much like yoga or acupuncture, it is a subtle, targeted approach that engages your cellular being to heal your emotional self.",
        ],
      },
    ],
    offerings: [],
    faqs: [],
    contentApproved: true,
  },
  {
    slug: "iv-vitamin-infusion",
    name: "IV Vitamin Infusion",
    category: "IV Vitamin Infusion",
    summary:
      "IV vitamin infusions to boost energy, mental clarity, and immune support.",
    intro:
      "If you need a fast boost of healing and hydration, IV vitamin infusions are a simple, quick way to heal now.",
    bullets: [
      "Boost energy",
      "Improve mental clarity",
      "Strengthen immune system",
      "Ease hangover symptoms",
    ],
    benefits: [
      "Recharge cells",
      "Improve mental clarity",
      "Boost energy",
      "Help with migraines",
      "Slow signs of aging",
      "Support weight loss",
      "Reduce anxiety",
      "Ease hangover symptoms",
      "Boost athletic performance",
      "Strengthen immune system",
      "Enhance recovery and healing",
      "Increase stress management",
    ],
    sections: [
      {
        heading: "Immediate internal healing",
        body: [
          "There is no more efficient way to deliver nutrients to the body than to put them on an express journey to the bloodstream. IV vitamin infusions cut out the extra effort your body undertakes to break down and isolate nutrients by delivering them in precise quantities that are ready to use.",
          "Bioavailable vitamin healing helps ensure low stress and immediate recovery, especially beneficial for anxiety, athletic recovery, and hangovers.",
        ],
      },
      {
        heading: "Holistic health from the inside out",
        body: [
          "Direct infusion speeds up recovery in many ways. All our blends are based with saline, increasing cell hydration and flushing out toxins as we deliver critical support to your body.",
          "You do not need a reason to give your body a boost. The simple desire to nourish with IV vitamins so you can heal more wholly is reason enough. One thing is certain: you will feel better, fast.",
        ],
      },
    ],
    offerings: [
      {
        name: "Liquid Sunshine, immune support",
        description:
          "Designed to support your immune system and make you feel like you are radiating warmth from the inside out. Saline is supercharged with vitamin C, zinc, copper, selenium, manganese, and chromium.",
      },
      {
        name: "Get Up and Go, energizer",
        description:
          "Feeling sluggish? This energy boosting, stress reducing infusion melts away stress and picks up the pep. The saline blend carries vitamins B1, B2, B3, B5, B6, and B12 linked up with amino acids.",
      },
      {
        name: "The Glow Up, beauty",
        description:
          "Get glowing from head to toe. Supporting your skin, hair, and nails, this blend carries a megadose of vitamin C plus vitamins B1, B2, B3, B5, and B6, charged with collagen to support you in looking your best.",
      },
      {
        name: "Myer's Cocktail",
        description:
          "Created by Dr. John Myers, this IV cocktail supports the immune system and can improve fatigue, chronic inflammation, fibromyalgia, muscle spasms, migraines, seasonal allergies, asthma, and mood.",
      },
      {
        name: "The After Party, hangover",
        description:
          "Epic night, morning of regrets? Almost instantly ease your hangover with IV hydration, anti nausea, and pain relief that leaves you ready to take on the day.",
      },
      {
        name: "Get Pumped, athletic performance",
        description:
          "Make the most of your fitness routine. Amino acids are essential for protein synthesis, muscle growth and maintenance, improved performance, and muscle recovery.",
      },
    ],
    faqs: [
      {
        question: "What are the risks?",
        answer:
          "Intravenous infusions carry the risk any injectable medication carries. There is a marginal risk of blood clots, infection, or vein inflammation. These complications are rare, and we safeguard against them through thorough care and cleaning before and after your infusion. As with any vitamin therapy, you could get too much of a nutrient, which we control carefully in a therapeutic setting.",
      },
      {
        question: "Is it safe?",
        answer:
          "Yes. All of our infusion blends are made of the highest quality nutrients and supplements, tested at multiple levels throughout the process. With a quick turnaround and minimal risks, IV therapy is very safe, and the supplements are medical grade with a holistic mindset.",
      },
      {
        question: "How do I prepare?",
        answer:
          "Relax, sit back, and let the vitamins do the work. IV infusion is a low prep therapy. Wear comfortable clothes and be honest with your therapist about anything you have ingested that may change how your body responds. When your infusion is done, plan to relax for a few minutes before returning to your day.",
      },
      {
        question: "What if I am afraid of needles?",
        answer:
          "Let us know and we can walk you through the process, or manage requests not to see the needle before it is removed while the IV line keeps delivering. A fear of needles is something we can overcome together, and if you remain uncomfortable we can recommend other therapies.",
      },
    ],
    contentApproved: true,
  },
  {
    slug: "cryotherapy",
    name: "Cryotherapy",
    category: "Cryotherapy",
    summary:
      "Whole body cryotherapy, a precision tool with a wide breadth of therapeutic benefits.",
    intro:
      "From burning off latent emotions to residual pain, cryotherapy is a precision tool with a wide breadth of therapeutic benefits.",
    bullets: [],
    benefits: [
      "Pain from injuries",
      "Anxiety",
      "Arthritis",
      "Inflammation",
      "Nerve pain",
      "Atopic dermatitis",
      "Migraines",
      "Eczema",
      "Depression",
      "Mood disorders",
    ],
    sections: [
      {
        heading: "Cold therapy 101",
        body: [
          "Brief exposure to extreme cold sounds like a dare, but sometimes the most surprising things create holistic healing at a cellular level. In an enclosed space, you are exposed to temperatures as low as minus 300 degrees Fahrenheit for a brief time to provoke a range of benefits for body, mind, and spirit.",
          "The cold is created by liquid nitrogen, designed to ultra chill your skin and the blood running close to it to create a holistic response of regeneration. The benefits of cryotherapy are so much more than skin deep, with applications for many kinds of pain, from physical to physiological.",
        ],
      },
      {
        heading: "Talking bodies",
        body: [
          "The environments we exist in communicate constantly with our bodies. Using cryotherapy, we can slow the cellular response while heightening the oxygenation of your blood and tissues. When the temperature drops in such an extreme way, your whole body responds.",
          "This unexpected shift of environment can help stop chronic conditions in their tracks. Because it is highly effective and minimally invasive, cryotherapy can treat comprehensive, chronic conditions or be applied in localized ways for acute difficulties.",
        ],
      },
      {
        heading: "Spotlight, inflammation",
        body: [
          "Inflammation is not just something that happens to our joints or in response to physical injury. Our whole bodies can react with an inflammatory response to the things we experience. When our fight or flight reflex is engaged, your body floods with hormones preparing you for action.",
          "That can help in a crisis, but what happens when those floods become chronic and the inflammatory response is constant? Both emotional and physical pain are the result. Cryotherapy is an age old tool that can help you manage how your body responds to new pain and how you flush out the hurt that lingers.",
        ],
      },
    ],
    offerings: [],
    faqs: [],
    contentApproved: true,
  },
  {
    slug: "body-sculpting",
    name: "Body Sculpting",
    category: "Body Sculpting",
    summary:
      "Non invasive body sculpting to tone, contour, and support recovery.",
    intro:
      "Whether you are looking to improve your image or your health, we offer aesthetics and wellness services that fulfill both needs.",
    bullets: [],
    benefits: [],
    sections: [],
    offerings: [
      {
        name: "Colombian Wood Therapy",
        description:
          "A Colombian body technique that uses purposely shaped wood pieces to sculpt the body in desired areas, moving and draining accumulated adipose tissue. It works well with laser lipo and cavitation and helps with stubborn cellulite.",
        price: "$125",
      },
      {
        name: "Laser Lipo",
        description:
          "Lasers liquefy fat, making it easier to remove via lymphatic drainage, and may stimulate collagen and elastin for tighter, smoother, firmer skin. Clients lose one to four inches per session, with results varying per person. Two to three sessions a week are recommended. Drink plenty of water before and after. Financing available.",
      },
      {
        name: "EmSculpt",
        description:
          "An FDA approved device for body contouring that burns fat and builds muscle mass. It contracts muscle beyond voluntary effort for better tone and reduced fat on the abs, buttocks, and thighs. Each treatment is the equivalent of 30,000 squats and 30,000 crunches. Two sessions a week are recommended. Packages available.",
      },
      {
        name: "Cavitation",
        description:
          "A non invasive way to break down fatty deposits using ultrasonic cavitation. It is highly effective at removing fat, reducing cellulite, stimulating circulation, and boosting collagen production. Recommended two to three times a week. A compression garment worn afterward enhances contouring. Packages available.",
      },
    ],
    faqs: [],
    contentApproved: true,
  },
  {
    slug: "face-treatments",
    name: "Skincare",
    category: "Skincare",
    summary: "Facials and advanced skincare treatments on Long Island.",
    intro: "Pamper yourself with the best facial treatments on Long Island.",
    bullets: [],
    benefits: [],
    sections: [],
    offerings: [
      {
        name: "European Facial",
        description:
          "An hour long facial that includes steaming, exfoliation, extractions, massage, masks, and the application of serums and moisturizers. It helps unclog pores, even skin tone, deeply cleanse, improve radiance, boost cell renewal, hydrate, relieve facial tension, and reduce fine lines and blemishes.",
      },
      {
        name: "On the Go Facial",
        description:
          "Short on time? This express facial covers cleansing, toning, exfoliating, extractions if needed, gua sha, moisturizer, and serums.",
      },
      {
        name: "Dermaplaning Facial",
        description:
          "A method of exfoliation that uses a 10 gauge scalpel to gently scrape off the top layer of dulling dead skin cells, revealing a smoother, brighter complexion. Recommended for all skin types except acneic skin. Discuss any allergies or sensitivities before starting.",
        price: "Starting at $150",
      },
      {
        name: "Hollywood Carbon Facial",
        description:
          "A superficial treatment that helps with acne, oily skin, fine lines and wrinkles, large pores, hyperpigmentation, and dry skin. It can be done on the face, neck, hands, or back. Recommended every two weeks. Packages available.",
        price: "$249",
      },
      {
        name: "Oxygen Dome Facial",
        description:
          "Delivers oxygen to your skin cells to increase cell turnover and boost collagen production. Its anti inflammatory properties help reduce the appearance of acne and other blemishes, visibly plumping out lines and wrinkles.",
        price: "$125",
      },
      {
        name: "HydraFacial, signature treatment",
        description:
          "Deeply cleanse, extract, and hydrate the skin with super serums full of antioxidants, peptides, and hyaluronic acid. Boosters are available as add ons.",
        price: "Starting at $199",
      },
      {
        name: "HydraFacial, deluxe",
        description:
          "All the essentials of the signature HydraFacial while addressing specific skin concerns through boosters and protocols. LED light therapy is available as an add on.",
        price: "Starting at $295",
      },
      {
        name: "HydraFacial, platinum",
        description:
          "The ultimate HydraFacial experience. It begins with lymphatic drainage, followed by the signature HydraFacial to cleanse, extract, and hydrate, then a booster of your choice and LED light therapy to reduce visible signs of aging.",
        price: "Starting at $325",
      },
      {
        name: "Collagen Booster Treatment",
        description:
          "After a certain age we produce collagen more slowly. This treatment helps regenerate and boost collagen with our REGEN booster serum and LED therapy. Come in weekly, every two weeks, or monthly.",
        price: "Starting at $500",
      },
      {
        name: "Ultra Glow",
        description:
          "Lutronic ULTRA rebuilds glowing, healthy skin through gentle, non ablative fractionated treatments. Tunable from mild to aggressive, it offers customized outcomes with very little downtime for all patients, all year round.",
        price: "$1000",
      },
      {
        name: "Genius RF Microneedling",
        description:
          "A non surgical treatment that reduces fine lines and wrinkles, including neck bands, and improves skin laxity. It is also highly effective at treating scars, working in the deepest layers of the skin to stimulate collagen and elastin.",
        price: "Starting at $1395",
      },
      {
        name: "Total Skin Solution",
        description:
          "Treats all layers of the skin on the face and neck. The Lutronic Genius system stimulates collagen and elastin production to improve skin over time, while the Ultra device removes pigment for visible results within days.",
      },
    ],
    faqs: [],
    contentApproved: true,
  },
  {
    slug: "body-treatments",
    name: "Body Treatments",
    category: "Body Treatments",
    summary:
      "Targeted body treatments, from pelvic tightening to laser removal and skin resurfacing.",
    intro:
      "Whether you are looking to improve your image or your health, we offer aesthetics and wellness services that fulfill both needs.",
    bullets: [],
    benefits: [],
    sections: [],
    offerings: [
      {
        name: "Pelvic Tightening",
        description:
          "A non invasive treatment for incontinence and confidence. Pelvic floor muscles give you control over your bladder and bowel, and this technology offers relief for those who experience incontinence, lack of lubrication, and weakened pelvic muscles.",
        price: "$300",
      },
      {
        name: "Shake Ya Bum Bum Carbon Facial",
        description:
          "A facial for the bum that helps with acne, bacteria, and ingrown hairs. Charcoal is applied to draw out toxins and impurities, a laser passes over to remove it, and LED light therapy reduces inflammation. It concludes with a mask, serums, and moisturizer.",
        price: "$175",
      },
      {
        name: "Back Facial",
        description:
          "A 60 minute session that begins with gentle steam and a full cleanse of the back, followed by a skin analysis, customized exfoliation mask, and extractions if needed. It concludes with a treatment mask and a finishing treatment to lock in results.",
        price: "$145",
      },
      {
        name: "Hollywood Carbon Back Facial",
        description:
          "A carbon laser peel that resurfaces the skin on the back, helping with acne, enlarged pores, oily skin, and uneven tone by removing oils, dirt, and dead skin cells that cause clogged pores.",
        price: "$200",
      },
      {
        name: "Laser Tattoo Removal",
        description:
          "Laser light heats and shatters the ink it reaches, removing the shallowest layers before the deepest. It takes multiple treatments to penetrate all depths, and the ink is then excreted through the lymphatic system. Prices vary by size, so a consultation is booked first.",
      },
      {
        name: "Laser Spider Vein Removal",
        description:
          "A very effective way to destroy problem veins with minimal risk of side effects. Your provider chooses the wavelength and duration based on the size and depth of the vein. Many people need a series of sessions about four weeks apart to reach their goal.",
        price: "$150",
      },
      {
        name: "Genius Radiofrequency Microneedling Scar Removal",
        description:
          "Radiofrequency microneedling is quickly becoming the go to treatment for scars on the face and body, including surgery and injury scars. Three to six treatments are recommended, spaced every six to eight weeks to give the skin time to heal.",
        price: "$600",
      },
      {
        name: "Genius Radiofrequency Stretch Mark Removal",
        description:
          "An advanced method of skin rejuvenation that stimulates the body's natural healing to encourage collagen production in the dermis, resulting in rejuvenated, tightened skin. Three to six treatments are suggested, six to eight weeks apart.",
        price: "$500",
      },
      {
        name: "HydraFacial",
        description:
          "Our HydraFacials are not just for the face. Experience one of the most powerful, non invasive skin resurfacing treatments on your back, arms, legs, hands, or neck.",
      },
    ],
    faqs: [],
    contentApproved: true,
  },
  {
    slug: "hair",
    name: "Hair Restoration and Removal",
    category: "Hair",
    summary:
      "Hair restoration and laser hair removal to remove unwanted hair or restore your own.",
    intro:
      "Whether you are looking to remove unwanted hair or nourish and restore your hair to its former glory, we offer services that fulfill both needs.",
    bullets: [],
    benefits: [],
    sections: [],
    offerings: [
      {
        name: "Keralase Hair Restoration",
        description:
          "KeraFactor Peptide Complex is a hair and scalp serum with a proprietary formulation of five bio identical growth factors and two skin proteins essential for scalp and hair health. Each peptide is wrapped in a nanoliposome carrier for enhanced absorption. Six sessions, and it includes a home care pack.",
      },
      {
        name: "Laser Hair Removal",
        description:
          "A medical procedure that uses an intense, pulsating beam of light to remove unwanted hair. The laser passes through the skin to an individual hair follicle, and the heat damages the follicle to inhibit future growth.",
      },
      {
        name: "PRP Hair Restoration",
        description:
          "Platelet rich plasma is the blood plasma that contains growth factors that stimulate healing and regeneration. PRP therapy is an effective, non surgical hair restoration treatment for men and women experiencing hair loss, capable of treating balding and thinning hair using natural growth factors found in your own blood.",
      },
    ],
    faqs: [],
    contentApproved: true,
  },
  {
    slug: "bundles",
    name: "Bundles",
    category: "Bundles",
    summary:
      "Combination packages that pair treatments for a full mind, body, and spirit experience.",
    intro: "Combine treatments for the full mind, body, and spirit experience.",
    bullets: [],
    benefits: [],
    sections: [],
    offerings: [
      {
        name: "A Quick Pick Me Up",
        description:
          "The ultimate rejuvenation: a 60 minute massage, a vitamin IV to bring back the life in you, and a session of Usui Reiki energy healing. You are bound to feel brand new mentally, physically, and spiritually.",
      },
      {
        name: "Maderoterapia Bundle",
        description:
          "A combination of cavitation and wood therapy for stubborn areas. Ultrasonic waves break down fat deposits that the lymphatic system absorbs, radiofrequency skin tightening preserves elastin in the treated areas, and wood therapy breaks down cellulite while activating the entire lymphatic system.",
      },
      {
        name: "Bye Bye Inches",
        description:
          "Laser lipo paired with Colombian wood therapy, an effective duo for the midsection, love handles, and stubborn back fat. It can be performed on the arms, legs, stomach, and thighs.",
      },
      {
        name: "Mommy Needs a Break",
        description:
          "A 60 minute massage, a Hollywood carbon facial to refresh dull skin, and teeth whitening so you can smile with confidence. Everything a mom needs to regroup, get pampered, and take on the world.",
      },
      {
        name: "Face and Body Consultation",
        description:
          "A 30 minute consultation to discuss your goals and curate a package for you. Using a mind, body, and spirit approach, we can incorporate nutrition, body sculpting, facials, and holistic services.",
        price: "$50",
      },
      {
        name: "Consultation",
        description:
          "See our Medical Director to determine which services may be appropriate and covered under NYSHIP insurance.",
        price: "$25",
      },
    ],
    faqs: [],
    contentApproved: true,
  },
];
