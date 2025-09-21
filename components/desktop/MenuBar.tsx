"use client";

import React, { useEffect, useState } from "react";

export default function MenuBar({ hidden = false }: { hidden?: boolean }) {
  const [now, setNow] = useState<string>(new Date().toLocaleString());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date().toLocaleString()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className={`fixed top-0 inset-x-0 h-8 px-3 flex items-center justify-between text-xs z-50 transition-opacity ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "rgba(20,20,28,0.75)", backdropFilter: "blur(12px)", borderBottom: "1px solid #313244", color: "#cdd6f4" }}
    >
      <div className="flex items-center gap-3">
        <span className="font-semibold">Portfolio</span>
        <span className="text-zinc-400 hidden sm:inline">File</span>
        <span className="text-zinc-400 hidden sm:inline">Edit</span>
        <span className="text-zinc-400 hidden sm:inline">View</span>
        <span className="text-zinc-400 hidden sm:inline">Go</span>
        <span className="text-zinc-400 hidden sm:inline">Window</span>
        <span className="text-zinc-400 hidden sm:inline">Help</span>
      </div>
      <div className="text-zinc-400">{now}</div>
    </div>
  );
}
