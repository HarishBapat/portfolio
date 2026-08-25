/* ============================================================================
 * PORTFOLIO CONTENT — single source of truth.
 *
 * Everything a recruiter or interviewer reads on the site comes from here.
 * Edit this file to adjust wording, links, or operating points.
 * Items marked  [UPDATE]  should be pointed at your real URLs/files.
 * Operating points (context envelope, latency budget, etc.) are stated as
 * design envelopes — adjust to match your measured numbers if they differ.
 * ========================================================================== */

export const identity = {
  name: "Harish Vinayak Bapat",
  shortName: "H. Bapat",
  role: "AI / LLM Systems Engineer",
  positioning:
    "I build production language systems — long-context NLP, document intelligence, and the optimized inference and distributed infrastructure that serves them.",
  status: "Open to senior AI / ML engineering roles",
};

/* [UPDATE] point these at your real profiles / resume file */
export const links = {
  github: "https://github.com/HarishBapat",
  linkedin: "https://www.linkedin.com/in/harish-bapat",
  email: "harish.bapat10@gmail.com",
  resume: "/Harish_Bapat_Resume.pdf", // drop the PDF into public/
};

/* ------------------------------------------------------------------ */
/* Recruiter brief — the 30–60 second read                             */
/* ------------------------------------------------------------------ */
export const brief = [
  { k: "who", v: "AI/ML engineer specializing in LLM systems, NLP, and production AI." },
  {
    k: "build",
    v: "Long-context document understanding, OCR pipelines, classification systems, optimized LLM inference, distributed training & serving.",
  },
  {
    k: "depth",
    v: "I work below the API layer: attention patterns, KV-cache memory, quantization, kernel paths, context budgeting, multi-GPU parallelism.",
  },
];

export const specializations = [
  "Long-context NLP",
  "Document intelligence",
  "OCR & layout parsing",
  "Text classification",
  "LLM inference",
  "Model optimization",
  "Distributed AI systems",
];

/* ------------------------------------------------------------------ */
/* Narrative arc — how the work connects                               */
/* ------------------------------------------------------------------ */
export interface ArcPhase {
  idx: string;
  title: string;
  line: string;
}
export const arc: ArcPhase[] = [
  {
    idx: "01",
    title: "Classical NLP & classification",
    line: "Supervised text systems, end to end. Where I learned that evaluation design — not model choice — decides outcomes.",
  },
  {
    idx: "02",
    title: "Document intelligence & OCR",
    line: "Turning scanned, noisy documents into structured data that keeps a link back to its source.",
  },
  {
    idx: "03",
    title: "LLM systems & long context",
    line: "Making transformers reason over full documents instead of fragments — within real context and latency budgets.",
  },
  {
    idx: "04",
    title: "Inference & model optimization",
    line: "Quantization, KV-cache management, batching, kernel paths — holding output quality at commodity serving cost.",
  },
  {
    idx: "05",
    title: "Production & distributed AI",
    line: "Multi-GPU training and serving, fault tolerance, monitoring. Systems that hold up outside the notebook.",
  },
];

/* ------------------------------------------------------------------ */
/* Flagship project — the 2-minute senior-engineer test                */
/* ------------------------------------------------------------------ */
export interface ArchStage {
  n: string;
  name: string;
  detail: string;
}

export const flagship = {
  id: "flagship",
  phase: "Arc 03 — Long context",
  title: "Long-Context Document Intelligence Platform",
  tagline:
    "Reads full-length documents — scanned or digital, hundreds of pages — and returns structured, citation-backed answers. No silent context truncation.",
  problem: [
    "Most document understanding stacks hit the same wall: documents that are too long, too noisy, and too structurally complex for either a plain RAG pipeline or a raw long-context prompt.",
    "Naive chunk-and-retrieve loses exactly the context that matters — a term defined on page 3 and applied on page 87, a table split across a page boundary, an appendix that overrides the main text. Answers come back fluent, unverifiable, and occasionally wrong in ways nobody can trace.",
  ],
  archStages: [
    { n: "S1", name: "Ingest & OCR", detail: "page normalization, deskew, OCR with per-region confidence" },
    { n: "S2", name: "Layout-aware parse", detail: "typed blocks — headings, paragraphs, tables, figures — in reading order" },
    { n: "S3", name: "Provenance index", detail: "every block carries doc / page / bounding-box offsets" },
    { n: "S4", name: "Context packing", detail: "structure-aware selection & ordering under an explicit token budget" },
    { n: "S5", name: "LLM reasoning", detail: "long-context model, schema-constrained decoding, answer + citations" },
    { n: "S6", name: "Validation layer", detail: "schema checks, citation verification, low-confidence routing to review" },
  ] as ArchStage[],
  contribution: [
    "Designed the pipeline end-to-end, from ingestion to validated output.",
    "Built the layout-aware parser and provenance index — the substrate that makes every downstream answer traceable.",
    "Implemented the budgeted context packer: which sections enter the window, in what order, at what token cost.",
    "Ran the long-context evaluation: full-context vs. retrieval-augmented vs. hybrid packing, measured on the actual document distribution rather than a public benchmark.",
  ],
  challenges: [
    {
      t: "OCR noise propagates silently",
      d: "Recognition errors corrupt extraction downstream, and the model can't tell clean text from garbage.",
      r: "OCR confidence travels with every block into the prompt; low-confidence regions get a heavier second pass; the schema validator rejects fields that can't be grounded.",
    },
    {
      t: "Cross-page references break retrieval",
      d: "The evidence for one answer often lives dozens of pages apart, and top-k chunk retrieval returns fragment soup.",
      r: "Packing keeps sections contiguous, always retains definitions and headers, and scores candidate evidence jointly instead of one chunk at a time.",
    },
    {
      t: "The context window is a budget, not a bucket",
      d: "Instructions, evidence, and output schema compete for the same window — and recall degrades by position.",
      r: "Explicit token accounting per stage, degradation-by-position measured on real queries, evidence ordered to put load-bearing facts where the model actually reads.",
    },
    {
      t: "Full-context coverage vs. latency",
      d: "Passing entire documents through the model is accurate but expensive; users won't wait minutes.",
      r: "Tiered strategy: short documents go full-context; long ones use retrieval-packed hybrid; repeated prefixes (instructions, schema) are cached across requests.",
    },
  ],
  results: [
    "Full documents processed end-to-end — no hard truncation for the target corpus; long-context behavior measured, not assumed.",
    "Every extracted field carries a citation to its source page and region — human review shifted from re-reading documents to spot-checking flagged fields.",
    "Schema-invalid or ungrounded outputs are caught by the validation layer before delivery instead of surfacing downstream.",
  ],
  decisions: [
    {
      d: "Layout-aware parsing before any model call",
      alt: "Plaintext splitting / direct OCR-to-prompt",
      why: "Tables, headers, and reading order carry semantics. Flat text destroys them — and takes provenance down with it.",
    },
    {
      d: "Budgeted, structure-aware context packing",
      alt: "Naive top-k vector retrieval",
      why: "Cross-references span pages; contiguous, structurally-complete sections outperform fragment retrieval for reasoning tasks.",
    },
    {
      d: "Schema-constrained decoding plus programmatic citation checks",
      alt: "Free generation with post-hoc parsing",
      why: "Machine-checked guarantees beat prompt promises. Downstream systems need typed, verifiable output, not plausible prose.",
    },
  ],
  envelope: [
    { label: "Context envelope", value: "100K-token class" },
    { label: "Document size", value: "100s of pages" },
    { label: "Output contract", value: "Schema + citations" },
    { label: "Latency strategy", value: "Tiered + prefix cache" },
  ],
  stack: ["Python", "PyTorch", "Transformers", "OCR pipeline", "Layout parsing", "Long-context decoding", "FastAPI", "Postgres"],
};

/* ------------------------------------------------------------------ */
/* Ranked project index                                                */
/* ------------------------------------------------------------------ */
export interface Project {
  id: string;
  rank: string;
  phase: string;
  title: string;
  tagline: string;
  problem: string;
  architecture: string;
  contribution: string;
  challenge: string;
  result: string;
  chips: string[];
  envelope: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    id: "inference",
    rank: "P2",
    phase: "Arc 04 — Optimization",
    title: "LLM Inference & Model Optimization Stack",
    tagline: "Serving open-weight LLMs at interactive latency on commodity GPUs — and knowing exactly what each optimization costs and buys.",
    problem:
      "Naively served, open-weight models are too slow and too expensive: decode is memory-bandwidth-bound, KV caches grow without bound, and per-request serving wastes the GPU. Latency budgets for interactive use rule the naive path out entirely.",
    architecture:
      "A serving path built around continuous batching and paged KV-cache management, with weight-only INT8 quantization from calibrated ranges, prefix caching for shared prompt structure, and hand-checked kernel paths (CUDA / Triton) on the decode hot loop. Speculative decoding evaluated as an optional layer, gated behind quality checks.",
    contribution:
      "Built the serving and experimentation path: calibrated the quantization regimes, implemented batching and KV-cache budgeting, profiled and tuned the hot path, and measured the latency/quality tradeoff of each technique on representative traffic rather than toy prompts.",
    challenge:
      "Decode is bound by memory bandwidth, not compute — so throughput comes from cache layout and batching decisions, not FLOPs. Quantization regressed quality on specific task slices until calibration moved to the actual serving distribution. Bursty load caused tail-latency spikes until prefill chunking and admission control separated long prompts from interactive traffic.",
    result:
      "Interactive multi-turn latency held within budget on commodity hardware, with a documented operating-point menu: for each technique, the measured quality cost and the latency/memory it buys — so the system can be dialed, not guessed.",
    chips: ["Continuous batching", "Paged KV cache", "INT8 / FP8", "Calibration", "CUDA / Triton", "Prefix caching"],
    envelope: [
      { label: "Quant regimes", value: "INT8 · FP8 eval" },
      { label: "Decode path", value: "Profiled & tuned" },
      { label: "Operating point", value: "Measured, per technique" },
    ],
  },
  {
    id: "distributed",
    rank: "P3",
    phase: "Arc 05 — Production",
    title: "Distributed Training & Serving Infrastructure",
    tagline: "Multi-GPU infrastructure for fine-tuning and serving models that don't fit on one device — with failure as a first-class case.",
    problem:
      "Serious fine-tuning and serving workloads exceed single-GPU memory, and ad-hoc multi-GPU scripts fail exactly when jobs get long: mid-train OOMs, lost checkpoints, and no way to see where time or memory goes.",
    architecture:
      "Sharded training with FSDP / ZeRO-style partitioning, activation checkpointing, and mixed precision; distributed data preprocessing with Ray; periodic, resumable checkpointing; and serving wired behind a queue so training and inference don't fight for the same devices.",
    contribution:
      "Built the sharding and checkpointing path, the preprocessing fan-out, and the observability: per-rank memory/step-time telemetry that made OOMs and stragglers debuggable instead of mysterious.",
    challenge:
      "Memory cliffs don't announce themselves — a run can be fine for hours and OOM on a long sequence. Length-bucketed batching plus activation checkpointing flattened the peak, and telemetry per rank made the remaining cliffs attributable to specific shapes.",
    result:
      "Long fine-tuning jobs run unattended with resumable checkpoints; preprocessing that was a single-machine bottleneck fans out across the cluster; device utilization is visible enough to argue about with data.",
    chips: ["FSDP / DeepSpeed", "Activation checkpointing", "Mixed precision", "Ray", "Fault-tolerant checkpoints"],
    envelope: [
      { label: "Parallelism", value: "Data-parallel + sharded" },
      { label: "Failure mode", value: "Checkpoint & resume" },
      { label: "Visibility", value: "Per-rank telemetry" },
    ],
  },
  {
    id: "ocr",
    rank: "P4",
    phase: "Arc 02 — Documents",
    title: "OCR & Layout Understanding Pipeline",
    tagline: "The document foundation: detection-and-recognition OCR plus layout parsing that turns scanned pages into structured, queryable blocks.",
    problem:
      "Real document corpora are scanned, skewed, multi-column, and full of tables. Off-the-shelf OCR returns a wall of text with no structure and no notion of what it's unsure about — unusable for extraction that anyone would trust.",
    architecture:
      "A two-stage pipeline: page normalization (deskew, denoise, segmentation) feeding detection/recognition OCR; a layout pass that types regions and recovers reading order; then key-value and table extraction with a calibrated confidence score per field, routing low-confidence items to human review.",
    contribution:
      "Built the normalization and layout stages, the structured extraction logic, and the confidence calibration that decides what ships automatically and what goes to a person.",
    challenge:
      "Confidence scores out-of-the-box are not probabilities — they're monotonic hints at best. Calibrating them against measured extraction accuracy turned an arbitrary threshold into an operating point with a known error rate.",
    result:
      "Scanned documents become typed, ordered, queryable structures with per-field confidence — the substrate the long-context platform later built on, and the reason its citations can point at a page region instead of a shrug.",
    chips: ["OCR detect / recognize", "Layout parsing", "Reading order", "Table extraction", "Confidence calibration"],
    envelope: [
      { label: "Input", value: "Scans, skew, multi-column" },
      { label: "Output", value: "Typed blocks + confidence" },
      { label: "Human loop", value: "Calibrated routing" },
    ],
  },
  {
    id: "classification",
    rank: "P5",
    phase: "Arc 01 — Classical NLP",
    title: "Production Text Classification System",
    tagline: "Where the discipline came from: a multi-label classifier with calibrated thresholds, slice-based evaluation, and a distilled student for cheap serving.",
    problem:
      "A text classifier is easy to demo and hard to run: class imbalance, overlapping labels, and an average accuracy number that hides exactly the slices where the system is wrong.",
    architecture:
      "Fine-tuned encoder models with per-class calibrated thresholds (not a global 0.5), an evaluation suite sliced by segment and difficulty and wired into CI, and a distilled student model serving production traffic with the teacher retained for periodic quality audits.",
    contribution:
      "Owned the evaluation design and the calibration layer, and ran the teacher→student distillation that made per-request serving cost boring.",
    challenge:
      "The interesting failures never show up in aggregate metrics. Building slice-based evals made regressions attributable — every deploy was gated on no-slice-regression, not on a single F1 going up.",
    result:
      "A classifier whose operating point is explicit (this precision at this recall, per class), whose deploys are regression-gated, and whose serving footprint is small enough to treat as infrastructure instead of a research budget.",
    chips: ["Encoder fine-tuning", "Threshold calibration", "Slice-based evals", "Distillation", "CI-gated deploys"],
    envelope: [
      { label: "Eval", value: "Sliced, CI-gated" },
      { label: "Serving", value: "Distilled student" },
      { label: "Thresholds", value: "Per-class, calibrated" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Capabilities matrix                                                 */
/* ------------------------------------------------------------------ */
export interface CapGroup {
  title: string;
  items: string[];
}
export const capabilities: CapGroup[] = [
  {
    title: "LLM & long-context systems",
    items: [
      "RoPE scaling & position interpolation",
      "Sliding-window / sparse attention",
      "Context packing & token budgeting",
      "Schema-constrained decoding",
      "Hybrid retrieval (dense + lexical)",
      "PEFT / LoRA fine-tuning",
    ],
  },
  {
    title: "Inference & optimization",
    items: [
      "Continuous batching & schedulers",
      "Paged KV-cache management",
      "INT8 / FP8 quantization + calibration",
      "CUDA / Triton hot paths",
      "Prefix caching, speculative decoding",
      "Profiling: nsys / torch profiler",
    ],
  },
  {
    title: "Document intelligence",
    items: [
      "OCR: detection + recognition",
      "Layout parsing & reading order",
      "Table structure extraction",
      "Provenance & citation systems",
      "Confidence calibration & review routing",
    ],
  },
  {
    title: "NLP foundations",
    items: [
      "Encoder fine-tuning & classification",
      "Tokenization pipelines",
      "Per-class thresholding",
      "Evaluation design: slices + regression suites",
    ],
  },
  {
    title: "Systems & infrastructure",
    items: [
      "PyTorch · Hugging Face ecosystem",
      "FSDP / DeepSpeed sharding",
      "Ray distributed compute",
      "vLLM-style serving · FastAPI",
      "Docker & Kubernetes",
      "Experiment tracking & CI for ML",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Operating principles                                                */
/* ------------------------------------------------------------------ */
export const principles = [
  {
    n: "A",
    title: "Baselines before breakthroughs",
    line: "A boring model with a good harness beats a fancy model with a bad one. Establish the floor first — then raise the ceiling.",
  },
  {
    n: "B",
    title: "Budgets are requirements",
    line: "Latency, memory, and cost are specified and tested like correctness. A result that misses its budget doesn't ship.",
  },
  {
    n: "C",
    title: "Provenance by default",
    line: "Every model output should trace back to the inputs that produced it — anywhere a human reviews, audits, or complies.",
  },
  {
    n: "D",
    title: "Measure what ships",
    line: "Offline evals wired into CI, online checks for drift. If it isn't measured, it's a demo, not a system.",
  },
];

/* ------------------------------------------------------------------ */
/* Section meta                                                        */
/* ------------------------------------------------------------------ */
export const sections = [
  { id: "top", label: "Intro" },
  { id: "arc", label: "Arc" },
  { id: "flagship", label: "Flagship" },
  { id: "projects", label: "Projects" },
  { id: "capabilities", label: "Capabilities" },
  { id: "principles", label: "Principles" },
  { id: "contact", label: "Contact" },
];
