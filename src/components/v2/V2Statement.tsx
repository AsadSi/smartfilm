import { V2_STATEMENT } from '@/content/v2';
import { Reveal } from './primitives';

/**
 * The dark statement band.
 *
 * Every site in this reference set has exactly one of these and it always does
 * the same job: it is the pause between the product and the specification, and
 * it is the only band where the page is allowed to simply assert something.
 * So it holds one sentence set very large, and then the figures — because a
 * claim followed immediately by four numbers reads as a company, and a claim on
 * its own reads as a slogan.
 *
 * The figures sit in a four-up row divided by vertical hairlines rather than in
 * boxes. Boxes would make them a stats widget; rules make them a datasheet.
 *
 * The unit glyphs — the +, the t, the % — carry the champagne. It is the one
 * place the accent appears at any size, and it works here because warm metal
 * against a cold graphite ground is the whole point of the colour; on the white
 * bands the same champagne would just look like a highlighter.
 */
export default function V2Statement() {
  return (
    <section className="v2-band bg-graphite text-white">
      <div className="v2-shell">
        <Reveal>
          <p className="v2-label v2-label-light v2-tick v2-tick-light">{V2_STATEMENT.label}</p>
          <h2 className="v2-h2 mt-1">{V2_STATEMENT.headline}</h2>
        </Reveal>

        <Reveal delay={80} className="mt-8">
          <p className="v2-lead v2-lead-light max-w-[54ch]">{V2_STATEMENT.lead}</p>
        </Reveal>

        <Reveal delay={160}>
          <dl className="v2-rule-dark mt-[clamp(3.5rem,7vw,6rem)] grid grid-cols-2 lg:grid-cols-4">
            {V2_STATEMENT.figures.map((f) => (
              <div
                key={f.label}
                className="border-hair-dark px-0 py-8 max-lg:even:border-l max-lg:even:pl-6 max-lg:odd:pr-6 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <dd>
                  <span className="v2-num">{f.value}</span>
                  {f.unit ? (
                    <span className="v2-num-sm ml-1 text-2xl text-signal-light">{f.unit}</span>
                  ) : null}
                </dd>
                <dt className="mt-4 max-w-[20ch] text-[0.875rem] leading-snug text-ink-light-3">
                  {f.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
