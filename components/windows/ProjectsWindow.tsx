"use client";

import React from "react";
import AppWindow from "@/components/windows/AppWindow";
import { PROJECTS } from "@/components/terminal/commands";

export default function ProjectsWindow(props: {
  open?: boolean;
  fullscreen?: boolean;
  zIndex?: number;
  onClose?: () => void;
  onMinimize?: () => void;
  onToggleFullscreen?: () => void;
}) {
  const { open, fullscreen, zIndex, onClose, onMinimize, onToggleFullscreen } = props;
  if (!open) return null;
  return (
    <AppWindow
      title="Projects"
      fullscreen={!!fullscreen}
      zIndex={zIndex}
      onClose={onClose}
      onMinimize={onMinimize}
      onToggleFullscreen={onToggleFullscreen}
    >
      <div className="space-y-3">
        {PROJECTS.map((p) => (
          <div key={p.slug} className="border border-zinc-700/40 rounded-xl p-4 bg-black/20 backdrop-blur-sm">
            <div className="text-zinc-100 font-semibold">{p.name}</div>
            <div className="text-zinc-300">{p.desc}</div>
            <div className="text-zinc-400 text-sm">Tech: {p.tech.join(", ")}</div>
            <div className="mt-2 flex gap-3 text-sm">
              {p.demo && (
                <a className="text-green-400 underline" href={p.demo} target="_blank" rel="noreferrer">
                  demo ↗
                </a>
              )}
              {p.repo && (
                <a className="text-green-400 underline" href={p.repo} target="_blank" rel="noreferrer">
                  repo ↗
                </a>
              )}
            </div>
          </div>
        ))}
        {PROJECTS.length === 0 && (
          <div className="text-zinc-400">No projects yet. Add some in commands.tsx.</div>
        )}
      </div>
    </AppWindow>
  );
}
