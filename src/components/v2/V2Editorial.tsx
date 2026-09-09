import { V2_EDITORIAL } from '@/content/v2';
import { Reveal } from './primitives';

/**
 * The reference gallery.
 *
 * Asymmetric on purpose: the first image is wide and the three that follow are
 * portrait, which is what stops the band from reading as a four-up grid of
 * stock photography. The caption sits *under* the image on a hairline rather
 * than overlaid on it — an overlaid caption is the one thing that consistently
 * makes an installation photograph look like a case-study template.
 *
 * Nothing here is a link. These are proof, not navigation, and giving each one
 * a hover state would promise a case study that does not exist yet.
 */
export default function V2Editorial() {
  const [lead, ...rest] = V2_EDITORIAL.items;

  return (
    <section id="referencer" className="v2-band bg-fog">
      <div className="v2-shell">
        <Reveal>
          <p className="v2-label v2-tick">{V2_EDITORIAL.label}</p>
          <h2 className="v2-h2 mt-1">{V2_EDITORIAL.headline}</h2>
        </Reveal>

        <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-x-6 gap-y-12 md:grid-cols-3">
          <Reveal fade className="md:col-span-3">
            <figure>
              <div className="v2-frame aspect-[16/7] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lead.src}
                  alt={lead.alt}
                  className="size-full object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="v2-rule mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 pt-4">
                <span className="v2-h4">{lead.title}</span>
                <span className="v2-label">{lead.meta}</span>
              </figcaption>
            </figure>
          </Reveal>

          {rest.map((item, i) => (
            <Reveal fade key={item.title} delay={i * 80}>
              <figure>
                <div className="v2-frame aspect-[3/4] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="v2-rule mt-5 pt-4">
                  <span className="v2-h4 block">{item.title}</span>
                  <span className="v2-label mt-2 block">{item.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
