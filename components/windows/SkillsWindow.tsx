"use client";

import React from "react";

export default function SkillsWindow() {
  return (
    <div className="flex h-full w-full flex-col gap-6 text-theme-2">
      <div className="rounded-2xl border border-theme glass-1 p-6">
        <h2 className="text-xl font-semibold text-theme">Skills</h2>
        <p>Tech I use and like.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Languages", items: ["TypeScript", "JavaScript", "Go", "Python"] },
          { title: "Frameworks", items: ["Next.js", "React", "tRPC", "Express"] },
          { title: "Styling", items: ["Tailwind CSS", "CSS Modules", "Framer/Motion"] },
          { title: "Cloud/DevOps", items: ["Vercel", "Docker", "CI/CD"] },
          { title: "Databases", items: ["PostgreSQL", "SQLite", "Prisma"] },
          { title: "Testing", items: ["Jest", "Playwright"] },
        ].map((sec) => (
          <div key={sec.title} className="rounded-2xl border border-theme glass-2 p-5">
            <div className="text-sm font-semibold text-theme mb-2">{sec.title}</div>
            <div className="flex flex-wrap gap-2">
              {sec.items.map((i) => (
                <span key={i} className="px-2 py-1 rounded-md border border-theme glass-1 text-xs">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
