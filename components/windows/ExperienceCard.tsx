"use client";

import React from "react";

interface ExperienceCardProps {
  title: string;
  company: string;
  duration: string;
  description: string;
  tech?: string[];
  achievements?: string[];
  isCurrent?: boolean;
}

export default function ExperienceCard({
  title,
  company,
  duration,
  description,
  tech,
  achievements,
  isCurrent = false,
}: ExperienceCardProps) {
  return (
    <div className="border border-theme/40 rounded-xl p-4 glass-1">
      <div className="flex items-start justify-between mb-2">
        <div className="text-theme font-semibold">{title}</div>
        {isCurrent && (
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-1 rounded-full text-xs font-medium text-green-400 border border-green-500/30">
            Current
          </div>
        )}
      </div>
      <div className="text-theme-2 text-sm mb-2">{company} • {duration}</div>
      <div className="text-theme-2 mb-3">{description}</div>
      {tech && tech.length > 0 && (
        <div className="text-theme-2 text-sm mb-3">Tech: {tech.join(", ")}</div>
      )}
      {achievements && achievements.length > 0 && (
        <div className="flex gap-3 text-sm">
          {achievements.map((achievement, index) => (
            <span key={index} className="text-theme-2">• {achievement}</span>
          ))}
        </div>
      )}
    </div>
  );
}
