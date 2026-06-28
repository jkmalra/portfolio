import Link from "next/link";
import { Project } from "@/lib/site-data";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-6 shadow-surface transition duration-300 hover:-translate-y-1 hover:border-aurora/35 hover:bg-white/[0.06]"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-aurora/80 to-transparent opacity-60" />
      <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.24em] text-white/45">
        <span>{project.domain}</span>
        <span>{project.status}</span>
      </div>
      <h3 className="mt-8 font-display text-3xl text-white">{project.title}</h3>
      <p className="mt-3 max-w-sm text-sm leading-7 text-white/65">{project.strapline}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.stack.slice(0, 3).map((item) => (
          <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-10 flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.22em] text-white/38">Result signal</p>
          <p className="text-sm text-white/72">{project.metrics[0]?.value} improvement frame</p>
        </div>
        <span className="text-sm text-aurora transition group-hover:text-white">Open dossier</span>
      </div>
    </Link>
  );
}
