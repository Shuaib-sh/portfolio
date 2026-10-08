"use client";

import React, { useRef, useState, useEffect } from "react";
import { profileInfo } from "@/data/social";
import { careerData } from "@/data/career";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroVisualStage } from "@/components/hero/HeroVisualStage";
import { useGsapContext, gsap } from "@/lib/gsap";
import { useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  FileDown,
  Mail,
  ChevronDown,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const statusChipRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const discoverRef = useRef<HTMLDivElement>(null);

  const [isAvatarReady, setIsAvatarReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Cinematic Choreographed Opening Sequence (Avatar First, Content Follows)
  useGsapContext(heroRef, () => {
    if (!isAvatarReady) return;

    if (shouldReduceMotion) {
      // Immediate accessible presentation for reduced motion
      gsap.set([
        ".hero-avatar-entrance",
        ".hero-pedestal",
        ".hero-chip-1",
        ".hero-chip-2",
        ".hero-chip-3",
        statusChipRef.current,
        titleRef.current,
        subtitleRef.current,
        taglineRef.current,
        copyRef.current,
        buttonsRef.current,
        socialRef.current,
        discoverRef.current,
      ], { opacity: 1, y: 0, x: 0, scale: 1, filter: "none" });
      return;
    }

    // Set initial hidden states to ensure clean entrance without layout jumps
    gsap.set([
      statusChipRef.current,
      titleRef.current,
      subtitleRef.current,
      taglineRef.current,
      copyRef.current,
      buttonsRef.current,
      socialRef.current,
      discoverRef.current,
      ".hero-chip-1",
      ".hero-chip-2",
      ".hero-chip-3",
    ], { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const initialX = isMobile ? 0 : 25;
    const initialY = isMobile ? 35 : 55;

    // ==========================================
    // Phase 1: Avatar Enters FIRST (Centerpiece)
    // ==========================================
    tl.fromTo(
      ".hero-avatar-entrance",
      {
        opacity: 0,
        y: initialY,
        x: initialX,
        scale: 0.88,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.25,
        ease: "power3.out",
        clearProps: "filter",
      }
    );

    // Pedestal scales and fades in grounding the avatar
    tl.fromTo(
      ".hero-pedestal",
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" },
      "-=1.1"
    );

    // ==========================================
    // Phase 2: Technical Badges Orbit In
    // ==========================================
    tl.fromTo(
      [".hero-chip-1", ".hero-chip-2", ".hero-chip-3"],
      { opacity: 0, y: 14, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.12,
        ease: "power2.out",
      },
      "-=0.25"
    );

    // ==========================================
    // Phase 3: Content Reveal (AFTER Avatar Settles)
    // ==========================================

    // Step 1 — Small identity badge
    if (statusChipRef.current) {
      tl.fromTo(
        statusChipRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        "-=0.1"
      );
    }

    // Step 2 — Main name (Shuaib B) — strongest editorial reveal
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 35, letterSpacing: "0.01em" },
        { opacity: 1, y: 0, letterSpacing: "-0.025em", duration: 0.75, ease: "power3.out" },
        "-=0.2"
      );
    }

    // Step 3 — Role
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        "-=0.35"
      );
    }

    // Step 4 — Tagline
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        "-=0.3"
      );
    }

    // Step 5 — Description
    if (copyRef.current) {
      tl.fromTo(
        copyRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    }

    // Step 6 — CTA buttons
    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 16, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    }

    // Step 7 — Social & contact links
    if (socialRef.current) {
      tl.fromTo(
        socialRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        "-=0.25"
      );
    }

    // Step 8 — DISCOVER scroll indicator
    if (discoverRef.current) {
      tl.fromTo(
        discoverRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.15"
      );
    }
  }, [isAvatarReady, shouldReduceMotion]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 overflow-hidden bg-[#000000] text-white"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Identity & Information (Revealed AFTER Avatar) */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10 order-2 lg:order-1">
            {/* Step 1: Status Chip */}
            <div
              ref={statusChipRef}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono mb-6 backdrop-blur-md w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-white/80">{careerData.company}</span>
              <span className="text-white/30">•</span>
              <span className="text-[#2997ff]">{careerData.role}</span>
            </div>

            {/* Step 2: Main Name (Apple Display Headline with tight tracking) */}
            <h1
              ref={titleRef}
              className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.025em] text-white mb-4 leading-[1.05]"
            >
              {profileInfo.name}
            </h1>

            {/* Step 3: Sub-headline */}
            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl md:text-3xl text-[#2997ff] font-normal tracking-[-0.015em] mb-4"
            >
              {profileInfo.title}
            </p>

            {/* Step 4: Tagline */}
            <p
              ref={taglineRef}
              className="text-lg sm:text-xl text-white/90 font-normal leading-relaxed max-w-xl mb-4"
            >
              &ldquo;{profileInfo.shortTagline}&rdquo;
            </p>

            {/* Step 5: Description */}
            <p
              ref={copyRef}
              className="text-[17px] text-[#cccccc] font-normal leading-[1.47] max-w-xl mb-8 tracking-[-0.015em]"
            >
              Backend-focused software engineer with <span className="text-white font-medium">{profileInfo.experienceYears}</span> of enterprise production experience. Specializing in ASP.NET Core APIs, Clean Architecture, Hangfire background processing, automated DB migration frameworks, and full-stack SaaS delivery with Angular.
            </p>

            {/* Step 6: CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 mb-10">
              <Button
                variant="primary"
                size="md"
                href="#career"
                magnetic
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Explore My Work
              </Button>

              <Button
                variant="secondary"
                size="md"
                href={profileInfo.resumePath}
                isExternal
                magnetic
                icon={<FileDown className="w-4 h-4" />}
              >
                Download Resume
              </Button>
            </div>

            {/* Step 7: Social & Contact Links */}
            <div ref={socialRef} className="flex items-center gap-6 pt-6 border-t border-white/10">
              <span className="text-xs text-[#7a7a7a] uppercase tracking-wider font-mono">Connect:</span>
              
              <a
                href={profileInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#cccccc] hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#2997ff]" />
                <span>GitHub</span>
              </a>

              <a
                href={profileInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#cccccc] hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#2997ff]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${profileInfo.email}`}
                className="flex items-center gap-1.5 text-xs text-[#cccccc] hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#2997ff]" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Stage with 3D Avatar (Enters FIRST) */}
          <div className="lg:col-span-5 flex justify-center items-center z-10 order-1 lg:order-2">
            <HeroVisualStage onReady={() => setIsAvatarReady(true)} />
          </div>
        </div>

        {/* Step 8: Scroll Prompt (Appears near the end of intro) */}
        <div ref={discoverRef} className="mt-14 flex justify-center">
          <a
            href="#about"
            className="flex flex-col items-center gap-1 text-xs text-[#7a7a7a] hover:text-[#2997ff] transition-colors"
            aria-label="Scroll down to About section"
          >
            <span className="tracking-widest uppercase text-[10px]">DISCOVER</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#7a7a7a]" />
          </a>
        </div>
      </Container>
    </section>
  );
}
