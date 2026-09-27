import { FileLock2 } from "lucide-react";
import { BRIEFING, EVENT } from "@/data/event";
import { Reveal, SectionHeading } from "./Reveal";
import texture from "@/assets/tech-texture.jpg";

export function About() {
  return (
    <section id="briefing" className="relative overflow-hidden py-24 sm:py-32">
      <img
        src={texture}
        alt=""
        loading="lazy"
        width={1536}
        height={1024}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading kicker="Classified · Level 07" title="Mission Briefing" />

        <Reveal delay={0.1} className="mt-14">
          <div className="hud-panel hud-corners p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-5">
              <div className="flex items-center gap-3">
                <FileLock2 className="text-primary" size={20} />
                <div>
                  <p className="hud-mono text-[0.58rem] text-arc">Dossier · {EVENT.name}</p>
                  <p className="hud-mono text-[0.5rem] text-muted-foreground">
                    Filed by {EVENT.organizer}
                  </p>
                </div>
              </div>
              <p className="hud-mono border border-primary/40 px-3 py-1 text-[0.5rem] text-primary">
                Status: Recruiting
              </p>
            </div>

            <div className="mt-7 grid gap-8 md:grid-cols-[1.6fr_1fr]">
              <div className="space-y-5">
                {BRIEFING.map((p, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.08}>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      <span className="hud-mono mr-2 text-[0.55rem] text-arc">
                        0{i + 1}
                      </span>
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>

              <div className="space-y-3">
                {[
                  { k: "Operation", v: EVENT.name },
                  { k: "Window", v: EVENT.dateLabel },
                  { k: "Location", v: EVENT.venue },
                  { k: "Clearance", v: "All students" },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="flex items-center justify-between gap-4 border border-border/60 bg-surface-2/40 px-4 py-3"
                  >
                    <span className="hud-mono text-[0.52rem] text-muted-foreground">{row.k}</span>
                    <span className="title-card text-lg text-foreground">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="hud-mono mt-8 text-[0.5rem] text-muted-foreground">
              {EVENT.tagline}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
