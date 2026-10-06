"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileDown, Terminal, ArrowUpRight } from "lucide-react";
import { profileInfo } from "@/data/social";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Career", href: "#career" },
  { label: "Engineering", href: "#engineering" },
  { label: "FormatX", href: "#formatx" },
  { label: "Lab", href: "#lab" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-[#090a0d]/85 backdrop-blur-md border-b border-slate-800/80 py-3.5 shadow-lg shadow-black/30"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo / Identity */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center font-mono font-bold text-sky-400 group-hover:border-sky-500/50 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.25)] transition-all">
            SB
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white tracking-tight group-hover:text-sky-300 transition-colors">
              {profileInfo.name}
            </span>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">
              .NET Developer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#12151e]/60 border border-slate-800/60 rounded-full px-4 py-1.5 backdrop-blur-sm">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-full hover:bg-slate-800/60 transition-colors"
            >
              <span className="text-sky-400/80 font-mono text-[10px] mr-1">0{idx + 1}.</span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            href={profileInfo.resumePath}
            isExternal
            icon={<FileDown className="w-3.5 h-3.5" />}
          >
            Resume
          </Button>

          <Button
            variant="primary"
            size="sm"
            href="#contact"
          >
            Get In Touch
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#090a0d]/95 backdrop-blur-xl border-b border-slate-800 p-6 shadow-2xl transition-all">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-medium text-slate-200 hover:text-sky-400 py-2 border-b border-slate-900"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-sky-400">0{idx + 1}</span>
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Button
                variant="outline"
                size="md"
                href={profileInfo.resumePath}
                isExternal
                icon={<FileDown className="w-4 h-4" />}
                className="w-full justify-center"
              >
                Download Resume
              </Button>
              <Button
                variant="primary"
                size="md"
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full justify-center"
              >
                Get In Touch
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
