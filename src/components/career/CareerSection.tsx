"use client";

import React, { useState, useRef } from "react";
import { careerData } from "@/data/career";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { useGsapContext, gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export function CareerSection() {
  const [selectedContribution, setSelectedContribution] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

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

  // GSAP ScrollTrigger animation
  useGsapContext(sectionRef, () => {
    if (milestonesRef.current) {
      const cards = milestonesRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: milestonesRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (showcaseRef.current) {
      gsap.fromTo(
        showcaseRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: "top 78%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="career"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#272729] text-white transition-colors"
    >
      <Container>
        <SectionHeader
          index="02"
          theme="dark"
          eyebrow="Career Journey & Enterprise Production"
          title="Real-World Engineering at Kaizenstar"
          description="Proven experience delivering high-availability .NET systems, automated database migration frameworks, asynchronous Hangfire pipelines, and industrial reporting."
        />

        {/* Milestone Progression Rail */}
        <div ref={milestonesRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {journeyMilestones.map((milestone, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-[18px] border transition-all h-full ${
                milestone.active
                  ? "bg-[#1d1d1f] border-[#2997ff]/40 shadow-sm"
                  : "bg-[#2a2a2c] border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#2997ff] font-semibold">{milestone.year}</span>
                <Badge variant={milestone.active ? "sky" : "dark"} size="sm">
                  {milestone.badge}
                </Badge>
              </div>
              <h3 className="text-base font-semibold text-white mb-1">{milestone.title}</h3>
              <p className="text-xs text-[#cccccc] font-normal mb-3">{milestone.org}</p>
              <p className="text-xs text-[#7a7a7a] leading-relaxed font-normal">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>

        {/* Kaizenstar Deep Contribution Showcase (Apple Dark Tile 2) */}
        <div
          ref={showcaseRef}
          className="rounded-[18px] border border-white/10 bg-[#1d1d1f] p-8 sm:p-12"
        >
          {/* Company header banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-[#2997ff]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#7a7a7a]">
                  Current Enterprise Role
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-white">
                {careerData.role} • <span className="text-[#2997ff]">{careerData.company}</span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#cccccc]">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-[#2997ff]" />
                {careerData.period}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#2997ff]" />
                {careerData.location}
              </span>
            </div>
          </div>

          {/* Interactive Contribution Selector & Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left selector list */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7a7a7a] mb-1">
                Key Production Modules:
              </span>
              {careerData.keyContributions.map((contrib, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedContribution(idx)}
                  className={`text-left p-4 rounded-[14px] border transition-all cursor-pointer ${
                    selectedContribution === idx
                      ? "bg-white/10 border-[#2997ff]/60 text-white"
                      : "bg-white/5 border-white/10 text-[#cccccc] hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{contrib.title}</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        selectedContribution === idx ? "text-[#2997ff] translate-x-1" : "opacity-0"
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Right details display */}
            <div className="lg:col-span-7 bg-[#272729] border border-white/10 rounded-[18px] p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs text-[#2997ff]">
                  0{selectedContribution + 1} / TECHNICAL ARCHITECTURE
                </span>
              </div>
              <h4 className="text-xl font-semibold text-white tracking-[-0.015em] mb-4">
                {careerData.keyContributions[selectedContribution].title}
              </h4>
              <p className="text-[15px] sm:text-[17px] text-[#cccccc] leading-[1.47] mb-6 font-normal tracking-[-0.015em]">
                {careerData.keyContributions[selectedContribution].description}
              </p>

              <div className="pt-6 border-t border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#7a7a7a] block mb-4">
                  Engineering Highlights & Implementation Mechanics:
                </span>
                <ul className="space-y-3">
                  {careerData.keyContributions[selectedContribution].technicalHighlights.map(
                    (highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90">
                        <CheckCircle2 className="w-4 h-4 text-[#2997ff] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Tech badge pill cloud */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#7a7a7a] uppercase mr-2">Technologies Used:</span>
            {careerData.technologies.map((tech) => (
              <Badge key={tech} variant="mono" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
