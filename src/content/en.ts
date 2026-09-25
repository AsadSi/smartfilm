import { DA, SITE, type Content } from './site';

/**
 * The English page, sentence for sentence against the Danish in site.ts —
 * same claims, same conditions, same order. Typed as Content, so it cannot
 * drift out of shape; pictures, links and sizes are taken from DA rather than
 * repeated, so swapping a photograph stays a one-line edit.
 */
export const EN: Content = {
  UI: {
    title: 'SmartFilm Danmark · Transparent LED film and smart film for glass',
    skip: 'Skip to content',
    mainNav: 'Main menu',
    shortcuts: 'Shortcuts',
    menu: 'Menu',
    close: 'Close',
    call: 'Call',
    cta: 'Get a quote',
    contact: 'Contact',
    area: 'Delivery and installation across Denmark',
    reply: 'A quote within 24 hours on working days',
    facts: { email: 'Email', phone: 'Phone', area: 'Area', reply: 'Response' },
    cvr: 'CVR no.',
    home: 'Home',
    switchTo: { lang: 'da', code: 'DA', label: 'Læs på dansk' },
  },

  NAV_LEFT: [
    { href: '#saadan', label: 'How it works' },
    { href: '#specs', label: 'Specifications' },
  ],

  NAV_RIGHT: [
    { href: '#klar', label: 'Clear or matte' },
    { href: '#anvendelse', label: 'Applications' },
  ],

  HERO: {
    ...DA.HERO,
    kicker: 'Transparent LED film',
    headline: 'Invisible. Until it lights up.',
    sub: '2 mm of film on the glass turns the window into a screen, without shutting out the daylight.',
    strap: 'Transparent LED film · Delivery and installation across Denmark',
    cta: 'Get a quote',
    scroll: { ...DA.HERO.scroll, text: 'Scroll', label: 'Scroll down to the products' },
  },

  PRODUCTS: {
    kicker: 'Products',
    headline: 'Two kinds of film for glass.',
    lede: 'One turns the window into a screen. The other turns it matte at the flick of a switch. We deliver and install both across Denmark.',
    forLabel: 'Suited to',
    items: [
      {
        ...DA.PRODUCTS.items[0],
        name: 'Transparent LED film',
        claim: 'The window becomes a screen.',
        body: '2 mm film is applied to the inside of the glass and shows video and campaigns, without shutting out the daylight.',
        points: ['Up to 99% transparency', 'Change content from your phone', 'No scaffolding, no closing days'],
        for: 'Shop windows, shopping centres, offices and clinics',
        cta: 'See it light up',
        alt: 'Visualisation of a shopfront where the window shows a campaign while the shop behind is still visible.',
      },
      {
        ...DA.PRODUCTS.items[1],
        name: 'Smart Film',
        claim: 'The window turns matte. At a switch.',
        body: 'A layer of film laminated into the glass. Power on, and the glass is clear; power off, and it is matte.',
        points: ['92% transparency, clear', 'Switches in under a second', 'Private without going dark'],
        for: 'Meeting rooms, clinics and bathrooms',
        cta: 'Try the switch',
        alt: 'Glass partition into a clinic. The left pane is matte, the right is clear, so the reception behind can be seen.',
        panes: ['Matte', 'Clear'],
      },
    ],
  },

  STEPS: {
    kicker: 'How it works',
    headline: 'Three steps. The shop stays open.',
    lede: 'The film goes on from the inside. Nothing has to be built, and the facade does not change.',
    items: [
      {
        n: '01',
        title: 'We measure the glass',
        body: 'Size, glass type and which way it faces the sun. That decides pixel pitch and brightness, and with them the price.',
      },
      {
        n: '02',
        title: 'The film goes on inside',
        body: 'It is applied directly to the pane. No scaffolding, no new structure, no closing days.',
      },
      {
        n: '03',
        title: 'You control the content',
        body: 'Change the campaign, opening hours or video from your phone. Schedule it in advance and let it run.',
      },
    ],
  },

  SPECS: {
    kicker: 'Specifications',
    headline: 'The numbers, with the conditions attached.',
    lede: 'A number without its condition is a disappointment waiting to happen. Here are both.',
    items: [
      { value: '99%', label: 'Transparency', note: 'Up to. Drops while content is playing.' },
      { value: '2 mm', label: 'Thickness', note: 'Applied to the pane from inside.' },
      { value: '160°', label: 'Viewing angle', note: 'Readable from the whole pavement.' },
      { value: '150+', label: 'Patents', note: 'Behind the technology in the film.' },
    ],
  },

  DEMO: {
    kicker: 'Transparent LED film',
    headline: 'Hold to light it.',
    lede: 'Off, it is barely there. On, it is the whole window. Hold the button down and see what the window becomes.',
    word: 'Open',
    hold: 'Hold down',
    holding: 'Keep holding…',
    lit: 'Lit',
    hint: 'Hold the mouse button or your finger down. Let go, and the light falls back.',
    reveals: [
      { at: 0.34, text: 'Content changes in minutes, not over a week of new vinyl.' },
      { at: 0.52, text: 'Switched off at night, the window is just a window again.' },
      { at: 0.7, text: 'One surface, many messages, and room to sell advertising time on.' },
    ],
  },

  SMART_FILM: {
    ...DA.SMART_FILM,
    kicker: 'Smart Film',
    headline: 'Clear or matte. At a switch.',
    lede: 'A layer of film laminated into the glass. Power on, and the glass is clear; power off, and it is matte. The switch goes where the light switch already was.',
    states: { mat: 'Matte', klar: 'Clear' },
    readout: { mat: 'Power off · the glass is private', klar: 'Power on · the glass is clear' },
    action: 'Make the glass matte',
    figures: [
      { value: '92%', label: 'Transparency, clear' },
      { value: '<1 sec.', label: 'Switching time' },
      { value: '5 W/m²', label: 'Consumption, clear' },
    ],
    note: 'Matte is not dark. The film diffuses the daylight instead of shutting it out, so the room turns private without turning dark — and that is the whole difference between film and blinds.',
    alt: {
      mat: 'Glass partition into a clinic. The three panes are matte, so the reception behind shows only as light and shadow.',
      klar: 'Glass partition into a clinic. The panes are clear, and the reception and the room behind are plainly visible.',
    },
  },

  REFS: {
    kicker: 'Applications',
    headline: 'What it can look like.',
    lede: 'Visualisations of transparent LED film in Danish settings, from a whole office facade to a single window onto the high street.',
    badge: 'Visualisation',
    items: [
      {
        ...DA.REFS.items[0],
        alt: 'Visualisation of an office building in the evening, its glass facade showing large luminous motifs in blue and orange.',
        title: 'Offices and headquarters',
        body: 'The whole facade becomes the message, without building anything onto it.',
      },
      {
        ...DA.REFS.items[1],
        alt: 'Visualisation of a shopping centre at dusk, where the curved glazing above the entrance shows colourful motifs.',
        title: 'Shopping centres',
        body: 'Large glazed areas without heavy structures. One surface, many messages.',
      },
      {
        ...DA.REFS.items[2],
        alt: 'Visualisation of a shopfront in a shopping centre, where the window shows a campaign while the shop behind is still visible.',
        title: 'Shop windows',
        body: 'The campaign changes in minutes instead of a week of new vinyl.',
      },
      {
        ...DA.REFS.items[3],
        alt: 'Visualisation of a clinic in a shopping centre, where the window shows a calm campaign with the reception visible behind it.',
        title: 'Clinics and wellness',
        body: 'Discreet and professional, without closing off the bright feel inside.',
      },
    ],
  },

  FAQ: {
    kicker: 'Questions',
    headline: 'What people ask first.',
    lede: 'Including the ones where the honest answer is "it depends".',
    items: [
      {
        q: 'Can you see it in daylight?',
        a: 'It depends on the brightness and which way the window faces. A film for indoor use is typically 800 to 2,000 nits, and it loses against a window in direct sun. If the window faces the street or south, you need an outdoor series with considerably higher brightness. We always ask which way it faces before we give a price, because it is the most common cause of disappointment in this industry.',
      },
      {
        q: 'Will it hide the goods in my window?',
        a: 'Partly, while content is playing. The transparency on the datasheet is for the film switched off. When the picture is running there is light in the way, and the display behind it recedes. So we plan the placement around what stands in the window: a film above the display or on a side pane gives you the screen without covering the goods.',
      },
      {
        q: 'Is it completely invisible when it is off?',
        a: 'No, and you should not buy it for that. From a distance it disappears. Standing close to the pane, you can see the grid of wires and diodes, the way you can see the threads in an insect screen. People who expect invisible glass are disappointed. People who expect an almost invisible screen are happy.',
      },
      {
        q: 'Will it fit my glass?',
        a: 'Usually, but it has to be checked first. Toughened, laminated, curved and coated double glazing all behave differently, and on some types the film must not be applied directly. Send us a photo and the measurements, and we will tell you before you spend any money.',
      },
      {
        q: 'What does it cost?',
        a: 'It is priced individually by size, pixel pitch, brightness and installation. We do not give a price per square metre without knowing the window, because that number is always wrong. Send the measurements and what the window is used for, and you will have a real quote within one working day.',
      },
    ],
  },

  QUOTE: {
    kicker: 'Get a quote',
    headline: 'Tell us about the window.',
    lede: 'Measurements and a photo are enough to start. You get a real number back, not a range.',
    submit: 'Send enquiry',
    subject: 'Enquiry from smartfilmdanmark.dk',
    hint: 'The button opens your own email program with the message ready. Fields marked * are required.',
    privacy: 'How we handle your information',
    summary: 'Please correct the following before sending:',
    sent: {
      title: 'Your email program has opened',
      body: 'The message is ready for kontakt@smartfilmdanmark.dk. Press send in your email program, and you will have an answer within 24 hours on working days.',
    },
    fields: {
      name: { label: 'Name', error: 'Please enter your name.' },
      company: { label: 'Company' },
      email: { label: 'Email', error: 'Please enter a valid email address, e.g. name@company.com.' },
      phone: { label: 'Phone' },
      size: { label: 'Size of the glass', placeholder: 'E.g. 6 x 3 metres, facing the high street' },
      message: { label: 'Message', placeholder: 'What will the window be used for, and which way does it face?' },
    },
  },

  FOOTER: {
    privacy: 'Privacy policy',
    tagline: 'Transparent LED film and smart film for glass. Delivery and installation across Denmark.',
    columns: [
      {
        title: 'Contents',
        links: [
          { href: '#produkter', label: 'Products' },
          { href: '#saadan', label: 'How it works' },
          { href: '#specs', label: 'Specifications' },
          { href: '#klar', label: 'Clear or matte' },
          { href: '#anvendelse', label: 'Applications' },
          { href: '#faq', label: 'Questions' },
        ],
      },
    ],
  },
  PRIVACY: {
    title: 'Privacy policy · SmartFilm Danmark',
    headline: 'Privacy policy',
    updated: 'Last updated 25 September 2026',
    lede: 'What we learn about you, what we use it for, and the rights you have.',
    sections: [
      {
        title: 'Who is responsible',
        body: [
          `${SITE.full} is run by ${SITE.company}, ${SITE.street}, ${SITE.postcode} ${SITE.town}, CVR no. ${SITE.cvr}, which is the data controller for the information we process about you. You can always reach us at ${SITE.email} or ${SITE.phone}.`,
        ],
      },
      {
        title: 'What we receive',
        body: [
          'When you write to us or call, we receive what you give us yourself: usually your name, company, email, phone number and details of the window the job is about.',
          'The form on the site stores nothing. It opens your own mail program, and the message goes straight from you to us.',
          'What you tell us is up to you. Without contact details, though, we cannot reply or give you a quote.',
        ],
      },
      {
        title: 'What we use it for',
        body: [
          'We use the information to answer your enquiry, give you a quote and, if you become a customer, deliver, install and invoice the job.',
          'The basis is that we need it to give you a quote and carry out an agreement with you (Article 6(1)(b) of the GDPR), and that the Danish Bookkeeping Act requires us to keep accounting records (Article 6(1)(c)).',
          'We do not use automated decision-making or profiling.',
        ],
      },
      {
        title: 'Who we share it with',
        body: [
          'We never sell your information. It may be processed by the suppliers we use to run the business — email, hosting and accounting, for example — and only on our behalf. Otherwise we pass it on only when the law requires it.',
          'If a supplier processes information outside the EU/EEA, it happens only on a lawful basis for the transfer, such as the European Commission\'s standard contractual clauses.',
        ],
      },
      {
        title: 'How long we keep it',
        body: [
          'If an enquiry does not lead to a job, we delete it once it is no longer relevant, and after one year at the latest. If you become a customer, we keep invoices and accounting records for five years, as the Bookkeeping Act requires.',
        ],
      },
      {
        title: 'Cookies and visits to the site',
        body: [
          'The site uses no cookies and no statistics or marketing tools, and it loads nothing from other services.',
          'If you choose a language on the site, your browser saves the choice so the site can remember it next time. That only happens when you choose, and it stays in your browser — we never receive it. Because you asked for it yourself, it needs no consent.',
          'As with every website, the server that delivers the page receives technical information such as your IP address. It is used only to deliver the page and keep it secure, and it is kept no longer than that requires. The basis is our legitimate interest in being able to show the site (Article 6(1)(f)).',
        ],
      },
      {
        title: 'Your rights',
        body: [
          'You have the right to see the information we hold about you and to have it corrected or deleted. You can also object to how we process it, ask us to restrict it, or have your information handed over to you. Write to us and we will reply within one month at the latest.',
          'If you are unhappy with how we handle your information, you can complain to the Danish Data Protection Agency (Datatilsynet) at datatilsynet.dk.',
        ],
      },
    ],
  },
  NOT_FOUND: {
    title: 'Page not found · SmartFilm Danmark',
    kicker: 'Error 404',
    headline: 'Page not found',
    body: 'The link may be old, or the page has moved. Everything about LED film and smart film is on the front page.',
    cta: 'Go to the front page',
  },
};
