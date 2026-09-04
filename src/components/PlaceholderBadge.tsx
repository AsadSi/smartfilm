/**
 * Marks content that is scaffolding rather than fact.
 *
 * The site needs case studies, certifications and full datasheets to be
 * credible, and inventing them would be worse than leaving them out. So the
 * structure ships and the facts follow — but never silently: this renders a
 * loud badge in development and nothing at all in production, and the build
 * check in `scripts/check-placeholders.mjs` fails if a placeholder is still
 * standing when the site is released.
 */
export default function PlaceholderBadge({ label }: { label?: string }) {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-[#b4802a] bg-[#fdf3e0] px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] whitespace-nowrap text-[#7a5312] uppercase"
      title="Placeholder content — needs real data from SmartFilm before launch"
    >
      <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-[#b4802a]" />
      {label ?? 'Afventer indhold'}
    </span>
  );
}
