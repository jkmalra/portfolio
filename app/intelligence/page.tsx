import { Reveal } from "@/components/motion/reveal";
import { IntelligenceLibrary } from "@/components/site/intelligence-library";
import { SectionIntro } from "@/components/site/section-intro";
import { intelligenceEntries } from "@/lib/site-data";

export default function IntelligencePage() {
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
        <IntelligenceLibrary entries={intelligenceEntries} />
      </Reveal>
    </div>
  );
}
