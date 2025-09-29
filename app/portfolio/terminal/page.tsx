"use client";

import { useState } from "react";
import Terminal from "@/components/terminal/Terminal";


export default function TerminalPage() {
  const [sessionKey] = useState<string>(() => crypto.randomUUID());

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono">
      {/* CRT effects overlays */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "repeating-linear-gradient(180deg, rgba(16,255,106,0.12) 0, rgba(16,255,106,0.12) 1px, transparent 2px)",
      }} />
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(80% 80% at 50% 50%, transparent 62%, rgba(0,0,0,0.45) 100%)"
      }} />
      <div className="crt-scanline pointer-events-none" />

      {/* Terminal with embedded banner (ASCII header) */}
      <div className="relative z-10 h-screen">
        <Terminal
          embedded
          chrome={false}
          showBanner={true}
          showFooter={false}
          sessionKey={sessionKey}
          scrollMode="internal"
          scrollHeightClass="h-full"
        />
      </div>
    </div>
  );
}
