"use client";

import React from "react";

type DesktopProps = {
  onAction: (command: string) => void;
  onOpenTerminal?: () => void;
};

const items: { label: string; command: string; icon?: string }[] = [
  { label: "About", command: "about details", icon: "/window.svg" },
  { label: "Projects", command: "projects list", icon: "/globe.svg" },
  { label: "Skills", command: "skills", icon: "/file.svg" },
  { label: "Socials", command: "socials", icon: "/globe.svg" },
  { label: "Resume", command: "resume", icon: "/file.svg" },
];

export default function Desktop({ onAction, onOpenTerminal }: DesktopProps) {
  return (
    <div className="absolute inset-0 select-none pointer-events-none" aria-label="Desktop background">
      {/* wallpaper-like gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#0b1220,transparent_40%),radial-gradient(circle_at_80%_30%,#1a1f35,transparent_40%),radial-gradient(circle_at_50%_80%,#111827,transparent_40%)] bg-black" />

      {/* icons grid */}
      <div className="relative z-10 p-6 grid grid-cols-3 gap-6 sm:grid-cols-5 pointer-events-auto">
        {items.map((it) => (
          <button
            key={it.label}
            className="group flex flex-col items-center gap-2 focus:outline-none pointer-events-auto"
            onDoubleClick={() => {
              onOpenTerminal?.();
              onAction(it.command);
            }}
            onClick={() => {
              // single click can just focus/open terminal without running
              onOpenTerminal?.();
            }}
            aria-label={`Open ${it.label}`}
          >
            <div className="h-14 w-14 rounded-lg bg-zinc-900/50 border border-zinc-800 flex items-center justify-center group-hover:bg-zinc-800/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.icon || "/window.svg"} alt="" className="h-7 w-7 opacity-90" />
            </div>
            <div className="text-xs text-zinc-300 group-hover:text-zinc-100">{it.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
