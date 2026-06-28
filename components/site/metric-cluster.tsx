type MetricClusterProps = {
  metrics: { label: string; value: string }[];
};

export function MetricCluster({ metrics }: MetricClusterProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <article key={metric.label} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
          <p className="font-display text-3xl text-white">{metric.value}</p>
          <p className="mt-2 text-sm leading-7 text-white/60">{metric.label}</p>
        </article>
      ))}
    </div>
  );
}
