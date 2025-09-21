"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Terminal from "@/components/terminal/Terminal";
import Desktop from "@/components/desktop/Desktop";
import SpotifyWindow from "@/components/windows/SpotifyWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import UpcomingWindow from "@/components/windows/UpcomingWindow";
import GalleryWindow from "@/components/windows/GalleryWindow";
import AppWindow from "@/components/windows/AppWindow";

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [externalCmd, setExternalCmd] = useState<string | null>(null);

  const [showSpotify, setShowSpotify] = useState(false);
  const [minSpotify, setMinSpotify] = useState(false);
  const [fsSpotify, setFsSpotify] = useState(false);

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

  const runFromDesktop = (cmd: string) => {
    if (cmd === "__open_window__spotify") {
      setShowSpotify(true); setMinSpotify(false);
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


  return (
    <main className="relative bg-black min-h-screen overflow-hidden">
      {/* Desktop background + icons */}
      <Desktop onAction={runFromDesktop} onOpenTerminal={openTerminal} />

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
        {showSpotify && !minSpotify && (
          <SpotifyWindow
            open
            fullscreen={fsSpotify}
            zIndex={35}
            onClose={() => setShowSpotify(false)}
            onMinimize={() => setMinSpotify(true)}
            onToggleFullscreen={() => setFsSpotify((x) => !x)}
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

      {/* Dock */}
      <div className="fixed inset-x-0 bottom-3 flex items-center justify-center z-50">
        <div className="backdrop-blur bg-zinc-900/50 border border-zinc-800 rounded-2xl px-3 py-2 flex items-center gap-3 font-mono text-sm">
          <button
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-zinc-800/60"
            onClick={() => {
              if (!showTerminal) setShowTerminal(true);
              setMinimized(false);
            }}
            aria-label="Open Terminal"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/window.svg" alt="" className="h-5 w-5" />
            <span className="text-sm text-zinc-200">Terminal</span>
          </button>

          <button
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-zinc-800/60"
            onClick={() => { if (!showSpotify) setShowSpotify(true); setMinSpotify(false); }}
            aria-label="Open Spotify"
          >
            <img src="/globe.svg" alt="" className="h-5 w-5" />
            <span className="text-sm text-zinc-200">Spotify</span>
          </button>

          <button
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-zinc-800/60"
            onClick={() => { if (!showProjects) setShowProjects(true); setMinProjects(false); }}
            aria-label="Open Projects"
          >
            <img src="/globe.svg" alt="" className="h-5 w-5" />
            <span className="text-sm text-zinc-200">Projects</span>
          </button>

          <button
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-zinc-800/60"
            onClick={() => { if (!showGallery) setShowGallery(true); setMinGallery(false); }}
            aria-label="Open Gallery"
          >
            <img src="/file.svg" alt="" className="h-5 w-5" />
            <span className="text-sm text-zinc-200">Gallery</span>
          </button>

          <button
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-zinc-800/60"
            onClick={() => { if (!showUpcoming) setShowUpcoming(true); setMinUpcoming(false); }}
            aria-label="Open Upcoming"
          >
            <img src="/file.svg" alt="" className="h-5 w-5" />
            <span className="text-sm text-zinc-200">Upcoming</span>
          </button>
        </div>
      </div>
    </main>
  );
}
