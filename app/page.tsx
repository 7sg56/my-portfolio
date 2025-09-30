"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Terminal from "@/components/terminal/Terminal";
import AboutHome from "@/components/windows/AboutHome";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import AppWindow from "@/components/windows/AppWindow";
import NowListeningWidget from "@/components/widgets/NowListeningWidget";
import TodoWidget from "@/components/widgets/TodoWidget";
import TetrisWidget from "@/components/widgets/TetrisWidget";
import BootLog from "@/components/boot/BootLog";
import HeroSelector from "@/components/boot/HeroSelector";
import Hero from "@/components/hero/Hero";
import AppSection from "@/components/sections/AppSection";
import SpaceShooterBG from "@/components/boot/SpaceShooterBG";
import { BACKGROUND_IMAGE } from "@/config/site";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [showTerminal, setShowTerminal] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [externalCmd, setExternalCmd] = useState<string | null>(null);

  // Boot flow state machine: boot -> grub -> running
  const [phase, setPhase] = useState<"boot" | "grub" | "running">("boot");
  const [mode] = useState<"gui" | "cli">("gui");

  const [showAbout, setShowAbout] = useState(false);
  const [minAbout, setMinAbout] = useState(false);
  const [fsAbout, setFsAbout] = useState(false);

  const [showProjects, setShowProjects] = useState(false);
  const [minProjects, setMinProjects] = useState(false);
  const [fsProjects, setFsProjects] = useState(false);

  const openTerminal = () => {
    setShowTerminal(true);
    setMinimized(false);
  };

  const openApp = (key: "terminal" | "about" | "upcoming" | "projects" | "gallery") => {
    switch (key) {
      case "terminal":
        openTerminal();
        return;
      case "about":
        setShowAbout(true); setMinAbout(false);
        return;
      case "projects":
        setShowProjects(true); setMinProjects(false);
        return;
    }
  };



  const [progress, setProgress] = useState(0);
  // Simulate loading progress in ~3s, then show GRUB
  useEffect(() => {
    const total = 3000; // fixed 3 seconds
    const interval = 80; // ms per tick
    const steps = Math.max(1, Math.floor(total / interval));
    let current = 0;
    const id = setInterval(() => {
      const base = 100 / steps;
      const jitter = base * 1.0; // steady
      current = Math.min(100, current + jitter);
      setProgress(current);
      if (current >= 100) {
        clearInterval(id);
        setTimeout(() => setPhase("grub"), 100);
      }
    }, interval);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden" style={{
      backgroundImage: mode === 'gui' ? `url(${BACKGROUND_IMAGE})` : 'none',
      backgroundColor: mode === 'cli' ? '#000000' : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Main content - always visible */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
          {mode === 'gui' && (
            <>
              {/* Hero Section */}
              <Hero />

              {/* App Section - Bottom Left */}
              <AppSection
                onOpen={openApp}
                active={{
                  terminal: showTerminal,
                  about: showAbout,
                  projects: showProjects
                }}
              />

              {/* Bento Grid Widgets - Right Side */}
              <div className="absolute right-0 top-0 w-1/2 h-full p-6">
                <div className="h-full grid grid-cols-3 grid-rows-4 gap-4">
                  
                  <TetrisWidget span={{ cols: 1, rows: 2 }} />
                  
                  <TodoWidget span={{ cols: 2, rows: 1 }} />
                  
                  <NowListeningWidget span={{ cols: 1, rows: 1 }} />
                </div>
              </div>
            </>
          )}

          {/* Terminal window using AppWindow for unified behavior */}
          <AnimatePresence>
            {showTerminal && !minimized && (
              <AppWindow
                id="terminal"
                title="sourish@portfolio — zsh"
                fullscreen={fullscreen}
                zIndex={40}
                onClose={() => setShowTerminal(false)}
                onMinimize={() => setMinimized(true)}
                onToggleFullscreen={() => setFullscreen((f) => !f)}
              >
                <Terminal
                  externalCommand={externalCmd}
                  onExternalConsumed={() => setExternalCmd(null)}
                  embedded
                  chrome={false}
                />
              </AppWindow>
            )}
          </AnimatePresence>

          {/* App windows */}
          <AnimatePresence>
            {showAbout && !minAbout && (
              <AppWindow
                title="About"
                fullscreen={fsAbout}
                zIndex={35}
                onClose={() => setShowAbout(false)}
                onMinimize={() => setMinAbout(true)}
                onToggleFullscreen={() => setFsAbout((x) => !x)}
              >
                <AboutHome onOpen={() => {}} />
              </AppWindow>
            )}
            {showProjects && !minProjects && (
              <ProjectsWindow
                open
                fullscreen={fsProjects}
                zIndex={34}
                onClose={() => setShowProjects(false)}
                onMinimize={() => setMinProjects(true)}
                onToggleFullscreen={() => setFsProjects((x) => !x)}
              />
            )}
            
          </AnimatePresence>

          {/* AppDrawer replaces previous dock */}
      </motion.div>

      {/* Boot/GRUB overlay (no routing) */}
      <AnimatePresence>
        {phase !== 'running' && (
          <motion.div
            key="boot-overlay"
            className="fixed inset-0 z-[70]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-black" />
            <div className="relative w-full h-full grid place-items-center p-4">
{phase === 'boot' ? (
                <div className="absolute inset-0">
                  <BootLog progress={progress} />
                </div>
              ) : (
                <>
                  <SpaceShooterBG opacity={0.9} />
                  <div className="relative w-full max-w-3xl">
                  <HeroSelector
                    defaultSeconds={10}
                    onSelect={(m) => {
                      if (m === 'desktop') {
                        router.push('/portfolio/desktop');
                      } else if (m === 'terminal') {
                        router.push('/portfolio/terminal');
                      } else if (m === 'sourish') {
                        router.push('/portfolio/sourish');
                      }
                    }}
                  />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
