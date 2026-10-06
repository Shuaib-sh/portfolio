"use client";

import React, { useState } from "react";
import { profileInfo } from "@/data/social";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/MotionPrimitives";
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
    <Section id="contact" className="py-24 sm:py-32" hasGlow glowColor="sky">
      <Container>
        <SectionHeader
          index="07"
          eyebrow="Initiate Conversation"
          title="Let's Build Something Exceptional"
          description="Whether discussing enterprise .NET architecture, API development, or full-stack software initiatives, reach out directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="glass" className="p-8">
              <h3 className="text-xl font-bold text-white mb-6">Direct Channels</h3>

              <div className="space-y-6">
                {/* Email card */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-sky-950 text-sky-400 border border-sky-800">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 uppercase block">Email Address</span>
                      <a
                        href={`mailto:${profileInfo.email}`}
                        className="text-sm font-semibold text-white hover:text-sky-400 transition-colors"
                      >
                        {profileInfo.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* LinkedIn Card */}
                <a
                  href={profileInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="external"
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-950 text-blue-400 border border-blue-800">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 uppercase block">Professional Network</span>
                      <span className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">
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
                  data-cursor="external"
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                      <GithubIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 uppercase block">Code Repositories</span>
                      <span className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">
                        github.com/Shuaib-sh
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Resume download prompt */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <Button
                  variant="outline"
                  size="md"
                  href={profileInfo.resumePath}
                  isExternal
                  icon={<FileDown className="w-4 h-4" />}
                  className="w-full justify-center"
                >
                  Download Complete Resume (PDF)
                </Button>
              </div>
            </Card>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7">
            <Card variant="glass" className="p-8">
              <h3 className="text-xl font-bold text-white mb-2">Send a Direct Message</h3>
              <p className="text-xs text-slate-400 mb-6 font-normal">
                Fill in your details below to dispatch an inquiry directly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141722] border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141722] border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Backend Architecture / Project Inquiry"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141722] border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry or engineering project..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141722] border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/50 border border-rose-800 text-xs text-rose-300">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Please ensure all required fields are filled out properly.</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
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
                  {status === "submitting" ? "Preparing Email..." : "Transmit Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
