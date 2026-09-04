'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { LANGS, pick, type Lang, type Localized } from '@/content/types';

const STORAGE_KEY = 'sfd-lang';

type LanguageValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Resolve a Danish/English pair against the active language. */
  t: (value: Localized) => string;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always render Danish first so server and client markup agree; the stored
  // preference is applied after hydration.
  const [lang, setLangState] = useState<Lang>('da');

  useEffect(() => {
    // Read after the first paint: the server rendered Danish, and applying the
    // stored choice during hydration would mismatch it.
    const frame = requestAnimationFrame(() => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        // Private mode or blocked storage — Danish is a fine default.
      }
      if (stored && (LANGS as string[]).includes(stored)) {
        setLangState(stored as Lang);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not being able to remember the choice is not worth failing over.
    }
  }, []);

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, t: (v: Localized) => pick(v, lang) }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}

/** The common case: just translate. */
export function useT() {
  return useLanguage().t;
}
