'use client';

import Image from 'next/image';
import Reveal from './Reveal';
import { useT } from './LanguageProvider';
import { ChevLink } from './ui';
import type { Localized } from '@/content/types';

type SplitFeatureProps = {
  eyebrow: Localized;
  title: Localized;
  em?: Localized;
  body: Localized;
  image: { src: string; alt: Localized };
  cta?: { href: string; label: Localized };
  /** Image on the right instead of the left. */
  reverse?: boolean;
  /** Sand ground, for when two of these sit back to back. */
  tinted?: boolean;
};

/** Photograph and prose, side by side. The picture carries the weight. */
export default function SplitFeature({
  eyebrow,
  title,
  em,
  body,
  image,
  cta,
  reverse = false,
  tinted = false,
}: SplitFeatureProps) {
  const t = useT();

  return (
    <section className={`band ${tinted ? 'bg-sand' : ''}`}>
      <div className="shell grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[1.1fr_1fr]">
        <Reveal className={reverse ? 'lg:order-2' : ''}>
          <div className="media-frame relative aspect-[4/3] w-full lg:aspect-[4/5]">
            <Image
              src={image.src}
              alt={t(image.alt)}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className={reverse ? 'lg:order-1' : ''}>
          <Reveal>
            <p className="eyebrow mb-5 block">{t(eyebrow)}</p>
            <h2 className="display-lg text-ink">
              {t(title)} {em ? <em className="display-em">{t(em)}</em> : null}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-7 max-w-[46ch] text-[1.02rem] leading-[1.75] text-mut-2">{t(body)}</p>
          </Reveal>
          {cta ? (
            <Reveal delay={200}>
              <div className="mt-8">
                <ChevLink href={cta.href}>{t(cta.label)}</ChevLink>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
