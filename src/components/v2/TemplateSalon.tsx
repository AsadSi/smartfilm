'use client';

import { useEffect, useState } from 'react';
import { BRAND, CRAFT, CTA, FOOTER, HERO, NAV, PRINCIPLES, PRODUCTS, REFERENCES, SPECS } from '@/content/v2';
import { Arrow, Loop, Reveal } from './primitives';

/**
 * TEMPLATE C · SALON — the jewel box
 *
 * A watch vitrine at eleven at night, which is the brief: airport, mall,
 * expensive. It shares nothing structural with the two automotive templates,
 * and the three differences are all deliberate.
 *
 *  · It is CENTRED. Stage and Vitrine are both relentlessly left-aligned,
 *    because that is what automotive does; luxury retail is symmetrical, and
 *    symmetry is most of why a room reads as expensive rather than as fast.
 *  · It is LIT FROM INSIDE. Every panel is a case with a hairline gold edge and
 *    a bloom behind it, and the photography is dimmed underneath, so the light
 *    appears to come off the product rather than off the page.
 *  · It is SLOW. Long reveals, enormous vertical space, and one idea per
 *    screen with nothing else competing. Vitrine shouts; this one does not
 *    raise its voice at all, and that is the luxury signal.
 *
 * The didone carries every statement and is never set below 20px — below that
 * its hairlines disappear. Everything small is tracked capitals instead, which
 * is also, conveniently, exactly how a boutique signs itself.
 */
export default function TemplateSalon() {
  return (
    <div className="tpl-noir bg-noir text-white">
      <SalonHeader />
      <main id="main">
        <SalonHero />
        <SalonManifesto />
        <SalonCollection />
        <SalonPrinciples />
        <SalonFigures />
        <SalonSpecs />
        <SalonPlates />
        <SalonCta />
      </main>
      <SalonFooter />
    </div>
  );
}

/* ── Header ─────────────────────────────────────────────────────────────────
   Centred wordmark in the didone, and the navigation set as tracked capitals
   directly beneath it rather than beside it — a boutique fascia, not a nav bar.
   It never turns opaque; the room is dark all the way down. */
function SalonHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('v2-locked', open);
    return () => document.documentElement.classList.remove('v2-locked');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-signal-light focus:px-4 focus:py-3 focus:text-noir">
        Gå til indhold
      </a>

      <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="v2-shell flex flex-col items-center gap-3 pb-6 pt-5">
          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="salon-menu"
              className="salon-label cursor-pointer p-1 lg:invisible"
            >
              {open ? 'Luk' : 'Menu'}
            </button>

            <a href="#top" className="font-[family-name:var(--font-serif)] text-2xl font-normal leading-none tracking-[0.14em] text-white">
              {BRAND.name}
            </a>

            <a href={BRAND.phoneHref} className="salon-label salon-label-dim p-1 max-sm:hidden">
              {BRAND.phone}
            </a>
            <span className="w-10 sm:hidden" aria-hidden="true" />
          </div>

          <nav aria-label="Sektioner" className="max-lg:hidden">
            <ul className="flex items-center gap-10">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="salon-label salon-label-dim transition-colors duration-500 hover:text-signal-light">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div id="salon-menu" hidden={!open} className="fixed inset-0 z-40 bg-noir pt-28 lg:hidden">
        <nav className="v2-shell flex flex-col items-center gap-8">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="salon-h2 text-white">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────────
   Centred, and the film is dimmed hard — 45% — so the type sits in light and
   the footage becomes the glow behind it rather than the subject. Stage does
   the exact opposite with the same clip. */
function SalonHero() {
  return (
    <section id="top" className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <Loop
        video="/assets/hero.mp4"
        videoHevc="/assets/optimized/hero.h265.mp4"
        poster="/assets/hero-poster.jpg"
        className="v2-drift absolute inset-0 size-full object-cover opacity-45"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(14,12,10,0.86)_78%)]" />

      <Reveal className="v2-shell relative flex flex-col items-center pt-24 text-center">
        <p className="salon-label">{HERO.label}</p>
        <hr className="salon-rule my-8 w-24" />
        <h1 className="salon-display max-w-[16ch]">{HERO.headline}</h1>
        <p className="salon-body mt-8 max-w-[48ch]">{HERO.lead}</p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <a href="#serien" className="salon-btn salon-btn-fill">{HERO.primary}</a>
          <a href="#kontakt" className="salon-btn">
            {HERO.secondary}
            <Arrow />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Manifesto ──────────────────────────────────────────────────────────────
   One sentence, alone on a black screen, with a great deal of nothing around
   it. The most expensive thing a page can do is decline to fill itself. */
function SalonManifesto() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center px-[var(--v2-gutter)] py-[clamp(5rem,12vw,10rem)]">
      <Reveal className="text-center">
        <p className="salon-label">Idéen</p>
        <p className="salon-display mx-auto mt-8 max-w-[20ch] text-white">
          Glasset gør arbejdet. Alt andet træder tilbage.
        </p>
        <hr className="salon-rule mx-auto mt-10 w-32" />
      </Reveal>
    </section>
  );
}

/* ── Collection ─────────────────────────────────────────────────────────────
   Three cases in a row, each lit from within. Not "cards" — the word matters,
   because a card has a surface and a case has a light in it. The film inside is
   dimmed until hover, when the case brightens: the vitrine noticing you. */
function SalonCollection() {
  return (
    <section id="serien" className="border-t border-white/[0.08] py-[clamp(4rem,9vw,8rem)]">
      <div className="v2-shell">
        <Reveal className="text-center">
          <p className="salon-label">Kollektionen</p>
          <h2 className="salon-h2 mx-auto mt-6 max-w-[18ch]">Tre teknologier, ét materiale</h2>
          <p className="salon-body mx-auto mt-6 max-w-[52ch]">
            Alle tre lever i glasset frem for foran det. Forskellen er, hvad du vil have glasset til
            at gøre, når nogen kigger på det.
          </p>
        </Reveal>

        <ul className="mt-[clamp(3rem,6vw,5rem)] grid gap-8 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 120}>
              <a href={p.href} className="salon-case group flex h-full flex-col p-6 text-center transition-[border-color,box-shadow] duration-[700ms] ease-[var(--ease-cold)] hover:border-signal-light/50">
                <span className="salon-label salon-label-dim">{p.index}</span>

                <span className="mt-5 block aspect-[3/4] w-full overflow-hidden bg-black">
                  <Loop
                    video={p.film.video}
                    videoHevc={p.film.hevc}
                    poster={p.film.poster}
                    className="size-full object-cover opacity-60 transition-opacity duration-[900ms] ease-[var(--ease-cold)] group-hover:opacity-95"
                  />
                </span>

                <h3 className="salon-h2 mt-7 text-[clamp(1.35rem,2.2vw,1.75rem)]">{p.name}</h3>
                <p className="salon-label salon-label-dim mt-4">{p.tagline}</p>
                <p className="salon-body mt-5 text-[0.9375rem]">{p.blurb}</p>

                <hr className="salon-rule mx-auto mt-auto w-full !mt-8" />
                <span className="mt-6 block font-[family-name:var(--font-serif)] text-[2.25rem] leading-none text-signal-light">
                  {p.figure.value}
                  {p.figure.unit ? <span className="text-xl"> {p.figure.unit}</span> : null}
                </span>
                <span className="salon-label salon-label-dim mt-3 block">{p.figure.label}</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Principles ─────────────────────────────────────────────────────────────
   Centred image with the copy beneath it, not beside it. Placing text next to a
   photograph makes the two compete for the same horizontal space; stacking them
   makes the photograph an object on a plinth. */
function SalonPrinciples() {
  return (
    <section id="teknologi" className="border-t border-white/[0.08]">
      {PRINCIPLES.map((p, i) => (
        <div key={p.index} className="py-[clamp(4rem,9vw,8rem)] first:pt-[clamp(4rem,9vw,8rem)]">
          <div className="v2-shell">
            <Reveal fade className="mx-auto max-w-[60rem]">
              <div className="salon-case aspect-[16/9] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.alt} className="size-full object-cover opacity-75" loading="lazy" />
              </div>
            </Reveal>

            <Reveal delay={120} className="mx-auto mt-12 max-w-[46rem] text-center">
              <p className="salon-label">
                {p.label} {p.index}
              </p>
              <h2 className="salon-h2 mt-6">{p.headline}</h2>
              <p className="salon-body mt-6">{p.body}</p>

              <ul className="mt-10 inline-flex flex-col gap-4">
                {p.points.map((pt) => (
                  <li key={pt} className="salon-label salon-label-dim leading-[1.9]">{pt}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          {i === 0 ? <hr className="salon-rule mx-auto mt-[clamp(4rem,9vw,8rem)] w-40" /> : null}
        </div>
      ))}
    </section>
  );
}

function SalonFigures() {
  return (
    <section className="border-t border-white/[0.08] py-[clamp(4rem,9vw,8rem)]">
      <div className="v2-shell">
        <Reveal className="text-center">
          <p className="salon-label">{CRAFT.label}</p>
          <h2 className="salon-h2 mx-auto mt-6 max-w-[22ch]">{CRAFT.headline}</h2>
          <p className="salon-body mx-auto mt-6 max-w-[52ch]">{CRAFT.lead}</p>
        </Reveal>

        <Reveal delay={140}>
          <dl className="mx-auto mt-[clamp(3rem,6vw,5rem)] grid max-w-[68rem] grid-cols-2 gap-y-12 lg:grid-cols-4">
            {CRAFT.figures.map((f) => (
              <div key={f.label} className="border-white/[0.1] px-4 text-center max-lg:even:border-l lg:border-l lg:first:border-l-0">
                <dd className="font-[family-name:var(--font-serif)] leading-none text-white">
                  <span className="text-[clamp(2.5rem,5vw,4rem)]">{f.value}</span>
                  {f.unit ? <span className="text-[clamp(1.1rem,2vw,1.5rem)] text-signal-light"> {f.unit}</span> : null}
                </dd>
                <dt className="salon-label salon-label-dim mx-auto mt-5 max-w-[16ch]">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Specs ──────────────────────────────────────────────────────────────────
   The one place the room lets itself be technical. Rules are hairline gold at
   low opacity rather than grey, and the values sit in the sans — a didone has
   no tabular figures, so a column of numbers set in it never lines up. */
function SalonSpecs() {
  return (
    <section id="specifikationer" className="border-t border-white/[0.08] py-[clamp(4rem,9vw,8rem)]">
      <div className="v2-shell">
        <Reveal className="text-center">
          <p className="salon-label">{SPECS.label}</p>
          <h2 className="salon-h2 mx-auto mt-6">{SPECS.headline}</h2>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-[clamp(2.5rem,5vw,4rem)] max-w-[72rem] overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-signal-light/35">
                <th scope="col" className="salon-label salon-label-dim sticky left-0 z-10 bg-noir py-5 pr-6 align-bottom">Egenskab</th>
                {SPECS.columns.map((c) => (
                  <th key={c} scope="col" className="py-5 pl-6 align-bottom font-[family-name:var(--font-serif)] text-xl font-normal">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPECS.rows.map((row) => (
                <tr key={row.label} className="border-b border-white/[0.08]">
                  <th scope="row" className="salon-label salon-label-dim sticky left-0 z-10 bg-noir py-5 pr-6 font-normal">{row.label}</th>
                  {row.values.map((v, i) => (
                    <td key={`${row.label}-${SPECS.columns[i]}`} className="v2-num-sm py-5 pl-6 text-[1.0625rem] text-white/85">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={140}>
          <p className="salon-label salon-label-dim mx-auto mt-8 max-w-[60ch] text-center leading-[1.9]">{SPECS.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

function SalonPlates() {
  return (
    <section id="referencer" className="border-t border-white/[0.08] py-[clamp(4rem,9vw,8rem)]">
      <div className="v2-shell">
        <Reveal className="text-center">
          <p className="salon-label">Referencer</p>
          <h2 className="salon-h2 mx-auto mt-6">Set i brug</h2>
        </Reveal>

        <ul className="mt-[clamp(3rem,6vw,5rem)] grid gap-8 sm:grid-cols-2">
          {REFERENCES.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 100} fade>
              <figure className="salon-case group p-4">
                <div className="aspect-[4/3] w-full overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt={r.alt} className="size-full object-cover opacity-70 transition-opacity duration-[900ms] ease-[var(--ease-cold)] group-hover:opacity-100" loading="lazy" />
                </div>
                <figcaption className="px-2 pb-1 pt-6 text-center">
                  <span className="font-[family-name:var(--font-serif)] text-xl">{r.title}</span>
                  <span className="salon-label salon-label-dim mt-3 block">{r.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SalonCta() {
  return (
    <section id="kontakt" className="border-t border-white/[0.08] py-[clamp(5rem,11vw,10rem)]">
      <Reveal className="v2-shell text-center">
        <p className="salon-label">{CTA.label}</p>
        <hr className="salon-rule mx-auto my-8 w-24" />
        <h2 className="salon-display mx-auto max-w-[16ch]">{CTA.headline}</h2>
        <p className="salon-body mx-auto mt-8 max-w-[46ch]">{CTA.lead}</p>
        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <a href={`mailto:${BRAND.email}`} className="salon-btn salon-btn-fill">{CTA.primary}</a>
          <a href={BRAND.phoneHref} className="salon-btn">
            {CTA.secondary}
            <Arrow />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function SalonFooter() {
  return (
    <footer className="border-t border-white/[0.08] py-[clamp(3rem,6vw,5rem)]">
      <div className="v2-shell flex flex-col items-center text-center">
        <a href="#top" className="font-[family-name:var(--font-serif)] text-2xl tracking-[0.14em]">{BRAND.name}</a>
        <p className="salon-body mt-6 max-w-[42ch] text-[0.9375rem]">{FOOTER.tagline}</p>

        <nav aria-label="Sektioner" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="salon-label salon-label-dim transition-colors duration-500 hover:text-signal-light">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <hr className="salon-rule mt-10 w-full max-w-[40rem]" />

        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href={`mailto:${BRAND.email}`} className="salon-label salon-label-dim hover:text-signal-light">{BRAND.email}</a>
          <a href={BRAND.phoneHref} className="salon-label salon-label-dim hover:text-signal-light">{BRAND.phone}</a>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {FOOTER.legal.map((l) => (
            <span key={l} className="salon-label salon-label-dim">{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
