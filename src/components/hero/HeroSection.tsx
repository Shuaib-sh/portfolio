"use client";

import React from "react";
import { profileInfo } from "@/data/social";
import { careerData } from "@/data/career";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroVisualStage } from "@/components/hero/HeroVisualStage";
import { FadeIn } from "@/components/motion/MotionPrimitives";
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
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Cinematic Large Typography Watermark (Behind Avatar & Content) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none -z-10 overflow-hidden">
        <span className="text-[14vw] font-black uppercase tracking-tighter text-white/[0.015] leading-none whitespace-nowrap block">
          .NET ARCHITECT
        </span>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Positioning & Identity */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Status Pill */}
            <FadeIn direction="up" distance={15}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#11141c]/90 border border-slate-800 text-xs font-mono mb-6 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-slate-300">{careerData.company}</span>
                <span className="text-slate-600">•</span>
                <span className="text-sky-400">{careerData.role}</span>
              </div>
            </FadeIn>

            {/* Name Heading */}
            <FadeIn direction="up" distance={25} delay={0.1}>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4 leading-[1.05]">
                {profileInfo.name}
              </h1>
            </FadeIn>

            {/* Professional Title */}
            <FadeIn direction="up" distance={20} delay={0.2}>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-sky-400 font-semibold tracking-tight mb-5">
                {profileInfo.title}
              </h2>
            </FadeIn>

            {/* Approved Tagline */}
            <FadeIn direction="up" distance={20} delay={0.25}>
              <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed max-w-xl mb-4">
                &ldquo;{profileInfo.shortTagline}&rdquo;
              </p>
            </FadeIn>

            {/* Technical Philosophy Paragraph */}
            <FadeIn direction="up" distance={20} delay={0.3}>
              <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-xl mb-8">
                Backend-focused software engineer with <span className="text-slate-200 font-medium">{profileInfo.experienceYears}</span> of enterprise production experience. Specializing in ASP.NET Core APIs, Clean Architecture, Hangfire background processing, automated DB migration frameworks, and full-stack SaaS delivery with Angular.
              </p>
            </FadeIn>

            {/* Action Buttons */}
            <FadeIn direction="up" distance={15} delay={0.35}>
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Button
                  variant="primary"
                  size="lg"
                  href="#career"
                  magnetic
                  icon={<ArrowUpRight className="w-4 h-4" />}
                >
                  Explore My Work
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  href={profileInfo.resumePath}
                  isExternal
                  magnetic
                  icon={<FileDown className="w-4 h-4" />}
                >
                  Download Resume
                </Button>
              </div>
            </FadeIn>

            {/* Social & Contact Links */}
            <FadeIn direction="up" distance={15} delay={0.4}>
              <div className="flex items-center gap-5 pt-6 border-t border-slate-800/80">
                <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">Connect:</span>
                
                <a
                  href={profileInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="external"
                  className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors p-1"
                >
                  <GithubIcon className="w-4 h-4 text-sky-400" />
                  <span>GitHub</span>
                </a>

                <a
                  href={profileInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="external"
                  className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors p-1"
                >
                  <LinkedinIcon className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`mailto:${profileInfo.email}`}
                  className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors p-1"
                >
                  <Mail className="w-4 h-4 text-sky-400" />
                  <span>Email</span>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Visual Stage */}
          <div className="lg:col-span-5 flex justify-center items-center z-10">
            <FadeIn direction="left" distance={30} delay={0.25} className="w-full">
              <HeroVisualStage />
            </FadeIn>
          </div>
        </div>

        {/* Scroll down gentle prompt */}
        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            className="group flex flex-col items-center gap-2 text-xs font-mono text-slate-500 hover:text-sky-400 transition-colors"
            aria-label="Scroll down to About section"
          >
            <span>DISCOVER</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-slate-500 group-hover:text-sky-400" />
          </a>
        </div>
      </Container>
    </section>
  );
}
