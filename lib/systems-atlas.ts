export type AtlasNodeKind = "domain" | "topic" | "standards" | "projects" | "research" | "frameworks";

export type AtlasStageNode = {
  id: string;
  kind: AtlasNodeKind;
  label: string;
  shortLabel?: string;
  description: string;
  filters: string[];
};

export type AtlasDomain = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  summary: string;
  branch: AtlasStageNode[];
};

export const atlasDomains: AtlasDomain[] = [
  {
    id: "ai-compliance",
    title: "AI Compliance",
    eyebrow: "Policy",
    description: "Governance systems, explainability, standards, and trust-centered AI product design.",
    summary: "How policy, controls, and product systems become visible, usable, and enforceable.",
    branch: [
      {
        id: "ai-compliance-domain",
        kind: "domain",
        label: "AI Compliance",
        description: "The parent domain for oversight, trust, and product-facing governance.",
        filters: ["AI Compliance"],
      },
      {
        id: "governance",
        kind: "topic",
        label: "Governance",
        description: "Decision structures, accountability, and operational review layers.",
        filters: ["Governance", "AI Compliance"],
      },
      {
        id: "standards",
        kind: "standards",
        label: "Standards",
        description: "Regulatory and standards-facing thinking such as RMF and compliance mapping.",
        filters: ["Standards", "Governance", "AI Compliance"],
      },
      {
        id: "compliance-projects",
        kind: "projects",
        label: "Projects",
        description: "Shipped interfaces and products where controls become tangible proof.",
        filters: ["Projects", "AI Compliance", "Software Engineering"],
      },
      {
        id: "compliance-research",
        kind: "research",
        label: "Research",
        description: "Published analysis that grounds compliance ideas in serious technical reasoning.",
        filters: ["Research", "AI Compliance", "Governance"],
      },
      {
        id: "compliance-frameworks",
        kind: "frameworks",
        label: "Frameworks",
        description: "Reusable models for risk, review, and explainability decisions.",
        filters: ["Frameworks", "AI Compliance", "Governance"],
      },
    ],
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    eyebrow: "Execution",
    description: "Implementation craft, software systems, open source, and product delivery logic.",
    summary: "How research and architecture move from concept into deployed, testable software.",
    branch: [
      {
        id: "software-engineering-domain",
        kind: "domain",
        label: "Software Engineering",
        shortLabel: "Engineering",
        description: "The applied execution layer where thinking becomes software.",
        filters: ["Software Engineering"],
      },
      {
        id: "systems",
        kind: "topic",
        label: "Systems",
        description: "Orchestration, system flows, and the internal logic behind reliable products.",
        filters: ["Systems", "Software Engineering"],
      },
      {
        id: "open-source",
        kind: "projects",
        label: "Open Source",
        description: "Public implementation, tooling, and transparent technical execution.",
        filters: ["Open Source", "Software Engineering"],
      },
      {
        id: "engineering-projects",
        kind: "projects",
        label: "Projects",
        description: "Products, interfaces, and internal systems built from these ideas.",
        filters: ["Projects", "Software Engineering"],
      },
      {
        id: "engineering-research",
        kind: "research",
        label: "Research",
        description: "Investigations that shape how software should be structured and judged.",
        filters: ["Research", "Software Engineering", "Systems"],
      },
      {
        id: "engineering-frameworks",
        kind: "frameworks",
        label: "Frameworks",
        description: "Reusable architecture and delivery patterns that reduce ambiguity.",
        filters: ["Frameworks", "Software Engineering", "Systems"],
      },
    ],
  },
  {
    id: "systems-design",
    title: "Systems Design",
    eyebrow: "Structure",
    description: "Operational architecture, systems thinking, and product structures with clarity.",
    summary: "How complex systems are organized into readable flows, interfaces, and decisions.",
    branch: [
      {
        id: "systems-design-domain",
        kind: "domain",
        label: "Systems Design",
        shortLabel: "Systems Design",
        description: "The structural layer tying architecture, interaction, and flow together.",
        filters: ["Systems"],
      },
      {
        id: "architecture",
        kind: "topic",
        label: "Architecture",
        description: "How systems are arranged, bounded, and made understandable.",
        filters: ["Architecture", "Systems"],
      },
      {
        id: "design-projects",
        kind: "projects",
        label: "Projects",
        description: "Applied dossiers and products where system structure is visible.",
        filters: ["Projects", "Architecture", "Systems"],
      },
      {
        id: "design-research",
        kind: "research",
        label: "Research",
        description: "Long-form technical thinking around structure, behavior, and interfaces.",
        filters: ["Research", "Architecture", "Systems"],
      },
      {
        id: "design-frameworks",
        kind: "frameworks",
        label: "Frameworks",
        description: "Models for shaping decisions, flows, and information architecture.",
        filters: ["Frameworks", "Architecture", "Systems"],
      },
    ],
  },
  {
    id: "future-technology",
    title: "Future Technology",
    eyebrow: "Horizon",
    description: "Credible future-facing analysis across interfaces, infrastructure, and platform direction.",
    summary: "Signals about where product systems, interfaces, and AI work are headed next.",
    branch: [
      {
        id: "future-technology-domain",
        kind: "domain",
        label: "Future Technology",
        shortLabel: "Future Tech",
        description: "Future-oriented thinking grounded in believable product and systems logic.",
        filters: ["Future Technology"],
      },
      {
        id: "future-research",
        kind: "research",
        label: "Research",
        description: "Exploration of credible shifts in interfaces, decision systems, and tooling.",
        filters: ["Research", "Future Technology"],
      },
      {
        id: "future-writing",
        kind: "topic",
        label: "Writing",
        description: "Public essays that translate future signals into useful professional insight.",
        filters: ["Writing", "Future Technology"],
      },
      {
        id: "future-projects",
        kind: "projects",
        label: "Projects",
        description: "Prototypes and case work that embody future-facing interface direction.",
        filters: ["Projects", "Future Technology", "Portfolio Design"],
      },
      {
        id: "future-frameworks",
        kind: "frameworks",
        label: "Frameworks",
        description: "Reusable models for thinking about future systems without hype.",
        filters: ["Frameworks", "Future Technology", "Research"],
      },
    ],
  },
  {
    id: "research",
    title: "Research",
    eyebrow: "Depth",
    description: "Deep analysis, frameworks, notes, and technical thinking that compound over time.",
    summary: "The publishing backbone where observations become structured knowledge and usable systems.",
    branch: [
      {
        id: "research-domain",
        kind: "domain",
        label: "Research",
        description: "The domain where careful reading, synthesis, and publication begin.",
        filters: ["Research"],
      },
      {
        id: "writing-topic",
        kind: "topic",
        label: "Writing",
        description: "Technical and public writing that carries research into a readable form.",
        filters: ["Writing", "Research"],
      },
      {
        id: "decision-making",
        kind: "topic",
        label: "Decision Making",
        shortLabel: "Decisions",
        description: "Judgment frameworks and the reasoning behind product and governance choices.",
        filters: ["Decision Making", "Research"],
      },
      {
        id: "research-projects",
        kind: "projects",
        label: "Projects",
        description: "Applied output where research directly informs implementation.",
        filters: ["Projects", "Research"],
      },
      {
        id: "research-frameworks",
        kind: "frameworks",
        label: "Frameworks",
        description: "Codified models, patterns, and reusable ways of seeing the work.",
        filters: ["Frameworks", "Research"],
      },
    ],
  },
];

export function getAtlasDomainByTitle(title: string | null) {
  if (!title) {
    return atlasDomains[0];
  }

  return atlasDomains.find((domain) => domain.title === title) ?? atlasDomains[0];
}
