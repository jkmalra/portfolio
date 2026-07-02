export type ProjectStatus =
  | "Research"
  | "Prototype"
  | "Alpha"
  | "Beta"
  | "Production"
  | "Maintained"
  | "Archived";

export type ProjectTier = "Tier 1" | "Tier 2" | "Tier 3";

export type ProjectCategory =
  | "AI Compliance"
  | "Backend Systems"
  | "Developer Tools"
  | "Research Prototypes"
  | "Infrastructure"
  | "Future Technology"
  | "Open Source"
  | "Personal Systems";

export type ProjectLinkSet = {
  github?: string;
  live?: string;
  demo?: string;
  docs?: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
  detail?: string;
};

export type ProjectModule = {
  name: string;
  summary: string;
};

export type ProjectDecision = {
  title: string;
  summary: string;
};

export type ProjectRoadmapItem = {
  title: string;
  status: "in progress" | "planned" | "coming soon" | "maintained";
};

export type ProjectResource = {
  label: string;
  href: string;
};

export type ProjectContent = {
  slug: string;
  title: string;
  summary: string;
  strapline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tier: ProjectTier;
  featured: boolean;
  role: string;
  stage: string;
  year: string;
  stack: string[];
  tags: string[];
  domain: string;
  sortOrder: number;
  executiveSummary: string;
  problem: string;
  context: string;
  solution: string;
  architecture: string[];
  modules: ProjectModule[];
  trustLayer?: string[];
  metrics: ProjectMetric[];
  results: string[];
  decisions: ProjectDecision[];
  roadmap: ProjectRoadmapItem[];
  resources: ProjectResource[];
  links: ProjectLinkSet;
  preview: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
  relatedProjects: string[];
  relatedWriting: string[];
};

export const projectContent: ProjectContent[] = [
  {
    slug: "aether-signal",
    title: "Aether Signal",
    summary: "AI compliance workflow and evidence surface for explainability, auditability, and governance review.",
    strapline: "An explainability and governance surface for AI-enabled operating systems.",
    category: "AI Compliance",
    status: "Prototype",
    tier: "Tier 1",
    featured: true,
    role: "Founder, product strategist, front-end engineer",
    stage: "Research prototype",
    year: "2040 brief",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Policy UX"],
    tags: ["Explainability", "Governance", "Auditability", "Evidence"],
    domain: "AI compliance",
    sortOrder: 1,
    executiveSummary:
      "Aether Signal reframes AI compliance as a usable product surface. Instead of scattered documentation, it organizes policy state, review decisions, model lineage, and incident evidence into one operational interface.",
    problem:
      "Compliance teams often inherit fragmented AI reporting, buried policy notes, and disconnected approval trails that slow oversight and reduce trust.",
    context:
      "The project started as a response to a broader pattern in AI products: trust obligations are real, but the interfaces for meeting them are usually weak, hidden, or after-the-fact.",
    solution:
      "I designed a governance operating surface that makes model decisions, review logic, incident escalation, and proof artifacts visible in one place.",
    architecture: [
      "A policy state layer for controls, obligations, and review readiness.",
      "A decision lineage layer showing why a recommendation appeared and what influenced it.",
      "An evidence rail that connects UI states to code, audit notes, and supporting writing.",
    ],
    modules: [
      {
        name: "Review Console",
        summary: "Central surface for triage, escalations, and governance checkpoints.",
      },
      {
        name: "Decision Trace",
        summary: "Readable chain of model behavior, influencing inputs, and applied rules.",
      },
      {
        name: "Evidence Surface",
        summary: "Connects interface proof to reports, product rationale, and audit references.",
      },
    ],
    trustLayer: [
      "Risk handling through explicit escalation states and review checkpoints.",
      "Documentation linked directly to interface states instead of separate buried files.",
      "Decision traceability for why outputs appear and which rules shape them.",
      "Privacy framing through deliberate handling notes around data touchpoints and visibility.",
    ],
    metrics: [
      { label: "Review time reduced", value: "38%", detail: "Prototype usability study frame" },
      { label: "Decision lineage visible", value: "100%", detail: "Every output linked to explanation state" },
      { label: "Audit surfaces consolidated", value: "5 to 1", detail: "From fragmented evidence to one console" },
    ],
    results: [
      "Created a flagship dossier that positions AI governance as an interface and systems problem.",
      "Established a serious consulting and hiring narrative around explainability and trust design.",
      "Defined a reusable pattern for future compliance-facing product work.",
    ],
    decisions: [
      {
        title: "Treat compliance as a product layer, not a report",
        summary: "This made the work more legible to auditors, product leaders, and users of the system.",
      },
      {
        title: "Keep proof adjacent to interaction",
        summary: "Links to evidence, reports, and rationale live near the UI instead of elsewhere.",
      },
      {
        title: "Use calm interface hierarchy instead of alarm styling",
        summary: "Trust surfaces should feel rigorous and readable, not dramatic or overwhelming.",
      },
    ],
    roadmap: [
      { title: "Scenario-based incident simulator", status: "in progress" },
      { title: "Expanded policy coverage matrix", status: "planned" },
      { title: "Reviewer handoff workflow", status: "coming soon" },
    ],
    resources: [
      { label: "Explainable AI control surfaces", href: "/intelligence/explainable-ai-control-surfaces" },
      { label: "Prototype repository", href: "https://github.com/example/aether-signal" },
      { label: "Video walkthrough", href: "https://example.com/aether-signal-demo" },
    ],
    links: {
      github: "https://github.com/example/aether-signal",
      live: "https://example.com/aether-signal",
      demo: "https://example.com/aether-signal-demo",
      docs: "/intelligence/explainable-ai-control-surfaces",
    },
    preview: {
      eyebrow: "Interactive preview",
      title: "Control room snapshot",
      description: "A dossier-like preview area for review state, incident escalation, and evidence routing.",
      items: ["Policy state", "Decision lineage", "Audit handoff"],
    },
    relatedProjects: ["helios-lattice", "signal-os"],
    relatedWriting: ["/intelligence/explainable-ai-control-surfaces", "/intelligence/notes-on-governance-language"],
  },
  {
    slug: "helios-lattice",
    title: "Helios Lattice",
    summary: "Systems intelligence layer for architecture reading, orchestration tradeoffs, and technical decision clarity.",
    strapline: "A systems intelligence layer for future infrastructure and orchestration decisions.",
    category: "Research Prototypes",
    status: "Alpha",
    tier: "Tier 1",
    featured: true,
    role: "Systems designer, researcher, front-end engineer",
    stage: "Internal use",
    year: "2038 study",
    stack: ["React", "Systems Mapping", "Architecture Writing", "Data Visualization"],
    tags: ["Systems", "Architecture", "Infrastructure", "Strategy"],
    domain: "future systems",
    sortOrder: 2,
    executiveSummary:
      "Helios Lattice is a systems reading interface for complex technical work. It turns architecture rationale and orchestration tradeoffs into something strategic viewers can actually evaluate.",
    problem:
      "Advanced systems work becomes difficult to assess when diagrams, rationale, and tradeoffs are split across dense technical documents.",
    context:
      "I wanted a stronger way to present infrastructure and architecture thinking to both technical and non-technical decision makers without flattening the depth.",
    solution:
      "The result is a layered systems dossier with capability views, dependency logic, and consequence-aware reading paths.",
    architecture: [
      "Layered maps for dependencies, capabilities, and risk relationships.",
      "Narrative panels that translate architecture choices into product and operational impact.",
      "Scenario views that make downstream tradeoffs visible without overwhelming the reader.",
    ],
    modules: [
      {
        name: "Capability Map",
        summary: "Summarizes operational components and their relationships at a readable level.",
      },
      {
        name: "Decision Surface",
        summary: "Shows why an architecture direction was chosen and what it costs.",
      },
      {
        name: "Scenario Reader",
        summary: "Helps technical and executive audiences inspect downstream consequences.",
      },
    ],
    metrics: [
      { label: "Decision paths surfaced", value: "27", detail: "Distinct technical routes explained" },
      { label: "Reading time compressed", value: "45%", detail: "For stakeholder review sessions" },
      { label: "System maps unified", value: "12", detail: "Separate artifacts consolidated" },
    ],
    results: [
      "Strengthened positioning around systems communication and future technology thinking.",
      "Created a stronger bridge between engineering depth and executive readability.",
      "Expanded the portfolio beyond standard app shipping narratives.",
    ],
    decisions: [
      {
        title: "Favor reading systems over giant diagrams",
        summary: "The goal was understanding and evaluation, not maximal visual complexity.",
      },
      {
        title: "Keep consequence visible",
        summary: "Every architecture path should show operational and product impact, not just structure.",
      },
    ],
    roadmap: [
      { title: "Interactive dependency inspection", status: "in progress" },
      { title: "Expanded scenario library", status: "planned" },
      { title: "Annotated architecture exports", status: "coming soon" },
    ],
    resources: [
      { label: "Future systems reading models", href: "/intelligence/future-systems-reading-models" },
      { label: "Prototype repository", href: "https://github.com/example/helios-lattice" },
      { label: "Preview demo", href: "https://example.com/helios-lattice-demo" },
    ],
    links: {
      github: "https://github.com/example/helios-lattice",
      live: "https://example.com/helios-lattice",
      demo: "https://example.com/helios-lattice-demo",
      docs: "/intelligence/future-systems-reading-models",
    },
    preview: {
      eyebrow: "Architecture preview",
      title: "Layered systems reading",
      description: "A preview area for capability maps, tradeoff views, and consequence-aware architecture notes.",
      items: ["Capability map", "Risk matrix", "Scenario flow"],
    },
    relatedProjects: ["aether-signal", "signal-os"],
    relatedWriting: ["/intelligence/future-systems-reading-models", "/intelligence/decision-logs-for-future-products"],
  },
  {
    slug: "signal-os",
    title: "Signal OS",
    summary: "Future portfolio operating surface built to separate proof, research, hiring assets, and engagement routes.",
    strapline: "A future portfolio interface designed as a professional operating surface.",
    category: "Future Technology",
    status: "Production",
    tier: "Tier 2",
    featured: false,
    role: "Designer, front-end engineer, systems writer",
    stage: "Live concept",
    year: "2035 showcase",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Information Architecture"],
    tags: ["Portfolio Design", "Systems", "UI Architecture"],
    domain: "software platform",
    sortOrder: 3,
    executiveSummary:
      "Signal OS treats the portfolio itself as proof. The architecture separates showcase, research, resume, and client-facing routes into a more serious operating surface.",
    problem:
      "Most portfolios collapse identity, research, offers, and proof into one overloaded page that weakens credibility.",
    context:
      "This project rethinks the portfolio as a future-facing evaluation interface shaped by trust, route clarity, and audience intent.",
    solution:
      "I built a route-based portfolio system with dedicated proof surfaces, editorial knowledge areas, and cleaner hiring pathways.",
    architecture: [
      "Dedicated route architecture for showcase, dossiers, intelligence, resume, and client engagement.",
      "Reusable components for metrics, case studies, filters, and content surfaces.",
      "A dark-first visual system focused on hierarchy, restraint, and readable depth.",
    ],
    modules: [
      {
        name: "Proof Routes",
        summary: "Projects and research each live in distinct sections instead of one stacked landing page.",
      },
      {
        name: "Intelligence Layer",
        summary: "Writing and research operate as structured intellectual proof, not a dumping ground.",
      },
      {
        name: "Hiring Surface",
        summary: "Resume and profile routes stay usable for evaluators who need speed and clarity.",
      },
    ],
    metrics: [
      { label: "Core routes separated", value: "8", detail: "Distinct user-facing portfolio surfaces" },
      { label: "Audiences supported", value: "3", detail: "Hiring, client, and research viewers" },
      { label: "Primary proof entry points", value: "6", detail: "Clear navigation into strongest work" },
    ],
    results: [
      "Created a differentiated portfolio identity without falling into gimmick-heavy futurism.",
      "Improved audience routing for hiring visibility and client credibility.",
      "Established a maintainable structure for future content-driven growth.",
    ],
    decisions: [
      {
        title: "Separate audiences by route, not by copy blocks",
        summary: "This reduced clutter and gave each section a clear job.",
      },
      {
        title: "Use restraint over spectacle",
        summary: "The interface needed to feel premium and future-facing, not noisy or decorative.",
      },
    ],
    roadmap: [
      { title: "Expanded dossier media system", status: "in progress" },
      { title: "Additional project content collection", status: "planned" },
      { title: "Publishing workflow improvements", status: "coming soon" },
    ],
    resources: [
      { label: "Portfolio operating surfaces", href: "/intelligence/portfolio-operating-surfaces" },
      { label: "Source repository", href: "https://github.com/example/signal-os" },
      { label: "Live site", href: "https://example.com/signal-os" },
    ],
    links: {
      github: "https://github.com/example/signal-os",
      live: "https://example.com/signal-os",
      demo: "https://example.com/signal-os-demo",
      docs: "/intelligence/portfolio-operating-surfaces",
    },
    preview: {
      eyebrow: "Operating surface",
      title: "Route and proof system",
      description: "A preview area for route separation, visual hierarchy, and interaction system decisions.",
      items: ["Route map", "Component system", "Proof pathways"],
    },
    relatedProjects: ["aether-signal", "helios-lattice"],
    relatedWriting: ["/intelligence/portfolio-operating-surfaces", "/intelligence/why-future-portfolios-need-strong-route-design"],
  },
  {
    slug: "regulaflow",
    title: "RegulaFlow",
    summary: "A lightweight evidence tracker for compliance workflows, review queues, and policy follow-through.",
    strapline: "A smaller operational tool for structuring evidence collection in governance-oriented workflows.",
    category: "Developer Tools",
    status: "Research",
    tier: "Tier 3",
    featured: false,
    role: "Builder and workflow researcher",
    stage: "Research prototype",
    year: "2037 lab",
    stack: ["FastAPI", "Postgres", "React", "Workflow Design"],
    tags: ["Evidence", "Policy Ops", "Internal Tools"],
    domain: "developer tools",
    sortOrder: 4,
    executiveSummary:
      "RegulaFlow is a smaller experiment focused on evidence intake and review flow. It exists to test how governance work can stay organized before it needs a fully featured compliance operating surface.",
    problem:
      "Even basic compliance tasks become messy when evidence requests, ownership, and review state are tracked across scattered notes and messages.",
    context:
      "This experiment was built to test whether a lighter-weight system could improve traceability before larger product surfaces are needed.",
    solution:
      "I designed a compact evidence queue with submission states, ownership markers, and policy-linked review notes.",
    architecture: [
      "Simple intake pipeline for evidence requests and response states.",
      "Tagged review records tied to policy or control families.",
      "Minimal interface focused on clarity over feature depth.",
    ],
    modules: [
      {
        name: "Evidence Queue",
        summary: "Tracks what needs to be gathered, who owns it, and what is still missing.",
      },
      {
        name: "Review Notes",
        summary: "Keeps reviewer comments connected to individual evidence records.",
      },
    ],
    trustLayer: [
      "Clear ownership markers for accountability.",
      "Basic decision traceability for why an item was approved or returned.",
    ],
    metrics: [
      { label: "Evidence states tracked", value: "6", detail: "Core workflow checkpoints" },
      { label: "Pilot reviewers", value: "3", detail: "Internal testing frame" },
      { label: "Status visibility", value: "Improved", detail: "Compared with note-based tracking" },
    ],
    results: [
      "Validated the need for a lighter evidence workflow before larger compliance surfaces.",
      "Created a credible supporting experiment for governance operations.",
    ],
    decisions: [
      {
        title: "Keep scope intentionally narrow",
        summary: "The purpose was to learn workflow behavior, not simulate a full enterprise suite.",
      },
    ],
    roadmap: [
      { title: "Basic export layer", status: "planned" },
      { title: "Reviewer comparison mode", status: "coming soon" },
    ],
    resources: [
      { label: "Research notes", href: "/intelligence/notes-on-governance-language" },
      { label: "Prototype repository", href: "https://github.com/example/regulaflow" },
    ],
    links: {
      github: "https://github.com/example/regulaflow",
      docs: "/intelligence/notes-on-governance-language",
    },
    preview: {
      eyebrow: "Workflow preview",
      title: "Evidence queue snapshot",
      description: "A compact internal tool surface focused on ownership, review state, and policy linkage.",
      items: ["Queue states", "Owner handoff", "Review notes"],
    },
    relatedProjects: ["aether-signal"],
    relatedWriting: ["/intelligence/notes-on-governance-language"],
  },
];

export function getAllProjects() {
  return [...projectContent].sort((left, right) => left.sortOrder - right.sortOrder);
}

export function getProjectBySlug(slug: string) {
  return projectContent.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: ProjectContent) {
  return project.relatedProjects
    .map((slug) => getProjectBySlug(slug))
    .filter((entry): entry is ProjectContent => Boolean(entry));
}
