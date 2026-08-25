import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import AttentionField from "./AttentionField";
import { brief, identity, links } from "../data/content";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease, delay: 0.06 + i * 0.09 },
  }),
};

export default function Hero() {
  return (
    <section id="top" className="grid-bg relative overflow-hidden">
      {/* vignette to keep text legible over the grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_620px_at_72%_18%,rgba(60,224,127,0.05),transparent_62%),radial-gradient(900px_700px_at_30%_80%,rgba(10,12,15,0.4),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 pt-32 pb-16 sm:px-8 lg:pt-40 lg:pb-24">
        <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* ------------------------------------------------ left: identity */}
          <div>
            <motion.div variants={rise} custom={0} initial="hidden" animate="show" className="flex flex-wrap items-center gap-4">
              <span className="mono text-[11px] tracking-[0.28em] text-mist uppercase">
                {identity.name}
              </span>
              <span className="hidden h-px w-10 bg-stroke sm:block" />
              <span className="mono flex items-center gap-2 text-[11px] tracking-[0.18em] text-signal uppercase">
                <span className="dot-pulse inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                {identity.status}
              </span>
            </motion.div>

            <h1 className="mt-8 leading-[0.95] font-semibold tracking-tight">
              <motion.span variants={rise} custom={1} initial="hidden" animate="show" className="block text-[13vw] text-snow sm:text-7xl xl:text-[86px]">
                AI / LLM
              </motion.span>
              <motion.span variants={rise} custom={2} initial="hidden" animate="show" className="outline-text block text-[13vw] sm:text-7xl xl:text-[86px]">
                SYSTEMS
              </motion.span>
              <motion.span variants={rise} custom={3} initial="hidden" animate="show" className="block text-[13vw] text-snow sm:text-7xl xl:text-[86px]">
                ENGINEER<span className="text-signal">.</span>
              </motion.span>
            </h1>

            <motion.p
              variants={rise}
              custom={4}
              initial="hidden"
              animate="show"
              className="mono mt-7 text-[11.5px] leading-relaxed tracking-[0.14em] text-signal uppercase sm:text-xs"
            >
              Long-context NLP <span className="text-mist">·</span> Document intelligence{" "}
              <span className="text-mist">·</span> Inference &amp; model optimization{" "}
              <span className="text-mist">·</span> Distributed AI systems
            </motion.p>

            <motion.p
              variants={rise}
              custom={5}
              initial="hidden"
              animate="show"
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-fog sm:text-base"
            >
              {identity.positioning} My work sits below the API layer — attention patterns,
              KV-cache memory, quantization, context budgeting, and the multi-GPU
              infrastructure that keeps it all running in production.
            </motion.p>

            <motion.div variants={rise} custom={6} initial="hidden" animate="show" className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#flagship"
                className="mono group flex h-11 items-center gap-2.5 bg-signal px-5 text-[12px] font-medium tracking-[0.12em] text-ink uppercase transition-colors hover:bg-snow"
              >
                Read the flagship project
                <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="mono group flex h-11 items-center gap-2 border border-stroke px-5 text-[12px] tracking-[0.12em] text-fog uppercase transition-colors hover:border-signal/60 hover:text-signal"
              >
                GitHub
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={links.resume}
                className="mono flex h-11 items-center gap-2 border border-stroke px-5 text-[12px] tracking-[0.12em] text-fog uppercase transition-colors hover:border-signal/60 hover:text-signal"
              >
                <FileText size={14} />
                Résumé
              </a>
            </motion.div>
          </div>

          {/* --------------------------------------------- right: schematic + brief */}
          <div className="flex flex-col gap-5 lg:pt-2">
            <motion.figure
              variants={rise}
              custom={3}
              initial="hidden"
              animate="show"
              className="tick relative border border-stroke bg-panel/70"
            >
              <div className="flex items-center justify-between border-b border-stroke px-4 py-2.5">
                <span className="mono text-[10px] tracking-[0.2em] text-mist uppercase">
                  fig. 01 — working diagram
                </span>
                <span className="mono text-[10px] tracking-[0.2em] text-signal uppercase">
                  attn(q, k)
                </span>
              </div>
              <div className="sweep relative h-[260px] sm:h-[300px]">
                <AttentionField className="h-full w-full" />
              </div>
              <figcaption className="mono flex items-center justify-between border-t border-stroke px-4 py-2.5 text-[10px] tracking-[0.14em] text-mist uppercase">
                <span>sliding-window + global keys</span>
                <span className="text-fog">long-context pattern</span>
              </figcaption>
            </motion.figure>

            <motion.aside
              variants={rise}
              custom={5}
              initial="hidden"
              animate="show"
              className="tick relative border border-stroke bg-panel/70"
              style={{ "--tick-c": "#3ce07f99" } as React.CSSProperties}
            >
              <div className="border-b border-stroke px-4 py-2.5">
                <span className="mono text-[10px] tracking-[0.2em] text-mist uppercase">
                  {"// recruiter brief — 60 seconds"}
                </span>
              </div>
              <dl className="space-y-3.5 px-4 py-4">
                {brief.map((b) => (
                  <div key={b.k} className="grid grid-cols-[72px_1fr] gap-3">
                    <dt className="mono pt-0.5 text-[10.5px] tracking-[0.16em] text-signal uppercase">
                      {b.k}
                    </dt>
                    <dd className="text-[13px] leading-relaxed text-fog">{b.v}</dd>
                  </div>
                ))}
              </dl>
            </motion.aside>
          </div>
        </div>

        {/* scroll cue */}
        <motion.a
          href="#arc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mono mt-16 hidden items-center gap-4 text-[10px] tracking-[0.24em] text-mist uppercase transition-colors hover:text-signal lg:flex"
        >
          <span className="relative h-px w-16 overflow-hidden bg-stroke">
            <motion.span
              className="absolute inset-y-0 left-0 w-6 bg-signal"
              animate={{ x: [-24, 64] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          Scroll — the arc, the flagship, the index
        </motion.a>
      </div>
    </section>
  );
}
