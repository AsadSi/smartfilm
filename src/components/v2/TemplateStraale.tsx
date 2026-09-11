'use client';

import { useState } from 'react';
import { BRAND, CRAFT, CTA, FILM, HERO, IMG, ALT, NAV, PRINCIPLES, PRODUCTS, REFERENCES, SPECS, ZONES } from '@/content/v2';
import { Arrow, Loop, Reveal } from './primitives';

/**
 * TEMPLATE G · STRÅLE — huly.io
 *
 * The reference is the landing page Huly paid ninety thousand dollars for, and
 * the three things that make it are all structural:
 *
 *  · One beam of light standing in a near-black hero, white-hot at the core and
 *    violet at the edges, flaring where it lands on the product window.
 *  · The product shown as the product — a full app window under the headline
 *    rather than a photograph of people using it. Here that window is the
 *    glass's control app, and it works: pick a room and throw its switch, and
 *    the preview frosts or clears.
 *  · Alternation. The page drops out of the dark twice, into a pale frosted
 *    ground, so it never settles into being "a dark website".
 *
 * Orange appears only on things you can press and on the one glowing edge.
 */
export default function TemplateStraale() {
  return (
    <div className="tpl-straale bg-straale-bg text-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-3 focus:text-black">
        Gå til indhold
      </a>
      <StraaleHeader />
      <main id="main">
        <StraaleHero />
        <StraaleBento />
        <StraaleTogether />
        <StraaleSpecs />
        <StraaleCraft />
        <StraaleMovement />
      </main>
      <StraaleFooter />
    </div>
  );
}

function Mark({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`relative inline-block h-4 w-[3px] rounded-full bg-gradient-to-b from-[#8ea2ff] to-white shadow-[0_0_10px_2px_rgb(140_160_255/0.8)] ${className}`} />
  );
}

/* ── Header ───────────────────────────────────────────────────────────────── */
function StraaleHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="v2-shell flex h-[var(--v2-header-h)] items-center justify-between gap-8">
        <div className="flex items-center gap-10">
          <a href="#top" className="flex items-center gap-2.5 font-[family-name:var(--font-geist)] text-[0.9375rem] font-semibold tracking-[-0.02em]">
            <Mark />
            {BRAND.name}
          </a>
          <nav aria-label="Sektioner" className="max-lg:hidden">
            <ul className="flex items-center gap-7">
              {NAV.slice(0, 4).map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="straale-body text-[0.8125rem] text-straale-ink-2 transition-colors hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a href={BRAND.phoneHref} className="straale-btn straale-btn-ghost h-9 text-[0.8125rem] max-sm:hidden">
            Ring til os
          </a>
          <a href="#kontakt" className="straale-btn straale-btn-glow h-9 text-[0.8125rem]">
            Book demo
          </a>
        </div>
      </div>
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function StraaleHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-[clamp(4rem,8vw,7rem)]">
      <div className="relative min-h-[min(92svh,52rem)] pt-[calc(var(--v2-header-h)+clamp(3.5rem,10vw,9rem))]">
        <div aria-hidden="true" className="straale-beam">
          <div className="straale-beam-haze" />
          <div className="straale-beam-core" />
          <div className="straale-beam-flare" />
        </div>

        <div className="v2-shell relative">
          <Reveal>
            <h1 className="straale-display max-w-[12ch]">{HERO.headlineAlt} på et sekund.</h1>
            <p className="straale-body mt-6 max-w-[42ch] text-[1.0625rem] text-straale-ink-2">{HERO.lead}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#kontakt" className="straale-btn straale-btn-glow">
                {HERO.secondary}
                <Arrow />
              </a>
              <a href="#serien" className="straale-btn straale-btn-ghost">{HERO.primary}</a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="v2-shell relative -mt-[clamp(2rem,6vw,5rem)]">
        <Reveal fade>
          <ControlWindow />
        </Reveal>
        <p className="straale-body mt-8 text-center text-[0.8125rem] text-straale-ink-3">
          Alt, glasset skal kunne:{' '}
          {['Smart Film', 'LED Film', '3D Media Glass', 'Styring', 'Montering'].map((t, i) => (
            <span key={t} className="font-medium text-white">
              {i > 0 ? <span className="px-2.5 text-straale-ink-3">·</span> : null}
              {t}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* The control app. Huly shows its actual product under the headline; the
   equivalent here is the thing a facility manager would actually open. It
   holds its own state, so it demonstrates the product rather than depicting it. */
function ControlWindow() {
  const [states, setStates] = useState(() => Object.fromEntries(ZONES.map((z) => [z.id, z.state])));
  const [selected, setSelected] = useState(ZONES[0].id);
  const zone = ZONES.find((z) => z.id === selected) ?? ZONES[0];
  const mat = states[zone.id] === 'mat';

  const setAll = (s: 'mat' | 'klar') => setStates(Object.fromEntries(ZONES.map((z) => [z.id, s])));

  return (
    <div className="straale-window text-left">
      <div className="flex items-center justify-between gap-4 border-b border-straale-line px-4 py-3">
        <div className="flex items-center gap-3">
          <Mark className="!h-3" />
          <span className="straale-h3 text-[0.875rem]">Styring</span>
          <span className="rounded-full border border-straale-line px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-straale-ink-3">
            Eksempel
          </span>
        </div>
        <span className="hidden rounded-md border border-straale-line px-3 py-1 text-[12px] text-straale-ink-3 sm:block">Søg rum …</span>
      </div>

      <div className="grid md:grid-cols-[15rem_1fr] lg:grid-cols-[15rem_1fr_16rem]">
        <nav aria-label="Rum" className="border-straale-line p-3 md:border-r">
          <p className="straale-label px-2 pb-3 pt-1 text-straale-ink-3">Rum</p>
          <ul className="space-y-1">
            {ZONES.map((z) => (
              <li key={z.id}>
                <button
                  type="button"
                  onClick={() => setSelected(z.id)}
                  aria-pressed={z.id === selected}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-[0.8125rem] transition-colors ${
                    z.id === selected ? 'bg-white/[0.07] text-white' : 'text-straale-ink-2 hover:bg-white/[0.04]'
                  }`}
                >
                  <span>
                    {z.name}
                    <span className="block text-[11px] text-straale-ink-3">{z.floor}</span>
                  </span>
                  <span className={`text-[10px] uppercase tracking-[0.12em] ${states[z.id] === 'mat' ? 'text-straale-ink-3' : 'text-[#9fb0ff]'}`}>
                    {states[z.id]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-3 sm:p-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-black">
            <Loop video={FILM.hero.video} videoHevc={FILM.hero.hevc} poster={FILM.hero.poster} className="size-full object-cover" />
            {/* The frost. A backdrop blur fading in and out, so what you see
                through the preview behaves the way the pane itself does. */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 bg-white/25 backdrop-blur-2xl backdrop-saturate-50 transition-opacity duration-[900ms] ease-[var(--ease-cold)] ${mat ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-4">
              <div className="rounded-lg bg-black/55 px-3 py-2 backdrop-blur-md">
                <p className="text-[0.8125rem] font-medium">{zone.name}</p>
                <p className="text-[11px] text-straale-ink-2">
                  {zone.product} · {zone.area}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStates((s) => ({ ...s, [zone.id]: mat ? 'klar' : 'mat' }))}
                aria-pressed={!mat}
                className="flex items-center gap-3 rounded-full bg-black/55 py-1.5 pl-3.5 pr-1.5 text-[11px] uppercase tracking-[0.14em] backdrop-blur-md"
              >
                {mat ? 'Mat' : 'Klar'}
                <span className={`flex h-6 w-11 items-center rounded-full p-[3px] transition-colors duration-500 ${mat ? 'justify-start bg-white/20' : 'justify-end bg-[#ff7a30]'}`}>
                  <span className="block size-[18px] rounded-full bg-white shadow" />
                </span>
                <span className="sr-only">Skift {zone.name}</span>
              </button>
            </div>
          </div>
        </div>

        <aside className="hidden border-l border-straale-line p-4 lg:block">
          <p className="straale-label text-straale-ink-3">Scener</p>
          <div className="mt-3 space-y-2">
            <button type="button" onClick={() => setAll('mat')} className="w-full rounded-lg border border-straale-line px-3 py-2.5 text-left text-[0.8125rem] hover:bg-white/[0.04]">
              Møde i gang
              <span className="block text-[11px] text-straale-ink-3">Alle rum mat</span>
            </button>
            <button type="button" onClick={() => setAll('klar')} className="w-full rounded-lg border border-straale-line px-3 py-2.5 text-left text-[0.8125rem] hover:bg-white/[0.04]">
              Åbent kontor
              <span className="block text-[11px] text-straale-ink-3">Alle rum klar</span>
            </button>
          </div>
          <p className="straale-label mt-6 text-straale-ink-3">Skiftetid</p>
          <p className="mt-2 text-[2rem] font-medium leading-none tracking-[-0.04em]">
            &lt;1<span className="text-straale-ink-3"> sek.</span>
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-straale-ink-3">Via kontakt, fjernbetjening eller app.</p>
        </aside>
      </div>
    </div>
  );
}

/* ── Bento ────────────────────────────────────────────────────────────────────
   Huly's "unmatched productivity": dark cards on a white ground, each with a
   bold first phrase and its own coloured glow in a corner. */
const GLOWS = ['rgb(255 122 48 / 0.35)', 'rgb(80 120 255 / 0.4)', 'rgb(150 90 255 / 0.38)'];

function StraaleBento() {
  return (
    <section id="serien" className="bg-white py-[clamp(4.5rem,9vw,8rem)] text-straale-light-ink">
      <div className="v2-shell">
        <Reveal className="max-w-[46rem]">
          <h2 className="straale-h2">Tre teknologier. Ét glas.</h2>
          <p className="straale-body mt-5 max-w-[48ch] text-straale-light-ink-2">
            Alle tre lever i glasset frem for foran det. Forskellen er, hvad du vil have ruden til at gøre, når nogen kigger på den.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <article
                className="relative h-full overflow-hidden rounded-2xl bg-[#0a0c12] p-2 text-white"
                style={{ backgroundImage: `radial-gradient(60% 50% at ${i % 2 ? '100%' : '0%'} 0%, ${GLOWS[i]}, transparent 70%)` }}
              >
                <div className="aspect-[16/9] overflow-hidden rounded-xl">
                  <Loop video={p.film.video} videoHevc={p.film.hevc} poster={p.film.poster} className="size-full object-cover" />
                </div>
                <div className="flex items-end justify-between gap-6 p-5">
                  <p className="straale-body max-w-[46ch] text-[0.9375rem] text-straale-ink-2">
                    <strong className="font-medium text-white">{p.name}.</strong> {p.blurb}
                  </p>
                  <p className="shrink-0 text-right text-[1.75rem] font-medium leading-none tracking-[-0.04em]">
                    {p.figure.value}
                    <span className="text-straale-ink-3">{p.figure.unit}</span>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={210}>
            <article className="relative flex h-full min-h-[22rem] items-end overflow-hidden rounded-2xl bg-[#0a0c12] p-7 text-white">
              <div aria-hidden="true" className="absolute -right-[12%] -top-[20%] aspect-square w-[70%]">
                <div className="straale-ring-glow" />
                <div className="straale-ring" />
              </div>
              <p className="straale-body relative max-w-[40ch] text-[0.9375rem] text-straale-ink-2">
                <strong className="font-medium text-white">Styring.</strong> {PRINCIPLES[0].points[2]} — og scener, der skifter flere
                ruder på én gang, når mødet går i gang.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Together ─────────────────────────────────────────────────────────────────
   "Work together. Like in the office." — the frosted band, with one large
   framed photograph and a floating control laid over its corner. */
function StraaleTogether() {
  return (
    <section className="straale-frost py-[clamp(4.5rem,9vw,8rem)]">
      <div className="v2-shell">
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <h2 className="straale-h2 mx-auto">Privat. Uden at blive mørkt.</h2>
          <p className="straale-body mx-auto mt-5 max-w-[50ch] text-straale-light-ink-2">{PRINCIPLES[1].body}</p>
        </Reveal>

        <Reveal fade delay={120} className="relative mx-auto mt-12 max-w-[64rem]">
          <div className="overflow-hidden rounded-2xl border-[6px] border-white shadow-[0_40px_80px_-40px_rgb(40_50_90/0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.straaleOffice} alt={ALT.straaleOffice} className="aspect-[16/9] w-full object-cover" loading="lazy" />
          </div>
          <div className="absolute -bottom-6 left-4 w-[15rem] rounded-xl border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur-xl sm:left-[-1.5rem]">
            <p className="straale-label text-straale-light-ink-2">Mødelokale 1</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[0.9375rem] font-medium">Mat tilstand</span>
              <span className="flex h-6 w-11 items-center justify-start rounded-full bg-black/10 p-[3px]">
                <span className="block size-[18px] rounded-full bg-white shadow" />
              </span>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-straale-light-ink-2">Dagslyset slipper stadig igennem.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Specs ────────────────────────────────────────────────────────────────────
   "Sync with GitHub. Both ways." — a dark panel with an orange light along its
   top edge, the spec rows set as a list of issues with pill tags, and a
   six-up feature grid underneath. */
const TAG = ['bg-[#ff7a30]/15 text-[#ffb488]', 'bg-[#5b7cff]/15 text-[#a8b8ff]', 'bg-[#9a5bff]/15 text-[#c9a8ff]'];

function StraaleSpecs() {
  const features = [...PRINCIPLES[0].points, ...PRINCIPLES[1].points];
  return (
    <section id="specifikationer" className="py-[clamp(4.5rem,9vw,8rem)]">
      <div className="v2-shell">
        <Reveal>
          <h2 className="straale-h2 max-w-[14ch]">Tallene bag. Alle tre.</h2>
          <p className="straale-body mt-5 max-w-[48ch] text-straale-ink-2">{SPECS.lead}</p>
        </Reveal>

        <Reveal delay={100} className="straale-edge mt-12 overflow-hidden">
          <div className="relative flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-straale-line px-5 py-3.5 text-[12px] text-straale-ink-3">
            <span className="text-white">{SPECS.rows.length} egenskaber</span>
            {SPECS.columns.map((c, i) => (
              <span key={c} className={`rounded-full px-2.5 py-0.5 ${TAG[i]}`}>{c}</span>
            ))}
          </div>
          <ul className="relative">
            {SPECS.rows.map((row) => (
              <li key={row.label} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-straale-line px-5 py-3.5 last:border-b-0">
                <span className="flex items-center gap-3 text-[0.875rem]">
                  <span aria-hidden="true" className="size-3 rounded-full border border-straale-ink-3" />
                  {row.label}
                </span>
                <span className="flex flex-wrap gap-2">
                  {row.values.map((v, i) => (
                    <span key={`${row.label}-${i}`} className={`v2-num-sm rounded-full px-2.5 py-1 text-[12px] ${TAG[i]}`}>
                      <span className="sr-only">{SPECS.columns[i]}: </span>
                      {v}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <p className="straale-body mt-4 text-[12px] text-straale-ink-3">{SPECS.note}</p>

        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal as="li" key={f} delay={(i % 3) * 70}>
              <span aria-hidden="true" className="grid size-6 grid-cols-2 gap-[3px]">
                {[0, 1, 2, 3].map((k) => (
                  <span key={k} className={`rounded-[2px] ${k === i % 4 ? 'bg-[#ff7a30]' : 'bg-[#5b7cff]/70'}`} />
                ))}
              </span>
              <h3 className="straale-h3 mt-5 max-w-[20ch]">{f}</h3>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Craft ────────────────────────────────────────────────────────────────────
   "Knowledge at your fingertips" — the pale ground again, a paragraph with one
   phrase highlighted as if by a collaborator, and the references beneath. */
function StraaleCraft() {
  return (
    <section id="referencer" className="straale-frost py-[clamp(4.5rem,9vw,8rem)]">
      <div className="v2-shell grid gap-x-16 gap-y-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <h2 className="straale-h2 max-w-[16ch]">{CRAFT.headline}</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="straale-body text-[1.0625rem] text-straale-light-ink-2">
            Vi laver ikke standardstørrelser. Hvert parti måles op på stedet, produceres til den præcise åbning og{' '}
            <mark className="rounded-[3px] bg-[#ffe27a] px-1 text-straale-light-ink">monteres af vores eget hold</mark> — i hele Danmark.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
            {CRAFT.figures.map((f) => (
              <div key={f.label}>
                <dd className="text-[1.75rem] font-medium leading-none tracking-[-0.04em]">
                  {f.value}
                  {f.unit ? <span className="text-straale-light-ink-2">{f.unit}</span> : null}
                </dd>
                <dt className="mt-2 text-[12px] leading-snug text-straale-light-ink-2">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <ul className="v2-shell mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REFERENCES.map((r, i) => (
          <Reveal as="li" key={r.title} delay={i * 60} fade>
            <figure className="overflow-hidden rounded-xl border border-white bg-white shadow-[0_24px_50px_-30px_rgb(40_50_90/0.45)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.image} alt={r.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <figcaption className="px-4 py-3.5">
                <span className="block text-[0.9375rem] font-medium tracking-[-0.01em]">{r.title}</span>
                <span className="mt-1 block text-[12px] text-straale-light-ink-2">{r.meta}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ── Movement ─────────────────────────────────────────────────────────────────
   "Join the Movement": a ring of light on the left, the ask on the right. */
function StraaleMovement() {
  return (
    <section id="kontakt" className="relative overflow-hidden py-[clamp(4.5rem,10vw,9rem)]">
      <div className="v2-shell grid items-center gap-x-16 gap-y-12 md:grid-cols-2">
        <Reveal fade className="relative mx-auto aspect-square w-full max-w-[30rem]">
          <div className="straale-ring-glow" />
          <div className="straale-ring" />
          <div className="absolute inset-[24%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#1c2030,#06070b_70%)] shadow-[inset_0_0_60px_rgb(120_130_255/0.25)]" />
        </Reveal>
        <Reveal delay={100}>
          <h2 className="straale-h2 max-w-[13ch]">{CTA.headline}</h2>
          <p className="straale-body mt-5 max-w-[42ch] text-straale-ink-2">{CTA.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={`mailto:${BRAND.email}`} className="straale-btn straale-btn-glow">
              {CTA.primary}
              <Arrow />
            </a>
            <a href={BRAND.phoneHref} className="straale-btn straale-btn-ghost">{CTA.secondary}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StraaleFooter() {
  return (
    <footer className="border-t border-straale-line py-10">
      <div className="v2-shell flex flex-wrap items-center justify-between gap-x-10 gap-y-4 text-[12px] text-straale-ink-3">
        <span className="flex items-center gap-2.5 text-[0.875rem] font-medium text-white">
          <Mark className="!h-3" />
          {BRAND.full}
        </span>
        <span>{BRAND.area}</span>
        <span className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${BRAND.email}`} className="hover:text-white">{BRAND.email}</a>
          <a href={BRAND.phoneHref} className="hover:text-white">{BRAND.phone}</a>
          <span>© 2026 {BRAND.full}</span>
        </span>
      </div>
    </footer>
  );
}
