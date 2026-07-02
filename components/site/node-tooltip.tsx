type NodeTooltipProps = {
  children: string;
};

export function NodeTooltip({ children }: NodeTooltipProps) {
  return (
    <div className="pointer-events-none absolute left-0 top-full z-10 mt-3 hidden w-64 rounded-2xl border border-white/10 bg-[#0b1016]/95 p-3 text-xs leading-6 text-white/62 shadow-[0_18px_60px_rgba(0,0,0,0.32)] group-hover:block group-focus-within:block">
      {children}
    </div>
  );
}
