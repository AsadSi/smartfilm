'use client';

import { useEffect, useRef, useState } from 'react';
import { useT } from './lang';
import { Reveal } from './Reveal';

/**
 * The three steps, acted out on one shop window: measured, filmed from the
 * inside by a fitter with a squeegee, then lit from a phone.
 *
 * The list is the timeline. The active step's thread fills for as long as its
 * scene runs, and the end of that fill is what moves the page on — so pausing
 * the CSS (off screen, or body.paused) pauses the whole sequence with no timer
 * to keep in step. Under reduced motion nothing runs, nothing advances, and
 * each step shows a still of its scene when chosen.
 *
 * Every label in the picture is a number or a symbol, so it needs no
 * translation.
 */
export function Steps() {
  const { STEPS } = useT();
  const [step, setStep] = useState(0);
  const [play, setPlay] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPlay(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section how" id="saadan" data-play={play}>
      <div className="wrap">
        <Reveal className="head">
          <p className="kicker">{STEPS.kicker}</p>
          <h2>{STEPS.headline}</h2>
          <hr className="edge" />
          <p className="lede">{STEPS.lede}</p>
        </Reveal>

        <Reveal className="how-grid">
          <div className="how-stage" ref={stage} data-step={step} aria-hidden="true">
            <Shopfront />
          </div>

          <ol className="how-steps">
            {STEPS.items.map((s, i) => (
              <li key={s.n} className="how-step" data-state={i < step ? 'done' : i === step ? 'now' : 'next'}>
                <span className="no" aria-hidden="true">{s.n}</span>
                <span className="thread" aria-hidden="true">
                  <i onAnimationEnd={() => setStep((i + 1) % STEPS.items.length)} />
                </span>
                <h3>
                  <button type="button" aria-pressed={i === step} onClick={() => setStep(i)}>{s.title}</button>
                </h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * One drawing in a 400×300 box. The film and the lit content are HTML laid
 * over the glass, because a clip-path wipe and a dot mask are reliable on a
 * div and not inside an SVG; the frame is drawn again on top so it covers
 * their edges, the way a real frame covers the film's.
 */
function Shopfront() {
  return (
    <>
      <svg viewBox="0 0 400 300">
        <defs>
          <clipPath id="how-glass"><rect x="45" y="85" width="214" height="150" /></clipPath>
        </defs>
        <rect className="ground" x="0" y="268" width="400" height="32" />
        <rect className="wall" x="20" y="44" width="360" height="224" />
        <line className="hair" x1="20" y1="66" x2="380" y2="66" />
        <rect className="plate" x="150" y="50" width="100" height="10" rx="1" />
        <rect className="inside" x="45" y="85" width="214" height="150" />

        <g clipPath="url(#how-glass)">
          <g className="lamps">
            <path d="M112 85v15M204 85v11" />
            <path d="M104 106a8 6 0 0 1 16 0zM196 102a8 6 0 0 1 16 0z" />
          </g>

          {/* The fitter, inside the shop, seen through the glass. The arm is
              drawn before the body so its lower end slides behind the torso
              as the squeegee goes up and down. */}
          <g className="sc sc2">
            <g transform="translate(0 258)">
              <g className="walker">
                <g className="arm">
                  <rect className="fig" x="13" y="-150" width="7" height="56" rx="3.5" />
                  <rect className="fig" x="15" y="-156" width="3" height="8" />
                  <rect className="blade" x="0" y="-160" width="34" height="5" rx="2" />
                </g>
                <rect className="fig" x="-14" y="-116" width="28" height="62" rx="8" />
                <rect className="fig" x="-21" y="-112" width="7" height="46" rx="3.5" />
                <rect className="fig" x="-12" y="-60" width="10" height="60" rx="4" />
                <rect className="fig" x="2" y="-60" width="10" height="60" rx="4" />
                <circle className="fig" cx="0" cy="-128" r="8.5" />
                <path className="cap" d="M-9 -130a9 9 0 0 1 18 0zM-10.5 -130h21v3h-21z" />
              </g>
            </g>
          </g>
        </g>
      </svg>

      <div className="how-film sc sc-film" />

      <div className="how-led sc sc3">
        <div className="led-dots">
          <b className="led-a">−30%</b>
          <span className="led-b">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 3" />
            </svg>
            <b>10–18</b>
          </span>
          <span className="led-c" />
        </div>
      </div>

      <svg viewBox="0 0 400 300">
        <rect className="inside" x="290" y="86" width="60" height="140" />
        <g clipPath="url(#how-glass)">
          <path className="sheen" d="M96 85h22l-44 150H52zM132 85h7l-44 150h-7z" />
        </g>
        <path className="frame" fillRule="evenodd" d="M40 80h224v160H40zM45 85v150h214V85z" />
        <rect className="frame" x="36" y="240" width="232" height="5" />
        <path className="frame" fillRule="evenodd" d="M284 80h72v188h-72zM290 86v140h60V86z" />
        <rect className="handle" x="341" y="160" width="3" height="26" rx="1.5" />

        {/* 01 — the size, the glass, the sun */}
        <g className="sc sc1">
          <line className="m-tape" x1="63" y1="93" x2="250" y2="93" pathLength={1} />
          <line className="m-ticks" x1="66" y1="93" x2="250" y2="93" />
          <g className="m-case">
            <rect x="47" y="87" width="16" height="12" rx="2.5" />
            <circle cx="55" cy="93" r="2.6" />
          </g>
          <rect className="m-hook" x="250" y="88" width="3" height="10" rx="1" />
          <g className="m-lbl m-w"><text x="156" y="111" textAnchor="middle">2400 mm</text></g>

          <line className="m-dim" x1="58" y1="104" x2="58" y2="229" pathLength={1} />
          <g className="m-ends">
            <line x1="54" y1="104" x2="62" y2="104" />
            <line x1="54" y1="229" x2="62" y2="229" />
          </g>
          <g className="m-lbl m-h"><text transform="translate(72 166) rotate(-90)" textAnchor="middle">1800 mm</text></g>

          <g className="m-sun-x">
            <g className="m-sun-y">
              <circle className="sun" cx="356" cy="24" r="6.5" />
              <g className="rays">
                {Array.from({ length: 8 }, (_, k) => {
                  const a = (k * Math.PI) / 4;
                  return (
                    <line key={k}
                      x1={356 + Math.cos(a) * 10} y1={24 + Math.sin(a) * 10}
                      x2={356 + Math.cos(a) * 13.5} y2={24 + Math.sin(a) * 13.5} />
                  );
                })}
              </g>
            </g>
          </g>
          <g className="m-beams">
            <line x1="349" y1="31" x2="264" y2="98" />
            <line x1="343" y1="22" x2="264" y2="84" />
          </g>
          <g className="m-lbl m-s">
            <circle className="dial" cx="322" cy="22" r="7" />
            <path className="needle" d="M322 16l2.2 6h-4.4z" />
            <path className="needle south" d="M322 28l2.2-6h-4.4z" />
            <text x="309" y="25.5" textAnchor="middle">S</text>
          </g>
          <g className="m-lbl m-g">
            <rect className="chip-bg" x="192" y="211" width="60" height="17" rx="3" />
            <rect className="pane" x="198" y="214.5" width="2" height="10" />
            <rect className="pane" x="204" y="214.5" width="2" height="10" />
            <text x="211" y="223.2">4-16-4</text>
          </g>
        </g>

        {/* 03 — the phone that runs it */}
        <g className="sc sc3">
          <g className="p-rise">
            <g transform="translate(298 150) rotate(-4)">
              <rect className="p-body" width="78" height="170" rx="12" />
              <rect className="p-screen" x="4" y="4" width="70" height="162" rx="9" />
              <rect className="p-notch" x="29" y="9" width="20" height="5" rx="2.5" />
              <rect className="p-bar" x="11" y="24" width="30" height="3.5" rx="1.75" />
              <rect className="p-bar dim" x="11" y="31" width="20" height="2.5" rx="1.25" />
              {[42, 68, 94].map((y) => <rect key={y} className="p-row" x="9" y={y} width="60" height="22" rx="5" />)}
              <rect className="p-hi" x="9" y="42" width="60" height="22" rx="5" />
              <text className="p-txt" x="16" y="56">−30%</text>
              <circle className="p-ico" cx="19" cy="79" r="4" />
              <path className="p-ico" d="M19 76.6V79l1.8 1.3" />
              <text className="p-txt" x="27" y="82">10–18</text>
              <path className="p-play" d="M15 100.5l7 4.5-7 4.5z" />
              <path className="p-ico" d="M28 105h2M33 101v8M37 103v4M41 99.5v11M45 102v6" />
              {[53, 79, 105].map((y, k) => <circle key={y} className={`p-tap t${k + 1}`} cx="58" cy={y} r="7" />)}
            </g>
          </g>
        </g>
      </svg>
    </>
  );
}
