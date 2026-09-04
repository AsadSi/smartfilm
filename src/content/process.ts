import { L, type Localized } from './types';

export type ProcessStep = {
  /** Anchor + React key. */
  id: string;
  title: Localized;
  body: Localized;
  /** What the client actually receives at the end of this step. */
  output: Localized;
  /** Honest range, not a promise of a date. */
  duration: Localized;
};

/**
 * What happens between an enquiry and a working installation.
 *
 * This is the section a specifier looks for and the current site has no answer
 * to. None of it depends on client data — it is how the business already works,
 * written down — which is why it is the cheapest credibility on the site.
 */
export const PROCESS: ProcessStep[] = [
  {
    id: 'forespoergsel',
    title: L('Forespørgsel', 'Enquiry'),
    body: L(
      'Du fortæller os, hvad glasset skal kunne. Vi vender tilbage med et prisspænd og de spørgsmål, der afgør løsningen.',
      'You tell us what the glass needs to do. We come back with a price range and the questions that determine the solution.',
    ),
    output: L('Prisspænd og teknologivalg', 'Price range and technology choice'),
    duration: L('24 timer', '24 hours'),
  },
  {
    id: 'opmaaling',
    title: L('Opmåling på stedet', 'Site survey'),
    body: L(
      'Vi måler glaspartiet op, vurderer strømføring, montageadgang og lysforhold, og noterer det, der ikke kan ses på en tegning.',
      'We measure the glazing, assess power routing, installation access and light conditions, and record what a drawing does not show.',
    ),
    output: L('Opmålingsrapport og fast tilbud', 'Survey report and fixed quote'),
    duration: L('3–5 arbejdsdage', '3–5 working days'),
  },
  {
    id: 'proeve',
    title: L('Prøve og mock-up', 'Sample and mock-up'),
    body: L(
      'Du ser teknologien på dit eget glas, i dit eget lys, før der bestilles. Det er her, en specifikation bliver til en beslutning.',
      'You see the technology on your own glass, in your own light, before anything is ordered. This is where a specification becomes a decision.',
    ),
    output: L('Fysisk prøve på projektet', 'Physical sample on site'),
    duration: L('1–2 uger', '1–2 weeks'),
  },
  {
    id: 'montering',
    title: L('Produktion og montering', 'Production and installation'),
    body: L(
      'Materialet produceres efter mål og monteres af vores eget hold. Vi arbejder uden for åbningstid, hvor driften kræver det.',
      'The material is produced to measure and installed by our own team. We work outside opening hours where operations require it.',
    ),
    output: L('Færdig, idriftsat installation', 'Finished, commissioned installation'),
    duration: L('4–8 uger', '4–8 weeks'),
  },
  {
    id: 'aflevering',
    title: L('Aflevering og service', 'Handover and service'),
    body: L(
      'Vi gennemgår styring og drift med den, der skal bruge det til daglig, og afleverer dokumentationen. Derefter er vi stadig at få fat i.',
      'We walk through control and operation with whoever uses it day to day, and hand over the documentation. After that, we are still reachable.',
    ),
    output: L('Dokumentation og garantibevis', 'Documentation and warranty certificate'),
    duration: L('På dagen', 'Same day'),
  },
];
