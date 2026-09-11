'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * In-page links scroll without writing a #fragment into the address bar.
 *
 * Every template navigates by `href="#section"`, which keeps the links working
 * with JavaScript off. With it on, a same-page click is intercepted and
 * scrolled to instead, and a hash that arrives on load — a shared link — is
 * scrolled to once and then removed from the URL.
 */
export default function AnchorScroll() {
  const router = useRouter();

  useEffect(() => {
    const behavior = (): ScrollBehavior =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

    const go = (id: string, smooth: boolean) => {
      const el = document.getElementById(id);
      if (!el) return false;
      // 'instant', not 'auto': the stylesheet sets scroll-behavior: smooth on
      // <html>, and 'auto' defers to it.
      el.scrollIntoView({ behavior: smooth ? behavior() : 'instant', block: 'start' });
      // Move focus with the scroll, so keyboard and screen-reader users land
      // where sighted users do — the skip link depends on it.
      if (!el.matches('a, button, input, select, textarea, [tabindex]')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
      return true;
    };

    // The hash is removed through the router rather than history.replaceState:
    // the router keeps its own copy of the URL and writes it back into history
    // whenever it next syncs, so a hash stripped behind its back reappears.
    // The scroll is deferred a task because the router's mount effects also
    // reset the scroll position, and a timeout rather than rAF because rAF
    // never fires in a tab opened in the background.
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      router.replace(window.location.pathname + window.location.search, { scroll: false });
      timer = setTimeout(() => go(id, false), 0);
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!link) return;
      const id = decodeURIComponent((link.getAttribute('href') ?? '').slice(1));
      if (!id) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: behavior() });
        return;
      }
      if (go(id, true)) e.preventDefault();
    };

    document.addEventListener('click', onClick);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', onClick);
    };
  }, [router]);

  return null;
}
