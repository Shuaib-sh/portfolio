"use client";

import React, { useState, useRef } from "react";
import { profileInfo } from "@/data/social";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useGsapContext, gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  FileDown,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger
  useGsapContext(sectionRef, () => {
    if (formCardRef.current) {
      gsap.fromTo(
        formCardRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formCardRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "338ede04-fa8f-47ec-811e-18492425cfbe",
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Inquiry from ${formData.name}`,
          message: formData.message,
          from_name: "Shuaib B Portfolio",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // Fallback to internal route
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      // Graceful local fallback
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch {
        setStatus("error");
      }
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#f5f5f7] text-[#1d1d1f] transition-colors"
    >
      <Container>
        <SectionHeader
          index="07"
          theme="light"
          eyebrow="Initiate Conversation"
          title="Let's Build Something Exceptional"
          description="Whether discussing enterprise .NET architecture, API development, or full-stack software initiatives, reach out directly."
        />

        <div ref={formCardRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Channels (Apple Utility Card) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[18px] p-8 border border-[#e0e0e0]">
              <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight mb-6">Direct Channels</h3>

              <div className="space-y-4">
                {/* Email card */}
                <div className="p-4 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white text-[#0066cc] border border-[#e0e0e0] flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#7a7a7a] uppercase block">Email Address</span>
                      <a
                        href={`mailto:${profileInfo.email}`}
                        className="text-sm font-semibold text-[#1d1d1f] hover:text-[#0066cc] transition-colors"
                      >
                        {profileInfo.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-full bg-white text-[#7a7a7a] border border-[#e0e0e0] hover:text-[#1d1d1f] transition-colors cursor-pointer"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* LinkedIn Card */}
                <a
                  href={profileInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex items-center justify-between hover:border-[#0066cc]/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white text-[#0066cc] border border-[#e0e0e0] flex items-center justify-center">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#7a7a7a] uppercase block">Professional Network</span>
                      <span className="text-sm font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors">
                        LinkedIn Profile
                      </span>
                    </div>
                  </div>
                </a>

                {/* GitHub Card */}
                <a
                  href={profileInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-[14px] bg-[#fafafc] border border-[#e0e0e0] flex items-center justify-between hover:border-[#0066cc]/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white text-[#1d1d1f] border border-[#e0e0e0] flex items-center justify-center">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#7a7a7a] uppercase block">Code Repositories</span>
                      <span className="text-sm font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors">
                        github.com/Shuaib-sh
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Resume download prompt */}
              <div className="mt-8 pt-6 border-t border-[#f0f0f0]">
                <a
                  href={profileInfo.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-[22px] py-[11px] rounded-full text-[15px] font-normal border border-[#0066cc] text-[#0066cc] hover:bg-[#0066cc]/5 active:scale-[0.95] transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Complete Resume (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form (Apple Store Card) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[18px] p-8 border border-[#e0e0e0]">
              <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight mb-2">Send a Direct Message</h3>
              <p className="text-[14px] text-[#7a7a7a] mb-6 font-normal">
                Fill in your details below to dispatch an inquiry directly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#7a7a7a] mb-1.5 uppercase">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] text-[#1d1d1f] text-sm focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0071e3]/30 transition-all placeholder:text-[#a0a0a5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#7a7a7a] mb-1.5 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] text-[#1d1d1f] text-sm focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0071e3]/30 transition-all placeholder:text-[#a0a0a5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#7a7a7a] mb-1.5 uppercase">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Backend Architecture / Project Inquiry"
                    className="w-full px-4 py-2.5 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] text-[#1d1d1f] text-sm focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0071e3]/30 transition-all placeholder:text-[#a0a0a5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#7a7a7a] mb-1.5 uppercase">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry or engineering project..."
                    className="w-full px-4 py-2.5 rounded-[12px] bg-[#fafafc] border border-[#e0e0e0] text-[#1d1d1f] text-sm focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0071e3]/30 transition-all resize-none placeholder:text-[#a0a0a5]"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-[12px] bg-rose-50 border border-rose-200 text-xs text-rose-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Please ensure all required fields are filled out properly.</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="flex items-center gap-2 p-3.5 rounded-[12px] bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>Message transmitted successfully! Shuaib will respond to your email shortly.</span>
                  </div>
                )}

                <Button
                  variant="primary"
                  size="md"
                  icon={<Send className="w-4 h-4" />}
                  className="w-full justify-center"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Transmitting..." : "Transmit Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
