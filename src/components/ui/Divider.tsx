import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  label?: string;
}

export function Divider({ className, label }: DividerProps) {
  if (label) {
    return (
      <div className={cn("relative my-12 flex items-center justify-center", className)}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800/80" />
        </div>
        <span className="relative bg-[#090a0d] px-4 font-mono text-xs uppercase tracking-wider text-slate-500">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "my-12 h-[1px] w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent",
        className
      )}
    />
  );
}
