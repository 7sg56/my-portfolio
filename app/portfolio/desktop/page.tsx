"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import MenuBar from "@/components/desktop/MenuBar";
import DesktopBackground from "@/components/desktop/DesktopBackground";
import AppWindow from "@/components/windows/AppWindow";
import SkillsWindow from "@/components/windows/SkillsWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ProjectsContent from "@/components/windows/ProjectsContent";
import AboutHome from "@/components/windows/AboutHome";
import LoreWindow from "@/components/windows/LoreWindow";
import AlgorithmWindow from "@/components/windows/AlgorithmWindow";
import TodoWidget from "@/components/widgets/TodoWidget";
import NowListeningWidget from "@/components/widgets/NowListeningWidget";
import TetrisWidget from "@/components/widgets/TetrisWidget";
import QuotesWidget from "@/components/widgets/QuotesWidget";

// Types
export type AppType = "about" | "projects" | "skills" | "contact" | "lore" | "algorithms";
export type WindowAppType = Exclude<AppType, "terminal">;
export type WidgetType = "todo" | "now-listening" | "tetris" | "quotes";

type DockApp = {
  id: string;
  name: string;
  icon: string;
  appType: string;
};

type DesktopItem = {
  id: string;
  type: "folder" | "widget" | "app";
  name: string;
  icon: string;
  x: number;
  y: number;
  appType?: WindowAppType; // desktop app shortcuts (no terminal here)
  widgetType?: WidgetType;
  // Optional for widgets: span in bento grid and computed pixel size
  span?: { cols: number; rows: number };
  widthPx?: number;
  heightPx?: number;
};

// Icon components
const AboutIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="#f8fafc" fillOpacity="0.1" stroke="#f8fafc" strokeWidth="2"/>
    <circle cx="16" cy="12" r="3" fill="#f8fafc"/>
    <path d="M8 24c0-4 3.5-7 8-7s8 3 8 7" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SkillsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="24" height="16" rx="2" fill="#f8fafc" fillOpacity="0.1" stroke="#f8fafc" strokeWidth="2"/>
    <path d="M8 12h16M8 16h12M8 20h8" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ContactIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="24" height="20" rx="2" fill="#f8fafc" fillOpacity="0.1" stroke="#f8fafc" strokeWidth="2"/>
    <path d="M4 10l12 8 12-8" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LoreIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="20" height="24" rx="2" fill="#f8fafc" fillOpacity="0.1" stroke="#f8fafc" strokeWidth="2"/>
    <path d="M10 8h12M10 12h8M10 16h12M10 20h6" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="22" cy="20" r="2" fill="#f8fafc"/>
  </svg>
);

const AlgorithmsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" rx="2" fill="#f8fafc" fillOpacity="0.1" stroke="#f8fafc" strokeWidth="2"/>
    <rect x="8" y="12" width="3" height="8" fill="#f8fafc"/>
    <rect x="12" y="8" width="3" height="12" fill="#f8fafc"/>
    <rect x="16" y="14" width="3" height="6" fill="#f8fafc"/>
    <rect x="20" y="10" width="3" height="10" fill="#f8fafc"/>
  </svg>
);

// Dock app definitions
const dockApps: DockApp[] = [
  { id: "about", name: "About", icon: "about", appType: "about" },
  { id: "skills", name: "Skills", icon: "skills", appType: "skills" },
  { id: "contact", name: "Contact", icon: "contact", appType: "contact" },
  { id: "lore", name: "Lore", icon: "lore", appType: "lore" },
  { id: "algorithms", name: "Algorithms", icon: "algorithms", appType: "algorithms" },
];

// Desktop items will be defined inside component

export default function DesktopOSPage() {

  // track which windows are open and a z-order stack for layering
  const [openWindows, setOpenWindows] = useState<Record<WindowAppType, boolean>>({
    about: true,
    projects: false,
    skills: false,
    contact: false,
    lore: false,
    algorithms: false,
  });

  // Window dimensions - use consistent initial values to prevent hydration mismatch
  const [width, setWidth] = useState(1440);
  const [height, setHeight] = useState(900);
  const [windowStack, setWindowStack] = useState<WindowAppType[]>(["about"]);
  const [focusedWindow, setFocusedWindow] = useState<WindowAppType | null>("about");

  // Track fullscreen state per window
  const [fullscreenWindows, setFullscreenWindows] = useState<Record<WindowAppType, boolean>>({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    lore: false,
    algorithms: false,
  });

  // Track minimized state per window
  const [minimizedWindows, setMinimizedWindows] = useState<Record<WindowAppType, boolean>>({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    lore: false,
    algorithms: false,
  });

  // Update window dimensions after hydration to prevent hydration mismatch
  useEffect(() => {
    const updateDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const computeLayout = useCallback(() => {
    // Separate items
    const foldersAndApps = desktopItems.filter((i) => i.type === "folder" || i.type === "app");
    const widgets = desktopItems.filter((i) => i.type === "widget");

    const currentWidth = width;
    // const height = typeof window !== "undefined" ? window.innerHeight : 900;

    // Left column layout for folders/apps
    const leftMargin = 24;
    const topOffset = 96; // account for menu bar
    const vGap = 100;
    // Left column layout for folders/apps
    foldersAndApps.map((item, idx) => ({
      ...item,
      x: leftMargin,
      y: topOffset + idx * vGap,
    }));

    // Right bento grid for widgets with variable spans
    const rightMargin = 24;
    let cols = 3;
    let baseW = 224; // base tile width
    let baseH = 192; // base tile height
    let gap = 16;

    // Responsive scaling for widget tiles
    if (currentWidth < 1024) {
      cols = 2; baseW = 180; baseH = 160; gap = 12;
    } else if (currentWidth < 1440) {
      cols = 3; baseW = 220; baseH = 180; gap = 14;
    } else if (currentWidth < 1920) {
      cols = 3; baseW = 240; baseH = 200; gap = 16;
    } else {
      cols = 4; baseW = 260; baseH = 220; gap = 18;
    }

    const gridW = cols * baseW + (cols - 1) * gap;
    const xStart = Math.max(0, currentWidth - rightMargin - gridW);
    const yStart = topOffset;

    // Occupancy grid (rows will grow dynamically)
    const occupancy: boolean[][] = [];
    const ensureRows = (rows: number) => {
      while (occupancy.length < rows) {
        occupancy.push(Array(cols).fill(false));
      }
    };
    const canPlace = (r: number, c: number, spanCols: number, spanRows: number) => {
      if (c + spanCols > cols) return false;
      ensureRows(r + spanRows);
      for (let rr = r; rr < r + spanRows; rr++) {
        for (let cc = c; cc < c + spanCols; cc++) {
          if (occupancy[rr][cc]) return false;
        }
      }
      return true;
    };
    const markPlaced = (r: number, c: number, spanCols: number, spanRows: number) => {
      for (let rr = r; rr < r + spanRows; rr++) {
        for (let cc = c; cc < c + spanCols; cc++) {
          occupancy[rr][cc] = true;
        }
      }
    };

    const placedWidgets: DesktopItem[] = [];

    for (const item of widgets) {
      const spanCols = Math.max(1, Math.min(cols, item.span?.cols ?? 1));
      const spanRows = Math.max(1, item.span?.rows ?? 1);

      let placed = false;
      let r = 0;
      while (!placed) {
        ensureRows(r + spanRows);
        for (let c = 0; c < cols; c++) {
          if (canPlace(r, c, spanCols, spanRows)) {
            const x = xStart + c * (baseW + gap);
            const y = yStart + r * (baseH + gap);
            const widthPx = spanCols * baseW + (spanCols - 1) * gap;
            const heightPx = spanRows * baseH + (spanRows - 1) * gap;
            placedWidgets.push({ ...item, x, y, widthPx, heightPx });
            markPlaced(r, c, spanCols, spanRows);
            placed = true;
            break;
          }
        }
        if (!placed) r += 1; // go to next row
      }
    }

    // Layout computed
  }, [width]);

  useEffect(() => {
    computeLayout();
    if (typeof window !== "undefined") {
      const onResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        computeLayout();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, [computeLayout]);

  // Window helpers
  const bringToFront = useCallback((appType: WindowAppType) => {
    setWindowStack(prev => [...prev.filter(w => w !== appType), appType]);
    setFocusedWindow(appType);
  }, []);

  const openWindow = useCallback((appType: WindowAppType) => {
    setOpenWindows(prev => ({ ...prev, [appType]: true }));
    setWindowStack(prev => [...prev.filter(w => w !== appType), appType]);
    setFocusedWindow(appType);
  }, []);

  const closeWindow = useCallback((appType: WindowAppType) => {
    setOpenWindows(prev => ({ ...prev, [appType]: false }));
    setMinimizedWindows(prev => ({ ...prev, [appType]: false }));
    setWindowStack(prev => prev.filter(w => w !== appType));
    setFocusedWindow(prev => (prev === appType ? null : prev));
  }, []);

  const minimizeWindow = useCallback((appType: WindowAppType) => {
    setMinimizedWindows(prev => ({ ...prev, [appType]: true }));
    setFocusedWindow(prev => (prev === appType ? null : prev));
  }, []);

  const toggleFullscreen = useCallback((appType: WindowAppType) => {
    setFullscreenWindows(prev => ({ ...prev, [appType]: !prev[appType] }));
    bringToFront(appType);
  }, [bringToFront]);

  // Dock app click
  const handleDockAppClick = useCallback((app: DockApp) => {
    const appType = app.appType as WindowAppType;
    if (app.appType in openWindows) {
      if (minimizedWindows[appType]) {
        // Restore minimized window
        setMinimizedWindows(prev => ({ ...prev, [appType]: false }));
        bringToFront(appType);
      } else {
        // Open or focus window
        openWindow(appType);
      }
    }
  }, [openWindow, openWindows, minimizedWindows, bringToFront]);

  const clearSelection = useCallback(() => {}, []);

  // 4 Corner Widget Layout
  const desktopItems: DesktopItem[] = useMemo(() => [
    {
      id: "quotes-widget",
      name: "Random Quotes",
      icon: "",
      type: "widget",
      widgetType: "quotes",
      // TOP-LEFT CORNER
      x: 10,   // ← Distance from left edge
      y: 50,  // ← Distance from top edge
      widthPx: 400,  // ← Widget width
      heightPx: 200, // ← Widget height
    },
    {
      id: "tetris-widget",
      name: "Tetris",
      icon: "",
      type: "widget",
      widgetType: "tetris",
      // TOP-RIGHT CORNER
      x: width - 210,  // ← Distance from right edge (width - widgetWidth - margin)
      y: 50,  // ← Distance from top edge
      widthPx: 200,  // ← Widget width
      heightPx: 400, // ← Widget height
    },
    {
      id: "now-listening-widget",
      name: "Now Listening",
      icon: "",
      type: "widget",
      widgetType: "now-listening",
      // BOTTOM-LEFT CORNER
      x: 10,   // ← Distance from left edge
      y: height - 150,  // ← Distance from bottom edge (height - widgetHeight - margin)
      widthPx: 200,  // ← Widget width
      heightPx: 150, // ← Widget height
    },
    {
      id: "todo-widget",
      name: "Things I Be Doing",
      icon: "",
      type: "widget",
      widgetType: "todo",
      // BOTTOM-RIGHT CORNER
      x: width - 320,  // ← Distance from right edge (width - widgetWidth - margin)
      y: height - 200, // ← Distance from bottom edge (height - widgetHeight - margin)
      widthPx: 300,  // ← Widget width
      heightPx: 180, // ← Widget height
    },
  ], [width, height]);

  // Widget renderer - direct widgets
  const renderWidget = (widgetType: WidgetType) => {
    switch (widgetType) {
      case "todo":
        return <TodoWidget />;
      case "now-listening":
        return <NowListeningWidget />;
      case "tetris":
        return <TetrisWidget />;
      case "quotes":
        return <QuotesWidget />;
      default:
        return null;
    }
  };


  // Window descriptors to remove JSX duplication
  const WINDOW_CONFIG: Record<WindowAppType, { title: string; render: () => React.JSX.Element }> = {
    about: { title: "About", render: () => <AboutHome onOpen={(app) => openWindow(app as WindowAppType)} /> },
    projects: { title: "Projects", render: () => <ProjectsContent /> },
    skills: { title: "Skills", render: () => <SkillsWindow /> },
    contact: { title: "Contact / Socials", render: () => <ContactWindow /> },
    lore: { title: "Lore", render: () => <LoreWindow /> },
    algorithms: { title: "Algorithms", render: () => <AlgorithmWindow /> },
  } as const;

  const zBase = 100; // base z-index for windows

  return (
    <div
      className="relative w-full h-screen bg-black overflow-hidden select-none"
      role="application"
      aria-label="Desktop environment"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          clearSelection();
          setFocusedWindow(null);
        }
      }}
    >
      {/* Desktop Background */}
      <DesktopBackground backgroundImage="/bg3.png" overlay={false} />

      {/* Menu Bar */}
      <MenuBar title={focusedWindow ? WINDOW_CONFIG[focusedWindow]?.title : "Desktop"} showSystemMenu={true} terminalHref="/portfolio/terminal" shutdownHref="/gui" />

      {/* Desktop Widgets */}
      {desktopItems.map((item) => {
        if (item.type !== "widget" || !item.widgetType) return null;
        return (
          <motion.div
            key={item.id}
            className="absolute pointer-events-auto"
            style={{
              left: item.x,
              top: item.y,
              width: item.widthPx,
              height: item.heightPx,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {renderWidget(item.widgetType)}
          </motion.div>
        );
      })}

      {/* Custom Dock with unique icons */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 flex items-end gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          {dockApps.map((app) => {
            const isOpen = openWindows[app.appType as WindowAppType];
            const hasIndicator = isOpen;
            return (
              <motion.button
                key={app.id}
                className="flex flex-col items-center w-16 h-16 text-gray-100 hover:scale-110 transition-transform duration-200 relative"
                onClick={() => handleDockAppClick(app)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-12 h-12 glass-2 border border-theme rounded-xl flex items-center justify-center mb-1 hover:glass-1 transition-colors duration-200 shadow-md ${hasIndicator ? 'ring-2 ring-accent/50' : ''}`}>
                  {app.icon === "about" && <AboutIcon />}
                  {app.icon === "skills" && <SkillsIcon />}
                  {app.icon === "contact" && <ContactIcon />}
                  {app.icon === "lore" && <LoreIcon />}
                  {app.icon === "algorithms" && <AlgorithmsIcon />}
                </div>
                {/* macOS-style indicator dot */}
                {hasIndicator && (
                  <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-accent"></div>
                )}
                <span className="text-[10px] font-medium text-gray-200">{app.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Windows */}
      <AnimatePresence>
        {(Object.keys(WINDOW_CONFIG) as WindowAppType[]).map((appType) => {
          if (!openWindows[appType]) return null;
          const orderIndex = Math.max(0, windowStack.indexOf(appType));
          const { title, render } = WINDOW_CONFIG[appType];
          const isMinimized = minimizedWindows[appType];
          return (
            <AppWindow
              key={appType}
              title={title}
              onClose={() => closeWindow(appType)}
              onMinimize={() => minimizeWindow(appType)}
              onToggleFullscreen={() => toggleFullscreen(appType)}
              fullscreen={fullscreenWindows[appType]}
              minimized={isMinimized}
              zIndex={zBase + orderIndex}
            >
              {render()}
            </AppWindow>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
