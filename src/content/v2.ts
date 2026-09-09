/**
 * Copy and imagery for the three design templates.
 *
 * Danish only and deliberately un-localised: these are templates, and a DA/EN
 * pair on every string would double the file without changing a single design
 * decision. The strings are real SmartFilm facts rather than lorem — a template
 * filled with placeholder text always flatters itself, because the layout never
 * has to survive a headline that runs three words too long.
 *
 * All three templates read from this one file. That is the point: when the same
 * words are set three ways, the difference you are looking at is the design and
 * nothing else.
 */

/** Photography. All Pexels, licence and provenance in assets/pexels/CREDITS.md. */
export const IMG = {
  facadeMonolith: '/assets/pexels/facade-monolith.jpg',
  facadeLowangle: '/assets/pexels/facade-lowangle.jpg',
  facadeCurved: '/assets/pexels/facade-curved.jpg',
  facadeDetail: '/assets/pexels/facade-detail.jpg',
  facadeGeometric: '/assets/pexels/facade-geometric.jpg',
  officePartitions: '/assets/pexels/office-partitions.jpg',
  officeMeeting: '/assets/pexels/office-meeting.jpg',
  officeDoors: '/assets/pexels/office-doors.jpg',
  nightQuarter: '/assets/pexels/night-quarter.jpg',
  nightBillboard: '/assets/pexels/night-billboard.jpg',
} as const;

export const ALT = {
  facadeMonolith: 'Mørk glasfacade mod en lys himmel',
  facadeLowangle: 'Glasfacade set nedefra',
  facadeCurved: 'Buet glasfacade i blåt stål',
  facadeDetail: 'Nærbillede af glasfacade med himmelspejling',
  facadeGeometric: 'Skulpturel hvid facade i geometrisk mønster',
  officePartitions: 'Kontor med sortrammede glaspartier',
  officeMeeting: 'Møde bag en glasvæg med udsigt over byen',
  officeDoors: 'Åbne glasdøre ind til et mødelokale',
  nightQuarter: 'Oplyst bykvarter om aftenen',
  nightBillboard: 'Stor LED-flade på en plads om aftenen',
} as const;

/** SmartFilm's own footage. No stock library has PDLC glass switching. */
export const FILM = {
  hero: { video: '/assets/hero.mp4', hevc: '/assets/optimized/hero.h265.mp4', poster: '/assets/hero-poster.jpg' },
  smartfilm: { video: '/assets/product-smartfilm.mp4', hevc: '/assets/optimized/product-smartfilm.h265.mp4', poster: '/assets/p1-poster.jpg' },
  ledfilm: { video: '/assets/product-ledfilm.mp4', hevc: '/assets/optimized/product-ledfilm.h265.mp4', poster: '/assets/p2-poster.jpg' },
  glass: { video: '/assets/product-3dglass.mp4', hevc: '/assets/optimized/product-3dglass.h265.mp4', poster: '/assets/p3-poster.jpg' },
} as const;

export const BRAND = {
  name: 'SmartFilm',
  full: 'SmartFilm Danmark',
  email: 'kontakt@smartfilmdanmark.dk',
  phone: '+45 28 68 90 50',
  phoneHref: 'tel:+4528689050',
  area: 'Levering og montering i hele Danmark',
};

export const NAV = [
  { href: '#serien', label: 'Serien' },
  { href: '#teknologi', label: 'Teknologi' },
  { href: '#specifikationer', label: 'Specifikationer' },
  { href: '#referencer', label: 'Referencer' },
  { href: '#kontakt', label: 'Kontakt' },
];

export const HERO = {
  label: 'Smart Film · PDLC',
  headline: 'Klart på et sekund.',
  headlineAlt: 'Glas, der adlyder',
  lead: 'Glas, der skifter fra mat til krystalklart, når du beder det om det. Ingen gardiner, ingen persienner, ingen kompromiser med dagslyset.',
  primary: 'Se serien',
  secondary: 'Book en demonstration',
};

export type Product = {
  index: string;
  name: string;
  tagline: string;
  blurb: string;
  long: string;
  figure: { value: string; unit?: string; label: string };
  film: { video: string; hevc: string; poster: string };
  photo: string;
  alt: string;
  href: string;
};

export const PRODUCTS: Product[] = [
  {
    index: '01',
    name: 'Smart Film',
    tagline: 'Privatliv på kommando',
    blurb: 'Et lag PDLC-film mellem to ruder. Strøm på, og glasset er klart; strøm af, og det er mat.',
    long: 'Et mødelokale skal ikke ligne et showroom for et produkt. Filmen lamineres ind i glasset, kablingen føres i rammen, og kontakten sidder der, hvor lyskontakten allerede sad. Det eneste, nogen lægger mærke til, er at ruden skifter.',
    figure: { value: '92', unit: '%', label: 'Transparens i klar tilstand' },
    film: FILM.smartfilm,
    photo: IMG.officeMeeting,
    alt: ALT.officeMeeting,
    href: '#teknologi',
  },
  {
    index: '02',
    name: 'LED Film',
    tagline: 'Usynlig teknologi, synlig effekt',
    blurb: 'Et LED-væv på omkring 2 mm klæbet direkte på eksisterende glas. Slukket er det næsten ikke til at få øje på.',
    long: 'Facaden er allerede der. LED-vævet lægger sig på indersiden af glasset og lader både udsyn og dagslys passere, så bygningen bliver en medieflade om aftenen uden at blive en skærm om dagen.',
    figure: { value: '2', unit: 'mm', label: 'Samlet tykkelse' },
    film: FILM.ledfilm,
    photo: IMG.nightQuarter,
    alt: ALT.nightQuarter,
    href: '#teknologi',
  },
  {
    index: '03',
    name: '3D Media Glass',
    tagline: 'Skabt til at blive husket',
    blurb: 'Dybde i en flade på få millimeter. Til lobbyer, flagskibsbutikker og rum, hvor første indtryk skal holde.',
    long: 'Billedet står frit i glasset i stedet for at ligge på det. Det er den eneste af de tre teknologier, hvor folk standser op og bliver stående — og det er hele grunden til at vælge den.',
    figure: { value: '360', unit: '°', label: 'Synsvinkel uden tab' },
    film: FILM.glass,
    photo: IMG.facadeGeometric,
    alt: ALT.facadeGeometric,
    href: '#teknologi',
  },
];

/** The full-viewport stages that carry template A. */
export const STAGES = [
  {
    key: 'smartfilm',
    label: 'Smart Film',
    headline: 'Privatliv på kommando.',
    lead: 'Fra mat til krystalklart på under et sekund. Rummet bliver privat uden at blive mørkt.',
    cta: 'Se Smart Film',
    image: IMG.officeMeeting,
    alt: ALT.officeMeeting,
  },
  {
    key: 'ledfilm',
    label: 'LED Film',
    headline: 'Facaden vågner om aftenen.',
    lead: 'To millimeter LED-væv på indersiden af glasset. Dagslyset slipper stadig ind; udsynet bliver.',
    cta: 'Se LED Film',
    image: IMG.nightQuarter,
    alt: ALT.nightQuarter,
  },
  {
    key: 'glass',
    label: '3D Media Glass',
    headline: 'Dybde i få millimeter.',
    lead: 'Til lobbyer og flagskibsbutikker, hvor det første indtryk skal holde i timevis.',
    cta: 'Se 3D Media Glass',
    image: IMG.facadeMonolith,
    alt: ALT.facadeMonolith,
  },
];

/** The two principles, used by templates B and C. */
export const PRINCIPLES = [
  {
    index: '01',
    label: 'Princip',
    headline: 'Teknologien skal forsvinde',
    body: 'Et mødelokale skal ikke ligne et showroom for et produkt. Filmen lamineres ind i glasset, kablingen føres i rammen, og kontakten sidder der, hvor lyskontakten allerede sad.',
    points: ['Lamineret i glasset, ikke monteret på det', 'Kabling skjult i profil og ramme', 'Styring via kontakt, fjernbetjening eller app'],
    image: IMG.officePartitions,
    alt: ALT.officePartitions,
  },
  {
    index: '02',
    label: 'Princip',
    headline: 'Dagslyset er ikke til forhandling',
    body: 'Persienner løser privatliv ved at fjerne lys. Det gør vores glas ikke: i mat tilstand spreder ruden stadig dagslyset. Rummet bliver privat uden at blive mørkt.',
    points: ['Diffust dagslys i mat tilstand', 'Ingen bevægelige dele at vedligeholde', 'Fungerer som projektionsflade'],
    image: IMG.officeDoors,
    alt: ALT.officeDoors,
  },
];

export const CRAFT = {
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

export const SPECS = {
  label: 'Specifikationer',
  headline: 'Tallene bag.',
  lead: 'De data, en rådgiver og en glarmester spørger om, før noget som helst andet.',
  note: 'Vejledende værdier. Endelige specifikationer afhænger af glastype, størrelse og montageforhold.',
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

export const REFERENCES = [
  { image: IMG.nightBillboard, alt: ALT.nightBillboard, title: 'Plads, medieflade', meta: 'LED Film · 340 m² · Udendørs' },
  { image: IMG.officePartitions, alt: ALT.officePartitions, title: 'Hovedkontor, 4. sal', meta: 'Smart Film · 62 m² · Lamineret' },
  { image: IMG.facadeCurved, alt: ALT.facadeCurved, title: 'Kontorhus, facade', meta: 'LED Film · 210 m² · Udendørs' },
  { image: IMG.facadeDetail, alt: ALT.facadeDetail, title: 'Atrium, glasparti', meta: '3D Media Glass · 18 m² · Fritstående' },
];

export const CTA = {
  label: 'Kontakt',
  headline: 'Fortæl os om åbningen.',
  lead: 'Mål, placering og den effekt du er ude efter. Så har du et tilbud inden for 24 timer på hverdage.',
  primary: 'Forespørg et tilbud',
  secondary: 'Ring ' + BRAND.phone,
};

export const FOOTER = {
  tagline: 'Arkitektonisk lysteknologi — smart film, transparent LED og 3D medieglas, målt og monteret i hele Danmark.',
  columns: [
    { title: 'Serien', links: ['Smart Film', 'LED Film', '3D Media Glass', 'Sammenlign'] },
    { title: 'Virksomheden', links: ['Om os', 'Referencer', 'Proces', 'Kontakt'] },
  ],
  legal: ['© 2026 SmartFilm Danmark', 'Privatlivspolitik', 'Cookies', 'CVR 00000000'],
};

/** The three templates, for the chooser at /template. */
export const TEMPLATES = [
  {
    slug: 'stage',
    index: 'A',
    name: 'Stage',
    reference: 'Porsche',
    blurb: 'Billedet fører. Siden er en række fuldskærmsbilleder med teksten sat ned i venstre hjørne af hvert af dem, korte sætninger og pilleknapper. Mindst tekst, størst effekt.',
    image: IMG.facadeMonolith,
    alt: ALT.facadeMonolith,
  },
  {
    slug: 'index',
    index: 'B',
    name: 'Index',
    reference: 'Audi · katalog',
    blurb: 'Typografien fører. Hvidt, teknisk og opslagsværksagtigt: nummereret indholdsfortegnelse, versaler med bred spatiering, billeder i faste felter og billedtekster ude i margenen.',
    image: IMG.facadeGeometric,
    alt: ALT.facadeGeometric,
  },
  {
    slug: 'vitrine',
    index: 'C',
    name: 'Vitrine',
    reference: 'Modehus',
    blurb: 'Mørket fører. Næsten sort hele vejen, høj-kontrast antikva i stor grad, delt skærm hvor billedet står stille mens teksten ruller, og champagne brugt hvor den virker bedst.',
    image: IMG.nightQuarter,
    alt: ALT.nightQuarter,
  },
];
