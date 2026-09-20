'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SMART_FILM as S } from '@/content/site';
import { Reveal } from './Reveal';

/**
 * The second product, and the only thing on the page the reader operates
 * rather than reads. Built as a switch because the product is a switch — a
 * paragraph claiming "under a second" is weaker than a pane that does it.
 *
 * The frost sits on the three panes, never on the photograph. Blurring the
 * whole picture would take the frame and the mullions with it, and a real
 * installation keeps those sharp: only the glass between them goes matte.
 *
 * Matte on arrival, because that is the product's resting state — no power,
 * no signal — and because it leaves the reader something to do.
 */
export function ClearOrMatte() {
  const [mat, setMat] = useState(true);

  return (
    <section className="section klar" id="klar" data-mat={mat ? 'true' : 'false'}>
      <div className="wrap">
        <div className="klar-grid">
          <Reveal as="div" className="pane-shot">
            <Image
              src={S.image}
              alt={mat ? S.alt.mat : S.alt.klar}
              width={943}
              height={621}
              sizes="(min-width:940px) 52vw, 100vw"
            />
            <div className="panes" aria-hidden="true">
              <i className="pane" />
              <i className="pane" />
              <i className="pane" />
            </div>
          </Reveal>

          <Reveal>
            <p className="kicker">{S.kicker}</p>
            <h2>{S.headline}</h2>
            <hr className="edge" />
            <p className="lede">{S.lede}</p>

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
                <li key={f.label}><b>{f.value}</b><span>{f.label}</span></li>
              ))}
            </ul>

            <p className="klar-note">{S.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
