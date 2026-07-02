import { AtlasDomain, AtlasStageNode } from "@/lib/systems-atlas";

type FocusedDomainPanelProps = {
  domain: AtlasDomain;
  activeNode: AtlasStageNode;
  relatedCount: number;
  projectCount: number;
  frameworkCount: number;
};

export function FocusedDomainPanel({
  domain,
  activeNode,
  relatedCount,
  projectCount,
  frameworkCount,
}: FocusedDomainPanelProps) {
  return (
    <div className="rounded-[1.7rem] border border-white/10 bg-black/20 p-5 md:p-6">
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">Focused domain</p>
      <h3 className="mt-3 font-display text-3xl text-white">{domain.title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/62">{domain.description}</p>

      <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">Current path</p>
        <h4 className="mt-3 font-display text-xl text-white">{activeNode.label}</h4>
        <p className="mt-3 text-sm leading-7 text-white/58">{activeNode.description}</p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">Related articles</p>
          <p className="mt-3 font-display text-2xl text-white">{relatedCount}</p>
        </div>
        <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">Projects</p>
          <p className="mt-3 font-display text-2xl text-white">{projectCount}</p>
        </div>
        <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">Frameworks</p>
          <p className="mt-3 font-display text-2xl text-white">{frameworkCount}</p>
        </div>
      </div>

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
  );
}
