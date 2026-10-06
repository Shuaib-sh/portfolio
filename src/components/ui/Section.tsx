import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  hasPattern?: boolean;
  hasGlow?: boolean;
  glowColor?: "sky" | "indigo" | "emerald";
}

export function Section({
  children,
  className,
  id,
  hasPattern = false,
  hasGlow = false,
  glowColor = "sky",
  ...props
}: SectionProps) {
  const glowClasses = {
    sky: "bg-sky-500/5",
    indigo: "bg-indigo-500/5",
    emerald: "bg-emerald-500/5",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative py-20 sm:py-28 md:py-32 w-full overflow-hidden",
        hasPattern && "grid-pattern",
        className
      )}
      {...props}
    >
      {hasGlow && (
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none -z-10",
            glowClasses[glowColor]
          )}
        />
      )}
      {children}
    </section>
  );
}
