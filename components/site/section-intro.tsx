import { cn } from "@/lib/utils";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function SectionIntro({ eyebrow, title, description, className }: SectionIntroProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="mb-4 font-display text-xs uppercase tracking-[0.34em] text-aurora/80">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-[0.95] text-white md:text-5xl">{title}</h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-white/68 md:text-lg">{description}</p>
    </div>
  );
}
