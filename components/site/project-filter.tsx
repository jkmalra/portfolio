"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/site/project-card";
import { ProjectEntry, ProjectStatus } from "@/lib/project-content";

type ProjectFilterProps = {
  projects: ProjectEntry[];
  initialTag?: string;
};

type SortMode = "Priority" | "Newest stage" | "Status";
type EssentialCategory =
  | "AI Compliance"
  | "Backend"
  | "Developer Tools"
  | "Research"
  | "Future Technology";
type EssentialStatus = "Research" | "Building" | "Production" | "Archived";

const essentialCategoryOrder: EssentialCategory[] = [
  "AI Compliance",
  "Backend",
  "Developer Tools",
  "Research",
  "Future Technology",
];

const essentialStatusOrder: EssentialStatus[] = ["Research", "Building", "Production", "Archived"];

function mapProjectCategory(project: ProjectEntry): EssentialCategory | null {
  const value = `${project.category} ${project.tags.join(" ")}`.toLowerCase();

  if (value.includes("ai compliance")) {
    return "AI Compliance";
  }

  if (value.includes("backend")) {
    return "Backend";
  }

  if (value.includes("developer tools") || value.includes("internal tools") || value.includes("policy ops")) {
    return "Developer Tools";
  }

  if (value.includes("research")) {
    return "Research";
  }

  if (value.includes("future technology") || value.includes("personal systems")) {
    return "Future Technology";
  }

  return null;
}

function mapProjectStatus(status: ProjectStatus): EssentialStatus {
  if (status === "Research") {
    return "Research";
  }

  if (status === "Archived") {
    return "Archived";
  }

  if (status === "Production" || status === "Maintained") {
    return "Production";
  }

  return "Building";
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
  const [activeCategory, setActiveCategory] = useState<EssentialCategory | "All">("All");
  const [activeStatus, setActiveStatus] = useState<EssentialStatus | "All">("All");
  const [activeTag, setActiveTag] = useState(initialTag);
  const [sortMode, setSortMode] = useState<SortMode>("Priority");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = essentialCategoryOrder.filter((category) =>
    projects.some((project) => mapProjectCategory(project) === category),
  );
  const statuses = essentialStatusOrder.filter((status) =>
    projects.some((project) => mapProjectStatus(project.status) === status),
  );
  const hasActiveFilters =
    activeCategory !== "All" || activeStatus !== "All" || activeTag !== "All" || sortMode !== "Priority";

  const filtered = useMemo(() => {
    return sortProjects(
      projects.filter((project) => {
        const mappedCategory = mapProjectCategory(project);
        const mappedStatus = mapProjectStatus(project.status);
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
        const matchesCategory = activeCategory === "All" || mappedCategory === activeCategory;
        const matchesStatus = activeStatus === "All" || mappedStatus === activeStatus;
        const matchesTag = activeTag === "All" || project.tags.includes(activeTag);

        return matchesQuery && matchesCategory && matchesStatus && matchesTag;
      }),
      sortMode,
    );
  }, [activeCategory, activeStatus, activeTag, projects, query, sortMode]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex-1">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <input
            id="project-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-aurora/40"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((current) => !current)}
            className={`rounded-full border px-4 py-3 text-xs uppercase tracking-[0.24em] transition ${
              filtersOpen || hasActiveFilters
                ? "border-white/20 bg-white/[0.09] text-white"
                : "border-white/10 bg-white/[0.04] text-white/56 hover:text-white"
            }`}
          >
            {filtersOpen ? "Hide Filters" : "Filters"}
          </button>
        </div>
      </div>

      {(filtersOpen || hasActiveFilters) ? (
        <div className="surface-shell p-4 md:p-5">
          <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Category</p>
              {["All", ...categories].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category as EssentialCategory | "All")}
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
                  onClick={() => setActiveStatus(status as EssentialStatus | "All")}
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

            {hasActiveFilters ? (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("All");
                    setActiveStatus("All");
                    setActiveTag(initialTag);
                    setSortMode("Priority");
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/68 transition hover:text-white"
                >
                  Reset filters
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {filtered.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} compact />
          ))}
        </div>
      ) : (
        <div className="surface-shell p-8">
          <p className="font-display text-2xl text-white">No projects match this view.</p>
          <p className="mt-3 text-sm leading-7 text-white/56">Try a broader search or reset the filters.</p>
        </div>
      )}
    </div>
  );
}
