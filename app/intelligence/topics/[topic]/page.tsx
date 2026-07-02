import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { IntelligenceLibrary } from "@/components/site/intelligence-library";
import { SectionIntro } from "@/components/site/section-intro";
import {
  getAllIntelligenceEntries,
  getEntriesByTopic,
  getIntelligenceTopics,
  getTopicFromSlug,
  topicToSlug,
} from "@/lib/intelligence";

export async function generateStaticParams() {
  const topics = await getIntelligenceTopics();
  return topics.map((topic) => ({ topic: topicToSlug(topic) }));
}

export default async function IntelligenceTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;
  const topic = await getTopicFromSlug(topicSlug);

  if (!topic) {
    notFound();
  }

  const [entries, topics] = await Promise.all([getEntriesByTopic(topic), getIntelligenceTopics()]);
  const allEntries = await getAllIntelligenceEntries();

  return (
    <div id="main-content" className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16">
      <Reveal>
        <SectionIntro
          eyebrow="Topic view"
          title={`${topic} knowledge surface`}
          description={`This view isolates intelligence related to ${topic} while keeping the full publishing system available for broader browsing.`}
        />
      </Reveal>
      <Reveal delay={0.06} className="mt-10">
        <IntelligenceLibrary entries={allEntries.filter((entry) => entries.some((item) => item.slug === entry.slug))} topics={topics} initialTopic={topic} />
      </Reveal>
    </div>
  );
}
