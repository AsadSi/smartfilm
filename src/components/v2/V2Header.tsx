'use client';

import { useEffect, useState } from 'react';
import { V2_NAV } from '@/content/v2';
import { Arrow } from './primitives';

/**
 * The header.
 *
 * Three things are taken from the automotive reference and each of them is a
 * decision, not a detail:
 *
 *  · It starts transparent. The hero is a full-viewport film and a solid bar
 *    across the top of it would crop the shot; the header only acquires a
 *    ground once the film has scrolled away.
 *  · The wordmark is centred and the navigation is behind one "Menu" control.
 *    A row of five links across the top makes a site read as a catalogue. One
 *    word makes it read as a marque — and it means the nav can be a full-screen
 *    surface with room for the range rather than a dropdown.
 *  · It is 72px tall and holds nothing else. Every utility that would normally
 *    live up here — language, search, phone number — is in the footer.
 */
export default function V2Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 72px, i.e. the moment the header's own height has passed under it.
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The overlay is a scroll trap: locking the document keeps the page behind it
  // from moving under the fingers on a phone.
  useEffect(() => {
    document.documentElement.classList.toggle('v2-locked', open);
    return () => document.documentElement.classList.remove('v2-locked');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Over the hero the header is white-on-film; once it has a ground, or once
  // the overlay is up, it is black-on-white.
  const solid = scrolled || open;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
      >
        Gå til indhold
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 h-[var(--v2-header-h)] transition-[background-color,border-color,color] duration-500 ease-[var(--ease-cold)] ${
          solid
            ? 'border-b border-hair bg-paper text-ink'
            : 'border-b border-transparent text-white'
        }`}
      >
        <div className="v2-shell flex h-full items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="v2-menu"
            className="v2-label -ml-1 cursor-pointer px-1 py-2 text-current"
          >
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <span
                className={`block h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-cold)] ${
                  open ? 'translate-y-[3px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-cold)] ${
                  open ? '-translate-y-[3px] -rotate-45' : ''
                }`}
              />
            </span>
            {open ? 'Luk' : 'Menu'}
          </button>

          {/* The wordmark. Letter-spaced far wider than any other type on the
              page — it is the one place where tracking is doing branding rather
              than typesetting. */}
          <a
            href="#top"
            className="absolute left-1/2 -translate-x-1/2 font-[family-name:var(--font-display)] text-[0.9375rem] font-medium uppercase leading-none tracking-[0.34em]"
          >
            SmartFilm
          </a>

          <a
            href="#kontakt"
            className={`v2-btn h-10 px-5 text-sm max-sm:hidden ${
              solid ? 'v2-btn-line' : 'v2-btn-line-light'
            }`}
          >
            Forespørg
          </a>
        </div>
      </header>

      {/* The menu surface. Full-screen rather than a dropdown, so the range can
          be listed with its index numbers instead of compressed into a column
          of five identical links. */}
      <div
        id="v2-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-paper pt-[var(--v2-header-h)]"
      >
        <nav className="v2-shell flex h-full flex-col justify-between overflow-y-auto pb-12 pt-[clamp(2rem,6vh,4.5rem)]">
          <ul>
            {V2_NAV.map((item, i) => (
              <li key={item.href} className="v2-rule first:border-t-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-6 py-[clamp(0.75rem,2.4vh,1.5rem)]"
                >
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
            <p className="v2-label">Levering og montering i hele Danmark</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <a href="mailto:kontakt@smartfilmdanmark.dk" className="v2-arrow text-[0.875rem]">
                kontakt@smartfilmdanmark.dk
              </a>
              <a href="tel:+4528689050" className="v2-arrow text-[0.875rem]">
                +45 28 68 90 50
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
