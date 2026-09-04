import { L, type Localized } from './types';

export const HOME = {
  hero: {
    eyebrow: L('Smart Film · LED Film · 3D Media Glass', 'Smart Film · LED Film · 3D Media Glass'),
    title: L('Glas, der fortæller', 'Glass that tells'),
    titleEm: L('historier', 'stories'),
    sub: L(
      'Arkitektonisk lysteknologi i absolut topklasse – skræddersyet til facader, butikker og rum, hvor det almindelige ikke er nok.',
      'Architectural light technology at the very top tier – tailored to facades, stores and spaces where ordinary is not enough.',
    ),
    meta: [
      { label: L('Transparens', 'Transparency'), value: '99 %' },
      { label: L('Tykkelse', 'Thickness'), value: '2 mm' },
      { label: L('Synsvinkel', 'Viewing angle'), value: '160°' },
    ],
  },
  partner: {
    eyebrow: L('Mere end en skærm', 'More than a screen'),
    title: L('En teknologisk', 'A trusted technology'),
    titleEm: L('samarbejdspartner.', 'partner.'),
    body: L(
      'SmartFilm Danmark er skabt med udgangspunkt i smart glas. I dag arbejder vi med langt mere end film og LED. Vi samarbejder med arkitekter, brand-kæder, butiksindrettere og ejendomsudviklere om løsninger, hvor design, teknik og oplevelse er afgørende.',
      'SmartFilm Danmark was founded with a focus on smart glass. Today we work with far more than film and LED. We collaborate with architects, retail chains, interior designers and property developers on solutions where design, engineering and experience are paramount.',
    ),
  },
  positioning: {
    eyebrow: L('Positionen', 'Where we stand'),
    title: L('Vi gør glasset til', 'We turn glass into'),
    titleEm: L('den flade, folk husker.', 'the surface people remember.'),
    body: L(
      'Vi samler de bedste internationale glasteknologier under ét dansk brand, og står for rådgivning, montering og service. Fra første opmåling til driften bagefter.',
      'We gather the best international glass technologies under one Danish brand, and handle advice, installation and service. From the first survey to the operation afterwards.',
    ),
    cta: L('Om SmartFilm Danmark', 'About SmartFilm Danmark'),
  },
  collection: {
    eyebrow: L('Kollektionen', 'The collection'),
    title: L('Tre teknologier.', 'Three technologies.'),
    titleEm: L('Ét formål.', 'One purpose.'),
  },
  reference: {
    eyebrow: L('Teknologi med 150+ patenter bag', 'Technology backed by 150+ patents'),
    title: L(
      'Fra internationale lufthavne til danske butiksfacader',
      'From international airports to Danish storefronts',
    ),
    cta: L('Se referencer', 'See references'),
  },
  endCta: {
    title: L('Skal vi se på', 'Shall we look at'),
    titleEm: L('dit glasparti?', 'your glass?'),
    body: L(
      'Send målene, så vender vi tilbage med et uforpligtende overslag inden for 24 timer på hverdage.',
      'Send us the measurements and we will come back with a no-obligation estimate within 24 hours on weekdays.',
    ),
  },
};

export const PRODUKTER = {
  eyebrow: L('Kollektionen', 'The collection'),
  title: L('Tre teknologier.', 'Three technologies.'),
  titleEm: L('Ét formål.', 'One purpose.'),
  lead: L(
    'Alle tre gør det samme grundlæggende: de forvandler et glasparti til noget, der kan skifte udtryk. Forskellen ligger i hvordan — og i hvad du vil opnå.',
    'All three do the same thing at heart: they turn a pane of glass into something that can change its expression. The difference lies in how — and in what you want to achieve.',
  ),
  comparison: {
    eyebrow: L('Sammenligning', 'Comparison'),
    title: L('Hvad skiller dem ad', 'What sets them apart'),
    note: L(
      'Tallene er produktmaksima. Det opnåelige afhænger af glastype, montering og lysforhold på stedet.',
      'The figures are product maxima. What is achievable depends on glass type, installation and the light on site.',
    ),
    rows: [
      {
        label: L('Formål', 'Purpose'),
        values: [L('Privatliv', 'Privacy'), L('Medieflade', 'Media surface'), L('Blikfang', 'Attention')],
      },
      {
        label: L('Teknologi', 'Technology'),
        values: [L('PDLC', 'PDLC'), L('Transparent LED', 'Transparent LED'), L('Immersiv 3D', 'Immersive 3D')],
      },
      {
        label: L('Transparens', 'Transparency'),
        values: [L('Op til 92 %', 'Up to 92%'), L('Op til 99 %', 'Up to 99%'), L('Op til 85 %', 'Up to 85%')],
      },
      {
        label: L('Viser indhold', 'Shows content'),
        values: [
          L('Nej – skifter mellem klar og mat', 'No – switches between clear and frosted'),
          L('Ja – video og grafik', 'Yes – video and graphics'),
          L('Ja – i 3D', 'Yes – in 3D'),
        ],
      },
      {
        label: L('Særkende', 'Signature'),
        values: [
          L('Fungerer som projektionsskærm', 'Doubles as a projection screen'),
          L('Ca. 2 mm tyk, næsten usynlig slukket', 'Approx. 2mm thick, near-invisible when off'),
          L('160° synsvinkel', '160° viewing angle'),
        ],
      },
    ],
  },
};

export const REFERENCER = {
  eyebrow: L('Referencer', 'References'),
  title: L('Fra lufthavne til', 'From airports to'),
  titleEm: L('butiksfacader', 'storefronts'),
  lead: L(
    'Teknologierne bag vores løsninger sidder i alt fra internationale terminaler til danske butiksvinduer. Herunder et udvalg af installationstyper.',
    'The technologies behind our solutions sit in everything from international terminals to Danish shop windows. Below is a selection of installation types.',
  ),
  cases: {
    eyebrow: L('Installationstyper', 'Installation types'),
    title: L('Hvor det typisk sidder', 'Where it typically sits'),
    items: [
      {
        title: L('Mediefacade', 'Media facade'),
        body: L(
          'Transparent LED monteret indvendigt på en eksisterende glasfacade. Facaden bliver en skærm efter mørkets frembrud og en almindelig rude om dagen.',
          'Transparent LED mounted on the inside of an existing glass facade. The facade becomes a screen after dark and an ordinary window by day.',
        ),
      },
      {
        title: L('Butiksvindue', 'Shop window'),
        body: L(
          'Vinduespartiet bruges til kampagner uden at lukke udsynet til butikken. Indholdet skiftes centralt, uden fysisk skiltning.',
          'The window is used for campaigns without closing off the view into the store. Content is changed centrally, with no physical signage.',
        ),
      },
      {
        title: L('Mødelokale og klinik', 'Meeting room and clinic'),
        body: L(
          'Smart film i glasvægge, hvor privatliv skal kunne slås til og fra. Erstatter persienner og gardiner helt.',
          'Smart film in glass walls where privacy needs to be switched on and off. It replaces blinds and curtains entirely.',
        ),
      },
    ],
  },
};

export const OM_OS = {
  eyebrow: L('Om os', 'About us'),
  title: L('En teknologisk', 'A technology'),
  titleEm: L('samarbejdspartner', 'partner'),
  lead: L(
    'SmartFilm Danmark er skabt med udgangspunkt i smart glas. I dag arbejder vi med langt mere end film og LED — vi hjælper arkitekter, kæder og ejendomsudviklere med at gøre glasset til den mest værdifulde flade i byggeriet.',
    'SmartFilm Danmark was founded on smart glass. Today we work with far more than film and LED — we help architects, chains and property developers make glass the most valuable surface in a building.',
  ),
  statement: {
    eyebrow: L('Innovation & DNA', 'Innovation & DNA'),
    title: L('Innovation er en del af vores DNA', 'Innovation is part of our DNA'),
    points: [
      {
        title: L('Vi tør udfordre det eksisterende', 'We dare to challenge the status quo'),
        body: L(
          'Vi tror på, at fremtidens byrum og butiksoplevelser skabes af dem, der tør gøre glas til mere end en rude. Derfor investerer vi løbende i innovation og ny lysteknologi.',
          'We believe the cityscapes and retail experiences of the future are created by those who dare to make glass more than a pane. That is why we continuously invest in innovation and new light technology.',
        ),
      },
      {
        title: L('Verdens bedste teknologier', 'The world’s best technologies'),
        body: L(
          'Vores strategi er enkel: at samle de bedste og mest betroede internationale teknologier under ét stærkt dansk brand – med 150+ patenter bag.',
          'Our strategy is simple: to gather the best and most trusted international technologies under one strong Danish brand – backed by more than 150 patents.',
        ),
      },
      {
        title: L('Stærke partnerskaber skaber fremtiden', 'Strong partnerships shape the future'),
        body: L(
          'Vi bygger relationer med arkitekter, brands og integratorer, der deler vores ambition om at skabe fremtidens glasoplevelser. De største fremskridt skabes gennem samarbejde.',
          'We build relationships with architects, brands and integrators who share our ambition to create the glass experiences of tomorrow. The greatest advances are made through collaboration.',
        ),
      },
    ],
  },
  quote: {
    eyebrow: L('Vores filosofi', 'Our philosophy'),
    text: L(
      '»Man køber ikke en skærm. Man køber det øjeblik, hvor folk standser op og kigger.«',
      '“You’re not buying a screen. You’re buying the moment people stop and look.”',
    ),
  },
};

export const KONTAKT = {
  eyebrow: L('Kontakt', 'Contact'),
  title: L('Lad os tale om', 'Let’s talk about'),
  titleEm: L('dit projekt', 'your project'),
  lead: L(
    'Fortæl os om glaspartiet — mål, placering og hvad det skal kunne. Så vender vi tilbage med et uforpligtende overslag inden for 24 timer på hverdage.',
    'Tell us about the glass — measurements, location and what it needs to do. We will come back with a no-obligation estimate within 24 hours on weekdays.',
  ),
  formIntro: L(
    'Alle løsninger prissættes individuelt efter mål, pixelafstand og montering. Skriv til os og modtag et diskret, uforpligtende tilbud inden for 24 timer.',
    'All solutions are priced individually based on size, pixel pitch and installation. Write to us and receive a discreet, no-obligation quote within 24 hours.',
  ),
};

/** Page metadata, kept beside the copy it describes. */
export const META: Record<string, { title: string; description: Localized; og: string }> = {
  home: {
    title: 'SmartFilm Danmark – Smart Film · LED Film · 3D Media Glass',
    description: L(
      'Arkitektonisk lysteknologi i topklasse. Smart film, transparent LED-film og 3D medieglas – skræddersyet til facader, butikker og rum i hele Danmark.',
      'Architectural light technology at the top tier. Smart film, transparent LED film and 3D media glass – tailored to facades, stores and spaces across Denmark.',
    ),
    og: '/assets/hero-poster.jpg',
  },
  produkter: {
    title: 'Produkter – Smart Film, LED Film og 3D Media Glass',
    description: L(
      'Sammenlign de tre glasteknologier: PDLC smart film, transparent LED-film og 3D medieglas. Transparens, tykkelse, styring og anvendelse side om side.',
      'Compare the three glass technologies: PDLC smart film, transparent LED film and 3D media glass. Transparency, thickness, control and use side by side.',
    ),
    og: '/assets/p2-poster.jpg',
  },
  referencer: {
    title: 'Referencer – SmartFilm Danmark',
    description: L(
      'Installationstyper og udvalgte glasløsninger: mediefacader, butiksvinduer og mødelokaler med smart film, transparent LED og 3D medieglas.',
      'Installation types and selected glass solutions: media facades, shop windows and meeting rooms with smart film, transparent LED and 3D media glass.',
    ),
    og: '/assets/ref-poster.jpg',
  },
  'om-os': {
    title: 'Om os – SmartFilm Danmark',
    description: L(
      'SmartFilm Danmark samler de bedste internationale glasteknologier under ét dansk brand – med rådgivning, montering og service i hele Danmark.',
      'SmartFilm Danmark gathers the best international glass technologies under one Danish brand – with advice, installation and service across Denmark.',
    ),
    og: '/assets/hero-poster.jpg',
  },
  kontakt: {
    title: 'Kontakt – SmartFilm Danmark',
    description: L(
      'Få et uforpligtende overslag på dit glasparti inden for 24 timer på hverdage. Levering og montering i hele Danmark.',
      'Get a no-obligation estimate for your glass within 24 hours on weekdays. Delivery and installation across Denmark.',
    ),
    og: '/assets/hero-poster.jpg',
  },
};

export type PageCopy = typeof HOME;
export type { Localized };
