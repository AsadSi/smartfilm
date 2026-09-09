import { V2_SPECS } from '@/content/v2';
import { Reveal } from './primitives';

/**
 * The comparison table.
 *
 * This is the band that decides whether the site reads as engineering or as
 * marketing, and almost all of the work is typographic: tabular figures, one
 * hairline per row, no zebra striping, no borders around the outside, and units
 * kept in the cell with the number rather than promoted to a column header.
 *
 * On narrow screens it scrolls sideways inside its own container with the
 * label column pinned. Stacking a comparison table into three separate lists is
 * the standard responsive answer and it destroys the one thing the table is
 * for, which is reading across.
 */
export default function V2Specs() {
  return (
    <section id="specifikationer" className="v2-band bg-paper">
      <div className="v2-shell">
        <Reveal>
          <p className="v2-label v2-tick">{V2_SPECS.label}</p>
          <h2 className="v2-h2 mt-1">{V2_SPECS.headline}</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="v2-lead mt-6 max-w-[48ch]">{V2_SPECS.lead}</p>
        </Reveal>

        <Reveal delay={160} className="mt-[clamp(2.5rem,5vw,4rem)] overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="v2-rule border-b border-ink">
                <th
                  scope="col"
                  className="v2-label sticky left-0 z-10 bg-paper py-5 pr-6 align-bottom"
                >
                  Egenskab
                </th>
                {V2_SPECS.columns.map((c) => (
                  <th key={c} scope="col" className="v2-h4 py-5 pl-6 align-bottom">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {V2_SPECS.rows.map((row) => (
                <tr key={row.label} className="border-b border-hair">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-paper py-5 pr-6 text-[0.9375rem] font-normal text-ink-3"
                  >
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td
                      key={`${row.label}-${V2_SPECS.columns[i]}`}
                      className="v2-num-sm py-5 pl-6 text-[1.0625rem]"
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={200}>
          <p className="v2-caption mt-6 max-w-[62ch]">
            Vejledende værdier. Endelige specifikationer afhænger af glastype, størrelse og
            montageforhold.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
