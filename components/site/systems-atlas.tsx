"use client";

import { motion } from "framer-motion";
import { atlasDomains, getAtlasDomainByTitle } from "@/lib/systems-atlas";

type AtlasDomainTitle = (typeof atlasDomains)[number]["title"];

type SystemsAtlasProps = {
  activeDomain: AtlasDomainTitle | null;
  onOpenContent: () => void;
  onSelect: (domain: AtlasDomainTitle, filters: string[]) => void;
};

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">{title}</p>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <p key={item} className="text-sm leading-6 text-white/66">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export function SystemsAtlas({ activeDomain, onOpenContent, onSelect }: SystemsAtlasProps) {
  const selectedDomain = getAtlasDomainByTitle(activeDomain);

  return (
    <aside className="rounded-[1.9rem] border border-white/10 bg-white/[0.04] p-6 lg:p-7">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.24em] text-white/42">Systems Atlas</p>
        <h3 className="mt-4 font-display text-3xl text-white">A calm domain explorer for connected knowledge.</h3>
        <p className="mt-4 text-sm leading-7 text-white/62">
          Choose one knowledge domain from the left. The right panel stays focused on that domain&apos;s
          current relevance, connected work, and the next content worth opening.
        </p>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[280px,minmax(0,1fr)]">
        <nav className="rounded-[1.7rem] border border-white/10 bg-black/15 p-4" aria-label="Knowledge domains">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">Knowledge domains</p>
          <div className="mt-4 space-y-2">
            {atlasDomains.map((domain) => {
              const active = domain.title === selectedDomain.title;

              return (
                <motion.button
                  key={domain.id}
                  type="button"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => onSelect(domain.title, domain.filters)}
                  className={`flex w-full items-center justify-between gap-3 rounded-[1.2rem] border px-4 py-3 text-left transition duration-300 ${
                    active
                      ? "border-aurora/35 bg-white/[0.08] text-white"
                      : "border-white/10 bg-white/[0.03] text-white/58 hover:border-white/18 hover:text-white"
                  }`}
                >
                  <span className="min-w-0 truncate font-display text-lg">{domain.title}</span>
                  <span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-white/34">
                    {domain.eyebrow}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </nav>

        <section className="rounded-[1.7rem] border border-white/10 bg-black/15 p-5 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr),minmax(280px,0.85fr)]">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">{selectedDomain.eyebrow}</p>
              <h4 className="mt-3 break-words font-display text-3xl text-white">{selectedDomain.title}</h4>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">{selectedDomain.description}</p>

              <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">Current focus</p>
                <p className="mt-3 text-sm leading-7 text-white/66">{selectedDomain.currentFocus}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {selectedDomain.filters.map((filter) => (
                  <span
                    key={filter}
                    className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/46"
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              <DetailList title="Related projects" items={selectedDomain.relatedProjects} />
              <DetailList title="Related research" items={selectedDomain.relatedResearch} />
              <DetailList title="Related frameworks" items={selectedDomain.relatedFrameworks} />
              <DetailList title="Related standards" items={selectedDomain.relatedStandards} />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">Open next</p>
              <p className="mt-2 truncate text-sm text-white/62">
                Explore Intelligence content related to {selectedDomain.title}.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenContent}
              className="shrink-0 rounded-full border border-aurora/30 bg-white/[0.06] px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition hover:border-aurora/45 hover:bg-white/[0.1]"
            >
              Open related content
            </button>
          </div>
        </section>
      </div>
    </aside>
  );
}
