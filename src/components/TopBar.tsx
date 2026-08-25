import { useEffect, useState } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { links, sections } from "../data/content";
import { cn } from "../utils/cn";

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-stroke/80 bg-ink/85 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center border border-signal/50 bg-signal/10">
            <span className="mono text-[13px] font-semibold text-signal">H</span>
          </span>
          <span className="mono text-[11px] tracking-[0.2em] text-fog uppercase group-hover:text-snow transition-colors">
            Bapat&nbsp;<span className="text-mist">//</span>&nbsp;AI·LLM
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {sections.slice(1).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="mono text-[11px] tracking-[0.18em] text-mist uppercase transition-colors hover:text-signal"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="mono flex h-8 items-center gap-1 border border-stroke px-3 text-[11px] tracking-[0.14em] text-fog uppercase transition-all hover:border-signal/60 hover:text-signal"
          >
            GitHub
            <ArrowUpRight size={12} strokeWidth={1.8} />
          </a>
          <a
            href={links.resume}
            className="mono hidden h-8 items-center gap-2 border border-signal/50 bg-signal/10 px-3 text-[11px] tracking-[0.14em] text-signal uppercase transition-all hover:bg-signal hover:text-ink sm:flex"
          >
            <FileText size={13} strokeWidth={1.8} />
            Résumé
          </a>
        </div>
      </div>
    </header>
  );
}
