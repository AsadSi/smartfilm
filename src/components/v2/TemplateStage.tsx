'use client';

import { useEffect, useRef, useState } from 'react';
import {
  BRAND,
  CRAFT,
  CTA,
  FOOTER,
  HERO,
  NAV,
  PRODUCTS,
  REFERENCES,
  SPECS,
  STAGES,
} from '@/content/v2';
import { Arrow, Loop, Reveal } from './primitives';

/**
 * TEMPLATE A · STAGE — after porsche.com
 *
 * The organising idea is that the page is a *sequence of stages*, not a stack
 * of sections. Every one of the three product bands owns the whole viewport,
 * carries a single photograph, and sets its copy into the bottom-left corner of
 * that photograph. Nothing is laid out beside an image; everything is laid out
 * on top of one.
 *
 * That is the actual difference between this and a normal marketing page, and
 * it is why the copy has to be so short: four words of headline and one line of
 * standfirst is all a stage can hold before it stops being an image with words
 * on it and becomes a slide.
 *
 * The datasheet survives, near the bottom. Porsche would not put a spec table
 * on a homepage, but Porsche is selling to people who already know what a car
 * is; this business gets asked for transparency, thickness and wattage before
 * anything else, so the table earns its place — after the stages have done the
 * selling, not before.
 */
export default function TemplateStage() {
  return (
    <>
      <StageHeader />
      <main id="main">
        <StageHero />
        <StageRange />
        {STAGES.map((s, i) => (
          <StageBand key={s.key} stage={s} priority={i === 0} />
        ))}
        <StageFigures />
        <StageSpecs />
        <StageReferences />
        <StageCta />
      </main>
      <StageFooter />
    </>
  );
}

/* ── Header ─────────────────────────────────────────────────────────────────
   Transparent over the hero, white once the hero has passed. The nav lives
   behind one word: a row of five links across the top makes a site read as a
   catalogue, one word makes it read as a marque — and it buys a full-screen
   menu surface with room to list the range properly. */
function StageHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const dark = solid || open;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-white">
        Gå til indhold
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 h-[var(--v2-header-h)] transition-[background-color,border-color,color] duration-500 ease-[var(--ease-cold)] ${
          dark ? 'border-b border-hair bg-paper text-ink' : 'border-b border-transparent text-white'
        }`}
      >
        <div className="v2-shell flex h-full items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="stage-menu"
            className="v2-label -ml-1 cursor-pointer px-1 py-2 text-current"
          >
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <span className={`block h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-cold)] ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
              <span className={`block h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-cold)] ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
            </span>
            {open ? 'Luk' : 'Menu'}
          </button>

          <a href="#top" className="absolute left-1/2 -translate-x-1/2 font-[family-name:var(--font-display)] text-[0.9375rem] font-medium uppercase leading-none tracking-[0.34em]">
            {BRAND.name}
          </a>

          <a href="#kontakt" className={`v2-btn h-10 px-5 text-sm max-sm:hidden ${dark ? 'v2-btn-line' : 'v2-btn-line-light'}`}>
            Forespørg
          </a>
        </div>
      </header>

      <div id="stage-menu" hidden={!open} className="fixed inset-0 z-40 bg-paper pt-[var(--v2-header-h)]">
        <nav className="v2-shell flex h-full flex-col justify-between overflow-y-auto pb-12 pt-[clamp(2rem,6vh,4.5rem)]">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.href} className="v2-rule first:border-t-0">
                <a href={item.href} onClick={() => setOpen(false)} className="group flex items-baseline gap-6 py-[clamp(0.75rem,2.4vh,1.5rem)]">
                  <span className="v2-num-sm w-8 shrink-0 text-[11px] tracking-[0.2em] text-ink-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="v2-h2">{item.label}</span>
                  <Arrow className="ml-auto self-center text-ink-3 transition-transform duration-[420ms] ease-[var(--ease-cold)] group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
          <div className="v2-rule flex flex-wrap items-center justify-between gap-x-10 gap-y-4 pt-6">
            <p className="v2-label">{BRAND.area}</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <a href={`mailto:${BRAND.email}`} className="v2-arrow text-[0.875rem]">{BRAND.email}</a>
              <a href={BRAND.phoneHref} className="v2-arrow text-[0.875rem]">{BRAND.phone}</a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────────
   The one place the client's own footage runs, because no stock library has a
   clip of PDLC glass switching and that switch is the entire product. */
function StageHero() {
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
    <section id="top" className="stage">
      <Loop
        ref={videoRef}
        video="/assets/hero.mp4"
        videoHevc="/assets/optimized/hero.h265.mp4"
        poster="/assets/hero-poster.jpg"
        className="v2-drift absolute inset-0 size-full object-cover"
      />
      <div aria-hidden="true" className="stage-scrim" />

      <div className="v2-shell relative w-full pb-[clamp(3.5rem,9vh,7rem)]">
        <p className="v2-label v2-label-light v2-tick v2-tick-light">{HERO.label}</p>
        <h1 className="v2-display mt-1">{HERO.headline}</h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-16">
          <p className="v2-lead v2-lead-light max-w-[46ch]">{HERO.lead}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#serien" className="v2-btn v2-btn-solid-light">{HERO.primary}</a>
            <a href="#kontakt" className="v2-btn v2-btn-line-light">
              {HERO.secondary}
              <Arrow />
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="v2-cue absolute bottom-0 left-1/2 h-16 w-px -translate-x-1/2 overflow-hidden max-md:hidden">
        <span />
      </div>

      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-8 right-[var(--v2-gutter)] flex size-10 cursor-pointer items-center justify-center border border-white/35 text-white transition-colors duration-500 ease-[var(--ease-cold)] hover:bg-white/10 max-md:hidden"
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
   Porsche's model cards: photograph, name, one line, one key figure, one pill.
   No rules between them and no card background — the whitespace does the
   separating, which is the restrained version of the same job. */
function StageRange() {
  return (
    <section id="serien" className="v2-band bg-paper">
      <div className="v2-shell">
        <Reveal className="grid gap-x-8 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="v2-label v2-tick">Serien</p>
            <h2 className="v2-h2 mt-1">Tre teknologier. Ét materiale.</h2>
          </div>
          <p className="v2-lead lg:col-span-6 lg:col-start-7 lg:self-end">
            Alle tre lever i glasset frem for foran det. Forskellen er, hvad du vil have glasset til
            at gøre, når nogen kigger på det.
          </p>
        </Reveal>

        <ul className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-x-8 gap-y-14 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 80}>
              <article className="group flex h-full flex-col">
                <a href={p.href} className="v2-frame block aspect-[4/3] w-full">
                  <Loop
                    video={p.film.video}
                    videoHevc={p.film.hevc}
                    poster={p.film.poster}
                    className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cold)] group-hover:scale-[1.03]"
                  />
                </a>
                <h3 className="v2-h3 mt-6">{p.name}</h3>
                <p className="v2-body mt-2 text-[0.9375rem]">{p.blurb}</p>
                <p className="mt-5">
                  <span className="v2-num text-[1.75rem]">{p.figure.value}</span>
                  {p.figure.unit ? <span className="v2-num-sm ml-0.5 text-base text-ink-3">{p.figure.unit}</span> : null}
                  <span className="v2-caption ml-2">{p.figure.label}</span>
                </p>
                <a href={p.href} className="v2-btn v2-btn-line mt-auto self-start pt-0 !mt-7">
                  Læs mere
                </a>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── The stages ─────────────────────────────────────────────────────────────
   One product, one photograph, one viewport. Text always bottom-left, never
   centred: centring puts the headline over the middle of the frame, which is
   the part of the shot worth looking at, and bottom-left always has the scrim
   under it. */
function StageBand({ stage, priority }: { stage: (typeof STAGES)[number]; priority: boolean }) {
  return (
    <section id={stage.key} className="stage">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={stage.image}
        alt={stage.alt}
        className="absolute inset-0 size-full object-cover"
        loading={priority ? 'eager' : 'lazy'}
      />
      <div aria-hidden="true" className="stage-scrim" />

      <Reveal className="v2-shell relative w-full pb-[clamp(3.5rem,9vh,7rem)]">
        <p className="v2-label v2-label-light v2-tick v2-tick-light">{stage.label}</p>
        <h2 className="v2-display mt-1">{stage.headline}</h2>
        <p className="v2-lead v2-lead-light mt-6 max-w-[44ch]">{stage.lead}</p>
        <a href="#specifikationer" className="v2-btn v2-btn-solid-light mt-8">
          {stage.cta}
          <Arrow />
        </a>
      </Reveal>
    </section>
  );
}

/* ── Figures ────────────────────────────────────────────────────────────────
   A thin dark band between the stages and the datasheet. Vertical hairlines
   rather than boxes: boxes would make it a stats widget, rules make it a
   specification. */
function StageFigures() {
  return (
    <section className="v2-band-tight bg-graphite text-white">
      <div className="v2-shell">
        <Reveal className="grid gap-x-8 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="v2-label v2-label-light v2-tick v2-tick-light">{CRAFT.label}</p>
            <h2 className="v2-h2 mt-1">{CRAFT.headline}</h2>
          </div>
          <p className="v2-lead v2-lead-light lg:col-span-6 lg:col-start-7 lg:self-end">{CRAFT.lead}</p>
        </Reveal>

        <Reveal delay={120}>
          <dl className="v2-rule-dark mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-2 lg:grid-cols-4">
            {CRAFT.figures.map((f) => (
              <div key={f.label} className="border-hair-dark py-8 max-lg:even:border-l max-lg:even:pl-6 max-lg:odd:pr-6 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0">
                <dd>
                  <span className="v2-num">{f.value}</span>
                  {f.unit ? <span className="v2-num-sm ml-1 text-2xl text-signal-light">{f.unit}</span> : null}
                </dd>
                <dt className="mt-4 max-w-[20ch] text-[0.875rem] leading-snug text-ink-light-3">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Specs ──────────────────────────────────────────────────────────────────
   Scrolls sideways inside its own container on narrow screens with the label
   column pinned. Stacking a comparison table into three lists is the standard
   responsive answer and it destroys the one thing a table is for. */
function StageSpecs() {
  return (
    <section id="specifikationer" className="v2-band bg-paper">
      <div className="v2-shell">
        <Reveal>
          <p className="v2-label v2-tick">{SPECS.label}</p>
          <h2 className="v2-h2 mt-1">{SPECS.headline}</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="v2-lead mt-6 max-w-[48ch]">{SPECS.lead}</p>
        </Reveal>

        <Reveal delay={160} className="mt-[clamp(2.5rem,5vw,4rem)] overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink">
                <th scope="col" className="v2-label sticky left-0 z-10 bg-paper py-5 pr-6 align-bottom">Egenskab</th>
                {SPECS.columns.map((c) => (
                  <th key={c} scope="col" className="v2-h4 py-5 pl-6 align-bottom">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPECS.rows.map((row) => (
                <tr key={row.label} className="border-b border-hair">
                  <th scope="row" className="sticky left-0 z-10 bg-paper py-5 pr-6 text-[0.9375rem] font-normal text-ink-3">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={`${row.label}-${SPECS.columns[i]}`} className="v2-num-sm py-5 pl-6 text-[1.0625rem]">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={200}>
          <p className="v2-caption mt-6 max-w-[62ch]">{SPECS.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── References ─────────────────────────────────────────────────────────────
   Asymmetric on purpose — one wide plate and three portraits — so the band does
   not read as a four-up grid of stock photography, which is exactly what it is
   until the client's own installation shots replace it. */
function StageReferences() {
  const [lead, ...rest] = REFERENCES;
  return (
    <section id="referencer" className="v2-band bg-fog">
      <div className="v2-shell">
        <Reveal>
          <p className="v2-label v2-tick">Referencer</p>
          <h2 className="v2-h2 mt-1">Set i brug.</h2>
        </Reveal>

        <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-x-6 gap-y-12 md:grid-cols-3">
          <Reveal fade className="md:col-span-3">
            <figure>
              <div className="v2-frame aspect-[16/7] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lead.image} alt={lead.alt} className="size-full object-cover" loading="lazy" />
              </div>
              <figcaption className="v2-rule mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 pt-4">
                <span className="v2-h4">{lead.title}</span>
                <span className="v2-label">{lead.meta}</span>
              </figcaption>
            </figure>
          </Reveal>

          {rest.map((item, i) => (
            <Reveal fade key={item.title} delay={i * 80}>
              <figure>
                <div className="v2-frame aspect-[3/4] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.alt} className="size-full object-cover" loading="lazy" />
                </div>
                <figcaption className="v2-rule mt-5 pt-4">
                  <span className="v2-h4 block">{item.title}</span>
                  <span className="v2-label mt-2 block">{item.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StageCta() {
  return (
    <section id="kontakt" className="stage">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/pexels/facade-lowangle.jpg" alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" loading="lazy" />
      <div aria-hidden="true" className="stage-scrim" />
      <Reveal className="v2-shell relative w-full pb-[clamp(3.5rem,9vh,7rem)]">
        <p className="v2-label v2-label-light v2-tick v2-tick-light">{CTA.label}</p>
        <h2 className="v2-display mt-1">{CTA.headline}</h2>
        <p className="v2-lead v2-lead-light mt-6 max-w-[46ch]">{CTA.lead}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${BRAND.email}`} className="v2-btn v2-btn-solid-light">
            {CTA.primary}
            <Arrow />
          </a>
          <a href={BRAND.phoneHref} className="v2-btn v2-btn-line-light">{CTA.secondary}</a>
        </div>
      </Reveal>
    </section>
  );
}

function StageFooter() {
  return (
    <footer className="bg-void text-white">
      <div className="v2-shell v2-band-tight">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          <p className="v2-lead v2-lead-light max-w-[30ch] text-[1.0625rem]">{FOOTER.tagline}</p>
          {FOOTER.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="v2-label v2-label-light">{col.title}</h2>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#serien" className="text-[0.9375rem] text-ink-light-2 transition-colors duration-300 hover:text-white">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="Kontakt">
            <h2 className="v2-label v2-label-light">Kontakt</h2>
            <ul className="mt-6 space-y-3">
              <li><a href={`mailto:${BRAND.email}`} className="text-[0.9375rem] text-ink-light-2 hover:text-white">{BRAND.email}</a></li>
              <li><a href={BRAND.phoneHref} className="text-[0.9375rem] text-ink-light-2 hover:text-white">{BRAND.phone}</a></li>
              <li className="text-[0.9375rem] text-ink-light-3">{BRAND.area}</li>
            </ul>
          </nav>
        </div>

        <div className="v2-rule-dark mt-[clamp(3rem,6vw,5rem)] flex flex-wrap items-center gap-x-8 gap-y-3 pt-6">
          {FOOTER.legal.map((l) => (
            <span key={l} className="v2-caption v2-caption-light">{l}</span>
          ))}
        </div>
      </div>

      {/* The oversized wordmark, clipped at the baseline so it reads as a
          watermark rather than as a heading, and set in champagne at 9% — the
          warmth is barely nameable at that opacity, which is the only way an
          accent this large stays an accent. */}
      <div aria-hidden="true" className="v2-shell overflow-hidden pb-[clamp(1rem,2vw,2rem)]">
        <p className="translate-y-[0.12em] font-[family-name:var(--font-display)] text-[clamp(3rem,15vw,14rem)] font-medium uppercase leading-[0.8] tracking-[-0.02em] text-signal-light/[0.09]">
          {BRAND.name}
        </p>
      </div>
    </footer>
  );
}
