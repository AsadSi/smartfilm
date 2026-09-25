'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useSyncExternalStore } from 'react';
import { useT } from './lang';

/** Also read by the head script in layout.tsx. */
const KEY = 'sf-theme';
const WHITE = '#F8F5F1';
const BLUE = '#070910';

/**
 * White is the page; blue is the one alternative. <html data-theme="blue"> is
 * the single source of truth, the way <html lang> is for the language: a head
 * script sets it from storage before the first paint, and every button reads
 * it here, so the header and the phone menu can never disagree.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

const read = () => (document.documentElement.getAttribute('data-theme') === 'blue' ? 'blue' : 'white');

function setTheme(theme: 'white' | 'blue') {
  if (theme === 'blue') document.documentElement.setAttribute('data-theme', 'blue');
  else document.documentElement.removeAttribute('data-theme');
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // Private mode. The switch still works for this visit.
  }
}

export function ThemeToggle({ withText = false }: { withText?: boolean }) {
  const { UI } = useT();
  const theme = useSyncExternalStore(subscribe, read, () => 'white' as const);
  const next = theme === 'blue' ? 'white' : 'blue';
  const label = next === 'blue' ? UI.theme.toBlue : UI.theme.toWhite;
  const Icon = next === 'blue' ? Moon : Sun;

  // The browser bar on a phone takes the page's ground.
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'blue' ? BLUE : WHITE);
  }, [theme]);

  return (
    <button
      type="button"
      className="hdr-link theme-btn"
      aria-label={withText ? undefined : label}
      title={withText ? undefined : label}
      onClick={() => setTheme(next)}
    >
      <Icon aria-hidden="true" size={14} strokeWidth={1.5} />
      {withText ? label : null}
    </button>
  );
}
