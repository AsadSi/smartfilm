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

/** Photography. All Pexels, licence and provenance in assets/pexels/CREDITS.md.
    Named by the product each one stands in for rather than by what it literally
    depicts, so replacing one with a real SmartFilm installation shot later is a
    one-line swap and nothing else moves. */
export const IMG = {
  filmPrivacy: '/assets/pexels/film-privacy.jpg',
  filmOffice: '/assets/pexels/film-office.jpg',
  filmDoors: '/assets/pexels/film-doors.jpg',
  filmTexture: '/assets/pexels/film-texture.jpg',
  ledAirport: '/assets/pexels/led-airport.jpg',
  ledFacade: '/assets/pexels/led-facade.jpg',
  ledRetail: '/assets/pexels/led-retail.jpg',
  ledCity: '/assets/pexels/led-city.jpg',
  glassImmersive: '/assets/pexels/glass-immersive.jpg',
  glassDepth: '/assets/pexels/glass-depth.jpg',
  glassArt: '/assets/pexels/glass-art.jpg',
  glassStructure: '/assets/pexels/glass-structure.jpg',
  klarFrost: '/assets/pexels/klar-frost.jpg',
  klarBloom: '/assets/pexels/klar-bloom.jpg',
  klarNeon: '/assets/pexels/klar-neon.jpg',
  klarGeometry: '/assets/pexels/klar-geometry.jpg',
  klarReflect: '/assets/pexels/klar-reflect.jpg',
  // G–K. Prefixed by template, because each was chosen to carry one scene of
  // one reference video rather than to stand in for a product.
  straaleOffice: '/assets/pexels/straale-office.jpg',
  taarnTower: '/assets/pexels/taarn-tower.jpg',
  taarnClouds: '/assets/pexels/taarn-clouds.jpg',
  taarnFacade: '/assets/pexels/taarn-facade.jpg',
  taarnInterior: '/assets/pexels/taarn-interior.jpg',
  taarnView: '/assets/pexels/taarn-view.jpg',
  paletSilk: '/assets/pexels/palet-silk.jpg',
  paletGrass: '/assets/pexels/palet-grass.jpg',
  paletPampas: '/assets/pexels/palet-pampas.jpg',
  udsigtHero: '/assets/pexels/udsigt-hero.jpg',
  udsigtPeak: '/assets/pexels/udsigt-peak.jpg',
  udsigtOffice: '/assets/pexels/udsigt-office.jpg',
  udsigtMeeting: '/assets/pexels/udsigt-meeting.jpg',
  udsigtHotel: '/assets/pexels/udsigt-hotel.jpg',
  udsigtHome: '/assets/pexels/udsigt-home.jpg',
  udsigtSpa: '/assets/pexels/udsigt-spa.jpg',
  udsigtBath: '/assets/pexels/udsigt-bath.jpg',
  udsigtRetail: '/assets/pexels/udsigt-retail.jpg',
  udsigtPool: '/assets/pexels/udsigt-pool.jpg',
  udsigtWindow: '/assets/pexels/udsigt-window.jpg',
  orbitRocks: '/assets/pexels/orbit-rocks.jpg',
  orbitAlps: '/assets/pexels/orbit-alps.jpg',
} as const;

export const ALT = {
  straaleOffice: 'Kontorgang med glasvægge ind til et mødelokale',
  taarnTower: 'Et slankt højhus der rejser sig over et skydække',
  taarnClouds: 'Skyer set fra oven',
  taarnFacade: 'Glasfacade i et tæt gitter af vinduer',
  taarnInterior: 'Stue med panoramavinduer ud over byen',
  taarnView: 'Kvinde ved et panoramavindue over byen i skumringen',
  paletSilk: 'Hvid silke i bløde folder',
  paletGrass: 'Mørkt græs set tæt på',
  paletPampas: 'Pampasgræs i modlys',
  udsigtHero: 'Snedækket bjergtop over et skyhav i lyserødt aftenlys',
  udsigtPeak: 'Bjergtinder der stikker op gennem skyerne',
  udsigtOffice: 'Mødelokale med glasvægge og udsigt til sneklædt skov',
  udsigtMeeting: 'Mødelokale bag glasvægge',
  udsigtHotel: 'Hotelværelse med panoramavindue ud mod stranden',
  udsigtHome: 'Moderne hus med store glaspartier ud mod haven',
  udsigtSpa: 'Spaafdeling med liggestole og kar',
  udsigtBath: 'Marmorbadeværelse med glasbruser',
  udsigtRetail: 'Butik med tasker og sko på hylder',
  udsigtPool: 'Kvinde i en infinitypool med udsigt til sneklædte bjerge',
  udsigtWindow: 'Kvinde der kigger ud ad et højt vindue',
  orbitRocks: 'Klippeformationer under en dramatisk himmel',
  orbitAlps: 'Alpesø mellem bjerge under blå himmel',
  filmPrivacy: 'To personer i silhuet bag en matteret glasvæg',
  filmOffice: 'Kontorafsnit bag riflede glaspartier',
  filmDoors: 'Lukkede matterede glasskydedøre',
  filmTexture: 'Nærbillede af en struktureret glasflade',
  ledAirport: 'Lufthavnsterminal med oplyste displaysøjler',
  ledFacade: 'Butikscenterfacade med LED i fuld højde om aftenen',
  ledRetail: 'Butiksfacade med lysende installation bag glasset',
  ledCity: 'Højhuse beklædt med LED efter mørkets frembrud',
  glassImmersive: 'Person i et rum af faldende lys',
  glassDepth: 'Neonrammer i hinanden, der giver dybde i en flad væg',
  glassArt: 'Silhuetter i en lysinstallation',
  glassStructure: 'Oplyst geometrisk konstruktion i en gård',
  klarFrost: 'Matteret glasflade set tæt på',
  klarBloom: 'Bylys set gennem en matteret rude',
  klarNeon: 'Lys diffunderet gennem en mat glasflade',
  klarGeometry: 'Riflede glaspaneler i en åbning',
  klarReflect: 'Riflet glasfacade i modlys',
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
    photo: IMG.filmPrivacy,
    alt: ALT.filmPrivacy,
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
    photo: IMG.ledFacade,
    alt: ALT.ledFacade,
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
    photo: IMG.glassImmersive,
    alt: ALT.glassImmersive,
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
    image: IMG.filmPrivacy,
    alt: ALT.filmPrivacy,
  },
  {
    key: 'ledfilm',
    label: 'LED Film',
    headline: 'Facaden vågner om aftenen.',
    lead: 'To millimeter LED-væv på indersiden af glasset. Dagslyset slipper stadig ind; udsynet bliver.',
    cta: 'Se LED Film',
    image: IMG.ledAirport,
    alt: ALT.ledAirport,
  },
  {
    key: 'glass',
    label: '3D Media Glass',
    headline: 'Dybde i få millimeter.',
    lead: 'Til lobbyer og flagskibsbutikker, hvor det første indtryk skal holde i timevis.',
    cta: 'Se 3D Media Glass',
    image: IMG.glassImmersive,
    alt: ALT.glassImmersive,
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
    image: IMG.filmOffice,
    alt: ALT.filmOffice,
  },
  {
    index: '02',
    label: 'Princip',
    headline: 'Dagslyset er ikke til forhandling',
    body: 'Persienner løser privatliv ved at fjerne lys. Det gør vores glas ikke: i mat tilstand spreder ruden stadig dagslyset. Rummet bliver privat uden at blive mørkt.',
    points: ['Diffust dagslys i mat tilstand', 'Ingen bevægelige dele at vedligeholde', 'Fungerer som projektionsflade'],
    image: IMG.filmDoors,
    alt: ALT.filmDoors,
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
  { image: IMG.ledCity, alt: ALT.ledCity, title: 'Tårn, facadeflade', meta: 'LED Film · 340 m² · Udendørs' },
  { image: IMG.filmTexture, alt: ALT.filmTexture, title: 'Hovedkontor, 4. sal', meta: 'Smart Film · 62 m² · Lamineret' },
  { image: IMG.ledRetail, alt: ALT.ledRetail, title: 'Flagskibsbutik, gadeplan', meta: 'LED Film · 26 m² · Indendørs' },
  { image: IMG.glassDepth, alt: ALT.glassDepth, title: 'Atrium, glasparti', meta: '3D Media Glass · 18 m² · Fritstående' },
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

/**
 * The panel sequence for F · Klar.
 *
 * `state` decides whether a panel is mat (dark) or klar (light). They alternate
 * the whole way down, so scrolling the page is watching a pane switch back and
 * forth — which is the entire product in one gesture.
 */
export const PANELS = [
  {
    id: 'titel',
    n: '00',
    label: 'SmartFilm',
    state: 'mat' as const,
    headline: 'Mat. Klar. På under et sekund.',
    body: 'Et lag film mellem to ruder gør et glasparti til en kontakt. Strøm på, og ruden er klar; strøm af, og den er privat.',
    media: { kind: 'video' as const, src: '/assets/hero.mp4', hevc: '/assets/optimized/hero.h265.mp4', poster: '/assets/hero-poster.jpg', alt: '' },
    cta: { label: 'Se serien', href: '#panel-1' },
  },
  {
    id: 'smart-film',
    n: '01',
    label: 'Smart Film',
    state: 'klar' as const,
    headline: 'Privatliv, uden at slukke lyset.',
    body: 'Persienner løser privatliv ved at fjerne dagslys. Det gør filmen ikke: i mat tilstand spreder ruden stadig lyset, så rummet bliver privat uden at blive mørkt.',
    figure: { value: '92', unit: '%', label: 'Transparens i klar tilstand' },
    media: { kind: 'image' as const, src: IMG.klarGeometry, alt: ALT.klarGeometry },
    cta: { label: 'Specifikationer', href: '#panel-4' },
  },
  {
    id: 'led-film',
    n: '02',
    label: 'LED Film',
    state: 'mat' as const,
    headline: 'Facaden vågner, når det bliver mørkt.',
    body: 'To millimeter LED-væv på indersiden af glasset. Om dagen er det næsten ikke til at få øje på; om aftenen er hele fladen et billede.',
    figure: { value: '2', unit: 'mm', label: 'Samlet tykkelse' },
    media: { kind: 'image' as const, src: IMG.ledAirport, alt: ALT.ledAirport },
    cta: { label: 'Specifikationer', href: '#panel-4' },
  },
  {
    id: '3d-media-glass',
    n: '03',
    label: '3D Media Glass',
    state: 'klar' as const,
    headline: 'Dybde i en flade på få millimeter.',
    body: 'Billedet står frit i glasset i stedet for at ligge på det. Det er den eneste af de tre, hvor folk standser op — og hele grunden til at vælge den.',
    figure: { value: '360', unit: '°', label: 'Synsvinkel uden tab' },
    media: { kind: 'image' as const, src: IMG.klarNeon, alt: ALT.klarNeon },
    cta: { label: 'Specifikationer', href: '#panel-4' },
  },
  {
    id: 'haandvaerket',
    n: '04',
    label: 'Håndværket',
    state: 'mat' as const,
    headline: 'Målt på stedet. Monteret af os.',
    body: 'Vi laver ikke standardstørrelser. Hvert parti måles op, produceres til den præcise åbning og monteres af vores eget hold — i hele Danmark.',
    media: { kind: 'image' as const, src: IMG.klarReflect, alt: ALT.klarReflect },
    cta: { label: 'Kontakt', href: '#panel-6' },
  },
  {
    id: 'kontakt',
    n: '06',
    label: 'Kontakt',
    state: 'mat' as const,
    headline: 'Fortæl os om åbningen.',
    body: 'Mål, placering og den effekt du er ude efter. Så har du et tilbud inden for 24 timer på hverdage.',
    media: { kind: 'image' as const, src: IMG.klarFrost, alt: ALT.klarFrost },
    cta: { label: 'Forespørg et tilbud', href: 'mailto:kontakt@smartfilmdanmark.dk' },
  },
];

/** The six directions, for the chooser at /template. */
export const TEMPLATES = [
  {
    slug: 'stage',
    index: 'A',
    name: 'Stage',
    reference: 'Porsche',
    room: 'Fuldskærm · billede',
    blurb: 'Billedet fører. Siden er en række fuldskærmsbilleder med teksten sat ned i venstre hjørne af hvert af dem, korte sætninger og pilleknapper. Mindst tekst, størst effekt.',
    image: IMG.ledAirport,
    alt: ALT.ledAirport,
  },
  {
    slug: 'vitrine',
    index: 'B',
    name: 'Vitrine',
    reference: 'Lamborghini',
    room: 'Mørk · kondenseret',
    blurb: 'Kraften fører. Næsten sort hele vejen, tunge versaler i kondenseret snit, hårde firkantede knapper, en skåret hjørne og en delt skærm hvor billedet står stille mens teksten ruller.',
    image: IMG.ledCity,
    alt: ALT.ledCity,
  },
  {
    slug: 'salon',
    index: 'C',
    name: 'Salon',
    reference: 'Smykkeskrinet',
    room: 'Mørk · centreret',
    blurb: 'Roen fører. Varmt næsten-sort, alt centreret og symmetrisk, hver flade lyst indefra med guldhårstreg om kanten. Antikva til udsagnene, spatierede versaler til alt andet. Butikken i lufthavnen klokken elleve om aftenen.',
    image: IMG.glassImmersive,
    alt: ALT.glassImmersive,
  },
  {
    slug: 'promenade',
    index: 'D',
    name: 'Promenade',
    reference: 'Atriet',
    room: 'Lys · sten',
    blurb: 'Materialet fører. Varm sten, varmt blæk og guld reduceret til en hårstreg. Skiltetypografi med bred spatiering, en skinne ned ad siden som alt hænger på, og billeder i høje buede portaler frem for firkanter.',
    image: IMG.glassStructure,
    alt: ALT.glassStructure,
  },
  {
    slug: 'lumen',
    index: 'E',
    name: 'Lumen',
    reference: 'Linear · Vercel',
    room: 'Lys · teknisk',
    blurb: 'Præcisionen fører. Næsten hvidt, moderat typografi og meget luft. Den eneste retning i sættet med afrundede hjørner — og det ene greb flytter siden fra arkitektur til produkt, før man har læst et ord. Bento-felter, mono-labels og et svagt punktgitter bagved.',
    image: IMG.filmTexture,
    alt: ALT.filmTexture,
  },
  {
    slug: 'klar',
    index: 'F',
    name: 'Klar',
    reference: 'Produktet selv',
    room: 'Skiftende · panelvis',
    blurb: 'Kontakten fører. Siden er bygget af helskærmspaneler, der ankommer mattede og klarner, når de glider på plads — og som skifter mellem mørk og lys hele vejen ned, så det at rulle er at se en rude skifte tilstand. Der er en rigtig MAT/KLAR-kontakt i kanten: slå den, og hele siden matteres. Sat i Switzer, den eneste skrift i sættet der ikke er fra Google.',
    image: IMG.klarNeon,
    alt: ALT.klarNeon,
  },
  {
    slug: 'straale',
    index: 'G',
    name: 'Stråle',
    reference: 'Huly',
    room: 'Mørk · lysstråle',
    blurb: 'Lyset fører. Næsten sort med blåt i, én lodret lysstråle i toppen og en orange glød forbeholdt det, man skal trykke på. Under strålen står styringen som et rigtigt app-vindue — vælg et rum, og ruden i forhåndsvisningen skifter. To gange skifter siden til en bleg, frostet grund, så den aldrig lægger sig fast som en mørk side.',
    image: IMG.straaleOffice,
    alt: ALT.straaleOffice,
  },
  {
    slug: 'taarn',
    index: 'H',
    name: 'Tårn',
    reference: 'Luksusbolig',
    room: 'Skumring · gennem vinduet',
    blurb: 'Udsigten fører. Et tårn i skyerne med overskriften delt på hver side af det, en hårfin didone i versaler og en støvet rosa skumring over det hele. Når man ruller, flyver siden ind i facaden og gennem et vindue — hvis ruder er mattede, indtil man er tæt nok på. Sat i Italiana.',
    image: IMG.taarnTower,
    alt: ALT.taarnTower,
  },
  {
    slug: 'palet',
    index: 'I',
    name: 'Palet',
    reference: 'Farvepaletter',
    room: 'Lys · produktskærme',
    blurb: 'Farven fører. En række produktskærme i tykke hvide rammer, hver med sin palet svævende over sig — og paletterne virker: vælg en, og skærmen farves om. Den første er altid grå, glasset slukket; de næste er glasset tændt. Kæmpeord i Unbounded med en glasrude stående foran.',
    image: IMG.paletPampas,
    alt: ALT.paletPampas,
  },
  {
    slug: 'udsigt',
    index: 'J',
    name: 'Udsigt',
    reference: 'LuxTrips',
    room: 'Lys · rejsebrochure',
    blurb: 'Stedet fører. Rosa sten og lilla dis, en let antikva sat enormt over landskabet og hele rejsesidens grammatik — søgefelt, rejsemål på en skinne, pakker, fliser og et "hvorfor os" over et bjerg — med rum der, hvor rejsemålene ville være. Sat i Cormorant Garamond.',
    image: IMG.udsigtHero,
    alt: ALT.udsigtHero,
  },
  {
    slug: 'orbit',
    index: 'K',
    name: 'Orbit',
    reference: 'Futuristisk',
    room: 'Mørk · enhedsramme',
    blurb: 'Formen fører. Hver skærm sidder i en enhedsramme med hak skåret ud af kanten: en kugle med en lysspalte, der skifter farve med produktet, en flade af orange og en blå himmel med en glasbue. Brede tekno-versaler i Michroma og mono til alt, der ligner en aflæsning.',
    image: IMG.orbitRocks,
    alt: ALT.orbitRocks,
  },
];

/**
 * The rooms on G · Stråle's control window. An illustration of the app, not a
 * reference list — the window says "Eksempel" on it for that reason.
 */
export const ZONES = [
  { id: 'moede', name: 'Mødelokale 1', floor: '4. sal', product: 'Smart Film', area: '12 m²', state: 'mat' as 'mat' | 'klar' },
  { id: 'direktion', name: 'Direktionskontor', floor: '4. sal', product: 'Smart Film', area: '9 m²', state: 'klar' as 'mat' | 'klar' },
  { id: 'reception', name: 'Reception', floor: 'Stuen', product: 'Smart Film', area: '18 m²', state: 'klar' as 'mat' | 'klar' },
  { id: 'bad', name: 'Wellness, bad', floor: '1. sal', product: 'Smart Film', area: '6 m²', state: 'mat' as 'mat' | 'klar' },
];

/**
 * The "destinations" of J · Udsigt. Uses, not installations: each is a kind of
 * room the glass is made for, so none of them claims a customer.
 */
export const ROOMS = [
  { key: 'moede', label: 'Mødelokaler', tag: 'Kontor', product: 'Smart Film', note: 'Privat på et tryk, lyst bagefter', image: IMG.udsigtOffice, alt: ALT.udsigtOffice },
  { key: 'hotel', label: 'Hotelværelser', tag: 'Hotel', product: 'Smart Film', note: 'Badeværelse og soveværelse i ét', image: IMG.udsigtHotel, alt: ALT.udsigtHotel },
  { key: 'bolig', label: 'Boliger', tag: 'Bolig', product: 'Smart Film', note: 'Ingen gardiner, ingen persienner', image: IMG.udsigtHome, alt: ALT.udsigtHome },
  { key: 'butik', label: 'Butikker', tag: 'Detail', product: 'LED Film', note: 'Vinduet bliver en skærm om aftenen', image: IMG.udsigtRetail, alt: ALT.udsigtRetail },
  { key: 'spa', label: 'Spa & wellness', tag: 'Hotel', product: 'Smart Film', note: 'Dagslys uden indkig', image: IMG.udsigtSpa, alt: ALT.udsigtSpa },
  { key: 'bad', label: 'Badeværelser', tag: 'Bolig', product: 'Smart Film', note: 'En glasbruser, der kan blive mat', image: IMG.udsigtBath, alt: ALT.udsigtBath },
  { key: 'lobby', label: 'Lobbyer', tag: 'Kontor', product: '3D Media Glass', note: 'Første indtryk, der holder', image: IMG.glassImmersive, alt: ALT.glassImmersive },
  { key: 'facade', label: 'Facader', tag: 'Detail', product: 'LED Film', note: 'Medieflade uden at blive en skærm', image: IMG.ledFacade, alt: ALT.ledFacade },
];
