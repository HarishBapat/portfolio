import { capabilities } from "../data/content";
import { Reveal, SectionHead } from "./ui";

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative border-t border-stroke/70">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHead
          index="04"
          label="Capabilities"
          title="Where the depth actually is"
          right={
            <p className="mono max-w-[220px] text-right text-[10.5px] leading-relaxed tracking-[0.14em] text-mist uppercase">
              Mechanisms, not tool logos — the layer below the API.
            </p>
          }
        />

        <div className="mt-12 grid gap-px border border-stroke bg-stroke/60 sm:grid-cols-2 lg:grid-cols-6">
          {capabilities.map((g, i) => (
            <Reveal
              key={g.title}
              i={i}
              className={
                i < 2
                  ? "bg-ink p-6 sm:p-7 lg:col-span-3"
                  : i === 2
                    ? "bg-ink p-6 sm:p-7 lg:col-span-2"
                    : "bg-ink p-6 sm:p-7 lg:col-span-2"
              }
            >
              <div className="mono flex items-center gap-3 text-[10px] tracking-[0.2em] text-signal uppercase">
                <span className="text-mist">{String(i + 1).padStart(2, "0")}</span>
                {g.title}
              </div>
              <ul className="mt-5 space-y-2.5">
                {g.items.map((it) => (
                  <li key={it} className="flex items-baseline gap-2.5 text-[13.5px] leading-snug text-fog">
                    <span className="text-[9px] text-signal/70">▪</span>
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
