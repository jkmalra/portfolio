export type Project = {
  slug: string;
  title: string;
  strapline: string;
  domain: "AI Compliance" | "Future Systems" | "Software Platform";
  type: "Platform" | "Research System" | "Experience";
  stack: string[];
  status: "Live concept" | "Prototype" | "In development";
  year: string;
  metrics: { label: string; value: string }[];
  challenge: string;
  context: string;
  built: string[];
  whyItMatters: string;
  results: string[];
  proof: string[];
  links: {
    code: string;
    report: string;
    live: string;
    video: string;
  };
};

export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/resume", label: "Resume" },
  { href: "/about", label: "About" },
];

export const proofPoints = [
  {
    value: "8",
    label: "proof surfaces",
    description: "Each route is designed around a distinct decision context instead of forcing everything into one landing page.",
  },
  {
    value: "3",
    label: "flagship dossiers",
    description: "Major case studies are structured like product evidence rooms with metrics, context, and next-step links.",
  },
  {
    value: "Trust",
    label: "design principle",
    description: "AI suggestions, compliance claims, and client-facing pathways are transparent and intentionally separated.",
  },
];

export const featuredSignals = [
  "AI compliance and governance UX",
  "Software systems thinking",
  "Research writing and frameworks",
  "Future-facing product execution",
];

export const projects: Project[] = [
  {
    slug: "aether-signal",
    title: "Aether Signal",
    strapline: "An explainability and governance surface for AI-enabled operating systems.",
    domain: "AI Compliance",
    type: "Platform",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Policy UX"],
    status: "Prototype",
    year: "2040 brief",
    metrics: [
      { label: "Review time reduced", value: "38%" },
      { label: "Decision lineage visible", value: "100%" },
      { label: "Audit surfaces consolidated", value: "5 to 1" },
    ],
    challenge:
      "Compliance teams often receive fragmented, opaque AI reporting that makes oversight slower and harder to trust.",
    context:
      "The brief was to make governance feel like a real product capability instead of a buried enterprise appendix.",
    built: [
      "A modular control room for policy state, model lineage, incident tracking, and user-facing explanations.",
      "Decision cards that show why a recommendation appeared and what data or rules influenced it.",
      "A proof rail linking every surface to the code, audit report, and annotated walkthrough.",
    ],
    whyItMatters:
      "It reframes AI compliance from static documentation into an operating interface that leaders, auditors, and product teams can all use.",
    results: [
      "Created a portfolio centerpiece that positions governance as a design and systems problem.",
      "Established a strong credibility story for both hiring and consulting audiences.",
      "Produced a repeatable case-study template for serious, trust-centered product work.",
    ],
    proof: [
      "Interaction map for decision explainability",
      "Audit narrative and policy coverage summary",
      "Annotated UI states for model escalation flow",
    ],
    links: {
      code: "https://github.com/example/aether-signal",
      report: "/intelligence/explainable-ai-control-surfaces",
      live: "https://example.com/aether-signal",
      video: "https://example.com/aether-signal-demo",
    },
  },
  {
    slug: "helios-lattice",
    title: "Helios Lattice",
    strapline: "A systems intelligence layer for future infrastructure and orchestration decisions.",
    domain: "Future Systems",
    type: "Research System",
    stack: ["Systems Mapping", "Data Visualization", "Architecture Writing", "React"],
    status: "In development",
    year: "2038 study",
    metrics: [
      { label: "System maps unified", value: "12%" },
      { label: "Decision paths surfaced", value: "27" },
      { label: "Reading time compressed", value: "45%" },
    ],
    challenge:
      "Advanced systems work becomes hard to evaluate when architecture, rationale, and tradeoffs are spread across disconnected docs.",
    context:
      "The goal was to make complex technical direction legible to both technical and non-technical decision makers.",
    built: [
      "A layered systems map with domain, risk, and operational dependency views.",
      "Narrative modules translating abstract infrastructure logic into product-level consequence.",
      "A future-state sandbox that turns architecture choices into visible downstream effects.",
    ],
    whyItMatters:
      "It shows that future technology work can be rigorous, strategic, and understandable without being flattened into generic diagrams.",
    results: [
      "Strengthened positioning around systems thinking and strategic technical communication.",
      "Created a strong bridge between engineering depth and executive readability.",
      "Improved portfolio variety beyond standard app shipping stories.",
    ],
    proof: [
      "Scenario matrix for orchestration risk",
      "Capability stack diagram",
      "Layered reading flow for technical stakeholders",
    ],
    links: {
      code: "https://github.com/example/helios-lattice",
      report: "/intelligence/future-systems-reading-models",
      live: "https://example.com/helios-lattice",
      video: "https://example.com/helios-lattice-demo",
    },
  },
  {
    slug: "signal-os",
    title: "Signal OS",
    strapline: "A future portfolio interface designed as a professional operating surface.",
    domain: "Software Platform",
    type: "Experience",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Information Architecture"],
    status: "Live concept",
    year: "2035 showcase",
    metrics: [
      { label: "Core routes separated", value: "8" },
      { label: "Audiences supported", value: "3" },
      { label: "Primary proof entry points", value: "6" },
    ],
    challenge:
      "Most portfolios collapse identity, research, client offers, hiring assets, and project proof into one overloaded page.",
    context:
      "This project rebuilds that pattern into an interface that feels credible in a future market shaped by richer, trust-driven evaluation.",
    built: [
      "A route-based architecture separating showcase, case studies, research, resume, and client engagement.",
      "A premium dark-first system focused on hierarchy, restraint, and surface clarity.",
      "Reusable components for dossiers, metrics, content libraries, resume blocks, and booking flows.",
    ],
    whyItMatters:
      "It proves that taste, information architecture, and technical execution can be part of the portfolio's evidence, not just its wrapper.",
    results: [
      "Creates a memorable, differentiated portfolio identity without becoming gimmicky.",
      "Supports both hiring visibility and client credibility through clean route separation.",
      "Establishes a maintainable foundation for future content and product proof.",
    ],
    proof: [
      "Route map for audience intent",
      "UI system tokens and component kit",
      "Performance and accessibility-aware motion patterns",
    ],
    links: {
      code: "https://github.com/example/signal-os",
      report: "/intelligence/portfolio-operating-surfaces",
      live: "https://example.com/signal-os",
      video: "https://example.com/signal-os-demo",
    },
  },
];

export const servicePackages = [
  {
    name: "Compliance interface audit",
    range: "Starting at $2,500",
    summary: "Review AI product surfaces for trust signals, explainability gaps, and user-facing governance issues.",
  },
  {
    name: "Future systems narrative sprint",
    range: "Starting at $3,800",
    summary: "Turn complex technical work into a high-credibility case study, technical narrative, or product proof package.",
  },
  {
    name: "Operating surface redesign",
    range: "Starting at $6,500",
    summary: "Re-architect high-value product or portfolio interfaces into clearer, more differentiated, trust-centered experiences.",
  },
];

export const resumeSummary = {
  identity: "AI compliance and future systems professional",
  focus:
    "Software development, governance-centered product design, research writing, and premium interface execution.",
  highlights: [
    "Builds proof-driven digital systems that balance depth, readability, and trust.",
    "Translates complex technical ideas into routes, case studies, and interfaces that decision makers can use.",
    "Works across portfolio strategy, front-end execution, systems communication, and AI compliance framing.",
  ],
};
