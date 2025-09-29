"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

function Navbar() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const update = () => setNow(new Date().toLocaleString());
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="h-10 px-3 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/70 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="font-bold"> 7sg56</div>
        <div className="text-zinc-400">Terminal</div>
      </div>
      <div className="text-xs text-zinc-500" suppressHydrationWarning>{now}</div>
    </div>
  );
}

function Dock() {
  const items = [
    { key: "about", label: "About" },
    { key: "projects", label: "Projects" },
    { key: "skills", label: "Skills" },
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

export default function GuiDesktop() {
  return (
    <div className="min-h-[80vh] grid grid-rows-[auto,1fr]">
      <Navbar />
      <div className="relative p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Welcome to the Desktop</h1>
          <p className="text-zinc-400">This is a scaffold. Add windows for About, Projects, Skills, Contact. Include widgets like Clock, Weather, Hobbies, and optional Tetris/Spotify.</p>
        </motion.div>
        <Dock />
      </div>
    </div>
  );
}
