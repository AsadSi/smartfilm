import { L, type Localized } from './types';
import {
  APPLICATIONS,
  SPEC_GROUPS,
  type Application,
  type SpecGroup,
  type SpecRow,
} from './specs';

export type Product = {
  /** URL segment — also the key used by the nav and the sub-navigation. */
  slug: string;
  /** "No. 1" — the collection reads as a numbered series. */
  index: string;
  name: string;
  tagline: Localized;
  /** One paragraph, used on the product hero and in the collection tiles. */
  lead: Localized;
  /** Short body used on the comparison page, where three cards sit side by side. */
  summary: Localized;
  /** The three claims, each of which gets a full band on the product page. */
  claims: Localized[];
  /** The headline figure shown on the collection tiles. */
  figure: { value: string; label: Localized };
  /** Three figures across the top of the product page. */
  figures: { value: string; label: Localized }[];
  media: { video: string; videoHevc: string; poster: string };
  /** A second photograph, so the product page is not carried by one video alone. */
  photo: { src: string; alt: Localized; caption: Localized };
};

export const PRODUCTS: Product[] = [
  {
    slug: 'smart-film',
    index: 'No. 1',
    name: 'Smart Film',
    tagline: L('Privatliv på kommando', 'Privacy on command'),
    lead: L(
      'Fra mat til krystalklart på et splitsekund. Diskretion og lys i perfekt balance til mødelokaler, klinikker, suiter og private hjem.',
      'From frosted to crystal clear in a split second. Discretion and light in perfect balance for meeting rooms, clinics, suites and private homes.',
    ),
    summary: L(
      'Et lag film mellem to glas. Strøm på, og ruden er klar; strøm af, og den er mat. Skiftet tager under et sekund.',
      'A layer of film between two panes. Power on and the glass is clear; power off and it turns opaque. The switch takes under a second.',
    ),
    claims: [
      L('Op til 92 % transparens i klar tilstand', 'Up to 92% transparency in clear state'),
      L('Fungerer som elegant projektionsskærm', 'Doubles as an elegant projection screen'),
      L('Styring via kontakt, fjernbetjening eller app', 'Controlled via switch, remote or app'),
    ],
    figure: { value: '92 %', label: L('Transparens', 'Transparency') },
    figures: [
      { value: '92 %', label: L('Transparens', 'Transparency') },
      { value: 'PDLC', label: L('Teknologi', 'Technology') },
      { value: '3', label: L('Styringsmåder', 'Ways to control') },
    ],
    media: {
      video: '/assets/product-smartfilm.mp4',
      videoHevc: '/assets/optimized/product-smartfilm.h265.mp4',
      poster: '/assets/p1-poster.jpg',
    },
    photo: {
      src: '/assets/p1-poster.jpg',
      alt: L('Glasvæg med smart film i et kontormiljø', 'Glass wall with smart film in an office'),
      caption: L('Mødelokale · privatliv slået til', 'Meeting room · privacy switched on'),
    },
  },
  {
    slug: 'led-film',
    index: 'No. 2',
    name: 'LED Film',
    tagline: L('Usynlig teknologi · synlig effekt', 'Invisible technology · visible impact'),
    lead: L(
      'Et ultratyndt LED-væv, der forvandler vinduer og glasfacader til levende medieflader – uden at lukke for udsyn eller dagslys.',
      'An ultra-thin LED mesh that turns windows and glass facades into living media surfaces – without blocking the view or daylight.',
    ),
    summary: L(
      'Et LED-væv på ca. 2 mm, der klæbes direkte på eksisterende glas. Slukket er det næsten ikke til at få øje på.',
      'An LED mesh of approx. 2mm bonded directly onto existing glass. Switched off, it is almost impossible to spot.',
    ),
    claims: [
      L('Kun ca. 2 mm tyk – næsten usynlig slukket', 'Just approx. 2mm thick – nearly invisible when off'),
      L('Op til 99 % visuel transparens', 'Up to 99% visual transparency'),
      L('Indendørs- og udendørsserier i alle formater', 'Indoor and outdoor series, all formats'),
    ],
    figure: { value: '2 mm', label: L('Tykkelse', 'Thickness') },
    figures: [
      { value: '99 %', label: L('Transparens', 'Transparency') },
      { value: '2 mm', label: L('Tykkelse', 'Thickness') },
      { value: 'IN/OUT', label: L('Serier', 'Series') },
    ],
    media: {
      video: '/assets/product-ledfilm.mp4',
      videoHevc: '/assets/optimized/product-ledfilm.h265.mp4',
      poster: '/assets/p2-poster.jpg',
    },
    photo: {
      src: '/assets/gallery-2.jpg',
      alt: L('Transparent LED i et butiksvindue', 'Transparent LED in a shop window'),
      caption: L('Retail · transparent LED', 'Retail · transparent LED'),
    },
  },
  {
    slug: '3d-media-glass',
    index: 'No. 3',
    name: '3D Media Glass',
    tagline: L('Skabt til at blive husket', 'Built to be remembered'),
    lead: L(
      'Tredimensionelle oplevelser direkte i glasset – til flagship-butikker, events og udstillinger, der skal få folk til at stoppe op.',
      'Three-dimensional experiences right in the glass – for flagship stores, events and exhibitions designed to stop people in the street.',
    ),
    summary: L(
      'Tredimensionelle motiver, der ser ud til at stå frit i glasset. Ingen briller, ingen app — man går bare forbi og stopper op.',
      'Three-dimensional motifs that appear to float inside the glass. No glasses, no app — people simply walk past and stop.',
    ),
    claims: [
      L('Immersiv 3D-oplevelse med 160° synsvinkel', 'Immersive 3D viewing with a 160° angle'),
      L('HD-billede med op til 85 % transparens', 'HD image with up to 85% transparency'),
      L('Cloud-baseret styring af indhold', 'Cloud-based content management'),
    ],
    figure: { value: '160°', label: L('Synsvinkel', 'Viewing angle') },
    figures: [
      { value: '160°', label: L('Synsvinkel', 'Viewing angle') },
      { value: '85 %', label: L('Transparens', 'Transparency') },
      { value: 'HD', label: L('Opløsning', 'Resolution') },
    ],
    media: {
      video: '/assets/product-3dglass.mp4',
      videoHevc: '/assets/optimized/product-3dglass.h265.mp4',
      poster: '/assets/p3-poster.jpg',
    },
    photo: {
      src: '/assets/gallery-3.jpg',
      alt: L('3D medieglas i en restaurant', '3D media glass in a restaurant'),
      caption: L('Hospitality · 3D medieglas', 'Hospitality · 3D media glass'),
    },
  },
];

/**
 * The datasheet, with rows we cannot yet stand behind left out.
 *
 * Pending rows stay in `specs.ts` so `scripts/content-request.mjs` can still
 * tell SmartFilm exactly which figures are missing — but a row reading
 * "Afventer" is worse than no row at all on a page meant to look finished, so
 * nothing unconfirmed is rendered, and a group emptied by that filter is
 * dropped entirely rather than left as an empty heading.
 */
export function specGroupsFor(slug: string): SpecGroup[] {
  return (SPEC_GROUPS[slug] ?? [])
    .map((group) => ({ ...group, rows: group.rows.filter((row) => !row.pending) }))
    .filter((group) => group.rows.length > 0);
}


export function applicationsFor(slug: string): Application[] {
  return APPLICATIONS[slug] ?? [];
}

/**
 * The handful of rows worth showing on a card or in the comparison table.
 *
 * Derived from the datasheet rather than authored beside it, so a card can
 * never quietly contradict the specification it links to. Rows still awaiting a
 * figure from SmartFilm are skipped — a card is the wrong place to advertise a
 * gap.
 */
export function keySpecs(slug: string, count = 4): SpecRow[] {
  return specGroupsFor(slug)
    .flatMap((group) => group.rows)
    .filter((row) => !row.pending)
    .slice(0, count);
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** The two products that are not the current one, for the "next" row. */
export function otherProducts(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug);
}
