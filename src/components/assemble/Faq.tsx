import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { FAQS } from "@/data/event";
import { Reveal, SectionHeading } from "./Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading index="06" kicker="Intel Requests" title="Frequently Asked" />

        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div
                  className={`hud-panel ${isOpen ? "hud-corners" : ""} transition-colors`}
                  style={isOpen ? { borderColor: "var(--primary)" } : undefined}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left"
                  >
                    <span className="flex items-center gap-4">
                      <span className="hud-mono text-[0.5rem] text-arc">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium sm:text-base">{f.q}</span>
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-primary">
                      <Plus size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-border/60 px-5 py-4 pl-14 text-sm leading-relaxed text-muted-foreground">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
