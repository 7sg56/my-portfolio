"use client";

import React from "react";

type WidgetCardProps = {
  title: string;
  icon?: React.ReactNode;
  headerExtra?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export default function WidgetCard({ title, icon, headerExtra, className, children }: WidgetCardProps) {
  return (
    <div className={`h-full min-h-0 rounded-2xl border border-theme glass-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden ${className || ""}`}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-theme glass-1">
        <div className="flex items-center gap-3 text-sm font-semibold text-theme">
          {icon ? <span className="text-lg leading-none">{icon}</span> : null}
          <span className="text-theme">{title}</span>
        </div>
        {headerExtra ? <div className="text-xs text-theme-2 glass-1 px-2 py-1 rounded-md">{headerExtra}</div> : null}
      </div>
      <div className="flex-1 p-6 min-h-0 flex flex-col justify-center text-theme-2">
        {children}
      </div>
    </div>
  );
}


