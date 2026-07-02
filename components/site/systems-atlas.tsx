"use client";

import { useMemo, useState } from "react";

type AtlasDomain =
  | "AI Compliance"
  | "Software Engineering"
  | "Systems Design"
  | "Future Technology"
  | "Research"
  | "Architecture"
  | "Writing"
  | "Decision Making"
  | "Projects";

type AtlasNode = {
  domain: AtlasDomain;
  description: string;
  filters: string[];
  eyebrow: string;
};

type SystemsAtlasProps = {
  activeDomain: AtlasDomain | null;
  onSelect: (domain: AtlasDomain | null, filters: string[]) => void;
};

const atlasNodes: AtlasNode[] = [
  {
    domain: "AI Compliance",
    eyebrow: "Policy",
    description: "Governance, explainability, standards, and trust-centered AI product systems.",
    filters: ["AI Compliance", "Governance", "Standards"],
  },
  {
    domain: "Software Engineering",
    eyebrow: "Execution",
    description: "Implementation craft, delivery systems, and how ideas become working software.",
    filters: ["Software Engineering", "Open Source", "Projects"],
  },
  {
    domain: "Systems Design",
    eyebrow: "Structure",
    description: "Operational architecture, flows, interfaces, and system-level design logic.",
    filters: ["Systems", "Architecture", "Frameworks"],
  },
  {
    domain: "Future Technology",
    eyebrow: "Horizon",
    description: "Credible future-facing thinking across tooling, interfaces, and platform direction.",
    filters: ["Future Technology", "Research", "Open Source"],
  },
  {
    domain: "Research",
    eyebrow: "Depth",
    description: "Long-form analysis, frameworks, and deeper technical investigation.",
    filters: ["Research", "Frameworks", "Writing"],
  },
  {
    domain: "Architecture",
    eyebrow: "Systems",
    description: "How complex technical ideas are organized into readable and usable structures.",
    filters: ["Architecture", "Systems", "Projects"],
  },
  {
    domain: "Writing",
    eyebrow: "Signal",
    description: "Essays, technical communication, notes, and public thinking with clarity.",
    filters: ["Writing", "Frameworks", "Decision Making"],
  },
  {
    domain: "Decision Making",
    eyebrow: "Reasoning",
    description: "Decision logs, judgment frameworks, and the chain between intent and consequence.",
    filters: ["Decision Making", "Frameworks", "Research"],
  },
  {
    domain: "Projects",
    eyebrow: "Applied",
    description: "Where knowledge turns into shipped interfaces, dossiers, and visible proof.",
    filters: ["Projects", "Software Engineering", "AI Compliance"],
  },
];

const nodePositions: Record<AtlasDomain, string> = {
  "AI Compliance": "md:col-start-2 md:row-start-1",
  "Software Engineering": "md:col-start-5 md:row-start-1",
  "Systems Design": "md:col-start-3 md:row-start-2",
  "Future Technology": "md:col-start-6 md:row-start-2",
  Research: "md:col-start-1 md:row-start-3",
  Architecture: "md:col-start-2 md:row-start-4",
  Writing: "md:col-start-5 md:row-start-4",
  "Decision Making": "md:col-start-3 md:row-start-5",
  Projects: "md:col-start-6 md:row-start-5",
};

export function SystemsAtlas({ activeDomain, onSelect }: SystemsAtlasProps) {
  const [hoveredDomain, setHoveredDomain] = useState<AtlasDomain | null>(null);

  const activeNode = useMemo(() => {
    return atlasNodes.find((node) => node.domain === (hoveredDomain ?? activeDomain)) ?? atlasNodes[0];
  }, [activeDomain, hoveredDomain]);

  return (
    <aside className="rounded-[1.85rem] border border-white/10 bg-white/[0.04] p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-md">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">Systems Atlas</p>
          <p className="mt-4 text-sm leading-7 text-white/62">
            A visual map of how the portfolio’s knowledge domains connect. Select a node to shift the page toward related work.
          </p>
        </div>
        {activeDomain ? (
          <button
            type="button"
            onClick={() => onSelect(null, [])}
            className="rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/56 transition hover:text-white"
          >
            Clear
          </button>
        ) : null}
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.15fr,0.85fr]">
        <div className="relative overflow-hidden rounded-[1.7rem] border border-white/8 bg-black/15 p-4 md:p-6">
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <div className="absolute left-[18%] top-[18%] h-px w-[28%] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <div className="absolute left-[49%] top-[18%] h-px w-[20%] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <div className="absolute left-[31%] top-[34%] h-px w-[16%] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <div className="absolute left-[48%] top-[34%] h-px w-[20%] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <div className="absolute left-[18%] top-[66%] h-px w-[18%] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <div className="absolute left-[53%] top-[66%] h-px w-[15%] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <div className="absolute left-[33%] top-[78%] h-px w-[30%] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          </div>

          <div className="grid gap-3 md:grid-cols-6 md:grid-rows-5">
            <div className="order-1 rounded-[1.4rem] border border-aurora/16 bg-white/[0.05] p-4 md:col-start-3 md:row-start-3 md:row-span-2 md:flex md:min-h-[132px] md:flex-col md:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">Core</p>
                <h3 className="mt-3 font-display text-2xl text-white">Knowledge System</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/50">
                Connected ideas become filters, articles, projects, and proof.
              </p>
            </div>

            {atlasNodes.map((node) => {
              const active = node.domain === activeDomain;
              const hovered = node.domain === hoveredDomain;

              return (
                <button
                  key={node.domain}
                  type="button"
                  onMouseEnter={() => setHoveredDomain(node.domain)}
                  onMouseLeave={() => setHoveredDomain(null)}
                  onFocus={() => setHoveredDomain(node.domain)}
                  onBlur={() => setHoveredDomain(null)}
                  onClick={() => onSelect(active ? null : node.domain, active ? [] : node.filters)}
                  className={`rounded-[1.35rem] border p-4 text-left transition duration-300 ${nodePositions[node.domain]} ${
                    active || hovered
                      ? "border-aurora/35 bg-white/[0.08] shadow-[0_0_0_1px_rgba(159,245,210,0.05)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.05]"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">{node.eyebrow}</p>
                  <h3 className="mt-3 font-display text-lg leading-tight text-white">{node.domain}</h3>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[1.7rem] border border-white/10 bg-black/20 p-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">Focused domain</p>
          <h3 className="mt-3 font-display text-3xl text-white">{activeNode.domain}</h3>
          <p className="mt-4 text-sm leading-7 text-white/62">{activeNode.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {activeNode.filters.map((filter) => (
              <span
                key={filter}
                className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/46"
              >
                {filter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
