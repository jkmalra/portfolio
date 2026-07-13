"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IntelligenceEntry } from "@/lib/intelligence";

type IntelligenceLibraryProps = {
  entries: IntelligenceEntry[];
  topics: string[];
  initialTopic?: string;
};

type EntryType = "Essay" | "Framework" | "Research" | "Note";
type EntryStatus = "Published" | "Draft" | "In Review";

const topicFilters = ["AI Compliance", "Systems", "Architecture", "Portfolio Design", "Governance"] as const;
const typeFilters: EntryType[] = ["Essay", "Framework", "Research", "Note"];
const statusFilters: EntryStatus[] = ["Published", "Draft", "In Review"];

function getEntryType(entry: IntelligenceEntry): EntryType {
  if (entry.category === "Framework") {
    return "Framework";
  }

  if (entry.category === "Research") {
    return "Research";
  }

  if (entry.category === "Thinking" || entry.category === "Note") {
    return "Note";
  }

  return "Essay";
}

function getEntryStatus(entry: IntelligenceEntry): EntryStatus | "Archived" {
  if (entry.activity === "In review") {
    return "In Review";
  }

  return entry.status;
}

function formatUpdatedDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getLaneGridClasses(lane: string) {
  if (lane === "Latest Writing") {
    return "grid gap-4 lg:grid-cols-2 xl:grid-cols-3";
  }

  return "grid gap-4 lg:grid-cols-2";
}

function groupEntries(entries: IntelligenceEntry[]) {
  const latestWriting = entries.filter((entry) => ["Writing", "Essay", "Opinion"].includes(entry.category));
  const frameworks = entries.filter((entry) => entry.category === "Framework");
  const research = entries.filter((entry) => entry.category === "Research");
  const thinking = entries.filter((entry) => ["Thinking", "Note"].includes(entry.category));

  return [
    { title: "Latest Writing", entries: latestWriting },
    { title: "Frameworks", entries: frameworks },
    { title: "Deep Research", entries: research },
    { title: "Thinking Notes", entries: thinking },
  ].filter((group) => group.entries.length > 0);
}

function IntelligenceCard({ entry }: { entry: IntelligenceEntry }) {
  return (
    <Link
      href={`/intelligence/${entry.slug}`}
      className="group block rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-azure/35 hover:bg-white/[0.06]"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.22em] text-white/42">{getEntryType(entry)}</p>
        <span className="shrink-0 text-xs text-white/38">{entry.readingTime}</span>
      </div>

      <h3 className="mt-4 font-display text-2xl leading-tight text-white">{entry.title}</h3>
      <p className="mt-3 line-clamp-2 text-sm leading-7 text-white/62">{entry.description}</p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-xs text-white/38">Updated {formatUpdatedDate(entry.updatedDate)}</span>
        <span className="shrink-0 text-sm text-aurora transition group-hover:text-white">Open -&gt;</span>
      </div>
    </Link>
  );
}

export function IntelligenceLibrary({ entries, topics, initialTopic = "All" }: IntelligenceLibraryProps) {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<EntryType | "All">("All");
  const [activeTopic, setActiveTopic] = useState<string>(initialTopic);
  const [activeStatus, setActiveStatus] = useState<EntryStatus | "All">("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const availableTopics = topicFilters.filter((topic) => topics.includes(topic));
  const hasActiveFilters = activeType !== "All" || activeTopic !== "All" || activeStatus !== "All";

  const visibleEntries = useMemo(() => {
    return entries.filter((entry) => {
      const normalized = [
        entry.title,
        entry.description,
        entry.category,
        entry.topics.join(" "),
        entry.relatedFrameworks.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalized.includes(query.toLowerCase());
      const matchesType = activeType === "All" || getEntryType(entry) === activeType;
      const matchesTopic = activeTopic === "All" || entry.topics.includes(activeTopic);
      const matchesStatus = activeStatus === "All" || getEntryStatus(entry) === activeStatus;

      return matchesQuery && matchesType && matchesTopic && matchesStatus;
    });
  }, [activeStatus, activeTopic, activeType, entries, query]);

  const groupedEntries = groupEntries(visibleEntries);

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex-1">
          <label htmlFor="intelligence-search" className="sr-only">
            Search articles, frameworks, notes
          </label>
          <input
            id="intelligence-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles, frameworks, notes..."
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-aurora/40"
          />
        </div>
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

      {filtersOpen || hasActiveFilters ? (
        <div className="surface-shell p-4 md:p-5">
          <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Type</p>
              {["All", ...typeFilters].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type as EntryType | "All")}
                  className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] transition ${
                    activeType === type
                      ? "border-aurora/40 bg-white/[0.09] text-white"
                      : "border-white/10 bg-white/[0.04] text-white/56 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Topic</p>
              {["All", ...availableTopics].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setActiveTopic(topic)}
                  className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] transition ${
                    activeTopic === topic
                      ? "border-azure/40 bg-white/[0.09] text-white"
                      : "border-white/10 bg-white/[0.04] text-white/56 hover:text-white"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Status</p>
              {["All", ...statusFilters].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setActiveStatus(status as EntryStatus | "All")}
                  className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] transition ${
                    activeStatus === status
                      ? "border-white/20 bg-white/[0.09] text-white"
                      : "border-white/10 bg-white/[0.04] text-white/56 hover:text-white"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {hasActiveFilters ? (
              <button
                type="button"
                onClick={() => {
                  setActiveType("All");
                  setActiveTopic(initialTopic);
                  setActiveStatus("All");
                }}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/68 transition hover:text-white"
              >
                Reset filters
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div id="intelligence-results" className="space-y-14">
        {groupedEntries.length > 0 ? (
          groupedEntries.map((group) => (
            <section key={group.title} className="space-y-5">
              <h2 className="font-display text-3xl text-white">{group.title}</h2>
              <div className={getLaneGridClasses(group.title)}>
                {group.entries.map((entry) => (
                  <IntelligenceCard key={entry.slug} entry={entry} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="surface-shell p-8">
            <p className="font-display text-2xl text-white">No writing matches this view.</p>
            <p className="mt-3 text-sm leading-7 text-white/56">Try a broader search or reset the filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
