import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { EVENT } from "@/data/event";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-surface/40 py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-accent/60">
                <span className="absolute inset-0 rounded-full bg-accent/15 blur-md" />
                <span className="title-card relative text-lg text-accent">A</span>
              </span>
              <div>
                <p className="title-card text-xl leading-none">{EVENT.name}</p>
                <p className="hud-mono text-[0.5rem] text-muted-foreground">
                  {EVENT.organizer}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {EVENT.university} · {EVENT.dateLabel}
            </p>
          </div>

          <div>
            <p className="hud-mono text-[0.55rem] text-arc">Comms Channels</p>
            <div className="mt-4 flex gap-3">
              {[
                { href: EVENT.socials.instagram, Icon: Instagram, label: "Instagram" },
                { href: EVENT.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: EVENT.socials.discord, Icon: MessageCircle, label: "Discord" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <a
              href={`mailto:${EVENT.contact}`}
              className="hud-mono mt-5 inline-flex items-center gap-2 text-[0.55rem] text-muted-foreground hover:text-foreground"
            >
              <Mail size={13} />
              {EVENT.contact}
            </a>
          </div>

          <div>
            <p className="hud-mono text-[0.55rem] text-arc">Navigation</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {["Briefing", "Operations", "Timeline", "Squads", "Mentors", "FAQ"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="hud-mono text-[0.52rem] text-muted-foreground hover:text-foreground"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
          <p className="hud-mono text-[0.5rem] text-muted-foreground">
            © 2026 {EVENT.organizer}, {EVENT.university}
          </p>
          <p className="hud-mono text-[0.5rem] text-muted-foreground/70">
            Powered by Stark Industries · Fan-made, not affiliated with Marvel
          </p>
        </div>
      </div>
    </footer>
  );
}
