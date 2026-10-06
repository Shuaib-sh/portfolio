"use client";

import React, { useState, useEffect, useRef } from "react";
import { profileInfo } from "@/data/social";
import { careerData } from "@/data/career";
import { formatXData } from "@/data/formatx";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "welcome",
      output: (
        <div>
          <p className="text-sky-400 font-bold">Shuaib B — Interactive Engineering Terminal v1.0</p>
          <p className="text-slate-400 text-xs mt-1">
            Type <span className="text-emerald-400 font-semibold">&apos;help&apos;</span> to inspect supported commands.
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let response: React.ReactNode;

    switch (cmd) {
      case "help":
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="text-sky-400 font-semibold mb-1">Available Commands:</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">whoami</span> — Identity & professional summary</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">stack</span> — Core technologies & frameworks</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">career</span> — Current enterprise company & role</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">formatx</span> — Details on featured SaaS product</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">contact</span> — Public email, GitHub & LinkedIn</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">clear</span> — Purge terminal history</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">exit</span> — Close terminal session</p>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="text-slate-300 space-y-1">
            <p className="font-bold text-white">{profileInfo.name}</p>
            <p className="text-sky-400">{profileInfo.title}</p>
            <p className="text-slate-400">{profileInfo.experienceYears} of verified enterprise experience</p>
            <p className="text-xs text-slate-500 italic mt-1">&ldquo;{profileInfo.shortTagline}&rdquo;</p>
          </div>
        );
        break;

      case "stack":
        response = (
          <div className="text-slate-300 space-y-1">
            <p className="text-sky-400 font-semibold">Verified Tech Stack:</p>
            <p><span className="text-slate-400">Backend:</span> C#, ASP.NET Core Web API, .NET 8, Dapper, Hangfire</p>
            <p><span className="text-slate-400">Frontend:</span> Angular 16+, TypeScript, RxJS, Tailwind CSS</p>
            <p><span className="text-slate-400">Database:</span> MySQL (Stored Procs, Table Locks), PostgreSQL, SQL Server</p>
            <p><span className="text-slate-400">Reporting:</span> QuestPDF, FastReport, RDLC Reports</p>
            <p><span className="text-slate-400">DevOps:</span> Docker, Vercel, Render, Git, GitHub</p>
          </div>
        );
        break;

      case "career":
      case "experience":
        response = (
          <div className="text-slate-300 space-y-1">
            <p className="font-bold text-white">{careerData.company}</p>
            <p className="text-sky-400">{careerData.role} ({careerData.period})</p>
            <p className="text-xs text-slate-400 mt-1">{careerData.summary}</p>
          </div>
        );
        break;

      case "formatx":
      case "projects":
        response = (
          <div className="text-slate-300 space-y-1">
            <p className="font-bold text-white">{formatXData.name} — {formatXData.title}</p>
            <p className="text-xs text-slate-400">{formatXData.tagline}</p>
            <p className="text-xs text-sky-400 mt-1">Arch: Angular 16 → ASP.NET Core API → Dapper → PostgreSQL</p>
            <p className="text-xs text-emerald-400">Auth: JWT (15m) + Sliding Refresh (7d) + Google OAuth 2.0</p>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="text-slate-300 space-y-1">
            <p><span className="text-slate-400">Email:</span> {profileInfo.email}</p>
            <p><span className="text-slate-400">GitHub:</span> {profileInfo.github}</p>
            <p><span className="text-slate-400">LinkedIn:</span> {profileInfo.linkedin}</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
        onClose();
        setInput("");
        return;

      default:
        response = (
          <p className="text-rose-400">
            command not found: {cmd}. Type <span className="underline">&apos;help&apos;</span> for supported commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl h-[460px] rounded-2xl bg-[#0b0d14] border border-slate-800 shadow-2xl flex flex-col overflow-hidden font-mono text-xs">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111420] border-b border-slate-800 select-none">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer"
                aria-label="Close terminal"
              />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-slate-400 text-[11px] ml-2">shuaib@engineer-terminal: ~</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-slate-200">
          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-sky-400">shuaib@dev:~$</span>
                <span className="text-white font-semibold">{h.command}</span>
              </div>
              <div className="pl-4">{h.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 p-3 bg-[#0d101a] border-t border-slate-800">
          <span className="text-sky-400 pl-1">shuaib@dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white focus:outline-none"
            placeholder="type 'help'..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
