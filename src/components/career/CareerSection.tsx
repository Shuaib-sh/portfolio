"use client";

import React, { useState } from "react";
import { careerData } from "@/data/career";
import { educationData } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/MotionPrimitives";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  ArrowRight,
  Shield,
  FileSpreadsheet,
} from "lucide-react";

export function CareerSection() {
  const [selectedContribution, setSelectedContribution] = useState<number>(0);

  const journeyMilestones = [
    {
      year: "2020 – 2024",
      title: "B.Tech Computer Science & Engineering",
      org: "Mahaguru Institute of Technology",
      description: "Deep academic grounding in Algorithms, Data Structures, Operating Systems, and DBMS.",
      badge: "Degree",
    },
    {
      year: "Oct 2024 – Apr 2025",
      title: "ASP.NET Full Stack Developer Training",
      org: "Luminar Technolab",
      description: "Intensive training in C#, Web API, SQL Server & Git. Fast-tracked placement after 1st month.",
      badge: "Training",
    },
    {
      year: "Dec 2024 – Present",
      title: ".NET Developer (Enterprise Core)",
      org: "Kaizenstar Technologies",
      description: "Architecting clinic & inventory ERP backends, DB migration engine, Hangfire workflows, and reporting.",
      badge: "Production",
      active: true,
    },
  ];

  return (
    <Section id="career" className="py-24 sm:py-32 bg-[#08090c]" hasGlow glowColor="sky">
      <Container>
        <SectionHeader
          index="02"
          eyebrow="Career Journey & Enterprise Production"
          title="Real-World Engineering at Kaizenstar"
          description="Proven experience delivering high-availability .NET systems, automated database migration frameworks, asynchronous Hangfire pipelines, and industrial reporting."
        />

        {/* Milestone Progression Rail */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {journeyMilestones.map((milestone, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1}>
                <div
                  className={`p-6 rounded-2xl border transition-all h-full relative ${
                    milestone.active
                      ? "bg-slate-900/90 border-sky-500/40 shadow-xl shadow-sky-500/5 ring-1 ring-sky-500/20"
                      : "bg-[#10121a]/60 border-slate-800/80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-sky-400 font-semibold">{milestone.year}</span>
                    <Badge variant={milestone.active ? "sky" : "slate"} size="sm">
                      {milestone.badge}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{milestone.title}</h3>
                  <p className="text-xs text-slate-400 font-medium mb-3">{milestone.org}</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {milestone.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Kaizenstar Deep Contribution Showcase */}
        <div className="rounded-3xl border border-slate-800/80 bg-[#0e1017]/90 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
          {/* Company header banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800/80 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-sky-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Current Enterprise Role
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {careerData.role} • <span className="text-sky-400">{careerData.company}</span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                {careerData.period}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                {careerData.location}
              </span>
            </div>
          </div>

          {/* Interactive Contribution Selector & Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left selector list */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Key Production Modules:
              </span>
              {careerData.keyContributions.map((contrib, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedContribution(idx)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedContribution === idx
                      ? "bg-slate-900 border-sky-400/60 shadow-lg shadow-sky-500/5 text-white"
                      : "bg-[#12151f]/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{contrib.title}</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        selectedContribution === idx ? "text-sky-400 translate-x-1" : "opacity-0"
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Right details display */}
            <div className="lg:col-span-7 bg-[#12151f] border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs text-sky-400">
                  0{selectedContribution + 1} / TECHNICAL ARCHITECTURE
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">
                {careerData.keyContributions[selectedContribution].title}
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                {careerData.keyContributions[selectedContribution].description}
              </p>

              <div className="pt-6 border-t border-slate-800/80">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-4">
                  Engineering Highlights & Implementation Mechanics:
                </span>
                <ul className="space-y-3">
                  {careerData.keyContributions[selectedContribution].technicalHighlights.map(
                    (highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Tech badge pill cloud */}
          <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-500 uppercase mr-2">Technologies Used:</span>
            {careerData.technologies.map((tech) => (
              <Badge key={tech} variant="mono" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
