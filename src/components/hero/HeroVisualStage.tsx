"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Cpu, Database, ShieldCheck, Sparkles, Terminal, Code2 } from "lucide-react";

export function HeroVisualStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse tilt motion values for authentic 3D spatial depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  // 3D Tilt transforms
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const charTranslateX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const charTranslateY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  // Deep Parallax for Floating Telemetry Chips
  const chip1X = useTransform(smoothX, [-0.5, 0.5], [24, -24]);
  const chip1Y = useTransform(smoothY, [-0.5, 0.5], [18, -18]);

  const chip2X = useTransform(smoothX, [-0.5, 0.5], [-26, 26]);
  const chip2Y = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const chip3X = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const chip3Y = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || shouldReduceMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[560px] sm:h-[620px] max-w-[480px] mx-auto flex items-center justify-center [perspective:1200px] select-none group"
    >
      {/* 1. Deepest Background: Volumetric ambient glows & radial lighting */}
      <div className="absolute w-[380px] h-[380px] top-1/4 rounded-full bg-gradient-to-tr from-sky-500/25 via-sky-400/10 to-indigo-500/20 blur-[110px] pointer-events-none -z-10" />
      <div className="absolute w-[300px] h-[300px] bottom-10 rounded-full bg-indigo-600/15 blur-[95px] pointer-events-none -z-10" />

      {/* Subtle modern orbital accent rings in background */}
      <div className="absolute w-[420px] h-[420px] rounded-full border border-slate-800/60 pointer-events-none -z-10" />
      <div className="absolute w-[490px] h-[490px] rounded-full border border-sky-500/10 border-dashed animate-[spin_90s_linear_infinite] pointer-events-none -z-10" />

      {/* 2. Cybernetic Ground Holographic Pedestal at Feet */}
      <div className="absolute bottom-6 w-64 h-20 pointer-events-none -z-10 flex items-center justify-center">
        {/* Holographic light disc */}
        <div className="absolute w-60 h-16 rounded-[100%] border border-sky-400/30 bg-gradient-to-t from-sky-500/10 via-sky-400/5 to-transparent blur-[1px]" />
        <div className="absolute w-48 h-10 rounded-[100%] border border-sky-400/50 bg-sky-400/5" />
        <div className="absolute w-32 h-6 rounded-[100%] bg-sky-400/20 blur-sm" />
        {/* Soft grounding shadow directly under sneakers */}
        <div className="absolute w-52 h-4 rounded-[100%] bg-black/90 blur-md translate-y-1" />
      </div>

      {/* 3. Pure Transparent Full-Body 3D Character Silhouette */}
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          x: shouldReduceMotion ? 0 : charTranslateX,
          y: shouldReduceMotion ? 0 : charTranslateY,
          transformStyle: "preserve-3d",
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -10, 0],
              }
        }
        transition={{
          y: {
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-full h-full max-h-[600px]">
          <Image
            src="/avatar/shuaib-fullbody-transparent.png"
            alt="Shuaib B — Full Body 3D Software Engineer Avatar"
            fill
            sizes="(max-width: 768px) 380px, 480px"
            className="object-contain object-bottom filter contrast-[1.04] brightness-[1.03] drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            priority
          />
        </div>
      </motion.div>

      {/* 4. Floating Engineering Telemetry Cards (Layered in 3D Space) */}
      
      {/* Top Left: Enterprise Core */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : chip1X,
          y: shouldReduceMotion ? 0 : chip1Y,
        }}
        className="absolute top-14 -left-4 z-20 px-3.5 py-2.5 rounded-xl bg-[#0f121d]/90 border border-slate-800/90 backdrop-blur-md shadow-2xl flex items-center gap-3 group-hover:border-sky-500/40 transition-colors"
      >
        <div className="p-1.5 rounded-lg bg-sky-950/80 text-sky-400 border border-sky-800/60">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <span className="font-mono text-[10px] text-slate-400 block leading-none mb-0.5">ENTERPRISE .NET</span>
          <span className="text-xs font-semibold text-white leading-none">ASP.NET Core & Web API</span>
        </div>
      </motion.div>

      {/* Middle Right: High-Performance Background Async */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : chip2X,
          y: shouldReduceMotion ? 0 : chip2Y,
        }}
        className="absolute top-[48%] -right-6 z-20 px-3.5 py-2.5 rounded-xl bg-[#0f121d]/90 border border-slate-800/90 backdrop-blur-md shadow-2xl flex items-center gap-3 group-hover:border-indigo-500/40 transition-colors"
      >
        <div className="p-1.5 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
          <Database className="w-4 h-4" />
        </div>
        <div>
          <span className="font-mono text-[10px] text-slate-400 block leading-none mb-0.5">ASYNC PIPELINES</span>
          <span className="text-xs font-semibold text-white leading-none">Hangfire Background Jobs</span>
        </div>
      </motion.div>

      {/* Bottom Left: Clean Architecture Pattern */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : chip3X,
          y: shouldReduceMotion ? 0 : chip3Y,
        }}
        className="absolute bottom-16 -left-2 z-20 px-3.5 py-2.5 rounded-xl bg-[#0f121d]/90 border border-slate-800/90 backdrop-blur-md shadow-2xl flex items-center gap-3 group-hover:border-emerald-500/40 transition-colors"
      >
        <div className="p-1.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <span className="font-mono text-[10px] text-slate-400 block leading-none mb-0.5">ARCHITECTURE</span>
          <span className="text-xs font-semibold text-white leading-none">Clean Architecture & Dapper</span>
        </div>
      </motion.div>
    </div>
  );
}
