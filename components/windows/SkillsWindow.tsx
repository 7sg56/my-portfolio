"use client";

import React from "react";

export default function SkillsWindow() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "tRPC", "GraphQL", "REST APIs", "WebSockets"]
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "MongoDB", "Prisma", "Redis", "SQLite", "Supabase"]
    },
    {
      title: "DevOps",
      skills: ["AWS", "Docker", "Vercel", "GitHub Actions", "CI/CD", "Kubernetes"]
    },
    {
      title: "Tools",
      skills: ["Git", "Figma", "VS Code", "Postman", "Jest", "Playwright"]
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-theme mb-2">Skills</h1>
          <p className="text-theme-2">Technologies and tools I work with</p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((category) => (
            <div key={category.title} className="glass-2 rounded-lg p-4 border border-theme bg-black/20 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-theme mb-4">{category.title}</h2>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-accent/10 text-accent rounded text-xs border border-accent/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
