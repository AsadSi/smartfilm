'use client';

import { useEffect, useState } from 'react';
import { BRAND, PANELS, SPECS } from '@/content/v2';
import { Arrow, Loop } from './primitives';

/**
 * TEMPLATE F · KLAR — the switch as the layout
 *
 * The five before it each borrow a structure from somewhere: a marque, a
 * catalogue, a boutique, a concourse, a SaaS landing page. This one is derived
 * from the product, which is the advice The Design Shelf actually gives about
 * galleries — take a structural idea, never a surface.
 *
 * The idea is the switch. Every panel arrives frosted and clears as it reaches
 * the viewport; the grounds alternate mat and klar the whole way down, so
 * scrolling is watching a pane change state over and over; and there is a real
 * MAT / KLAR control pinned to the index that frosts the entire page when you
 * throw it. That last one is the most persuasive control this particular
 * business could put on a website, and it costs one attribute.
 *
 * Navigation is by panel, not by scroll position — a numbered index down the
 * right edge that tracks and jumps. That is the other complete break: the other
 * five are documents you scroll, this is a sequence you step through.
 */
export default function TemplateKlar() {
  const [active, setActive] = useState(0);
  const [frosted, setFrosted] = useState(false);

  // Panel tracking runs off scroll position rather than IntersectionObserver.
  //
  // IO is the obvious tool and it was the first implementation, but it gives no
  // way to recover when it does not deliver — and a design whose text is
  // invisible until an observer fires has a failure mode that ends in a blank
  // page. A rAF-throttled rect measurement cannot silently not-happen: it runs
  // once on mount and then on every scroll, and if it never runs at all the CSS
  // above leaves the page clear and readable rather than frosted and empty.
  //
  // Seven panels is far too little geometry for this to cost anything.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-panel]'));
    if (!els.length) return;

    // Tells the stylesheet the enhancement is live. Nothing frosts until this
    // lands, which is what makes the no-JS and failed-hydration cases safe.
    const root = els[0].closest('.tpl-klar');
    root?.setAttribute('data-js', 'true');

    const measure = () => {
      let bestIndex = 0;
      let bestVisible = -1;

      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const visible = Math.max(0, Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0));
        // A third of a screen is enough to have arrived. Panels never re-frost
        // on the way out: a section that fogs up again as you scroll past it
        // reads as a rendering fault rather than as an effect.
        if (visible > window.innerHeight * 0.3) el.setAttribute('data-clear', 'true');
        if (visible > bestVisible) {
          bestVisible = visible;
          bestIndex = i;
        }
      });

      setActive(bestIndex);
    };

    // Called straight off the event rather than deferred into
    // requestAnimationFrame. rAF is the reflex for scroll work, but it only
    // runs while the page is actually being painted — in a backgrounded tab, or
    // any embedded viewer that is not compositing, the callback is simply never
    // invoked and every panel stays frosted with its copy at zero opacity.
    // Seven getBoundingClientRect reads cost microseconds and the browser
    // already coalesces scroll events to roughly one per frame, so the frame
    // budget this was protecting did not need protecting.
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    // A tab opened in the background finishes mounting while hidden; this
    // re-measures the moment it is actually looked at.
    document.addEventListener('visibilitychange', measure);
    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      document.removeEventListener('visibilitychange', measure);
    };
  }, []);

  // The index and the switch sit over whichever panel is behind them, so they
  // have to invert with it.
  const overMat = (PANELS[active]?.state ?? 'mat') === 'mat';

  return (
    <div className="tpl-klar bg-mat-bg" data-frosted={frosted}>
      <a
        href="#panel-0"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-white focus:px-4 focus:py-3 focus:text-klar-ink"
      >
        Gå til indhold
      </a>

      {/* Wordmark. Fixed, tiny, and the only chrome on the left — the index
          takes the right edge and nothing else competes with the panels. */}
      <span
        className={`fixed left-[var(--v2-gutter)] top-7 z-50 font-[family-name:var(--font-switzer)] text-[0.9375rem] font-semibold tracking-[-0.02em] transition-colors duration-700 ease-[var(--ease-cold)] ${
          overMat ? 'text-white' : 'text-klar-ink'
        }`}
      >
        {BRAND.name}
      </span>

      <PanelIndex active={active} overMat={overMat} frosted={frosted} onToggle={() => setFrosted((v) => !v)} />

      <main id="main">
        {PANELS.map((p, i) => {
          const mat = p.state === 'mat';
          return (
            <section
              key={p.id}
              id={`panel-${i}`}
              data-panel={i}
              className={`klar-panel ${mat ? 'bg-mat-bg text-white' : 'bg-klar-bg text-klar-ink'}`}
            >
              {p.media.kind === 'video' ? (
                <Loop
                  video={p.media.src}
                  videoHevc={p.media.hevc}
                  poster={p.media.poster}
                  className="klar-media"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.media.src} alt={p.media.alt} className="klar-media" loading={i < 2 ? 'eager' : 'lazy'} />
              )}

              {/* The scrim is the ground's own colour at high opacity rather
                  than black, so a klar panel stays genuinely light — a black
                  scrim on every panel would flatten the alternation the whole
                  template is built on. */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 ${
                  mat
                    ? 'bg-gradient-to-r from-mat-bg via-mat-bg/85 to-mat-bg/35'
                    : 'bg-gradient-to-r from-klar-bg via-klar-bg/88 to-klar-bg/40'
                }`}
              />

              <div className="klar-copy v2-shell relative w-full">
                <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <p className={`klar-label ${mat ? 'text-signal-light' : 'text-gold-ink'}`}>
                      {p.n} — {p.label}
                    </p>
                    <h2 className="klar-display mt-7">{p.headline}</h2>
                    <p className={`klar-body mt-7 max-w-[46ch] ${mat ? 'text-mat-ink-2' : 'text-klar-ink-2'}`}>
                      {p.body}
                    </p>

                    <a
                      href={p.cta.href}
                      className={`klar-btn mt-9 ${
                        mat ? 'text-white hover:bg-white hover:text-mat-bg' : 'text-klar-ink hover:bg-klar-ink hover:text-klar-bg'
                      }`}
                    >
                      {p.cta.label}
                      <Arrow />
                    </a>
                  </div>

                  {'figure' in p && p.figure ? (
                    <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
                      <p className="font-[family-name:var(--font-switzer)] font-semibold leading-none tracking-[-0.05em]">
                        <span className="text-[clamp(3rem,7vw,5.5rem)]">{p.figure.value}</span>
                        <span className={`text-[clamp(1.25rem,2.4vw,2rem)] ${mat ? 'text-signal-light' : 'text-gold-ink'}`}>
                          {p.figure.unit}
                        </span>
                      </p>
                      <p className={`klar-label mt-5 max-w-[20ch] leading-[1.7] ${mat ? 'text-mat-ink-2' : 'text-klar-ink-2'}`}>
                        {p.figure.label}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          );
        })}

        <KlarSpecs index={PANELS.length} />
      </main>

      <footer className="border-t border-mat-line bg-mat-bg py-10">
        <div className="v2-shell flex flex-wrap items-center justify-between gap-x-10 gap-y-3">
          <span className="klar-label text-mat-ink-2">{BRAND.area}</span>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <a href={`mailto:${BRAND.email}`} className="klar-label text-white/80 hover:text-white">{BRAND.email}</a>
            <a href={BRAND.phoneHref} className="klar-label text-white/80 hover:text-white">{BRAND.phone}</a>
            <span className="klar-label text-mat-ink-2">© 2026 {BRAND.full}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── The index ──────────────────────────────────────────────────────────────
   Fixed to the right edge: a numbered list of panels with the current one
   marked by a rule that grows, and the MAT / KLAR switch underneath it. On
   phones the list collapses to dots, because seven labels down the side of a
   375px screen is a second column of text competing with the first. */
function PanelIndex({
  active,
  overMat,
  frosted,
  onToggle,
}: {
  active: number;
  overMat: boolean;
  frosted: boolean;
  onToggle: () => void;
}) {
  const entries = [...PANELS.map((p) => ({ n: p.n, label: p.label })), { n: '05', label: 'Data' }];

  return (
    <nav
      aria-label="Sektioner"
      className={`fixed right-[var(--v2-gutter)] top-1/2 z-50 -translate-y-1/2 transition-colors duration-700 ease-[var(--ease-cold)] ${
        overMat ? 'text-white' : 'text-klar-ink'
      }`}
    >
      <ol className="flex flex-col items-end gap-3">
        {entries.map((e, i) => (
          <li key={e.n}>
            <a
              href={`#panel-${i}`}
              aria-current={i === active ? 'true' : undefined}
              className="group flex items-center justify-end gap-3"
            >
              <span
                className={`klar-label hidden transition-opacity duration-500 md:inline ${
                  i === active ? 'opacity-100' : 'opacity-35 group-hover:opacity-70'
                }`}
              >
                {e.label}
              </span>
              <span
                aria-hidden="true"
                className={`block h-px bg-current transition-all duration-700 ease-[var(--ease-cold)] ${
                  i === active ? 'w-8 opacity-100' : 'w-3 opacity-35 group-hover:w-5'
                }`}
              />
              <span className="sr-only">
                {e.n} {e.label}
              </span>
            </a>
          </li>
        ))}
      </ol>

      {/* The switch. It is the product, so it is built as an actual switch —
          a track with a knob that slides — rather than as a button that says
          "toggle blur". */}
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={frosted}
        className="mt-9 flex w-full flex-col items-end gap-2"
      >
        <span className="klar-label opacity-45">{frosted ? 'Mat' : 'Klar'}</span>
        <span
          aria-hidden="true"
          className={`flex h-6 w-11 items-center rounded-full border border-current p-[3px] transition-colors duration-500 ${
            frosted ? 'justify-start' : 'justify-end'
          }`}
        >
          <span className="block size-3.5 rounded-full bg-current transition-transform duration-500 ease-[var(--ease-cold)]" />
        </span>
        <span className="sr-only">{frosted ? 'Gør glasset klart' : 'Mattér glasset'}</span>
      </button>
    </nav>
  );
}

/* ── Data ───────────────────────────────────────────────────────────────────
   The one panel allowed to be taller than the viewport. It snaps at its top and
   then scrolls normally, which is why the whole page uses proximity snapping
   rather than mandatory — under mandatory this section's last rows become
   genuinely awkward to reach. */
function KlarSpecs({ index }: { index: number }) {
  return (
    <section
      id={`panel-${index}`}
      data-panel={index}
      className="klar-panel items-start bg-klar-bg py-[clamp(5rem,10vw,9rem)] text-klar-ink"
    >
      <div className="klar-copy v2-shell relative w-full">
        <p className="klar-label text-gold-ink">05 — Data</p>
        <h2 className="klar-h2 mt-6">{SPECS.headline}</h2>
        <p className="klar-body mt-5 max-w-[48ch] text-klar-ink-2">{SPECS.lead}</p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-klar-ink">
                <th scope="col" className="klar-label sticky left-0 z-10 bg-klar-bg py-4 pr-6 align-bottom text-klar-ink-2">
                  Egenskab
                </th>
                {SPECS.columns.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className="py-4 pl-6 align-bottom font-[family-name:var(--font-switzer)] text-[1.0625rem] font-semibold tracking-[-0.02em]"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPECS.rows.map((row) => (
                <tr key={row.label} className="border-b border-klar-line">
                  <th scope="row" className="sticky left-0 z-10 bg-klar-bg py-4 pr-6 text-[0.9375rem] font-normal text-klar-ink-2">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={`${row.label}-${SPECS.columns[i]}`} className="v2-num-sm py-4 pl-6 text-[1.0625rem]">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="klar-label mt-7 max-w-[64ch] normal-case leading-[1.8] tracking-normal text-klar-ink-2">
          {SPECS.note}
        </p>
      </div>
    </section>
  );
}
