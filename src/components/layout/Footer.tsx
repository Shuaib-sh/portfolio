"use client";

import React, { useState, useEffect } from "react";
import { profileInfo } from "@/data/social";
import { Container } from "@/components/ui/Container";
import { TerminalModal } from "@/components/terminal/TerminalModal";
import { Terminal, ArrowUpRight, FileDown } from "lucide-react";

export function Footer() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Global keyboard shortcut to launch terminal: Ctrl + ` or Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "`" || e.key === "~")) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <footer className="border-t border-[#e0e0e0] bg-[#f5f5f7] py-16 text-[#333333]">
        <Container>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#e0e0e0]">
            {/* Brand identity */}
            <div>
              <p className="font-semibold text-[#1d1d1f] text-base tracking-tight">{profileInfo.name}</p>
              <p className="text-[#7a7a7a] text-xs mt-0.5">{profileInfo.title}</p>
              <p className="text-[#7a7a7a] text-[11px] mt-1">{profileInfo.location}</p>
            </div>

            {/* Apple Dense Link Row (SF Pro relaxed leading) */}
            <div className="flex flex-wrap items-center gap-6 text-[14px]">
              <a
                href={profileInfo.github}
                target="_blank"
                rel="noreferrer"
                className="text-[#333333] hover:text-[#0066cc] transition-colors flex items-center gap-1"
              >
                GitHub <ArrowUpRight className="w-3.5 h-3.5 text-[#0066cc]" />
              </a>

              <a
                href={profileInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-[#333333] hover:text-[#0066cc] transition-colors flex items-center gap-1"
              >
                LinkedIn <ArrowUpRight className="w-3.5 h-3.5 text-[#0066cc]" />
              </a>

              <a
                href={`mailto:${profileInfo.email}`}
                className="text-[#333333] hover:text-[#0066cc] transition-colors"
              >
                {profileInfo.email}
              </a>

              <a
                href={profileInfo.resumePath}
                target="_blank"
                rel="noreferrer"
                className="text-[#0066cc] hover:underline transition-colors flex items-center gap-1"
              >
                Resume PDF <FileDown className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Terminal Easter egg button (Apple dark utility capsule) */}
            <button
              onClick={() => setTerminalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-white border border-[#e0e0e0] hover:border-[#0066cc] hover:text-[#0066cc] transition-colors flex items-center gap-2 cursor-pointer text-xs text-[#1d1d1f]"
              title="Open Interactive CLI (Ctrl + ~)"
            >
              <Terminal className="w-3.5 h-3.5 text-[#0066cc]" />
              <span>Dev Terminal</span>
              <kbd className="px-1.5 py-0.5 text-[9px] bg-[#f5f5f7] text-[#7a7a7a] rounded border border-[#e0e0e0] font-mono">
                Ctrl+~
              </kbd>
            </button>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#7a7a7a] text-[12px]">
            <p>© 2026 {profileInfo.name}. All rights reserved.</p>
            <p className="font-mono text-[11px]">Designed in Apple museum gallery aesthetic • Engineered with .NET principles</p>
          </div>
        </Container>
      </footer>

      {/* Terminal Easter Egg Modal */}
      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
