import { ArrowUp, ArrowUpRight, FileText, Mail } from "lucide-react";
import { identity, links } from "../data/content";
import { Reveal } from "./ui";

const cards = [
  { label: "GitHub", note: "code & write-ups", href: links.github, external: true },
  { label: "LinkedIn", note: "history & references", href: links.linkedin, external: true },
  { label: "Résumé", note: "one page, PDF", href: links.resume, external: false },
];

export default function Contact() {
  return (
    <section id="contact" className="grid-bg relative border-t border-stroke/70">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_110%,rgba(60,224,127,0.06),transparent_65%)]" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <div className="mono flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase">
            <span className="text-signal">06</span>
            <span className="text-mist">Contact</span>
          </div>
        </Reveal>

        <Reveal i={1}>
          <h2 className="mt-6 max-w-4xl text-4xl leading-[1.04] font-semibold tracking-tight text-balance text-snow sm:text-5xl lg:text-6xl">
            Have a language problem
            <br />
            that has to work <span className="text-signal">in production?</span>
          </h2>
        </Reveal>

        <Reveal i={2}>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-fog">
            I'm most useful where the hard part isn't the model — it's the context
            budget, the latency envelope, the provenance requirement, or the cluster
            underneath. If that sounds like your problem, I'd like to hear about it.
          </p>
        </Reveal>

        <Reveal i={3} className="mt-10">
          <a
            href={`mailto:${links.email}`}
            className="group inline-flex flex-wrap items-baseline gap-x-4 gap-y-1"
          >
            <Mail size={22} className="translate-y-0.5 text-signal" />
            <span className="u-link mono text-[clamp(18px,4.5vw,34px)] font-medium tracking-tight text-snow group-hover:text-signal">
              {links.email}
            </span>
          </a>
        </Reveal>

        <div className="mt-14 grid max-w-3xl gap-px border border-stroke bg-stroke/60 sm:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.label} i={i + 3}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex h-full items-center justify-between bg-ink px-5 py-5 transition-colors hover:bg-panel"
              >
                <div>
                  <div className="mono flex items-center gap-2 text-[12px] tracking-[0.16em] text-snow uppercase transition-colors group-hover:text-signal">
                    {c.label === "Résumé" && <FileText size={13} />}
                    {c.label}
                  </div>
                  <div className="mono mt-1.5 text-[10px] tracking-[0.14em] text-mist uppercase">
                    {c.note}
                  </div>
                </div>
                <ArrowUpRight
                  size={15}
                  className="text-mist transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      {/* footer */}
      <footer className="relative border-t border-stroke/70">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <span className="mono text-[10.5px] tracking-[0.16em] text-mist uppercase">
            © {new Date().getFullYear()} {identity.name} — AI / LLM systems engineer
          </span>
          <span className="mono hidden text-[10.5px] tracking-[0.16em] text-mist uppercase md:block">
            nlp → long-context → optimization → production
          </span>
          <a
            href="#top"
            className="mono flex items-center gap-2 text-[10.5px] tracking-[0.16em] text-fog uppercase transition-colors hover:text-signal"
          >
            Back to top
            <ArrowUp size={13} />
          </a>
        </div>
      </footer>
    </section>
  );
}
