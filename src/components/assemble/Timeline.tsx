import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { SCHEDULE } from "@/data/event";
import { Reveal, SectionHeading } from "./Reveal";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section id="timeline" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading index="03"
          kicker="Energy Conduit · 48 Hours"
          title="Mission Timeline"
          lead="Every node is a checkpoint. Miss one and the squad moves without you."
        />

        <div ref={ref} className="relative mt-16 pl-12 sm:pl-0">
          <div className="absolute left-[15px] top-0 h-full w-px bg-border sm:left-1/2" />
          <motion.div
            className="absolute left-[15px] top-0 w-px origin-top sm:left-1/2"
            style={{
              scaleY: progress,
              height: "100%",
              background: "linear-gradient(to bottom, var(--arc), var(--primary))",
              boxShadow: "var(--shadow-arc)",
            }}
          />

          <div className="space-y-10">
            {SCHEDULE.map((item, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal key={`${item.day}-${item.time}`} delay={0.05} y={24}>
                  <div
                    className={`relative sm:flex sm:items-center ${
                      right ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="sm:w-1/2 sm:px-8">
                      <div
                        className={`hud-panel hud-corners p-5 ${right ? "" : "sm:text-right"}`}
                      >
                        <div
                          className={`flex items-center gap-3 ${
                            right ? "" : "sm:justify-end"
                          }`}
                        >
                          <span className="hud-mono text-[0.5rem] text-muted-foreground">
                            {item.day}
                          </span>
                          <span className="title-card text-xl text-arc">{item.time}</span>
                        </div>
                        <h3 className="title-card mt-2 text-2xl">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <span className="absolute -left-12 top-6 flex h-8 w-8 items-center justify-center sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
                      <span className="absolute h-8 w-8 rounded-full bg-primary/25 blur-md" />
                      <span className="relative h-3 w-3 rotate-45 border border-arc bg-background" />
                    </span>

                    <div className="hidden sm:block sm:w-1/2" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
