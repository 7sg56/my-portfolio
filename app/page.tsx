"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Terminal from "@/components/terminal/Terminal";
import Desktop from "@/components/desktop/Desktop";
import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import UpcomingWindow from "@/components/windows/UpcomingWindow";
import GalleryWindow from "@/components/windows/GalleryWindow";
import AppWindow from "@/components/windows/AppWindow";
import NowListeningWidget from "@/components/widgets/NowListeningWidget";
import ClockWidget from "@/components/widgets/ClockWidget";
import WeatherWidget from "@/components/widgets/WeatherWidget";
import TodoWidget from "@/components/widgets/TodoWidget";
import TetrisWidget from "@/components/widgets/TetrisWidget";
import ThreeDWidget from "@/components/widgets/ThreeDWidget";
import Splash from "@/components/desktop/Splash";
import Hero from "@/components/hero/Hero";
export default function Home() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [externalCmd, setExternalCmd] = useState<string | null>(null);

  const [showAbout, setShowAbout] = useState(false);
  const [minAbout, setMinAbout] = useState(false);
  const [fsAbout, setFsAbout] = useState(false);

  const [showUpcoming, setShowUpcoming] = useState(false);
  const [minUpcoming, setMinUpcoming] = useState(false);
  const [fsUpcoming, setFsUpcoming] = useState(false);

  const [showProjects, setShowProjects] = useState(false);
  const [minProjects, setMinProjects] = useState(false);
  const [fsProjects, setFsProjects] = useState(false);

  const [showGallery, setShowGallery] = useState(false);
  const [minGallery, setMinGallery] = useState(false);
  const [fsGallery, setFsGallery] = useState(false);

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
      case "upcoming":
        setShowUpcoming(true); setMinUpcoming(false);
        return;
      case "projects":
        setShowProjects(true); setMinProjects(false);
        return;
      case "gallery":
        setShowGallery(true); setMinGallery(false);
        return;
    }
  };

  const runFromDesktop = (cmd: string) => {
    if (cmd === "__open_window__about") {
      setShowAbout(true); setMinAbout(false);
      return;
    }
    if (cmd === "__open_window__upcoming") {
      setShowUpcoming(true); setMinUpcoming(false);
      return;
    }
    if (cmd === "__open_window__projects") {
      setShowProjects(true); setMinProjects(false);
      return;
    }
    if (cmd === "__open_window__gallery") {
      setShowGallery(true); setMinGallery(false);
      return;
    }
    openTerminal();
    setExternalCmd(cmd);
  };


  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState(0);
  // Simulate loading progress between 3-5s with slight randomness per tick
  useEffect(() => {
    const total = Math.floor(3000 + Math.random() * 2000); // 3000-5000ms
    const interval = 80; // ms per tick
    const steps = Math.max(1, Math.floor(total / interval));
    let current = 0;
    const id = setInterval(() => {
      // base step with jitter
      const base = 100 / steps;
      const jitter = base * (Math.random() * 0.3 + 0.85); // 0.85x - 1.15x
      current = Math.min(100, current + jitter);
      setProgress(current);
      if (current >= 100) {
        clearInterval(id);
        // small delay to fully fill bar before revealing
        setTimeout(() => setShowSplash(false), 150);
      }
    }, interval);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative bg-black min-h-screen overflow-hidden">
      {/* Main content - always visible */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
          {/* Hero Section */}
          <Hero />

          {/* Desktop background + AppDrawer */}
          <Desktop onAction={runFromDesktop} onOpenTerminal={openTerminal} />

          {/* Bento Grid Widgets - Right Side */}
          <div className="absolute right-0 top-0 w-1/2 h-full p-6">
            <div className="h-full grid grid-cols-3 grid-rows-4 gap-4">

              <ClockWidget span={{ cols: 1, rows: 1 }} />
              
              <WeatherWidget span={{ cols: 1, rows: 1 }} />
              
              <TetrisWidget span={{ cols: 1, rows: 2 }} />
              
              <TodoWidget span={{ cols: 2, rows: 1 }} />
              
              <NowListeningWidget span={{ cols: 1, rows: 1 }} />
              
              <ThreeDWidget span={{ cols: 2, rows: 2 }} />
            </div>
          </div>

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
              <AboutWindow
                open
                fullscreen={fsAbout}
                zIndex={35}
                onClose={() => setShowAbout(false)}
                onMinimize={() => setMinAbout(true)}
                onToggleFullscreen={() => setFsAbout((x) => !x)}
              />
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
            {showUpcoming && !minUpcoming && (
              <UpcomingWindow
                open
                fullscreen={fsUpcoming}
                zIndex={33}
                onClose={() => setShowUpcoming(false)}
                onMinimize={() => setMinUpcoming(true)}
                onToggleFullscreen={() => setFsUpcoming((x) => !x)}
              />
            )}
            {showGallery && !minGallery && (
              <GalleryWindow
                open
                fullscreen={fsGallery}
                zIndex={32}
                onClose={() => setShowGallery(false)}
                onMinimize={() => setMinGallery(true)}
                onToggleFullscreen={() => setFsGallery((x) => !x)}
              />
            )}
          </AnimatePresence>

          {/* AppDrawer replaces previous dock */}
      </motion.div>

      {/* Splash overlay - on top with high z-index */}
      <Splash show={showSplash} progress={progress} />
    </main>
  );
}
