import { V2_CTA } from '@/content/v2';
import { Arrow, Reveal } from './primitives';

/**
 * The closing ask.
 *
 * Full-bleed photography behind it rather than a flat colour, because this is
 * the last band before the footer and a flat dark band there merges with the
 * footer into one long block of nothing. The photograph gives the page an end.
 *
 * One primary action and one phone number. A closing band with four routes out
 * of it is a band that could not decide what it wanted the visitor to do.
 */
export default function V2Cta() {
  return (
    <section id="kontakt" className="relative isolate overflow-hidden bg-void text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/led-facade-night.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full object-cover opacity-45"
        loading="lazy"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-void via-void/80 to-void/30"
      />

      <div className="v2-shell v2-band">
        <Reveal>
          <p className="v2-label v2-label-light v2-tick v2-tick-light">{V2_CTA.label}</p>
          <h2 className="v2-display mt-1">{V2_CTA.headline}</h2>
        </Reveal>

        <Reveal delay={80} className="mt-8 max-w-[46ch]">
          <p className="v2-lead v2-lead-light">{V2_CTA.lead}</p>
        </Reveal>

        <Reveal delay={160} className="mt-10 flex flex-wrap gap-3">
          <a href="#kontakt" className="v2-btn v2-btn-solid-light">
            {V2_CTA.primary}
            <Arrow />
          </a>
          <a href={V2_CTA.secondaryHref} className="v2-btn v2-btn-line-light">
            {V2_CTA.secondary}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
