'use client';

import Image from 'next/image';
import { CountUp } from './CountUp';
import { useT } from './lang';
import { Reveal } from './Reveal';

/** The figures, on a photograph of the film at work — the page's one band. */
export function Specs() {
  const { SPECS } = useT();
  return (
    <section className="section band" id="specs">
      <Image className="band-bg" src={SPECS.image} alt="" fill sizes="100vw" />
      <div className="wrap">
        <Reveal className="head">
          <p className="kicker">{SPECS.kicker}</p>
          <h2>{SPECS.headline}</h2>
          <hr className="edge" />
          <p className="lede">{SPECS.lede}</p>
        </Reveal>

        <Reveal className="specs">
          {SPECS.items.map((s) => (
            <div className="spec" key={s.label}>
              <b><CountUp value={s.value} /></b>
              <span>{s.label}</span>
              <small>{s.note}</small>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Real <details>, so it works with the script blocked and the browser's own
 * find-in-page can open an answer. The summary is the control and carries the
 * styling itself: a button inside it takes the click for its own, and the
 * answer never opens.
 */
export function Faq() {
  const { FAQ } = useT();
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <Reveal className="head">
          <p className="kicker">{FAQ.kicker}</p>
          <h2>{FAQ.headline}</h2>
          <hr className="edge" />
          <p className="lede">{FAQ.lede}</p>
        </Reveal>

        <Reveal className="faq">
          {FAQ.items.map((item) => (
            <details className="qa" key={item.q}>
              <summary>
                {item.q}
                <span className="pm" aria-hidden="true" />
              </summary>
              <div className="a"><p>{item.a}</p></div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
