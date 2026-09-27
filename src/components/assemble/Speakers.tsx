import { motion } from "motion/react";
import { Linkedin } from "lucide-react";
import { SPEAKERS } from "@/data/event";
import { Reveal, SectionHeading } from "./Reveal";

export function Speakers() {
  return (
    <section id="mentors" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="Command Council"
          title="Speakers & Mentors"
          lead="Operatives from industry frontlines running the floor for 48 hours."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SPEAKERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <motion.a
                href={p.link}
                data-cursor-hover
                whileHover={{ y: -8 }}
                className="group block text-center"
              >
                <div className="relative mx-auto h-32 w-32">
                  <span className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                    <polygon
                      points="50,4 92,27 92,73 50,96 8,73 8,27"
                      fill="color-mix(in oklab, var(--surface) 80%, transparent)"
                      stroke="var(--gold)"
                      strokeWidth="1.5"
                      className="transition-all duration-500 group-hover:stroke-[var(--primary)]"
                    />
                  </svg>
                  <span className="title-card absolute inset-0 flex items-center justify-center text-4xl text-muted-foreground transition-colors group-hover:text-foreground">
                    {p.initials}
                  </span>
                </div>
                <h3 className="title-card mt-5 text-2xl">{p.name}</h3>
                <p className="hud-mono mt-1 text-[0.52rem] text-muted-foreground">{p.role}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-arc opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Linkedin size={15} />
                  <span className="hud-mono text-[0.5rem]">Profile</span>
                </span>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
