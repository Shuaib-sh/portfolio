import React from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/MotionPrimitives";

interface SectionHeaderProps {
  eyebrow?: string;
  index?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <FadeIn direction="up" distance={20} className={cn("mb-12 md:mb-16", align === "center" && "text-center mx-auto max-w-2xl", className)}>
      <div className={cn("flex items-center gap-2 mb-3", align === "center" && "justify-center")}>
        {index && (
          <span className="font-mono text-xs font-semibold text-sky-400 tracking-wider">
            {index}
          </span>
        )}
        {index && eyebrow && <span className="text-slate-700 font-mono text-xs">/</span>}
        {eyebrow && (
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
            {eyebrow}
          </span>
        )}
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
        {title}
      </h2>

      {description && (
        <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
    </FadeIn>
  );
}
