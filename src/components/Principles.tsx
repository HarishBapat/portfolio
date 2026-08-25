import { principles } from "../data/content";
import { Reveal, SectionHead } from "./ui";

export default function Principles() {
  return (
    <section id="principles" className="relative border-t border-stroke/70">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHead
          index="05"
          label="Operating principles"
          title="How I decide when the answer isn't obvious"
        />

        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {principles.map((p, i) => (
            <Reveal
              key={p.n}
              i={i}
              className="group relative lg:border-l lg:border-stroke lg:px-7 lg:first:border-l-0 lg:first:pl-0"
            >
              <div className="mono text-[11px] tracking-[0.2em] text-signal">
                [{p.n}]
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-balance text-snow transition-colors group-hover:text-signal">
                {p.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-fog">{p.line}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
