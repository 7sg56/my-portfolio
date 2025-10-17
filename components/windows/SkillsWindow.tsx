"use client";

import React from "react";
import { getAllSkills } from "@/lib/data";

export default function SkillsWindow() {
  const skillCategories = getAllSkills();

  return (
    <div className="h-full flex flex-col bg-black/40 backdrop-blur-sm relative z-50">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Skills & Technologies</h2>
            <p className="text-gray-300">Technologies and tools I work with</p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((category) => (
              <div key={category.title} className="rounded-lg p-4 border border-red-500/20 bg-black/30">
                <h3 className="text-lg font-semibold text-white mb-4">{category.title}</h3>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-red-500/10 text-red-400 rounded text-xs border border-red-500/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
