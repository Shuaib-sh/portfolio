"use client";

import React from "react";
import { educationData } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/MotionPrimitives";
import { GraduationCap, Award, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export function EducationSection() {
  return (
    <Section id="education" className="py-24 sm:py-32 bg-[#08090d]">
      <Container>
        <SectionHeader
          index="06"
          eyebrow="Academic & Professional Training"
          title="Education & Mentorship"
          description="Formal computer science foundation and specialized enterprise ASP.NET full-stack development."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationData.map((edu, idx) => (
            <FadeIn key={idx} direction="up" delay={idx * 0.15}>
              <Card variant="glass" className="h-full p-8 border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-sky-400">
                    {idx === 0 ? <GraduationCap className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                  </div>
                  <Badge variant="sky" size="sm">{edu.period}</Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                <h4 className="text-sm font-semibold text-sky-400 mb-1">{edu.institution}</h4>
                <p className="text-xs text-slate-400 mb-6 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {edu.location}
                </p>

                {edu.highlights && (
                  <div className="pt-6 border-t border-slate-800/80 space-y-3">
                    {edu.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
