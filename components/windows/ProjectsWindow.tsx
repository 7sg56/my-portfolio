"use client";

import React from "react";
import { PROJECTS } from "@/lib/data";

export default function ProjectsWindow() {
  return (
    <div className="h-full flex flex-col bg-black/40 backdrop-blur-sm relative z-50">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2 text-white">Showcasing My Work</h2>
            <p className="text-gray-300">A showcase of my recent work and side projects</p>
          </div>
          
          <div className="space-y-4">
            {PROJECTS.map((p) => (
            <div key={p.slug} className="border border-red-500/20 rounded-xl p-4 bg-black/30">
              <div className="text-white font-semibold text-lg mb-2">{p.name}</div>
              <div className="text-gray-200 mb-2">{p.desc}</div>
              <div className="text-gray-300 text-sm mb-3">Tech: <span className="text-red-400">{p.tech.join(", ")}</span></div>
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
              <div className="text-gray-400 text-center">No projects yet. Add some in commands.tsx.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
