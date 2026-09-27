import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { STATS } from "@/data/event";
import { Reveal } from "./Reveal";

function Counter({
  value,
  prefix = "",
  suffix = "",
  compact = false,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  compact?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const display = compact ? n.toLocaleString("en-IN") : String(n);

  return (
    <span ref={ref} className="title-card text-5xl text-flare sm:text-6xl">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative border-y border-border/60 py-20 sm:py-24">
      <div className="absolute inset-0 scanlines opacity-30" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <Counter
                value={s.value}
                prefix={s.prefix ?? ""}
                suffix={s.suffix ?? ""}
                compact={s.compact ?? false}
              />
              <p className="hud-mono mt-3 text-[0.55rem] text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
