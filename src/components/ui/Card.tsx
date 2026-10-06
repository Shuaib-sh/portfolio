import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "glass" | "glow" | "subtle";
  hoverEffect?: boolean;
}

export function Card({
  children,
  className,
  variant = "glass",
  hoverEffect = true,
  ...props
}: CardProps) {
  const variantClasses = {
    glass: "bg-[#11131a]/80 backdrop-blur-md border border-slate-800/80 shadow-xl shadow-black/40",
    glow: "bg-[#11131a]/90 backdrop-blur-md border border-sky-500/25 shadow-lg shadow-sky-500/5",
    default: "bg-[#141720] border border-slate-800",
    subtle: "bg-slate-900/40 border border-slate-800/50",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden group",
        variantClasses[variant],
        hoverEffect && "hover:border-slate-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/5",
        className
      )}
      {...props}
    >
      {/* Subtle top border highlight shine */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-600/30 to-transparent group-hover:via-sky-400/40 transition-colors pointer-events-none" />
      {children}
    </div>
  );
}
