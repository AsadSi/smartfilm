import {
  BRAND,
  CRAFT,
  CTA,
  FOOTER,
  HERO,
  IMG,
  ALT,
  NAV,
  PRINCIPLES,
  PRODUCTS,
  REFERENCES,
  SPECS,
} from '@/content/v2';
import { Arrow, Reveal } from './primitives';

/**
 * TEMPLATE B · INDEX — after Audi, and after the printed product catalogue
 *
 * The deliberate opposite of template A. Where A hides the structure under
 * photography, B *is* the structure: a numbered contents list at the top, every
 * section carrying its own number, a 12-column grid you can see, captions out
 * in the margin, and monospaced figures so the numbers line up in a column.
 *
 * Three rules hold it together, and each one is the reason it does not turn
 * into template A:
 *
 *  · Nothing is full-bleed. Every image sits in a field with the page margin
 *    visible on both sides. A full-bleed photograph is a mood; an inset one is
 *    a plate in a catalogue, and the margin around it is what says so.
 *  · No text is ever set on an image. Copy and photography never overlap.
 *  · Uppercase throughout, tracked open. It is colder than sentence case and it
 *    is the register every architectural-glass supplier in Europe uses, which
 *    is exactly why it reads as specification rather than as advertising.
 *
 * The whole page is a server component. There is no interactivity to speak of —
 * which is itself part of the argument for this direction.
 */
export default function TemplateIndex() {
  return (
    <>
      <IndexHeader />
      <main id="main">
        <IndexMasthead />
        <IndexContents />
        <IndexRange />
        {PRINCIPLES.map((p, i) => (
          <IndexPrinciple key={p.index} principle={p} flip={i % 2 === 1} />
        ))}
        <IndexCraft />
        <IndexSpecs />
        <IndexPlates />
        <IndexContact />
      </main>
      <IndexFooter />
    </>
  );
}

/* ── Header ─────────────────────────────────────────────────────────────────
   Wordmark hard left, nav inline beside it, no centring and nothing hidden
   behind a hamburger on desktop. A catalogue puts its contents on the cover. */
function IndexHeader() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-white">
        Gå til indhold
      </a>
      <header className="sticky top-0 z-50 border-b border-ink bg-paper">
        <div className="v2-shell flex h-[var(--v2-header-h)] items-center gap-10">
          <a href="#top" className="font-[family-name:var(--font-sans)] text-[0.9375rem] font-medium uppercase leading-none tracking-[0.3em]">
            {BRAND.name}
          </a>
          <nav aria-label="Sektioner" className="max-lg:hidden">
            <ul className="flex items-center gap-8">
              {NAV.map((item, i) => (
                <li key={item.href}>
                  <a href={item.href} className="idx-mono transition-colors duration-300 hover:text-ink">
                    <span className="text-signal-deep">{String(i + 1).padStart(2, '0')}</span>{' '}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#kontakt" className="idx-mono ml-auto text-ink">
            {BRAND.phone}
          </a>
        </div>
      </header>
    </>
  );
}

/* ── Masthead ───────────────────────────────────────────────────────────────
   No hero image at all. The catalogue opens on a title page: the claim set
   large, the standfirst beside it, and the specification of the document
   itself — edition, scope, territory — in the margin. */
function IndexMasthead() {
  return (
    <section id="top" className="v2-shell border-b border-ink pb-[clamp(3rem,6vw,6rem)] pt-[clamp(3rem,7vw,7rem)]">
      <Reveal className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="idx-mono">Udgave 2026 · Arkitektonisk glas</p>
          <h1 className="idx-display-lg mt-6">{HERO.headlineAlt}</h1>
          <p className="v2-lead mt-8 max-w-[52ch]">{HERO.lead}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#serien" className="v2-btn v2-btn-solid">{HERO.primary}</a>
            <a href="#kontakt" className="v2-btn v2-btn-line">
              {HERO.secondary}
              <Arrow />
            </a>
          </div>
        </div>

        <dl className="lg:col-span-3 lg:col-start-10 lg:border-l lg:border-hair lg:pl-8">
          {[
            ['Teknologier', '3'],
            ['Territorium', 'Danmark'],
            ['Svartid', '24 t'],
            ['Montage', 'Eget hold'],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 border-b border-hair py-3 first:border-t first:border-hair">
              <dt className="idx-mono">{k}</dt>
              <dd className="idx-num text-[0.9375rem] text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

/* ── Contents ───────────────────────────────────────────────────────────────
   The table of contents, and the single element that decides whether this
   direction reads as a catalogue. Nothing else on the web does this, which is
   both the risk and the entire point. */
function IndexContents() {
  const entries = [
    ['01', 'Serien', 'Tre teknologier, ét materiale', '#serien'],
    ['02', 'Teknologi', 'To principper bag udførelsen', '#teknologi'],
    ['03', 'Håndværket', 'Opmåling, laminering, montage', '#haandvaerket'],
    ['04', 'Specifikationer', 'Datablad for alle tre', '#specifikationer'],
    ['05', 'Referencer', 'Udførte opgaver', '#referencer'],
    ['06', 'Kontakt', 'Tilbud inden for 24 timer', '#kontakt'],
  ];

  return (
    <section className="v2-shell border-b border-ink py-[clamp(2rem,4vw,3.5rem)]">
      <p className="idx-mono mb-6">Indhold</p>
      <ol>
        {entries.map(([n, title, sub, href], i) => (
          <Reveal as="li" key={n} delay={i * 40}>
            <a href={href} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 border-b border-hair py-4 md:grid-cols-[4rem_16rem_1fr_auto] md:gap-x-8">
              <span className="idx-num text-signal-deep">{n}</span>
              <span className="text-[0.9375rem] font-medium uppercase tracking-[0.08em]">{title}</span>
              <span className="idx-mono max-md:hidden">{sub}</span>
              <Arrow className="text-ink-3 transition-transform duration-[420ms] ease-[var(--ease-cold)] group-hover:translate-x-1" />
            </a>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ── Range ──────────────────────────────────────────────────────────────────
   Three rows, not three cards. A catalogue lists its range down the page with
   the plate on one side and the data on the other, because that is the layout
   you can actually read across — and reading across is what someone comparing
   three products is trying to do. */
function IndexRange() {
  return (
    <section id="serien" className="v2-shell border-b border-ink py-[clamp(3rem,6vw,6rem)]">
      <SectionHead n="01" title="Serien" lead="Alle tre lever i glasset frem for foran det. Forskellen er, hvad du vil have glasset til at gøre, når nogen kigger på det." />

      <ul className="mt-[clamp(2rem,4vw,3.5rem)]">
        {PRODUCTS.map((p, i) => (
          <Reveal as="li" key={p.name} delay={i * 60}>
            <article className="grid items-start gap-x-8 gap-y-6 border-t border-hair py-8 md:grid-cols-12">
              <p className="idx-num text-signal-deep md:col-span-1">{p.index}</p>

              <div className="md:col-span-3">
                <h3 className="text-[1.0625rem] font-medium uppercase tracking-[0.08em]">{p.name}</h3>
                <p className="idx-mono mt-2">{p.tagline}</p>
              </div>

              <p className="v2-body max-w-[46ch] text-[0.9375rem] md:col-span-4">{p.blurb}</p>

              <div className="md:col-span-2">
                <p>
                  <span className="idx-num text-[1.75rem] text-ink">{p.figure.value}</span>
                  {p.figure.unit ? <span className="idx-num ml-0.5 text-base text-ink-3">{p.figure.unit}</span> : null}
                </p>
                <p className="idx-mono mt-2 max-w-[18ch] normal-case tracking-normal">{p.figure.label}</p>
              </div>

              {/* The plate. 3:2, inset, never bleeding — the margin around it is
                  what makes it a catalogue illustration rather than a mood. */}
              <div className="md:col-span-2">
                <div className="aspect-[3/2] w-full overflow-hidden bg-fog">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.photo} alt={p.alt} className="size-full object-cover" loading="lazy" />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ── Principles ─────────────────────────────────────────────────────────────
   Copy in a 5-column measure, plate in a 6-column field, caption in the margin
   under it. Alternating sides is the cheapest way to stop two consecutive
   sections of identical construction from reading as a template — which is
   precisely what they are. */
function IndexPrinciple({ principle, flip }: { principle: (typeof PRINCIPLES)[number]; flip: boolean }) {
  return (
    <section id={principle.index === '01' ? 'teknologi' : undefined} className="v2-shell border-b border-ink py-[clamp(3rem,6vw,6rem)]">
      <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
        <Reveal className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
          <p className="idx-mono">
            <span className="text-signal-deep">{principle.index}</span> · {principle.label}
          </p>
          <h2 className="idx-display mt-5">{principle.headline}</h2>
          <p className="v2-body mt-6 max-w-[46ch]">{principle.body}</p>

          <ul className="mt-8">
            {principle.points.map((pt) => (
              <li key={pt} className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-t border-hair py-3 last:border-b">
                <span className="idx-mono text-signal-deep">—</span>
                <span className="text-[0.9375rem] text-ink-2">{pt}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal fade className={`lg:col-span-6 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}>
          <figure>
            <div className="aspect-[4/3] w-full overflow-hidden bg-fog">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={principle.image} alt={principle.alt} className="size-full object-cover" loading="lazy" />
            </div>
            <figcaption className="idx-mono mt-3 normal-case tracking-normal">
              Fig. {principle.index} — {principle.alt}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function IndexCraft() {
  return (
    <section id="haandvaerket" className="v2-shell border-b border-ink py-[clamp(3rem,6vw,6rem)]">
      <SectionHead n="03" title={CRAFT.label} lead={CRAFT.lead} />
      <Reveal delay={80}>
        <h2 className="idx-display mt-8">{CRAFT.headline}</h2>
      </Reveal>
      <Reveal delay={140}>
        <dl className="mt-[clamp(2rem,4vw,3.5rem)] grid grid-cols-2 gap-px bg-hair lg:grid-cols-4">
          {CRAFT.figures.map((f) => (
            <div key={f.label} className="bg-paper p-6">
              <dd>
                <span className="idx-num text-[clamp(2rem,4vw,3rem)] text-ink">{f.value}</span>
                {f.unit ? <span className="idx-num ml-1 text-xl text-signal-deep">{f.unit}</span> : null}
              </dd>
              <dt className="idx-mono mt-4 max-w-[20ch] normal-case tracking-normal">{f.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

/* ── Specs ──────────────────────────────────────────────────────────────────
   This is the section the whole direction is built around. In template A the
   datasheet is an afterthought near the bottom; here it is the centrepiece,
   set in mono, and it is the strongest argument for choosing B: if the people
   buying this actually shop on numbers, the design should say so. */
function IndexSpecs() {
  return (
    <section id="specifikationer" className="v2-shell border-b border-ink py-[clamp(3rem,6vw,6rem)]">
      <SectionHead n="04" title={SPECS.label} lead={SPECS.lead} />

      <Reveal delay={80} className="mt-[clamp(2rem,4vw,3.5rem)] overflow-x-auto">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <thead>
            <tr className="idx-rule border-b-2">
              <th scope="col" className="idx-mono sticky left-0 z-10 bg-paper py-4 pr-6 align-bottom">Egenskab</th>
              {SPECS.columns.map((c) => (
                <th key={c} scope="col" className="py-4 pl-6 align-bottom text-[0.9375rem] font-medium uppercase tracking-[0.08em]">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SPECS.rows.map((row) => (
              <tr key={row.label} className="border-b border-hair">
                <th scope="row" className="idx-mono sticky left-0 z-10 bg-paper py-4 pr-6 font-normal normal-case tracking-normal">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={`${row.label}-${SPECS.columns[i]}`} className="idx-num py-4 pl-6 text-[0.9375rem] text-ink">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Reveal delay={120}>
        <p className="idx-mono mt-6 max-w-[62ch] normal-case tracking-normal">{SPECS.note}</p>
      </Reveal>
    </section>
  );
}

/* ── Plates ─────────────────────────────────────────────────────────────────
   A plate grid, numbered and captioned in the margin. Same four photographs as
   template A's reference band; the difference is that here they are evidence
   with a figure number, not atmosphere. */
function IndexPlates() {
  return (
    <section id="referencer" className="v2-shell border-b border-ink py-[clamp(3rem,6vw,6rem)]">
      <SectionHead n="05" title="Referencer" lead="Udførte opgaver, med areal og montageform." />
      <ul className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {REFERENCES.map((r, i) => (
          <Reveal as="li" key={r.title} delay={i * 60}>
            <figure>
              <div className="aspect-[3/4] w-full overflow-hidden bg-fog">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt={r.alt} className="size-full object-cover" loading="lazy" />
              </div>
              <figcaption className="mt-3">
                <span className="idx-mono">Pl. {String(i + 1).padStart(2, '0')}</span>
                <span className="mt-1 block text-[0.9375rem] font-medium uppercase tracking-[0.06em]">{r.title}</span>
                <span className="idx-mono mt-1 block normal-case tracking-normal">{r.meta}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function IndexContact() {
  return (
    <section id="kontakt" className="v2-shell border-b border-ink py-[clamp(3rem,6vw,6rem)]">
      <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="idx-mono"><span className="text-signal-deep">06</span> · {CTA.label}</p>
          <h2 className="idx-display-lg mt-5">{CTA.headline}</h2>
          <p className="v2-lead mt-6 max-w-[44ch]">{CTA.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${BRAND.email}`} className="v2-btn v2-btn-solid">
              {CTA.primary}
              <Arrow />
            </a>
            <a href={BRAND.phoneHref} className="v2-btn v2-btn-line">{CTA.secondary}</a>
          </div>
        </Reveal>

        <Reveal fade className="lg:col-span-5 lg:col-start-8">
          <div className="aspect-[4/3] w-full overflow-hidden bg-fog">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.facadeDetail} alt={ALT.facadeDetail} className="size-full object-cover" loading="lazy" />
          </div>
          <p className="idx-mono mt-3 normal-case tracking-normal">Fig. 03 — {ALT.facadeDetail}</p>
        </Reveal>
      </div>
    </section>
  );
}

function IndexFooter() {
  return (
    <footer className="v2-shell py-[clamp(2.5rem,5vw,4rem)]">
      <div className="grid gap-x-8 gap-y-10 md:grid-cols-4">
        <p className="v2-body max-w-[32ch] text-[0.9375rem]">{FOOTER.tagline}</p>
        {FOOTER.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="idx-mono">{col.title}</h2>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#serien" className="text-[0.9375rem] text-ink-2 transition-colors duration-300 hover:text-ink">{l}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <nav aria-label="Kontakt">
          <h2 className="idx-mono">Kontakt</h2>
          <ul className="mt-4 space-y-2">
            <li><a href={`mailto:${BRAND.email}`} className="text-[0.9375rem] text-ink-2 hover:text-ink">{BRAND.email}</a></li>
            <li><a href={BRAND.phoneHref} className="text-[0.9375rem] text-ink-2 hover:text-ink">{BRAND.phone}</a></li>
          </ul>
        </nav>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-ink pt-5">
        {FOOTER.legal.map((l) => (
          <span key={l} className="idx-mono normal-case tracking-normal">{l}</span>
        ))}
      </div>
    </footer>
  );
}

/** The section header used by every numbered section in this template. */
function SectionHead({ n, title, lead }: { n: string; title: string; lead: string }) {
  return (
    <Reveal className="grid gap-x-8 gap-y-4 lg:grid-cols-12">
      <p className="idx-mono lg:col-span-5">
        <span className="text-signal-deep">{n}</span> · {title}
      </p>
      <p className="v2-body max-w-[54ch] lg:col-span-6 lg:col-start-7">{lead}</p>
    </Reveal>
  );
}
