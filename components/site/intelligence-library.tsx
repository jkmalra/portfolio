"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IntelligenceEntry } from "@/lib/site-data";
import { ResearchPipeline } from "@/components/site/research-pipeline";

type IntelligenceLibraryProps = {
  entries: IntelligenceEntry[];
};

const filterLabels = [
  "All",
  "Research",
  "Blog",
  "Thinking",
  "AI Compliance",
  "Future Technology",
  "Systems",
  "Writing",
  "Frameworks",
] as const;

const laneOrder: IntelligenceEntry["lane"][] = [
  "Featured frameworks",
  "Latest writing",
  "Deep dives",
  "Research notes",
  "Thinking and opinions",
  "Archived content",
];

function getLayoutClasses(layout: IntelligenceEntry["editorialLayout"]) {
  switch (layout) {
    case "featured":
      return "lg:col-span-2 xl:col-span-2 p-7 md:p-8";
    case "wide":
      return "lg:col-span-2 p-6";
    case "deep":
      return "lg:col-span-2 xl:col-span-2 p-7";
    case "compact":
      return "p-5";
    case "minimal":
      return "p-4";
    default:
      return "p-5";
  }
}

function getLaneGridClasses(lane: IntelligenceEntry["lane"]) {
  switch (lane) {
    case "Featured frameworks":
    case "Deep dives":
      return "grid gap-4 xl:grid-cols-3";
    case "Latest writing":
      return "grid gap-4 lg:grid-cols-2 xl:grid-cols-3";
    case "Thinking and opinions":
      return "grid gap-4 lg:grid-cols-2";
    default:
      return "grid gap-4 lg:grid-cols-2";
  }
}

function IntelligenceCard({ entry }: { entry: IntelligenceEntry }) {
  const relationshipCount = (entry.relatedLinks?.length ?? 0) + (entry.references?.length ?? 0);

  return (
    <Link
      href={`/intelligence/${entry.slug}`}
      className={`group rounded-[1.75rem] border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-azure/35 hover:bg-white/[0.06] ${getLayoutClasses(entry.editorialLayout)}`}
    >
      <div className="flex h-full flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40 transition duration-300 group-hover:text-white/58">
          <span>{entry.type}</span>
          <span>{entry.topic}</span>
          <span>{entry.readTime}</span>
          <span>{entry.status}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-white/48">
          <span className="rounded-full border border-white/10 px-2.5 py-1">{entry.activity}</span>
          <span>{entry.freshness}</span>
          {relationshipCount > 0 ? <span>{relationshipCount} related links</span> : null}
        </div>

        <div className="space-y-3">
          <h4
            className={`font-display text-white ${
              entry.editorialLayout === "featured" || entry.editorialLayout === "deep"
                ? "text-3xl md:text-4xl"
                : entry.editorialLayout === "wide"
                  ? "text-3xl"
                  : "text-2xl"
            }`}
          >
            {entry.title}
          </h4>
          <p className="max-w-3xl text-sm leading-7 text-white/62">{entry.summary}</p>
        </div>

        {entry.pipeline ? <ResearchPipeline current={entry.pipeline.current} /> : null}

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {entry.tags.slice(0, entry.editorialLayout === "minimal" ? 2 : 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/46"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="translate-x-0 text-sm text-aurora transition duration-300 group-hover:translate-x-1 group-hover:text-white">
            Open →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function IntelligenceLibrary({ entries }: IntelligenceLibraryProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filterLabels)[number]>("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const visibleEntries = useMemo(() => {
    return entries.filter((entry) => {
      const normalized = [
        entry.title,
        entry.summary,
        entry.intro,
        entry.topic,
        entry.type,
        entry.tags.join(" "),
        entry.activity,
        entry.freshness,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalized.includes(query.toLowerCase());
      const matchesFilter =
        activeFilter === "All" ||
        entry.type === activeFilter ||
        entry.topic === activeFilter ||
        entry.tags.includes(activeFilter);
      const matchesFeatured = !featuredOnly || entry.featured || entry.pinned;

      return matchesQuery && matchesFilter && matchesFeatured;
    });
  }, [activeFilter, entries, featuredOnly, query]);

  const featuredEntries = visibleEntries.filter((entry) => entry.pinned || entry.featured).slice(0, 3);
  const groupedEntries = laneOrder
    .map((lane) => ({
      lane,
      entries: visibleEntries.filter((entry) => entry.lane === lane),
    }))
    .filter((group) => group.entries.length > 0);

  const majorTags = Array.from(new Set(entries.flatMap((entry) => entry.tags))).slice(0, 10);
  const liveSignals = Array.from(new Set(entries.map((entry) => entry.activity))).slice(0, 6);

  return (
    <div className="space-y-10">
      <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 xl:grid-cols-[1.1fr,0.9fr]">
        <label className="space-y-3">
          <span className="text-xs uppercase tracking-[0.24em] text-white/42">Search intelligence</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, topic, framework, or keyword..."
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-aurora/40"
          />
        </label>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Filters</p>
            <button
              type="button"
              onClick={() => setFeaturedOnly((current) => !current)}
              className={`rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.22em] transition ${
                featuredOnly
                  ? "border-aurora/40 bg-white/[0.09] text-white"
                  : "border-white/10 bg-white/[0.04] text-white/56 hover:text-white"
              }`}
            >
              Featured only
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterLabels.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] transition ${
                  activeFilter === filter
                    ? "border-aurora/40 bg-white/[0.09] text-white"
                    : "border-white/10 bg-white/[0.04] text-white/56 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.08fr,0.92fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">Featured content</p>
          <div className="grid gap-4 xl:grid-cols-2">
            {featuredEntries.map((entry) => (
              <IntelligenceCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>

        <aside className="rounded-[1.85rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">Signal map</p>
          <p className="mt-4 text-sm leading-7 text-white/62">
            This is the intellectual layer of the portfolio: research, public writing, and personal thinking arranged as one editorial system.
          </p>
          <div className="mt-8 space-y-3">
            <p className="text-xs uppercase tracking-[0.22em] text-white/36">Living activity</p>
            <div className="flex flex-wrap gap-2">
              {liveSignals.map((signal) => (
                <span key={signal} className="rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/50">
                  {signal}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {majorTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/50 transition hover:text-white"
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="mt-8 space-y-3 text-sm text-white/54">
            <p>Featured content appears first, then recent updates, then deeper frameworks and notes.</p>
            <p>Activity and pipeline signals show how ideas move toward publication and project application.</p>
          </div>
        </aside>
      </div>

      <div className="space-y-8">
        {groupedEntries.map((group) => (
          <section key={group.lane} className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">Content lane</p>
                <h3 className="mt-2 font-display text-3xl text-white">{group.lane}</h3>
              </div>
              <p className="text-sm text-white/40">{group.entries.length} items</p>
            </div>
            <div className={getLaneGridClasses(group.lane)}>
              {group.entries.map((entry) => (
                <IntelligenceCard key={entry.slug} entry={entry} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
