import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { MetricCluster } from "@/components/site/metric-cluster";
import { projects } from "@/lib/site-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div id="main-content" className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16">
      <Reveal className="grid gap-6 xl:grid-cols-[0.82fr,1.18fr]">
        <aside className="surface-shell h-fit p-6 md:sticky md:top-24">
          <p className="font-display text-xs uppercase tracking-[0.34em] text-aurora/75">{project.domain}</p>
          <h1 className="mt-6 font-display text-4xl leading-none text-white md:text-5xl">{project.title}</h1>
          <p className="mt-4 text-base leading-8 text-white/64">{project.strapline}</p>

          <div className="mt-8 space-y-3 text-sm text-white/60">
            <p>Type: {project.type}</p>
            <p>Status: {project.status}</p>
            <p>Period: {project.year}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/52">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-3">
            <Link href={project.links.code} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/78">
              View code
            </Link>
            <Link href={project.links.report} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/78">
              Open report
            </Link>
            <Link href={project.links.live} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/78">
              Live demo
            </Link>
            <Link href={project.links.video} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/78">
              Video demo
            </Link>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="surface-shell overflow-hidden p-8">
            <p className="font-display text-xs uppercase tracking-[0.34em] text-azure/80">Interactive evidence zone</p>
            <div className="mt-6 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(109,211,255,0.16),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.02))] p-8">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">Signal layer</p>
                  <p className="mt-3 text-sm text-white/72">Animated system state and proof navigation placeholder.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">Diagram slot</p>
                  <p className="mt-3 text-sm text-white/72">Reserved for screenshots, graphs, or architecture diagrams.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">Demo rail</p>
                  <p className="mt-3 text-sm text-white/72">Reserved for live embeds, walkthrough animation, or video capture.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="surface-shell p-8">
            <p className="font-display text-xs uppercase tracking-[0.34em] text-aurora/75">Results</p>
            <div className="mt-6">
              <MetricCluster metrics={project.metrics} />
            </div>
          </section>

          <section className="surface-shell p-8">
            <p className="font-display text-xs uppercase tracking-[0.34em] text-white/48">Problem → Context → Build → Why it matters</p>
            <div className="mt-8 grid gap-8">
              <article>
                <h2 className="font-display text-3xl text-white">Challenge</h2>
                <p className="mt-4 text-base leading-8 text-white/64">{project.challenge}</p>
              </article>
              <article>
                <h2 className="font-display text-3xl text-white">Context</h2>
                <p className="mt-4 text-base leading-8 text-white/64">{project.context}</p>
              </article>
              <article>
                <h2 className="font-display text-3xl text-white">What I built</h2>
                <ul className="mt-4 space-y-4 text-base leading-8 text-white/64">
                  {project.built.map((item) => (
                    <li key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
              <article>
                <h2 className="font-display text-3xl text-white">Why it matters</h2>
                <p className="mt-4 text-base leading-8 text-white/64">{project.whyItMatters}</p>
              </article>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="surface-shell p-8">
              <h2 className="font-display text-3xl text-white">Results</h2>
              <ul className="mt-6 space-y-4 text-base leading-8 text-white/64">
                {project.results.map((item) => (
                  <li key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="surface-shell p-8">
              <h2 className="font-display text-3xl text-white">Proof</h2>
              <ul className="mt-6 space-y-4 text-base leading-8 text-white/64">
                {project.proof.map((item) => (
                  <li key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      </Reveal>
    </div>
  );
}
