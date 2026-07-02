import Link from "next/link";
import { ProjectContent } from "@/lib/project-content";
import { ProjectStatusBadge } from "@/components/site/project-status-badge";
import { ProjectTagList } from "@/components/site/project-tag-list";

type ProjectCardProps = {
  project: ProjectContent;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const isFlagship = project.tier === "Tier 1" && !compact;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group rounded-[2rem] border border-white/12 bg-white/[0.04] shadow-surface transition duration-300 hover:-translate-y-1 hover:border-aurora/35 hover:bg-white/[0.06] ${
        isFlagship ? "p-7 md:p-8" : "p-5 md:p-6"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">{project.category}</p>
          <h3 className={`font-display text-white ${isFlagship ? "text-4xl" : "text-2xl md:text-3xl"}`}>
            {project.title}
          </h3>
        </div>
        <ProjectStatusBadge status={project.status} />
      </div>

      <p className={`mt-4 text-white/66 ${isFlagship ? "max-w-2xl text-base leading-8" : "text-sm leading-7"}`}>
        {project.summary}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/36">
        <span>{project.stage}</span>
        <span>{project.role}</span>
      </div>

      <div className="mt-6">
        <ProjectTagList tags={project.stack} limit={compact ? 2 : 4} />
      </div>

      <div className={`mt-8 grid gap-4 ${isFlagship ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {project.metrics.slice(0, isFlagship ? 3 : 2).map((metric) => (
          <div key={metric.label} className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
            <p className="font-display text-2xl text-white">{metric.value}</p>
            <p className="mt-2 text-sm leading-6 text-white/56">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.22em] text-white/36">{project.tier}</p>
          <p className="mt-2 truncate text-sm text-white/58">{project.tags.slice(0, 2).join(" / ")}</p>
        </div>
        <span className="shrink-0 text-sm text-aurora transition group-hover:text-white">Open dossier</span>
      </div>
    </Link>
  );
}
