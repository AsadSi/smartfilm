'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ALT, BRAND, CRAFT, CTA, IMG, PRINCIPLES, PRODUCTS, ROOMS, SPECS } from '@/content/v2';
import { Arrow, Reveal } from './primitives';

/**
 * TEMPLATE J · UDSIGT — the LuxTrips travel brochure
 *
 * The reference is a luxury travel agency, and what makes it is a grammar
 * every travel site shares: an enormous light serif over a landscape, a search
 * bar in a white pill across the bottom of the hero, destinations on a rail
 * with region tabs, packages in a staggered mosaic, "book with us" tiles, and a
 * "why us" set over a mountain in cloud with small photographs floating round
 * it.
 *
 * The whole grammar is kept. What changes is what you are shopping for: the
 * destinations are rooms, the search bar asks which room and which product,
 * and the packages are the three technologies.
 *
 * Nothing here has a hard edge. Photographs fade into the stone rather than
 * stopping at a line, which is most of why the reference reads as soft.
 */
const NAV = [
  { href: '#rum', label: 'Rum' },
  { href: '#loesninger', label: 'Løsninger' },
  { href: '#hvorfor', label: 'Hvorfor' },
  { href: '#proces', label: 'Proces' },
  { href: '#kontakt', label: 'Kontakt' },
];

function Diamond({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-block size-2.5 rotate-45 border border-current ${className}`} />;
}

function mailto(subject: string, body: string) {
  window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function TemplateUdsigt() {
  return (
    <div className="tpl-udsigt bg-udsigt-bg text-udsigt-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-udsigt-ink focus:px-4 focus:py-3 focus:text-white">
        Gå til indhold
      </a>
      <UdsigtHeader />
      <main id="main">
        <UdsigtHero />
        <UdsigtRooms />
        <UdsigtSolutions />
        <UdsigtTiles />
        <UdsigtWhy />
        <UdsigtProcess />
        <UdsigtSpecs />
        <UdsigtPrinciples />
        <UdsigtContact />
      </main>
      <UdsigtFooter />
    </div>
  );
}

function UdsigtHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="v2-shell flex h-[calc(var(--v2-header-h)+0.5rem)] items-center justify-between gap-8">
        <a href="#top" className="flex items-center gap-3 font-[family-name:var(--font-cormorant)] text-[1.35rem] font-medium tracking-[0.02em]">
          <Diamond />
          {BRAND.name}
        </a>
        <nav aria-label="Sektioner" className="max-lg:hidden">
          <ul className="flex gap-9">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="udsigt-label opacity-75 transition-opacity hover:opacity-100">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#kontakt" className="udsigt-pill udsigt-pill-line !min-h-10 bg-white/40 backdrop-blur">Ring mig op</a>
      </div>
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────────
   The three giant lines stagger across the landscape the way EXTRA ORDINARY
   PLACES does, with the small stacked phrase tucked in above them, and the
   search pill sits on the fade line where the photograph meets the stone. */
function UdsigtHero() {
  return (
    <section id="top" className="relative min-h-[max(40rem,100svh)] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.udsigtHero} alt={ALT.udsigtHero} className="udsigt-fade-b absolute inset-0 size-full object-cover object-[50%_58%]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-udsigt-bg/70 to-transparent" />

      <h1 className="absolute inset-x-0 top-[22%] text-white [filter:drop-shadow(0_2px_26px_rgb(70_40_60/0.35))]">
        <span className="v2-shell block">
          <span className="ml-[46%] block w-max font-[family-name:var(--font-cormorant)] text-[clamp(0.9rem,1.5vw,1.3rem)] uppercase leading-[1.05] tracking-[0.08em] max-sm:ml-[40%]">
            Glas til
            <br />
            de mest
          </span>
          <span className="udsigt-display ml-[14%] block">Ekstra</span>
          <span className="udsigt-display -mt-[0.04em] block">ordinære</span>
          <span className="udsigt-display -mt-[0.04em] block text-right max-sm:mr-[4%]">rum</span>
        </span>
      </h1>

      <div className="absolute inset-x-0 bottom-[clamp(2rem,8vh,5rem)] px-[var(--v2-gutter)]">
        <SearchBar />
      </div>
    </section>
  );
}

const SEARCH_FIELDS = [
  { name: 'rum', label: 'Rum', options: ROOMS.map((r) => r.label) },
  { name: 'produkt', label: 'Produkt', options: PRODUCTS.map((p) => p.name) },
  { name: 'areal', label: 'Areal', options: ['Under 10 m²', '10–50 m²', 'Over 50 m²'] },
  { name: 'hvornaar', label: 'Hvornår', options: ['Inden for en måned', 'Inden for tre måneder', 'Senere'] },
];

/* The search pill. It does what it says: the four answers go into an email to
   SmartFilm, which is the nearest a template can honestly get to a search. */
function SearchBar() {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = SEARCH_FIELDS.map((f) => `${f.label}: ${data.get(f.name)}`);
    mailto(`Forespørgsel: ${data.get('produkt')} til ${String(data.get('rum')).toLowerCase()}`, lines.join('\n'));
  };

  return (
    <form onSubmit={submit} className="relative mx-auto max-w-[58rem]" aria-label="Find din løsning">
      <span className="udsigt-label absolute -top-7 left-1/2 -translate-x-1/2 rounded-t-xl bg-white px-5 pb-1.5 pt-2.5">Find din løsning</span>
      <div className="grid grid-cols-2 items-center gap-y-4 rounded-[1.75rem] bg-white py-4 pl-6 pr-4 shadow-[0_30px_60px_-30px_rgb(60_40_50/0.45)] sm:rounded-full md:grid-cols-[repeat(4,1fr)_auto] md:py-3">
        {SEARCH_FIELDS.map((f, i) => (
          <label key={f.name} className={`flex flex-col gap-1 pr-4 ${i > 0 ? 'md:border-l md:border-udsigt-line md:pl-5' : ''}`}>
            <span className="udsigt-label text-udsigt-ink-2">{f.label}</span>
            <select name={f.name} className="-ml-1 w-full cursor-pointer appearance-none bg-transparent text-[0.875rem] font-medium outline-none focus-visible:underline">
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
        ))}
        <button type="submit" aria-label="Send forespørgsel" className="col-span-2 flex h-12 items-center justify-center gap-3 rounded-full bg-udsigt-ink text-white md:col-span-1 md:w-12">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.4" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span className="udsigt-label md:sr-only">Send forespørgsel</span>
        </button>
      </div>
    </form>
  );
}

/* ── Rooms rail ───────────────────────────────────────────────────────────────
   "Top rated experiences": tabs that filter, tall dark-bottomed cards on a
   rail, and a round arrow that steps it along. */
function UdsigtRooms() {
  const tags = ['Alle', ...Array.from(new Set(ROOMS.map((r) => r.tag)))];
  const [tag, setTag] = useState('Alle');
  const rail = useRef<HTMLUListElement>(null);
  const shown = tag === 'Alle' ? ROOMS : ROOMS.filter((r) => r.tag === tag);

  return (
    <section id="rum" className="py-[clamp(4rem,8vw,7rem)]">
      <Reveal className="v2-shell text-center">
        <h2 className="udsigt-h2 mx-auto">Udvalgte rum</h2>
        <div role="tablist" aria-label="Filtrér rum" className="mt-7 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {tags.map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={t === tag}
              onClick={() => setTag(t)}
              className={`font-[family-name:var(--font-cormorant)] text-[1.05rem] transition-colors ${
                t === tag ? 'text-udsigt-ink underline decoration-1 underline-offset-[10px]' : 'text-udsigt-ink-2 hover:text-udsigt-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="relative mt-10">
        <ul ref={rail} className="udsigt-rail flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--v2-gutter)] pb-2 [scroll-padding-inline:var(--v2-gutter)]">
          {shown.map((r) => (
            <li key={r.key} className="w-[min(68vw,17rem)] shrink-0 snap-start">
              <figure className="relative aspect-[3/4.1] overflow-hidden rounded-[14px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt={r.alt} className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cold)] hover:scale-[1.04]" loading="lazy" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#1c1f2b]/85 via-[#1c1f2b]/10 to-transparent" />
                <figcaption className="absolute inset-x-4 bottom-4 text-white">
                  <span className="udsigt-label opacity-75">{r.product}</span>
                  <span className="udsigt-h3 mt-1.5 block">{r.label}</span>
                  <span className="mt-2 block text-[0.8125rem] leading-snug opacity-80">{r.note}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label="Vis flere rum"
          onClick={() => rail.current?.scrollBy({ left: 300, behavior: 'smooth' })}
          className="absolute right-[calc(var(--v2-gutter)-0.5rem)] top-[42%] flex size-12 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur max-sm:hidden"
        >
          <Arrow />
        </button>
      </div>
    </section>
  );
}

/* ── Solutions ────────────────────────────────────────────────────────────────
   "Luxury packages": the title on the left, a staggered mosaic of tall cards
   on the right, each with its name centred and a thin diamond drawn over it. */
function UdsigtSolutions() {
  const cards = [
    { title: PRODUCTS[0].name, figure: `${PRODUCTS[0].figure.value} ${PRODUCTS[0].figure.unit}`, note: PRODUCTS[0].figure.label, image: PRODUCTS[0].photo, alt: PRODUCTS[0].alt },
    { title: PRODUCTS[1].name, figure: `${PRODUCTS[1].figure.value} ${PRODUCTS[1].figure.unit}`, note: PRODUCTS[1].figure.label, image: PRODUCTS[1].photo, alt: PRODUCTS[1].alt },
    { title: 'Styring', figure: '< 1 sek.', note: 'Kontakt, fjernbetjening eller app', image: IMG.udsigtMeeting, alt: ALT.udsigtMeeting },
    { title: PRODUCTS[2].name, figure: `${PRODUCTS[2].figure.value}${PRODUCTS[2].figure.unit}`, note: PRODUCTS[2].figure.label, image: PRODUCTS[2].photo, alt: PRODUCTS[2].alt },
    { title: 'Montering', figure: '24 t', note: 'Fra forespørgsel til tilbud', image: IMG.filmDoors, alt: ALT.filmDoors },
  ];
  const columns = [[cards[0]], [cards[1], cards[2]], [cards[3], cards[4]]];

  return (
    <section id="loesninger" className="bg-gradient-to-b from-udsigt-bg via-udsigt-haze to-udsigt-bg py-[clamp(4rem,8vw,7rem)]">
      <div className="v2-shell grid gap-x-12 gap-y-10 lg:grid-cols-[0.7fr_2fr]">
        <Reveal className="lg:pt-24">
          <h2 className="udsigt-h2 max-w-[8ch]">Tre løsninger, ét glas</h2>
          <a href="#specifikationer" className="udsigt-pill udsigt-pill-line mt-7 !min-h-9">Se tallene</a>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {columns.map((col, ci) => (
            <div key={ci} className={`space-y-3 md:space-y-4 ${ci === 1 ? 'md:mt-20' : ci === 2 ? 'md:-mt-6' : 'md:mt-44'} ${ci === 2 ? 'col-span-2 grid grid-cols-2 gap-3 space-y-0 md:col-span-1 md:block md:space-y-4' : ''}`}>
              {col.map((c, k) => (
                <Reveal key={c.title} delay={(ci + k) * 80} fade>
                  <figure className={`udsigt-diamond relative overflow-hidden rounded-[14px] ${ci === 0 || (ci === 2 && k === 0) ? 'aspect-[3/4.3]' : 'aspect-[3/3.6]'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt={c.alt} className="size-full object-cover" loading="lazy" />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#1c1f2b]/70 via-[#1c1f2b]/20 to-[#1c1f2b]/55" />
                    <figcaption className="absolute inset-0 z-10 flex flex-col items-center justify-between p-5 text-center text-white">
                      <span className="udsigt-h3">{c.title}</span>
                      <span>
                        <span className="block font-[family-name:var(--font-cormorant)] text-[2.4rem] font-light leading-none">{c.figure}</span>
                        <span className="udsigt-label mt-2 block opacity-80">{c.note}</span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Tiles ────────────────────────────────────────────────────────────────────
   "Book with us": six wide tiles, serif capitals centred on each, the edges
   washed back into the stone. */
function UdsigtTiles() {
  return (
    <section className="py-[clamp(4rem,8vw,7rem)]">
      <Reveal className="v2-shell text-center">
        <h2 className="udsigt-h2 mx-auto max-w-[10ch]">Til ethvert rum</h2>
      </Reveal>
      <ul className="v2-shell mt-10 grid max-w-[60rem] grid-cols-2 gap-3 md:gap-4">
        {ROOMS.slice(0, 6).map((r, i) => (
          <Reveal as="li" key={r.key} delay={(i % 2) * 70} fade>
            <a href="#kontakt" className="group relative block aspect-[16/9] overflow-hidden rounded-[12px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.image} alt={r.alt} className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cold)] group-hover:scale-[1.05]" loading="lazy" />
              <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(28_31_43/0.25)_20%,rgb(233_223_219/0.55)_100%)]" />
              <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-cormorant)] text-[clamp(1rem,2.4vw,1.7rem)] uppercase tracking-[0.06em] text-white [text-shadow:0_2px_18px_rgb(28_31_43/0.5)]">
                {r.label}
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ── Why ──────────────────────────────────────────────────────────────────────
   "Why LuxTrips": the mountain in cloud, the question set huge and pale across
   the sky, three small photographs hung around the peak, two short answers. */
function UdsigtWhy() {
  const floats = [
    { src: IMG.udsigtWindow, alt: ALT.udsigtWindow, cls: 'left-[6%] top-[30%] w-[clamp(6rem,11vw,10rem)] rotate-[-3deg]' },
    { src: IMG.filmPrivacy, alt: ALT.filmPrivacy, cls: 'right-[7%] top-[20%] w-[clamp(5.5rem,9vw,8.5rem)] rotate-[4deg]' },
    { src: IMG.glassImmersive, alt: ALT.glassImmersive, cls: 'right-[24%] top-[58%] w-[clamp(5rem,8vw,7.5rem)] rotate-[-2deg] max-md:hidden' },
  ];

  return (
    <section id="hvorfor" className="relative overflow-hidden">
      <div className="relative min-h-[max(38rem,92svh)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.udsigtPeak} alt={ALT.udsigtPeak} className="udsigt-fade-y absolute inset-0 size-full object-cover" loading="lazy" />

        <p aria-hidden="true" className="udsigt-display absolute inset-x-0 top-[9%] text-center !text-[clamp(3rem,10vw,10rem)] text-white/75">
          Hvorfor
          <br />
          SmartFilm
        </p>

        {floats.map((f) => (
          <Reveal key={f.src} fade className={`absolute ${f.cls}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.src} alt={f.alt} className="aspect-[3/4] w-full rounded-[10px] object-cover shadow-[0_24px_40px_-20px_rgb(28_31_43/0.6)]" loading="lazy" />
          </Reveal>
        ))}
      </div>

      <div className="v2-shell relative -mt-[clamp(6rem,14vw,12rem)] grid gap-10 pb-[clamp(4rem,8vw,7rem)] md:grid-cols-2">
        <Reveal>
          <h2 className="udsigt-h2 max-w-[12ch]">Skræddersyet til åbningen</h2>
          <p className="udsigt-body mt-5 max-w-[42ch]">{CRAFT.lead}</p>
        </Reveal>
        <Reveal delay={100} className="md:pt-16">
          <h3 className="udsigt-h2 max-w-[13ch]">{PRINCIPLES[0].headline}</h3>
          <p className="udsigt-body mt-5 max-w-[42ch]">{PRINCIPLES[0].body}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Process ──────────────────────────────────────────────────────────────────
   "Customise your trip": three numbered steps on a hairline, large serif
   numerals, and the photograph beside them. */
const STEPS = [
  { title: 'Fortæl os om åbningen', body: 'Mål, placering og den effekt du er ude efter. Du har et tilbud inden for 24 timer på hverdage.' },
  { title: 'Vi måler op på stedet', body: 'Vi laver ikke standardstørrelser. Hvert parti måles op og produceres til den præcise åbning.' },
  { title: 'Vi monterer', body: 'Filmen lamineres i glasset, kablingen skjules i rammen, og vores eget hold monterer — i hele Danmark.' },
];

function UdsigtProcess() {
  return (
    <section id="proces" className="py-[clamp(4rem,8vw,7rem)]">
      <div className="v2-shell grid items-center gap-x-16 gap-y-12 md:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="udsigt-h2 max-w-[12ch]">Sådan bliver det til</h2>
          </Reveal>
          <ol className="relative mt-10 space-y-10 before:absolute before:bottom-3 before:left-[0.9rem] before:top-3 before:w-px before:bg-udsigt-line">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="relative grid grid-cols-[2rem_1fr] gap-6">
                <span className="relative bg-udsigt-bg text-center font-[family-name:var(--font-cormorant)] text-[2.2rem] font-light leading-none">{i + 1}</span>
                <span>
                  <span className="udsigt-h3 block">{s.title}</span>
                  <span className="udsigt-body mt-2 block max-w-[40ch]">{s.body}</span>
                </span>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={300}>
            <a href="#kontakt" className="udsigt-pill ml-14 mt-10">Start en forespørgsel</a>
          </Reveal>
        </div>
        <Reveal fade delay={120}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.udsigtOffice} alt={ALT.udsigtOffice} className="udsigt-fade-y aspect-[4/5] w-full rounded-[16px] object-cover" loading="lazy" />
        </Reveal>
      </div>
    </section>
  );
}

function UdsigtSpecs() {
  return (
    <section id="specifikationer" className="bg-udsigt-haze py-[clamp(4rem,8vw,7rem)]">
      <div className="v2-shell">
        <Reveal className="text-center">
          <h2 className="udsigt-h2 mx-auto">{SPECS.headline}</h2>
          <p className="udsigt-body mx-auto mt-4 max-w-[46ch]">{SPECS.lead}</p>
        </Reveal>
        <Reveal delay={100} className="mx-auto mt-10 max-w-[64rem] overflow-x-auto rounded-[18px] border border-white/70 bg-white/55 backdrop-blur">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-udsigt-line">
                <th scope="col" className="udsigt-label px-6 py-5 text-udsigt-ink-2">Egenskab</th>
                {SPECS.columns.map((c) => (
                  <th key={c} scope="col" className="udsigt-h3 px-6 py-5">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPECS.rows.map((row) => (
                <tr key={row.label} className="border-b border-udsigt-line last:border-b-0">
                  <th scope="row" className="px-6 py-4 text-[0.875rem] font-normal text-udsigt-ink-2">{row.label}</th>
                  {row.values.map((v, i) => (
                    <td key={`${row.label}-${i}`} className="v2-num-sm px-6 py-4 text-[0.9375rem]">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="udsigt-body mt-5 text-center text-[0.8125rem]">{SPECS.note}</p>
      </div>
    </section>
  );
}

/* "Customer reviews" in the reference. A template has no customers to quote,
   so the two cards carry the two principles instead of invented testimonials. */
function UdsigtPrinciples() {
  return (
    <section className="py-[clamp(4rem,8vw,7rem)]">
      <Reveal className="v2-shell text-center">
        <h2 className="udsigt-h2 mx-auto">Det, vi står på</h2>
      </Reveal>
      <div className="v2-shell mt-10 grid max-w-[64rem] gap-4 md:grid-cols-2">
        {PRINCIPLES.map((pr, i) => (
          <Reveal key={pr.index} delay={i * 90}>
            <figure className="h-full rounded-[18px] border border-white/70 bg-white/45 p-8 backdrop-blur">
              <Diamond className="text-udsigt-ink-2" />
              <blockquote className="mt-6 font-[family-name:var(--font-cormorant)] text-[1.4rem] font-light italic leading-[1.35]">{pr.body}</blockquote>
              <figcaption className="udsigt-label mt-7 text-udsigt-ink-2">
                {pr.label} {pr.index} — {pr.headline}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────────────────────────
   The pool, faded at both ends, and a call-me-back card over it. */
function UdsigtContact() {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    mailto('Ring mig op', `Navn: ${data.get('navn')}\nTelefon: ${data.get('telefon')}`);
  };

  return (
    <section id="kontakt" className="relative flex min-h-[max(40rem,100svh)] items-center overflow-hidden py-20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.udsigtPool} alt={ALT.udsigtPool} className="udsigt-fade-y absolute inset-0 size-full object-cover" loading="lazy" />
      <Reveal className="relative mx-auto w-[min(100%-2*var(--v2-gutter),30rem)] rounded-[20px] border border-white/70 bg-udsigt-bg/80 p-[clamp(1.75rem,4vw,2.75rem)] text-center backdrop-blur-xl">
        <h2 className="udsigt-h2 mx-auto">{CTA.label}</h2>
        <p className="udsigt-body mx-auto mt-4 max-w-[34ch]">{CTA.lead}</p>
        <form onSubmit={submit} className="mt-7 space-y-5 text-left">
          <label className="block">
            <span className="udsigt-label text-udsigt-ink-2">Navn</span>
            <input name="navn" required autoComplete="name" className="mt-1 w-full border-b border-udsigt-ink/30 bg-transparent py-2 text-[0.9375rem] outline-none focus:border-udsigt-ink" />
          </label>
          <label className="block">
            <span className="udsigt-label text-udsigt-ink-2">Telefon</span>
            <input name="telefon" type="tel" required autoComplete="tel" className="mt-1 w-full border-b border-udsigt-ink/30 bg-transparent py-2 text-[0.9375rem] outline-none focus:border-udsigt-ink" />
          </label>
          <button type="submit" className="udsigt-pill mx-auto !mt-8 flex">Ring mig op</button>
        </form>
        <p className="udsigt-label mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-udsigt-ink-2">
          <a href={`mailto:${BRAND.email}`} className="hover:text-udsigt-ink">{BRAND.email}</a>
          <a href={BRAND.phoneHref} className="hover:text-udsigt-ink">{BRAND.phone}</a>
        </p>
      </Reveal>
    </section>
  );
}

function UdsigtFooter() {
  return (
    <footer className="pb-12 pt-6 text-center">
      <p className="flex items-center justify-center gap-3 font-[family-name:var(--font-cormorant)] text-[1.6rem] font-medium">
        <Diamond />
        {BRAND.name}
      </p>
      <p className="udsigt-label mt-4 text-udsigt-ink-2">{BRAND.area}</p>
      <p className="udsigt-label mt-2 text-udsigt-ink-2">© 2026 {BRAND.full}</p>
    </footer>
  );
}
