'use client';

import { useEffect, useRef, useState } from 'react';
import { DEMO } from '@/content/site';
import { Reveal } from './Reveal';

const COLS = 24;
const ROWS = 9;
const N = COLS * ROWS;

/**
 * Hold the button and the film lights up, dot by dot, from the middle out.
 *
 * The value is a single 0-to-1 written to one CSS variable; every consequence
 * of it — which dots are lit, the word coming up through them, the fill
 * crossing the button, the three lines arriving one at a time — is a calc() in
 * the stylesheet. Releasing eases back rather than snapping, because the point
 * being made is that off is the ordinary state and on is the event.
 */
export function HoldToLight() {
  const [holding, setHolding] = useState(false);
  const [lit, setLit] = useState(0);
  // The animation restarts whenever the button is pressed or released, so the
  // level it had reached has to survive outside React's state.
  const level = useRef(0);

  useEffect(() => {
    let raf = 0;
    let last = 0;

    const tick = (now: number) => {
      const dt = Math.min(100, now - (last || now));
      last = now;
      level.current = Math.min(1, Math.max(0, level.current + (holding ? 0.00085 : -0.0014) * dt));
      setLit(level.current);
      const running = holding ? level.current < 1 : level.current > 0;
      if (running) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [holding]);

  useEffect(() => {
    // Release is listened for on the window, not the button: let go with the
    // pointer somewhere else and the film would stay on for ever.
    const up = () => setHolding(false);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, []);

  const style = { '--lit': lit.toFixed(3) } as React.CSSProperties;
  const label = lit >= 1 ? DEMO.lit : holding ? DEMO.holding : DEMO.hold;

  return (
    <section className="section demo" id="demo">
      <div className="wrap">
        {/* Copy, panel, control — the order a phone stacks them in, so the
            button sits right under the film it lights. A wide screen puts the
            panel back on the left and the copy and control beside it. */}
        <div className="demo-grid">
          <Reveal className="demo-copy">
            <p className="kicker">{DEMO.kicker}</p>
            <h2>{DEMO.headline}</h2>
            <hr className="edge" />
            <p className="lede">{DEMO.lede}</p>
          </Reveal>

          <Reveal className="panel" style={style}>
            <svg viewBox="0 0 480 200" aria-hidden="true">
              {DOTS.map((d, i) => (
                <circle
                  key={i}
                  cx={d.cx}
                  cy={d.cy}
                  r="2.6"
                  className="node"
                  style={{ '--i': i, '--n': N } as React.CSSProperties}
                />
              ))}
            </svg>
            <div className="glass" aria-hidden="true" />
            <div className="word" aria-hidden="true">{DEMO.word}</div>
          </Reveal>

          <Reveal className="demo-ctl" style={style}>
            <div className="holder">
              <button
                type="button"
                className="btn btn-line hold-btn"
                aria-describedby="hold-help"
                style={style}
                onPointerDown={(e) => { e.preventDefault(); setHolding(true); }}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setHolding(true); }
                }}
                onKeyUp={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') setHolding(false);
                }}
                onBlur={() => setHolding(false)}
              >
                <span className="fill" aria-hidden="true" />
                <span>{label}</span>
              </button>
              <p className="hint" id="hold-help" style={{ marginTop: 12 }}>{DEMO.hint}</p>
            </div>

            <ul className="reveal-list" style={style}>
              {DEMO.reveals.map((r) => (
                <li key={r.text} style={{ '--d': r.at } as React.CSSProperties}>
                  <i aria-hidden="true" />
                  <span>{r.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Lit from the centre outward, like a screen waking up. Computed once. */
const DOTS = (() => {
  const cx = (COLS - 1) / 2;
  const cy = (ROWS - 1) / 2;
  const grid: [number, number][] = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) grid.push([x, y]);
  grid.sort(
    (a, b) => Math.hypot(a[0] - cx, (a[1] - cy) * 1.7) - Math.hypot(b[0] - cx, (b[1] - cy) * 1.7),
  );
  return grid.map(([x, y]) => ({ cx: 16 + x * (448 / (COLS - 1)), cy: 16 + y * (168 / (ROWS - 1)) }));
})();
