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
    <div className={`h-full min-h-0 rounded-2xl border border-gray-600/30 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden ${className || ""}`}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-600/30 bg-gradient-to-r from-gray-700/50 to-gray-800/50">
        <div className="flex items-center gap-3 text-sm font-semibold text-gray-100">
          {icon ? <span className="text-lg leading-none">{icon}</span> : null}
          <span className="text-gray-100">{title}</span>
        </div>
        {headerExtra ? <div className="text-xs text-gray-300 bg-gray-700/50 px-2 py-1 rounded-md">{headerExtra}</div> : null}
      </div>
      <div className="flex-1 p-6 min-h-0 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}


