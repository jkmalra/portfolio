"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { WritingEntry } from "@/lib/site-data";

type SearchableLibraryProps = {
  entries: WritingEntry[];
  basePath: "/research" | "/blog";
  topics: string[];
};

export function SearchableLibrary({ entries, basePath, topics }: SearchableLibraryProps) {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState("All");

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      const matchesTopic = activeTopic === "All" || entry.topic === activeTopic || entry.category === activeTopic;
      const normalized = `${entry.title} ${entry.summary} ${entry.topic} ${entry.category}`.toLowerCase();
      const matchesQuery = normalized.includes(query.toLowerCase());
      return matchesTopic && matchesQuery;
    });
  }, [activeTopic, entries, query]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 lg:grid-cols-[1.3fr,0.7fr]">
        <label className="space-y-3">
          <span className="text-xs uppercase tracking-[0.24em] text-white/42">Search library</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, topic, or framework..."
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-aurora/40"
          />
        </label>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">Reading categories</p>
          <div className="flex flex-wrap gap-2">
            {["All", ...topics].map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setActiveTopic(topic)}
                className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] transition ${
                  activeTopic === topic
                    ? "border-aurora/40 bg-white/[0.09] text-white"
                    : "border-white/10 bg-white/[0.04] text-white/56 hover:text-white"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((entry) => (
          <Link
            key={entry.slug}
            href={`${basePath}/${entry.slug}`}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-azure/35"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-white/40">
              {entry.category} · {entry.readTime}
            </p>
            <h3 className="mt-5 font-display text-2xl text-white">{entry.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/62">{entry.summary}</p>
            <div className="mt-8 flex items-center justify-between text-sm text-white/48">
              <span>{entry.topic}</span>
              <span className="text-aurora">Read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
