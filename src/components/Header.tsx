'use client';

import { Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DA, SITE } from '@/content/site';
import { setLang, useT } from './lang';
import { ThemeToggle } from './ThemeToggle';

// Only the hrefs are read, and they are the same in both languages.
const LINKS = [...DA.NAV_LEFT, ...DA.NAV_RIGHT];

/**
 * The wordmark sits in the middle with the menu parted around it, two items
 * either side. It crosses two grounds — the dark hero, then paper — so it
 * carries no colour of its own: white over the footage, ink the moment the
 * page starts scrolling, and everything in it inherits that.
 *
 * Under 1080 the parted menu has no room, so the left column becomes a Menu
 * button that drops the full list under the header, and on a phone the right
 * column is a call link — the one action that is a thumb away on a phone.
 *
 * The language switch leads the left column at every width. The left side is
 * the lighter one — the right carries the button — so it costs the measured
 * breakpoint nothing.
 */
export function Header() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    document.title = t.UI.title;
  }, [t]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  /**
   * Every in-page link on the page scrolls without writing a #fragment to the
   * address bar. The hrefs stay real, so they still work with scripting off,
   * and a fragment that arrives in a shared link is scrolled to by the browser
   * and then taken off the URL.
   */
  useEffect(() => {
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest('a[href^="#"]');
      const target = a && document.getElementById(a.getAttribute('href')!.slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView();
      target.focus({ preventScroll: true });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const hdr = ref.current;
    if (!hdr) return;

    let queued = false;

    /**
     * Pick the linked section whose top has most recently passed under the
     * header. Deliberately not an observer per section: these sections are
     * wildly different heights, and an observer leaves two lit at once
     * whenever a short one sits inside the viewport with its neighbour.
     *
     * 150 below the header: a jump from the menu parks the target's top 98px
     * down (the page's scroll-padding-top), well inside the line, so the menu
     * marks the section you asked for rather than the one above it.
     */
    const mark = () => {
      const line = window.scrollY + hdr.offsetHeight + 150;
      let best: string | null = null;
      let bestTop = -1;

      for (const link of LINKS) {
        const el = document.querySelector(link.href);
        if (!(el instanceof HTMLElement)) continue;
        if (el.offsetTop <= line && el.offsetTop > bestTop) {
          bestTop = el.offsetTop;
          best = link.href;
        }
      }

      // Inside the form nothing in the menu is where you are — the button is.
      const cta = document.getElementById('tilbud');
      if (cta && cta.offsetTop <= line) best = null;

      setCurrent(best);
    };

    const onScroll = () => {
      setSolid(window.scrollY > 40);
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        mark();
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', mark);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', mark);
    };
  }, []);

  const item = (link: { href: string; label: string }) => (
    <a key={link.href} href={link.href} aria-current={current === link.href ? 'true' : undefined}>
      {link.label}
    </a>
  );

  const close = () => setOpen(false);

  return (
    <header ref={ref} className={`hdr${solid || open ? ' solid' : ''}`}>
      <a className="skip" href="#main">{t.UI.skip}</a>

      <div className="wrap">
        <div className="hdr-l">
          <button
            type="button"
            className="hdr-link menu-btn"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t.UI.close : t.UI.menu}
          </button>
          {/* Named in the language it switches to, and marked as such, so a
              screen reader says "Read in English" in English. */}
          <button type="button" className="hdr-link lang-btn" lang={t.UI.switchTo.lang} onClick={() => setLang(t.UI.switchTo.lang)}>
            <Globe aria-hidden="true" size={14} strokeWidth={1.5} />
            {t.UI.switchTo.code}
            <span className="sr"> · {t.UI.switchTo.label}</span>
          </button>
          <ThemeToggle />
          <nav className="nav nav-l" aria-label={t.UI.mainNav}>{t.NAV_LEFT.map(item)}</nav>
        </div>

        <a className="brand" href="#top">
          <b>{SITE.name}</b>
          <span>DANMARK</span>
        </a>

        {/* The button cannot live inside .nav: the nav is display:none below
            1080px and the one action in the header would go with it. */}
        <div className="hdr-r">
          <nav className="nav" aria-label={t.UI.shortcuts}>{t.NAV_RIGHT.map(item)}</nav>
          <a className="btn btn-line" href="#tilbud">{t.UI.cta}</a>
          <a className="hdr-link hdr-call" href={SITE.phoneHref}>{t.UI.call}</a>
        </div>
      </div>

      <nav id="menu" className="menu" aria-label={t.UI.menu} hidden={!open}>
        {t.FOOTER.columns[0].links.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
        ))}
        <ThemeToggle withText />
        <a className="btn btn-primary" href="#tilbud" onClick={close}>{t.UI.cta}</a>
        <a className="menu-tel" href={SITE.phoneHref}>{SITE.phone}</a>
      </nav>
    </header>
  );
}
