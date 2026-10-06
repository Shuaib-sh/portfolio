import React from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { CareerSection } from "@/components/career/CareerSection";
import { FormatXSection } from "@/components/formatx/FormatXSection";
import { EngineeringLabSection } from "@/components/engineering-lab/EngineeringLabSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { EducationSection } from "@/components/education/EducationSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* 01. Hero Section */}
      <HeroSection />

      {/* 02. About & Engineering Philosophy */}
      <AboutSection />

      {/* 03. Career Journey & Enterprise Production (Kaizenstar) */}
      <CareerSection />

      {/* 04. FormatX Featured SaaS Case Study & Architecture */}
      <FormatXSection />

      {/* 05. Engineering Lab Interactive Technical Blueprints */}
      <EngineeringLabSection />

      {/* 06. Tech Stack & Competencies */}
      <SkillsSection />

      {/* 07. Academic & Training Foundations */}
      <EducationSection />

      {/* 08. Contact & Inquiry Gateway */}
      <ContactSection />

      {/* 09. Footer & Interactive Dev Terminal */}
      <Footer />
    </main>
  );
}
