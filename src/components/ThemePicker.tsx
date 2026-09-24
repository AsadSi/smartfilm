'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { THEMES, type ThemeId } from '@/content/site';

const KEY = 'sf-theme';
const DEFAULT: ThemeId = 'dagslys';

/**
 * <html data-theme> is the single source of truth — the head script has
 * already set it from storage before the first paint, so reading it here
 * rather than keeping a second copy in state means the two can never
 * disagree, and there is nothing to reconcile after hydration.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

const read = () => (document.documentElement.getAttribute('data-theme') as ThemeId | null) ?? DEFAULT;

/**
 * DEMO ONLY — delete this component, its mount in the layout, the head script
 * and the `.picker` block in globals.css before launch.
 *
 * Deliberately does not match anything else on the page: a dark capsule,
 * rounded, floating clear of the layout. A client deciding between three
 * grounds has to be able to tell the switch apart from the thing it is
 * switching, or they end up judging the control.
 */
export function ThemePicker() {
  const theme = useSyncExternalStore(subscribe, read, () => DEFAULT);

  const choose = useCallback((id: ThemeId) => {
    document.documentElement.setAttribute('data-theme', id);
    // the browser chrome on a phone is part of the ground being judged
    const meta = document.querySelector('meta[name="theme-color"]');
    const value = getComputedStyle(document.documentElement).getPropertyValue('--theme-color').trim();
    if (meta && value) meta.setAttribute('content', value);
    try {
      localStorage.setItem(KEY, id);
    } catch {
      // Private mode, or storage disabled. The switch still works; it just
      // will not be remembered, and that is not worth telling anyone about.
    }
  }, []);

  return (
    <div className="picker" role="group" aria-label="Vis siden i en anden farveholdning">
      <b>Farveholdning</b>
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          aria-pressed={theme === t.id}
          onClick={() => choose(t.id)}
          style={{ '--sw-bg': t.bg, '--sw-fg': t.fg } as React.CSSProperties}
        >
          <i aria-hidden="true" />
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
