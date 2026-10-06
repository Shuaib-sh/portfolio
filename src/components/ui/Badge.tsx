import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "sky" | "indigo" | "emerald" | "slate" | "outline" | "mono";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className,
  variant = "slate",
  size = "md",
  ...props
}: BadgeProps) {
  const variantClasses = {
    sky: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    indigo: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    slate: "bg-slate-800/60 text-slate-300 border border-slate-700/60",
    outline: "bg-transparent text-slate-300 border border-slate-700 hover:border-slate-600",
    mono: "bg-slate-900/90 text-slate-300 border border-slate-800 font-mono text-xs",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md font-medium tracking-wide transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
