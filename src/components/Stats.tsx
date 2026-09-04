'use client';

import { useEffect, useRef, useState } from 'react';
import { useT } from './LanguageProvider';
import { STATS } from '@/content/site';

/** Counts from zero to the target once the band first comes into view. */
function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const jump = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(jump);
    }

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out cubic, so the number settles rather than stopping dead.
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, active]);

  return value;
}

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const shown = useCountUp(value, active);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      const frame = requestAnimationFrame(() => setActive(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-3"
    >
      <span className="figure flex items-baseline text-ink">
        {shown}
        {suffix ? <em className="text-[0.5em] not-italic text-gold-deep">{suffix}</em> : null}
      </span>
      <span className="micro">{label}</span>
    </div>
  );
}

export default function Stats() {
  const t = useT();

  return (
    <section className="band-tight">
      <div className="shell">
        <div className="grid grid-cols-2 gap-x-8 gap-y-[clamp(2.5rem,5vw,3.5rem)] md:grid-cols-4">
          {STATS.map((stat) => (
            <Stat key={t(stat.label)} value={stat.value} suffix={stat.suffix} label={t(stat.label)} />
          ))}
        </div>
      </div>
    </section>
  );
}
