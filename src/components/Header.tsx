'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { ChevronRight } from './ui';
import { PRODUCTS } from '@/content/products';
import { NAV, UI } from '@/content/site';
import { LANGS } from '@/content/types';

function Wordmark({ light }: { light: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span
        className={`text-[1.15rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        Smartfilm
      </span>
      <span className={`mt-[5px] mb-[3px] h-px w-full ${light ? 'bg-gold-light' : 'bg-gold'}`} />
      <span
        className={`text-[0.58rem] font-medium uppercase tracking-[0.38em] transition-colors duration-300 ${
          light ? 'text-gold-light' : 'text-gold'
        }`}
      >
        Danmark
      </span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  // Both disclosures are stored as the route they were opened on, so a
  // navigation closes them by definition rather than by an effect.
  const [sheetPath, setSheetPath] = useState<string | null>(null);
  const [panelPath, setPanelPath] = useState<string | null>(null);
  const sheetOpen = sheetPath === pathname;
  const panelOpen = panelPath === pathname;
  const setSheetOpen = useCallback(
    (open: boolean | ((v: boolean) => boolean)) => {
      setSheetPath((current) => {
        const next = typeof open === 'function' ? open(current === pathname) : open;
        return next ? pathname : null;
      });
    },
    [pathname],
  );
  const setPanelOpen = useCallback(
    (open: boolean | ((v: boolean) => boolean)) => {
      setPanelPath((current) => {
        const next = typeof open === 'function' ? open(current === pathname) : open;
        return next ? pathname : null;
      });
    },
    [pathname],
  );
  const panelItem = useRef<HTMLLIElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onProductPage = PRODUCTS.some((p) => pathname === `/${p.slug}`) || pathname === '/produkter';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // Restored scroll positions mean the page may already be scrolled on mount.
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('nav-open', sheetOpen);
    return () => document.documentElement.classList.remove('nav-open');
  }, [sheetOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setPanelOpen(false);
      setSheetOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setPanelOpen, setSheetOpen]);

  // Clicking anywhere outside the disclosure closes it.
  useEffect(() => {
    if (!panelOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!panelItem.current?.contains(e.target as Node)) setPanelOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [panelOpen, setPanelOpen]);

  const hoverOpen = useCallback((open: boolean) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setPanelOpen(open), open ? 110 : 220);
  }, [setPanelOpen]);

  // Over a dark hero the bar is transparent with white type; once the page
  // scrolls it becomes a translucent cream sheet with ink type.
  const light = !scrolled && !sheetOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-noir"
      >
        {t(UI.skipToContent)}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color,backdrop-filter] duration-500 ${
          light
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-line/70 bg-cream/80 backdrop-blur-xl backdrop-saturate-150'
        }`}
      >
        {/* A scrim only while the bar is over media: nav type on arbitrary video
            frames has unverifiable contrast otherwise. */}
        {light ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent"
          />
        ) : null}

        <div className="shell relative flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label="SmartFilm Danmark" className="shrink-0">
            <Wordmark light={light} />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primær navigation" className="hidden">
            <ul className="flex items-center gap-8">
              <li
                ref={panelItem}
                className="relative"
                onPointerEnter={() => hoverOpen(true)}
                onPointerLeave={() => hoverOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={panelOpen}
                  aria-controls="products-panel"
                  onClick={() => setPanelOpen((v) => !v)}
                  className={`flex items-center gap-1.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                    light ? 'text-white/90 hover:text-white' : 'text-ink/80 hover:text-ink'
                  } ${onProductPage ? (light ? '!text-gold-light' : '!text-gold-deep') : ''}`}
                >
                  {t(NAV[0].label)}
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`transition-transform duration-300 ${panelOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div
                  id="products-panel"
                  hidden={!panelOpen}
                  className="absolute -left-6 top-[calc(100%+0.9rem)] w-[420px] border border-line/80 bg-cream/95 p-2 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                >
                  <ul>
                    {PRODUCTS.map((product) => (
                      <li key={product.slug}>
                        <Link
                          href={`/${product.slug}`}
                          className="flex items-center gap-4 p-3 transition-colors duration-300 hover:bg-sand"
                        >
                          <span className="media-frame relative h-14 w-20 shrink-0">
                            <Image
                              src={product.media.poster}
                              alt=""
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="micro block text-gold-deep">{product.index}</span>
                            <span className="block text-[1.05rem] font-semibold text-ink">
                              {product.name}
                            </span>
                            <span className="block truncate text-[12.5px] text-mut">
                              {t(product.tagline)}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/produkter"
                    className="mt-1 flex items-center justify-between gap-2 border-t border-line/70 px-3 py-3 text-[13px] font-medium text-gold-deep"
                  >
                    {t(UI.allProducts)}
                    <ChevronRight />
                  </Link>
                </div>
              </li>

              {NAV.slice(1).map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                        light ? 'text-white/90 hover:text-white' : 'text-ink/80 hover:text-ink'
                      } ${active ? (light ? '!text-gold-light' : '!text-gold-deep') : ''}`}
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div
              role="group"
              aria-label="Sprog / Language"
              className={`hidden items-center gap-1 text-[12px] font-medium tracking-widest sm:flex ${
                light ? 'text-white/55' : 'text-mut'
              }`}
            >
              {LANGS.map((code, i) => (
                <span key={code} className="flex items-center gap-1">
                  {i > 0 ? <span aria-hidden="true" className="opacity-40">/</span> : null}
                  <button
                    type="button"
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                    className={`px-0.5 py-1 transition-colors duration-300 ${
                      lang === code
                        ? light
                          ? 'text-white'
                          : 'text-ink'
                        : 'hover:text-gold-deep'
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            <Link
              href="/kontakt"
              className={`btn !min-h-0 inline-flex !px-5 !py-2.5 !text-[12px] ${
                light ? 'btn-ghost-light hover:bg-white/10' : 'btn-ghost hover:border-ink'
              }`}
            >
              {t(UI.requestShort)}
            </Link>

            <button
              type="button"
              onClick={() => setSheetOpen((v) => !v)}
              aria-expanded={sheetOpen}
              aria-controls="nav-sheet"
              className={`-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[6px] ${
                light ? 'text-white' : 'text-ink'
              }`}
            >
              <span className="sr-only">{t(sheetOpen ? UI.closeMenu : UI.menu)}</span>
              <span
                aria-hidden="true"
                className={`block h-px w-6 bg-current transition-transform duration-300 ${
                  sheetOpen ? 'translate-y-[3.5px] rotate-45' : ''
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-px w-6 bg-current transition-transform duration-300 ${
                  sheetOpen ? '-translate-y-[3.5px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="nav-sheet"
        aria-hidden={!sheetOpen}
        className={`fixed inset-0 z-[99] flex flex-col overflow-y-auto bg-cream px-[var(--gutter)] pt-[calc(var(--header-h)+2rem)] pb-10 transition-opacity duration-300 ${
          sheetOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Mobilnavigation">
          <ul>
            <li className="border-b border-line/70 py-4">
              <p className="eyebrow mb-4">{t(UI.collection)}</p>
              <ul className="flex flex-col gap-3">
                {PRODUCTS.map((product) => (
                  <li key={product.slug}>
                    <Link href={`/${product.slug}`} className="flex items-center gap-4">
                      <span className="media-frame relative h-16 w-24 shrink-0">
                        <Image
                          src={product.media.poster}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </span>
                      <span>
                        <span className="block text-[1.4rem] font-semibold text-ink">
                          {product.name}
                        </span>
                        <span className="block text-[13px] text-mut">{t(product.tagline)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/produkter" className="chev mt-5 inline-flex">
                {t(UI.allProducts)}
                <ChevronRight />
              </Link>
            </li>
            {NAV.slice(1).map((item) => (
              <li key={item.href} className="border-b border-line/70">
                <Link
                  href={item.href}
                  className="font-display block py-5 text-[1.9rem] font-medium text-ink"
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex items-center justify-between pt-10">
          <div role="group" aria-label="Sprog / Language" className="flex items-center gap-2 text-sm">
            {LANGS.map((code, i) => (
              <span key={code} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true" className="text-line">/</span> : null}
                <button
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={lang === code ? 'font-medium text-ink' : 'text-mut'}
                >
                  {code.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
          <Link href="/kontakt" className="btn btn-gold">
            {t(UI.requestQuote)}
          </Link>
        </div>
      </div>
    </>
  );
}
