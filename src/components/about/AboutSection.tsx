"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { profileInfo } from "@/data/social";
import { careerData } from "@/data/career";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useGsapContext, gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Server,
  Layers,
  Workflow,
  ShieldCheck,
} from "lucide-react";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const principles = [
    {
      icon: <Server className="w-5 h-5 text-[#0066cc]" />,
      title: "Backend Precision & Architecture",
      description:
        "Building reliable ASP.NET Core services with Clean Architecture, explicit domain boundaries, and high-performance micro-ORMs like Dapper.",
    },
    {
      icon: <Workflow className="w-5 h-5 text-[#0066cc]" />,
      title: "Asynchronous Pipelines",
      description:
        "Offloading resource-intensive workloads through Hangfire background jobs and ASP.NET Core Hosted Services to maintain responsive, non-blocking APIs.",
    },
    {
      icon: <Layers className="w-5 h-5 text-[#0066cc]" />,
      title: "Full-Stack SaaS Expansion",
      description:
        "Extending backend mastery into reactive client interfaces with Angular 16+, RxJS, and token-based security pipelines embodied in FormatX.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#0066cc]" />,
      title: "Production Discipline",
      description:
        "Designing deterministic database migrations with application locks, rigorous error middleware, and automated reporting systems.",
    },
  ];

  // GSAP ScrollTrigger for smooth staggered reveal of principles cards
  useGsapContext(sectionRef, () => {
    if (!cardsContainerRef.current) return;

    const cards = cardsContainerRef.current.querySelectorAll(".apple-principle-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#f5f5f7] text-[#1d1d1f] transition-colors"
    >
      <Container>
        <SectionHeader
          index="01"
          theme="light"
          eyebrow="Identity & Engineering Philosophy"
          title="Engineering systems with depth, not just syntax."
          description="A .NET-focused software engineer with enterprise application experience, dedicated to crafting resilient architectures and solving real-world production requirements."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
          {/* Left summary narrative */}
          <div className="lg:col-span-6 space-y-6 text-[17px] text-[#333333] leading-[1.47] font-normal tracking-[-0.015em]">
            {/* Apple Author Capsule */}
            <div className="flex items-center gap-3.5 p-2 pr-4 rounded-full bg-white border border-[#e0e0e0] w-fit shadow-xs mb-6">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#0066cc]/40">
                <Image
                  src="/avatar/shuaib-avatar-3d.jpg"
                  alt="Shuaib B"
                  fill
                  sizes="40px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1d1d1f] leading-tight">Shuaib B</p>
                <p className="text-[11px] text-[#0066cc]">Software Engineer • .NET Core</p>
              </div>
            </div>

            <p>
              My engineering approach is anchored in understanding <span className="text-[#1d1d1f] font-semibold">how systems operate under the hood</span>—from how memory streams avoid large object heap fragmentation, to how distributed locks protect concurrent database migrations.
            </p>

            <p className="text-[#333333]">
              Currently at <span className="text-[#1d1d1f] font-semibold">{careerData.company}</span>, I architect enterprise backend systems, clinic management modules, Hangfire background processing, and high-volume document generation engines.
            </p>

            <p className="text-[#333333]">
              Beyond enterprise infrastructure, I built <span className="text-[#0066cc] font-semibold">FormatX</span>—an independent file-conversion SaaS platform combining Angular and ASP.NET Core Clean Architecture, demonstrating my ability to ship full-stack products independently.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
                ASP.NET Core
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
                Clean Architecture
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
                Hangfire
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
                Angular 16
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
                Dapper
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-white text-[#1d1d1f] border border-[#e0e0e0]">
                QuestPDF
              </span>
            </div>
          </div>

          {/* Right principles grid (Apple Store Utility Cards with GSAP) */}
          <div ref={cardsContainerRef} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="apple-principle-card bg-white rounded-[18px] p-6 border border-[#e0e0e0] flex flex-col justify-between hover:border-[#0066cc]/40 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-[11px] bg-[#fafafc] border border-[#e0e0e0] flex items-center justify-center mb-4">
                    {p.icon}
                  </div>
                  <h4 className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight mb-2">
                    {p.title}
                  </h4>
                  <p className="text-[14px] text-[#7a7a7a] leading-[1.43] font-normal">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
