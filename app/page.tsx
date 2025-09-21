"use client";

import { useState } from "react";
import Terminal from "@/components/terminal/Terminal";
import Desktop from "@/components/desktop/Desktop";

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [externalCmd, setExternalCmd] = useState<string | null>(null);

  const openTerminal = () => {
    setShowTerminal(true);
    setMinimized(false);
  };

  const runFromDesktop = (cmd: string) => {
    openTerminal();
    // queue command for terminal to consume
    setExternalCmd(cmd);
  };

  return (
    <main className="relative bg-black min-h-screen overflow-hidden">
      {/* Desktop background + icons */}
      <Desktop onAction={runFromDesktop} onOpenTerminal={openTerminal} />

      {/* Terminal overlay */}
      {showTerminal && !minimized && (
        <Terminal
          fullscreen={fullscreen}
          onMinimize={() => setMinimized(true)}
          onClose={() => setShowTerminal(false)}
          onToggleFullscreen={() => setFullscreen((f) => !f)}
          externalCommand={externalCmd}
          onExternalConsumed={() => setExternalCmd(null)}
        />
      )}

      {/* Dock */}
      <div className="fixed inset-x-0 bottom-3 flex items-center justify-center z-50">
        <div className="backdrop-blur bg-zinc-900/50 border border-zinc-800 rounded-2xl px-3 py-2 flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-zinc-800/60"
            onClick={() => {
              if (!showTerminal) setShowTerminal(true);
              setMinimized(false);
            }}
            aria-label="Open Terminal"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/window.svg" alt="" className="h-5 w-5" />
            <span className="text-sm text-zinc-200">Terminal</span>
          </button>
        </div>
      </div>
    </main>
  );
}
