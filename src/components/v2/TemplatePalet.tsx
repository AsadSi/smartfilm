'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import { ALT, BRAND, CTA, FILM, IMG, PRODUCTS, SPECS } from '@/content/v2';
import { Arrow, Loop, Reveal } from './primitives';

/**
 * TEMPLATE I · PALET — "steal this colour palette for your website"
 *
 * The reference is a genre of short video: a product landing page floating in
 * a thick white bezel on a pale grey ground, its palette hovering above it as
 * four swatches, and the page recolouring as the palette changes — OPPO in
 * silver then lavender, HomePod in black-and-white then green, a perfume in
 * grey then pink then black.
 *
 * Two things are taken from it and one is added:
 *
 *  · Every product gets a screen of its own, with a giant word behind it and
 *    the product standing in front of the word.
 *  · The swatches work. Pick a palette and the screen repaints; "Stjæl
 *    paletten" copies the hex codes.
 *  · The added part: the first palette on every screen is greyscale, and in it
 *    the product — a pane of glass — is frosted, so the word behind it blurs.
 *    Pick a colour and the pane clears. The palette switch is the power switch.
 */
type Palette = {
  name: string;
  swatches: string[];
  pbg: string;
  ink: string;
  tint: string;
  tintO: number;
  frost: string;
  pedA?: string;
  pedB?: string;
};

function paletteStyle(p: Palette): CSSProperties {
  return {
    '--pbg': p.pbg,
    '--pal-ink': p.ink,
    '--tint': p.tint,
    '--tint-o': p.tintO,
    '--frost': p.frost,
    '--ped-a': p.pedA,
    '--ped-b': p.pedB,
  } as CSSProperties;
}

const SMART: Palette[] = [
  { name: 'Mat', swatches: ['#1d1d1f', '#8e8e93', '#c7c7cc', '#ffffff'], pbg: '#d6d6d9', ink: '#77777c', tint: 'transparent', tintO: 0, frost: '16px' },
  { name: 'Klar · lavendel', swatches: ['#1d1d1f', '#8a86e0', '#b8b5f3', '#ffffff'], pbg: '#dddbf6', ink: '#7f79dc', tint: '#a9a4f0', tintO: 0.55, frost: '0px' },
];

const LED: Palette[] = [
  { name: 'Mat', swatches: ['#000000', '#3a3a3c', '#8e8e93', '#d1d1d6'], pbg: '#050505', ink: '#ffffff', tint: 'transparent', tintO: 0, frost: '14px', pedA: '#e5e5e7', pedB: '#6d6d72' },
  { name: 'Klar · grøn', swatches: ['#000000', '#2f7bff', '#4cc638', '#9e9ea3'], pbg: '#030503', ink: '#ffffff', tint: '#39b52a', tintO: 0.72, frost: '0px', pedA: '#f5dd6a', pedB: '#1fa99b' },
];

const GLASS: Palette[] = [
  { name: 'Mat', swatches: ['#111111', '#8e8e93', '#c7c7cc', '#ffffff'], pbg: '#9d9da1', ink: '#ffffff', tint: 'transparent', tintO: 0, frost: '14px', pedA: '#f0f0f2', pedB: '#8b8b90' },
  { name: 'Klar · rosa', swatches: ['#111111', '#e6a3c4', '#d9869e', '#ffffff'], pbg: '#d98fae', ink: '#ffffff', tint: '#ec9cc0', tintO: 0.72, frost: '0px', pedA: '#ffe3ef', pedB: '#c77393' },
  { name: 'Klar · sort', swatches: ['#141414', '#2a2a2a', '#c49a6c', '#f3efe9'], pbg: '#161616', ink: '#f3efe9', tint: '#1a1410', tintO: 0.62, frost: '0px', pedA: '#e2c29a', pedB: '#5c4330' },
];

export default function TemplatePalet() {
  return (
    <div className="tpl-palet palet-ground min-h-svh text-[#111]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-black focus:px-4 focus:py-3 focus:text-white">
        Gå til indhold
      </a>

      <header className="v2-shell flex h-[var(--v2-header-h)] items-center justify-between">
        <span className="font-[family-name:var(--font-unbounded)] text-[0.9375rem] font-semibold lowercase tracking-[-0.02em]">{BRAND.name}</span>
        <a href="#kontakt" className="palet-label rounded-full bg-[#111] px-4 py-2.5 text-white">Forespørg</a>
      </header>

      <main id="main" className="pb-[clamp(4rem,8vw,7rem)]">
        <Reveal className="v2-shell pb-[clamp(3rem,6vw,5rem)] pt-[clamp(2rem,6vw,5rem)] text-center">
          <h1 className="palet-h2 mx-auto !text-[clamp(2rem,5vw,4.2rem)]">Stjæl paletten.</h1>
          <p className="mx-auto mt-5 max-w-[46ch] text-[1rem] leading-relaxed text-black/60">
            Tre produkter, tre skærme, hver med sin palet. Den grå er glasset slukket — vælg en farve, og ruden foran ordet klarner.
          </p>
        </Reveal>

        <div className="space-y-[clamp(4rem,8vw,7rem)]">
          <SmartScreen />
          <SmartDetail />
          <LedScreen />
          <LedDetail />
          <GlassScreen />
          <SpecsScreen />
          <CtaScreen />
        </div>
      </main>

      <footer className="v2-shell flex flex-wrap items-center justify-between gap-4 border-t border-black/10 py-8 text-[12px] text-black/55">
        <span>© 2026 {BRAND.full}</span>
        <span className="flex gap-6">
          <a href={`mailto:${BRAND.email}`} className="hover:text-black">{BRAND.email}</a>
          <a href={BRAND.phoneHref} className="hover:text-black">{BRAND.phone}</a>
        </span>
      </footer>
    </div>
  );
}

/* ── Shared parts ─────────────────────────────────────────────────────────── */

/** Swatches above a screen. Each group is one palette; the pressed one lifts. */
function SwatchBar({ palettes, active, onPick }: { palettes: Palette[]; active: number; onPick: (i: number) => void }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard
      ?.writeText(palettes[active].swatches.join(' '))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  };

  return (
    <div className="mb-6 flex flex-wrap items-end justify-center gap-x-7 gap-y-4">
      {palettes.map((p, i) => (
        <button
          key={p.name}
          type="button"
          aria-pressed={i === active}
          onClick={() => onPick(i)}
          className="palet-swatch-set flex flex-col items-center gap-2.5"
        >
          <span className="flex gap-1.5">
            {p.swatches.map((c) => (
              <span key={c} className="palet-swatch" style={{ background: c }} />
            ))}
          </span>
          <span className={`palet-label transition-colors ${i === active ? 'text-black' : 'text-black/45'}`}>{p.name}</span>
        </button>
      ))}
      <button type="button" onClick={copy} className="palet-label mb-[1px] rounded-full border border-black/15 bg-white px-3.5 py-2 shadow-sm" aria-live="polite">
        {copied ? 'Kopieret' : 'Stjæl paletten'}
      </button>
    </div>
  );
}

function Screen({ palette, className = '', children }: { palette: Palette; className?: string; children: ReactNode }) {
  return (
    <div className={`palet-frame mx-auto w-full max-w-[82rem] ${className}`} style={paletteStyle(palette)}>
      {children}
    </div>
  );
}

function ScreenNav({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`relative z-20 flex items-center justify-between px-[clamp(1rem,3vw,2rem)] pt-4 ${dark ? 'text-white' : ''}`}>
      <span className="font-[family-name:var(--font-unbounded)] text-[0.8125rem] font-medium lowercase opacity-80">smartfilm</span>
      <span className="palet-label hidden gap-7 opacity-70 sm:flex">
        <span>Serien</span>
        <span>Teknologi</span>
        <span>Kontakt</span>
      </span>
      <span className="palet-label rounded-full bg-current px-3 py-1.5">
        <span className={dark ? 'text-black' : 'text-white'}>Forespørg</span>
      </span>
    </div>
  );
}

/** The product. A pane of glass on its end; frosted or clear by palette. */
function Pane({ className = '', tone = 'light', children }: { className?: string; tone?: 'light' | 'dark'; children?: ReactNode }) {
  return (
    <div className={`palet-pane ${tone === 'dark' ? '!bg-[linear-gradient(155deg,rgb(255_255_255/0.22),rgb(0_0_0/0.35)_60%,rgb(255_255_255/0.12))] !border-white/35' : ''} ${className}`}>
      <span aria-hidden="true" className="absolute inset-y-4 left-3 w-px bg-gradient-to-b from-white/90 via-white/20 to-transparent" />
      {children}
    </div>
  );
}

function Photo({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`palet-photo absolute object-cover ${className}`} loading="lazy" />
      <div aria-hidden="true" className={`palet-tint absolute ${className}`} />
    </>
  );
}

/* ── 1 · Smart Film — the OPPO screen ─────────────────────────────────────────
   Silver silk, a giant word in the palette's ink, the pane in front of it. */
function SmartScreen() {
  const [i, setI] = useState(0);
  const p = SMART[i];
  return (
    <section id="serien" aria-label={PRODUCTS[0].name} className="v2-shell">
      <SwatchBar palettes={SMART} active={i} onPick={setI} />
      <Reveal fade>
        <Screen palette={p} className="aspect-[4/5] sm:aspect-[16/10]">
          <Photo src={IMG.paletSilk} alt={ALT.paletSilk} className="inset-0 size-full" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-white/40" />
          <ScreenNav />

          <p className="palet-display absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-center opacity-80">Smart film</p>
          <Pane className="absolute left-1/2 top-1/2 aspect-[9/17] w-[clamp(6.5rem,15vw,12.5rem)] -translate-x-1/2 -translate-y-[46%]" />

          <div className="absolute inset-x-0 bottom-5 z-10 text-center">
            <p className="palet-h3 opacity-80">{PRODUCTS[0].tagline}</p>
            <p className="palet-label mt-1.5 opacity-60">SmartFilm PDLC · {PRODUCTS[0].figure.value}{PRODUCTS[0].figure.unit} transparens</p>
          </div>
        </Screen>
      </Reveal>
    </section>
  );
}

/* The OPPO follow-up: "24H BATTERY LIFE" and two stacked cells beside it. */
function SmartDetail() {
  return (
    <section aria-label="Smart Film i tal" className="v2-shell">
      <Reveal fade>
        <div className="palet-frame mx-auto grid max-w-[82rem] gap-3 p-3 [--pal-ink:#2d2a5c] [--pbg:#eeedfb] md:grid-cols-[1.6fr_1fr]">
          <div className="relative min-h-[22rem] overflow-hidden rounded-[18px] bg-gradient-to-br from-white to-[#e2e0fb] p-7">
            <p className="palet-display !text-[clamp(2rem,5vw,4.4rem)] text-[#8a86e0]">&lt;1 sek. skiftetid</p>
            <p className="mt-4 max-w-[36ch] text-[0.9375rem] leading-relaxed text-[#4b4870]">
              Fra mat til krystalklart hurtigere, end den der kigger, kan nå at registrere det.
            </p>
            <Pane className="absolute -bottom-10 right-10 aspect-[9/16] w-[9rem] rotate-[8deg] !backdrop-blur-none" />
          </div>
          <div className="grid gap-3">
            <div className="rounded-[18px] bg-white p-6">
              <p className="palet-h3 text-[#4b4870]">Diffust dagslys i mat tilstand</p>
              <div aria-hidden="true" className="mt-6 flex h-12 items-end gap-[3px]">
                {Array.from({ length: 42 }, (_, k) => (
                  <span key={k} className="w-full rounded-full bg-[#8a86e0]" style={{ height: `${25 + Math.abs(Math.sin(k * 0.7)) * 75}%`, opacity: 0.35 + (k % 5) * 0.13 }} />
                ))}
              </div>
            </div>
            <div className="rounded-[18px] bg-white p-6 text-center">
              <p className="palet-h3 text-[#4b4870]">Transparens i klar tilstand</p>
              <p className="palet-display mt-3 !text-[clamp(2.6rem,5vw,4rem)] text-[#8a86e0]">92%</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── 2 · LED Film — the HomePod screen ────────────────────────────────────────
   Black, the grass along the bottom, the pane on a pedestal. In the mat palette
   the grass is black-and-white, as it is in the reference before it turns. */
function LedScreen() {
  const [i, setI] = useState(0);
  const p = LED[i];
  const prod = PRODUCTS[1];
  return (
    <section id="led-film" aria-label={prod.name} className="v2-shell">
      <SwatchBar palettes={LED} active={i} onPick={setI} />
      <Reveal fade>
        <Screen palette={p} className="aspect-[4/5] sm:aspect-[16/10]">
          <Photo src={IMG.paletGrass} alt={ALT.paletGrass} className="inset-x-0 bottom-0 h-[58%] w-full [mask-image:linear-gradient(to_top,#000_55%,transparent)]" />
          <ScreenNav dark />

          <p className="palet-label absolute inset-x-0 top-[20%] text-center opacity-70">{prod.tagline}</p>
          <p className="palet-display absolute inset-x-0 top-[26%] whitespace-nowrap text-center">Led film</p>

          <div className="absolute left-1/2 top-[34%] w-[clamp(7rem,17vw,14rem)] -translate-x-1/2">
            <Pane tone="dark" className="aspect-[4/5] w-full overflow-hidden">
              <Loop video={prod.film.video} videoHevc={prod.film.hevc} poster={prod.film.poster} className="absolute inset-0 size-full rounded-[inherit] object-cover opacity-80 mix-blend-screen" />
            </Pane>
            <div className="palet-pedestal relative -mt-3 ml-[-25%] h-[clamp(1.4rem,2.6vw,2.2rem)] w-[150%]" />
          </div>

          <p className="palet-h3 absolute bottom-5 left-[clamp(1rem,3vw,2rem)] z-10 max-w-[18ch] text-white">Usynlig teknologi, synlig effekt</p>
        </Screen>
      </Reveal>
    </section>
  );
}

/* "AMP UP EVERYTHING YOU HEAR" — black split, a magenta block, a small photo. */
function LedDetail() {
  return (
    <section aria-label="LED Film i detaljer" className="v2-shell">
      <Reveal fade>
        <div className="palet-frame mx-auto grid max-w-[82rem] gap-10 p-[clamp(1.5rem,4vw,3rem)] [--pal-ink:#fff] [--pbg:#050505] md:grid-cols-2">
          <div className="flex flex-col">
            <h2 className="palet-h2 max-w-[16ch]">Facaden vågner, når det bliver mørkt.</h2>
            <p className="mt-5 max-w-[40ch] text-[0.9375rem] leading-relaxed text-white/60">{PRODUCTS[1].long}</p>
            <div className="relative mt-8 min-h-[14rem] flex-1 overflow-hidden rounded-[18px] bg-gradient-to-t from-[#e0287a] via-[#5a0f3a] to-black">
              <Loop video={FILM.ledfilm.video} videoHevc={FILM.ledfilm.hevc} poster={FILM.ledfilm.poster} className="absolute inset-0 size-full object-cover opacity-45 mix-blend-screen" />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-8">
            <div className="ml-auto aspect-[4/3] w-[70%] overflow-hidden rounded-[18px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.ledFacade} alt={ALT.ledFacade} className="size-full object-cover" loading="lazy" />
            </div>
            <div>
              <p className="palet-display !text-[clamp(2.4rem,5vw,4.4rem)]">2 mm</p>
              <p className="palet-h3 mt-3 text-white/80">Samlet tykkelse</p>
              <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-white/60">{PRODUCTS[1].blurb}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── 3 · 3D Media Glass — the perfume screen ──────────────────────────────────
   The notch with the logo in it, the heavy headline top left with its figure
   set like a price, pampas across the bottom, a dark card at the right. */
function GlassScreen() {
  const [i, setI] = useState(0);
  const p = GLASS[i];
  const prod = PRODUCTS[2];
  return (
    <section id="3d-media-glass" aria-label={prod.name} className="v2-shell">
      <SwatchBar palettes={GLASS} active={i} onPick={setI} />
      <Reveal fade>
        <Screen palette={p} className="aspect-[4/5] sm:aspect-[16/10]">
          <Photo src={IMG.paletPampas} alt={ALT.paletPampas} className="inset-x-0 bottom-0 h-[62%] w-full [mask-image:linear-gradient(to_top,#000_60%,transparent)]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,transparent_42%,rgb(255_255_255/0.12)_42%,rgb(255_255_255/0.12)_58%,transparent_58%)]" />

          <span className="palet-notch font-[family-name:var(--font-unbounded)] text-[0.75rem] font-semibold lowercase">smartfilm</span>
          <div className="relative z-10 flex items-center justify-between px-[clamp(1rem,3vw,2rem)] pt-4">
            <span className="palet-label rounded-full bg-white/85 px-3 py-1.5 text-black">Menu</span>
            <span className="palet-label rounded-full bg-white/85 px-3 py-1.5 text-black">Kontakt</span>
          </div>

          <div className="absolute left-[clamp(1rem,4vw,3rem)] top-[18%] z-10 max-w-[40%]">
            <p className="palet-h2 !text-[clamp(1.4rem,3.6vw,3.2rem)] !leading-[0.95]">
              3D Media
              <br />
              Glass <sup className="palet-label align-super !text-[0.7rem] opacity-80">{prod.figure.value}{prod.figure.unit}</sup>
            </p>
            <p className="mt-4 hidden max-w-[30ch] text-[0.8125rem] leading-relaxed opacity-80 md:block">{prod.blurb}</p>
            <a href="#kontakt" className="palet-label mt-5 hidden rounded-full bg-white/90 px-4 py-2 text-black md:inline-block">Forespørg</a>
          </div>

          <div className="absolute left-1/2 top-[22%] w-[clamp(6rem,13vw,11rem)] -translate-x-1/2">
            <Pane className="aspect-[9/16] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.glassDepth} alt="" className="absolute inset-3 size-[calc(100%-1.5rem)] rounded-[14px] object-cover opacity-70 mix-blend-luminosity" />
            </Pane>
            <div className="palet-pedestal relative -mt-3 ml-[-20%] h-[clamp(1.2rem,2.2vw,1.9rem)] w-[140%]" />
          </div>

          <div className="absolute right-[clamp(1rem,3vw,2rem)] top-[22%] hidden w-[18%] overflow-hidden rounded-[16px] bg-black/85 p-2 sm:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.glassImmersive} alt={ALT.glassImmersive} className="aspect-[3/4] w-full rounded-[10px] object-cover" loading="lazy" />
          </div>

          <p className="palet-h3 absolute bottom-5 left-[clamp(1rem,4vw,3rem)] z-10 max-w-[16ch]">{prod.tagline}</p>
        </Screen>
      </Reveal>
    </section>
  );
}

function SpecsScreen() {
  return (
    <section id="specifikationer" aria-label={SPECS.label} className="v2-shell">
      <Reveal fade>
        <div className="palet-frame mx-auto max-w-[82rem] p-[clamp(1.5rem,4vw,3rem)] [--pal-ink:#111] [--pbg:#f7f7f8]">
          <h2 className="palet-h2">{SPECS.headline}</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-black">
                  <th scope="col" className="palet-label py-4 pr-6 text-black/55">Egenskab</th>
                  {SPECS.columns.map((c) => (
                    <th key={c} scope="col" className="palet-h3 py-4 pl-6">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SPECS.rows.map((row) => (
                  <tr key={row.label} className="border-b border-black/10">
                    <th scope="row" className="py-4 pr-6 text-[0.875rem] font-normal text-black/60">{row.label}</th>
                    {row.values.map((v, k) => (
                      <td key={`${row.label}-${k}`} className="v2-num-sm py-4 pl-6 text-[0.9375rem]">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-[12px] text-black/50">{SPECS.note}</p>
        </div>
      </Reveal>
    </section>
  );
}

/* The last screen is the perfume in black — the reference's closing frame,
   with a bronze round button in the corner. */
function CtaScreen() {
  return (
    <section id="kontakt" aria-label={CTA.label} className="v2-shell">
      <Reveal fade>
        <div className="palet-frame relative mx-auto min-h-[28rem] max-w-[82rem] p-[clamp(1.5rem,4vw,3rem)] [--pal-ink:#f3efe9] [--pbg:#161616]">
          <p className="palet-label text-[#c49a6c]">Tilbud inden for 24 t</p>
          <h2 className="palet-display mt-4 max-w-[12ch] !text-[clamp(2.2rem,6vw,5.6rem)]">{CTA.headline}</h2>
          <p className="mt-6 max-w-[40ch] text-[0.9375rem] leading-relaxed text-white/60">{CTA.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${BRAND.email}`} className="palet-label inline-flex items-center gap-2 rounded-full bg-[#f3efe9] px-5 py-3 text-black">
              {CTA.primary}
              <Arrow />
            </a>
            <a href={BRAND.phoneHref} className="palet-label inline-flex items-center rounded-full border border-white/30 px-5 py-3">{CTA.secondary}</a>
          </div>
          <a
            href={BRAND.phoneHref}
            aria-label={`Ring ${BRAND.phone}`}
            className="absolute bottom-[clamp(1.5rem,4vw,3rem)] right-[clamp(1.5rem,4vw,3rem)] flex size-16 items-center justify-center rounded-2xl bg-[#c49a6c] text-black"
          >
            <Arrow className="-rotate-45" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
