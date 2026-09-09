'use client';

import Reveal from './Reveal';
import { useT } from './LanguageProvider';
import { ChevLink } from './ui';
import { HOME } from '@/content/pages';

/**
 * The LED loop: the collection's principle, shown moving.
 *
 * It sits in the page container rather than running full-bleed, for the same
 * reason as the reference band — the clip is 1280px wide, and bled across a
 * desktop viewport it would be upscaled and read as soft. Muted, looping and
 * `playsInline` so it starts on its own everywhere, including iOS, and carries
 * no sound to interrupt anyone.
 */
export default function LoopBand() {
  const t = useT();
  const { loop } = HOME;

  return (
    <section className="band-tight">
      <div className="shell">
        <Reveal>
          <div className="media-frame relative isolate overflow-hidden bg-noir">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={loop.poster}
              width={loop.width}
              height={loop.height}
              aria-label={t(loop.label)}
              className="h-auto max-h-[74vh] w-full object-contain"
            >
              <source src={loop.videoHevc} type='video/mp4; codecs=hvc1' />
              <source src={loop.video} type="video/mp4" />
            </video>

            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 bg-gradient-to-t from-noir/85 to-transparent px-[clamp(1.25rem,3vw,2.5rem)] pt-[clamp(3rem,8vw,6rem)] pb-[clamp(1rem,2.5vw,1.75rem)]">
              <div>
                <p className="eyebrow eyebrow-light mb-2 block">{t(loop.eyebrow)}</p>
                <p className="micro text-white/80">{t(loop.caption)}</p>
              </div>

              <ChevLink href="/led-film" light>
                {t(loop.cta)}
              </ChevLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
