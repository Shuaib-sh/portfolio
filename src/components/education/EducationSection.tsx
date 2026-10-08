"use client";

import React, { useRef } from "react";
import { educationData } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { useGsapContext, gsap, ScrollTrigger } from "@/lib/gsap";
import { GraduationCap, Award, MapPin, CheckCircle2 } from "lucide-react";

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGsapContext(sectionRef, () => {
    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
      id="education"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#2a2a2c] text-white transition-colors"
    >
      <Container>
        <SectionHeader
          index="06"
          theme="dark"
          eyebrow="Academic & Professional Training"
          title="Education & Mentorship"
          description="Formal computer science foundation and specialized enterprise ASP.NET full-stack development."
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className="bg-[#1d1d1f] rounded-[18px] p-8 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-[11px] bg-white/5 border border-white/10 text-[#2997ff] flex items-center justify-center">
                    {idx === 0 ? <GraduationCap className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-[#cccccc] border border-white/10 font-mono">
                    {edu.period}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white tracking-[-0.015em] mb-1.5">{edu.degree}</h3>
                <h4 className="text-sm font-medium text-[#2997ff] mb-2">{edu.institution}</h4>
                <p className="text-xs text-[#7a7a7a] mb-6 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {edu.location}
                </p>

                {edu.highlights && (
                  <div className="pt-6 border-t border-white/10 space-y-3">
                    {edu.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-[#cccccc]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2997ff] shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
