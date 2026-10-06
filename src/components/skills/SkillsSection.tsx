"use client";

import React, { useState } from "react";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/MotionPrimitives";

export function SkillsSection() {
  return (
    <Section id="skills" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          index="05"
          eyebrow="Technical Stack & Competencies"
          title="Curated Engineering Toolset"
          description="A categorized breakdown of verified tools and technologies applied in enterprise production and independent software engineering."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => (
            <FadeIn key={idx} direction="up" delay={idx * 0.08}>
              <Card variant="glass" className="h-full flex flex-col justify-between p-6 hover:border-slate-700">
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5 flex items-center justify-between">
                    <span>{cat.category}</span>
                    <span className="font-mono text-[10px] text-sky-400">0{idx + 1}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mb-5 font-normal leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="space-y-3">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="border-t border-slate-800/80 pt-2.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-slate-200">{skill.name}</span>
                        </div>
                        {skill.context && (
                          <p className="text-[11px] text-slate-400 leading-snug">
                            {skill.context}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
