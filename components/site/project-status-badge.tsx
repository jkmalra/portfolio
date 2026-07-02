import { ProjectStatus } from "@/lib/project-content";

type ProjectStatusBadgeProps = {
  status: ProjectStatus;
};

const statusStyles: Record<ProjectStatus, string> = {
  Research: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  Prototype: "border-azure/20 bg-azure/10 text-azure-100",
  Alpha: "border-sky-300/20 bg-sky-300/10 text-sky-100",
  Beta: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
  Production: "border-aurora/20 bg-aurora/10 text-aurora",
  Maintained: "border-white/15 bg-white/[0.06] text-white/82",
  Archived: "border-white/10 bg-white/[0.03] text-white/46",
};

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
