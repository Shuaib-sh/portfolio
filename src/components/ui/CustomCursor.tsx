"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "interactive" | "view" | "external">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid, zero-lag trailing
  const springX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    // Disable completely on touch devices or if reduced motion is requested
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("button, a, input, textarea, [data-cursor]");
      if (interactiveEl) {
        const cursorAttr = interactiveEl.getAttribute("data-cursor");
        if (cursorAttr === "view") {
          setCursorType("view");
        } else if (cursorAttr === "external" || (interactiveEl.tagName === "A" && interactiveEl.getAttribute("target") === "_blank")) {
          setCursorType("external");
        } else {
          setCursorType("interactive");
        }
      } else {
        setCursorType("default");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Central pinpoint dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-sky-400 mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorType === "default" ? 6 : 8,
          height: cursorType === "default" ? 6 : 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing follower ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full border border-sky-400/40 bg-sky-500/[0.04] backdrop-blur-[1px]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "default" ? 32 : cursorType === "interactive" ? 48 : 64,
          height: cursorType === "default" ? 32 : cursorType === "interactive" ? 48 : 64,
          borderColor: cursorType === "default" ? "rgba(56, 189, 248, 0.3)" : "rgba(56, 189, 248, 0.75)",
          backgroundColor: cursorType === "default" ? "rgba(56, 189, 248, 0.02)" : "rgba(56, 189, 248, 0.08)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {cursorType === "external" && (
          <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
        )}
        {cursorType === "view" && (
          <span className="font-mono text-[9px] uppercase font-bold tracking-wider text-sky-300">
            View
          </span>
        )}
      </motion.div>
    </>
  );
}
