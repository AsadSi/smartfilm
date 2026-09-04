import { L, type Localized } from './types';

export type SpecRow = {
  label: Localized;
  value: Localized;
  /**
   * True where the row is structurally right but the figure is not yet
   * confirmed by SmartFilm. Renders as an explicit "afventer" rather than a
   * plausible-looking number.
   */
  pending?: boolean;
};

export type SpecGroup = {
  id: string;
  title: Localized;
  /** The test standard the group's figures are measured against. */
  standard?: Localized;
  rows: SpecRow[];
};


export type Application = { id: string; title: Localized; body: Localized };

const PENDING = L('Afventer', 'Pending');
const p = (label: Localized): SpecRow => ({ label, value: PENDING, pending: true });

/**
 * The full datasheet, per product.
 *
 * The site previously carried four spec rows per product ("Technology: PDLC"),
 * which is a brochure line, not a specification. An architect specifying glass
 * needs optical, electrical, physical, environmental and compliance figures in
 * one place — it is the single most-requested content type for technical buyers.
 *
 * Rows whose figures came from SmartFilm's own material are stated. Every other
 * row is `pending`: the row belongs in the datasheet, the number has to come
 * from the manufacturer.
 */
export const SPEC_GROUPS: Record<string, SpecGroup[]> = {
  'smart-film': [
    {
      id: 'optik',
      title: L('Optik', 'Optical'),
      standard: L('Måles efter EN 410', 'Measured to EN 410'),
      rows: [
        { label: L('Transparens, klar tilstand', 'Transparency, clear state'), value: L('Op til 92 %', 'Up to 92%') },
        { label: L('Tilstand uden strøm', 'State without power'), value: L('Mat', 'Opaque') },
        p(L('Lystransmission, mat tilstand', 'Light transmission, opaque state')),
        p(L('Slør (haze)', 'Haze')),
        { label: L('Projektion', 'Projection'), value: L('Fungerer som projektionsflade', 'Doubles as a projection surface') },
      ],
    },
    {
      id: 'elektrisk',
      title: L('Elektrisk', 'Electrical'),
      rows: [
        { label: L('Styring', 'Control'), value: L('Kontakt · fjernbetjening · app', 'Switch · remote · app') },
        { label: L('Skiftetid', 'Switching time'), value: L('Under 1 sekund', 'Under 1 second') },
        p(L('Driftsspænding', 'Operating voltage')),
        p(L('Effektforbrug pr. m²', 'Power draw per m²')),
        p(L('Standbyforbrug', 'Standby draw')),
      ],
    },
    {
      id: 'fysisk',
      title: L('Fysisk', 'Physical'),
      rows: [
        { label: L('Teknologi', 'Technology'), value: L('PDLC', 'PDLC') },
        p(L('Maks. panelstørrelse', 'Maximum panel size')),
        p(L('Samlet tykkelse', 'Total thickness')),
        { label: L('Montering', 'Installation'), value: L('Lamineret i nyt glas eller påsat eksisterende rude', 'Laminated into new glass or applied to an existing pane') },
      ],
    },
    {
      id: 'miljoe',
      title: L('Miljø og drift', 'Environment and operation'),
      rows: [
        p(L('Driftstemperatur', 'Operating temperature')),
        p(L('Forventet levetid', 'Expected service life')),
        p(L('Rengøring', 'Cleaning')),
      ],
    },
    {
      id: 'dokumentation',
      title: L('Dokumentation', 'Compliance'),
      rows: [
        p(L('Brandklasse', 'Fire classification')),
        p(L('CE-overensstemmelse', 'CE conformity')),
        p(L('Garantiperiode', 'Warranty period')),
      ],
    },
  ],
  'led-film': [
    {
      id: 'optik',
      title: L('Optik', 'Optical'),
      standard: L('Måles efter EN 410', 'Measured to EN 410'),
      rows: [
        { label: L('Visuel transparens', 'Visual transparency'), value: L('Op til 99 %', 'Up to 99%') },
        p(L('Lysstyrke', 'Brightness')),
        p(L('Pixelafstand', 'Pixel pitch')),
        p(L('Synsvinkel', 'Viewing angle')),
        p(L('Opdateringsfrekvens', 'Refresh rate')),
      ],
    },
    {
      id: 'elektrisk',
      title: L('Elektrisk', 'Electrical'),
      rows: [
        p(L('Driftsspænding', 'Operating voltage')),
        p(L('Effektforbrug pr. m², typisk', 'Power draw per m², typical')),
        p(L('Effektforbrug pr. m², maks.', 'Power draw per m², maximum')),
        p(L('Styresystem', 'Control system')),
      ],
    },
    {
      id: 'fysisk',
      title: L('Fysisk', 'Physical'),
      rows: [
        { label: L('Teknologi', 'Technology'), value: L('Transparent LED', 'Transparent LED') },
        { label: L('Tykkelse', 'Thickness'), value: L('Ca. 2 mm', 'Approx. 2mm') },
        { label: L('Montering', 'Installation'), value: L('Klæbes indvendigt på eksisterende glas', 'Bonded to the inside of existing glass') },
        { label: L('Serier', 'Series'), value: L('Indendørs og udendørs', 'Indoor and outdoor') },
        p(L('Maks. modulstørrelse', 'Maximum module size')),
      ],
    },
    {
      id: 'miljoe',
      title: L('Miljø og drift', 'Environment and operation'),
      rows: [
        p(L('IP-klasse, udendørsserie', 'IP rating, outdoor series')),
        p(L('Driftstemperatur', 'Operating temperature')),
        p(L('Forventet levetid', 'Expected service life')),
      ],
    },
    {
      id: 'dokumentation',
      title: L('Dokumentation', 'Compliance'),
      rows: [
        p(L('Brandklasse', 'Fire classification')),
        p(L('CE-overensstemmelse', 'CE conformity')),
        p(L('Garantiperiode', 'Warranty period')),
      ],
    },
  ],
  '3d-media-glass': [
    {
      id: 'optik',
      title: L('Optik', 'Optical'),
      rows: [
        { label: L('Synsvinkel', 'Viewing angle'), value: L('160°', '160°') },
        { label: L('Transparens', 'Transparency'), value: L('Op til 85 %', 'Up to 85%') },
        { label: L('Opløsning', 'Resolution'), value: L('HD', 'HD') },
        p(L('Lysstyrke', 'Brightness')),
        { label: L('3D uden briller', '3D without glasses'), value: L('Ja', 'Yes') },
      ],
    },
    {
      id: 'elektrisk',
      title: L('Elektrisk', 'Electrical'),
      rows: [
        { label: L('Indholdsstyring', 'Content management'), value: L('Cloud-baseret', 'Cloud-based') },
        p(L('Driftsspænding', 'Operating voltage')),
        p(L('Effektforbrug pr. m²', 'Power draw per m²')),
        p(L('Understøttede formater', 'Supported formats')),
      ],
    },
    {
      id: 'fysisk',
      title: L('Fysisk', 'Physical'),
      rows: [
        { label: L('Teknologi', 'Technology'), value: L('Immersivt 3D-medieglas', 'Immersive 3D media glass') },
        p(L('Maks. panelstørrelse', 'Maximum panel size')),
        p(L('Samlet tykkelse', 'Total thickness')),
        p(L('Montering', 'Installation')),
      ],
    },
    {
      id: 'miljoe',
      title: L('Miljø og drift', 'Environment and operation'),
      rows: [
        p(L('Driftstemperatur', 'Operating temperature')),
        p(L('Forventet levetid', 'Expected service life')),
        p(L('Placering', 'Placement')),
      ],
    },
    {
      id: 'dokumentation',
      title: L('Dokumentation', 'Compliance'),
      rows: [
        p(L('Brandklasse', 'Fire classification')),
        p(L('CE-overensstemmelse', 'CE conformity')),
        p(L('Garantiperiode', 'Warranty period')),
      ],
    },
  ],
};

/** Where each product actually gets used — the specifier's first question. */
export const APPLICATIONS: Record<string, Application[]> = {
  'smart-film': [
    { id: 'moede', title: L('Mødelokaler', 'Meeting rooms'), body: L('Åbent kontor til daglig, lukket lokale når det er booket.', 'An open office day to day, a closed room when it is booked.') },
    { id: 'klinik', title: L('Klinikker', 'Clinics'), body: L('Diskretion i undersøgelsesrum uden at give afkald på dagslys.', 'Discretion in examination rooms without giving up daylight.') },
    { id: 'hotel', title: L('Hotel og suiter', 'Hotels and suites'), body: L('Badeværelse mod soveværelse, styret fra sengen.', 'Bathroom to bedroom, controlled from the bed.') },
    { id: 'bolig', title: L('Private hjem', 'Private homes'), body: L('Glaspartier mod gaden, der kan lukkes på et sekund.', 'Street-facing glazing that closes in a second.') },
  ],
  'led-film': [
    { id: 'butik', title: L('Butiksvinduer', 'Storefronts'), body: L('Kampagneflader i vinduet uden at lukke butikken inde.', 'Campaign surfaces in the window without closing the store in.') },
    { id: 'facade', title: L('Mediefacader', 'Media facades'), body: L('Hele glasfacader som lysflade efter mørkets frembrud.', 'Whole glass facades as a light surface after dark.') },
    { id: 'showroom', title: L('Showrooms', 'Showrooms'), body: L('Levende indhold på glasset omkring udstillede produkter.', 'Moving content on the glass around displayed products.') },
    { id: 'lufthavn', title: L('Transport og terminaler', 'Transport and terminals'), body: L('Information på glas, hvor der ikke er væg at sætte en skærm på.', 'Information on glass where there is no wall for a screen.') },
  ],
  '3d-media-glass': [
    { id: 'flagship', title: L('Flagship-butikker', 'Flagship stores'), body: L('Et vindue, folk bliver stående foran.', 'A window people stay standing in front of.') },
    { id: 'event', title: L('Events og messer', 'Events and trade shows'), body: L('En stand, der skiller sig ud uden at råbe højest.', 'A stand that stands out without shouting loudest.') },
    { id: 'udstilling', title: L('Udstillinger', 'Exhibitions'), body: L('Tredimensionelt indhold i selve montren.', 'Three-dimensional content inside the display case itself.') },
    { id: 'restaurant', title: L('Restauration', 'Hospitality'), body: L('Facader, der ændrer karakter hen over døgnet.', 'Facades that change character across the day.') },
  ],
};
