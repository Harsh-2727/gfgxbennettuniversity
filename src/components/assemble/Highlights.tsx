import { motion } from "motion/react";
import { Brain, Cpu, Mic, Rocket, ShieldHalf, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HIGHLIGHTS } from "@/data/event";
import { Reveal, SectionHeading } from "./Reveal";

const ICONS: Record<string, LucideIcon> = {
  Cpu,
  Brain,
  Mic,
  ShieldHalf,
  Timer,
  Rocket,
};

export function Highlights() {
  return (
    <section id="operations" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="Six Stones · Six Operations"
          title="Event Highlights"
          lead="Each operation carries its own power signature. Clear as many as you can."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = ICONS[h.icon] ?? Cpu;
            return (
              <Reveal key={h.code} delay={i * 0.07}>
                <motion.article
                  data-cursor-hover
                  whileHover={{ y: -10, rotateX: 6, rotateY: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  style={{ transformPerspective: 900 }}
                  className="group hud-corners relative h-full overflow-hidden border border-border/70 bg-surface/60 p-6"
                >
                  <span
                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                    style={{ background: h.stone }}
                  />
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full border"
                    style={{
                      borderColor: h.stone,
                      boxShadow: `0 0 22px -6px ${h.stone}`,
                    }}
                  >
                    <Icon size={19} style={{ color: h.stone }} />
                  </div>
                  <p className="hud-mono mt-6 text-[0.5rem] text-muted-foreground">{h.code}</p>
                  <h3 className="title-card mt-1 text-2xl">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {h.description}
                  </p>
                  <span
                    className="mt-6 block h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ background: h.stone }}
                  />
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
