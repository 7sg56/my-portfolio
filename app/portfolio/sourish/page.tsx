"use client";

import { motion } from "motion/react";

function Navbar() {
  return (
    <div className="h-10 px-3 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/70 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="font-bold">S∴ Sourish OS</div>
        <div className="text-zinc-400">Welcome</div>
      </div>
      <div className="text-xs text-zinc-500">{new Date().toLocaleString()}</div>
    </div>
  );
}

function Dock() {
  const items = [
    { key: "about", label: "About" },
    { key: "projects", label: "Projects" },
    { key: "cv", label: "CV" },
    { key: "contact", label: "Contact" },
  ];
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-zinc-900/70 border border-zinc-800 rounded-2xl px-4 py-2">
      {items.map((it) => (
        <button key={it.key} className="px-3 py-1 rounded-md hover:bg-zinc-800/70 transition">
          {it.label}
        </button>
      ))}
    </div>
  );
}

export default function SourishOSPage() {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr]" style={{
      backgroundImage: 'radial-gradient(1200px 600px at 10% -10%, rgba(255,255,255,0.06), transparent), radial-gradient(800px 400px at 90% 110%, rgba(255,255,255,0.05), transparent), linear-gradient(180deg, #0b0b0e, #0e0e14)'
    }}>
      <Navbar />
      <div className="relative p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Sourish OS</h1>
          <p className="text-zinc-400">Curated “HR mode” view. Clean, quick overview with links to resume and selected projects.</p>
          <div className="mt-6 grid gap-3">
            <a className="px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 w-max" href="/resume.pdf">View Resume</a>
            <a className="px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 w-max" href="https://github.com/7sg56" target="_blank" rel="noreferrer">GitHub</a>
            <a className="px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 w-max" href="https://www.linkedin.com/in/7sg56" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </motion.div>
        <Dock />
      </div>
    </div>
  );
}
