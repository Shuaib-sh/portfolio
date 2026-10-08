"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Custom React hook for GSAP animations that safely scopes selectors
 * and automatically kills ScrollTriggers and tweens on unmount.
 */
export function useGsapContext(scopeRef: React.RefObject<HTMLElement | null>, animationFn: (ctx: gsap.Context) => void, deps: any[] = []) {
  useEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      animationFn(ctx);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
  }, deps);
}

/**
 * Apple-style text reveal animation using GSAP
 */
export function revealAppleElements(elements: string | Element | Element[], options?: { delay?: number; y?: number; stagger?: number; duration?: number }) {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: options?.y ?? 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0.1,
      ease: "power3.out",
    }
  );
}
