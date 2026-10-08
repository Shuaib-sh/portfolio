"use client";

import React, { useRef } from "react";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useGsapContext, gsap, ScrollTrigger } from "@/lib/gsap";

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger
  useGsapContext(sectionRef, () => {
    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#f5f5f7] text-[#1d1d1f] transition-colors"
    >
      <Container>
        <SectionHeader
          index="05"
          theme="light"
          eyebrow="Technical Stack & Competencies"
          title="Curated Engineering Toolset"
          description="A categorized breakdown of verified tools and technologies applied in enterprise production and independent software engineering."
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[18px] p-6 border border-[#e0e0e0] flex flex-col justify-between hover:border-[#0066cc]/40 transition-colors"
            >
              <div>
                <h3 className="text-base font-semibold text-[#1d1d1f] mb-1.5 flex items-center justify-between">
                  <span>{cat.category}</span>
                  <span className="font-mono text-[11px] text-[#0066cc]">0{idx + 1}</span>
                </h3>
                <p className="text-xs text-[#7a7a7a] mb-5 font-normal leading-relaxed">
                  {cat.description}
                </p>

                <div className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="border-t border-[#f0f0f0] pt-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-[#1d1d1f]">{skill.name}</span>
                      </div>
                      {skill.context && (
                        <p className="text-[11px] text-[#7a7a7a] leading-snug">
                          {skill.context}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
