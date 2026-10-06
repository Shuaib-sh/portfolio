"use client";

import React from "react";
import Image from "next/image";
import { profileInfo } from "@/data/social";
import { careerData } from "@/data/career";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/MotionPrimitives";
import {
  Code2,
  Server,
  Layers,
  Sparkles,
  Workflow,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function AboutSection() {
  const principles = [
    {
      icon: <Server className="w-5 h-5 text-sky-400" />,
      title: "Backend Precision & Architecture",
      description:
        "Building reliable ASP.NET Core services with Clean Architecture, explicit domain boundaries, and high-performance micro-ORMs like Dapper.",
    },
    {
      icon: <Workflow className="w-5 h-5 text-indigo-400" />,
      title: "Asynchronous Pipelines",
      description:
        "Offloading resource-intensive workloads through Hangfire background jobs and ASP.NET Core Hosted Services to maintain responsive, non-blocking APIs.",
    },
    {
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      title: "Full-Stack SaaS Expansion",
      description:
        "Extending backend mastery into reactive client interfaces with Angular 16+, RxJS, and token-based security pipelines embodied in FormatX.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      title: "Production Discipline",
      description:
        "Designing deterministic database migrations with application locks, rigorous error middleware, and automated reporting systems.",
    },
  ];

  return (
    <Section id="about" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          index="01"
          eyebrow="Identity & Engineering Philosophy"
          title="Engineering systems with depth, not just syntax."
          description="A .NET-focused software engineer with real enterprise application experience, dedicated to crafting resilient architectures and solving real-world production requirements."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left summary narrative */}
          <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            <FadeIn direction="up">
              <div className="flex items-center gap-3.5 p-2 pr-4 rounded-full bg-slate-900/90 border border-slate-800 w-fit backdrop-blur-md mb-6 shadow-md">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-sky-400/50">
                  <Image
                    src="/avatar/shuaib-avatar-3d.jpg"
                    alt="Shuaib B"
                    fill
                    sizes="40px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Shuaib B</p>
                  <p className="text-[10px] font-mono text-sky-400">Software Engineer • .NET Core</p>
                </div>
              </div>

              <p>
                My engineering approach is anchored in understanding <span className="text-white font-semibold">how systems operate under the hood</span>—from how memory streams avoid large object heap fragmentation, to how distributed locks protect concurrent database migrations.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <p className="text-slate-400 text-base">
                Currently at <span className="text-white font-medium">{careerData.company}</span>, I architect enterprise backend systems, clinic management modules, Hangfire background processing, and high-volume document generation engines.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="text-slate-400 text-base">
                Beyond enterprise infrastructure, I built <span className="text-sky-400 font-medium">FormatX</span>—an independent file-conversion SaaS platform combining Angular and ASP.NET Core Clean Architecture, demonstrating my ability to ship full-stack products independently.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="pt-2 flex flex-wrap gap-2">
                <Badge variant="sky">ASP.NET Core</Badge>
                <Badge variant="indigo">Clean Architecture</Badge>
                <Badge variant="slate">Hangfire</Badge>
                <Badge variant="emerald">Angular 16</Badge>
                <Badge variant="mono">Dapper</Badge>
                <Badge variant="outline">QuestPDF</Badge>
              </div>
            </FadeIn>
          </div>

          {/* Right interactive principles grid */}
          <div className="lg:col-span-6">
            <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {principles.map((p, idx) => (
                <StaggerItem key={idx}>
                  <Card variant="glass" className="h-full p-6 hover:border-slate-700">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 w-fit mb-4">
                      {p.icon}
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2">{p.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {p.description}
                    </p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </Container>
    </Section>
  );
}
