// Clinician headshots, pulled from the live site and stored in
// public/images/clinicians. Keyed by clinician slug. Returns the public path and
// alt text for the clinician index and profile pages. A missing slug falls back
// to the photo placeholder.

const FILES: Record<string, string> = {
  "rachel-lessard": "rachel-lessard.png",
  "ksusha-cascio": "ksusha-cascio.png",
  "joe-bush": "joe-bush.png",
  "lee-wasser": "lee-wasser.png",
  "kaitlyn-kelly": "kaitlyn-kelly.png",
  "laura-desilva": "laura-desilva.png",
  "samantha-juravich": "samantha-juravich.png",
  "benjamin-marmorstein": "benjamin-marmorstein.png",
  "beth-gabellini": "beth-gabellini.png",
  "carly-sandstrom": "carly-sandstrom.png",
  "jen-brooks": "jen-brooks.png",
  "lauren-hollander": "lauren-hollander.jpg",
  "paula-gonthier": "paula-gonthier.png",
  "samantha-tavel": "samantha-tavel.png",
  "tia-baumohl": "tia-baumohl.png",
  "anna-ostrow": "anna-ostrow.png",
  "charity-meyer": "charity-meyer.png",
  "chelsea-bell": "chelsea-bell.png",
  "frank-tropeano": "frank-tropeano.png",
  "juliette-squicciarini": "juliette-squicciarini.png",
  "kathleen-dimartino": "kathleen-dimartino.png",
  "lindsay-laier": "lindsay-laier.jpg",
  "maddy-zambri": "maddy-zambri.png",
  "mariah-simone": "mariah-simone.png",
  "nicole-duffy": "nicole-duffy.png",
};

export type ClinicianImage = { src: string; alt: string };

export function clinicianImage(
  slug: string,
  name: string,
): ClinicianImage | null {
  const file = FILES[slug];
  if (!file) return null;
  return { src: `/images/clinicians/${file}`, alt: `${name}, therapist at Pathways Within` };
}
