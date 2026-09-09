import { V2_FOOTER } from '@/content/v2';
import { Reveal } from './primitives';

/**
 * The footer.
 *
 * Dense and quiet: small type, wide tracking on the column headings, a hairline
 * between every zone and no colour at all. Everything the header refused to
 * carry — the utilities, the legal, the CVR — lands here, which is the trade
 * that lets the header be one word and a wordmark.
 *
 * The wordmark is repeated at display size across the bottom. It is the only
 * purely decorative element on the page and it earns its place by closing the
 * document the way the hero opened it.
 */
export default function V2Footer() {
  return (
    <footer className="bg-void text-white">
      <div className="v2-shell v2-band-tight">
        <Reveal className="grid gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          <p className="v2-lead v2-lead-light max-w-[30ch] text-[1.0625rem] lg:col-span-1">
            Arkitektonisk lysteknologi — smart film, transparent LED og 3D medieglas, målt og
            monteret i hele Danmark.
          </p>

          {V2_FOOTER.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="v2-label v2-label-light">{col.title}</h2>
              <ul className="mt-6 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.9375rem] text-ink-light-2 transition-colors duration-300 ease-[var(--ease-cold)] hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </Reveal>

        <div className="v2-rule-dark mt-[clamp(3rem,6vw,5rem)] flex flex-wrap items-center gap-x-8 gap-y-3 pt-6">
          {V2_FOOTER.legal.map((item) => (
            <span key={item} className="v2-caption v2-caption-light">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* The oversized wordmark. Clipped at the baseline so it reads as a
          watermark on the page rather than as a heading in the footer, and set
          in champagne at 9% — the warmth is barely nameable at that opacity,
          which is the only way an accent this large stays an accent. */}
      <div aria-hidden="true" className="v2-shell overflow-hidden pb-[clamp(1rem,2vw,2rem)]">
        <p className="translate-y-[0.12em] font-[family-name:var(--font-display)] text-[clamp(3rem,15vw,14rem)] font-medium uppercase leading-[0.8] tracking-[-0.02em] text-signal-light/[0.09]">
          SmartFilm
        </p>
      </div>
    </footer>
  );
}
