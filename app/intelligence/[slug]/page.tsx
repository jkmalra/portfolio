import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { ArticleTools } from "@/components/site/article-tools";
import { ResearchPipeline } from "@/components/site/research-pipeline";
import { intelligenceEntries } from "@/lib/site-data";

export function generateStaticParams() {
  return intelligenceEntries.map((entry) => ({ slug: entry.slug }));
}

export default async function IntelligenceEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = intelligenceEntries.findIndex((item) => item.slug === slug);
  const entry = intelligenceEntries[currentIndex];

  if (!entry) {
    notFound();
  }

  const previousEntry = intelligenceEntries[currentIndex - 1];
  const nextEntry = intelligenceEntries[currentIndex + 1];

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

          {entry.pipeline ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
              <ResearchPipeline current={entry.pipeline.current} />
            </div>
          ) : null}

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Tags</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {entry.relatedLinks && entry.relatedLinks.length > 0 ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Related links</p>
              <div className="mt-4 grid gap-3">
                {entry.relatedLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/76">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={0.06} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <p className="font-display text-xs uppercase tracking-[0.34em] text-aurora/75">
            {entry.type} · {entry.topic} · {entry.readTime} · {entry.date}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/44">
            <span className="rounded-full border border-white/10 px-3 py-1">{entry.activity}</span>
            <span>{entry.freshness}</span>
            <span>{entry.status}</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.94] text-white md:text-6xl">
            {entry.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/66">{entry.summary}</p>

          <div className="mt-10 space-y-10">
            <section>
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Intro</p>
              <p className="mt-4 text-base leading-8 text-white/74">{entry.intro}</p>
            </section>

            <section>
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Context</p>
              <p className="mt-4 text-base leading-8 text-white/74">{entry.context}</p>
            </section>

            <section>
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Main body</p>
              <div className="mt-4 space-y-6 text-base leading-8 text-white/74">
                {entry.body.map((paragraph, index) => (
                  <div
                    key={paragraph}
                    className={index === 1 ? "rounded-[1.5rem] border border-white/10 bg-black/20 p-5" : undefined}
                  >
                    <p>{paragraph}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Key takeaways</p>
              <ul className="mt-4 space-y-4 text-base leading-8 text-white/74">
                {entry.keyTakeaways.map((item) => (
                  <li key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {entry.references && entry.references.length > 0 ? (
              <section>
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">References</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/60">
                  {entry.references.map((reference) => (
                    <li key={reference}>{reference}</li>
                  ))}
                </ul>
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
