type AtlasEdgeProps = {
  active?: boolean;
};

export function AtlasEdge({ active = false }: AtlasEdgeProps) {
  return (
    <div className="flex h-8 items-center justify-center" aria-hidden="true">
      <div className={`h-full w-px transition duration-300 ${active ? "bg-aurora/45" : "bg-white/10"}`} />
    </div>
  );
}
