'use client';

import { useEffect, useRef, useState } from 'react';
import { fit, quad, texture } from './gl';
import { useT } from './lang';
import { Reveal } from './Reveal';

const REDUCE = '(prefers-reduced-motion: reduce)';
/** How long each channel stays on before the next, and how long the change takes. */
const HOLD = 5000;
const SWITCH = 900;
/** Each channel is painted this size, then shown 96 LEDs across at any width. */
const W = 320;
const H = 180;

/**
 * The film playing, and changing what it plays: four channels on an LED
 * panel, one after another, and a list beside it to pick one.
 *
 * Each channel is painted live on a small 2D canvas and shown through WebGL
 * as round LEDs, so it is motion rather than a still, costs no video files,
 * and keeps the page's type. On a change every LED switches at its own moment
 * and flares as it does, the way a real panel changes over. Without WebGL the
 * 2D canvas is shown as it is; under reduced motion the channels hold still
 * and only change when picked.
 */
export function Channels() {
  const { DEMO } = useT();
  const [on, setOn] = useState(0);
  const canvas = useRef<HTMLCanvasElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const go = useRef<(i: number) => void>(() => {});
  const words = useRef(DEMO.channels);

  useEffect(() => {
    words.current = DEMO.channels;
  }, [DEMO]);

  useEffect(() => {
    const out = canvas.current;
    const bar = list.current;
    if (!out || !bar) return;

    const src = [0, 1].map(() => Object.assign(document.createElement('canvas'), { width: W, height: H }));
    const g = src.map((c) => c.getContext('2d')!);
    const led = panel(out);
    if (!led) {
      src[0].className = 'flat';
      out.after(src[0]);
    }
    const still = matchMedia(REDUCE).matches;
    const font = getComputedStyle(document.body).fontFamily;

    // a is on (or leaving), b is arriving; each with the time it started.
    let a = 0, aT = performance.now(), b = -1, bT = 0, raf = 0, stopped = 0;

    go.current = (i) => {
      if (i === (b < 0 ? a : b)) return;
      if (b >= 0) { a = b; aT = bT; }
      b = i;
      bT = performance.now();
      setOn(i);
    };

    const paint = (k: 0 | 1, ch: number, t: number) => {
      g[k].save();
      PAINT[ch](g[k], still ? 1.5 : t / 1000, words.current[ch].text, font);
      g[k].restore();
    };

    const frame = (now: number) => {
      let m = 0;
      if (b >= 0) {
        m = still ? 1 : (now - bT) / SWITCH;
        if (m >= 1) { a = b; aT = bT; b = -1; m = 0; }
      } else if (!still && now - aT > HOLD) {
        go.current((a + 1) % PAINT.length);
      }
      paint(0, a, now - aT);
      if (b >= 0) paint(1, b, now - bT);
      bar.style.setProperty('--p', still ? '0' : Math.min(1, (now - (b < 0 ? aT : bT)) / HOLD).toFixed(4));
      led?.(src[0], src[1], m);
      raf = requestAnimationFrame(frame);
    };

    // Runs only on screen, and the clock stops with it.
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (!e.isIntersecting) { stopped = performance.now(); return; }
      if (stopped) { const d = performance.now() - stopped; aT += d; bT += d; }
      raf = requestAnimationFrame(frame);
    });
    io.observe(out);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      if (!led) src[0].remove();
    };
  }, []);

  return (
    <section className="section demo" id="demo">
      <div className="wrap">
        {/* Copy, panel, list — the order a phone stacks them in, so the list
            sits right under the panel it changes. */}
        <div className="demo-grid">
          <Reveal className="demo-copy">
            <p className="kicker">{DEMO.kicker}</p>
            <h2>{DEMO.headline}</h2>
            <hr className="edge" />
            <p className="lede">{DEMO.lede}</p>
          </Reveal>

          <Reveal className="panel">
            <canvas ref={canvas} aria-hidden="true" />
            <div className="glass" aria-hidden="true" />
          </Reveal>

          <Reveal className="demo-ctl">
            <ol className="channels" ref={list} aria-label={DEMO.pick}>
              {DEMO.channels.map((c, i) => (
                <li key={c.name}>
                  <button type="button" aria-pressed={i === on} onClick={() => go.current(i)}>
                    <span className="ch-no">{String(i + 1).padStart(2, '0')}</span>
                    <span>{c.name}</span>
                    <i aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ol>

            <ul className="reveal-list">
              {DEMO.points.map((p) => (
                <li key={p}>
                  <i aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/*
 * Every LED takes the colour at its cell's centre. During a change each one
 * switches at a moment of its own (a hash of where it sits) and flares white
 * as it does; an LED showing black still shows faintly, as a real one does.
 */
const FRAG = `precision mediump float;
uniform sampler2D uA,uB;
uniform vec2 uRes;
uniform float uCell,uMix;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
  vec2 cell=floor(gl_FragCoord.xy/uCell);
  vec2 uv=(cell+.5)*uCell/uRes;
  float s=clamp((uMix-hash(cell)*.75)/.25,0.,1.);
  vec3 c=mix(texture2D(uA,uv).rgb,texture2D(uB,uv).rgb,step(.5,s))+sin(3.14159*s)*.5;
  float d=length(fract(gl_FragCoord.xy/uCell)-.5);
  gl_FragColor=vec4(max(c,vec3(.07))*smoothstep(.46,.3,d),1.);
}`;

function panel(canvas: HTMLCanvasElement) {
  const q = quad(canvas, FRAG, ['uA', 'uB', 'uRes', 'uCell', 'uMix']);
  if (!q) return null;
  const { gl, u } = q;
  gl.uniform1i(u.uA, 0);
  gl.uniform1i(u.uB, 1);
  const tex = [texture(gl), texture(gl)];
  const dpr = Math.min(devicePixelRatio, 2);

  return (a: HTMLCanvasElement, b: HTMLCanvasElement, mix: number) => {
    const [w, h] = fit(gl, canvas, dpr);
    [a, b].forEach((c, i) => {
      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, tex[i]);
      if (i === 0 || mix > 0) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, c);
    });
    gl.uniform2f(u.uRes, w, h);
    gl.uniform1f(u.uCell, w / 96);
    gl.uniform1f(u.uMix, mix);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
}

const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
const hash = (n: number) => { const s = Math.sin(n * 91.7) * 43758.5; return s - Math.floor(s); };

/** The largest bold face up to `size` px at which `text` fits in `max` px — the words differ by language. */
function bold(g: CanvasRenderingContext2D, text: string, size: number, max: number, font: string) {
  g.font = `800 ${size}px ${font}`;
  const w = g.measureText(text).width;
  if (w > max) g.font = `800 ${Math.floor((size * max) / w)}px ${font}`;
}

type Paint = (g: CanvasRenderingContext2D, t: number, word: string, font: string) => void;

/** The four channels, in the order of DEMO.channels. t is seconds since it came on. */
const PAINT: Paint[] = [
  // A campaign: the price lands on a moving magenta field.
  (g, t, word, font) => {
    const x = W * (0.5 + 0.35 * Math.sin(t * 0.8));
    const bg = g.createRadialGradient(x, H * 0.4, 10, x, H * 0.4, W * 0.75);
    bg.addColorStop(0, '#FF3D8B');
    bg.addColorStop(0.45, '#7A1FA2');
    bg.addColorStop(1, '#0A0314');
    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);
    g.fillStyle = '#fff';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    bold(g, '−30%', 84, W * 0.8, font);
    g.fillText('−30%', W / 2 + (1 - ease(t / 0.7)) * W, H * 0.4);
    g.globalAlpha = ease((t - 0.5) / 0.5);
    bold(g, word, 30, W * 0.86, font);
    g.fillText(word, W / 2, H * 0.8);
  },
  // A new collection: three dichroic ribbons, and the word.
  (g, t, word, font) => {
    g.fillStyle = '#02040A';
    g.fillRect(0, 0, W, H);
    const rib = g.createLinearGradient(0, 0, W, 0);
    rib.addColorStop(0, '#5FE0D8');
    rib.addColorStop(0.5, '#4D9FFF');
    rib.addColorStop(1, '#FF86C4');
    g.strokeStyle = rib;
    g.lineCap = 'round';
    g.globalCompositeOperation = 'lighter';
    g.globalAlpha = 0.8;
    for (let k = 0; k < 3; k++) {
      g.lineWidth = 16 - k * 4;
      g.beginPath();
      for (let px = -10; px <= W + 10; px += 8) {
        g.lineTo(px, H * (0.28 + 0.22 * k) + Math.sin(px * 0.025 + t * 1.6 + k * 1.7) * 26);
      }
      g.stroke();
    }
    g.globalCompositeOperation = 'source-over';
    g.globalAlpha = ease((t - 0.3) / 0.6);
    g.fillStyle = '#fff';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    bold(g, word, 44, W * 0.9, font);
    g.fillText(word, W / 2, H / 2);
  },
  // Opening hours: a clock that turns, and the hours beside it.
  (g, t, word, font) => {
    const bg = g.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#08224A');
    bg.addColorStop(1, '#010308');
    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);
    const cx = W * 0.2;
    const cy = H * 0.55;
    g.lineWidth = 6;
    g.lineCap = 'round';
    g.strokeStyle = '#4D9FFF';
    g.beginPath();
    g.arc(cx, cy, 40, 0, Math.PI * 2);
    g.stroke();
    g.strokeStyle = '#fff';
    const a = t * 1.4 - Math.PI / 2;
    g.beginPath();
    g.moveTo(cx + Math.cos(a) * 28, cy + Math.sin(a) * 28);
    g.lineTo(cx, cy);
    g.lineTo(cx + 18, cy);
    g.stroke();
    g.globalAlpha = ease(t / 0.6);
    g.textAlign = 'left';
    g.textBaseline = 'middle';
    g.fillStyle = '#4D9FFF';
    bold(g, word, 26, W * 0.56, font);
    g.fillText(word, W * 0.4, H * 0.28);
    g.fillStyle = '#fff';
    bold(g, '10–18', 60, W * 0.56, font);
    g.fillText('10–18', W * 0.39, H * 0.6);
  },
  // Video: warm light drifting up, nothing to read.
  (g, t) => {
    const bg = g.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#1C0830');
    bg.addColorStop(1, '#8A2A1A');
    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = 'lighter';
    for (let k = 0; k < 16; k++) {
      const x = (hash(k) * W + t * 10 * (hash(k + 9) - 0.5) + W) % W;
      const y = H + 40 - ((t * (14 + hash(k + 3) * 24) + hash(k + 5) * (H + 80)) % (H + 80));
      const r = 12 + hash(k + 7) * 28;
      const glow = g.createRadialGradient(x, y, 0, x, y, r);
      glow.addColorStop(0, 'rgba(255,196,120,.6)');
      glow.addColorStop(1, 'rgba(255,110,70,0)');
      g.fillStyle = glow;
      g.fillRect(x - r, y - r, r * 2, r * 2);
    }
  },
];
