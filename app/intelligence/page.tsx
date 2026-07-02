import { Reveal } from "@/components/motion/reveal";
import { IntelligenceLibrary } from "@/components/site/intelligence-library";
import { SectionIntro } from "@/components/site/section-intro";
import { getAllIntelligenceEntries, getIntelligenceTopics } from "@/lib/intelligence";

export default async function IntelligencePage() {
  const [entries, topics] = await Promise.all([getAllIntelligenceEntries(), getIntelligenceTopics()]);

  return (
    <div id="main-content" className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16">
      <Reveal>
        <SectionIntro
          eyebrow="Intelligence"
          title="Research, writing, and thinking arranged as one calm editorial system."
          description="This is the intellectual layer of the portfolio. It combines published research, public writing, technical notes, frameworks, and future-facing thinking into a single premium knowledge surface."
        />
      </Reveal>
      <Reveal delay={0.06} className="mt-10">
        <IntelligenceLibrary entries={entries} topics={topics} />
      </Reveal>
    </div>
  );
}
