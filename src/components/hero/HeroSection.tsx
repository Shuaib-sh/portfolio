"use client";

import React, { useRef } from "react";
import { profileInfo } from "@/data/social";
import { careerData } from "@/data/career";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroVisualStage } from "@/components/hero/HeroVisualStage";
import { useGsapContext, gsap } from "@/lib/gsap";
import {
  ArrowUpRight,
  FileDown,
  Terminal,
  ShieldCheck,
  Mail,
  ChevronDown,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const visualStageRef = useRef<HTMLDivElement>(null);

  // Apple-grade GSAP entrance animation sequence
  useGsapContext(heroRef, () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.1 }
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.7"
      );
    }

    if (copyRef.current) {
      tl.fromTo(
        copyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );
    }

    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, scale: 0.96, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7 },
        "-=0.5"
      );
    }

    if (socialRef.current) {
      tl.fromTo(
        socialRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );
    }

    if (visualStageRef.current) {
      tl.fromTo(
        visualStageRef.current,
        { opacity: 0, scale: 0.94, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power2.out" },
        "-=0.9"
      );
    }
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 overflow-hidden bg-[#000000] text-white"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Apple Typography & Identity */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Status Chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono mb-6 backdrop-blur-md w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-white/80">{careerData.company}</span>
              <span className="text-white/30">•</span>
              <span className="text-[#2997ff]">{careerData.role}</span>
            </div>

            {/* Apple Display Headline (SF Pro tight tracking) */}
            <h1
              ref={titleRef}
              className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.025em] text-white mb-4 leading-[1.05]"
            >
              {profileInfo.name}
            </h1>

            {/* Sub-headline */}
            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl md:text-3xl text-[#2997ff] font-normal tracking-[-0.015em] mb-4"
            >
              {profileInfo.title}
            </p>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-white/90 font-normal leading-relaxed max-w-xl mb-4">
              &ldquo;{profileInfo.shortTagline}&rdquo;
            </p>

            {/* Apple 17px Body Description */}
            <p
              ref={copyRef}
              className="text-[17px] text-[#cccccc] font-normal leading-[1.47] max-w-xl mb-8 tracking-[-0.015em]"
            >
              Backend-focused software engineer with <span className="text-white font-medium">{profileInfo.experienceYears}</span> of enterprise production experience. Specializing in ASP.NET Core APIs, Clean Architecture, Hangfire background processing, automated DB migration frameworks, and full-stack SaaS delivery with Angular.
            </p>

            {/* Apple Action Blue & Secondary Ghost Pill Buttons */}
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

            {/* Social & Contact Links */}
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

          {/* Right Column: Visual Stage with 3D Avatar */}
          <div ref={visualStageRef} className="lg:col-span-5 flex justify-center items-center z-10">
            <HeroVisualStage />
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="mt-14 flex justify-center">
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
