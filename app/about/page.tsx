import { Reveal } from "@/components/motion/reveal";
import { SectionIntro } from "@/components/site/section-intro";

export default function AboutPage() {
  return (
    <div id="main-content" className="mx-auto w-[min(1180px,calc(100%-2rem))] py-12 md:w-[min(1180px,calc(100%-3rem))] md:py-16">
      <Reveal>
        <SectionIntro
          eyebrow="About"
          title="A profile built around depth, taste, and future direction."
          description="I build and study the overlap between software execution, AI compliance, research clarity, and future systems thinking. The goal is not only to ship interfaces, but to make high-value work legible, trustworthy, and strategically useful."
        />
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Reveal className="surface-shell p-8">
          <h2 className="font-display text-3xl text-white">What I build</h2>
          <p className="mt-5 text-base leading-8 text-white/66">
            Premium digital systems, future-facing product surfaces, proof-driven case studies, and interfaces that make complex work feel credible instead of cluttered.
          </p>
          <h2 className="mt-10 font-display text-3xl text-white">What I study</h2>
          <p className="mt-5 text-base leading-8 text-white/66">
            AI governance, systems communication, portfolio architecture, explainability patterns, and the future shape of technical trust.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="surface-shell p-8">
          <h2 className="font-display text-3xl text-white">What I stand for</h2>
          <ul className="mt-6 space-y-4 text-base leading-8 text-white/66">
            <li className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
              Future-facing work should still be grounded, readable, and accountable.
            </li>
            <li className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
              Trust is not a compliance afterthought. It is a product and interface discipline.
            </li>
            <li className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
              Strong taste and strong systems thinking belong together.
            </li>
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
