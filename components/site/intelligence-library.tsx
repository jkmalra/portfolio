"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ConnectedKnowledgeGraph } from "@/components/site/connected-knowledge-graph";
import { ResearchPipeline } from "@/components/site/research-pipeline";
import { SystemsAtlas } from "@/components/site/systems-atlas";
import { IntelligenceEntry } from "@/lib/intelligence";

type IntelligenceLibraryProps = {
  entries: IntelligenceEntry[];
  topics: string[];
  initialTopic?: string;
};

const primaryFilterOrder = [
  "All",
  "AI Compliance",
  "Governance",
  "Systems",
  "Architecture",
  "Future Technology",
  "Software Engineering",
  "Portfolio Design",
  "Research",
  "Open Source",
  "Writing",
  "Decision Making",
  "Frameworks",
] as const;

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

function getLaneGridClasses(lane: string) {
  switch (lane) {
    case "Featured content":
    case "Deep research":
      return "grid gap-4 xl:grid-cols-3";
    case "Latest writing":
      return "grid gap-4 lg:grid-cols-2 xl:grid-cols-3";
    default:
      return "grid gap-4 lg:grid-cols-2";
  }
}

function groupEntries(entries: IntelligenceEntry[]) {
  const featured = entries.filter((entry) => entry.featured || entry.pinned);
  const latestWriting = entries
    .filter((entry) => ["Writing", "Essay", "Opinion"].includes(entry.category))
    .slice(0, 4);
  const frameworks = entries.filter((entry) => entry.category === "Framework");
  const research = entries.filter((entry) => entry.category === "Research");
  const thinking = entries.filter((entry) => ["Thinking", "Note"].includes(entry.category));
  const archived = entries.filter((entry) => entry.status === "Archived");

  return [
    { title: "Featured content", entries: featured },
    { title: "Latest writing", entries: latestWriting },
    { title: "Frameworks", entries: frameworks },
    { title: "Deep research", entries: research },
    { title: "Thinking", entries: thinking },
    { title: "Archived content", entries: archived },
  ].filter((group) => group.entries.length > 0);
}

function entryMatchesAtlas(entry: IntelligenceEntry, atlasFilters: string[]) {
  return atlasFilters.some(
    (filter) =>
      entry.topics.includes(filter) ||
      entry.activity === filter ||
      entry.pipelineCurrent === filter ||
      entry.knowledgeConnections?.some((connection) => connection.kind === filter || connection.label.includes(filter)),
  );
}

function IntelligenceCard({
  entry,
  highlighted = true,
  subdued = false,
}: {
  entry: IntelligenceEntry;
  highlighted?: boolean;
  subdued?: boolean;
}) {
  const router = useRouter();
  const relationshipCount =
    (entry.knowledgeConnections?.length ?? 0) + entry.relatedArticles.length + entry.relatedFrameworks.length;

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/intelligence/${entry.slug}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(`/intelligence/${entry.slug}`);
        }
      }}
      className={`group rounded-[1.75rem] border bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] ${getLayoutClasses(entry.editorialLayout)} ${
        highlighted
          ? "border-aurora/25 shadow-[0_0_0_1px_rgba(159,245,210,0.04)] hover:border-azure/35"
          : "border-white/10 hover:border-white/16"
      } ${subdued ? "opacity-45" : "opacity-100"}`}
    >
      <div className="flex h-full flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40 transition duration-300 group-hover:text-white/58">
          <span>{entry.category}</span>
          <span>{entry.readingTime}</span>
          <span>{entry.status}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-white/48">
          <span className="rounded-full border border-white/10 px-2.5 py-1">{entry.activity}</span>
          <span>{entry.freshness}</span>
          {relationshipCount > 0 ? <span>{relationshipCount} connected items</span> : null}
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
          <p className="max-w-3xl text-sm leading-7 text-white/62">{entry.description}</p>
        </div>

        {entry.pipelineCurrent ? <ResearchPipeline current={entry.pipelineCurrent} /> : null}

        {entry.knowledgeConnections && entry.knowledgeConnections.length > 0 ? (
          <div className="rounded-[1.35rem] border border-white/10 bg-black/10 p-3">
            <ConnectedKnowledgeGraph
              connections={entry.knowledgeConnections.slice(0, 3)}
              compact
              stopPropagation
            />
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="text-xs uppercase tracking-[0.18em] text-white/36">
            {entry.topics[0] ?? "Knowledge"} focus
          </div>
          <span className="translate-x-0 text-sm text-aurora transition duration-300 group-hover:translate-x-1 group-hover:text-white">
            {"Open ->"}
          </span>
        </div>
      </div>
    </article>
  );
}

export function IntelligenceLibrary({ entries, topics, initialTopic = "All" }: IntelligenceLibraryProps) {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<string>(initialTopic);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [atlasDomain, setAtlasDomain] = useState<string | null>(null);
  const [atlasFilters, setAtlasFilters] = useState<string[]>([]);

  const primaryFilters = primaryFilterOrder.filter((filter) => filter === "All" || topics.includes(filter));

  const visibleEntries = useMemo(() => {
    return entries.filter((entry) => {
      const normalized = [
        entry.title,
        entry.description,
        entry.category,
        entry.topics.join(" "),
        entry.activity,
        entry.freshness,
        entry.knowledgeConnections?.map((connection) => `${connection.kind} ${connection.label}`).join(" ") ?? "",
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalized.includes(query.toLowerCase());
      const matchesTopic = activeTopic === "All" || entry.topics.includes(activeTopic);
      const matchesAtlas =
        !atlasDomain ||
        atlasFilters.some(
          (filter) =>
            entry.topics.includes(filter) ||
            entry.activity === filter ||
            entry.pipelineCurrent === filter ||
            entry.knowledgeConnections?.some(
              (connection) => connection.kind === filter || connection.label.includes(filter),
            ),
        );
      const matchesFeatured = !featuredOnly || entry.featured || entry.pinned;

      return matchesQuery && matchesTopic && matchesAtlas && matchesFeatured;
    });
  }, [activeTopic, atlasDomain, atlasFilters, entries, featuredOnly, query]);

  const groupedEntries = groupEntries(visibleEntries);
  const liveSignals = Array.from(new Set(entries.map((entry) => entry.activity))).slice(0, 6);
  const atlasMatchedSlugs = useMemo(() => {
    if (!atlasDomain) {
      return new Set<string>();
    }

    return new Set(entries.filter((entry) => entryMatchesAtlas(entry, atlasFilters)).map((entry) => entry.slug));
  }, [atlasDomain, atlasFilters, entries]);

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
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Browse by topic</p>
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
            {primaryFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveTopic(filter)}
                className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] transition ${
                  activeTopic === filter
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

      <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.08fr),minmax(0,0.92fr)]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">Featured content</p>
          <div className="grid gap-4 xl:grid-cols-2">
            {groupedEntries.find((group) => group.title === "Featured content")?.entries.map((entry) => (
              <IntelligenceCard
                key={entry.slug}
                entry={entry}
                highlighted={!atlasDomain || atlasMatchedSlugs.has(entry.slug)}
                subdued={!!atlasDomain && !atlasMatchedSlugs.has(entry.slug)}
              />
            ))}
          </div>
        </div>

        <SystemsAtlas
          activeDomain={atlasDomain as
            | "AI Compliance"
            | "Software Engineering"
            | "Systems Design"
            | "Future Technology"
            | "Research"
            | "Architecture"
            | "Writing"
            | "Decision Making"
            | "Projects"
            | null}
          entries={entries}
          onSelect={(domain, filters) => {
            setAtlasDomain(domain);
            setAtlasFilters(filters);

            if (!domain) {
              return;
            }

            const matchingPrimaryTopic = filters.find((filter) =>
              primaryFilters.includes(filter as (typeof primaryFilterOrder)[number]),
            );

            if (matchingPrimaryTopic) {
              setActiveTopic(matchingPrimaryTopic);
            }
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {atlasDomain ? (
          <span className="rounded-full border border-aurora/25 bg-white/[0.06] px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/62">
            Atlas focus: {atlasDomain}
          </span>
        ) : null}
        {liveSignals.map((signal) => (
          <span
            key={signal}
            className="rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/44"
          >
            {signal}
          </span>
        ))}
      </div>

      <div className="space-y-8">
        {groupedEntries
          .filter((group) => group.title !== "Featured content")
          .map((group) => (
            <section key={group.title} className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/42">Publishing lane</p>
                  <h3 className="mt-2 font-display text-3xl text-white">{group.title}</h3>
                </div>
                <p className="text-sm text-white/40">{group.entries.length} items</p>
              </div>
              <div className={getLaneGridClasses(group.title)}>
                {group.entries.map((entry) => (
                  <IntelligenceCard
                    key={entry.slug}
                    entry={entry}
                    highlighted={!atlasDomain || atlasMatchedSlugs.has(entry.slug)}
                    subdued={!!atlasDomain && !atlasMatchedSlugs.has(entry.slug)}
                  />
                ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
