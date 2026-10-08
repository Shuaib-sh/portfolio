import React from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/MotionPrimitives";

interface SectionHeaderProps {
  eyebrow?: string;
  index?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "dark" | "light";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  theme = "dark",
  className,
}: SectionHeaderProps) {
  const isLight = theme === "light";

  return (
    <FadeIn direction="up" distance={20} className={cn("mb-12 md:mb-16", align === "center" && "text-center mx-auto max-w-2xl", className)}>
      <div className={cn("flex items-center gap-2 mb-3", align === "center" && "justify-center")}>
        {index && (
          <span className={cn(
            "text-xs font-semibold tracking-wider font-mono",
            isLight ? "text-[#0066cc]" : "text-[#2997ff]"
          )}>
            {index}
          </span>
        )}
        {index && eyebrow && <span className={isLight ? "text-slate-300 font-mono text-xs" : "text-white/20 font-mono text-xs"}>/</span>}
        {eyebrow && (
          <span className={cn(
            "text-xs uppercase tracking-widest font-mono",
            isLight ? "text-[#7a7a7a]" : "text-white/60"
          )}>
            {eyebrow}
          </span>
        )}
      </div>

      <h2 className={cn(
        "text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.025em] mb-4 leading-[1.1]",
        isLight ? "text-[#1d1d1f]" : "text-white"
      )}>
        {title}
      </h2>

      {description && (
        <p className={cn(
          "text-[17px] leading-[1.47] font-normal max-w-3xl tracking-[-0.015em]",
          isLight ? "text-[#333333]" : "text-[#cccccc]"
        )}>
          {description}
        </p>
      )}
    </FadeIn>
  );
}
