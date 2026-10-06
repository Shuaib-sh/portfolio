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
      <footer className="border-t border-slate-800/80 bg-[#08090d] py-12 text-xs font-mono text-slate-400">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
            {/* Brand identity */}
            <div>
              <p className="font-bold text-white text-sm">{profileInfo.name}</p>
              <p className="text-slate-400 text-xs mt-0.5">{profileInfo.title}</p>
              <p className="text-slate-400 text-[11px] mt-1">{profileInfo.location}</p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-6">
              <a
                href={profileInfo.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="external"
                className="hover:text-sky-400 transition-colors flex items-center gap-1"
              >
                GitHub <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={profileInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="external"
                className="hover:text-sky-400 transition-colors flex items-center gap-1"
              >
                LinkedIn <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={`mailto:${profileInfo.email}`}
                className="hover:text-sky-400 transition-colors"
              >
                {profileInfo.email}
              </a>

              <a
                href={profileInfo.resumePath}
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-400 transition-colors flex items-center gap-1 text-slate-300"
              >
                Resume PDF <FileDown className="w-3 h-3" />
              </a>
            </div>

            {/* Terminal Easter egg button */}
            <button
              onClick={() => setTerminalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500/50 hover:text-sky-400 transition-colors flex items-center gap-2 cursor-pointer text-slate-400"
              title="Open Interactive CLI (Ctrl + ~)"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>Dev Terminal</span>
              <kbd className="px-1.5 py-0.5 text-[9px] bg-slate-800 text-slate-400 rounded border border-slate-700">
                Ctrl+~
              </kbd>
            </button>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
            <p>© 2026 {profileInfo.name}. All rights reserved.</p>
            <p className="font-mono">Engineered with Next.js, Clean Architecture & .NET principles</p>
          </div>
        </Container>
      </footer>

      {/* Terminal Easter Egg Modal */}
      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
