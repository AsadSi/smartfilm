'use client';

import { useEffect, useRef } from 'react';
import { STEPS } from '@/content/site';
import { Reveal } from './Reveal';

/**
 * Three steps with a dichroic thread drawing itself across them as you arrive.
 *
 * The gradient is declared in userSpaceOnUse: a horizontal line has a
 * zero-height bounding box, and an objectBoundingBox gradient will not render
 * against it at all.
 */
export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const line = useRef<SVGLineElement>(null);

  useEffect(() => {
    let queued = false;
    const draw = () => {
      const box = ref.current;
      const el = line.current;
      if (!box || !el) return;
      const r = box.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (r.height * 0.6)));
      el.style.strokeDashoffset = String(Math.round(1000 * (1 - p)));
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; draw(); });
    };

    draw();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', draw);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', draw);
    };
  }, []);

  return (
    <section className="section" id="saadan">
      <div className="wrap">
        <Reveal className="head">
          <p className="kicker">{STEPS.kicker}</p>
          <h2>{STEPS.headline}</h2>
          <hr className="edge" />
          <p className="lede">{STEPS.lede}</p>
        </Reveal>

        <Reveal className="steps">
          <div className="thread" aria-hidden="true" ref={ref}>
            <svg viewBox="0 0 1000 2" preserveAspectRatio="none">
              <defs>
                <linearGradient id="thread" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0">
                  <stop offset="0%" stopColor="var(--aqua)" />
                  <stop offset="50%" stopColor="var(--ice)" />
                  <stop offset="100%" stopColor="var(--rose)" />
                </linearGradient>
              </defs>
              <line
                ref={line}
                x1="0" y1="1" x2="1000" y2="1"
                stroke="url(#thread)" strokeWidth="2"
                strokeDasharray="1000" strokeDashoffset="1000" opacity=".85"
              />
            </svg>
          </div>

          {STEPS.items.map((s) => (
            <article className="step rise" key={s.n}>
              <div className="no">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
