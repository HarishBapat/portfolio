import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { arc } from "../data/content";
import { Reveal, SectionHead } from "./ui";

export default function Arc() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 45%"],
  });
  const scaleX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 60,
    damping: 20,
  });

  return (
    <section id="arc" className="relative border-t border-stroke/70">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHead
          index="01"
          label="The arc"
          title="One thread runs through everything I build"
          right={
            <p className="mono max-w-[240px] text-right text-[10.5px] leading-relaxed tracking-[0.14em] text-mist uppercase">
              Classical NLP → LLMs → long context → optimization → production
            </p>
          }
        />

        <div ref={ref} className="relative mt-14">
          {/* connecting line */}
          <div className="absolute top-[7px] right-0 left-0 hidden h-px bg-stroke lg:block" />
          <motion.div
            className="absolute top-[7px] left-0 hidden h-px w-full origin-left bg-signal shadow-[0_0_12px_rgba(60,224,127,0.6)] lg:block"
            style={{ scaleX }}
          />

          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
            {arc.map((p, i) => (
              <Reveal as="li" key={p.idx} i={i} className="group relative lg:pt-8">
                {/* node dot */}
                <span className="absolute top-[3px] left-0 hidden h-[9px] w-[9px] rotate-45 border border-signal/70 bg-ink transition-colors duration-500 group-hover:bg-signal lg:block" />
                <div className="mono flex items-baseline gap-3">
                  <span className="text-[11px] tracking-[0.2em] text-signal">{p.idx}</span>
                  <span className="h-px flex-1 bg-stroke lg:hidden" />
                </div>
                <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-snow">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-fog">{p.line}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal i={5} className="mt-14">
          <p className="mono text-[11px] tracking-[0.18em] text-mist uppercase">
            <span className="text-signal">→</span> The projects below are ranked by
            technical sophistication — newest stages first.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
