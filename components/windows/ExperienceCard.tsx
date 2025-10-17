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
    <div className="border border-red-500/20 rounded-xl p-4 bg-black/30">
      <div className="flex items-start justify-between mb-2">
        <div className="text-white font-semibold">{title}</div>
        {isCurrent && (
          <div className="bg-green-500/20 px-3 py-1 rounded-full text-xs font-medium text-green-400 border border-green-500/30">
            Current
          </div>
        )}
      </div>
      <div className="text-gray-300 text-sm mb-2">{company} • <span className="text-red-400">{duration}</span></div>
      <div className="text-gray-200 mb-3">{description}</div>
      {tech && tech.length > 0 && (
        <div className="text-gray-300 text-sm mb-3">Tech: <span className="text-red-400">{tech.join(", ")}</span></div>
      )}
      {achievements && achievements.length > 0 && (
        <div className="flex gap-3 text-sm">
          {achievements.map((achievement, index) => (
            <span key={index} className="text-gray-300">• <span className="text-red-400">{achievement}</span></span>
          ))}
        </div>
      )}
    </div>
  );
}
