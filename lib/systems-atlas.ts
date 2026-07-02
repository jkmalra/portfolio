export type AtlasDomain = {
  id: string;
  title:
    | "AI Compliance"
    | "Software Engineering"
    | "Systems Design"
    | "Future Technology"
    | "Research"
    | "Writing"
    | "Frameworks";
  eyebrow: string;
  description: string;
  currentFocus: string;
  filters: string[];
  relatedProjects: string[];
  relatedResearch: string[];
  relatedFrameworks: string[];
  relatedStandards: string[];
};

export const atlasDomains: AtlasDomain[] = [
  {
    id: "ai-compliance",
    title: "AI Compliance",
    eyebrow: "Policy",
    description: "Governance systems, explainability, standards, and trust-centered AI product design.",
    currentFocus: "Making compliance legible through interfaces, review systems, and operational clarity.",
    filters: ["AI Compliance", "Governance", "Standards"],
    relatedProjects: ["Aether Signal", "Compliance Dashboard Project"],
    relatedResearch: ["Explainable AI control surfaces", "Notes on governance language"],
    relatedFrameworks: ["Risk Assessment Framework", "Review Surface Model"],
    relatedStandards: ["EU AI Act", "NIST AI RMF"],
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    eyebrow: "Execution",
    description: "Implementation craft, product delivery systems, and how ideas become reliable software.",
    currentFocus: "Turning research and systems thinking into usable products with visible technical proof.",
    filters: ["Software Engineering", "Open Source", "Projects"],
    relatedProjects: ["Signal OS", "Helios Lattice"],
    relatedResearch: ["Future systems reading models", "Design principles for calm intelligence surfaces"],
    relatedFrameworks: ["Delivery Systems Pattern", "Systems Mapping"],
    relatedStandards: ["Engineering review process"],
  },
  {
    id: "systems-design",
    title: "Systems Design",
    eyebrow: "Structure",
    description: "Operational architecture, system flows, and clear information structures for complex work.",
    currentFocus: "Designing interfaces and dossiers that make complex systems understandable at a glance.",
    filters: ["Systems", "Architecture", "Projects"],
    relatedProjects: ["Helios Lattice", "Signal OS"],
    relatedResearch: ["Portfolio operating surfaces", "Future systems reading models"],
    relatedFrameworks: ["Systems Mapping", "Interface Architecture Model"],
    relatedStandards: ["Information architecture review"],
  },
  {
    id: "future-technology",
    title: "Future Technology",
    eyebrow: "Horizon",
    description: "Credible future-facing analysis across interfaces, infrastructure, and platform direction.",
    currentFocus: "Exploring what future professional systems should feel like without drifting into sci-fi noise.",
    filters: ["Future Technology", "Portfolio Design", "Research"],
    relatedProjects: ["Signal OS", "Aether Signal"],
    relatedResearch: ["Why future portfolios need strong route design", "Portfolio operating surfaces"],
    relatedFrameworks: ["Future Interface Lens", "Operating Surface Model"],
    relatedStandards: ["Trust-centered design principles"],
  },
  {
    id: "research",
    title: "Research",
    eyebrow: "Depth",
    description: "Deep analysis, frameworks, notes, and technical thinking that compound over time.",
    currentFocus: "Publishing serious thinking that directly informs shipped work, systems, and credibility.",
    filters: ["Research", "Decision Making", "Writing"],
    relatedProjects: ["Aether Signal", "Helios Lattice"],
    relatedResearch: ["Explainable AI control surfaces", "Future systems reading models"],
    relatedFrameworks: ["Decision Logs", "Research Pipeline"],
    relatedStandards: ["Evidence and review discipline"],
  },
  {
    id: "writing",
    title: "Writing",
    eyebrow: "Signal",
    description: "Technical communication, public essays, and clarity-driven writing for serious work.",
    currentFocus: "Using writing as a professional system for explanation, trust, and decision visibility.",
    filters: ["Writing", "Research", "Decision Making"],
    relatedProjects: ["Portfolio Operating Surface", "Case Study System"],
    relatedResearch: ["Systems writing as a technical skill", "Building trust without killing momentum"],
    relatedFrameworks: ["Narrative Proof Model", "Decision Logs"],
    relatedStandards: ["Clear documentation practice"],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    eyebrow: "Models",
    description: "Reusable models, patterns, and structured ways of reasoning about product and governance work.",
    currentFocus: "Codifying thinking into reusable systems that can be applied across research and products.",
    filters: ["Frameworks", "Research", "Systems"],
    relatedProjects: ["Aether Signal", "Signal OS"],
    relatedResearch: ["Decision logs for future products", "Design principles for calm intelligence surfaces"],
    relatedFrameworks: ["Risk Assessment Framework", "Systems Mapping"],
    relatedStandards: ["Review criteria", "Assessment rubric"],
  },
];

export function getAtlasDomainByTitle(title: string | null) {
  if (!title) {
    return atlasDomains[0];
  }

  return atlasDomains.find((domain) => domain.title === title) ?? atlasDomains[0];
}
