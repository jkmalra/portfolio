import Link from "next/link";
import { ProjectEntry } from "@/lib/project-content";
import { ProjectStatusBadge } from "@/components/site/project-status-badge";
import { ProjectTagList } from "@/components/site/project-tag-list";

type ProjectCardProps = {
  project: ProjectEntry;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const year = new Date(project.started).getFullYear();

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group rounded-[1.8rem] border border-white/12 bg-white/[0.04] p-5 shadow-surface transition duration-300 hover:-translate-y-1 hover:border-aurora/35 hover:bg-white/[0.06] md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.22em] text-white/42">{project.category}</p>
          <h3 className="mt-3 font-display text-2xl text-white md:text-3xl">{project.title}</h3>
        </div>
        <ProjectStatusBadge status={project.status} />
      </div>

      <p className="mt-4 text-sm leading-7 text-white/64">{project.summary}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.2em] text-white/38">
        <span>{year}</span>
        <span>{project.stack.slice(0, 3).join(" / ")}</span>
      </div>

      <div className="mt-6">
        <ProjectTagList tags={project.stack} limit={compact ? 3 : 3} />
      </div>

      <div className="mt-8 flex items-center justify-end gap-4">
        <span className="shrink-0 text-sm text-aurora transition group-hover:text-white">Open Case Study →</span>
      </div>
    </Link>
  );
}
