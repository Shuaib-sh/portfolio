"use client";

import React, { useState, useRef } from "react";
import { formatXData } from "@/data/formatx";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useGsapContext, gsap, ScrollTrigger } from "@/lib/gsap";
import {
  ExternalLink,
  Key,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

export function FormatXSection() {
  const [activeTab, setActiveTab] = useState<"architecture" | "auth" | "features" | "decisions">("architecture");
  const sectionRef = useRef<HTMLElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger
  useGsapContext(sectionRef, () => {
    if (heroCardRef.current) {
      gsap.fromTo(
        heroCardRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroCardRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="formatx"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#ffffff] text-[#1d1d1f] transition-colors"
    >
      <Container>
        <SectionHeader
          index="03"
          theme="light"
          eyebrow="Featured Personal Product"
          title="FormatX — File Conversion SaaS"
          description="A production-ready SaaS platform engineered from first principles with Angular 16 and ASP.NET Core Clean Architecture, proving full-stack execution and high-throughput stream processing."
        />

        {/* Hero banner card for FormatX (Apple Museum Showcase) */}
        <div
          ref={heroCardRef}
          className="rounded-[18px] border border-[#e0e0e0] bg-[#fafafc] p-8 sm:p-12 mb-16"
        >
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs bg-[#0066cc]/10 text-[#0066cc] border border-[#0066cc]/20 font-medium">
                Featured Independent SaaS
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-white text-[#7a7a7a] border border-[#e0e0e0] font-mono">
                Angular 16 • ASP.NET Core • Dapper • Supabase
              </span>
            </div>

            <h3 className="text-4xl sm:text-6xl font-semibold text-[#1d1d1f] tracking-[-0.025em] mb-4">
              FormatX
            </h3>

            <p className="text-[17px] sm:text-xl text-[#333333] font-normal leading-[1.47] mb-8 tracking-[-0.015em]">
              {formatXData.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {formatXData.liveUrl && (
                <Button
                  variant="primary"
                  size="md"
                  href={formatXData.liveUrl}
                  isExternal
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  View Live Project
                </Button>
              )}

              <a
                href={formatXData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-[22px] py-[11px] rounded-full text-[17px] font-normal border border-[#0066cc] text-[#0066cc] hover:bg-[#0066cc]/5 active:scale-[0.95] transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tab Controls for Deep Dive (Apple Pill Switcher) */}
        <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] w-fit">
          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-normal transition-all cursor-pointer ${
              activeTab === "architecture"
                ? "bg-[#0066cc] text-white shadow-xs font-medium"
                : "text-[#7a7a7a] hover:text-[#1d1d1f]"
            }`}
          >
            System Architecture
          </button>

          <button
            onClick={() => setActiveTab("auth")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-normal transition-all cursor-pointer ${
              activeTab === "auth"
                ? "bg-[#0066cc] text-white shadow-xs font-medium"
                : "text-[#7a7a7a] hover:text-[#1d1d1f]"
            }`}
          >
            Auth & Token Rotation
          </button>

          <button
            onClick={() => setActiveTab("features")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-normal transition-all cursor-pointer ${
              activeTab === "features"
                ? "bg-[#0066cc] text-white shadow-xs font-medium"
                : "text-[#7a7a7a] hover:text-[#1d1d1f]"
            }`}
          >
            Core Capabilities
          </button>

          <button
            onClick={() => setActiveTab("decisions")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-normal transition-all cursor-pointer ${
              activeTab === "decisions"
                ? "bg-[#0066cc] text-white shadow-xs font-medium"
                : "text-[#7a7a7a] hover:text-[#1d1d1f]"
            }`}
          >
            Architectural Rationale
          </button>
        </div>

        {/* Tab Content 1: System Architecture Diagram */}
        {activeTab === "architecture" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {formatXData.architectureLayers.map((layer, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[18px] p-5 border border-[#e0e0e0] flex flex-col justify-between hover:border-[#0066cc]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-[#0066cc] font-bold">0{idx + 1}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#f5f5f7] text-[#7a7a7a] font-mono">
                        {layer.role}
                      </span>
                    </div>
                    <h4 className="text-[15px] font-semibold text-[#1d1d1f] mb-1">{layer.layer}</h4>
                    <p className="text-xs font-mono text-[#0066cc] mb-3">{layer.tech}</p>
                    <p className="text-xs text-[#7a7a7a] leading-relaxed font-normal">
                      {layer.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Deployment Topology Card */}
            <div className="p-6 rounded-[18px] bg-[#fafafc] border border-[#e0e0e0]">
              <span className="font-mono text-xs text-[#7a7a7a] uppercase tracking-wider block mb-3">
                Deployment Topology:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-[14px] bg-white border border-[#e0e0e0]">
                  <span className="text-[#7a7a7a] block mb-1">Frontend SPA</span>
                  <p className="text-[#1d1d1f] font-semibold">Angular 16</p>
                  <p className="text-[#0066cc]">Deployed to Vercel (Edge CDN)</p>
                </div>
                <div className="p-4 rounded-[14px] bg-white border border-[#e0e0e0]">
                  <span className="text-[#7a7a7a] block mb-1">Backend REST API</span>
                  <p className="text-[#1d1d1f] font-semibold">ASP.NET Core Web API</p>
                  <p className="text-[#0066cc]">Docker Container on Render</p>
                </div>
                <div className="p-4 rounded-[14px] bg-white border border-[#e0e0e0]">
                  <span className="text-[#7a7a7a] block mb-1">Relational Database</span>
                  <p className="text-[#1d1d1f] font-semibold">PostgreSQL (Supabase)</p>
                  <p className="text-emerald-600">Managed Cloud Persistence</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Auth & Token Flow */}
        {activeTab === "auth" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xl font-semibold text-[#1d1d1f] mb-2 tracking-[-0.015em]">
                Stateless Token Lifecycle & Sliding Rotation
              </h4>
              <p className="text-[17px] text-[#7a7a7a] leading-[1.47] mb-6 font-normal tracking-[-0.015em]">
                FormatX employs a secure token pair architecture ensuring short exposure windows without requiring intrusive re-logins.
              </p>

              <div className="space-y-3">
                {formatXData.authFlow.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex items-start gap-3.5"
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-[#0066cc] border border-[#e0e0e0] flex items-center justify-center shrink-0 mt-0.5">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-[#1d1d1f] mb-1">{step.step}</h5>
                      <p className="text-xs text-[#7a7a7a] leading-relaxed font-normal">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#fafafc] border border-[#e0e0e0] rounded-[18px] p-6 sm:p-8">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7a7a7a] block mb-4">
                Token Specifications:
              </span>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-[12px] bg-white border border-[#e0e0e0]">
                  <span className="text-[#7a7a7a] block mb-1">Access Token</span>
                  <span className="text-[#1d1d1f] font-semibold text-sm">JSON Web Token (JWT)</span>
                  <div className="flex justify-between mt-2 pt-2 border-t border-[#e0e0e0] text-[11px]">
                    <span className="text-[#7a7a7a]">Lifespan:</span>
                    <span className="text-emerald-600 font-semibold">15 Minutes</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-[12px] bg-white border border-[#e0e0e0]">
                  <span className="text-[#7a7a7a] block mb-1">Refresh Token</span>
                  <span className="text-[#1d1d1f] font-semibold text-sm">Cryptographic String</span>
                  <div className="flex justify-between mt-2 pt-2 border-t border-[#e0e0e0] text-[11px]">
                    <span className="text-[#7a7a7a]">Lifespan:</span>
                    <span className="text-[#0066cc] font-semibold">7 Days (Sliding)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-[12px] bg-white border border-[#e0e0e0]">
                  <span className="text-[#7a7a7a] block mb-1">OAuth Provider</span>
                  <span className="text-[#1d1d1f] font-semibold text-sm">Google OAuth 2.0</span>
                  <div className="flex justify-between mt-2 pt-2 border-t border-[#e0e0e0] text-[11px]">
                    <span className="text-[#7a7a7a]">Verification:</span>
                    <span className="text-[#0066cc] font-semibold">Server-Side Signature</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Features */}
        {activeTab === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formatXData.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[18px] p-6 border border-[#e0e0e0] hover:border-[#0066cc]/40 transition-colors"
              >
                <div className="mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs bg-[#f5f5f7] text-[#0066cc] border border-[#e0e0e0]">
                    {feat.badge}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-[#1d1d1f] mb-2">{feat.title}</h4>
                <p className="text-xs text-[#7a7a7a] leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 4: Architectural Decisions */}
        {activeTab === "decisions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formatXData.technicalDecisions.map((dec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[18px] p-6 border border-[#e0e0e0] hover:border-[#0066cc]/40 transition-colors"
              >
                <span className="font-mono text-xs text-[#0066cc] uppercase tracking-wider block mb-2">
                  Engineering Decision 0{idx + 1}
                </span>
                <h4 className="text-lg font-semibold text-[#1d1d1f] mb-3">{dec.decision}</h4>
                <p className="text-sm text-[#333333] leading-relaxed font-normal">
                  {dec.rationale}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
