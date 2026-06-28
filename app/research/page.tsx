import { Reveal } from "@/components/motion/reveal";
import { SearchableLibrary } from "@/components/site/searchable-library";
import { SectionIntro } from "@/components/site/section-intro";
import { researchEntries } from "@/lib/site-data";

export default function ResearchPage() {
  const topics = Array.from(new Set(researchEntries.flatMap((entry) => [entry.topic, entry.category])));

  return (
    <div id="main-content" className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16">
      <Reveal>
        <SectionIntro
          eyebrow="Research"
          title="Deep frameworks, technical writing, and future-oriented analysis."
          description="This is the intellectual proof layer. It is separate from the public blog and designed for frameworks, observations, and research-grade thinking rather than content volume."
        />
      </Reveal>
      <Reveal delay={0.06} className="mt-10">
        <SearchableLibrary entries={researchEntries} basePath="/research" topics={topics} />
      </Reveal>
    </div>
  );
}
