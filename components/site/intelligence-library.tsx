"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IntelligenceEntry } from "@/lib/site-data";

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
  "Research notes",
  "Thinking and opinions",
  "Deep dives",
  "Archived content",
];

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
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">Pinned reading</p>
          {featuredEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/intelligence/${entry.slug}`}
              className="block rounded-[1.85rem] border border-white/10 bg-white/[0.05] p-6 transition hover:-translate-y-1 hover:border-aurora/35"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/40">
                <span>{entry.type}</span>
                <span>{entry.topic}</span>
                <span>{entry.readTime}</span>
                <span>{entry.status}</span>
              </div>
              <h3 className="mt-5 font-display text-3xl text-white">{entry.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/64">{entry.summary}</p>
              <p className="mt-5 text-sm leading-7 text-white/50">{entry.intro}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/48">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <aside className="rounded-[1.85rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">Signal map</p>
          <p className="mt-4 text-sm leading-7 text-white/62">
            This is the intellectual layer of the portfolio: research, public writing, and personal thinking arranged as one editorial system.
          </p>
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
            <p>Featured frameworks for deep proof</p>
            <p>Latest writing for public signal</p>
            <p>Research notes and thinking for long-range identity</p>
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
            <div className="grid gap-4">
              {group.entries.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/intelligence/${entry.slug}`}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-azure/35"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/40">
                        <span>{entry.type}</span>
                        <span>{entry.topic}</span>
                        <span>{entry.readTime}</span>
                        <span>{entry.date}</span>
                        <span>{entry.status}</span>
                      </div>
                      <h4 className="mt-4 font-display text-2xl text-white">{entry.title}</h4>
                      <p className="mt-3 text-sm leading-7 text-white/62">{entry.summary}</p>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2 lg:max-w-xs lg:justify-end">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/48"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
