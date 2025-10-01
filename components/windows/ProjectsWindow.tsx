"use client";

import React from "react";
import { PROJECTS } from "@/lib/data";

export default function ProjectsWindow() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>Showcasing My Work</h1>
        <p style={{ color: '#cbd5e1' }}>A showcase of my recent work and side projects</p>
      </div>
      <div className="space-y-3">
        {PROJECTS.map((p) => (
        <div key={p.slug} className="border border-theme rounded-xl p-4 glass-2">
          <div className="text-theme font-semibold">{p.name}</div>
          <div className="text-theme-2">{p.desc}</div>
          <div className="text-theme-2 text-sm">Tech: {p.tech.join(", ")}</div>
          <div className="mt-2 flex gap-3 text-sm">
            {p.demo && (
              <a className="text-red-400 hover:text-red-300 hover:underline transition-colors font-medium" href={p.demo} target="_blank" rel="noopener noreferrer">
                demo ↗
              </a>
            )}
            {p.repo && (
              <a className="text-red-400 hover:text-red-300 hover:underline transition-colors font-medium" href={p.repo} target="_blank" rel="noopener noreferrer">
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
    </div>
  );
}
