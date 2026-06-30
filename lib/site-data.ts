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

export type IntelligenceEntry = {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  context: string;
  body: string[];
  keyTakeaways: string[];
  references?: string[];
  relatedLinks?: { label: string; href: string }[];
  type: "Research" | "Blog" | "Thinking";
  topic:
    | "AI Compliance"
    | "Future Technology"
    | "Systems"
    | "Writing"
    | "Frameworks";
  lane:
    | "Featured frameworks"
    | "Latest writing"
    | "Research notes"
    | "Thinking and opinions"
    | "Deep dives"
    | "Archived content";
  readTime: string;
  date: string;
  tags: string[];
  featured?: boolean;
  pinned?: boolean;
  status: "Published" | "Draft" | "Archived";
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
      { label: "System maps unified", value: "12" },
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

export const intelligenceEntries: IntelligenceEntry[] = [
  {
    slug: "explainable-ai-control-surfaces",
    title: "Explainable AI control surfaces",
    summary:
      "A framework for making AI governance legible through interface architecture instead of post-hoc documentation.",
    intro:
      "Explainability becomes meaningful only when people can understand what happened and what to do next.",
    context:
      "This piece connects AI compliance, interface design, and decision transparency into a single operating model.",
    body: [
      "Explainability only becomes useful when people can act on it. This research argues for decision surfaces that connect policy, model behavior, and user communication in one legible system.",
      "The framework centers on three layers: evidence, consequence, and intervention. Evidence shows what happened, consequence clarifies impact, and intervention makes the next responsible action explicit.",
      "In practice, this means AI products should provide operational narratives, not just generated confidence scores or hidden dashboards.",
    ],
    keyTakeaways: [
      "AI governance must be visible in the interface, not only in policy files.",
      "Decision context and intervention paths should sit close together.",
      "Trust improves when users can inspect and challenge automated outcomes.",
    ],
    references: ["EU AI Act orientation notes", "NIST AI RMF concepts", "Operational trust design patterns"],
    relatedLinks: [
      { label: "Aether Signal dossier", href: "/projects/aether-signal" },
      { label: "Future systems reading models", href: "/intelligence/future-systems-reading-models" },
    ],
    type: "Research",
    topic: "AI Compliance",
    lane: "Featured frameworks",
    readTime: "9 min",
    date: "2026-06-30",
    tags: ["Explainability", "Governance", "Interface systems"],
    featured: true,
    pinned: true,
    status: "Published",
  },
  {
    slug: "future-systems-reading-models",
    title: "Future systems reading models",
    summary:
      "A method for translating advanced infrastructure and orchestration concepts into decision-friendly technical narratives.",
    intro:
      "Complex systems work loses influence when it cannot be read clearly by different stakeholders.",
    context:
      "This framework proposes a layered way to communicate systems architecture without flattening technical depth.",
    body: [
      "Complex systems often fail communication before they fail engineering. Reading models help translate architecture into different stakeholder views without flattening the underlying depth.",
      "The key move is to preserve causality while changing the resolution. Leaders need consequence maps, engineers need dependency clarity, and researchers need experimental logic.",
      "This model shapes how future systems work can be explained on the web without reverting to dense documentation dumps.",
    ],
    keyTakeaways: [
      "Stakeholder-specific reading layers reduce confusion without oversimplifying.",
      "Causality and consequence should stay visible across every abstraction level.",
      "Editorial structure is part of systems communication quality.",
    ],
    references: ["Architecture communication studies", "Systems literacy notes"],
    relatedLinks: [
      { label: "Helios Lattice dossier", href: "/projects/helios-lattice" },
      { label: "Systems writing is a technical skill", href: "/intelligence/systems-writing-as-a-technical-skill" },
    ],
    type: "Research",
    topic: "Future Technology",
    lane: "Deep dives",
    readTime: "7 min",
    date: "2026-06-27",
    tags: ["Systems", "Architecture", "Narrative"],
    featured: true,
    pinned: true,
    status: "Published",
  },
  {
    slug: "portfolio-operating-surfaces",
    title: "Portfolio operating surfaces",
    summary:
      "Why future-ready portfolios should behave like intelligent operating layers rather than static personal websites.",
    intro:
      "A portfolio becomes stronger when its information architecture itself acts as proof of judgment.",
    context:
      "This essay explains why identity, proof, writing, hiring, and offers should not collapse into one noisy feed.",
    body: [
      "A strong portfolio no longer acts as a brochure. It becomes a routed interface that helps different evaluators find the exact proof they need with minimal friction.",
      "The operating-surface model separates identity, proof, writing, hiring assets, and client conversion into distinct but connected environments.",
      "This structure increases trust because it avoids the desperation and clutter that often undermine otherwise strong work.",
    ],
    keyTakeaways: [
      "Route design is a credibility decision, not just a navigation choice.",
      "Audience separation can make the whole portfolio feel more premium.",
      "Proof quality improves when each surface has a single clear job.",
    ],
    references: ["Portfolio IA study notes", "Signal OS design report"],
    relatedLinks: [{ label: "Signal OS dossier", href: "/projects/signal-os" }],
    type: "Research",
    topic: "Frameworks",
    lane: "Featured frameworks",
    readTime: "8 min",
    date: "2026-06-24",
    tags: ["Portfolio strategy", "Information architecture", "Trust"],
    featured: true,
    pinned: true,
    status: "Published",
  },
  {
    slug: "building-trust-without-killing-momentum",
    title: "Building trust in AI products without killing momentum",
    summary:
      "Product teams do not need to choose between velocity and governance if trust is designed into the operating layer from the start.",
    intro:
      "Trust slows teams down only when it is postponed until after product direction is already fixed.",
    context:
      "This post reframes governance as a product decision that improves alignment earlier in the build cycle.",
    body: [
      "The fastest teams are often the ones that clarify risk early. Trust work becomes expensive only when it is postponed.",
      "Portfolio case studies can demonstrate this directly by showing how governance choices shaped execution rather than appearing as compliance theater at the end.",
    ],
    keyTakeaways: [
      "Governance is faster when it is designed upstream.",
      "Case studies can prove trust strategy through execution detail.",
      "Velocity and responsibility are not opposing modes.",
    ],
    relatedLinks: [{ label: "Explainable AI control surfaces", href: "/intelligence/explainable-ai-control-surfaces" }],
    type: "Blog",
    topic: "AI Compliance",
    lane: "Latest writing",
    readTime: "5 min",
    date: "2026-06-22",
    tags: ["AI product", "Trust", "Execution"],
    featured: true,
    status: "Published",
  },
  {
    slug: "why-future-portfolios-need-strong-route-design",
    title: "Why future portfolios need strong route design",
    summary:
      "A route is a promise about what a visitor will find, and portfolios break that promise when everything collapses into a single feed.",
    intro:
      "Navigation becomes strategy when each route is designed for a different evaluation moment.",
    context:
      "This is a shorter public-facing note about why future portfolios need more intentional separation.",
    body: [
      "When every asset competes on the same page, nothing signals maturity. Dedicated routes let each asset speak in its natural format.",
      "This is especially important for people working across research, product, and client trust at the same time.",
    ],
    keyTakeaways: [
      "Route clarity shapes first impressions.",
      "Audience-specific contexts reduce friction.",
      "Separation creates premium calm.",
    ],
    relatedLinks: [{ label: "Portfolio operating surfaces", href: "/intelligence/portfolio-operating-surfaces" }],
    type: "Blog",
    topic: "Frameworks",
    lane: "Latest writing",
    readTime: "4 min",
    date: "2026-06-18",
    tags: ["Portfolio", "Routing", "Identity"],
    status: "Published",
  },
  {
    slug: "systems-writing-as-a-technical-skill",
    title: "Systems writing is a technical skill",
    summary:
      "The ability to explain technical architecture and future tradeoffs clearly is not adjacent to engineering depth. It is part of it.",
    intro:
      "Systems writing compresses complexity without damaging the logic underneath it.",
    context:
      "This post argues that technical communication is part of engineering credibility, not a soft extra.",
    body: [
      "Systems writing compresses complexity without trivializing it. That makes it useful in hiring, in consulting, and in actual product alignment.",
      "A strong portfolio should show this skill through clear case-study logic, diagrams, and decision narratives.",
    ],
    keyTakeaways: [
      "Explanation quality is a real technical competency.",
      "Writing shapes alignment and adoption.",
      "Clear narratives increase trust in complex work.",
    ],
    relatedLinks: [{ label: "Future systems reading models", href: "/intelligence/future-systems-reading-models" }],
    type: "Blog",
    topic: "Writing",
    lane: "Latest writing",
    readTime: "6 min",
    date: "2026-06-15",
    tags: ["Writing", "Systems", "Communication"],
    status: "Published",
  },
  {
    slug: "decision-logs-for-future-products",
    title: "Decision logs for future products",
    summary:
      "A thinking note on why future-facing systems need human-readable decision logs to preserve accountability over time.",
    intro:
      "A product with memory is easier to trust than a product that only shows the latest state.",
    context:
      "These notes collect patterns for documenting choices, reversals, and assumptions as systems evolve.",
    body: [
      "Decision logs make invisible reasoning visible over time. They help teams remember what was considered, what changed, and why a current state exists.",
      "In future-facing products, that continuity becomes more valuable because systems shift faster and more actors depend on them.",
    ],
    keyTakeaways: [
      "Decision memory reduces repeated confusion.",
      "Accountability improves when context is preserved.",
      "Logs are a design and systems artifact, not just operations residue.",
    ],
    relatedLinks: [{ label: "Explainable AI control surfaces", href: "/intelligence/explainable-ai-control-surfaces" }],
    type: "Thinking",
    topic: "Systems",
    lane: "Thinking and opinions",
    readTime: "5 min",
    date: "2026-06-12",
    tags: ["Decision logs", "Systems", "Governance"],
    status: "Published",
  },
  {
    slug: "design-principles-for-calm-intelligence-surfaces",
    title: "Design principles for calm intelligence surfaces",
    summary:
      "A set of design principles for making editorial and technical interfaces feel advanced without becoming noisy.",
    intro:
      "A calm interface can still feel futuristic when hierarchy, motion, and restraint are doing the work.",
    context:
      "This piece captures the principles behind premium dark-first knowledge interfaces and future operating surfaces.",
    body: [
      "Too many futuristic interfaces rely on glow, speed, and spectacle without building real clarity. Calm intelligence surfaces focus on proportion, spacing, and signal value instead.",
      "The effect is more believable because it feels like a mature product rather than a themed landing page.",
    ],
    keyTakeaways: [
      "Restraint creates believability.",
      "Motion should clarify state or narrative, not fill empty space.",
      "Typography and spacing carry most of the futuristic premium feel.",
    ],
    relatedLinks: [{ label: "Portfolio operating surfaces", href: "/intelligence/portfolio-operating-surfaces" }],
    type: "Thinking",
    topic: "Frameworks",
    lane: "Thinking and opinions",
    readTime: "6 min",
    date: "2026-06-09",
    tags: ["Design principles", "Editorial systems", "Future UI"],
    status: "Published",
  },
  {
    slug: "notes-on-governance-language",
    title: "Notes on governance language",
    summary:
      "Short reflections on how compliance language changes when it is written for humans instead of audit theater.",
    intro:
      "Governance language fails when it is technically correct but operationally unreadable.",
    context:
      "This note captures ways to make policy and trust communication feel clearer, calmer, and more useful.",
    body: [
      "Language is part of the interface. If governance copy feels evasive or inflated, users assume the system is hiding more than it explains.",
      "Useful governance writing does less performance and more orientation. It tells people what happened, why it matters, and what control they still have.",
    ],
    keyTakeaways: [
      "Policy writing is a UX problem.",
      "Plain language can increase trust without reducing rigor.",
      "Good governance copy supports action, not just documentation.",
    ],
    relatedLinks: [{ label: "Building trust in AI products without killing momentum", href: "/intelligence/building-trust-without-killing-momentum" }],
    type: "Thinking",
    topic: "Writing",
    lane: "Research notes",
    readTime: "4 min",
    date: "2026-06-05",
    tags: ["Governance", "Language", "UX writing"],
    status: "Draft",
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
