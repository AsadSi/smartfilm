'use client';

import Image from 'next/image';
import Reveal from './Reveal';
import { useT } from './LanguageProvider';
import { HOME, OM_OS } from '@/content/pages';

const SHOTS = ['/assets/p1-poster.jpg', '/assets/p2-poster.jpg', '/assets/p3-poster.jpg'];

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
