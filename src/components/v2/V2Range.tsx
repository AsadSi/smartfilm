import { V2_RANGE } from '@/content/v2';
import { Arrow, Loop, Reveal } from './primitives';

/**
 * The range.
 *
 * Three equal columns on desktop, a snap-scrolling rail on phones. It started
 * as a rail at every width — the configurator pattern — and that was wrong for
 * this range: Porsche's rail carries twelve models, and three cards of a fixed
 * width left 288px of a 1600px viewport empty on the right. A row that stops
 * short of the gutter does not read as "the range continues", it reads as a
 * band that failed to fill.
 *
 * What replaces it keeps the part that was doing the work — tall portrait
 * media, one figure per product, everything aligned across the three — and adds
 * what a rail cannot have: full-height hairlines between the columns. Rules
 * between columns are the oldest trick in German industrial layout, and they
 * are what stops three photographs from reading as three unrelated cards.
 *
 * Each column is one link. The image, the name and the arrow all point at the
 * same place, so three separate tab stops would just be three ways to do one
 * thing.
 */
export default function V2Range() {
  return (
    <section id="serien" className="v2-band bg-paper">
      <div className="v2-shell">
        {/* Headline left, standfirst right, aligned to each other's baseline
            rather than to the top of the band. The two used to sit in a
            justify-between flex row, which opened an arbitrary 334px hole
            between them at 1600 and closed it entirely at 1100. */}
        <Reveal className="grid gap-x-8 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="v2-label v2-tick">{V2_RANGE.label}</p>
            <h2 className="v2-h2 mt-1">{V2_RANGE.headline}</h2>
          </div>
          <p className="v2-lead lg:col-span-6 lg:col-start-7 lg:self-end">{V2_RANGE.lead}</p>
        </Reveal>
      </div>

      <ul className="v2-rail v2-range-grid mt-[clamp(2.5rem,5vw,4.5rem)]">
        {V2_RANGE.items.map((item, i) => (
          <Reveal as="li" key={item.name} delay={i * 80} className="v2-range-col">
            <a href={item.href} className="group flex h-full flex-col">
              {/* The index row. The number used to sit on the photograph in
                  white, which is unreadable the moment a product is shot
                  against a bright interior — and two of these three are. On a
                  rule above the media it is legible over every image, and it
                  gives the column the datasheet header the rest of the page
                  already has. It also takes the tagline out of the stack under
                  the media, which was six type sizes deep. */}
              <p className="v2-rule flex items-baseline justify-between gap-4 pb-4 pt-1">
                <span className="v2-label">{item.index}</span>
                <span className="v2-label text-right">{item.tagline}</span>
              </p>

              <div className="v2-frame aspect-[4/5] w-full">
                {item.media.video ? (
                  <Loop
                    video={item.media.video}
                    videoHevc={item.media.videoHevc}
                    poster={item.media.poster}
                    className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cold)] group-hover:scale-[1.03]"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.media.poster}
                    alt=""
                    className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cold)] group-hover:scale-[1.03]"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col pt-6">
                <h3 className="v2-h3">{item.name}</h3>
                <p className="v2-body mt-3 text-[0.9375rem]">{item.blurb}</p>

                {/* mt-auto inside a flex-1 column is what aligns the three
                    figures with each other however long the description above
                    them runs. Three headline numbers sitting at three different
                    heights is the fastest way to lose the engineered read. */}
                <div className="v2-rule mt-auto flex items-end justify-between gap-4 pt-6">
                  <span className="block">
                    <span className="v2-num text-[2.25rem]">{item.figure.value}</span>
                    {item.figure.unit ? (
                      <span className="v2-num-sm ml-0.5 text-xl text-ink-3">{item.figure.unit}</span>
                    ) : null}
                    <span className="v2-caption mt-2 block max-w-[20ch]">{item.figure.label}</span>
                  </span>
                  {/* Decorative: the column itself is the link, so this must not
                      become a second tab stop to the same destination. */}
                  <span className="v2-arrow shrink-0 pb-1 text-[0.875rem]">
                    Læs mere
                    <Arrow />
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
