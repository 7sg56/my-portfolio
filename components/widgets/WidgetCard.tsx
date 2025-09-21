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
    <div className={`h-full min-h-0 rounded-xl border border-zinc-800 bg-zinc-900/70 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col ${className || ""}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
          {icon ? <span className="text-base leading-none">{icon}</span> : null}
          <span>{title}</span>
        </div>
        {headerExtra ? <div className="text-xs text-zinc-400">{headerExtra}</div> : null}
      </div>
      <div className="flex-1 p-4 min-h-0">
        {children}
      </div>
    </div>
  );
}


