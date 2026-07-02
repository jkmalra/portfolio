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
};

type SystemsAtlasProps = {
  activeDomain: AtlasDomain | null;
  onSelect: (domain: AtlasDomain | null, filters: string[]) => void;
};

const atlasNodes: AtlasNode[] = [
  {
    domain: "AI Compliance",
    description: "Governance, standards, explainability, and trust-centered AI product thinking.",
    filters: ["AI Compliance", "Governance", "Standards"],
  },
  {
    domain: "Software Engineering",
    description: "Execution, implementation logic, and the craft of turning ideas into working systems.",
    filters: ["Projects", "Software Platform", "Open source"],
  },
  {
    domain: "Systems Design",
    description: "Structural thinking across interfaces, flows, and operational architecture.",
    filters: ["Systems", "Frameworks", "Case studies"],
  },
  {
    domain: "Future Technology",
    description: "Speculative but credible directions in infrastructure, interfaces, and applied systems.",
    filters: ["Future Technology", "Technologies", "Research"],
  },
  {
    domain: "Research",
    description: "Deep frameworks, technical analysis, and long-form knowledge building.",
    filters: ["Research", "Frameworks", "Articles"],
  },
  {
    domain: "Architecture",
    description: "How complex ideas are organized into readable, usable technical systems.",
    filters: ["Architecture", "Systems", "Projects"],
  },
  {
    domain: "Writing",
    description: "Essays, notes, and communication that translate complexity into clarity.",
    filters: ["Writing", "Articles", "Thinking"],
  },
  {
    domain: "Decision Making",
    description: "Reasoning models, logs, and the chain between intent, action, and consequence.",
    filters: ["Decision logs", "Frameworks", "Research"],
  },
  {
    domain: "Projects",
    description: "Applied output where knowledge becomes interface, software, and visible proof.",
    filters: ["Projects", "Case studies", "Applied in Project"],
  },
];

const nodePositions: Record<AtlasDomain, string> = {
  "AI Compliance": "col-span-2 md:col-span-1 md:col-start-2",
  "Software Engineering": "col-span-2 md:col-span-1 md:col-start-4",
  "Systems Design": "col-span-2 md:col-span-1 md:col-start-3",
  "Future Technology": "col-span-2 md:col-span-1 md:col-start-5",
  Research: "col-span-2 md:col-span-1 md:col-start-1",
  Architecture: "col-span-2 md:col-span-1 md:col-start-2",
  Writing: "col-span-2 md:col-span-1 md:col-start-4",
  "Decision Making": "col-span-2 md:col-span-1 md:col-start-3",
  Projects: "col-span-2 md:col-span-1 md:col-start-5",
};

export function SystemsAtlas({ activeDomain, onSelect }: SystemsAtlasProps) {
  const [hoveredDomain, setHoveredDomain] = useState<AtlasDomain | null>(null);

  const activeNode = useMemo(() => {
    return atlasNodes.find((node) => node.domain === (hoveredDomain ?? activeDomain)) ?? atlasNodes[0];
  }, [activeDomain, hoveredDomain]);

  return (
    <aside className="rounded-[1.85rem] border border-white/10 bg-white/[0.04] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">Systems Atlas</p>
          <p className="mt-4 text-sm leading-7 text-white/62">
            A spatial map of the portfolio’s knowledge system. Each node represents a domain and filters the page toward connected work.
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

      <div className="relative mt-8 rounded-[1.6rem] border border-white/8 bg-black/15 p-4 md:p-6">
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute left-[17%] top-[29%] h-px w-[22%] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="absolute left-[40%] top-[29%] h-px w-[22%] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="absolute left-[28%] top-[50%] h-[18%] w-px bg-gradient-to-b from-white/12 to-transparent" />
          <div className="absolute left-[50%] top-[38%] h-[30%] w-px bg-gradient-to-b from-white/12 to-transparent" />
          <div className="absolute left-[72%] top-[50%] h-[18%] w-px bg-gradient-to-b from-white/12 to-transparent" />
        </div>

        <div className="grid gap-3 md:grid-cols-5">
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
                className={`relative rounded-[1.35rem] border px-4 py-4 text-left transition duration-300 ${nodePositions[node.domain]} ${
                  active || hovered
                    ? "border-aurora/35 bg-white/[0.08] shadow-[0_0_0_1px_rgba(159,245,210,0.05)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.05]"
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                  {node.filters[0]}
                </p>
                <h3 className="mt-3 font-display text-lg text-white">{node.domain}</h3>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">Focused domain</p>
        <h3 className="mt-3 font-display text-2xl text-white">{activeNode.domain}</h3>
        <p className="mt-3 text-sm leading-7 text-white/62">{activeNode.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
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
    </aside>
  );
}
