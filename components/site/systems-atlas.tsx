"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { AtlasEdge } from "@/components/site/atlas-edge";
import { AtlasNode } from "@/components/site/atlas-node";
import { FocusedDomainPanel } from "@/components/site/focused-domain-panel";
import { IntelligenceEntry } from "@/lib/intelligence";
import { atlasDomains, getAtlasDomainByTitle } from "@/lib/systems-atlas";

type AtlasDomainTitle = (typeof atlasDomains)[number]["title"];

type SystemsAtlasProps = {
  activeDomain: AtlasDomainTitle | null;
  entries: IntelligenceEntry[];
  onSelect: (domain: AtlasDomainTitle | null, filters: string[]) => void;
};

function entryMatchesFilters(entry: IntelligenceEntry, filters: string[]) {
  return filters.some(
    (filter) =>
      entry.topics.includes(filter) ||
      entry.activity === filter ||
      entry.pipelineCurrent === filter ||
      entry.knowledgeConnections?.some((connection) => connection.kind === filter || connection.label.includes(filter)),
  );
}

export function SystemsAtlas({ activeDomain, entries, onSelect }: SystemsAtlasProps) {
  const [expandedDomain, setExpandedDomain] = useState<AtlasDomainTitle>(activeDomain ?? atlasDomains[0].title);
  const [activeNodeId, setActiveNodeId] = useState<string>(getAtlasDomainByTitle(activeDomain ?? atlasDomains[0].title).branch[0].id);

  const domain = useMemo(() => {
    return getAtlasDomainByTitle(activeDomain ?? expandedDomain);
  }, [activeDomain, expandedDomain]);

  const activeNode = domain.branch.find((node) => node.id === activeNodeId) ?? domain.branch[0];
  const activeIndex = domain.branch.findIndex((node) => node.id === activeNode.id);

  const metrics = useMemo(() => {
    const relatedEntries = entries.filter((entry) => entryMatchesFilters(entry, activeNode.filters));
    const projectCount = relatedEntries.filter(
      (entry) =>
        entry.relatedProjects.length > 0 ||
        entry.knowledgeConnections?.some((connection) => connection.kind === "Projects"),
    ).length;
    const frameworkCount = relatedEntries.filter(
      (entry) =>
        entry.relatedFrameworks.length > 0 ||
        entry.knowledgeConnections?.some((connection) => connection.kind === "Frameworks"),
    ).length;

    return {
      relatedCount: relatedEntries.length,
      projectCount,
      frameworkCount,
    };
  }, [activeNode.filters, entries]);

  return (
    <aside className="rounded-[1.9rem] border border-white/10 bg-white/[0.04] p-6 lg:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">Systems Atlas</p>
          <h3 className="mt-4 font-display text-3xl text-white">
            One domain at a time, with the next layer revealed only when needed.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">
            The Atlas is a knowledge operating surface. Start with a major domain, then move deeper into the
            branch to surface connected research, projects, and frameworks.
          </p>
        </div>
        {activeDomain ? (
          <button
            type="button"
            onClick={() => {
              setExpandedDomain(atlasDomains[0].title);
              setActiveNodeId(atlasDomains[0].branch[0].id);
              onSelect(null, []);
            }}
            className="rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/56 transition hover:text-white"
          >
            Clear
          </button>
        ) : null}
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[340px,minmax(0,1fr)]">
        <div className="rounded-[1.7rem] border border-white/10 bg-black/15 p-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">Knowledge domains</p>
          <div className="mt-4 space-y-2">
            {atlasDomains.map((item) => {
              const selected = item.title === domain.title;
              const subdued = !selected && activeDomain !== null;

              return (
                <AtlasNode
                  key={item.id}
                  node={item.branch[0]}
                  selected={selected}
                  subdued={subdued}
                  onClick={() => {
                    setExpandedDomain(item.title);
                    setActiveNodeId(item.branch[0].id);
                    onSelect(item.title, item.branch[0].filters);
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr),340px]">
          <div className="rounded-[1.7rem] border border-white/10 bg-black/15 p-5 md:p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">{domain.eyebrow}</p>
                <h4 className="mt-3 font-display text-3xl text-white">{domain.title}</h4>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">{domain.summary}</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <div className="space-y-0">
                  {domain.branch.map((node, index) => (
                    <div key={node.id}>
                      <AtlasNode
                        node={node}
                        active={activeNodeId === node.id || index < activeIndex}
                        selected={activeNodeId === node.id}
                        subdued={index > activeIndex + 1}
                        onClick={() => {
                          setExpandedDomain(domain.title);
                          setActiveNodeId(node.id);
                          onSelect(domain.title, node.filters);
                        }}
                      />
                      {index < domain.branch.length - 1 ? <AtlasEdge active={index < activeIndex} /> : null}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <FocusedDomainPanel
            domain={domain}
            activeNode={activeNode}
            relatedCount={metrics.relatedCount}
            projectCount={metrics.projectCount}
            frameworkCount={metrics.frameworkCount}
          />
        </div>
      </div>
    </aside>
  );
}
