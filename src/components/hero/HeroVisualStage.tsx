"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useGsapContext, gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Cpu,
  Database,
  Rotate3d,
  RotateCcw,
  Layers,
  Server,
  Workflow,
  CheckCircle2,
} from "lucide-react";

export function HeroVisualStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Drag interaction states
  const [isDragging, setIsDragging] = useState(false);
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
      const normalized = Math.round(((latest % 360) + 360) % 360);
      setDisplayAngle(normalized);
    });
    return () => unsubscribe();
  }, [smoothRotY]);

  // GSAP ScrollTrigger for subtle spatial floating effect on scroll
  useGsapContext(stageRef, () => {
    if (shouldReduceMotion || !stageRef.current) return;

    gsap.to(stageRef.current, {
      y: -40,
      scale: 0.98,
      scrollTrigger: {
        trigger: stageRef.current,
        start: "top center",
        end: "bottom top",
        scrub: 1.2,
      },
    });
  }, [shouldReduceMotion]);

  // Deep Parallax for Floating Telemetry Chips
  const chip1X = useTransform(smoothRotY, (y) => Math.sin((y * Math.PI) / 180) * -35);
  const chip1Z = useTransform(smoothRotY, (y) => Math.cos((y * Math.PI) / 180) * 80);

  const chip2X = useTransform(smoothRotY, (y) => Math.sin(((y + 120) * Math.PI) / 180) * 40);
  const chip2Z = useTransform(smoothRotY, (y) => Math.cos(((y + 120) * Math.PI) / 180) * 70);

  const chip3X = useTransform(smoothRotY, (y) => Math.sin(((y + 240) * Math.PI) / 180) * -30);
  const chip3Z = useTransform(smoothRotY, (y) => Math.cos(((y + 240) * Math.PI) / 180) * 60);

  // Pointer Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
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

    const newY = currentRotY.current + deltaX * 0.7;
    rotYVal.set(newY);

    const newX = Math.max(-20, Math.min(20, currentRotX.current - deltaY * 0.35));
    rotXVal.set(newX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    rotXVal.set(0);
    const current = rotYVal.get();
    const nearestFull = Math.round(current / 360) * 360;
    rotYVal.set(nearestFull);
  };

  return (
    <div
      ref={stageRef}
      className="relative w-full h-[580px] sm:h-[640px] max-w-[480px] mx-auto flex flex-col items-center justify-center select-none group"
    >
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
        {/* Apple Pedestal Base (Subtle Radial Surface) */}
        <div className="absolute bottom-6 w-72 h-12 pointer-events-none -z-10 flex items-center justify-center">
          <div className="w-64 h-8 rounded-[100%] bg-black/80 blur-md" />
          <div className="absolute w-56 h-6 rounded-[100%] border border-white/10" />
        </div>

        {/* Central 3D Rotatable Avatar Rig */}
        <motion.div
          style={{
            rotateX: shouldReduceMotion ? 0 : smoothRotX,
            rotateY: shouldReduceMotion ? 0 : smoothRotY,
            transformStyle: "preserve-3d",
          }}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          {/* FRONT FACE: High-Resolution Transparent 3D Avatar with Apple signature product shadow */}
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
                className="object-contain object-bottom filter contrast-[1.04] brightness-[1.03] product-shadow"
                priority
              />
            </div>
          </div>

          {/* BACK FACE (180 deg): Apple Pro Technical Spec Sheet */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg) translateZ(10px)",
              transformStyle: "preserve-3d",
            }}
            className="absolute w-[320px] sm:w-[350px] h-[480px] rounded-[18px] p-6 bg-[#1d1d1f] border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden text-left"
          >
            {/* Top Spec Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#2997ff]" />
                  <span className="text-[12px] font-semibold text-white tracking-tight">
                    ENGINEERING SPEC
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#7a7a7a]">REV 2026.1</span>
              </div>

              <div className="mt-4">
                <h4 className="text-xl font-semibold text-white tracking-[-0.02em]">Shuaib B</h4>
                <p className="text-xs text-[#2997ff]">Software Engineer • .NET Core</p>
                <p className="text-[11px] text-[#cccccc] mt-1">1.7+ Yrs Enterprise Production</p>
              </div>

              {/* Architecture Matrix */}
              <div className="mt-5 space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-[#7a7a7a] uppercase tracking-wider block">Core Backend</span>
                  <p className="text-white font-medium">ASP.NET Core Web API • C#</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-[#7a7a7a] uppercase tracking-wider block">Async Pipelines</span>
                  <p className="text-white font-medium">Hangfire Background Processing</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-[#7a7a7a] uppercase tracking-wider block">Persistence & ORM</span>
                  <p className="text-white font-medium">Dapper • PostgreSQL • MySQL</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-[#7a7a7a] uppercase tracking-wider block">Featured Product</span>
                  <p className="text-[#2997ff] font-medium">FormatX SaaS (Angular 16)</p>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#7a7a7a]">
              <span className="text-[#2997ff] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Kaizenstar Verified
              </span>
              <span className="font-mono">360° PRO SPEC</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Telemetry Badges (Apple Translucent Gray Chip Style) */}
        
        {/* Top Left: Enterprise Core */}
        <motion.div
          style={{ x: chip1X, z: chip1Z }}
          className="absolute top-14 -left-4 z-20 px-3.5 py-2 rounded-full bg-[#1d1d1f]/90 border border-white/15 backdrop-blur-md flex items-center gap-2.5 pointer-events-none"
        >
          <div className="w-2 h-2 rounded-full bg-[#2997ff]" />
          <div>
            <span className="text-[11px] font-normal text-white">ASP.NET Core Web API</span>
          </div>
        </motion.div>

        {/* Middle Right: High-Performance Background Async */}
        <motion.div
          style={{ x: chip2X, z: chip2Z }}
          className="absolute top-[48%] -right-4 z-20 px-3.5 py-2 rounded-full bg-[#1d1d1f]/90 border border-white/15 backdrop-blur-md flex items-center gap-2.5 pointer-events-none"
        >
          <div className="w-2 h-2 rounded-full bg-[#0066cc]" />
          <div>
            <span className="text-[11px] font-normal text-white">Hangfire Background Jobs</span>
          </div>
        </motion.div>

        {/* Bottom Left: Clean Architecture Pattern */}
        <motion.div
          style={{ x: chip3X, z: chip3Z }}
          className="absolute bottom-16 -left-2 z-20 px-3.5 py-2 rounded-full bg-[#1d1d1f]/90 border border-white/15 backdrop-blur-md flex items-center gap-2.5 pointer-events-none"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <div>
            <span className="text-[11px] font-normal text-white">Clean Architecture & Dapper</span>
          </div>
        </motion.div>
      </div>

      {/* 3D Interaction Control HUD Pill (Apple Minimalist Pill) */}
      <div className="mt-2 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs text-white/80 z-30">
        <div className="flex items-center gap-2">
          <Rotate3d className="w-3.5 h-3.5 text-[#2997ff] animate-spin [animation-duration:9s]" />
          <span className="text-white/90 text-[12px]">
            {isDragging ? "Rotating 3D" : "Drag to rotate"}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-[#2997ff] font-mono">
            {displayAngle}°
          </span>
        </div>

        {displayAngle !== 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] text-[#2997ff] hover:text-white transition-colors cursor-pointer ml-1"
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
