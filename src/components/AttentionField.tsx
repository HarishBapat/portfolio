import { useEffect, useRef } from "react";

/**
 * Sparse attention pattern, animated.
 * Sliding-window band + global key columns + diagonal — the pattern long-context
 * models (Longformer/BigBird family) use to scale attention past quadratic cost.
 * A query row sweeps the matrix; brightness = attention weight.
 */
export default function AttentionField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = 40; // tokens
    const W = 3; // sliding-window radius
    const G = 8; // global stride

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const weight = (q: number, k: number) => {
      // future-masked (causal); window band + global keys
      if (k > q) return 0;
      let v = 0;
      const d = q - k;
      if (d <= W) v = Math.max(v, 1 - d / (W + 1.5)); // local band
      if (k % G === 0) v = Math.max(v, 0.55); // global keys
      if (d === 0) v = 1; // self
      return v;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const pad = 2;
      const cell = Math.min((w - pad * 2) / N, (h - pad * 2) / N);
      const ox = (w - cell * N) / 2;
      const oy = (h - cell * N) / 2;
      const sweep = ((t * 0.004) % (N + 14)) - 7; // slow traveling query row
      const pulse = (x: number) => 0.5 + 0.5 * Math.sin(t * 0.0016 - x * 0.42);

      for (let q = 0; q < N; q++) {
        for (let k = 0; k <= q; k++) {
          const base = weight(q, k);
          if (base <= 0) continue;
          // shimmer along the band + boost around the sweeping query row
          const dist = Math.abs(q - sweep);
          const rowGlow = Math.max(0, 1 - dist / 3.5);
          const a = base * (0.16 + 0.32 * pulse(q + k)) + rowGlow * base * 0.75;
          const isSelf = q === k;
          const isGlobalHit = k % G === 0 && rowGlow > 0.25;
          ctx.fillStyle = isSelf && rowGlow > 0.35
            ? `rgba(242, 176, 61, ${Math.min(1, a + 0.12)})`
            : isGlobalHit
              ? `rgba(242, 176, 61, ${Math.min(1, a * 0.85)})`
              : `rgba(60, 224, 127, ${Math.min(1, a)})`;
          ctx.fillRect(ox + k * cell, oy + q * cell, Math.max(0.5, cell - 1), Math.max(0.5, cell - 1));
        }
      }

      // bracket marking the active query row
      if (sweep >= 0 && sweep < N) {
        const y = oy + sweep * cell;
        ctx.strokeStyle = "rgba(60, 224, 127, 0.55)";
        ctx.lineWidth = 1;
        ctx.strokeRect(ox - 3.5, y - 0.5, cell * N + 7, cell + 1);
      }

      if (!reduced) raf.current = requestAnimationFrame(draw);
    };

    if (reduced) {
      draw(2000);
    } else {
      raf.current = requestAnimationFrame(draw);
    }
    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
