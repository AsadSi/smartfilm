'use client';

import { useT } from './lang';
import { SubHeader } from './SubHeader';

/** The privacy policy as headed paragraphs at a reading measure. */
export function Privacy() {
  const { PRIVACY } = useT();

  return (
    <>
      <SubHeader title={PRIVACY.title} />

      <main id="main" tabIndex={-1} className="section legal">
        <div className="wrap">
          <p className="kicker">{PRIVACY.updated}</p>
          <h1>{PRIVACY.headline}</h1>
          <p className="lede">{PRIVACY.lede}</p>

          {PRIVACY.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              {s.body.map((p) => <p key={p}>{p}</p>)}
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
