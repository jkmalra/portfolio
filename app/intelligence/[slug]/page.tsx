import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { ArticleTools } from "@/components/site/article-tools";
import { ConnectedKnowledgeGraph } from "@/components/site/connected-knowledge-graph";
import { ResearchPipeline } from "@/components/site/research-pipeline";
import {
  getAllIntelligenceEntries,
  getIntelligenceEntryBySlug,
  getRelatedIntelligenceEntries,
} from "@/lib/intelligence";

export async function generateStaticParams() {
  const entries = await getAllIntelligenceEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export default async function IntelligenceEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entries = await getAllIntelligenceEntries();
  const currentIndex = entries.findIndex((item) => item.slug === slug);
  const entry = entries[currentIndex];

  if (!entry) {
    notFound();
  }

  const article = await getIntelligenceEntryBySlug(slug);
  const previousEntry = entries[currentIndex - 1];
  const nextEntry = entries[currentIndex + 1];
  const relatedEntries = await getRelatedIntelligenceEntries(entry);

  return (
    <div id="main-content" className="mx-auto w-[min(1240px,calc(100%-2rem))] py-12 md:w-[min(1240px,calc(100%-3rem))] md:py-16">
      <div className="grid gap-6 xl:grid-cols-[0.78fr,1.22fr]">
        <Reveal className="space-y-6">
          <ArticleTools title={entry.title} />

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Activity</p>
            <div className="mt-4 space-y-3 text-sm text-white/62">
              <p>{entry.activity}</p>
              <p>{entry.freshness}</p>
            </div>
          </div>

          {entry.pipelineCurrent ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
              <ResearchPipeline current={entry.pipelineCurrent} />
            </div>
          ) : null}

          {entry.knowledgeConnections && entry.knowledgeConnections.length > 0 ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
              <ConnectedKnowledgeGraph connections={entry.knowledgeConnections} />
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={0.06} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <p className="font-display text-xs uppercase tracking-[0.34em] text-aurora/75">
            {entry.category} · {entry.topics.join(" · ")} · {entry.readingTime} · {entry.publishedDate}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/44">
            <span className="rounded-full border border-white/10 px-3 py-1">{entry.activity}</span>
            <span>{entry.freshness}</span>
            <span>{entry.status}</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.94] text-white md:text-6xl">
            {entry.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/66">{entry.description}</p>

          <div className="mt-10 space-y-10">
            <section>
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Intro</p>
              <p className="mt-4 text-base leading-8 text-white/74">{article.excerpt}</p>
            </section>

            <section>
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Context</p>
              <p className="mt-4 text-base leading-8 text-white/74">
                {entry.description}
              </p>
            </section>

            <section>
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Main body</p>
              <div className="prose prose-invert mt-4 max-w-none prose-p:text-base prose-p:leading-8 prose-headings:font-[var(--font-space-grotesk)] prose-headings:text-white prose-strong:text-white prose-li:text-white/74">
                {article.content}
              </div>
            </section>

            {relatedEntries.length > 0 ? (
              <section>
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">Related articles</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {relatedEntries.map((relatedEntry) => (
                    <Link
                      key={relatedEntry.slug}
                      href={`/intelligence/${relatedEntry.slug}`}
                      className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 transition hover:border-white/20"
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-white/40">{relatedEntry.category}</p>
                      <p className="mt-3 font-display text-2xl text-white">{relatedEntry.title}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="grid gap-4 md:grid-cols-2">
              {previousEntry ? (
                <Link
                  href={`/intelligence/${previousEntry.slug}`}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 transition hover:border-white/20"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">Previous</p>
                  <p className="mt-3 font-display text-2xl text-white">{previousEntry.title}</p>
                </Link>
              ) : (
                <div className="rounded-[1.5rem] border border-white/10 bg-black/10 p-4 text-sm text-white/30">
                  Start of archive
                </div>
              )}

              {nextEntry ? (
                <Link
                  href={`/intelligence/${nextEntry.slug}`}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 transition hover:border-white/20"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">Next</p>
                  <p className="mt-3 font-display text-2xl text-white">{nextEntry.title}</p>
                </Link>
              ) : (
                <div className="rounded-[1.5rem] border border-white/10 bg-black/10 p-4 text-sm text-white/30">
                  End of archive
                </div>
              )}
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
