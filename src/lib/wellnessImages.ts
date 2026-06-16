// Real photography for the Pathway to Wellness pages, keyed by service slug.
// The hero image leads the wellness index. Each entry carries descriptive alt
// text. Services without a confirmed photo fall back to the editorial
// placeholder, so only add a slug here once its image is approved.

export type WellnessImage = { src: string; alt: string };

export const wellnessHeroImage: WellnessImage = {
  src: "/images/wellness/forest-flowers.jpg",
  alt: "A woman in a white shirt breathing in a bunch of wildflowers in warm forest light",
};

export const wellnessServiceImages: Record<string, WellnessImage> = {
  massage: {
    src: "/images/wellness/rest-sofa.jpg",
    alt: "A woman resting with a bunch of daisies on a woven chair beside an open book",
  },
  acupuncture: {
    src: "/images/wellness/lavender-field.jpg",
    alt: "A woman smiling among tall purple flowers in an open field",
  },
  "energy-work": {
    src: "/images/wellness/waiting-room.jpg",
    alt: "The Pathways Within Wellness waiting room with a plant and framed floral art",
  },
  "iv-vitamin-infusion": {
    src: "/images/wellness/reception.jpg",
    alt: "The Pathways Within Wellness reception desk with a welcome sign and candle",
  },
};
