'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ALT,
  BRAND,
  CRAFT,
  CTA,
  FOOTER,
  HERO,
  IMG,
  NAV,
  PRINCIPLES,
  PRODUCTS,
  REFERENCES,
  SPECS,
} from '@/content/v2';
import { Arrow, Loop, Reveal } from './primitives';

/**
 * TEMPLATE C · VITRINE — after lamborghini.com
 *
 * Dark the whole way down, and loud where the other two are quiet. The three
 * things that make it unmistakably not template A:
 *
 *  · Type. Heavy condensed uppercase set enormous — 9vw against A's 7.4 — and
 *    condensed is what makes that possible without a six-word headline wrapping
 *    to three lines. A whispers in sentence case; C shouts in caps.
 *  · Controls. Lamborghini's button is a hard-edged filled *bar*, 64px tall
 *    with the label centred and the arrow pushed to the end. A's is a pill.
 *    Nothing separates two dark automotive sites faster than their buttons.
 *  · Structure. A sticky split screen: the photograph holds still on one half
 *    while the copy scrolls past it on the other. A never does this — every one
 *    of its bands scrolls as a whole.
 *
 * Champagne finally gets to work here. A warm metal needs a dark ground to read
 * as metal at all; on template A's white bands the same colour just looks like
 * a highlighter, which is why it appears there three times and here everywhere.
 */
export default function TemplateVitrine() {
  return (
    <div className="tpl-void bg-void text-white">
      <VitrineHeader />
      <main id="main">
        <VitrineHero />
        <VitrineRange />
        <VitrineSplit />
        <VitrineFigures />
        <VitrineSpecs />
        <VitrinePlates />
        <VitrineCta />
      </main>
      <VitrineFooter />
    </div>
  );
}

/* ── Header ─────────────────────────────────────────────────────────────────
   Lamborghini's arrangement exactly: hamburger hard left, wordmark centred,
   utilities right, and it never turns opaque — the page is dark all the way
   down, so there is nothing for it to change colour against. */
function VitrineHeader() {
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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-3 focus:text-void">
        Gå til indhold
      </a>

      <header className="fixed inset-x-0 top-0 z-50 h-[var(--v2-header-h)] bg-gradient-to-b from-black/70 to-transparent text-white">
        <div className="v2-shell flex h-full items-center justify-between">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="vitrine-menu"
            className="-ml-1 flex cursor-pointer flex-col gap-[6px] p-2"
          >
            <span className="sr-only">{open ? 'Luk menu' : 'Menu'}</span>
            <span aria-hidden="true" className={`block h-[2px] w-6 bg-current transition-transform duration-500 ease-[var(--ease-cold)] ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
            <span aria-hidden="true" className={`block h-[2px] w-6 bg-current transition-transform duration-500 ease-[var(--ease-cold)] ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
          </button>

          <a href="#top" className="absolute left-1/2 -translate-x-1/2 font-[family-name:var(--font-condensed)] text-xl font-bold uppercase leading-none tracking-[0.22em]">
            {BRAND.name}
          </a>

          <a href={BRAND.phoneHref} className="font-[family-name:var(--font-condensed)] text-base font-semibold uppercase tracking-[0.14em] max-sm:hidden">
            {BRAND.phone}
          </a>
        </div>
      </header>

      <div id="vitrine-menu" hidden={!open} className="fixed inset-0 z-40 bg-void pt-[var(--v2-header-h)]">
        <nav className="v2-shell flex h-full flex-col justify-between overflow-y-auto pb-12 pt-[clamp(2rem,6vh,4rem)]">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.href} className="border-b border-hair-dark first:border-t">
                <a href={item.href} onClick={() => setOpen(false)} className="group flex items-baseline gap-6 py-[clamp(0.6rem,2.2vh,1.25rem)]">
                  <span className="vit-label w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className="vit-h2">{item.label}</span>
                  <Arrow className="ml-auto self-center transition-transform duration-[420ms] ease-[var(--ease-cold)] group-hover:translate-x-2" />
                </a>
              </li>
            ))}
          </ul>
          <p className="vit-label mt-8">{BRAND.area}</p>
        </nav>
      </div>
    </>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────────
   Same footage as template A, set completely differently: eyebrow, then the
   headline in condensed caps at nearly twice the size, then a full-width bar
   button instead of a pair of pills. */
function VitrineHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="top" className="relative flex h-[100svh] min-h-[620px] items-end overflow-hidden bg-void">
      <Loop
        ref={videoRef}
        video="/assets/hero.mp4"
        videoHevc="/assets/optimized/hero.h265.mp4"
        poster="/assets/hero-poster.jpg"
        className="v2-drift absolute inset-0 size-full object-cover opacity-90"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-void via-void/45 to-transparent" />

      <div className="v2-shell relative w-full pb-[clamp(3rem,8vh,6rem)]">
        <p className="vit-label">{HERO.label}</p>
        <h1 className="vit-display mt-4 max-w-[14ch]">{HERO.headline}</h1>
        <p className="v2-lead v2-lead-light mt-6 max-w-[44ch]">{HERO.lead}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#serien" className="vit-btn">
            {HERO.primary}
            <Arrow />
          </a>
          <a href="#kontakt" className="vit-btn vit-btn-ghost">
            {HERO.secondary}
            <Arrow />
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-8 right-[var(--v2-gutter)] flex size-11 cursor-pointer items-center justify-center border border-white/40 text-white transition-colors duration-500 hover:bg-white hover:text-void max-md:hidden"
      >
        <span className="sr-only">{playing ? 'Sæt filmen på pause' : 'Afspil filmen'}</span>
        {playing ? (
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
            <rect width="3" height="12" fill="currentColor" />
            <rect x="7" width="3" height="12" fill="currentColor" />
          </svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
            <path d="M0 0l10 6-10 6z" fill="currentColor" />
          </svg>
        )}
      </button>
    </section>
  );
}

/* ── Range ──────────────────────────────────────────────────────────────────
   A genuine horizontal rail — cards wide enough that the third is cut by the
   right edge on every viewport, which is the affordance. Template A refused
   this because three cards left a quarter of the screen empty; here the cards
   are deliberately oversized so the row always overflows and the rail is real. */
function VitrineRange() {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * (card ? card.offsetWidth + 24 : el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section id="serien" className="v2-band-tight border-t border-hair-dark bg-void">
      <div className="v2-shell flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="vit-label">Serien</p>
          <h2 className="vit-h2 mt-4 max-w-[16ch]">Tre teknologier. Ét materiale.</h2>
        </div>
        <div className="flex gap-2" hidden={atStart && atEnd}>
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => step(dir)}
              disabled={dir === -1 ? atStart : atEnd}
              className="flex size-12 cursor-pointer items-center justify-center border border-white/40 text-white transition-[opacity,background-color,color] duration-500 hover:bg-white hover:text-void disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-white"
            >
              <span className="sr-only">{dir === -1 ? 'Forrige' : 'Næste'}</span>
              <Arrow className={dir === -1 ? 'rotate-180' : ''} />
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={railRef}
        className="v2-rail mt-[clamp(2rem,4vw,3.5rem)] flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--v2-gutter)] scroll-p-[var(--v2-gutter)]"
      >
        {PRODUCTS.map((p, i) => (
          <Reveal as="li" key={p.name} delay={i * 70} className="w-[min(84vw,34rem)] shrink-0 snap-start">
            <a href={p.href} className="group block">
              {/* The clipped corner. One diagonal on an otherwise square panel
                  is enough to carry Lamborghini's shape language without
                  turning the page into origami. */}
              <div className="vit-cut relative aspect-[16/10] w-full overflow-hidden bg-graphite">
                <Loop
                  video={p.film.video}
                  videoHevc={p.film.hevc}
                  poster={p.film.poster}
                  className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cold)] group-hover:scale-[1.04]"
                />
                <span className="vit-label absolute left-6 top-6">{p.index}</span>
              </div>

              <div className="flex items-end justify-between gap-6 pt-6">
                <div>
                  <h3 className="vit-h2 text-[clamp(1.6rem,2.6vw,2.25rem)]">{p.name}</h3>
                  <p className="vit-label mt-3">{p.tagline}</p>
                </div>
                <p className="shrink-0 text-right">
                  <span className="v2-num text-[2.5rem] text-white">{p.figure.value}</span>
                  {p.figure.unit ? <span className="v2-num-sm ml-1 text-xl text-signal-light">{p.figure.unit}</span> : null}
                </p>
              </div>
              <p className="v2-lead-light mt-4 max-w-[46ch] text-[0.9375rem]">{p.blurb}</p>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ── Split ──────────────────────────────────────────────────────────────────
   The sticky split screen, and the structural move that template A does not
   have anywhere: the photograph pins to the viewport on one half while the
   copy scrolls past it on the other. Below lg it degrades to a plain stack,
   because a sticky half-screen on a phone is just a small image. */
function VitrineSplit() {
  return (
    <section id="teknologi" className="border-t border-hair-dark">
      {PRINCIPLES.map((p, i) => (
        <div key={p.index} className="grid lg:grid-cols-2">
          <div className={`relative min-h-[60svh] lg:sticky lg:top-0 lg:h-svh ${i % 2 ? 'lg:order-2' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.alt} className="absolute inset-0 size-full object-cover" loading="lazy" />
            <div aria-hidden="true" className="absolute inset-0 bg-void/25" />
          </div>

          <div className={`flex min-h-svh items-center px-[var(--v2-gutter)] py-[clamp(3rem,8vw,7rem)] ${i % 2 ? 'lg:order-1' : ''}`}>
            <Reveal className="max-w-[46ch]">
              <p className="vit-label">
                {p.label} {p.index}
              </p>
              <h2 className="vit-h2 mt-5">{p.headline}</h2>
              <p className="v2-lead v2-lead-light mt-6">{p.body}</p>
              <ul className="mt-9">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-4 border-t border-hair-dark py-4 last:border-b">
                    <span className="text-signal-light">—</span>
                    <span className="text-[0.9375rem] text-ink-light-2">{pt}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      ))}
    </section>
  );
}

function VitrineFigures() {
  return (
    <section className="relative border-t border-hair-dark py-[clamp(4rem,9vw,8rem)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.facadeDetail} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover opacity-25" loading="lazy" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/40" />

      <div className="v2-shell relative">
        <Reveal>
          <p className="vit-label">{CRAFT.label}</p>
          <h2 className="vit-display mt-4 max-w-[18ch] text-[clamp(2.25rem,6vw,5rem)]">{CRAFT.headline}</h2>
          <p className="v2-lead v2-lead-light mt-6 max-w-[52ch]">{CRAFT.lead}</p>
        </Reveal>

        <Reveal delay={120}>
          <dl className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-2 gap-px bg-white/15 lg:grid-cols-4">
            {CRAFT.figures.map((f) => (
              <div key={f.label} className="bg-void p-6">
                <dd className="font-[family-name:var(--font-condensed)] font-bold leading-none">
                  <span className="text-[clamp(2.5rem,6vw,4.5rem)]">{f.value}</span>
                  {f.unit ? <span className="ml-1 text-[clamp(1.25rem,2.5vw,2rem)] text-signal-light">{f.unit}</span> : null}
                </dd>
                <dt className="vit-label mt-4 max-w-[18ch] leading-[1.5] tracking-[0.16em] text-ink-light-3">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function VitrineSpecs() {
  return (
    <section id="specifikationer" className="v2-band-tight border-t border-hair-dark">
      <div className="v2-shell">
        <Reveal>
          <p className="vit-label">{SPECS.label}</p>
          <h2 className="vit-h2 mt-4">{SPECS.headline}</h2>
        </Reveal>

        <Reveal delay={80} className="mt-[clamp(2rem,4vw,3.5rem)] overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/45">
                <th scope="col" className="vit-label sticky left-0 z-10 bg-void py-4 pr-6 align-bottom text-ink-light-3">Egenskab</th>
                {SPECS.columns.map((c) => (
                  <th key={c} scope="col" className="py-4 pl-6 align-bottom font-[family-name:var(--font-condensed)] text-lg font-semibold uppercase tracking-[0.08em]">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPECS.rows.map((row) => (
                <tr key={row.label} className="border-b border-hair-dark">
                  <th scope="row" className="sticky left-0 z-10 bg-void py-4 pr-6 text-[0.9375rem] font-normal text-ink-light-3">{row.label}</th>
                  {row.values.map((v, i) => (
                    <td key={`${row.label}-${SPECS.columns[i]}`} className="v2-num-sm py-4 pl-6 text-[1.0625rem] text-white">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={120}>
          <p className="v2-caption v2-caption-light mt-6 max-w-[62ch]">{SPECS.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

function VitrinePlates() {
  return (
    <section id="referencer" className="v2-band-tight border-t border-hair-dark">
      <div className="v2-shell">
        <Reveal>
          <p className="vit-label">Referencer</p>
          <h2 className="vit-h2 mt-4">Set i brug.</h2>
        </Reveal>

        <ul className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-6 sm:grid-cols-2">
          {REFERENCES.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 70} fade>
              <figure className="group">
                <div className="vit-cut relative aspect-[4/3] w-full overflow-hidden bg-graphite">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt={r.alt} className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cold)] group-hover:scale-[1.04]" loading="lazy" />
                </div>
                <figcaption className="flex items-baseline justify-between gap-4 pt-4">
                  <span className="font-[family-name:var(--font-condensed)] text-xl font-semibold uppercase tracking-[0.06em]">{r.title}</span>
                  <span className="vit-label text-ink-light-3">{r.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function VitrineCta() {
  return (
    <section id="kontakt" className="relative flex min-h-[80svh] items-end overflow-hidden border-t border-hair-dark">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.facadeCurved} alt={ALT.facadeCurved} className="absolute inset-0 size-full object-cover opacity-55" loading="lazy" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />

      <Reveal className="v2-shell relative w-full pb-[clamp(3rem,7vw,6rem)] pt-[clamp(4rem,10vw,8rem)]">
        <p className="vit-label">{CTA.label}</p>
        <h2 className="vit-display mt-4 max-w-[13ch]">{CTA.headline}</h2>
        <p className="v2-lead v2-lead-light mt-6 max-w-[46ch]">{CTA.lead}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={`mailto:${BRAND.email}`} className="vit-btn">
            {CTA.primary}
            <Arrow />
          </a>
          <a href={BRAND.phoneHref} className="vit-btn vit-btn-ghost">
            {CTA.secondary}
            <Arrow />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function VitrineFooter() {
  return (
    <footer className="border-t border-hair-dark">
      <div className="v2-shell py-[clamp(2.5rem,5vw,4rem)]">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-4">
          <p className="v2-lead-light max-w-[30ch] text-[0.9375rem]">{FOOTER.tagline}</p>
          {FOOTER.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="vit-label">{col.title}</h2>
              <ul className="mt-5 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#serien" className="font-[family-name:var(--font-condensed)] text-lg uppercase tracking-[0.04em] text-ink-light-2 transition-colors duration-300 hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="Kontakt">
            <h2 className="vit-label">Kontakt</h2>
            <ul className="mt-5 space-y-2 text-[0.9375rem] text-ink-light-2">
              <li><a href={`mailto:${BRAND.email}`} className="hover:text-white">{BRAND.email}</a></li>
              <li><a href={BRAND.phoneHref} className="hover:text-white">{BRAND.phone}</a></li>
              <li className="text-ink-light-3">{BRAND.area}</li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-hair-dark pt-5">
          {FOOTER.legal.map((l) => (
            <span key={l} className="v2-caption v2-caption-light">{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
