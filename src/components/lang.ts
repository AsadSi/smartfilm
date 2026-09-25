import { useSyncExternalStore } from 'react';
import { EN } from '@/content/en';
import { DA, type Content } from '@/content/site';

/** Also read by the head script in layout.tsx. */
const KEY = 'sf-lang';

/**
 * <html lang> is the single source of truth: a head script sets it from
 * storage before the first paint, the switch writes it, and every component
 * reads it here. There is
 * nothing to keep in step, and the attribute a screen reader and the browser's
 * translate offer go by is always the one the page is actually in.
 *
 * The server always renders Danish, so a returning English reader has Danish
 * for the instant before hydration — under the body's own fade-in.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  return () => observer.disconnect();
}

export function useT(): Content {
  return useSyncExternalStore(subscribe, () => document.documentElement.lang, () => 'da') === 'en' ? EN : DA;
}

export function setLang(lang: string) {
  document.documentElement.lang = lang;
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    // Private mode. The switch still works for this visit.
  }
}
