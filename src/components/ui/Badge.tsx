import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "primary" | "sky" | "dark" | "pearl" | "hairline" | "mono";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className,
  variant = "hairline",
  size = "md",
  ...props
}: BadgeProps) {
  const variantClasses = {
    primary: "bg-[#0066cc]/15 text-[#2997ff] border border-[#0066cc]/30",
    sky: "bg-[#2997ff]/10 text-[#2997ff] border border-[#2997ff]/20",
    dark: "bg-[#1d1d1f] text-[#ffffff] border border-white/10",
    pearl: "bg-[#fafafc] text-[#1d1d1f] border border-[#e0e0e0]",
    hairline: "bg-white/5 text-slate-300 border border-white/15",
    mono: "bg-[#1d1d1f] text-slate-300 border border-white/10 font-mono text-[11px]",
  };

  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-xs rounded-full",
    md: "px-3 py-1 text-xs rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-normal tracking-tight transition-colors select-none",
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
