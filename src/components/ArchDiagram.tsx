import { useId } from "react";
import type { ArchStage } from "../data/content";

/* word-wrap helper for mono text inside fixed-width nodes */
function wrap(text: string, chars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > chars) {
      if (cur) lines.push(cur);
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

const INK = "#1a2019";
const FOG = "#5b6156";
const GREEN = "#1d5c3a";
const AMBER = "#9a6b14";

const artifacts = [
  "pages + images",
  "typed blocks + offsets",
  "searchable index",
  "packed context ≤ budget",
  "draft answer + claims",
  "validated output",
];

/**
 * fig. 02 — six-stage pipeline with artifact lane and budget annotations.
 * Rendered at a fixed blueprint scale; the parent allows horizontal pan on small screens.
 */
export default function ArchDiagram({ stages }: { stages: ArchStage[] }) {
  const uid = useId().replace(/:/g, "");
  const W = 1200;
  const NW = 172;
  const GAP = 24;
  const xs = stages.map((_, i) => 8 + i * (NW + GAP));

  return (
    <svg
      viewBox={`0 0 ${W} 352`}
      className="h-auto w-full"
      role="img"
      aria-label="Architecture diagram: six stage pipeline from ingest and OCR through layout parsing, provenance index, context packing, LLM reasoning, to validation."
    >
      <defs>
        <marker id={`${uid}-arr`} markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
          <path d="M0,0 L6,3.5 L0,7" fill="none" stroke={GREEN} strokeWidth="1.3" />
        </marker>
        <pattern id={`${uid}-hatch`} width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke={INK} strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
      </defs>

      {/* lanes */}
      <text x="8" y="14" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="2" fill={FOG}>
        FLOW
      </text>
      <text x="8" y="212" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="2" fill={FOG}>
        ARTIFACTS
      </text>
      <text x="8" y="316" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="2" fill={AMBER}>
        BUDGETS&nbsp;/&nbsp;GUARANTEES
      </text>

      {stages.map((s, i) => {
        const x = xs[i];
        const detailLines = wrap(s.detail, 27);
        return (
          <g key={s.n}>
            {/* node */}
            <rect x={x} y={34} width={NW} height={118} fill={`url(#${uid}-hatch)`} stroke={INK} strokeOpacity="0.85" strokeWidth="1.2" />
            {/* stage tag */}
            <rect x={x - 1} y={22} width={38} height={18} fill={INK} />
            <text x={x + 18} y={35} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#f4f1e8">
              {s.n}
            </text>
            <text x={x + 12} y={66} fontFamily="IBM Plex Sans, sans-serif" fontWeight="600" fontSize="13.5" fill={INK}>
              {s.name}
            </text>
            {detailLines.map((l, li) => (
              <text key={li} x={x + 12} y={86 + li * 13.5} fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill={FOG}>
                {l}
              </text>
            ))}
            {/* connector arrow to next node */}
            {i < stages.length - 1 && (
              <line
                x1={x + NW + 2}
                y1={93}
                x2={x + NW + GAP - 3}
                y2={93}
                stroke={GREEN}
                strokeWidth="1.4"
                markerEnd={`url(#${uid}-arr)`}
              />
            )}
            {/* dashed drop to artifact chip */}
            <line x1={x + NW / 2} y1={152} x2={x + NW / 2} y2={222} stroke={FOG} strokeDasharray="3 3" strokeWidth="1" />
            <rect x={x} y={222} width={NW} height={30} fill="none" stroke={FOG} strokeDasharray="4 3" strokeWidth="1" />
            <text
              x={x + NW / 2}
              y={241}
              textAnchor="middle"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="9.5"
              fill={INK}
            >
              {artifacts[i]}
            </text>
          </g>
        );
      })}

      {/* budget annotations */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill={AMBER}>
        <line x1={xs[0]} y1={276} x2={xs[2] + NW} y2={276} stroke={AMBER} strokeWidth="0.8" strokeOpacity="0.7" />
        <text x={(xs[0] + xs[2] + NW) / 2} y={294} textAnchor="middle">
          OCR confidence travels with every block — uncertainty is data, not noise
        </text>
        <line x1={xs[3]} y1={276} x2={xs[3] + NW} y2={276} stroke={AMBER} strokeWidth="0.8" strokeOpacity="0.7" />
        <text x={xs[3] + NW / 2} y={294} textAnchor="middle">
          explicit token accounting
        </text>
        <line x1={xs[4]} y1={276} x2={xs[5] + NW} y2={276} stroke={AMBER} strokeWidth="0.8" strokeOpacity="0.7" />
        <text x={(xs[4] + xs[5] + NW) / 2} y={294} textAnchor="middle">
          schema + citations verified programmatically
        </text>
      </g>

      {/* frame ticks */}
      <g stroke={GREEN} strokeWidth="1.2">
        <path d="M2 352V338M2 352H16" fill="none" />
        <path d="M1198 0V14M1198 0H1184" fill="none" transform="translate(0,-2)" />
      </g>
    </svg>
  );
}
