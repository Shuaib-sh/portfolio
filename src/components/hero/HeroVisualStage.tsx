"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import {
  Cpu,
  Database,
  ShieldCheck,
  Rotate3d,
  RotateCcw,
  Sparkles,
  Terminal,
  Layers,
  Server,
  Workflow,
  CheckCircle2,
} from "lucide-react";

export function HeroVisualStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Drag interaction states
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentRotY = useRef(0);
  const currentRotX = useRef(0);

  // Motion values for full 3D rotation
  const rotXVal = useMotionValue(0);
  const rotYVal = useMotionValue(0);

  // Smooth springs for realistic momentum and fluid inertia
  const springConfig = { stiffness: 140, damping: 20, mass: 0.8 };
  const smoothRotX = useSpring(rotXVal, springConfig);
  const smoothRotY = useSpring(rotYVal, springConfig);

  // Display angle for HUD
  const [displayAngle, setDisplayAngle] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothRotY.on("change", (latest) => {
      // Normalize angle to [0, 360)
      const normalized = Math.round(((latest % 360) + 360) % 360);
      setDisplayAngle(normalized);
    });
    return () => unsubscribe();
  }, [smoothRotY]);

  // Deep Parallax for Floating Telemetry Chips
  const chip1X = useTransform(smoothRotY, (y) => Math.sin((y * Math.PI) / 180) * -35);
  const chip1Z = useTransform(smoothRotY, (y) => Math.cos((y * Math.PI) / 180) * 80);

  const chip2X = useTransform(smoothRotY, (y) => Math.sin(((y + 120) * Math.PI) / 180) * 40);
  const chip2Z = useTransform(smoothRotY, (y) => Math.cos(((y + 120) * Math.PI) / 180) * 70);

  const chip3X = useTransform(smoothRotY, (y) => Math.sin(((y + 240) * Math.PI) / 180) * -30);
  const chip3Z = useTransform(smoothRotY, (y) => Math.cos(((y + 240) * Math.PI) / 180) * 60);

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setHasInteracted(true);
    startX.current = e.clientX;
    startY.current = e.clientY;
    currentRotY.current = rotYVal.get();
    currentRotX.current = rotXVal.get();

    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;

    // Dragging left/right rotates around Y-axis (360 degrees)
    const newY = currentRotY.current + deltaX * 0.7;
    rotYVal.set(newY);

    // Dragging up/down tilts X-axis (clamped between -25deg and +25deg)
    const newX = Math.max(-25, Math.min(25, currentRotX.current - deltaY * 0.4));
    rotXVal.set(newX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // Reset to front face
  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    rotXVal.set(0);
    // Snap to nearest 360 multiple to prevent violent spinning
    const current = rotYVal.get();
    const nearestFull = Math.round(current / 360) * 360;
    rotYVal.set(nearestFull);
  };

  return (
    <div className="relative w-full h-[580px] sm:h-[640px] max-w-[480px] mx-auto flex flex-col items-center justify-center select-none group">
      {/* 3D Viewport Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full h-full flex items-center justify-center [perspective:1400px] touch-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {/* 1. Deepest Background: Volumetric ambient glows & radial lighting */}
        <div className="absolute w-[380px] h-[380px] top-1/4 rounded-full bg-gradient-to-tr from-sky-500/25 via-sky-400/10 to-indigo-500/20 blur-[110px] pointer-events-none -z-10" />
        <div className="absolute w-[300px] h-[300px] bottom-10 rounded-full bg-indigo-600/15 blur-[95px] pointer-events-none -z-10" />

        {/* Ambient orbital rings */}
        <div className="absolute w-[440px] h-[440px] rounded-full border border-slate-800/60 pointer-events-none -z-10" />
        <div className="absolute w-[500px] h-[500px] rounded-full border border-sky-500/10 border-dashed animate-[spin_90s_linear_infinite] pointer-events-none -z-10" />

        {/* 2. Cybernetic Ground Holographic Pedestal (Rotates with Y angle) */}
        <motion.div
          style={{
            rotateY: smoothRotY,
          }}
          className="absolute bottom-4 w-72 h-20 pointer-events-none -z-10 flex items-center justify-center"
        >
          {/* Holographic light disc */}
          <div className="absolute w-64 h-16 rounded-[100%] border border-sky-400/30 bg-gradient-to-t from-sky-500/10 via-sky-400/5 to-transparent blur-[1px]" />
          <div className="absolute w-52 h-10 rounded-[100%] border border-sky-400/50 bg-sky-400/5" />
          <div className="absolute w-36 h-6 rounded-[100%] bg-sky-400/20 blur-sm" />
          {/* Floor grounding shadow */}
          <div className="absolute w-56 h-4 rounded-[100%] bg-black/90 blur-md translate-y-1" />
        </motion.div>

        {/* 3. Central 3D Rotatable Monolith Card / Avatar Rig */}
        <motion.div
          style={{
            rotateX: shouldReduceMotion ? 0 : smoothRotX,
            rotateY: shouldReduceMotion ? 0 : smoothRotY,
            transformStyle: "preserve-3d",
          }}
          animate={
            shouldReduceMotion || isDragging
              ? {}
              : {
                  y: [0, -10, 0],
                }
          }
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          {/* FRONT FACE: High-Resolution Transparent 3D Avatar */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full h-full max-h-[600px]">
              <Image
                src="/avatar/shuaib-fullbody-transparent.png"
                alt="Shuaib B — Full Body 3D Software Engineer Avatar"
                fill
                sizes="(max-width: 768px) 380px, 480px"
                className="object-contain object-bottom filter contrast-[1.04] brightness-[1.03] drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
                priority
              />
            </div>
          </div>

          {/* BACK FACE (180 deg): Futuristic Cybernetic System Blueprint */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg) translateZ(10px)",
              transformStyle: "preserve-3d",
            }}
            className="absolute w-[320px] sm:w-[350px] h-[480px] rounded-3xl p-6 bg-[#0c0e18]/95 border border-sky-400/40 backdrop-blur-xl shadow-2xl shadow-sky-500/10 flex flex-col justify-between overflow-hidden text-left"
          >
            {/* Top Blueprint Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-sky-400 tracking-wider">
                    SYSTEM BLUEPRINT
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">REV 2.4</span>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-bold text-white tracking-tight">Shuaib B</h4>
                <p className="text-xs font-mono text-sky-400">Software Engineer | .NET Core</p>
                <p className="text-[11px] text-slate-400 mt-1">1.7+ Yrs Enterprise Production</p>
              </div>

              {/* Architecture Matrix */}
              <div className="mt-5 space-y-2.5 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Core Backend</span>
                  <p className="text-slate-200 font-semibold">ASP.NET Core Web API • C#</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Async Pipelines</span>
                  <p className="text-slate-200 font-semibold">Hangfire Background Jobs</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Persistence Layer</span>
                  <p className="text-slate-200 font-semibold">Dapper • PostgreSQL • MySQL</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Featured Product</span>
                  <p className="text-sky-400 font-semibold">FormatX SaaS (Angular 16)</p>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Kaizenstar Verified
              </span>
              <span className="text-slate-500">360° HOLO-CARD</span>
            </div>
          </div>
        </motion.div>

        {/* 4. Floating 3D Telemetry Cards (Layered in 3D Space) */}
        
        {/* Top Left: Enterprise Core */}
        <motion.div
          style={{
            x: chip1X,
            z: chip1Z,
          }}
          className="absolute top-14 -left-4 z-20 px-3.5 py-2.5 rounded-xl bg-[#0f121d]/90 border border-slate-800/90 backdrop-blur-md shadow-2xl flex items-center gap-3 pointer-events-none group-hover:border-sky-500/40 transition-colors"
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
            x: chip2X,
            z: chip2Z,
          }}
          className="absolute top-[48%] -right-6 z-20 px-3.5 py-2.5 rounded-xl bg-[#0f121d]/90 border border-slate-800/90 backdrop-blur-md shadow-2xl flex items-center gap-3 pointer-events-none group-hover:border-indigo-500/40 transition-colors"
        >
          <div className="p-1.5 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
            <Workflow className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-slate-400 block leading-none mb-0.5">ASYNC PIPELINES</span>
            <span className="text-xs font-semibold text-white leading-none">Hangfire Background Jobs</span>
          </div>
        </motion.div>

        {/* Bottom Left: Clean Architecture Pattern */}
        <motion.div
          style={{
            x: chip3X,
            z: chip3Z,
          }}
          className="absolute bottom-16 -left-2 z-20 px-3.5 py-2.5 rounded-xl bg-[#0f121d]/90 border border-slate-800/90 backdrop-blur-md shadow-2xl flex items-center gap-3 pointer-events-none group-hover:border-emerald-500/40 transition-colors"
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

      {/* 5. 3D Interaction Control HUD Pill (Bottom of stage) */}
      <div className="mt-2 flex items-center gap-3 px-4 py-2 rounded-full bg-[#10131e]/90 border border-slate-800/90 backdrop-blur-md shadow-xl text-xs font-mono text-slate-400 z-30">
        <div className="flex items-center gap-2">
          <Rotate3d className="w-4 h-4 text-sky-400 animate-spin [animation-duration:8s]" />
          <span className="text-slate-300">
            {isDragging ? "Rotating 3D Space" : "Drag to Rotate 3D"}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-sky-400 font-semibold">
            {displayAngle}°
          </span>
        </div>

        {displayAngle !== 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 transition-colors ml-1 cursor-pointer"
            title="Reset to front angle"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
