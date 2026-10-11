'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CountUp } from './CountUp';
import { useT } from './lang';
import { Reveal } from './Reveal';

/**
 * The second product, and the only thing on the page the reader operates
 * rather than reads. Built as a switch because the product is a switch — a
 * paragraph claiming "under a second" is weaker than a pane that does it.
 *
 * Two photographs from one camera position, the matte one fading over the
 * clear one, so only the glass changes and the frame stays sharp.
 *
 * Matte on arrival, because that is the product's resting state — no power,
 * no signal — and because it leaves the reader something to do.
 */
export function ClearOrMatte() {
  const { SMART_FILM: S, REFS } = useT();
  const [mat, setMat] = useState(true);

  return (
    <section className="section klar" id="klar" data-mat={mat ? 'true' : 'false'}>
      <div className="wrap">
        {/* Copy, picture, switch — stacked in that order on a phone, so the
            switch is on screen with the glass it frosts. */}
        <div className="klar-grid">
          <Reveal className="klar-copy">
            <p className="kicker">{S.kicker}</p>
            <h2>{S.headline}</h2>
            <hr className="edge" />
            <p className="lede">{S.lede}</p>
          </Reveal>

          <Reveal as="div" className="pane-shot">
            <span className="badge">{REFS.badge}</span>
            <Image src={S.images.klar} alt={mat ? S.alt.mat : S.alt.klar} width={1600} height={904} sizes="(min-width:940px) 52vw, 100vw" />
            <Image src={S.images.mat} alt="" aria-hidden="true" className="mat-shot" width={1600} height={904} sizes="(min-width:940px) 52vw, 100vw" />
          </Reveal>

          <Reveal className="klar-ctl">
            <div className="switcher">
              {/* aria-pressed carries the state so the name can stay put. A
                  control that renames itself every time you throw it is read
                  out as a different control each time. */}
              <button type="button" className="sw" aria-pressed={mat} onClick={() => setMat((v) => !v)}>
                <span className="lab lab-mat" aria-hidden="true">{S.states.mat}</span>
                <span className="track" aria-hidden="true"><span className="knob" /></span>
                <span className="lab lab-klar" aria-hidden="true">{S.states.klar}</span>
                <span className="sr">{S.action}</span>
              </button>
              <p className="readout" aria-live="polite">{mat ? S.readout.mat : S.readout.klar}</p>
            </div>

            <ul className="klar-figs">
              {S.figures.map((f) => (
                <li key={f.label}><b><CountUp value={f.value} /></b><span>{f.label}</span></li>
              ))}
            </ul>

            <p className="klar-note">{S.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
