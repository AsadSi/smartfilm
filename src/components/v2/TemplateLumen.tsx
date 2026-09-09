import { ALT, BRAND, CRAFT, CTA, FOOTER, HERO, IMG, NAV, PRINCIPLES, PRODUCTS, REFERENCES, SPECS } from '@/content/v2';
import { Arrow, Loop, Reveal } from './primitives';

/**
 * TEMPLATE E · LUMEN — the high-end tech landing page
 *
 * Linear, Vercel, Stripe. The point of including it is that it is the only
 * direction in the set that reads as *software* rather than as a building or a
 * boutique, and for a company selling a switchable, app-controlled material
 * that is not obviously the wrong frame.
 *
 * It gets there by doing almost nothing:
 *
 *  · It has corners. Every other template measures 0px on every surface —
 *    that was the architectural conceit holding them together. This one rounds
 *    to 10–14px, and that single change moves the whole page from architecture
 *    to product before a word has been read.
 *  · It refuses scale. The display tops out near 60px where Vitrine reaches
 *    136. These pages never shout; they set a normal headline and give it a
 *    screenful of air, and the air does the work.
 *  · It shows its instrumentation. Mono eyebrows, hairline bento cells, a dot
 *    lattice behind the hero — the surface of something engineered and
 *    measured rather than styled.
 *
 * The bento grid is the one section that is genuinely load-bearing: it is
 * where a tech landing page proves it has more than one idea, and it is also
 * the fastest layout in the set to extend when a fourth product arrives.
 */
export default function TemplateLumen() {
  return (
    <div className="tpl-lumen bg-lumen-bg text-lumen-ink">
      <LumenHeader />
      <main id="main">
        <LumenHero />
        <LumenBento />
        <LumenProducts />
        <LumenPrinciples />
        <LumenSpecs />
        <LumenReferences />
        <LumenCta />
      </main>
      <LumenFooter />
    </div>
  );
}

/* ── Header ─────────────────────────────────────────────────────────────────
   A floating capsule rather than a full-width bar: inset from the top, hairline
   border, blurred backdrop. It is the most recognisable chrome in the genre and
   it is the opposite of the other four, which all pin an edge-to-edge band to
   the top of the viewport. */
function LumenHeader() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-lumen-ink focus:px-4 focus:py-3 focus:text-white">
        Gå til indhold
      </a>
      <header className="sticky top-0 z-50 px-[var(--v2-gutter)] pt-4">
        <div className="mx-auto flex h-14 max-w-[68rem] items-center justify-between gap-6 rounded-xl border border-lumen-line bg-white/80 pl-5 pr-2 backdrop-blur-xl">
          <a href="#top" className="text-[0.9375rem] font-medium tracking-[-0.02em]">
            {BRAND.name}
          </a>

          <nav aria-label="Sektioner" className="max-lg:hidden">
            <ul className="flex items-center gap-7">
              {NAV.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[0.875rem] text-lumen-ink-2 transition-colors duration-300 hover:text-lumen-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#kontakt" className="lumen-btn lumen-btn-solid h-10 text-[0.875rem]">
            Forespørg
          </a>
        </div>
      </header>
    </>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────────
   Centred, badge over headline over one line of copy over two buttons, then the
   product shot in a card below. That stack is so standardised in this genre
   that deviating from it is what would look wrong. */
function LumenHero() {
  return (
    <section id="top" className="relative overflow-hidden px-[var(--v2-gutter)] pb-[clamp(3rem,6vw,5rem)] pt-[clamp(3.5rem,8vw,7rem)]">
      <div aria-hidden="true" className="lumen-grid-bg absolute inset-0" />

      <Reveal className="relative mx-auto flex max-w-[54rem] flex-col items-center text-center">
        <span className="lumen-badge">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
          {HERO.label}
        </span>

        <h1 className="lumen-display mt-7">{HERO.headline}</h1>
        <p className="lumen-body mt-6 max-w-[46ch] text-[1.0625rem]">{HERO.lead}</p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#serien" className="lumen-btn lumen-btn-solid">
            {HERO.primary}
            <Arrow />
          </a>
          <a href="#kontakt" className="lumen-btn lumen-btn-line">{HERO.secondary}</a>
        </div>
      </Reveal>

      {/* The product shot sits in a card with a hairline and a little padding —
          the "screenshot in a frame" that every one of these pages runs under
          its hero, except that here the screenshot is the material itself. */}
      <Reveal fade delay={140} className="relative mx-auto mt-[clamp(2.5rem,5vw,4rem)] max-w-[64rem]">
        <div className="lumen-cell p-2">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-lumen-bg">
            <Loop
              video="/assets/hero.mp4"
              videoHevc="/assets/optimized/hero.h265.mp4"
              poster="/assets/hero-poster.jpg"
              className="size-full object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Bento ──────────────────────────────────────────────────────────────────
   Where the page proves it has more than one idea. Cells of unequal size, each
   holding exactly one claim, and the largest one carrying an image — a grid of
   equal cells would just be a feature list with borders on it. */
function LumenBento() {
  return (
    <section id="teknologi" className="px-[var(--v2-gutter)] py-[clamp(3rem,6vw,5.5rem)]">
      <div className="mx-auto max-w-[68rem]">
        <Reveal>
          <p className="lumen-mono">Hvorfor</p>
          <h2 className="lumen-h2 mt-4">Teknologien skal forsvinde.</h2>
        </Reveal>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <article className="lumen-cell flex h-full flex-col justify-between gap-8 p-7">
              <div>
                <p className="lumen-mono">Princip 01</p>
                <h3 className="lumen-h3 mt-4">{PRINCIPLES[0].headline}</h3>
                <p className="lumen-body mt-3 max-w-[44ch] text-[0.9375rem]">{PRINCIPLES[0].body}</p>
              </div>
              <div className="aspect-[16/7] w-full overflow-hidden rounded-lg border border-lumen-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PRINCIPLES[0].image} alt={PRINCIPLES[0].alt} className="size-full object-cover" loading="lazy" />
              </div>
            </article>
          </Reveal>

          <Reveal delay={80}>
            <article className="lumen-cell flex h-full flex-col p-7">
              <p className="lumen-mono">Skiftetid</p>
              <p className="mt-5 text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-none tracking-[-0.05em]">
                &lt;1<span className="text-lumen-ink-3"> sek</span>
              </p>
              <p className="lumen-body mt-4 text-[0.9375rem]">
                Fra mat til krystalklart. Skiftet er hurtigere end den, der kigger, kan nå at
                registrere det.
              </p>
            </article>
          </Reveal>

          {PRINCIPLES[1].points.map((pt, i) => (
            <Reveal key={pt} delay={120 + i * 60}>
              <article className="lumen-cell flex h-full flex-col p-7">
                <span aria-hidden="true" className="mb-5 flex size-9 items-center justify-center rounded-lg border border-lumen-line bg-lumen-bg">
                  <span className="size-1.5 rounded-full bg-signal" />
                </span>
                <h3 className="lumen-h3">{pt}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Products ───────────────────────────────────────────────────────────────
   Three cards, each a framed product film with the key figure set as a number
   rather than as a claim. The figure is the pricing row of a SaaS card: it is
   what makes three otherwise identical cells comparable at a glance. */
function LumenProducts() {
  return (
    <section id="serien" className="border-y border-lumen-line px-[var(--v2-gutter)] py-[clamp(3rem,6vw,5.5rem)]">
      <div className="mx-auto max-w-[68rem]">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="lumen-mono">Serien</p>
            <h2 className="lumen-h2 mt-4">Tre teknologier i ét glas.</h2>
          </div>
          <p className="lumen-body max-w-[42ch] text-[0.9375rem]">
            Alle tre lever i glasset frem for foran det. Forskellen er, hvad du vil have glasset til
            at gøre, når nogen kigger på det.
          </p>
        </Reveal>

        <ul className="mt-9 grid gap-4 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 80}>
              <a href={p.href} className="lumen-cell group flex h-full flex-col p-2 transition-colors duration-300 hover:border-lumen-line-2">
                <span className="block aspect-[4/3] w-full overflow-hidden rounded-lg bg-lumen-bg">
                  <Loop
                    video={p.film.video}
                    videoHevc={p.film.hevc}
                    poster={p.film.poster}
                    className="size-full object-cover transition-transform duration-[900ms] ease-[var(--ease-cold)] group-hover:scale-[1.03]"
                  />
                </span>

                <span className="flex flex-1 flex-col p-5">
                  <span className="lumen-mono">{p.index}</span>
                  <span className="lumen-h3 mt-3 block">{p.name}</span>
                  <span className="lumen-body mt-2 block text-[0.9375rem]">{p.blurb}</span>

                  <span className="mt-auto flex items-baseline justify-between gap-4 border-t border-lumen-line pt-5 !mt-6">
                    <span>
                      <span className="text-[1.75rem] font-medium leading-none tracking-[-0.04em]">{p.figure.value}</span>
                      {p.figure.unit ? <span className="text-base text-lumen-ink-3"> {p.figure.unit}</span> : null}
                    </span>
                    <span className="lumen-mono normal-case tracking-normal">{p.figure.label}</span>
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Principles ─────────────────────────────────────────────────────────────
   A split row rather than a full-viewport stage. Tech landings put the image in
   a bordered frame beside the copy and keep both inside the same container —
   the image never touches the edge of the screen, which is what keeps the page
   feeling like a document rather than a presentation. */
function LumenPrinciples() {
  return (
    <section className="px-[var(--v2-gutter)] py-[clamp(3rem,6vw,5.5rem)]">
      <div className="mx-auto grid max-w-[68rem] items-center gap-x-12 gap-y-8 lg:grid-cols-2">
        <Reveal>
          <p className="lumen-mono">Princip 02</p>
          <h2 className="lumen-h2 mt-4">{PRINCIPLES[1].headline}</h2>
          <p className="lumen-body mt-5 max-w-[46ch]">{PRINCIPLES[1].body}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
            {CRAFT.figures.slice(0, 4).map((f) => (
              <div key={f.label}>
                <dd className="text-[1.5rem] font-medium leading-none tracking-[-0.04em]">
                  {f.value}
                  {f.unit ? <span className="text-lumen-ink-3">{f.unit}</span> : null}
                </dd>
                <dt className="lumen-mono mt-2 normal-case tracking-normal">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal fade delay={100}>
          <div className="lumen-cell p-2">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.glassImmersive} alt={ALT.glassImmersive} className="size-full object-cover" loading="lazy" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Specs ──────────────────────────────────────────────────────────────────
   The comparison table as a pricing table. Same data as every other template;
   the difference is that it is wrapped in a bordered card with a header row
   that reads as column labels rather than as a datasheet head. */
function LumenSpecs() {
  return (
    <section id="specifikationer" className="border-y border-lumen-line px-[var(--v2-gutter)] py-[clamp(3rem,6vw,5.5rem)]">
      <div className="mx-auto max-w-[68rem]">
        <Reveal>
          <p className="lumen-mono">{SPECS.label}</p>
          <h2 className="lumen-h2 mt-4">{SPECS.headline}</h2>
          <p className="lumen-body mt-5 max-w-[48ch]">{SPECS.lead}</p>
        </Reveal>

        <Reveal delay={100} className="lumen-cell mt-9 overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-lumen-line bg-lumen-bg">
                <th scope="col" className="lumen-mono sticky left-0 z-10 bg-lumen-bg px-6 py-4 align-bottom">Egenskab</th>
                {SPECS.columns.map((c) => (
                  <th key={c} scope="col" className="lumen-h3 px-6 py-4 align-bottom">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPECS.rows.map((row) => (
                <tr key={row.label} className="border-b border-lumen-line last:border-b-0">
                  <th scope="row" className="sticky left-0 z-10 bg-lumen-card px-6 py-4 text-[0.9375rem] font-normal text-lumen-ink-2">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={`${row.label}-${SPECS.columns[i]}`} className="v2-num-sm px-6 py-4 text-[0.9375rem]">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={140}>
          <p className="lumen-mono mt-5 max-w-[64ch] normal-case leading-relaxed tracking-normal">{SPECS.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

function LumenReferences() {
  return (
    <section id="referencer" className="px-[var(--v2-gutter)] py-[clamp(3rem,6vw,5.5rem)]">
      <div className="mx-auto max-w-[68rem]">
        <Reveal>
          <p className="lumen-mono">Referencer</p>
          <h2 className="lumen-h2 mt-4">Set i brug.</h2>
        </Reveal>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REFERENCES.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 70} fade>
              <figure className="lumen-cell h-full p-2">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-lumen-bg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt={r.alt} className="size-full object-cover" loading="lazy" />
                </div>
                <figcaption className="p-4">
                  <span className="lumen-h3 block">{r.title}</span>
                  <span className="lumen-mono mt-2 block normal-case tracking-normal">{r.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── CTA ────────────────────────────────────────────────────────────────────
   One card, centred, with the dot lattice behind it. Tech landings close on a
   panel rather than on a photograph, because the last thing they want to leave
   you with is the product's surface — they want the action. */
function LumenCta() {
  return (
    <section id="kontakt" className="px-[var(--v2-gutter)] py-[clamp(3rem,6vw,5.5rem)]">
      <Reveal className="lumen-cell relative mx-auto max-w-[68rem] overflow-hidden px-6 py-[clamp(3rem,7vw,6rem)] text-center">
        <div aria-hidden="true" className="lumen-grid-bg absolute inset-0" />
        <div className="relative">
          <p className="lumen-mono">{CTA.label}</p>
          <h2 className="lumen-display mx-auto mt-5">{CTA.headline}</h2>
          <p className="lumen-body mx-auto mt-5 max-w-[44ch]">{CTA.lead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${BRAND.email}`} className="lumen-btn lumen-btn-solid">
              {CTA.primary}
              <Arrow />
            </a>
            <a href={BRAND.phoneHref} className="lumen-btn lumen-btn-line">{CTA.secondary}</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function LumenFooter() {
  return (
    <footer className="border-t border-lumen-line px-[var(--v2-gutter)] py-[clamp(2.5rem,5vw,4rem)]">
      <div className="mx-auto max-w-[68rem]">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-4">
          <div>
            <p className="text-[0.9375rem] font-medium tracking-[-0.02em]">{BRAND.name}</p>
            <p className="lumen-body mt-4 max-w-[30ch] text-[0.875rem]">{FOOTER.tagline}</p>
          </div>

          {FOOTER.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="lumen-mono">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#serien" className="text-[0.875rem] text-lumen-ink-2 transition-colors duration-300 hover:text-lumen-ink">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Kontakt">
            <h2 className="lumen-mono">Kontakt</h2>
            <ul className="mt-4 space-y-2.5 text-[0.875rem] text-lumen-ink-2">
              <li><a href={`mailto:${BRAND.email}`} className="hover:text-lumen-ink">{BRAND.email}</a></li>
              <li><a href={BRAND.phoneHref} className="hover:text-lumen-ink">{BRAND.phone}</a></li>
              <li>{BRAND.area}</li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-lumen-line pt-5">
          {FOOTER.legal.map((l) => (
            <span key={l} className="lumen-mono normal-case tracking-normal">{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
