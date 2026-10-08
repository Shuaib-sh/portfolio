"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileDown, Terminal, ArrowUpRight } from "lucide-react";
import { profileInfo } from "@/data/social";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Overview", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Production", href: "#career" },
  { label: "FormatX", href: "#formatx" },
  { label: "Engineering Lab", href: "#lab" },
  { label: "Stack", href: "#skills" },
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
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* 1. Apple Global Nav (44px, Pure Black #000000) */}
      <div className="w-full bg-[#000000] h-[44px] border-b border-white/10 flex items-center">
        <div className="max-w-[1024px] w-full mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Minimalist Monogram / Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group text-white opacity-85 hover:opacity-100 transition-opacity"
            aria-label="Home"
          >
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-black" />
            </div>
            <span className="text-[12px] font-normal tracking-[-0.01em] text-white">
              Shuaib B
            </span>
          </Link>

          {/* Quiet Center Links (Apple style 12px) */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.slice(1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12px] font-normal text-[#cccccc] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-4">
            <a
              href={profileInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[#2997ff] hover:text-[#0071e3] transition-colors hidden sm:inline-block"
            >
              Resume
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white/80 hover:text-white p-1"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Apple Sub-Nav Frosted Glass Strip (52px) */}
      <div className="w-full sub-nav-frosted-dark flex items-center">
        <div className="max-w-[1024px] w-full mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[19px] sm:text-[21px] font-semibold text-white tracking-[-0.02em]">
              .NET Software Engineer
            </span>
            <span className="text-white/40 text-xs hidden sm:inline">•</span>
            <span className="text-xs text-[#cccccc] hidden sm:inline">Enterprise Architecture</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              href="#contact"
              className="text-[12px] px-4 py-1.5"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#000000]/98 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 text-white">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-white/90 hover:text-[#2997ff] py-2 border-b border-white/10"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="primary"
              size="md"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              Get in Touch
            </Button>
            <Button
              variant="secondary"
              size="md"
              href={profileInfo.resumePath}
              isExternal
              className="w-full"
            >
              Download Resume
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
