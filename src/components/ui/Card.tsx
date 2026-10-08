import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "darkTile" | "lightTile" | "pearl" | "subtle";
  hoverEffect?: boolean;
}

export function Card({
  children,
  className,
  variant = "darkTile",
  hoverEffect = true,
  ...props
}: CardProps) {
  const variantClasses = {
    // Apple Dark Surface Tile
    darkTile: "bg-[#272729] text-white border border-white/10",
    // Apple Light Store Utility Card
    lightTile: "bg-[#ffffff] text-[#1d1d1f] border border-[#e0e0e0]",
    // Apple Parchment Card
    pearl: "bg-[#fafafc] text-[#1d1d1f] border border-[#e0e0e0]",
    // Apple Subtle Dark Card
    default: "bg-[#1d1d1f] text-white border border-white/10",
    subtle: "bg-white/5 text-white border border-white/10",
  };

  return (
    <div
      className={cn(
        "rounded-[18px] p-6 sm:p-8 transition-all duration-200 relative overflow-hidden group",
        variantClasses[variant],
        hoverEffect && "hover:border-white/20 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
