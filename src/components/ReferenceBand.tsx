'use client';

import Reveal from './Reveal';
import { useT } from './LanguageProvider';
import { ChevLink } from './ui';
import { HOME } from '@/content/pages';

/**
 * Reference footage with the claim over it.
 *
 * The source is 1280px wide. Run full-bleed it was being upscaled roughly 1.5×
 * on a desktop viewport, which is most of why it read as soft — so it sits in
 * the page container instead, rendering close to 1:1, with the margin doing the
 * work the bleed used to.
 */
export default function ReferenceBand({ withCaption = true }: { withCaption?: boolean }) {
  const t = useT();
  const { reference } = HOME;

  return (
    <section id="referencer" className="band-tight">
      <div className="shell">
        <div className="media-frame relative isolate overflow-hidden bg-noir">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/assets/ref-poster.jpg"
            width={1280}
            height={514}
            className="h-auto max-h-[74vh] w-full object-contain"
          >
            <source src="/assets/optimized/reference.h265.mp4" type='video/mp4; codecs=hvc1' />
            <source src="/assets/reference.mp4" type="video/mp4" />
          </video>

          {withCaption ? (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noir via-noir/60 to-transparent px-[clamp(1.5rem,4vw,3.5rem)] pt-[clamp(5rem,12vw,10rem)] pb-[clamp(1.75rem,4vw,3rem)]">
              <Reveal>
                <p className="eyebrow eyebrow-light mb-4 block">{t(reference.eyebrow)}</p>
                <h2 className="display-md max-w-[20ch] text-white">{t(reference.title)}</h2>
                <div className="mt-6">
                  <ChevLink href="/referencer" light>
                    {t(reference.cta)}
                  </ChevLink>
                </div>
              </Reveal>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
