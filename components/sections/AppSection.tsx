
"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";

type AppKey = "terminal" | "about" | "upcoming" | "projects" | "gallery";

// macOS-inspired SVG icons
const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" fillOpacity="0.9"/>
    <rect x="2" y="4" width="20" height="4" rx="2" fill="currentColor"/>
    <path d="M6 10l2 2-2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="10" y1="14" x2="14" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const AboutIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <circle cx="12" cy="8" r="4" fill="white" fillOpacity="0.9"/>
    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const ProjectsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <rect x="3" y="4" width="18" height="15" rx="2" fill="currentColor" fillOpacity="0.9"/>
    <rect x="3" y="4" width="18" height="4" rx="2" fill="currentColor"/>
    <circle cx="8" cy="12" r="1.5" fill="white" fillOpacity="0.8"/>
    <circle cx="12" cy="12" r="1.5" fill="white" fillOpacity="0.8"/>
    <circle cx="16" cy="12" r="1.5" fill="white" fillOpacity="0.8"/>
    <rect x="7" y="15" width="10" height="1" rx="0.5" fill="white" fillOpacity="0.6"/>
  </svg>
);

const GalleryIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" fillOpacity="0.9"/>
    <path d="M9 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" fill="white" fillOpacity="0.8"/>
    <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <rect x="1" y="3" width="18" height="2" rx="1" fill="white" fillOpacity="0.3"/>
  </svg>
);

const UpcomingIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <rect x="3" y="4" width="18" height="16" rx="2" fill="currentColor" fillOpacity="0.9"/>
    <rect x="3" y="4" width="18" height="4" rx="2" fill="currentColor"/>
    <line x1="7" y1="2" x2="7" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="17" y1="2" x2="17" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <rect x="6" y="11" width="2" height="2" rx="0.5" fill="white" fillOpacity="0.8"/>
    <rect x="11" y="11" width="2" height="2" rx="0.5" fill="white" fillOpacity="0.8"/>
    <rect x="16" y="11" width="2" height="2" rx="0.5" fill="white" fillOpacity="0.8"/>
    <rect x="6" y="15" width="2" height="2" rx="0.5" fill="white" fillOpacity="0.6"/>
    <rect x="11" y="15" width="2" height="2" rx="0.5" fill="white" fillOpacity="0.6"/>
  </svg>
);

// Professional app icons with dark theme colors and SVG icons
const APP_ICONS = {
  terminal: { 
    icon: <TerminalIcon />, 
    color: "from-gray-800 to-gray-900", 
    label: "Terminal",
    description: "Command Line"
  },
  about: { 
    icon: <AboutIcon />, 
    color: "from-slate-700 to-slate-800", 
    label: "About Me",
    description: "Personal Info"
  },
  projects: { 
    icon: <ProjectsIcon />, 
    color: "from-zinc-700 to-zinc-800", 
    label: "Projects",
    description: "Portfolio"
  },
  gallery: { 
    icon: <GalleryIcon />, 
    color: "from-stone-700 to-stone-800", 
    label: "Gallery",
    description: "Photos"
  },
  upcoming: { 
    icon: <UpcomingIcon />, 
    color: "from-neutral-700 to-neutral-800", 
    label: "Upcoming",
    description: "Events"
  },
};

export default function AppSection({
  onOpen,
  active,
}: {
  onOpen: (key: AppKey) => void;
  active?: Partial<Record<AppKey, boolean>>;
}) {

  const items: AppKey[] = useMemo(
    () => ["terminal", "about", "projects", "gallery", "upcoming"],
    []
  );

  return (
    <div className="fixed bottom-8 left-8 z-10">
      <div className="p-6 bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          className="text-white mb-6"
        >
          <h2 className="text-2xl font-bold mb-2">Applications</h2>
          <p className="text-zinc-400 text-sm">Click to open applications</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {items.map((appKey) => {
            const app = APP_ICONS[appKey];
            const isActive = !!active?.[appKey];
            
            return (
              <motion.button
                key={appKey}
                onClick={() => onOpen(appKey)}
                className="relative flex flex-col items-center group p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/70 transition-all duration-200"
                aria-label={`Open ${app.label}`}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* App Icon */}
                <motion.div 
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg border border-white/20 relative overflow-hidden mb-2`}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Glossy overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-2xl" />
                  
                  {/* Icon */}
                  <div className="relative z-10 text-white filter drop-shadow-sm">
                    {app.icon}
                  </div>
                  
                  {/* Reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/20 rounded-2xl" />
                </motion.div>
                
                {/* App Label */}
                <div className="text-center">
                  <div className="text-xs font-medium text-white">{app.label}</div>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}