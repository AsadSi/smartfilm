/**
 * Copy for the v2 template.
 *
 * Danish only and deliberately un-localised: this is a design template, and a
 * DA/EN pair on every string would double its length without changing a single
 * design decision. The strings are real SmartFilm facts rather than lorem — a
 * template filled with placeholder text always flatters itself, because the
 * layout never has to survive a headline that runs three words too long.
 */

export type RangeItem = {
  index: string;
  name: string;
  tagline: string;
  blurb: string;
  figure: { value: string; unit?: string; label: string };
  media: { poster: string; video?: string; videoHevc?: string };
  href: string;
};

export const V2_NAV = [
  { href: '#serien', label: 'Serien' },
  { href: '#teknologi', label: 'Teknologi' },
  { href: '#specifikationer', label: 'Specifikationer' },
  { href: '#referencer', label: 'Referencer' },
  { href: '#kontakt', label: 'Kontakt' },
];

export const V2_HERO = {
  label: 'Smart Film · PDLC',
  headline: 'Klart på et sekund.',
  lead: 'Glas, der skifter fra mat til krystalklart, når du beder det om det. Ingen gardiner, ingen persienner, ingen kompromiser med dagslyset.',
  primary: 'Se serien',
  secondary: 'Book en demonstration',
  media: {
    video: '/assets/hero.mp4',
    videoHevc: '/assets/optimized/hero.h265.mp4',
    poster: '/assets/hero-poster.jpg',
  },
};

export const V2_RANGE: { label: string; headline: string; lead: string; items: RangeItem[] } = {
  label: 'Serien',
  headline: 'Tre teknologier. Ét materiale.',
  lead: 'Alle tre lever i glasset frem for foran det. Forskellen er, hvad du vil have glasset til at gøre, når nogen kigger på det.',
  items: [
    {
      index: '01',
      name: 'Smart Film',
      tagline: 'Privatliv på kommando',
      blurb: 'Et lag PDLC-film mellem to ruder. Strøm på, og glasset er klart; strøm af, og det er mat. Skiftet tager under et sekund.',
      figure: { value: '92', unit: '%', label: 'Transparens i klar tilstand' },
      media: {
        poster: '/assets/p1-poster.jpg',
        video: '/assets/product-smartfilm.mp4',
        videoHevc: '/assets/optimized/product-smartfilm.h265.mp4',
      },
      href: '#teknologi',
    },
    {
      index: '02',
      name: 'LED Film',
      tagline: 'Usynlig teknologi, synlig effekt',
      blurb: 'Et LED-væv på omkring 2 mm klæbet direkte på eksisterende glas. Slukket er det næsten ikke til at få øje på; tændt er facaden en medieflade.',
      figure: { value: '2', unit: 'mm', label: 'Samlet tykkelse' },
      media: {
        poster: '/assets/p2-poster.jpg',
        video: '/assets/product-ledfilm.mp4',
        videoHevc: '/assets/optimized/product-ledfilm.h265.mp4',
      },
      href: '#teknologi',
    },
    {
      index: '03',
      name: '3D Media Glass',
      tagline: 'Skabt til at blive husket',
      blurb: 'Dybde i en flade på få millimeter. Til lobbyer, flagskibsbutikker og de rum, hvor det første indtryk skal holde i timevis.',
      figure: { value: '360', unit: '°', label: 'Synsvinkel uden tab' },
      media: {
        poster: '/assets/p3-poster.jpg',
        video: '/assets/product-3dglass.mp4',
        videoHevc: '/assets/optimized/product-3dglass.h265.mp4',
      },
      href: '#teknologi',
    },
  ],
};

export const V2_FEATURES = [
  {
    label: 'Princip 01',
    headline: 'Teknologien skal forsvinde.',
    body: 'Et mødelokale skal ikke ligne et showroom for et produkt. Filmen lamineres ind i glasset, kablingen føres i rammen, og kontakten sidder der, hvor lyskontakten allerede sad. Det eneste, nogen lægger mærke til, er at ruden skifter.',
    points: ['Lamineret i glasset, ikke monteret på det', 'Kabling skjult i profil og ramme', 'Styring via kontakt, fjernbetjening eller app'],
    media: { src: '/assets/gallery-1.jpg', alt: 'Glasvæg med smart film i et mødelokale' },
  },
  {
    label: 'Princip 02',
    headline: 'Dagslyset er ikke til forhandling.',
    body: 'Persienner løser privatliv ved at fjerne lys. Det gør vores glas ikke: i mat tilstand slipper ruden stadig dagslyset ind og spreder det. Rummet bliver privat uden at blive mørkt — og det er hele forskellen på en løsning og en afskærmning.',
    points: ['Diffust dagslys i mat tilstand', 'Ingen bevægelige dele at vedligeholde', 'Fungerer som projektionsflade'],
    media: { src: '/assets/glass-lobby-cube.jpg', alt: 'Lobby med medieglas' },
  },
];

export const V2_STATEMENT = {
  label: 'Håndværket',
  headline: 'Målt, lamineret og monteret af de samme hænder.',
  lead: 'Vi laver ikke standardstørrelser. Hvert parti måles op på stedet, produceres til den præcise åbning og monteres af vores eget hold — i hele Danmark.',
  figures: [
    { value: '150', unit: '+', label: 'Patenter bag teknologien' },
    { value: '24', unit: 't', label: 'Fra forespørgsel til tilbud' },
    { value: '3', label: 'Teknologier i serien' },
    { value: '100', unit: '%', label: 'Skræddersyet til åbningen' },
  ],
};

export const V2_SPECS = {
  label: 'Specifikationer',
  headline: 'Tallene bag.',
  lead: 'De data, en rådgiver og en glarmester spørger om, før noget som helst andet.',
  columns: ['Smart Film', 'LED Film', '3D Media Glass'],
  rows: [
    { label: 'Transparens', values: ['92 %', '70–85 %', '60 %'] },
    { label: 'Tykkelse', values: ['0,4 mm', '2 mm', '8 mm'] },
    { label: 'Skiftetid', values: ['< 1 sek.', '—', '—'] },
    { label: 'Strømforbrug', values: ['5 W/m²', '180 W/m²', '220 W/m²'] },
    { label: 'Driftstemperatur', values: ['−20 til 60 °C', '−30 til 60 °C', '0 til 45 °C'] },
    { label: 'Maks. panelbredde', values: ['1 800 mm', '3 000 mm', '1 200 mm'] },
    { label: 'Montering', values: ['Lamineret', 'Påklæbet', 'Fritstående'] },
    { label: 'Garanti', values: ['5 år', '3 år', '3 år'] },
  ],
};

export const V2_EDITORIAL = {
  label: 'Referencer',
  headline: 'Set i brug.',
  items: [
    {
      src: '/assets/led-mall-facade.jpg',
      alt: 'LED-film på en butikscenterfacade om aftenen',
      title: 'Butikscenter, facade',
      meta: 'LED Film · 340 m² · Udendørs',
    },
    {
      src: '/assets/led-lounge.jpg',
      alt: 'LED-film i en lounge',
      title: 'Hotellounge',
      meta: 'LED Film · 24 m² · Indendørs',
    },
    {
      src: '/assets/gallery-2.jpg',
      alt: 'Smart film i en klinik',
      title: 'Klinik, konsultationsrum',
      meta: 'Smart Film · 11 m² · Lamineret',
    },
    {
      src: '/assets/media-glass-mall.jpg',
      alt: '3D medieglas i et butikscenter',
      title: 'Flagskibsbutik',
      meta: '3D Media Glass · 6 m² · Fritstående',
    },
  ],
};

export const V2_CTA = {
  label: 'Kontakt',
  headline: 'Fortæl os om åbningen.',
  lead: 'Mål, placering og den effekt du er ude efter. Så har du et tilbud inden for 24 timer på hverdage.',
  primary: 'Forespørg et tilbud',
  secondary: 'Ring +45 28 68 90 50',
  secondaryHref: 'tel:+4528689050',
};

export const V2_FOOTER = {
  columns: [
    {
      title: 'Serien',
      links: [
        { label: 'Smart Film', href: '#serien' },
        { label: 'LED Film', href: '#serien' },
        { label: '3D Media Glass', href: '#serien' },
        { label: 'Sammenlign', href: '#specifikationer' },
      ],
    },
    {
      title: 'Virksomheden',
      links: [
        { label: 'Om os', href: '#teknologi' },
        { label: 'Referencer', href: '#referencer' },
        { label: 'Proces', href: '#teknologi' },
        { label: 'Kontakt', href: '#kontakt' },
      ],
    },
    {
      title: 'Kontakt',
      links: [
        { label: 'kontakt@smartfilmdanmark.dk', href: 'mailto:kontakt@smartfilmdanmark.dk' },
        { label: '+45 28 68 90 50', href: 'tel:+4528689050' },
        { label: 'Hele Danmark', href: '#kontakt' },
      ],
    },
  ],
  legal: ['© 2026 SmartFilm Danmark', 'Privatlivspolitik', 'Cookies', 'CVR 00000000'],
};
