"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "pearl" | "darkUtility";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  magnetic?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  magnetic = false,
  icon,
  iconPosition = "right",
  disabled,
  ...props
}: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!magnetic || shouldReduceMotion) return;
    const { clientX, clientY } = e;
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.12, y: middleY * 0.12 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses =
    "inline-flex items-center justify-center font-normal transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] active:scale-[0.95] apple-press";

  const variantClasses = {
    // Apple Action Blue Primary Pill
    primary:
      "bg-[#0066cc] text-white hover:bg-[#0071e3] rounded-full",
    // Apple Secondary Ghost Pill (on dark tiles uses #2997ff)
    secondary:
      "bg-transparent text-[#2997ff] border border-[#2997ff] hover:bg-[#2997ff]/10 rounded-full",
    outline:
      "bg-transparent text-white border border-white/25 hover:border-white/50 hover:bg-white/5 rounded-full",
    pearl:
      "bg-[#fafafc] text-[#333333] border border-[#e0e0e0] hover:bg-[#ffffff] rounded-[11px]",
    darkUtility:
      "bg-[#1d1d1f] text-white hover:bg-[#2d2d30] rounded-[8px]",
    ghost:
      "bg-transparent text-[#2997ff] hover:text-[#0071e3] rounded-full",
  };

  const sizeClasses = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-[15px] sm:text-[17px] px-[22px] py-[11px] gap-2",
    lg: "text-[17px] px-7 py-3 gap-2.5",
  };

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>
      )}
    </>
  );

  const combinedClasses = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        <Link href={href} className={combinedClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={combinedClasses}
      disabled={disabled}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
}
