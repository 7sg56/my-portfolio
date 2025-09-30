"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import MenuBar from "@/components/desktop/MenuBar";
import Dock from "@/components/desktop/Dock";
import DesktopBackground from "@/components/desktop/DesktopBackground";
import AppWindow from "@/components/windows/AppWindow";
import SkillsWindow from "@/components/windows/SkillsWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ProjectsContent from "@/components/windows/ProjectsContent";
import AboutHome from "@/components/windows/AboutHome";

// Types
export type AppType = "about" | "projects" | "skills" | "contact" | "terminal";
export type WindowAppType = Exclude<AppType, "terminal">;
export type WidgetType = "clock" | "weather" | "todo" | "3d";

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

// Dock app definitions
const dockApps: DockApp[] = [
  { id: "about", name: "About", icon: "/window.svg", appType: "about" },
  { id: "skills", name: "Skills", icon: "/window.svg", appType: "skills" },
  { id: "contact", name: "Contact", icon: "/window.svg", appType: "contact" },
  { id: "terminal", name: "Terminal", icon: "/window.svg", appType: "terminal" },
];

// Desktop items removed for cleaner OS look
const desktopItems: Readonly<DesktopItem[]> = [] as const;

export default function DesktopOSPage() {
  const router = useRouter();

  // track which windows are open and a z-order stack for layering
  const [openWindows, setOpenWindows] = useState<Record<WindowAppType, boolean>>({
    about: true,
    projects: false,
    skills: false,
    contact: false,
  });
  const [windowStack, setWindowStack] = useState<WindowAppType[]>(["about"]);
  const [focusedWindow, setFocusedWindow] = useState<WindowAppType | null>("about");

  // Track fullscreen state per window
  const [fullscreenWindows, setFullscreenWindows] = useState<Record<WindowAppType, boolean>>({
    about: false,
    projects: false,
    skills: false,
    contact: false,
  });

  const computeLayout = useCallback(() => {
    // Separate items
    const foldersAndApps = desktopItems.filter((i) => i.type === "folder" || i.type === "app");
    const widgets = desktopItems.filter((i) => i.type === "widget");

    const width = typeof window !== "undefined" ? window.innerWidth : 1440;
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
    if (width < 1024) {
      cols = 2; baseW = 180; baseH = 160; gap = 12;
    } else if (width < 1440) {
      cols = 3; baseW = 220; baseH = 180; gap = 14;
    } else if (width < 1920) {
      cols = 3; baseW = 240; baseH = 200; gap = 16;
    } else {
      cols = 4; baseW = 260; baseH = 220; gap = 18;
    }

    const gridW = cols * baseW + (cols - 1) * gap;
    const xStart = Math.max(0, width - rightMargin - gridW);
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
  }, []);

  useEffect(() => {
    computeLayout();
    if (typeof window !== "undefined") {
      const onResize = () => computeLayout();
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
    setWindowStack(prev => prev.filter(w => w !== appType));
    setFocusedWindow(prev => (prev === appType ? null : prev));
  }, []);

  const toggleFullscreen = useCallback((appType: WindowAppType) => {
    setFullscreenWindows(prev => ({ ...prev, [appType]: !prev[appType] }));
    bringToFront(appType);
  }, [bringToFront]);

  // Dock app click
  const handleDockAppClick = useCallback((app: DockApp) => {
    if (app.appType === "terminal") {
      router.push("/portfolio/terminal");
    } else if (app.appType in openWindows) {
      openWindow(app.appType as WindowAppType);
    }
  }, [openWindow, router, openWindows]);

  const clearSelection = useCallback(() => {}, []);


  // Window descriptors to remove JSX duplication
  const WINDOW_CONFIG: Record<WindowAppType, { title: string; render: () => React.JSX.Element }> = {
    about: { title: "About", render: () => <AboutHome onOpen={(app) => openWindow(app as WindowAppType)} /> },
    projects: { title: "Projects", render: () => <ProjectsContent /> },
    skills: { title: "Skills", render: () => <SkillsWindow /> },
    contact: { title: "Contact / Socials", render: () => <ContactWindow /> },
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

      {/* Desktop Items removed in this revamp */}

      {/* Dock */}
      <Dock apps={dockApps} onAppClick={handleDockAppClick} />

      {/* Windows */}
      <AnimatePresence>
        {(Object.keys(WINDOW_CONFIG) as WindowAppType[]).map((appType) => {
          if (!openWindows[appType]) return null;
          const orderIndex = Math.max(0, windowStack.indexOf(appType));
          const { title, render } = WINDOW_CONFIG[appType];
          return (
            <AppWindow
              key={appType}
              title={title}
              onClose={() => closeWindow(appType)}
              onMinimize={() => closeWindow(appType)}
              onToggleFullscreen={() => toggleFullscreen(appType)}
              fullscreen={fullscreenWindows[appType]}
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
