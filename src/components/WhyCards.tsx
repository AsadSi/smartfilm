'use client';

import Image from 'next/image';
import Reveal from './Reveal';
import { useT } from './LanguageProvider';
import { HOME, OM_OS } from '@/content/pages';

/**
 * These were frame-grabs off the product videos (p1/p2/p3-poster.jpg) — soft,
 * low-bitrate, and in p3's case still showing a "FILMBASE" sponsor sign baked
 * into the shot, the same rights concern already flagged in
 * CONTENT-REQUEST.md. Swapped for installation renders; the low-res frame grabs
 * still do their real job as video posters on the product pages, only their use
 * as standalone photography here changes.
 *
 * Two of the three were also running in the reference band above, so the page
 * showed each of them twice within a couple of screens. These three are now
 * unique to this band, and deliberately unalike: an interior LED wall, a
 * daylight facade, and a hospitality interior. Only the first carries the model
 * creative that recurs elsewhere on the page, and it is a screen away from the
 * others that do.
 */
const SHOTS = ['/assets/led-lounge.jpg', '/assets/gallery-1.jpg', '/assets/gallery-3.jpg'];

/**
 * Vitrocsa's "Why Vitrocsa": a heading and one paragraph of intro, centred and
 * narrow, then the three reasons as equal cards. The old split-feature layout —
 * one big photograph beside one column of prose — is gone; the reference makes
 * this argument three times at the same size rather than once at full width.
 */
export default function WhyCards() {
  const t = useT();

  return (
    <section id="hvorfor" className="band">
      <div className="shell">
        <Reveal>
          <div className="mx-auto max-w-[52rem] text-center">
            <p className="eyebrow mb-5 block">{t(OM_OS.statement.eyebrow)}</p>
            <h2 className="display-lg text-ink">{t(OM_OS.statement.title)}</h2>
            <p className="lead mx-auto mt-6 max-w-[62ch]">{t(HOME.partner.body)}</p>
          </div>
        </Reveal>

        <div className="mt-[clamp(3rem,6vw,4.5rem)] grid gap-x-6 gap-y-12 md:grid-cols-3">
          {OM_OS.statement.points.map((point, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="flex h-full flex-col">
                <span className="media-frame relative block aspect-[3/2] overflow-hidden bg-noir-2">
                  <Image
                    src={SHOTS[i % SHOTS.length]}
                    alt={t(point.title)}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </span>

                <span className="flex flex-1 flex-col pt-7">
                  <span className="display-sm text-ink">{t(point.title)}</span>
                  <span className="mt-4 block text-[15px] leading-relaxed text-mut-2">
                    {t(point.body)}
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
