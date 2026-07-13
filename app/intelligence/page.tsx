import { Reveal } from "@/components/motion/reveal";
import { IntelligenceLibrary } from "@/components/site/intelligence-library";
import { getAllIntelligenceEntries, getIntelligenceTopics } from "@/lib/intelligence";

export default async function IntelligencePage() {
  const [entries, topics] = await Promise.all([getAllIntelligenceEntries(), getIntelligenceTopics()]);

  return (
    <div
      id="main-content"
      className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16"
    >
      <Reveal>
        <section className="py-2">
          <p className="text-xs uppercase tracking-[0.26em] text-white/42">Intelligence</p>
          <h1 className="mt-5 font-display text-4xl text-white md:text-6xl">Intelligence</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/62">
            Research, frameworks, essays, and technical writing documenting how I think, build, and make decisions.
          </p>
        </section>
      </Reveal>
      <Reveal delay={0.06} className="mt-8">
        <IntelligenceLibrary entries={entries} topics={topics} />
      </Reveal>
    </div>
  );
}
