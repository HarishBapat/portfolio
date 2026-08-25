import { ArrowDown, MoveHorizontal, Route } from "lucide-react";
import ArchDiagram from "./ArchDiagram";
import { flagship } from "../data/content";
import { Chip, Reveal, SectionHead } from "./ui";

export default function DeepDive() {
  return (
    <section id="flagship" className="grid-bg-paper relative border-y border-stroke bg-paper text-inkonpaper">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHead
          dark={false}
          index="02"
          label={`Flagship · ${flagship.phase}`}
          title={flagship.title}
          right={
            <div className="mono flex max-w-[260px] items-start gap-2 text-right text-[10.5px] leading-relaxed tracking-[0.12em] text-fogonpaper uppercase">
              <Route size={14} className="mt-0.5 shrink-0 text-signal-dim" />
              <span>
                2-minute path: problem → fig. 02 → challenges. That is the interview
                conversation.
              </span>
            </div>
          }
        />

        {/* tagline + envelope */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <p className="text-xl leading-snug font-medium tracking-tight text-balance sm:text-2xl">
              {flagship.tagline}
            </p>
          </Reveal>
          <Reveal i={1}>
            <div className="grid grid-cols-2 gap-px border border-inkonpaper/15 bg-inkonpaper/15">
              {flagship.envelope.map((m) => (
                <div key={m.label} className="bg-paper px-4 py-3.5">
                  <div className="mono text-[9.5px] tracking-[0.16em] text-fogonpaper uppercase">
                    {m.label}
                  </div>
                  <div className="mono mt-1 text-[12.5px] font-medium text-inkonpaper">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* problem */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[220px_1fr]">
          <Reveal>
            <div className="mono text-[10.5px] tracking-[0.22em] text-signal-dim uppercase">
              2.1 — Problem
            </div>
          </Reveal>
          <div className="max-w-3xl space-y-4">
            {flagship.problem.map((p, i) => (
              <Reveal key={i} i={i}>
                <p className="text-[15px] leading-relaxed text-inkonpaper/85">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* architecture */}
        <div className="mt-16">
          <Reveal className="mb-4 flex items-center justify-between">
            <div className="mono text-[10.5px] tracking-[0.22em] text-signal-dim uppercase">
              2.2 — Architecture
            </div>
            <div className="mono flex items-center gap-2 text-[10px] tracking-[0.16em] text-fogonpaper uppercase lg:hidden">
              <MoveHorizontal size={13} />
              pan
            </div>
          </Reveal>
          <Reveal i={1}>
            <div className="tick border border-inkonpaper/25 bg-paper2/60" style={{ "--tick-c": "#1d5c3a" } as React.CSSProperties}>
              <div className="flex items-center justify-between border-b border-inkonpaper/20 px-4 py-2.5">
                <span className="mono text-[10px] tracking-[0.2em] text-fogonpaper uppercase">
                  fig. 02 — pipeline, artifacts, and where the guarantees live
                </span>
                <span className="mono hidden text-[10px] tracking-[0.16em] text-signal-dim uppercase sm:block">
                  document → cited answer
                </span>
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-[1060px] px-3 py-4">
                  <ArchDiagram stages={flagship.archStages} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* my contribution */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[220px_1fr]">
          <Reveal>
            <div className="mono text-[10.5px] tracking-[0.22em] text-signal-dim uppercase">
              2.3 — My contribution
            </div>
          </Reveal>
          <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {flagship.contribution.map((c, i) => (
              <Reveal key={i} i={i} className="flex gap-3.5">
                <span className="mono pt-0.5 text-[11px] font-medium text-signal-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[14.5px] leading-relaxed text-inkonpaper/85">{c}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* challenges */}
        <div className="mt-16">
          <Reveal className="mb-6">
            <div className="mono text-[10.5px] tracking-[0.22em] text-signal-dim uppercase">
              2.4 — Where it got hard <span className="text-fogonpaper">(and the moves that worked)</span>
            </div>
          </Reveal>
          <div className="grid gap-px border border-inkonpaper/15 bg-inkonpaper/15 lg:grid-cols-2">
            {flagship.challenges.map((c, i) => (
              <Reveal key={c.t} i={i} className="bg-paper p-6 sm:p-7">
                <div className="flex items-baseline gap-3">
                  <span className="mono text-[10.5px] tracking-[0.16em] text-amber">C{i + 1}</span>
                  <h3 className="text-[16.5px] font-semibold tracking-tight">{c.t}</h3>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-fogonpaper">{c.d}</p>
                <div className="mt-4 border-l-2 border-signal-dim/60 pl-3.5">
                  <span className="mono text-[9.5px] tracking-[0.2em] text-signal-dim uppercase">
                    The move
                  </span>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-inkonpaper/90">{c.r}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* decisions & tradeoffs */}
        <div className="mt-16">
          <Reveal className="mb-6">
            <div className="mono text-[10.5px] tracking-[0.22em] text-signal-dim uppercase">
              2.5 — Decisions a reviewer should challenge
            </div>
          </Reveal>
          <Reveal i={1}>
            <div className="overflow-x-auto border border-inkonpaper/15">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-inkonpaper/20 bg-paper2/70">
                    {["Decision", "Passed on", "Rationale"].map((h) => (
                      <th key={h} className="mono px-5 py-3 text-[10px] font-medium tracking-[0.2em] text-fogonpaper uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {flagship.decisions.map((d, i) => (
                    <tr key={i} className="border-b border-inkonpaper/10 align-top last:border-0">
                      <td className="w-[30%] px-5 py-4 text-[13.5px] font-medium text-inkonpaper">
                        {d.d}
                      </td>
                      <td className="w-[24%] px-5 py-4">
                        <span className="mono text-[11.5px] text-amber line-through decoration-amber/50">
                          {d.alt}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[13.5px] leading-relaxed text-inkonpaper/80">
                        {d.why}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        {/* results */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[220px_1fr]">
          <Reveal>
            <div className="mono text-[10.5px] tracking-[0.22em] text-signal-dim uppercase">
              2.6 — Results
            </div>
          </Reveal>
          <div>
            <div className="space-y-5">
              {flagship.results.map((r, i) => (
                <Reveal key={i} i={i} className="flex gap-4">
                  <span className="mt-[7px] h-2 w-2 shrink-0 rotate-45 bg-amber" />
                  <p className="text-[15px] leading-relaxed text-inkonpaper/90">{r}</p>
                </Reveal>
              ))}
            </div>
            <Reveal i={3} className="mt-7">
              <p className="mono text-[10.5px] leading-relaxed tracking-[0.14em] text-fogonpaper uppercase">
                Outcomes stated as built — I can walk through the eval harness, the packing
                heuristics, and the failure catalog live.
              </p>
            </Reveal>
            <Reveal i={4} className="mt-6 flex flex-wrap gap-2">
              {flagship.stack.map((t) => (
                <Chip key={t} dark={false}>
                  {t}
                </Chip>
              ))}
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16 flex justify-center">
          <a
            href="#projects"
            className="mono group flex h-11 items-center gap-2.5 border border-inkonpaper/30 px-6 text-[11.5px] tracking-[0.14em] text-inkonpaper uppercase transition-colors hover:border-signal-dim hover:text-signal-dim"
          >
            Continue to the ranked project index
            <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
