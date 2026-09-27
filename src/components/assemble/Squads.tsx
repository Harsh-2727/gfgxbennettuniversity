import { useState } from "react";
import { motion } from "motion/react";
import { CircuitBoard, Fingerprint, Layers, PenTool } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SQUADS } from "@/data/event";
import { Reveal, SectionHeading } from "./Reveal";

const ICONS: Record<string, LucideIcon> = { CircuitBoard, Fingerprint, Layers, PenTool };

export function Squads() {
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <section id="squads" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="Recruitment Files"
          title="Choose Your Squad"
          lead="Four domains, four temperaments. Pick the one you would defend a city with."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SQUADS.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Layers;
            const isFlipped = flipped === s.name;
            return (
              <Reveal key={s.name} delay={i * 0.08}>
                <div
                  data-cursor-hover
                  className="group h-80 [perspective:1200px]"
                  onMouseEnter={() => setFlipped(s.name)}
                  onMouseLeave={() => setFlipped(null)}
                  onClick={() => setFlipped(isFlipped ? null : s.name)}
                >
                  <motion.div
                    className="relative h-full w-full [transform-style:preserve-3d]"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className="hud-corners absolute inset-0 flex flex-col justify-between border border-border/70 bg-surface/60 p-6 [backface-visibility:hidden]"
                      style={{ boxShadow: `inset 0 -80px 100px -90px ${s.color}` }}
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full border"
                        style={{ borderColor: s.color, boxShadow: `0 0 26px -8px ${s.color}` }}
                      >
                        <Icon size={20} style={{ color: s.color }} />
                      </div>
                      <div>
                        <p className="hud-mono text-[0.5rem]" style={{ color: s.color }}>
                          {s.domain}
                        </p>
                        <h3 className="title-card mt-1 text-3xl leading-none">{s.name}</h3>
                        <p className="mt-3 text-sm text-muted-foreground">{s.front}</p>
                      </div>
                    </div>

                    <div
                      className="hud-corners absolute inset-0 flex flex-col justify-center border p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                      style={{
                        borderColor: s.color,
                        background: `color-mix(in oklab, ${s.color} 12%, var(--surface))`,
                      }}
                    >
                      <p className="hud-mono text-[0.5rem] text-foreground/80">{s.domain}</p>
                      <h3 className="title-card mt-1 text-2xl">{s.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/85">{s.back}</p>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
