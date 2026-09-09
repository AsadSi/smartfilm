import { V2_FEATURES } from '@/content/v2';
import { Reveal } from './primitives';

/**
 * The two principle bands.
 *
 * A 5/7 split rather than a half-and-half: an equal split makes the copy column
 * as loud as the photograph, and in this language the photograph is the
 * argument. The copy column is sticky, so the image can be tall enough to be
 * worth looking at without the text scrolling out from beside it.
 *
 * The second band mirrors the first. Alternating is the cheapest way to stop
 * two consecutive bands of the same construction from reading as a template —
 * which is exactly what they are.
 */
export default function V2Features() {
  return (
    <section id="teknologi" className="bg-fog">
      {V2_FEATURES.map((f, i) => (
        <div
          key={f.label}
          className={`v2-band v2-shell grid gap-x-[clamp(2rem,6vw,6rem)] gap-y-12 lg:grid-cols-12 ${
            i > 0 ? 'v2-rule' : ''
          }`}
        >
          <Reveal
            className={`lg:col-span-5 lg:self-start ${
              i % 2 ? 'lg:order-2 lg:col-start-8' : ''
            } lg:sticky lg:top-[calc(var(--v2-header-h)+clamp(3rem,8vh,6rem))]`}
          >
            <p className="v2-label v2-tick">{f.label}</p>
            <h2 className="v2-h2 mt-1">{f.headline}</h2>
            <p className="v2-lead mt-6 max-w-[46ch]">{f.body}</p>

            {/* A hairline list, not bullets. Rules are the only ornament this
                language allows itself, so they do the work a bullet would. */}
            <ul className="mt-10 max-w-[42ch]">
              {f.points.map((p) => (
                <li key={p} className="v2-rule flex gap-4 py-4 last:border-b last:border-hair">
                  <span className="v2-num-sm pt-0.5 text-[11px] tracking-[0.2em] text-signal-deep">
                    —
                  </span>
                  <span className="text-[0.9375rem] text-ink-2">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal fade className={`lg:col-span-7 ${i % 2 ? 'lg:order-1 lg:col-start-1' : ''}`}>
            <div className="v2-frame aspect-[4/5] w-full lg:aspect-[4/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.media.src}
                alt={f.media.alt}
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      ))}
    </section>
  );
}
