import { Reveal } from "@/components/motion/reveal";
import { SearchableLibrary } from "@/components/site/searchable-library";
import { SectionIntro } from "@/components/site/section-intro";
import { blogEntries } from "@/lib/site-data";

export default function BlogPage() {
  const topics = Array.from(new Set(blogEntries.flatMap((entry) => [entry.topic, entry.category])));

  return (
    <div id="main-content" className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16">
      <Reveal>
        <SectionIntro
          eyebrow="Blog"
          title="Public writing, updates, and short-form signals."
          description="The blog is intentionally separate from research. It handles outward-facing posts, timely ideas, and public updates while the research layer stays focused on deeper frameworks and technical thought."
        />
      </Reveal>
      <Reveal delay={0.06} className="mt-10">
        <SearchableLibrary entries={blogEntries} basePath="/blog" topics={topics} />
      </Reveal>
    </div>
  );
}
