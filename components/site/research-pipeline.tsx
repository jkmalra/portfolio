import { IntelligenceFrontmatter } from "@/lib/intelligence";

type ResearchPipelineProps = {
  current: NonNullable<IntelligenceFrontmatter["pipelineCurrent"]>;
};

const stages: NonNullable<IntelligenceFrontmatter["pipelineCurrent"]>[] = [
  "Idea",
  "Reading",
  "Writing",
  "Review",
  "Published",
  "Applied in Project",
];

export function ResearchPipeline({ current }: ResearchPipelineProps) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">Research pipeline</p>
      <div className="flex flex-wrap items-center gap-2">
        {stages.map((stage) => {
          const active = stage === current;
          return (
            <div key={stage} className="flex items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] transition ${
                  active
                    ? "border-aurora/40 bg-white/[0.09] text-white"
                    : "border-white/10 bg-black/10 text-white/36"
                }`}
              >
                {stage}
              </span>
              {stage !== stages[stages.length - 1] ? <span className="text-white/18">→</span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
