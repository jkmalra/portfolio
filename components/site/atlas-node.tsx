"use client";

import { motion } from "framer-motion";
import { AtlasStageNode } from "@/lib/systems-atlas";
import { NodeTooltip } from "@/components/site/node-tooltip";

type AtlasNodeProps = {
  node: AtlasStageNode;
  active?: boolean;
  selected?: boolean;
  subdued?: boolean;
  onClick?: () => void;
};

export function AtlasNode({ node, active = false, selected = false, subdued = false, onClick }: AtlasNodeProps) {
  return (
    <div className="group relative">
      <motion.button
        type="button"
        layout
        whileHover={{ y: -2 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClick}
        className={`w-full rounded-[1.35rem] border px-4 py-4 text-left transition duration-300 ${
          selected
            ? "border-aurora/45 bg-white/[0.08] shadow-[0_0_0_1px_rgba(159,245,210,0.06)]"
            : active
              ? "border-white/18 bg-white/[0.06]"
              : "border-white/10 bg-white/[0.03]"
        } ${subdued ? "opacity-45" : "opacity-100"}`}
      >
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">{node.kind}</p>
        <h4 className="mt-3 font-display text-lg leading-none text-white">{node.shortLabel ?? node.label}</h4>
      </motion.button>
      <NodeTooltip>{node.description}</NodeTooltip>
    </div>
  );
}
