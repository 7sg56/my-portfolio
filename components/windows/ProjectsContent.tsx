"use client";

import React from "react";
import { PROJECTS } from "@/components/terminal/commands";

export default function ProjectsContent() {
  return (
    <div className="space-y-3">
      {PROJECTS.map((p) => (
        <div key={p.slug} className="border border-theme rounded-xl p-4 glass-2">
          <div className="text-theme font-semibold">{p.name}</div>
          <div className="text-theme-2">{p.desc}</div>
          <div className="text-theme-2 text-sm">Tech: {p.tech.join(", ")}</div>
          <div className="mt-2 flex gap-3 text-sm">
            {p.demo && (
              <a className="text-accent hover:underline" href={p.demo} target="_blank" rel="noreferrer">
                demo ↗
              </a>
            )}
            {p.repo && (
              <a className="text-accent hover:underline" href={p.repo} target="_blank" rel="noreferrer">
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
  );
}
