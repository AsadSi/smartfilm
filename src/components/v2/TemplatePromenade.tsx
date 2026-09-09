import { ALT, BRAND, CRAFT, CTA, FOOTER, HERO, IMG, NAV, PRINCIPLES, PRODUCTS, REFERENCES, SPECS } from '@/content/v2';
import { Arrow, Loop, Reveal } from './primitives';

/**
 * TEMPLATE D · PROMENADE — the concourse
 *
 * The daylit half of the same building Salon lives in: a marble atrium at noon
 * rather than a boutique at eleven at night. It exists to give the luxury brief
 * a light answer, because a client who wants "expensive" does not always mean
 * "dark", and the two are hard to judge without seeing both.
 *
 * Three things make it its own thing rather than a pale Salon:
 *
 *  · Wayfinding type. Light weight, capitals, tracked at 0.22em — far enough
 *    apart that the spacing becomes the texture of the page. It is the voice of
 *    airport signage, and it is the option Salon deliberately did not take.
 *  · A left rail. Every section hangs off one hairline running down the page,
 *    with the content indented from it the way signage hangs off a wall. Salon
 *    centres everything; this never centres anything.
 *  · Portals. Images sit in tall arched frames rather than rectangles. It is
 *    the one ornamental decision in the entire set, and it is what makes the
 *    page read as a colonnade of shopfronts instead of a grid of photographs.
 *
 * Warm stone throughout, warm ink, and gold reduced to a hairline — on a pale
 * ground the same champagne that glows on Salon's black would just look like a
 * highlighter, so here it does almost nothing and does it precisely.
 */
export default function TemplatePromenade() {
  return (
    <div className="tpl-bone bg-bone text-stone-ink">
      <PromHeader />
      <main id="main">
        <PromHero />
        <PromCollection />
        <PromQuote />
        <PromPrinciples />
        <PromFigures />
        <PromSpecs />
        <PromPlates />
        <PromCta />
      </main>
      <PromFooter />
    </div>
  );
}

/* ── Header ─────────────────────────────────────────────────────────────────
   A signage band, not a nav bar: hairline top and bottom, wordmark tracked wide
   on the left, sections spaced out across the right. No hamburger at any width
   — on a phone it simply wraps, the way a directory board does. */
function PromHeader() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-stone-ink focus:px-4 focus:py-3 focus:text-bone">
        Gå til indhold
      </a>
      <header className="sticky top-0 z-50 border-b border-stone-ink/15 bg-bone/92 backdrop-blur">
        <div className="v2-shell flex flex-wrap items-center justify-between gap-x-10 gap-y-3 py-5">
          <a href="#top" className="text-[0.8125rem] font-light uppercase tracking-[0.42em]">
            {BRAND.name}
          </a>
          <nav aria-label="Sektioner">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="prom-label transition-colors duration-500 hover:text-stone-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────────
   No full-bleed anything. The film sits inside a portal — a tall arched frame
   with stone all around it — because the whole conceit is that you are looking
   *through* an opening in a wall rather than at a screen. */
function PromHero() {
  return (
    <section id="top" className="v2-shell pb-[clamp(3rem,7vw,6rem)] pt-[clamp(2.5rem,6vw,5rem)]">
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <Reveal className="prom-rail pl-6 lg:col-span-5 lg:self-center lg:pl-10">
          <p className="prom-label">{HERO.label}</p>
          <h1 className="prom-display mt-7">{HERO.headline}</h1>
          <p className="prom-body mt-8 max-w-[42ch]">{HERO.lead}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#serien" className="prom-btn prom-btn-fill">{HERO.primary}</a>
            <a href="#kontakt" className="prom-btn">
              {HERO.secondary}
              <Arrow />
            </a>
          </div>
        </Reveal>

        <Reveal fade delay={120} className="lg:col-span-6 lg:col-start-7">
          <div className="prom-portal aspect-[3/4] w-full">
            <Loop
              video="/assets/hero.mp4"
              videoHevc="/assets/optimized/hero.h265.mp4"
              poster="/assets/hero-poster.jpg"
              className="size-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Collection ─────────────────────────────────────────────────────────────
   Three portals in a colonnade. Equal widths, equal arches, evenly spaced —
   which is the one moment the template allows itself symmetry, because a
   colonnade that is not evenly spaced is a mistake rather than a rhythm. */
function PromCollection() {
  return (
    <section id="serien" className="border-t border-stone-ink/15 bg-stone py-[clamp(3.5rem,8vw,7rem)]">
      <div className="v2-shell">
        <Reveal className="prom-rail pl-6 lg:pl-10">
          <p className="prom-label">Kollektionen</p>
          <h2 className="prom-h2 mt-6 max-w-[24ch]">Tre teknologier, ét materiale</h2>
          <p className="prom-body mt-6 max-w-[52ch]">
            Alle tre lever i glasset frem for foran det. Forskellen er, hvad du vil have glasset til
            at gøre, når nogen kigger på det.
          </p>
        </Reveal>

        <ul className="mt-[clamp(2.5rem,6vw,4.5rem)] grid gap-x-8 gap-y-14 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 110}>
              <a href={p.href} className="group block">
                <div className="prom-portal aspect-[2/3] w-full bg-bone">
                  <Loop
                    video={p.film.video}
                    videoHevc={p.film.hevc}
                    poster={p.film.poster}
                    className="size-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-cold)] group-hover:scale-[1.04]"
                  />
                </div>

                <div className="mt-7 text-center">
                  <p className="prom-label">{p.index}</p>
                  <h3 className="prom-h2 mt-4 text-[clamp(1.05rem,1.7vw,1.35rem)]">{p.name}</h3>
                  <p className="prom-body mt-4 text-[0.9375rem]">{p.blurb}</p>

                  <p className="mt-6 font-[family-name:var(--font-serif)] text-[2rem] leading-none">
                    {p.figure.value}
                    {p.figure.unit ? <span className="text-base text-gold-ink"> {p.figure.unit}</span> : null}
                  </p>
                  <p className="prom-label mt-3 normal-case tracking-[0.16em]">{p.figure.label}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Quote ──────────────────────────────────────────────────────────────────
   The single serif moment in the template. One italic didone sentence on bare
   stone — it is what stops a page of tracked capitals from reading as an
   airport departure board with no warmth in it anywhere. */
function PromQuote() {
  return (
    <section className="border-t border-stone-ink/15 py-[clamp(4rem,10vw,9rem)]">
      <Reveal className="v2-shell">
        <div className="prom-rail max-w-[46rem] pl-6 lg:pl-10">
          <p className="prom-label">Idéen</p>
          <p className="prom-quote mt-8">
            Glasset gør arbejdet. Alt andet træder tilbage — rammen, kablingen, kontakten og os.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Principles ─────────────────────────────────────────────────────────────
   Portal on one side, copy hanging off the rail on the other, alternating. The
   arch flips to the outer edge each time so the two sections do not read as one
   layout used twice. */
function PromPrinciples() {
  return (
    <section id="teknologi" className="border-t border-stone-ink/15">
      {PRINCIPLES.map((p, i) => (
        <div key={p.index} className="v2-shell border-stone-ink/15 py-[clamp(3.5rem,8vw,7rem)] [&:not(:first-child)]:border-t">
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <Reveal className={`prom-rail pl-6 lg:col-span-5 lg:self-center lg:pl-10 ${i % 2 ? 'lg:order-2 lg:col-start-8' : ''}`}>
              <p className="prom-label">
                {p.label} {p.index}
              </p>
              <h2 className="prom-h2 mt-6">{p.headline}</h2>
              <p className="prom-body mt-6 max-w-[44ch]">{p.body}</p>
              <ul className="mt-9 max-w-[40ch]">
                {p.points.map((pt) => (
                  <li key={pt} className="border-t border-stone-ink/12 py-4 text-[0.9375rem] leading-relaxed last:border-b">
                    {pt}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal fade delay={100} className={`lg:col-span-6 ${i % 2 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}>
              <div className="prom-portal aspect-[4/5] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.alt} className="size-full object-cover" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      ))}
    </section>
  );
}

function PromFigures() {
  return (
    <section className="border-t border-stone-ink/15 bg-stone py-[clamp(3.5rem,8vw,7rem)]">
      <div className="v2-shell">
        <Reveal className="prom-rail pl-6 lg:pl-10">
          <p className="prom-label">{CRAFT.label}</p>
          <h2 className="prom-h2 mt-6 max-w-[26ch]">{CRAFT.headline}</h2>
          <p className="prom-body mt-6 max-w-[52ch]">{CRAFT.lead}</p>
        </Reveal>

        <Reveal delay={120}>
          <dl className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {CRAFT.figures.map((f) => (
              <div key={f.label} className="border-stone-ink/15 px-4 max-lg:even:border-l lg:border-l lg:first:border-l-0 lg:first:pl-0">
                <dd className="font-[family-name:var(--font-serif)] leading-none">
                  <span className="text-[clamp(2.25rem,4.5vw,3.5rem)]">{f.value}</span>
                  {f.unit ? <span className="text-[clamp(1rem,1.8vw,1.35rem)] text-gold-ink"> {f.unit}</span> : null}
                </dd>
                <dt className="prom-label mt-5 max-w-[18ch] normal-case tracking-[0.16em]">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function PromSpecs() {
  return (
    <section id="specifikationer" className="border-t border-stone-ink/15 py-[clamp(3.5rem,8vw,7rem)]">
      <div className="v2-shell">
        <Reveal className="prom-rail pl-6 lg:pl-10">
          <p className="prom-label">{SPECS.label}</p>
          <h2 className="prom-h2 mt-6">{SPECS.headline}</h2>
          <p className="prom-body mt-6 max-w-[48ch]">{SPECS.lead}</p>
        </Reveal>

        <Reveal delay={100} className="mt-[clamp(2.5rem,5vw,4rem)] overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-stone-ink/45">
                <th scope="col" className="prom-label sticky left-0 z-10 bg-bone py-4 pr-6 align-bottom">Egenskab</th>
                {SPECS.columns.map((c) => (
                  <th key={c} scope="col" className="py-4 pl-6 align-bottom text-[0.8125rem] font-light uppercase tracking-[0.2em]">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPECS.rows.map((row) => (
                <tr key={row.label} className="border-b border-stone-ink/12">
                  <th scope="row" className="prom-label sticky left-0 z-10 bg-bone py-4 pr-6 normal-case tracking-[0.16em]">{row.label}</th>
                  {row.values.map((v, i) => (
                    <td key={`${row.label}-${SPECS.columns[i]}`} className="v2-num-sm py-4 pl-6 text-[1.0625rem]">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={140}>
          <p className="prom-label mt-6 max-w-[64ch] normal-case leading-[1.9] tracking-[0.12em]">{SPECS.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

function PromPlates() {
  return (
    <section id="referencer" className="border-t border-stone-ink/15 bg-stone py-[clamp(3.5rem,8vw,7rem)]">
      <div className="v2-shell">
        <Reveal className="prom-rail pl-6 lg:pl-10">
          <p className="prom-label">Referencer</p>
          <h2 className="prom-h2 mt-6">Set i brug</h2>
        </Reveal>

        <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {REFERENCES.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 90} fade>
              <figure className="group">
                <div className="prom-portal aspect-[2/3] w-full bg-bone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt={r.alt} className="size-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-cold)] group-hover:scale-[1.04]" loading="lazy" />
                </div>
                <figcaption className="mt-5 text-center">
                  <span className="block text-[0.8125rem] font-light uppercase tracking-[0.24em]">{r.title}</span>
                  <span className="prom-label mt-3 block normal-case tracking-[0.16em]">{r.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PromCta() {
  return (
    <section id="kontakt" className="border-t border-stone-ink/15 py-[clamp(4rem,9vw,8rem)]">
      <div className="v2-shell grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <Reveal className="prom-rail pl-6 lg:col-span-6 lg:self-center lg:pl-10">
          <p className="prom-label">{CTA.label}</p>
          <h2 className="prom-display mt-7">{CTA.headline}</h2>
          <p className="prom-body mt-8 max-w-[42ch]">{CTA.lead}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${BRAND.email}`} className="prom-btn prom-btn-fill">{CTA.primary}</a>
            <a href={BRAND.phoneHref} className="prom-btn">
              {CTA.secondary}
              <Arrow />
            </a>
          </div>
        </Reveal>

        <Reveal fade delay={120} className="lg:col-span-5 lg:col-start-8">
          <div className="prom-portal aspect-[4/5] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.facadeGeometric} alt={ALT.facadeGeometric} className="size-full object-cover" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PromFooter() {
  return (
    <footer className="border-t border-stone-ink/15 bg-stone py-[clamp(2.5rem,5vw,4rem)]">
      <div className="v2-shell grid gap-x-8 gap-y-10 md:grid-cols-4">
        <div>
          <p className="text-[0.8125rem] font-light uppercase tracking-[0.42em]">{BRAND.name}</p>
          <p className="prom-body mt-5 max-w-[30ch] text-[0.9375rem]">{FOOTER.tagline}</p>
        </div>

        {FOOTER.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="prom-label">{col.title}</h2>
            <ul className="mt-5 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#serien" className="text-[0.9375rem] text-stone-ink-2 transition-colors duration-500 hover:text-stone-ink">{l}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Kontakt">
          <h2 className="prom-label">Kontakt</h2>
          <ul className="mt-5 space-y-2.5 text-[0.9375rem] text-stone-ink-2">
            <li><a href={`mailto:${BRAND.email}`} className="hover:text-stone-ink">{BRAND.email}</a></li>
            <li><a href={BRAND.phoneHref} className="hover:text-stone-ink">{BRAND.phone}</a></li>
            <li>{BRAND.area}</li>
          </ul>
        </nav>
      </div>

      <div className="v2-shell mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-stone-ink/15 pt-5">
        {FOOTER.legal.map((l) => (
          <span key={l} className="prom-label normal-case tracking-[0.14em]">{l}</span>
        ))}
      </div>
    </footer>
  );
}
