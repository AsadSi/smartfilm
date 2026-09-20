'use client';

import { useEffect, useRef, useState } from 'react';
import { NAV_LEFT, NAV_RIGHT, SITE } from '@/content/site';

const LINKS = [...NAV_LEFT, ...NAV_RIGHT];

/**
 * The wordmark sits in the middle with the menu parted around it, two items
 * either side. It crosses two grounds — the dark hero, then paper — so it
 * carries no colour of its own: white over the footage, ink the moment the
 * page starts scrolling, and everything in it inherits that.
 */
export function Header() {
  const ref = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

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
     * 150, not something smaller: a jump from the menu parks the target's top
     * 196px down, because the sections carry scroll-margin-top and the page
     * carries scroll-padding-top and both apply. A shallower line marks the
     * section above the one you just asked for.
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

  return (
    <header ref={ref} className={`hdr${solid ? ' solid' : ''}`}>
      <div className="wrap">
        <nav className="nav nav-l" aria-label="Hovedmenu">{NAV_LEFT.map(item)}</nav>

        <a className="brand" href="#top">
          <b>{SITE.name}</b>
          <span>DANMARK</span>
        </a>

        {/* The button cannot live inside .nav: the nav is display:none below
            1080px and the one action in the header would go with it. */}
        <div className="hdr-r">
          <nav className="nav" aria-label="Genveje">{NAV_RIGHT.map(item)}</nav>
          <a className="btn btn-line" href="#tilbud">Få et tilbud</a>
        </div>
      </div>
    </header>
  );
}
