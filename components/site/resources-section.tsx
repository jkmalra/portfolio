import Link from "next/link";

type ResourcesSectionProps = {
  resources: { label: string; href: string }[];
};

export function ResourcesSection({ resources }: ResourcesSectionProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {resources.map((resource) => (
        <Link
          key={resource.href}
          href={resource.href}
          className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4 text-sm text-white/72 transition hover:border-aurora/30"
        >
          {resource.label}
        </Link>
      ))}
    </div>
  );
}
