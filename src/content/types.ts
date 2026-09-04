/**
 * Every user-facing string on the site is authored as a Danish/English pair.
 * The site is Danish-first: `da` is the source of truth, `en` the translation.
 */
export type Localized = { da: string; en: string };

export type Lang = 'da' | 'en';

export const LANGS: Lang[] = ['da', 'en'];

/** Pick one side of a localized pair. */
export function pick(value: Localized, lang: Lang): string {
  return value[lang] ?? value.da;
}

/** Shorthand so content files read as prose, not as object literals. */
export function L(da: string, en: string): Localized {
  return { da, en };
}

/**
 * Marks a record whose content is scaffolding, not fact.
 *
 * The site needs case studies, certifications and full datasheets to read as
 * credible, but inventing a client name or a fire rating would be worse than
 * having none. So the structure ships now and the facts land later: anything
 * still carrying `placeholder: true` renders a visible badge in development
 * and is asserted against at build time.
 */
export type Placeholder = {
  /** True until a real value has been supplied by SmartFilm. */
  placeholder?: boolean;
};

/** Every placeholder record in one list, so the content request writes itself. */
export function pendingContent<T extends Placeholder & { id?: string }>(
  records: T[],
): T[] {
  return records.filter((r) => r.placeholder);
}
