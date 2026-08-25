import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

/* ---------- physics-smooth reveal ---------- */
const ease = [0.22, 1, 0.36, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: i * 0.07 },
  }),
};

export function Reveal({
  children,
  i = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  i?: number;
  className?: string;
  as?: "div" | "section" | "span" | "li";
}) {
  const M = (motion as any)[as];
  return (
    <M
      className={className}
      variants={revealVariants}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
    >
      {children}
    </M>
  );
}

/* ---------- section header ---------- */
export function SectionHead({
  index,
  label,
  title,
  right,
  dark = true,
}: {
  index: string;
  label: string;
  title: string;
  right?: ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal>
      <div
        className={cn(
          "flex items-end justify-between gap-6 border-b pb-5",
          dark ? "border-stroke" : "border-inkonpaper/15"
        )}
      >
        <div className="max-w-3xl">
          <div className="mono flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase">
            <span className={dark ? "text-signal" : "text-signal-dim"}>{index}</span>
            <span className={dark ? "text-mist" : "text-fogonpaper"}>{label}</span>
          </div>
          <h2
            className={cn(
              "mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
              dark ? "text-snow" : "text-inkonpaper"
            )}
          >
            {title}
          </h2>
        </div>
        {right && <div className="hidden shrink-0 md:block">{right}</div>}
      </div>
    </Reveal>
  );
}

/* ---------- chip / tag ---------- */
export function Chip({
  children,
  dark = true,
  accent = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] tracking-wide whitespace-nowrap",
        accent
          ? dark
            ? "border-signal/35 bg-signal/10 text-signal"
            : "border-signal-dim/40 bg-signal/15 text-signal-dim"
          : dark
            ? "border-stroke bg-panel text-fog"
            : "border-inkonpaper/20 bg-inkonpaper/[0.04] text-fogonpaper",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------- small mono caption ---------- */
export function Mono({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("mono text-[11px] tracking-[0.18em] uppercase", className)}>
      {children}
    </span>
  );
}

/* ---------- hairline divider with arrow glyph ---------- */
export function Rule({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-px w-full bg-stroke", className)}>
      <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 border-t border-r border-signal/60" />
    </div>
  );
}
