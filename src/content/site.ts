import { L, type Localized } from './types';

export const SITE = {
  name: 'SmartFilm Danmark',
  url: 'https://smartfilmdanmark.dk',
  email: 'kontakt@smartfilmdanmark.dk',
  phone: '+45 28 68 90 50',
  phoneHref: '+4528689050',
  /** The form posts here; the endpoint mails the enquiry on. */
  /**
   * Enquiries post to our own route handler, which validates the payload and
   * mails it on. They previously went straight to a free third-party relay with
   * captcha disabled, while the form promised confidentiality — a GDPR problem
   * as much as a credibility one, since project details left our control before
   * they reached anyone at SmartFilm.
   */
  formEndpoint: '/api/enquiry',
  /** Danish businesses are expected to state this; its absence reads as a shell. */
  cvr: '00000000',
  cvrPlaceholder: true,
};

export const NAV = [
  { href: '/produkter', label: L('Produkter', 'Products'), key: 'produkter' },
  { href: '/referencer', label: L('Referencer', 'References'), key: 'referencer' },
  { href: '/om-os', label: L('Om os', 'About'), key: 'om-os' },
  { href: '/kontakt', label: L('Kontakt', 'Contact'), key: 'kontakt' },
];

/** Strings that appear in more than one place, so they only get written once. */
export const UI = {
  requestQuote: L('Forespørg et tilbud', 'Request a quote'),
  requestPrice: L('Forespørg pris', 'Request pricing'),
  requestShort: L('Forespørg', 'Enquire'),
  seeCollection: L('Se produkterne', 'See the products'),
  compareAll: L('Sammenlign alle tre', 'Compare all three'),
  allProducts: L('Alle produkter og sammenligning', 'All products and comparison'),
  specifications: L('Specifikationer', 'Specifications'),
  overview: L('Overblik', 'Overview'),
  collection: L('Teknologierne', 'The technologies'),
  menu: L('Menu', 'Menu'),
  skipToContent: L('Gå til indhold', 'Skip to content'),
  closeMenu: L('Luk menu', 'Close menu'),
  contact: L('Kontakt', 'Contact'),
  privacy: L('Privatlivspolitik', 'Privacy policy'),
};

export const CONTACT_DETAILS: {
  key: string;
  label: Localized;
  value: Localized;
  href?: string;
}[] = [
  { key: 'mail', label: L('E-mail', 'Email'), value: L(SITE.email, SITE.email), href: `mailto:${SITE.email}` },
  { key: 'phone', label: L('Telefon', 'Phone'), value: L(SITE.phone, SITE.phone), href: `tel:${SITE.phoneHref}` },
  {
    key: 'area',
    label: L('Område', 'Area'),
    value: L('Levering og montering i hele Danmark', 'Delivery and installation across Denmark'),
  },
  {
    key: 'response',
    label: L('Svartid', 'Response time'),
    value: L('Tilbud inden for 24 timer på hverdage', 'Quote within 24 hours on weekdays'),
  },
];

export const FORM = {
  name: { label: L('Navn', 'Name'), placeholder: L('Dit navn', 'Your name') },
  email: { label: L('E-mail', 'Email'), placeholder: L('din@email.dk', 'your@email.com') },
  phone: { label: L('Telefon', 'Phone'), placeholder: L('Dit telefonnummer', 'Your phone number') },
  interest: { label: L('Interesse', 'Interest') },
  interestOptions: [
    L('Smart Film (PDLC)', 'Smart Film (PDLC)'),
    L('LED Film – indendørs', 'LED Film – indoor'),
    L('LED Film – udendørs', 'LED Film – outdoor'),
    L('3D Media Glass', '3D Media Glass'),
    L('Rådgivning – jeg er ikke sikker endnu', 'Consultation – I am not sure yet'),
  ],
  project: {
    label: L('Projektet', 'Project'),
    placeholder: L(
      'Størrelse på glasparti (ca. m²), placering, ønsket effekt…',
      'Glass area size (approx. m²), location, desired effect…',
    ),
  },
  submit: L('Send forespørgsel', 'Send enquiry'),
  note: L('Vi behandler dine oplysninger fortroligt.', 'We handle your information confidentially.'),
  sending: L('Sender…', 'Sending…'),
  success: L(
    'Tak! Din forespørgsel er sendt – vi vender tilbage inden for 24 timer.',
    'Thanks! Your enquiry has been sent – we will get back to you within 24 hours.',
  ),
  error: L(
    'Noget gik galt. Vi åbner din mail i stedet – tryk send der.',
    'Something went wrong. Opening your email app instead – hit send there.',
  ),
};

export const FOOTER = {
  tagline: L(
    'Arkitektonisk lysteknologi i absolut topklasse – smart film, transparent LED og 3D medieglas.',
    'Architectural light technology at the top tier – smart film, transparent LED and 3D media glass.',
  ),
  columns: [
    {
      title: UI.collection,
      links: [
        { href: '/smart-film', label: L('Smart Film', 'Smart Film') },
        { href: '/led-film', label: L('LED Film', 'LED Film') },
        { href: '/3d-media-glass', label: L('3D Media Glass', '3D Media Glass') },
        { href: '/produkter', label: L('Sammenlign', 'Compare') },
      ],
    },
    {
      title: L('Udforsk', 'Explore'),
      links: [
        { href: '/referencer', label: L('Referencer', 'References') },
        { href: '/om-os', label: L('Om os', 'About us') },
        { href: '/kontakt', label: L('Kontakt', 'Contact') },
      ],
    },
  ],
  copyright: L('© 2026 · Alle rettigheder forbeholdes', '© 2026 · All rights reserved'),
};


export const STATS: { value: number; suffix?: string; label: Localized }[] = [
  { value: 150, suffix: '+', label: L('Patenter', 'Patents') },
  { value: 3, label: L('Teknologier', 'Technologies') },
  { value: 24, suffix: 't', label: L('Svartid', 'Response time') },
  { value: 100, suffix: '%', label: L('Skræddersyet', 'Custom-built') },
];

