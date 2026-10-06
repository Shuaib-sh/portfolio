"use client";

import React, { useState } from "react";
import { formatXData } from "@/data/formatx";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/MotionPrimitives";
import {
  FileCode,
  Layers,
  Shield,
  Server,
  Database,
  ArrowRight,
  ExternalLink,
  Key,
  RefreshCw,
  Cpu,
  Boxes,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

export function FormatXSection() {
  const [activeTab, setActiveTab] = useState<"features" | "architecture" | "auth" | "decisions">("architecture");

  return (
    <Section id="formatx" className="py-24 sm:py-32" hasGlow glowColor="indigo">
      <Container>
        <SectionHeader
          index="03"
          eyebrow="Featured Personal Product"
          title="FormatX — File Conversion SaaS"
          description="A production-ready SaaS platform engineered from first principles with Angular 16 and ASP.NET Core Clean Architecture, proving full-stack execution and high-throughput stream processing."
        />

        {/* Hero banner card for FormatX */}
        <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-[#111424] to-[#0c0e17] p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative glow orb */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="indigo" size="md">
                Featured Independent SaaS
              </Badge>
              <Badge variant="mono" size="md">
                Angular 16 • ASP.NET Core • Dapper • Supabase
              </Badge>
            </div>

            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              FormatX
            </h3>

            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-8">
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

              <Button
                variant="outline"
                size="md"
                href={formatXData.githubUrl}
                isExternal
                icon={<GithubIcon className="w-4 h-4" />}
              >
                GitHub Repository
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Controls for Deep Dive */}
        <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 w-fit backdrop-blur-md">
          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === "architecture"
                ? "bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            System Architecture
          </button>

          <button
            onClick={() => setActiveTab("auth")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === "auth"
                ? "bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Auth & Token Rotation
          </button>

          <button
            onClick={() => setActiveTab("features")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === "features"
                ? "bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Core Capabilities
          </button>

          <button
            onClick={() => setActiveTab("decisions")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === "decisions"
                ? "bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Architectural Rationale
          </button>
        </div>

        {/* Tab Content 1: System Architecture Diagram */}
        {activeTab === "architecture" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {formatXData.architectureLayers.map((layer, idx) => (
                <Card key={idx} variant="glass" className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-sky-400 font-bold">0{idx + 1}</span>
                      <Badge variant="mono" size="sm">{layer.role}</Badge>
                    </div>
                    <h4 className="text-base font-bold text-white mb-1">{layer.layer}</h4>
                    <p className="text-xs font-mono text-sky-400 mb-3">{layer.tech}</p>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {layer.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Deployment Topology Diagram Card */}
            <div className="p-6 rounded-2xl bg-[#0e111a] border border-slate-800">
              <span className="font-mono text-xs text-sky-400 uppercase tracking-wider block mb-3">
                Deployment Topology:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block mb-1">Frontend SPA</span>
                  <p className="text-white font-semibold">Angular 16</p>
                  <p className="text-sky-400">Deployed to Vercel (Edge CDN)</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block mb-1">Backend REST API</span>
                  <p className="text-white font-semibold">ASP.NET Core Web API</p>
                  <p className="text-indigo-400">Docker Container on Render</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block mb-1">Relational Database</span>
                  <p className="text-white font-semibold">PostgreSQL (Supabase)</p>
                  <p className="text-emerald-400">Managed Cloud Persistence</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Auth & Token Flow */}
        {activeTab === "auth" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xl font-bold text-white mb-2">
                Stateless Token Lifecycle & Sliding Rotation
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                FormatX employs a secure token pair architecture ensuring short exposure windows without requiring intrusive re-logins.
              </p>

              <div className="space-y-4">
                {formatXData.authFlow.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0f121d] border border-slate-800 flex items-start gap-3.5"
                  >
                    <div className="p-1.5 rounded-lg bg-sky-950 text-sky-400 border border-sky-800 shrink-0 mt-0.5">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-white mb-1">{step.step}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0f121d] border border-slate-800 rounded-2xl p-6 sm:p-8">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 block mb-4">
                Token Specifications:
              </span>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-500 block mb-1">Access Token</span>
                  <span className="text-white font-bold text-sm">JSON Web Token (JWT)</span>
                  <div className="flex justify-between mt-2 pt-2 border-t border-slate-800 text-[11px]">
                    <span className="text-slate-400">Lifespan:</span>
                    <span className="text-emerald-400 font-semibold">15 Minutes</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-500 block mb-1">Refresh Token</span>
                  <span className="text-white font-bold text-sm">Cryptographic String</span>
                  <div className="flex justify-between mt-2 pt-2 border-t border-slate-800 text-[11px]">
                    <span className="text-slate-400">Lifespan:</span>
                    <span className="text-sky-400 font-semibold">7 Days (Sliding)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-500 block mb-1">OAuth Provider</span>
                  <span className="text-white font-bold text-sm">Google OAuth 2.0</span>
                  <div className="flex justify-between mt-2 pt-2 border-t border-slate-800 text-[11px]">
                    <span className="text-slate-400">Verification:</span>
                    <span className="text-indigo-400 font-semibold">Server-Side Signature</span>
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
              <Card key={idx} variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="sky" size="sm">{feat.badge}</Badge>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{feat.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </Card>
            ))}
          </div>
        )}

        {/* Tab Content 4: Architectural Decisions */}
        {activeTab === "decisions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formatXData.technicalDecisions.map((dec, idx) => (
              <Card key={idx} variant="glass" className="p-6">
                <span className="font-mono text-xs text-sky-400 uppercase tracking-wider block mb-2">
                  Engineering Decision 0{idx + 1}
                </span>
                <h4 className="text-lg font-bold text-white mb-3">{dec.decision}</h4>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {dec.rationale}
                </p>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
