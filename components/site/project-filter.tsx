"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/site/project-card";
import { ProjectEntry, ProjectStatus } from "@/lib/project-content";

type ProjectFilterProps = {
  projects: ProjectEntry[];
  initialTag?: string;
};

type SortMode = "Priority" | "Newest stage" | "Status";

const sectionOrder = ["Featured Projects", "Active Work", "Experiments / Learning"] as const;

function groupProjects(projects: ProjectEntry[]) {
  return {
    "Featured Projects": projects.filter((project) => project.tier === "Tier 1"),
    "Active Work": projects.filter((project) => project.tier === "Tier 2"),
    "Experiments / Learning": projects.filter((project) => project.tier === "Tier 3"),
  };
}

function sortProjects(projects: ProjectEntry[], mode: SortMode) {
  const items = [...projects];

  if (mode === "Status") {
    return items.sort((left, right) => left.status.localeCompare(right.status));
  }

  if (mode === "Newest stage") {
    return items.sort((left, right) => new Date(right.updated).getTime() - new Date(left.updated).getTime());
  }

  return items;
}

export function ProjectFilter({ projects, initialTag = "All" }: ProjectFilterProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | "All">("All");
  const [activeTag, setActiveTag] = useState(initialTag);
  const [sortMode, setSortMode] = useState<SortMode>("Priority");

  const categories = Array.from(new Set(projects.map((project) => project.category)));
  const statuses = Array.from(new Set(projects.map((project) => project.status)));
  const tags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort((left, right) =>
    left.localeCompare(right),
  );

  const filtered = useMemo(() => {
    return sortProjects(
      projects.filter((project) => {
        const haystack = [
          project.title,
          project.summary,
          project.category,
          project.status,
          project.positioning,
          project.stack.join(" "),
          project.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase();

        const matchesQuery = haystack.includes(query.toLowerCase());
        const matchesCategory = activeCategory === "All" || project.category === activeCategory;
        const matchesStatus = activeStatus === "All" || project.status === activeStatus;
        const matchesTag = activeTag === "All" || project.tags.includes(activeTag);

        return matchesQuery && matchesCategory && matchesStatus && matchesTag;
      }),
      sortMode,
    );
  }, [activeCategory, activeStatus, activeTag, projects, query, sortMode]);

  const grouped = groupProjects(filtered);

  return (
    <div className="space-y-10">
      <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 xl:grid-cols-[minmax(0,1.1fr),minmax(340px,0.9fr)]">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">Search projects</p>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by project name, stack, domain, or signal..."
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-aurora/40"
          />
          <p className="text-sm leading-7 text-white/56">
            These are proof surfaces, not thumbnails. Open a dossier to inspect decisions, architecture, trust
            layers, and supporting resources.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Category</p>
            {["All", ...categories].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] transition ${
                  activeCategory === category
                    ? "border-aurora/40 bg-white/[0.09] text-white"
                    : "border-white/10 bg-white/[0.04] text-white/56 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Status</p>
            {["All", ...statuses].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setActiveStatus(status as ProjectStatus | "All")}
                className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] transition ${
                  activeStatus === status
                    ? "border-azure/40 bg-white/[0.09] text-white"
                    : "border-white/10 bg-white/[0.04] text-white/56 hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Topics</p>
            {["All", ...tags].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] transition ${
                  activeTag === tag
                    ? "border-ember/40 bg-white/[0.09] text-white"
                    : "border-white/10 bg-white/[0.04] text-white/56 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Sort</p>
            {(["Priority", "Newest stage", "Status"] as SortMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setSortMode(mode)}
                className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] transition ${
                  sortMode === mode
                    ? "border-white/20 bg-white/[0.09] text-white"
                    : "border-white/10 bg-white/[0.04] text-white/56 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {sectionOrder.map((section) => {
          const items = grouped[section];

          if (items.length === 0) {
            return null;
          }

          return (
            <section key={section} className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/42">Curated section</p>
                  <h3 className="mt-2 font-display text-3xl text-white">{section}</h3>
                </div>
                <p className="text-sm text-white/40">{items.length} dossiers</p>
              </div>

              {section === "Featured Projects" ? (
                <div className="grid gap-5 xl:grid-cols-2">
                  {items.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              ) : section === "Active Work" ? (
                <div className="grid gap-5 lg:grid-cols-2">
                  {items.map((project) => (
                    <ProjectCard key={project.slug} project={project} compact />
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                  {items.map((project) => (
                    <ProjectCard key={project.slug} project={project} compact />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
