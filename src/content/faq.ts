import { L, type Localized } from './types';

export type FaqItem = {
  id: string;
  q: Localized;
  a: Localized;
  /** Limits the item to one product page; omitted means it shows everywhere. */
  product?: string;
};

/**
 * The procurement objections, answered in public.
 *
 * These are the questions that otherwise become an email before a quote — which
 * is exactly the friction that makes a site feel unprofessional to a buyer.
 */
export const FAQ: FaqItem[] = [
  {
    id: 'eksisterende-glas',
    q: L('Kan det monteres på eksisterende glas?', 'Can it be installed on existing glass?'),
    a: L(
      'Ja. LED Film og 3D Media Glass klæbes indvendigt på det glas, der allerede sidder. Smart Film findes både som film til eksisterende ruder og lamineret ind i nyt glas — det sidste holder længst og ser renest ud.',
      'Yes. LED Film and 3D Media Glass are bonded to the inside of the glass already in place. Smart Film comes both as a film for existing panes and laminated into new glass — the latter lasts longest and looks cleanest.',
    ),
  },
  {
    id: 'stroem',
    q: L('Hvad kræver det af strøm og føring?', 'What does it require in power and cabling?'),
    a: L(
      'Der skal føres strøm frem til glaspartiet. Ved opmålingen aftaler vi, hvor transformer og styring placeres, så kabelføringen kan skjules i ramme, loft eller gulv. Effektforbruget står i databladet for hvert produkt.',
      'Power must be brought to the glazing. During the survey we agree where the transformer and controller sit, so cabling can be concealed in the frame, ceiling or floor. Power draw is stated in each product datasheet.',
    ),
  },
  {
    id: 'levetid',
    q: L('Hvor længe holder det?', 'How long does it last?'),
    a: L(
      'Levetiden afhænger af produkt og placering — udendørs facader slides hårdere end et mødelokale. Den forventede levetid og garantiperioden står i databladet, og vi oplyser dem altid i tilbuddet.',
      'Service life depends on product and placement — an outdoor facade wears harder than a meeting room. Expected life and warranty period are stated in the datasheet, and we always state them in the quote.',
    ),
  },
  {
    id: 'projektering',
    q: L('Kan I levere materiale til projektering?', 'Can you supply material for specification?'),
    a: L(
      'Ja. Datablade, snitdetaljer og CAD-filer kan hentes på hvert produkt. Mangler du et format til dit projektmateriale, laver vi det.',
      'Yes. Datasheets, section details and CAD files are downloadable on each product. If you need a format for your project documentation that is not there, we will produce it.',
    ),
  },
  {
    id: 'pris',
    q: L('Hvad koster det?', 'What does it cost?'),
    a: L(
      'Prisen sættes efter kvadratmeter, pixelafstand, montageforhold og styring, så et tal uden en opmåling ville være gætteri. Vi giver et realistisk prisspænd inden for 24 timer på en beskrivelse af projektet.',
      'Price is set by square metre, pixel pitch, installation conditions and control, so a figure without a survey would be guesswork. We give a realistic price range within 24 hours of a project description.',
    ),
  },
  {
    id: 'projektering-udland',
    q: L('Arbejder I uden for Danmark?', 'Do you work outside Denmark?'),
    a: L(
      'Vores montagehold dækker hele Danmark. Til projekter i Norden leverer vi materiale og teknisk tilsyn i samarbejde med lokal montør — spørg os, så siger vi ærligt, om vi er det rigtige valg.',
      'Our installation team covers all of Denmark. For Nordic projects we supply material and technical supervision alongside a local installer — ask us, and we will say honestly whether we are the right choice.',
    ),
  },
];

export function faqFor(product?: string): FaqItem[] {
  return FAQ.filter((f) => !f.product || f.product === product);
}
