'use client';

import { useEffect, useRef } from 'react';
import { ALT, BRAND, CTA, IMG, PRINCIPLES, PRODUCTS, SPECS } from '@/content/v2';
import { Arrow, Reveal } from './primitives';

/**
 * TEMPLATE H · TÅRN — "your website whispers luxury"
 *
 * The reference is a residential tower sold in one scroll: a supertall
 * standing in cloud with LUXURY and HOUSES either side of it, then the camera
 * flies into the facade, through a window, into the apartment and out to the
 * view. Everything is one dusty mauve and set in a hairline didone capital.
 *
 * The liberty taken is the window. In the reference it simply opens; here its
 * panes are frosted when the window first appears and clear as you come up to
 * it, so the one piece of interaction in the page is the product doing its job.
 *
 * The fly-through is an enhancement. Without script, or for anyone who asked
 * for less motion, the sequence is one viewport tall and shows the tower and
 * the headline — and everything the fly-through shows is also on the page
 * below it as ordinary content.
 */
const NAV_LEFT = [
  { href: '#serien', label: 'Serien' },
  { href: '#principper', label: 'Principper' },
];
const NAV_RIGHT = [
  { href: '#specifikationer', label: 'Tallene' },
  { href: '#kontakt', label: 'Kontakt' },
];

export default function TemplateTaarn() {
  const rootRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLDivElement>(null);

  // Scroll progress through the sequence, split into four overlapping phases
  // and written to CSS variables. Same pattern as F · Klar: measured straight
  // off the scroll event, because rAF does not run in a tab nobody is looking
  // at and a half-finished fly-through is worse than none.
  useEffect(() => {
    const root = rootRef.current;
    const seq = seqRef.current;
    if (!root || !seq) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    root.setAttribute('data-js', 'true');
    const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

    const measure = () => {
      const r = seq.getBoundingClientRect();
      const run = r.height - window.innerHeight;
      const p = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0;
      seq.style.setProperty('--p1', seg(p, 0, 0.28).toFixed(4));
      seq.style.setProperty('--p2', seg(p, 0.18, 0.44).toFixed(4));
      seq.style.setProperty('--p3', seg(p, 0.4, 0.7).toFixed(4));
      seq.style.setProperty('--p4', seg(p, 0.64, 0.9).toFixed(4));
    };

    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    document.addEventListener('visibilitychange', measure);
    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      document.removeEventListener('visibilitychange', measure);
    };
  }, []);

  return (
    <div ref={rootRef} className="tpl-taarn bg-taarn-sky text-taarn-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-white focus:px-4 focus:py-3">
        Gå til indhold
      </a>

      {/* The header rides over every phase — pale sky, dark facade, the
          apartment — so it is set white with a difference blend and inverts
          against whatever is behind it instead of switching colour by phase. */}
      <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
        <div className="v2-shell grid h-[var(--v2-header-h)] grid-cols-[1fr_auto_1fr] items-center gap-6">
          <nav aria-label="Sektioner" className="flex gap-[clamp(1.5rem,5vw,5rem)] max-md:hidden">
            {NAV_LEFT.map((n) => (
              <a key={n.href} href={n.href} className="taarn-label opacity-80 hover:opacity-100">{n.label}</a>
            ))}
          </nav>
          <a href="#top" className="col-start-2 font-[family-name:var(--font-italiana)] text-[1.35rem] uppercase tracking-[0.28em]">
            {BRAND.name}
          </a>
          <nav aria-label="Genveje" className="flex justify-end gap-[clamp(1.5rem,5vw,5rem)]">
            {NAV_RIGHT.map((n, i) => (
              <a key={n.href} href={n.href} className={`taarn-label opacity-80 hover:opacity-100 ${i === 0 ? 'max-md:hidden' : ''}`}>{n.label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        <div id="top" ref={seqRef} className="taarn-seq">
          <div className="taarn-stick bg-taarn-plum">
            <Tower />
            <Facade />
            <Window />
          </div>
        </div>

        <TaarnSeries />
        <TaarnPrinciples />
        <TaarnSpecs />
        <TaarnBook />
      </main>

      <TaarnFooter />
    </div>
  );
}

/* ── Phase 1: the tower ──────────────────────────────────────────────────────
   Zooms toward the spire and hands over to the facade. The headline parts
   around it — the words move out to the edges rather than fading in place. */
function Tower() {
  return (
    <div
      className="absolute inset-0 origin-[50%_42%]"
      style={{ transform: 'scale(calc(1 + var(--p1, 0) * 2.4))', opacity: 'calc(1 - var(--p2, 0))' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.taarnTower} alt={ALT.taarnTower} className="taarn-grade absolute inset-0 size-full object-cover object-[50%_40%]" />
      <div aria-hidden="true" className="taarn-wash absolute inset-0" />
      {/* Lifts the top of the frame to the pale sky the reference sits in, so
          dark ink carries the headline all the way across. */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-taarn-sky/75 via-taarn-sky/15 to-transparent" />
      <div aria-hidden="true" className="taarn-columns absolute inset-0 opacity-50" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG.taarnClouds}
        alt=""
        className="taarn-grade absolute inset-x-0 bottom-0 h-[62%] w-full object-cover opacity-80 mix-blend-screen [mask-image:linear-gradient(to_top,#000_40%,transparent)]"
        style={{ transform: 'translateY(calc((1 - var(--p1, 0)) * 8%)) scale(calc(1 + var(--p1, 0) * 0.3))' }}
      />

      <div className="absolute inset-x-0 top-[47%] flex -translate-y-1/2 items-center justify-center gap-[clamp(3.5rem,11vw,12rem)] px-[var(--v2-gutter)]">
        <h1 className="contents">
          <span className="taarn-display" style={{ transform: 'translateX(calc(var(--p1, 0) * -28vw))', opacity: 'calc(1 - var(--p1, 0) * 1.6)' }}>
            Klart
          </span>
          <span className="sr-only"> </span>
          <span className="taarn-display" style={{ transform: 'translateX(calc(var(--p1, 0) * 28vw))', opacity: 'calc(1 - var(--p1, 0) * 1.6)' }}>
            Glas
          </span>
        </h1>
      </div>

      <div className="absolute inset-x-0 bottom-[clamp(1.5rem,5vh,3rem)] flex flex-col items-center gap-3 text-white" style={{ opacity: 'calc(1 - var(--p1, 0) * 4)' }}>
        <span className="taarn-label">Rul for at gå indenfor</span>
        <span aria-hidden="true" className="v2-cue block h-10 w-px overflow-hidden bg-white/25">
          <span />
        </span>
      </div>
    </div>
  );
}

/* ── Phase 2: the facade ─────────────────────────────────────────────────────
   Arrives as the tower dissolves, then keeps pushing in until one window of it
   fills the screen. */
function Facade() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{ opacity: 'var(--p2, 0)', transform: 'scale(calc(1.5 - var(--p2, 0) * 0.5 + var(--p3, 0) * 2))' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.taarnFacade} alt="" className="taarn-grade absolute inset-0 size-full object-cover" />
      <div className="taarn-wash absolute inset-0" />
    </div>
  );
}

/* ── Phase 3–4: the window ───────────────────────────────────────────────────
   Starts as one small frame in the facade and grows past the edges of the
   screen. Its three panes are frosted until --p4 clears them, and the
   apartment behind is the payoff. */
function Window() {
  return (
    <div
      className="absolute left-1/2 top-1/2 h-full w-full"
      style={{
        transform: 'translate(-50%, -50%) scale(calc(0.2 + var(--p3, 0) * 0.92))',
        opacity: 'calc(var(--p3, 0) * 5)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.taarnInterior} alt={ALT.taarnInterior} className="absolute inset-0 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-taarn-plum/15" />

      {/* Three panes with mullions between them and a heavy frame round the
          outside. The panes carry the frost. */}
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-[1fr_1.5fr_1fr] gap-[clamp(10px,1.4vw,22px)] border-[clamp(14px,2vw,30px)] border-taarn-plum">
        {[0, 1, 2].map((i) => (
          <div key={i} className="taarn-pane relative shadow-[0_0_0_clamp(5px,0.7vw,11px)_var(--color-taarn-plum)]" />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-[12%] text-center text-white" style={{ opacity: 'var(--p4, 0)' }}>
        <p className="taarn-label">{PRODUCTS[0].name}</p>
        <p className="taarn-h2 mx-auto mt-4 max-w-[16ch] [text-shadow:0_2px_30px_rgb(29_23_25/0.6)]">{PRODUCTS[0].tagline}</p>
      </div>
    </div>
  );
}

/* ── The series ──────────────────────────────────────────────────────────────
   Three tall frames, the product names in the didone, everything else in
   tracked capitals. Photographs take the same mauve as the tower so the page
   stays one colour. */
function TaarnSeries() {
  return (
    <section id="serien" className="v2-band">
      <div className="v2-shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-8 border-b border-taarn-line pb-10">
          <h2 className="taarn-h2 max-w-[14ch]">Tre måder at bruge glasset.</h2>
          <p className="taarn-body max-w-[42ch] text-taarn-ink-2">
            Alle tre lever i glasset frem for foran det. Forskellen er, hvad du vil have ruden til at gøre, når nogen kigger på den.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 90}>
              <div className="relative aspect-[3/4] overflow-hidden bg-taarn-dusk">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.photo} alt={p.alt} className="taarn-grade size-full object-cover" loading="lazy" />
                <div aria-hidden="true" className="taarn-wash absolute inset-0" />
                <span className="taarn-label absolute left-5 top-5 text-white">{p.index}</span>
              </div>
              <h3 className="taarn-h3 mt-7">{p.name}</h3>
              <p className="taarn-label mt-3 text-taarn-ink-2">{p.tagline}</p>
              <p className="taarn-body mt-4 text-taarn-ink-2">{p.blurb}</p>
              <p className="mt-6 flex items-baseline gap-3 border-t border-taarn-line pt-5">
                <span className="font-[family-name:var(--font-italiana)] text-[2.6rem] leading-none">
                  {p.figure.value}
                  {p.figure.unit}
                </span>
                <span className="taarn-label text-taarn-ink-2">{p.figure.label}</span>
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Principles ──────────────────────────────────────────────────────────────
   Two full-width rows, image and statement, the second mirrored. */
function TaarnPrinciples() {
  return (
    <section id="principper" className="bg-[#d9c9c7] v2-band">
      <div className="v2-shell space-y-[clamp(5rem,10vw,9rem)]">
        {PRINCIPLES.map((pr, i) => (
          <div key={pr.index} className="grid items-center gap-x-16 gap-y-10 md:grid-cols-2">
            <Reveal fade className={i % 2 ? 'md:order-2' : ''}>
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pr.image} alt={pr.alt} className="taarn-grade size-full object-cover" loading="lazy" />
                <div aria-hidden="true" className="taarn-wash absolute inset-0" />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="taarn-label text-taarn-ink-2">
                {pr.label} {pr.index}
              </p>
              <h2 className="taarn-h2 mt-6 max-w-[13ch]">{pr.headline}</h2>
              <p className="taarn-body mt-7 max-w-[46ch] text-taarn-ink-2">{pr.body}</p>
              <ul className="mt-9 border-t border-taarn-line">
                {pr.points.map((pt) => (
                  <li key={pt} className="taarn-label border-b border-taarn-line py-4 text-taarn-ink">
                    {pt}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

function TaarnSpecs() {
  return (
    <section id="specifikationer" className="v2-band">
      <div className="v2-shell">
        <Reveal className="text-center">
          <p className="taarn-label text-taarn-ink-2">{SPECS.label}</p>
          <h2 className="taarn-h2 mx-auto mt-6">{SPECS.headline}</h2>
        </Reveal>
        <Reveal delay={100} className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-taarn-ink">
                <th scope="col" className="taarn-label py-5 pr-6 text-taarn-ink-2">Egenskab</th>
                {SPECS.columns.map((c) => (
                  <th key={c} scope="col" className="taarn-h3 py-5 pl-6 !text-[1.35rem]">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPECS.rows.map((row) => (
                <tr key={row.label} className="border-b border-taarn-line">
                  <th scope="row" className="taarn-label py-5 pr-6 font-medium text-taarn-ink-2">{row.label}</th>
                  {row.values.map((v, i) => (
                    <td key={`${row.label}-${i}`} className="v2-num-sm py-5 pl-6 text-[1rem]">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="taarn-body mt-6 text-center text-[0.8125rem] text-taarn-ink-2">{SPECS.note}</p>
      </div>
    </section>
  );
}

/* ── Book ────────────────────────────────────────────────────────────────────
   The reference's last frame: a figure at the window with BOOK and TOUR either
   side of her. Same composition as the tower, which is what closes the page. */
function TaarnBook() {
  return (
    <section id="kontakt" className="relative flex min-h-[100svh] items-center overflow-hidden bg-taarn-plum text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.taarnView} alt={ALT.taarnView} className="taarn-grade absolute inset-0 size-full object-cover object-[48%_50%]" loading="lazy" />
      <div aria-hidden="true" className="taarn-wash absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-taarn-plum/80 via-transparent to-taarn-plum/30" />

      <div className="relative w-full">
        <Reveal className="flex items-center justify-center gap-[clamp(6rem,20vw,22rem)] px-[var(--v2-gutter)]">
          <h2 className="contents">
            <span className="taarn-display">Book</span>
            <span className="sr-only"> </span>
            <span className="taarn-display">fremvisning</span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="v2-shell mt-[clamp(10rem,26vh,16rem)] flex flex-wrap items-end justify-between gap-8">
          <p className="taarn-body max-w-[40ch] text-white/80">{CTA.lead}</p>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${BRAND.email}`} className="taarn-btn bg-white text-taarn-ink hover:bg-transparent hover:text-white">
              {CTA.primary}
              <Arrow />
            </a>
            <a href={BRAND.phoneHref} className="taarn-btn hover:bg-white hover:text-taarn-ink">{CTA.secondary}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TaarnFooter() {
  return (
    <footer className="bg-taarn-plum py-12 text-white/60">
      <div className="v2-shell flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
        <span className="font-[family-name:var(--font-italiana)] text-[1.2rem] uppercase tracking-[0.28em] text-white">{BRAND.name}</span>
        <span className="taarn-label">{BRAND.area}</span>
        <span className="flex flex-wrap gap-x-8 gap-y-2">
          <a href={`mailto:${BRAND.email}`} className="taarn-label hover:text-white">{BRAND.email}</a>
          <a href={BRAND.phoneHref} className="taarn-label hover:text-white">{BRAND.phone}</a>
        </span>
      </div>
    </footer>
  );
}
