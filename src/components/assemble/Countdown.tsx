import { useEffect, useState } from "react";
import { EVENT } from "@/data/event";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ compact = false }: { compact?: boolean }) {
  const target = new Date(EVENT.startsAt).getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = window.setInterval(() => setT(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells = [
    { k: "Days", v: t?.days },
    { k: "Hrs", v: t?.hours },
    { k: "Min", v: t?.minutes },
    { k: "Sec", v: t?.seconds },
  ];

  return (
    <div
      className={`flex items-stretch justify-center ${compact ? "gap-2" : "gap-2 sm:gap-3"}`}
      role="timer"
    >
      {cells.map((c, i) => (
        <div key={c.k} className="flex items-stretch">
          <div
            className={`hud-panel hud-corners flex flex-col items-center justify-center ${
              compact ? "w-16 py-2" : "w-18 py-3 sm:w-24 sm:py-4"
            }`}
          >
            <span className="absolute inset-0 scanlines opacity-40" />
            <span
              className={`title-card relative text-arc ${
                compact ? "text-2xl" : "text-3xl sm:text-5xl"
              }`}
              style={{ textShadow: "0 0 18px color-mix(in oklab, var(--arc) 55%, transparent)" }}
            >
              {c.v === undefined ? "--" : String(c.v).padStart(2, "0")}
            </span>
            <span className="hud-mono relative text-[0.5rem] text-muted-foreground">{c.k}</span>
          </div>
          {i < cells.length - 1 && (
            <span className="self-center px-1 text-primary sm:px-2">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
