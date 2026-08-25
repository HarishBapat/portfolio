import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { projects, type Project } from "../data/content";
import { Chip, Reveal, SectionHead } from "./ui";
import { cn } from "../utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mono text-[9.5px] tracking-[0.22em] text-signal uppercase">{label}</div>
      <p className="mt-2 text-[13.5px] leading-relaxed text-fog">{children}</p>
    </div>
  );
}

function Row({ p, open, onToggle }: { p: Project; open: boolean; onToggle: () => void }) {
  return (
    <div
      className={cn(
        "group border-b border-stroke transition-colors duration-300",
        open ? "bg-panel/60" : "hover:bg-panel/40"
      )}
    >
      <button
        onClick={onToggle}
        className="block w-full cursor-pointer px-1 py-6 text-left sm:px-4"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4 sm:gap-7">
          <span className={cn("mono pt-1.5 text-[11px] tracking-[0.16em]", open ? "text-signal" : "text-mist")}>
            {p.rank}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h3 className="text-lg font-semibold tracking-tight text-snow transition-colors group-hover:text-signal sm:text-xl">
                {p.title}
              </h3>
              <span className="mono text-[9.5px] tracking-[0.18em] text-mist uppercase">
                {p.phase}
              </span>
            </div>
            <p className="mt-1.5 max-w-3xl text-[13.5px] leading-relaxed text-fog">
              {p.tagline}
            </p>
            {/* envelope strip */}
            <div className="mono mt-3 hidden flex-wrap gap-x-6 gap-y-1 text-[10px] tracking-[0.12em] text-mist uppercase md:flex">
              {p.envelope.map((e) => (
                <span key={e.label}>
                  {e.label}: <span className="text-fog">{e.value}</span>
                </span>
              ))}
            </div>
          </div>
          <span
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300",
              open
                ? "border-signal bg-signal text-ink"
                : "border-stroke text-mist group-hover:border-signal/60 group-hover:text-signal"
            )}
          >
            {open ? <Minus size={14} /> : <Plus size={14} />}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden"
          >
            <div className="grid gap-x-10 gap-y-7 px-1 pb-8 sm:px-4 md:grid-cols-2 lg:pl-[72px]">
              <Field label="Problem">{p.problem}</Field>
              <Field label="Architecture">{p.architecture}</Field>
              <Field label="My contribution">{p.contribution}</Field>
              <Field label="Hardest part">{p.challenge}</Field>
              <div className="md:col-span-2">
                <Field label="Outcome">{p.result}</Field>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.chips.map((c) => (
                    <Chip key={c}>{c}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Projects() {
  const [open, setOpen] = useState<string | null>(projects[0].id);

  return (
    <section id="projects" className="relative">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHead
          index="03"
          label="Ranked index"
          title="The rest of the build log"
          right={
            <p className="mono max-w-[230px] text-right text-[10.5px] leading-relaxed tracking-[0.14em] text-mist uppercase">
              Ordered by sophistication. Each opens to problem → architecture →
              contribution → hardest part → outcome.
            </p>
          }
        />
        <Reveal className="mt-10 border-t border-stroke">
          <div>
            {projects.map((p) => (
              <Row
                key={p.id}
                p={p}
                open={open === p.id}
                onToggle={() => setOpen(open === p.id ? null : p.id)}
              />
            ))}
          </div>
        </Reveal>
        <Reveal i={2} className="mt-8">
          <p className="mono text-[10.5px] tracking-[0.16em] text-mist uppercase">
            <span className="text-signal">Note —</span> operating points are stated as design
            envelopes; full methodology and benchmarks in project write-ups on request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
