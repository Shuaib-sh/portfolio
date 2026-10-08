"use client";

import React, { useState, useRef } from "react";
import { engineeringLabItems } from "@/data/engineeringLab";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { useGsapContext, gsap, ScrollTrigger } from "@/lib/gsap";
import { Copy, Check } from "lucide-react";

export function EngineeringLabSection() {
  const [selectedLabId, setSelectedLabId] = useState<string>(engineeringLabItems[0].id);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const labContentRef = useRef<HTMLDivElement>(null);

  const selectedItem =
    engineeringLabItems.find((item) => item.id === selectedLabId) || engineeringLabItems[0];

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // GSAP ScrollTrigger animation
  useGsapContext(sectionRef, () => {
    if (labContentRef.current) {
      gsap.fromTo(
        labContentRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: labContentRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#252527] text-white transition-colors"
    >
      <Container>
        <SectionHeader
          index="04"
          theme="dark"
          eyebrow="Interactive Technical Demonstrations"
          title="The Engineering Lab"
          description="Interactive deep dives into low-level architectural patterns, distributed database locks, background job orchestration, and security lifecycles implemented in production."
        />

        {/* Category Topic Pill Selector (Apple Pill Grammar) */}
        <div className="flex flex-wrap gap-2 mb-10">
          {engineeringLabItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedLabId(item.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-normal transition-all cursor-pointer flex items-center gap-2 border ${
                selectedLabId === item.id
                  ? "bg-[#0066cc] border-[#0066cc] text-white shadow-xs font-medium"
                  : "bg-white/5 border-white/10 text-[#cccccc] hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{item.category}</span>
            </button>
          ))}
        </div>

        {/* Selected Lab Interactive Blueprint Card */}
        <div ref={labContentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Engineering Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[18px] bg-[#1d1d1f] border border-white/10 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="sky" size="sm">{selectedItem.badge}</Badge>
                <span className="font-mono text-xs text-[#7a7a7a]">{selectedItem.usedIn}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-[-0.015em] mb-4">
                {selectedItem.title}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm font-normal text-[#cccccc] leading-relaxed">
                <div>
                  <h4 className="font-mono text-xs text-[#2997ff] uppercase tracking-wider mb-1">Overview:</h4>
                  <p>{selectedItem.summary}</p>
                </div>

                <div className="p-4 rounded-[14px] bg-white/5 border border-white/10">
                  <h4 className="font-mono text-xs text-emerald-400 uppercase tracking-wider mb-1">
                    Production Impact:
                  </h4>
                  <p className="text-white/90">{selectedItem.whyItMatters}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-[#2997ff] uppercase tracking-wider mb-1">
                    Technical Mechanism:
                  </h4>
                  <p>{selectedItem.technicalMechanism}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Code Demonstration / Blueprint Box */}
          <div className="lg:col-span-7">
            {selectedItem.codeSnippet && (
              <div className="rounded-[18px] border border-white/10 bg-[#1d1d1f] overflow-hidden">
                {/* Code Window Header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-black/40 border-b border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[#cccccc] ml-2 font-medium">{selectedItem.codeSnippet.title}</span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(selectedItem.codeSnippet!.code)}
                    className="flex items-center gap-1.5 text-[#cccccc] hover:text-white transition-colors cursor-pointer px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px]"
                    aria-label="Copy code snippet"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Syntax Area */}
                <div className="p-6 overflow-x-auto bg-[#161617]">
                  <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200">
                    <code>{selectedItem.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
