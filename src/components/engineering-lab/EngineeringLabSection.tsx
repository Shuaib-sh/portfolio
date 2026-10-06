"use client";

import React, { useState } from "react";
import { engineeringLabItems } from "@/data/engineeringLab";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/MotionPrimitives";
import {
  Code,
  ShieldAlert,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

export function EngineeringLabSection() {
  const [selectedLabId, setSelectedLabId] = useState<string>(engineeringLabItems[0].id);
  const [copied, setCopied] = useState(false);

  const selectedItem =
    engineeringLabItems.find((item) => item.id === selectedLabId) || engineeringLabItems[0];

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="lab" className="py-24 sm:py-32 bg-[#090b10]" hasGlow glowColor="sky">
      <Container>
        <SectionHeader
          index="04"
          eyebrow="Interactive Technical Demonstrations"
          title="The Engineering Lab"
          description="Interactive deep dives into low-level architectural patterns, distributed database locks, background job orchestration, and security lifecycles implemented in production."
        />

        {/* Category Topic Pill Selector */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-2">
          {engineeringLabItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedLabId(item.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 border ${
                selectedLabId === item.id
                  ? "bg-slate-900 border-sky-400 text-white shadow-md shadow-sky-500/10"
                  : "bg-[#111420]/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${selectedLabId === item.id ? "bg-sky-400" : "bg-slate-600"}`} />
              <span>{item.category}</span>
            </button>
          ))}
        </div>

        {/* Selected Lab Interactive Blueprint Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Engineering Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="glass" className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="sky" size="sm">{selectedItem.badge}</Badge>
                <span className="font-mono text-xs text-slate-400">{selectedItem.usedIn}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {selectedItem.title}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm font-normal text-slate-300 leading-relaxed">
                <div>
                  <h4 className="font-mono text-xs text-sky-400 uppercase tracking-wider mb-1">Overview:</h4>
                  <p>{selectedItem.summary}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <h4 className="font-mono text-xs text-emerald-400 uppercase tracking-wider mb-1">
                    Why It Matters (Production Impact):
                  </h4>
                  <p className="text-slate-300">{selectedItem.whyItMatters}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-indigo-400 uppercase tracking-wider mb-1">
                    Technical Mechanism:
                  </h4>
                  <p>{selectedItem.technicalMechanism}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Code Demonstration / Blueprint Box */}
          <div className="lg:col-span-7">
            {selectedItem.codeSnippet && (
              <div className="rounded-2xl border border-slate-800 bg-[#0d0f17] overflow-hidden shadow-2xl">
                {/* Code Window Header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-[#141722] border-b border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-slate-400 ml-2 font-medium">{selectedItem.codeSnippet.title}</span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(selectedItem.codeSnippet!.code)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded bg-slate-900 border border-slate-800"
                    aria-label="Copy code snippet"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Syntax Area */}
                <div className="p-6 overflow-x-auto">
                  <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200">
                    <code>{selectedItem.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
