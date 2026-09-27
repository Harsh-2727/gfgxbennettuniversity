import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EVENT } from "@/data/event";

const LINKS = [
  { href: "#briefing", label: "Briefing" },
  { href: "#operations", label: "Operations" },
  { href: "#timeline", label: "Timeline" },
  { href: "#squads", label: "Squads" },
  { href: "#mentors", label: "Mentors" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-80 transition-all duration-500 ${
        solid
          ? "border-b border-border bg-background/80 backdrop-blur-xl shadow-[0_10px_40px_-20px_var(--primary)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-primary/60">
            <span className="absolute inset-0 rounded-full bg-primary/20 blur-md" />
            <span className="title-card relative text-lg text-primary">A</span>
          </span>
          <span className="leading-none">
            <span className="title-card block text-lg tracking-widest">ASSEMBLE</span>
            <span className="hud-mono block text-[0.5rem] text-muted-foreground">
              GFG × BENNETT
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hud-mono text-[0.6rem] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href={EVENT.registerUrl}
            target="_blank"
            rel="noreferrer"
            className="hud-mono border border-primary px-4 py-2 text-[0.6rem] text-foreground transition-all hover:bg-primary hover:shadow-[var(--shadow-glow)]"
          >
            Assemble Now
          </a>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="text-foreground lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="hud-mono border-b border-border/50 py-3 text-[0.62rem] text-muted-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={EVENT.registerUrl}
                target="_blank"
                rel="noreferrer"
                className="hud-mono mt-3 border border-primary bg-primary/10 px-4 py-3 text-center text-[0.62rem]"
              >
                Assemble Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
