/**
 * Every Danish word on the site, in one file. The English twin is en.ts,
 * typed against DA at the bottom of this file, so a string added here and
 * forgotten there is a type error rather than a gap on the page.
 *
 * The copy is the client's approved copy, carried over unchanged from the
 * page this replaced. The additions are SMART_FILM, which is the product
 * they asked to add, and PRIVACY, the privacy policy the old site lost.
 */

export const SITE = {
  name: 'SmartFilm',
  full: 'SmartFilm Danmark',
  url: 'https://smartfilmdanmark.dk',
  email: 'kontakt@smartfilmdanmark.dk',
  phone: '+45 28 68 90 50',
  phoneHref: 'tel:+4528689050',
  /** The company behind the name, as the CVR register has it. */
  company: 'Nitrogen Danmark ApS',
  street: 'Industriholmen 82',
  city: '2650 Hvidovre',
  /** Digits only. The label in front of it is UI.cvr, so it follows the language. */
  cvr: '38155385',
};

/** The words that belong to no section — the header, the form's facts, the footer. */
export const UI = {
  title: 'SmartFilm Danmark · Transparent LED-film og smart film til glas',
  skip: 'Gå til indhold',
  mainNav: 'Hovedmenu',
  shortcuts: 'Genveje',
  menu: 'Menu',
  close: 'Luk',
  call: 'Ring',
  cta: 'Få et tilbud',
  contact: 'Kontakt',
  area: 'Levering og montering i hele Danmark',
  reply: 'Tilbud inden for 24 timer på hverdage',
  facts: { email: 'E-mail', phone: 'Telefon', area: 'Område', reply: 'Svartid' },
  cvr: 'CVR-nr.',
  home: 'Forsiden',
  /** The switch names the language it goes to, in that language. */
  switchTo: { lang: 'en', code: 'EN', label: 'Read in English' },
};

/**
 * Two either side of the wordmark. Spørgsmål is deliberately absent: five
 * items plus a wordmark and a button left 8px of slack at 1140, and an even
 * split is the point of putting the wordmark in the middle. It is in the
 * footer and the phone menu.
 */
export const NAV_LEFT = [
  { href: '#saadan', label: 'Sådan virker det' },
  { href: '#specs', label: 'Specifikationer' },
];

export const NAV_RIGHT = [
  { href: '#klar', label: 'Klar eller mat' },
  { href: '#anvendelse', label: 'Anvendelse' },
];

export const HERO = {
  kicker: 'Transparent LED-film',
  headline: 'Usynlig. Indtil den tændes.',
  sub: '2 mm film på glasset gør ruden til en skærm, uden at lukke dagslyset ude.',
  strap: 'Transparent LED-film · Levering og montering i hele Danmark',
  cta: 'Få et tilbud',
  chip: '02 mm film',
  scroll: { text: 'Rul ned', label: 'Rul ned til produkterne', href: '#produkter' },
  video: '/assets/hero-scrub.mp4',
  poster: '/assets/hero-poster.jpg',
  still: '/assets/hero-static.jpg',
};

/**
 * What the site sells, named straight under the hero. The page used to reach
 * the second product only halfway down, so a reader on a phone scrolled four
 * screens of LED film before learning there was anything else for sale.
 *
 * Nothing here is a new claim: every figure and phrase is lifted from the
 * client's own copy further down the page, except the Smart Film "egnet til"
 * rooms, which come from CONTENT-REQUEST.md.
 */
export const PRODUCTS = {
  kicker: 'Produkter',
  headline: 'To slags film til glas.',
  lede: 'Den ene gør ruden til en skærm. Den anden gør den mat på en kontakt. Vi leverer og monterer begge i hele Danmark.',
  forLabel: 'Egnet til',
  items: [
    {
      name: 'Transparent LED-film',
      claim: 'Ruden bliver en skærm.',
      body: '2 mm film klæbes på glasset indefra og viser video og kampagner, uden at lukke dagslyset ude.',
      points: ['Op til 99 % transparens', 'Skift indhold fra din telefon', 'Intet stillads, ingen lukkedage'],
      for: 'Butiksvinduer, storcentre, kontorer og klinikker',
      href: '#demo',
      cta: 'Se den tænde',
      image: '/assets/vis-butik.jpg',
      alt: 'Visualisering af en butiksfacade, hvor ruden viser en kampagne, mens butikken bagved stadig ses.',
    },
    {
      name: 'Smart Film',
      claim: 'Ruden bliver mat. På en kontakt.',
      body: 'Et lag film lamineret ind i ruden. Strøm på, og glasset er klart; strøm af, og det er mat.',
      points: ['92 % transparens, klar', 'Skifter på under et sekund', 'Privat uden at blive mørkt'],
      for: 'Mødelokaler, klinikker og badeværelser',
      href: '#klar',
      cta: 'Prøv kontakten',
      /** The same stand-in as the Smart Film section — see SMART_FILM.image. */
      image: '/assets/vis-klinik.jpg',
      alt: 'Glasparti ind til en klinik. Den venstre rude er mat, den højre er klar, så receptionen bagved ses.',
      panes: ['Mat', 'Klar'],
    },
  ],
};

export const STEPS = {
  kicker: 'Sådan virker det',
  headline: 'Tre skridt. Butikken holder åbent.',
  lede: 'Filmen sættes på indefra. Der skal ikke bygges noget, og facaden ændres ikke.',
  items: [
    {
      n: '01',
      title: 'Vi måler glasset',
      body: 'Mål, glastype og retning mod solen. Det afgør pixelafstand og lysstyrke, og dermed prisen.',
    },
    {
      n: '02',
      title: 'Filmen sættes på indefra',
      body: 'Den klæbes direkte på ruden. Intet stillads, ingen ny konstruktion, ingen lukkedage.',
    },
    {
      n: '03',
      title: 'Du styrer indholdet',
      body: 'Skift kampagne, åbningstider eller video fra din telefon. Planlæg det i forvejen og lad den køre.',
    },
  ],
};

export const SPECS = {
  kicker: 'Specifikationer',
  headline: 'Tallene, med betingelserne på.',
  lede: 'Et tal uden en betingelse er en skuffelse, der venter. Her er begge dele.',
  items: [
    { value: '99 %', label: 'Transparens', note: 'Op til. Falder, mens indhold spiller.' },
    { value: '2 mm', label: 'Tykkelse', note: 'Klæbes på ruden indefra.' },
    { value: '160°', label: 'Synsvinkel', note: 'Læsbar fra hele fortovet.' },
    { value: '150+', label: 'Patenter', note: 'Bag teknologien i filmen.' },
  ],
};

export const DEMO = {
  kicker: 'Transparent LED-film',
  headline: 'Hold for at tænde.',
  lede: 'Slukket er den næsten ikke der. Tændt er den hele vinduet. Hold knappen nede, og se hvad ruden bliver til.',
  word: 'Åbent',
  hold: 'Hold nede',
  holding: 'Bliv ved…',
  lit: 'Tændt',
  hint: 'Hold museknappen eller fingeren nede. Slipper du, falder lyset tilbage.',
  /** Each line arrives at its own point on the way up, hence the threshold. */
  reveals: [
    { at: 0.34, text: 'Indholdet skiftes på minutter, ikke på en uge med ny folie.' },
    { at: 0.52, text: 'Slukket om natten er ruden bare en rude igen.' },
    { at: 0.7, text: 'Én flade, mange budskaber, og plads til at sælge annoncetid videre.' },
  ],
};

/**
 * The second product, and the only thing on the page the reader operates
 * rather than reads. It is built as a switch because the product is a switch,
 * and the readout reports the change in the electrician's terms: clear costs
 * power, matte is the resting state.
 */
export const SMART_FILM = {
  kicker: 'Smart Film',
  headline: 'Klart eller mat. På en kontakt.',
  lede: 'Et lag film lamineret ind i ruden. Strøm på, og glasset er klart; strøm af, og det er mat. Kontakten sidder der, hvor lyskontakten allerede sad.',
  states: { mat: 'Mat', klar: 'Klar' },
  readout: { mat: 'Strøm fra · ruden er privat', klar: 'Strøm til · ruden er klar' },
  action: 'Mattér ruden',
  figures: [
    { value: '92 %', label: 'Transparens, klar' },
    { value: '<1 sek.', label: 'Skiftetid' },
    { value: '5 W/m²', label: 'Forbrug, klar' },
  ],
  note: 'Mat er ikke mørkt. Filmen spreder dagslyset i stedet for at lukke det ude, så rummet bliver privat uden at blive mørkt — og det er hele forskellen på film og persienner.',
  /**
   * PLACEHOLDER. Every photograph here is an LED visualisation, so this one is
   * zoomed hard into its right-hand third — the reception behind plain glass —
   * to keep the campaign on the left out of frame. Clear glass revealing an
   * advert would read as the wrong product. Wants a real Smart Film shot: one
   * tripod position, matte and clear.
   */
  image: '/assets/vis-klinik.jpg',
  alt: {
    mat: 'Glasparti ind til en klinik. De tre ruder står mattede, så receptionen bagved kun anes som lys og skygge.',
    klar: 'Glasparti ind til en klinik. Ruderne er klare, og receptionen og indretningen bagved ses tydeligt.',
  },
};

export const REFS = {
  kicker: 'Anvendelse',
  headline: 'Sådan kan det se ud.',
  lede: 'Visualiseringer af transparent LED-film i danske sammenhænge, fra en hel kontorfacade til en enkelt rude mod gågaden.',
  badge: 'Visualisering',
  items: [
    {
      image: '/assets/vis-kontor.jpg',
      width: 625,
      height: 621,
      alt: 'Visualisering af en kontorbygning om aftenen, hvor glasfacaden viser store lysende motiver i blå og orange.',
      title: 'Kontorer og hovedsæder',
      body: 'Hele facaden bliver til budskabet, uden at der bygges noget udenpå.',
    },
    {
      image: '/assets/vis-storcenter.jpg',
      width: 943,
      height: 621,
      alt: 'Visualisering af et storcenter i skumringen, hvor de buede glaspartier over indgangen viser farverige motiver.',
      title: 'Storcentre',
      body: 'Store glaspartier uden tunge konstruktioner. Én flade, mange budskaber.',
    },
    {
      image: '/assets/vis-butik.jpg',
      width: 943,
      height: 621,
      alt: 'Visualisering af en butiksfacade i et indkøbscenter, hvor ruden viser en kampagne, mens butikken bagved stadig ses.',
      title: 'Butiksvinduer',
      body: 'Kampagnen skifter på minutter i stedet for en uge med ny folie.',
    },
    {
      image: '/assets/vis-klinik.jpg',
      width: 943,
      height: 621,
      alt: 'Visualisering af en klinik i et indkøbscenter, hvor ruden viser en rolig kampagne med receptionen synlig bagved.',
      title: 'Klinikker og wellness',
      body: 'Diskret og professionelt, uden at lukke af for det lyse indtryk indenfor.',
    },
  ],
};

export const FAQ = {
  kicker: 'Spørgsmål',
  headline: 'Det folk spørger om først.',
  lede: 'Også de spørgsmål, hvor det ærlige svar er "det kommer an på".',
  items: [
    {
      q: 'Kan man se den i dagslys?',
      a: 'Det afhænger af lysstyrken og hvilken vej ruden vender. En film til indendørs brug ligger typisk på 800 til 2.000 nits, og den taber mod et vindue i direkte sol. Vender ruden mod gaden eller mod syd, skal du have en udendørsserie med væsentligt højere lysstyrke. Vi spørger altid om verdenshjørnet, før vi giver en pris, for det er den hyppigste årsag til skuffelse i den her branche.',
    },
    {
      q: 'Skjuler den mine varer i vinduet?',
      a: 'Delvist, mens der spiller indhold. Transparensen på databladet gælder den slukkede film. Når billedet kører, er der lys i vejen, og udstillingen bagved træder tilbage. Derfor planlægger vi placeringen efter, hvad der står i vinduet: en film over udstillingen eller på et sidefag giver dig skærmen uden at lukke for varerne.',
    },
    {
      q: 'Er den helt usynlig, når den er slukket?',
      a: 'Nej, og det skal du ikke købe den på. På afstand forsvinder den. Står du tæt på ruden, kan du se gitteret af ledninger og dioder, ligesom du kan se trådene i et insektnet. Folk der forventer usynligt glas bliver skuffede. Folk der forventer en næsten usynlig skærm bliver glade.',
    },
    {
      q: 'Passer den på mit glas?',
      a: 'Som regel, men det skal tjekkes først. Hærdet, lamineret, buet og energiruder med belægning opfører sig forskelligt, og på nogle typer må filmen ikke klæbes direkte. Send os et billede og målene, så siger vi det inden du bruger penge.',
    },
    {
      q: 'Hvad koster det?',
      a: 'Det prissættes individuelt efter mål, pixelafstand, lysstyrke og montering. Vi giver ikke en kvadratmeterpris uden at kende ruden, fordi det tal altid bliver forkert. Skriv målene og hvad ruden bruges til, så har du et rigtigt tilbud inden for et døgn på hverdage.',
    },
  ],
};

export const QUOTE = {
  kicker: 'Få et tilbud',
  headline: 'Fortæl os om ruden.',
  lede: 'Mål og et billede er nok til at komme i gang. Du får et rigtigt tal tilbage, ikke et spænd.',
  submit: 'Send forespørgsel',
  subject: 'Forespørgsel fra smartfilmdanmark.dk',
  hint: 'Knappen åbner dit eget mailprogram med beskeden klar. Felter med * er påkrævede.',
  summary: 'Ret venligst følgende, før du sender:',
  sent: {
    title: 'Dit mailprogram er åbnet',
    body: 'Beskeden ligger klar til kontakt@smartfilmdanmark.dk. Tryk send i dit mailprogram, så har du svar inden for 24 timer på hverdage.',
  },
  fields: {
    name: { label: 'Navn', error: 'Skriv venligst dit navn.' },
    company: { label: 'Firma' },
    email: { label: 'E-mail', error: 'Skriv en gyldig e-mailadresse, fx navn@firma.dk.' },
    phone: { label: 'Telefon' },
    size: { label: 'Mål på glasset', placeholder: 'Fx 6 x 3 meter, mod gågaden' },
    message: { label: 'Besked', placeholder: 'Hvad skal ruden bruges til, og hvilken vej vender den?' },
  },
};

export const FOOTER = {
  privacy: 'Privatlivspolitik',
  tagline: 'Transparent LED-film og smart film til glas. Levering og montering i hele Danmark.',
  columns: [
    {
      title: 'Indhold',
      /** Also the phone menu, which is the full menu for every width under 1080. */
      links: [
        { href: '#produkter', label: 'Produkter' },
        { href: '#saadan', label: 'Sådan virker det' },
        { href: '#specs', label: 'Specifikationer' },
        { href: '#klar', label: 'Klar eller mat' },
        { href: '#anvendelse', label: 'Anvendelse' },
        { href: '#faq', label: 'Spørgsmål' },
      ],
    },
  ],
};

/**
 * The privacy policy at /privatlivspolitik. Written for what the site actually
 * does: the form opens the reader's own mail program, nothing is stored on a
 * server, and the only thing kept in the browser is the reader's own choices.
 */
export const PRIVACY = {
  title: 'Privatlivspolitik · SmartFilm Danmark',
  headline: 'Privatlivspolitik',
  updated: 'Senest opdateret 25. september 2026',
  lede: 'Her kan du læse, hvilke oplysninger vi får om dig, hvad vi bruger dem til, og hvilke rettigheder du har.',
  sections: [
    {
      title: 'Hvem er ansvarlig',
      body: [
        `${SITE.full} drives af ${SITE.company}, ${SITE.street}, ${SITE.city}, CVR-nr. ${SITE.cvr}, som er dataansvarlig for de oplysninger, vi behandler om dig. Du kan altid kontakte os på ${SITE.email} eller ${SITE.phone}.`,
      ],
    },
    {
      title: 'Hvilke oplysninger vi får',
      body: [
        'Når du skriver eller ringer til os, får vi de oplysninger, du selv giver: typisk navn, firma, e-mail, telefonnummer og oplysninger om den rude, opgaven drejer sig om.',
        'Formularen på siden gemmer ingenting. Den åbner dit eget mailprogram, og beskeden går direkte fra dig til os.',
      ],
    },
    {
      title: 'Hvad vi bruger dem til',
      body: [
        'Vi bruger oplysningerne til at besvare din henvendelse, give dig et tilbud og, hvis du bliver kunde, levere, montere og fakturere opgaven.',
        'Grundlaget er, at vi skal kunne give dig et tilbud og opfylde en aftale med dig (databeskyttelsesforordningens artikel 6, stk. 1, litra b), og at bogføringsloven kræver, at vi gemmer regnskabsbilag (litra c).',
      ],
    },
    {
      title: 'Hvem vi deler dem med',
      body: [
        'Vi sælger aldrig dine oplysninger. De kan blive behandlet af de leverandører, vi bruger til at drive virksomheden — fx e-mail, hosting og regnskab — og kun på vores vegne. Ellers videregiver vi dem kun, hvis loven kræver det.',
      ],
    },
    {
      title: 'Hvor længe vi gemmer dem',
      body: [
        'Fører en henvendelse ikke til en opgave, sletter vi den, når den ikke længere er relevant, og senest efter et år. Bliver du kunde, gemmer vi fakturaer og regnskabsbilag i fem år, som bogføringsloven kræver.',
      ],
    },
    {
      title: 'Cookies',
      body: [
        'Vi bruger ikke cookies til statistik eller markedsføring. Siden husker kun dine egne valg, fx sprog, og det gemmes i din browser — ikke hos os.',
        'Som ved alle hjemmesider modtager serveren, der viser siden, teknisk information som din IP-adresse. Den bruges kun til at sende siden til dig.',
      ],
    },
    {
      title: 'Dine rettigheder',
      body: [
        'Du har ret til at se de oplysninger, vi har om dig, og til at få dem rettet eller slettet. Du kan også gøre indsigelse mod vores behandling, bede os begrænse den eller få dine oplysninger udleveret. Skriv til os, så svarer vi senest inden for en måned.',
        'Er du utilfreds med, hvordan vi behandler dine oplysninger, kan du klage til Datatilsynet på datatilsynet.dk.',
      ],
    },
  ],
};

/**
 * The three grounds the client is choosing between. Same page, same type,
 * same layout — only the colour moves, which is the only honest way to judge
 * colour. The values themselves live in globals.css; this is the picker's
 * list, and the swatches are each theme's ground and accent, the two colours
 * that actually decide how the page feels.
 */
export const THEMES = [
  { id: 'dagslys', label: 'Dagslys', bg: '#F8F5F1', fg: '#1E63C4' },
  { id: 'teknisk', label: 'Teknisk', bg: '#070910', fg: '#4D9FFF' },
  { id: 'luksus', label: 'Luksus', bg: '#141110', fg: '#C9A227' },
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];

/** Everything a reader sees, bundled so en.ts can mirror it exactly. */
export const DA = { UI, NAV_LEFT, NAV_RIGHT, HERO, PRODUCTS, STEPS, SPECS, DEMO, SMART_FILM, REFS, FAQ, QUOTE, FOOTER, PRIVACY };

export type Content = typeof DA;
