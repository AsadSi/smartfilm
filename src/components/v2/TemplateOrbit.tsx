'use client';

import { useState, type CSSProperties, type PointerEvent } from 'react';
import { ALT, BRAND, CTA, IMG, PRODUCTS, SPECS } from '@/content/v2';
import { Arrow, Loop, Reveal } from './primitives';

/**
 * TEMPLATE K · ORBIT — "can you make my website look futuristic?"
 *
 * The reference is a reel of before-and-afters, and what the "afters" share is
 * not a colour or a typeface but a frame: every page sits inside a rounded
 * device bezel with notches cut out of its edges, the logo and the tabs living
 * in the cut-outs. Inside the frame, one product object carries the screen — a
 * sphere with a slit of light, a watch splitting a word, a bottle under a glass
 * arch.
 *
 * Here the objects are the orb (its slit takes the colour of the selected
 * product), a pane of glass standing in the word HOLDBAR, and a pane floating
 * under an arch in a blue sky. Four frames, four grounds — graphite, orange,
 * white, sky — so the page reads as a set of screens rather than one document.
 */
const MODES = [
  { slit: '#5ef2ff', label: 'Privatliv' },
  { slit: '#ff5fd2', label: 'Medieflade' },
  { slit: '#ffb347', label: 'Dybde' },
];

const SHARDS = [
  { cls: 'left-[-14%] top-[30%] w-[26%] aspect-[1.4]', clip: 'polygon(8% 30%, 60% 0, 100% 42%, 72% 100%, 0 78%)', depth: 26 },
  { cls: 'right-[-12%] top-[18%] w-[18%] aspect-square', clip: 'polygon(20% 0, 100% 24%, 80% 100%, 0 70%)', depth: 38 },
  { cls: 'right-[-20%] bottom-[16%] w-[24%] aspect-[1.2]', clip: 'polygon(0 20%, 70% 0, 100% 60%, 40% 100%)', depth: 18 },
  { cls: 'left-[4%] bottom-[-6%] w-[14%] aspect-square', clip: 'polygon(30% 0, 100% 40%, 60% 100%, 0 60%)', depth: 44 },
];

export default function TemplateOrbit() {
  return (
    <div className="tpl-orbit min-h-svh bg-orbit-void p-[clamp(0.5rem,1.2vw,1rem)] text-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-3 focus:text-black">
        Gå til indhold
      </a>
      <main id="main" className="space-y-[clamp(0.5rem,1.2vw,1rem)]">
        <OrbitHero />
        <OrbitResistant />
        <OrbitSeries />
        <OrbitArch />
        <OrbitSpecs />
        <OrbitCta />
      </main>
      <footer className="flex flex-wrap items-center justify-between gap-4 px-4 py-6">
        <span className="orbit-label text-orbit-ink-3">© 2026 {BRAND.full}</span>
        <span className="orbit-label text-orbit-ink-3">{BRAND.area}</span>
      </footer>
    </div>
  );
}

function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`font-[family-name:var(--font-michroma)] text-[0.8125rem] uppercase tracking-[0.18em] ${className}`}>{BRAND.name}</span>;
}

/* ── 1 · The orb ──────────────────────────────────────────────────────────────
   "Elevate your sound experience": the headline top left, the sphere in the
   middle with shards of glass drifting round it, two callouts on the right, a
   figure bottom left, and the product selector in the bottom notch. The shards
   follow the pointer a little; the slit takes the colour of the product. */
function OrbitHero() {
  const [mode, setMode] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const p = PRODUCTS[mode];

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  return (
    <section
      id="top"
      onPointerMove={onMove}
      className="orbit-frame min-h-[max(40rem,calc(100svh-2*clamp(0.5rem,1.2vw,1rem)))] bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,#23383c_0%,#111a1c_55%,#0a0f10_100%)]"
      style={{ '--notch': 'var(--color-orbit-void)', '--slit': MODES[mode].slit } as CSSProperties}
    >
      <div className="orbit-notch h-11 w-[min(16rem,50%)]" data-edge="top">
        <Wordmark />
      </div>

      <div className="relative z-10 flex items-center justify-between px-[clamp(1.25rem,3vw,2.5rem)] pt-5">
        <span className="orbit-label text-orbit-ink-3 max-sm:hidden">Serien · 03</span>
        <a href="#kontakt" className="orbit-btn ml-auto text-white/85 hover:bg-white hover:text-black">Forespørg ✱</a>
      </div>

      <div className="relative z-10 px-[clamp(1.25rem,3vw,2.5rem)] pt-[clamp(1.5rem,5vw,3.5rem)]">
        <h1>
          <span className="orbit-display block">Klart på</span>
          <span className="orbit-display block !text-[clamp(1.05rem,2.3vw,2.1rem)] text-orbit-ink-2">et sekund</span>
        </h1>
      </div>

      {/* The orb and its shards. */}
      <div className="absolute left-1/2 top-[52%] w-[clamp(14rem,34vw,31rem)] -translate-x-1/2 -translate-y-1/2">
        {SHARDS.map((s, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`orbit-shard ${s.cls}`}
            style={{ clipPath: s.clip, transform: `translate(${tilt.x * s.depth}px, ${tilt.y * s.depth}px)` }}
          />
        ))}
        <div className="orbit-orb w-full">
          <span className="orbit-slit left-[9%]" />
          <span className="orbit-slit right-[9%]" />
        </div>
      </div>

      <div className="absolute right-[clamp(1.25rem,3vw,2.5rem)] top-[30%] z-10 hidden w-[15rem] space-y-8 lg:block">
        <div>
          <p className="orbit-label" style={{ color: MODES[mode].slit }}>{MODES[mode].label}</p>
          <p className="orbit-h3 mt-2">{p.tagline}</p>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-orbit-ink-2">{p.blurb}</p>
        </div>
        <div>
          <p className="orbit-label text-orbit-ink-3">Montering</p>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-orbit-ink-2">Målt på stedet og monteret af vores eget hold.</p>
        </div>
      </div>

      <div className="absolute bottom-[clamp(4.5rem,8vw,5.5rem)] left-[clamp(1.25rem,3vw,2.5rem)] z-10">
        <p className="orbit-label text-orbit-ink-3">{p.figure.label}</p>
        <p className="orbit-display mt-2 !text-[clamp(1.8rem,3.4vw,3rem)]">
          {p.figure.value}
          <span className="text-orbit-ink-3">{p.figure.unit}</span>
        </p>
      </div>

      <div className="orbit-notch h-14 px-2" data-edge="bottom" role="tablist" aria-label="Vælg produkt">
        {PRODUCTS.map((prod, i) => (
          <button
            key={prod.name}
            type="button"
            role="tab"
            aria-selected={i === mode}
            onClick={() => setMode(i)}
            className={`orbit-label whitespace-nowrap rounded-full px-3.5 py-2 transition-colors sm:px-5 ${i === mode ? 'bg-white text-black' : 'text-orbit-ink-2 hover:text-white'}`}
          >
            {prod.name}
          </button>
        ))}
      </div>
    </section>
  );
}

/* ── 2 · Resistant ────────────────────────────────────────────────────────────
   The watch that splits RESISTANT in two, set on orange: here a pane of LED
   glass standing in the gap of HOLDBAR, over rock under a night sky. */
function OrbitResistant() {
  const temp = SPECS.rows.find((r) => r.label === 'Driftstemperatur');
  return (
    <section id="holdbar" className="rounded-[30px] bg-orbit-orange p-[clamp(0.75rem,2.5vw,2.5rem)]" style={{ '--notch': 'var(--color-orbit-orange)' } as CSSProperties}>
      <div className="orbit-frame relative aspect-[4/5] sm:aspect-[16/9]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.orbitRocks} alt={ALT.orbitRocks} className="absolute inset-0 size-full object-cover" loading="lazy" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/60" />

        <div className="orbit-notch h-10 w-[min(14rem,46%)]" data-edge="top">
          <Wordmark className="text-white" />
        </div>

        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center [perspective:900px]">
          <p className="orbit-mega flex items-center gap-[clamp(3.5rem,13vw,13rem)] text-white">
            <span>Hold</span>
            <span className="sr-only"> </span>
            <span>bar</span>
          </p>
          <div
            aria-hidden="true"
            className="absolute aspect-[9/14] w-[clamp(6rem,12vw,11rem)] overflow-hidden rounded-[18px] border border-white/50 bg-white/10 shadow-[0_40px_60px_-20px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.8)] backdrop-blur-[2px] [transform:rotateY(-24deg)_rotateZ(-4deg)]"
          >
            <Loop video={PRODUCTS[1].film.video} videoHevc={PRODUCTS[1].film.hevc} poster={PRODUCTS[1].film.poster} className="size-full object-cover opacity-85 mix-blend-screen" />
            <span className="absolute inset-y-3 left-2 w-px bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>

        <div className="absolute inset-x-[clamp(1rem,3vw,2rem)] bottom-[clamp(1rem,3vw,2rem)] flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[26rem]">
            <p className="orbit-label text-white/70">Driftstemperatur</p>
            <p className="orbit-display mt-2 !text-[clamp(1.2rem,2.4vw,2rem)]">{temp?.values[1]}</p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-white/75">LED Film på indersiden af facaden. Ingen bevægelige dele — udendørs, indendørs, år efter år.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Påklæbet', '3 års garanti', '2 mm'].map((t) => (
              <span key={t} className="orbit-label rounded-full border border-white/40 bg-black/30 px-3 py-2 backdrop-blur">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3 · The series ───────────────────────────────────────────────────────────
   The candle screen: a white frame, dots down the left edge, the film in a
   rounded well, thumbnails down the right that switch it, and a name card
   notched into the bottom corner with one word in the accent. */
function OrbitSeries() {
  const [i, setI] = useState(0);
  const p = PRODUCTS[i];
  const [first, ...rest] = p.name.split(' ');

  return (
    <section id="serien" className="orbit-frame bg-[#f1f0ee] p-[clamp(0.75rem,2vw,1.5rem)] text-[#111]" style={{ '--notch': 'var(--color-orbit-void)' } as CSSProperties}>
      <div className="orbit-notch h-10 w-[min(12rem,40%)]" data-edge="top">
        <span className="orbit-label text-white/70">Serien</span>
      </div>

      <div className="grid gap-4 pt-10 md:grid-cols-[1.5rem_1fr_7rem]">
        <div className="hidden flex-col items-center justify-center gap-2 md:flex" aria-hidden="true">
          {PRODUCTS.map((_, k) => (
            <span key={k} className={`size-2 rounded-full ${k === i ? 'bg-[#111]' : 'bg-[#111]/25'}`} />
          ))}
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-black">
          <Loop key={p.name} video={p.film.video} videoHevc={p.film.hevc} poster={p.film.poster} className="size-full object-cover" />
          <div className="absolute bottom-0 left-0 rounded-tr-[24px] bg-[#f1f0ee] px-5 pb-1 pt-4 sm:px-7 sm:pt-5">
            <p className="orbit-display !text-[clamp(1.1rem,2.6vw,2.2rem)] !leading-[1.1]">
              {first}
              <br />
              <span className="text-orbit-orange">{rest.join(' ') || first}</span>
            </p>
          </div>
          <div className="absolute bottom-4 right-4 hidden max-w-[16rem] rounded-2xl bg-white/90 p-4 backdrop-blur sm:block">
            <p className="orbit-label text-[#111]/60">{p.tagline}</p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#111]/75">{p.blurb}</p>
          </div>
        </div>

        <div role="tablist" aria-label="Vælg produkt" className="flex gap-3 md:flex-col md:justify-center">
          {PRODUCTS.map((prod, k) => (
            <button
              key={prod.name}
              type="button"
              role="tab"
              aria-selected={k === i}
              onClick={() => setI(k)}
              className={`relative aspect-square w-full overflow-hidden rounded-2xl ring-2 transition ${k === i ? 'ring-[#111]' : 'ring-transparent opacity-60 hover:opacity-100'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={prod.film.poster} alt="" className="size-full object-cover" loading="lazy" />
              <span className="sr-only">{prod.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4 · The arch ─────────────────────────────────────────────────────────────
   The bottle under a glass arch in a blue sky: a pane of 3D Media Glass
   floating on its pedestal, the alps along the bottom. */
function OrbitArch() {
  const p = PRODUCTS[2];
  return (
    <section id="dybde" className="orbit-frame relative min-h-[max(36rem,90svh)] bg-[linear-gradient(to_bottom,#2f3fd0_0%,#7f92ee_42%,#dfe4f7_78%)]" style={{ '--notch': 'var(--color-orbit-void)' } as CSSProperties}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.orbitAlps} alt={ALT.orbitAlps} className="absolute inset-x-0 bottom-0 h-[48%] w-full object-cover [mask-image:linear-gradient(to_top,#000_55%,transparent)]" loading="lazy" />

      <div className="orbit-notch h-10 w-[min(12rem,40%)]" data-edge="top">
        <span className="orbit-label text-white/70">{p.name}</span>
      </div>

      <Reveal className="relative z-10 max-w-[24rem] px-[clamp(1.25rem,3vw,2.5rem)] pt-[clamp(4rem,9vw,7rem)]">
        <p className="orbit-display !text-[clamp(1.6rem,3.4vw,3rem)] font-light !tracking-[0.04em]">{p.tagline}</p>
        <p className="mt-4 text-[0.875rem] leading-relaxed text-white/85">{p.long}</p>
      </Reveal>

      <div className="absolute bottom-[12%] left-1/2 aspect-[2/1] w-[clamp(18rem,44vw,40rem)] -translate-x-1/2">
        <div className="orbit-arch inset-0" />
        <div className="orbit-bob absolute bottom-[18%] left-1/2 aspect-[9/16] w-[22%] overflow-hidden rounded-[16px] border border-white/70 bg-white/15 shadow-[0_40px_50px_-20px_rgb(20_30_90/0.6),inset_0_1px_0_#fff] backdrop-blur-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.glassDepth} alt="" className="size-full object-cover opacity-80 mix-blend-screen" loading="lazy" />
        </div>
        <div className="absolute -bottom-[7%] left-1/2 h-[16%] w-[62%] -translate-x-1/2 rounded-[50%] border border-white/60 bg-[radial-gradient(ellipse_at_50%_30%,rgb(255_255_255/0.75),rgb(120_140_240/0.35)_70%)] shadow-[0_20px_40px_-12px_rgb(20_30_90/0.55)]" />
      </div>
    </section>
  );
}

/* ── 5 · Readout ──────────────────────────────────────────────────────────────
   The spec table as instrument panel: mono labels, the three columns lit in
   the three slit colours. */
function OrbitSpecs() {
  return (
    <section id="specifikationer" className="orbit-frame bg-orbit-shell px-[clamp(1.25rem,3vw,2.5rem)] py-[clamp(3rem,6vw,5rem)]">
      <Reveal>
        <p className="orbit-label text-orbit-ink-3">{SPECS.label}</p>
        <h2 className="orbit-display mt-4">{SPECS.headline}</h2>
      </Reveal>
      <Reveal delay={100} className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[42rem] border-collapse text-left">
          <thead>
            <tr>
              <th scope="col" className="orbit-label pb-4 pr-6 text-orbit-ink-3">Egenskab</th>
              {SPECS.columns.map((c, i) => (
                <th key={c} scope="col" className="orbit-h3 pb-4 pl-6" style={{ color: MODES[i].slit }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SPECS.rows.map((row) => (
              <tr key={row.label} className="border-t border-orbit-line">
                <th scope="row" className="orbit-label py-4 pr-6 font-normal text-orbit-ink-2">{row.label}</th>
                {row.values.map((v, i) => (
                  <td key={`${row.label}-${i}`} className="py-4 pl-6 font-[family-name:var(--font-plex-mono)] text-[0.875rem]">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
      <p className="orbit-label mt-6 normal-case tracking-normal text-orbit-ink-3">{SPECS.note}</p>
    </section>
  );
}

function OrbitCta() {
  return (
    <section
      id="kontakt"
      className="orbit-frame grid items-center gap-10 bg-[radial-gradient(ellipse_60%_80%_at_20%_50%,#1d2f33,#0c1213_70%)] px-[clamp(1.25rem,3vw,2.5rem)] pb-[clamp(5rem,8vw,7rem)] pt-[clamp(3rem,6vw,5rem)] md:grid-cols-[0.8fr_1fr]"
      style={{ '--notch': 'var(--color-orbit-void)', '--slit': MODES[0].slit } as CSSProperties}
    >
      <Reveal fade className="mx-auto w-[min(100%,20rem)]">
        <div className="orbit-orb w-full">
          <span className="orbit-slit left-[9%]" />
          <span className="orbit-slit right-[9%]" />
        </div>
      </Reveal>
      <Reveal delay={100}>
        <p className="orbit-label text-orbit-ink-3">{CTA.label}</p>
        <h2 className="orbit-display mt-4 max-w-[14ch]">{CTA.headline}</h2>
        <p className="orbit-body mt-5 max-w-[42ch] text-orbit-ink-2">{CTA.lead}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${BRAND.email}`} className="orbit-btn border-white bg-white text-black hover:bg-transparent hover:text-white">
            {CTA.primary}
            <Arrow />
          </a>
          <a href={BRAND.phoneHref} className="orbit-btn text-white/85 hover:bg-white hover:text-black">{CTA.secondary}</a>
        </div>
      </Reveal>
      <div className="orbit-notch h-11 px-6" data-edge="bottom">
        <a href={`mailto:${BRAND.email}`} className="orbit-label text-orbit-ink-2 hover:text-white">{BRAND.email}</a>
      </div>
    </section>
  );
}
