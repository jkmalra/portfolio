"use client";

import { useMemo, useState } from "react";
import { Project } from "@/lib/site-data";
import { ProjectCard } from "@/components/site/project-card";

type ProjectFilterProps = {
  projects: Project[];
};

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const [activeDomain, setActiveDomain] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");

  const domains = Array.from(new Set(projects.map((project) => project.domain)));
  const statuses = Array.from(new Set(projects.map((project) => project.status)));

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesDomain = activeDomain === "All" || project.domain === activeDomain;
      const matchesStatus = activeStatus === "All" || project.status === activeStatus;
      return matchesDomain && matchesStatus;
    });
  }, [activeDomain, activeStatus, projects]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">Index controls</p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-white/60">
            Filter the work by domain and maturity level to move directly into the right proof surface.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {["All", ...domains].map((domain) => (
            <button
              key={domain}
              type="button"
              onClick={() => setActiveDomain(domain)}
              className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] ${
                activeDomain === domain ? "border-aurora/40 bg-white/[0.09] text-white" : "border-white/10 text-white/56"
              }`}
            >
              {domain}
            </button>
          ))}
          {["All", ...statuses].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setActiveStatus(status)}
              className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] ${
                activeStatus === status ? "border-azure/40 bg-white/[0.09] text-white" : "border-white/10 text-white/56"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
