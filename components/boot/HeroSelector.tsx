"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

export default function HeroSelector({ defaultSeconds = 10, onSelect }: { defaultSeconds?: number; onSelect: (mode: "desktop" | "terminal" | "sourish") => void }) {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const items = useMemo(
    () => [
      { key: "sourish" as const, label: "SourishGhosh", desc: "Curated for Professionals" },
      { key: "desktop" as const, label: "7sg56", desc: "For developers and admirers" },
      { key: "terminal" as const, label: "s0urishg", desc: "A Terminal about me" },
    ],
    []
  );
  const [index, setIndex] = useState(1); // default selection: Desktop OS

  // Retro roles with typewriter effect (slower)
  const roles = useMemo(() => [
    "FullStack Dev",
    "Game Designer",
    "LeetCoder",
    "Creative Coder",
  ], []);
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const full = roles[roleIdx];
    let delay = deleting ? 55 : 95; // typing speed
    if (!deleting && typed === full) delay = 1000; // pause at end
    if (deleting && typed === "") delay = 450; // pause at start
    const id = setTimeout(() => {
      if (!deleting) {
        if (typed === full) setDeleting(true);
        else setTyped(full.slice(0, typed.length + 1));
      } else {
        if (typed === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % roles.length);
        } else setTyped(full.slice(0, typed.length - 1));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [typed, deleting, roleIdx, roles]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [paused, setPaused] = useState(false);
  // Countdown timer with pause support
  useEffect(() => {
    if (paused) return;
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [paused, seconds]);
  // Auto-boot when countdown ends (if not paused)
  useEffect(() => {
    if (!paused && seconds === 0) {
      onSelect("desktop");
    }
  }, [paused, seconds, onSelect]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => (i - 1 + items.length) % items.length);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => (i + 1) % items.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const it = items[index];
        onSelect(it.key);
      } else if (e.key.toLowerCase() === "p" || e.key === " ") {
        setPaused((p) => !p);
      }
    },
    [index, items, onSelect]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div ref={containerRef} className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
className="relative mx-auto w-full max-w-4xl rounded-xl border border-zinc-800/50 bg-zinc-950/40 shadow-2xl backdrop-blur-md"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/50 bg-zinc-900/30 rounded-t-xl">
          <div className="text-sm font-mono text-zinc-300">GRUB v2.06 — Boot Manager</div>
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-zinc-400">
              {paused ? "Auto boot paused" : `Auto boot Desktop OS in ${seconds}s`}
            </div>
            <button
              onClick={() => setPaused((p) => !p)}
              className="text-xs font-mono px-2 py-1 rounded border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 text-zinc-200"
            >
              {paused ? "Continue" : "Pause"}
            </button>
          </div>
        </div>

        {/* Name + retro tagline */}
        <div className="px-8 pt-8 pb-4 text-center">
          <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-50">I&apos;m Sourish Ghosh</div>
          <div className="mt-2 font-mono text-green-400 text-sm md:text-base">
            {typed}
            <span className="ml-1 text-green-500 animate-pulse">|</span>
          </div>
          <p className="mt-2 text-xs text-zinc-400">Press Enter to continue • Use P to pause/resume</p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <a href="/resume.pdf" download className="text-xs font-mono px-3 py-1.5 rounded border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 text-zinc-200">Resume</a>
            <a href="https://github.com/7sg56" target="_blank" rel="noopener noreferrer" className="text-xs font-mono px-3 py-1.5 rounded border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 text-zinc-200">GitHub</a>
          </div>
        </div>

        {/* Divider */}
        <div className="px-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        </div>

        {/* Menu */}
        <div role="menu" aria-label="Boot menu" className="px-6 py-6">
          <div className="mx-auto w-full max-w-2xl">
            {items.map((it, i) => {
              const selected = i === index;
              return (
                <motion.button
                  key={it.key}
                  onClick={() => {
                    onSelect(it.key);
                  }}
                  onMouseEnter={() => setIndex(i)}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: i * 0.03 }}
                  className={[
                    "group relative w-full text-left rounded-md border border-zinc-800/70 px-4 py-3 mb-3",
                    selected
                      ? "bg-gradient-to-r from-zinc-900 to-zinc-900/40 shadow-inner"
                      : "bg-zinc-950/60 hover:bg-zinc-900/50",
                  ].join(" ")}
                >
                  {/* Left accent and caret when selected */}
                  <span className="absolute left-0 top-0 h-full w-1 rounded-l-md"
                    style={{ background: selected ? "linear-gradient(180deg, #22c55e 0%, #16a34a 100%)" : "transparent" }}
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-5 text-right font-mono text-zinc-500">
                      {selected ? <span className="text-green-400">&gt;</span> : ""}
                    </div>
                    <div className="flex-1">
                      <div className="text-zinc-100 font-semibold tracking-tight flex items-center gap-2">
                        <span>{it.label}</span>
                        {it.key === "desktop" && <span className="ml-1 text-xs text-zinc-500">(default)</span>}
                      </div>
                      <div className="text-sm text-zinc-400">{it.desc}</div>
                    </div>
                    {selected && (
                      <div className="text-xs font-mono text-green-400">selected</div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Footer help */}
        <div className="px-8 pb-6">
          <div className="flex items-center justify-center text-xs font-mono text-zinc-500">
            <div>Use ↑ ↓ to choose, Enter to boot • P to pause/resume</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
