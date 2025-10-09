"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import MenuBar from "@/components/desktop/MenuBar";
import DesktopBackground from "@/components/desktop/DesktopBackground";
import AppWindow from "@/components/windows/AppWindow";
import SkillsWindow from "@/components/windows/SkillsWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import AboutHome from "@/components/windows/AboutHome";
import TetrisGameWindow from "@/components/windows/TetrisGameWindow";
import AlgorithmWindow from "@/components/windows/AlgorithmWindow";
import TodoWidget from "@/components/widgets/TodoWidget";
import NowListeningWidget from "@/components/widgets/NowListeningWidget";
import DateNowWidget from "@/components/widgets/DateNowWidget";
import TechStackStrip from "@/components/TechStackStrip";
import { getResponsiveConfig, responsive} from "@/lib/responsive";


// Animated Role Text Component
const AnimatedRoleText = () => {
  const [currentRole, setCurrentRole] = useState("innovation");
  const [isAnimating, setIsAnimating] = useState(false);

  const roles = useMemo(() => ["innovation", "creativity", "excellence", "vision"], []);
  const randomChars = "abcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    let currentIndex = 0;
    
    const cycleRoles = () => {
      // Show current role for 2.5 seconds
      setTimeout(() => {
        // Glitch/randomizer animation
        setIsAnimating(true);
        let glitchCount = 0;
        
        const glitchInterval = setInterval(() => {
          if (glitchCount < 40) {
            const randomText = Array.from({ length: roles[currentIndex].length }, () => 
              randomChars[Math.floor(Math.random() * randomChars.length)]
            ).join('');
            setCurrentRole(randomText);
            glitchCount++;
          } else {
            clearInterval(glitchInterval);
            // Move to next role
            currentIndex = (currentIndex + 1) % roles.length;
            setCurrentRole(roles[currentIndex]);
            setIsAnimating(false);
            // Continue cycling
            setTimeout(cycleRoles, 2500);
          }
        }, 20);
      }, 2500);
    };

    cycleRoles();
  }, [roles]);

  return (
    <motion.span
      className="text-accent font-medium ml-2"
      animate={{
        y: isAnimating ? [0, -1, 0] : 0,
        scale: isAnimating ? [1, 1.02, 1] : 1
      }}
      transition={{
        duration: 0.1,
        ease: "easeInOut"
      }}
    >
      {currentRole}
    </motion.span>
  );
};

// Types
export type AppType = "about" | "projects" | "skills" | "contact" | "tetris" | "algorithms";
export type WindowAppType = Exclude<AppType, "terminal">;
export type WidgetType = "todo" | "now-listening" | "date-now" | "tetris";

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

const TetrisIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" rx="2" fill="#f8fafc" fillOpacity="0.1" stroke="#f8fafc" strokeWidth="2"/>
    {/* T-piece */}
    <rect x="12" y="8" width="4" height="4" fill="#f8fafc"/>
    <rect x="8" y="12" width="4" height="4" fill="#f8fafc"/>
    <rect x="12" y="12" width="4" height="4" fill="#f8fafc"/>
    <rect x="16" y="12" width="4" height="4" fill="#f8fafc"/>
  </svg>
);

const ProjectsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" rx="2" fill="#f8fafc" fillOpacity="0.1" stroke="#f8fafc" strokeWidth="2"/>
    <rect x="8" y="8" width="6" height="4" fill="#f8fafc"/>
    <rect x="8" y="14" width="6" height="4" fill="#f8fafc"/>
    <rect x="8" y="20" width="6" height="4" fill="#f8fafc"/>
    <rect x="16" y="8" width="6" height="4" fill="#f8fafc"/>
    <rect x="16" y="14" width="6" height="4" fill="#f8fafc"/>
    <rect x="16" y="20" width="6" height="4" fill="#f8fafc"/>
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
  { id: "projects", name: "Projects", icon: "projects", appType: "projects" },
  { id: "skills", name: "Skills", icon: "skills", appType: "skills" },
  { id: "contact", name: "Contact", icon: "contact", appType: "contact" },
  { id: "tetris", name: "Tetris", icon: "tetris", appType: "tetris" },
  { id: "algorithms", name: "Algorithms", icon: "algorithms", appType: "algorithms" },
];

// Desktop items will be defined inside component

export default function DesktopOSPage() {

  // track which windows are open and a z-order stack for layering
  const [openWindows, setOpenWindows] = useState<Record<WindowAppType, boolean>>({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    tetris: false,
    algorithms: false,
  });

  // Window dimensions - use consistent initial values to prevent hydration mismatch
  const [width, setWidth] = useState(1440);
  const [height, setHeight] = useState(900);
  const [windowStack, setWindowStack] = useState<WindowAppType[]>([]);
  const [focusedWindow, setFocusedWindow] = useState<WindowAppType | null>(null);
  
  // Responsive configuration
  const responsiveConfig = useMemo(() => getResponsiveConfig(width, height), [width, height]);

  // Track fullscreen state per window
  const [fullscreenWindows, setFullscreenWindows] = useState<Record<WindowAppType, boolean>>({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    tetris: false,
    algorithms: false,
  });

  // Track minimized state per window
  const [minimizedWindows, setMinimizedWindows] = useState<Record<WindowAppType, boolean>>({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    tetris: false,
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

  const computeLayout = useCallback((items: DesktopItem[]) => {
    // Separate items
    const foldersAndApps = items.filter((i) => i.type === "folder" || i.type === "app");
    const widgets = items.filter((i) => i.type === "widget");

    const layout = responsive.layout(responsiveConfig);
    const grid = responsive.grid(responsiveConfig);

    // Left column layout for folders/apps
    foldersAndApps.map((item, idx) => ({
      ...item,
      x: layout.leftMargin,
      y: layout.topOffset + idx * layout.verticalGap,
    }));

    // Right bento grid for widgets with variable spans
    const { cols, baseW, baseH, gap } = grid;

    const gridW = cols * baseW + (cols - 1) * gap;
    const xStart = Math.max(0, width - layout.rightMargin - gridW);
    const yStart = layout.topOffset;

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
  }, [width, responsiveConfig]);

  

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
    // Disable fullscreen for tetris game
    if (appType === 'tetris') return;
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

  // Widget Layout - Using Responsive System
  const desktopItems: DesktopItem[] = useMemo(() => {
    const todoWidget = responsive.widget(responsiveConfig, 310, 150);
    const smallWidget = responsive.widget(responsiveConfig, 150, 150);
    const margin = responsiveConfig.widgetMargin;
    
    return [
      {
        id: "todo-widget",
        name: "Things I Be Doing",
        icon: "",
        type: "widget",
        widgetType: "todo",
        // TOP-RIGHT CORNER
        x: width - todoWidget.width - margin,
        y: responsiveConfig.heroTop * 0.3,
        widthPx: todoWidget.width,
        heightPx: todoWidget.height,
      },
      {
        id: "now-listening-widget",
        name: "Now Listening",
        icon: "",
        type: "widget",
        widgetType: "now-listening",
        // BOTTOM-LEFT CORNER
        x: margin,
        y: height - (160 * responsiveConfig.widgetScale),
        widthPx: smallWidget.width,
        heightPx: smallWidget.height,
      },
      {
        id: "date-now-widget",
        name: "Date Now",
        icon: "",
        type: "widget",
        widgetType: "date-now",
        // BOTTOM-RIGHT - Keep original position for Mac 13-inch (1440px)
        x: width - smallWidget.width - margin,
        y: 220, // Fixed position for testing
        widthPx: smallWidget.width,
        heightPx: smallWidget.height,
      },
    ];
  }, [width, height, responsiveConfig]);

  useEffect(() => {
    computeLayout(desktopItems);
    if (typeof window !== "undefined") {
      const onResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        computeLayout(desktopItems);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, [computeLayout, desktopItems]);

  // Widget renderer - direct widgets
  const renderWidget = (widgetType: WidgetType) => {
    switch (widgetType) {
      case "todo":
        return <TodoWidget />;
      case "now-listening":
        return <NowListeningWidget />;
      case "date-now":
        return <DateNowWidget />;
      default:
        return null;
    }
  };


  // Window descriptors to remove JSX duplication
  const WINDOW_CONFIG: Record<WindowAppType, { title: string; render: () => React.JSX.Element }> = {
    about: { title: "About", render: () => <AboutHome onOpen={(app) => openWindow(app as WindowAppType)} /> },
    projects: { title: "Projects", render: () => <ProjectsWindow /> },
    skills: { title: "Skills", render: () => <SkillsWindow /> },
    contact: { title: "Contact / Socials", render: () => <ContactWindow /> },
    tetris: { title: "Tetris Game", render: () => <TetrisGameWindow /> },
    algorithms: { title: "Algorithms", render: () => <AlgorithmWindow /> },
  } as const;

  const zBase = 100; // base z-index for windows

  return (
    <div>
      {/* Mobile message (SSR-safe, CSS-hidden on md and up) */}
      <div className="lg:hidden flex items-center justify-center min-h-screen bg-black text-white p-6 text-center">
        <div className="space-y-3 max-w-md">
          <div className="text-2xl font-semibold">Not supported on Small Screens</div>
          <div className="text-zinc-300">Please use a desktop device</div>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800/60 text-zinc-200"
            >
              ← Go to Boot Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Actual desktop UI hidden on small screens */}
      <div
        className="hidden lg:block relative w-full h-screen bg-black overflow-hidden select-none"
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
      <MenuBar title={focusedWindow ? WINDOW_CONFIG[focusedWindow]?.title : "Desktop"} showSystemMenu={true} terminalHref="/portfolio/terminal" shutdownHref="/" />

      {/* Hero Text - Using Responsive System */}
      <div 
        className="absolute z-10" 
        style={{ 
          left: `${responsiveConfig.heroLeft}px`,
          top: `${responsiveConfig.heroTop}px`
        }}
      >
        <div className="space-y-2">
          <div className="text-white space-y-4 lg:space-y-6">
            {/* Main Name - Responsive Size */}
            <h1 
              className="font-black uppercase tracking-tight"
              style={{ 
                fontSize: responsiveConfig.heroNameSize,
                lineHeight: '0.9' 
              }}
            >
              <span className="text-red-500">S</span>OURISH <span className="text-red-500">G</span>HOSH
            </h1>
            
            {/* Tagline - Responsive */}
            <div 
              className="font-light leading-relaxed"
              style={{
                fontSize: responsiveConfig.heroTaglineSize
              }}
            >
              <span className="text-gray-300">I build </span>
              <span className="text-gray-200 mx-2">digital experiences </span>
              <span className="text-gray-300">with</span>
              <br />
              <span className="text-gray-400">passion, precision and</span>
              <AnimatedRoleText />
            </div>
          </div>
        </div>
      </div>

      {/* TechStackStrip - Using Responsive System */}
      <div 
        className="absolute z-[300] origin-center" 
        style={{ 
          bottom: `${responsiveConfig.techStripBottom}px`,
          right: `${responsiveConfig.techStripRight}px`,
          transform: 'rotate(-35deg)',
          width: `${responsiveConfig.techStripWidth}px`
        }}
      >
        <TechStackStrip 
          items={[
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Node.js", 
            "Express.js",
            "Vercel",
            "Supabase",
            "PostgreSQL",
            "Framer Motion",
            "JWT",
            "Redis"
          ]}
          duration={25}
          pauseOnHover={false}
          className="bg-black/30 backdrop-blur-sm text-white min-h-[50px] flex items-center"
        />
      </div>

      {/* Desktop Widgets */}
      {desktopItems.map((item) => {
        if (item.type !== "widget" || !item.widgetType) return null;
        return (
          <motion.div
            key={item.id}
            className="absolute pointer-events-auto border border-gray-700/50 rounded-xl bg-black/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600/70"
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


      {/* Custom Dock - Using Responsive System */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
        <div 
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-end shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          style={{
            padding: `${responsiveConfig.dockPadding}px`,
            gap: `${responsiveConfig.dockGap}px`
          }}
        >
          {dockApps.map((app) => {
            const isOpen = openWindows[app.appType as WindowAppType];
            const hasIndicator = isOpen;
            const dock = responsive.dock(responsiveConfig);
            return (
              <motion.button
                key={app.id}
                className="flex flex-col items-center text-gray-100 hover:scale-110 transition-transform duration-200 relative"
                style={{
                  width: `${dock.buttonSize}px`,
                  height: `${dock.buttonSize}px`
                }}
                onClick={() => handleDockAppClick(app)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div 
                  className={`glass-2 border border-theme rounded-xl flex items-center justify-center mb-1 hover:glass-1 transition-colors duration-200 shadow-md ${hasIndicator ? 'ring-2 ring-red-500/50' : ''}`}
                  style={{
                    width: `${dock.iconSize}px`,
                    height: `${dock.iconSize}px`
                  }}
                >
                  {app.icon === "about" && <AboutIcon />}
                  {app.icon === "projects" && <ProjectsIcon />}
                  {app.icon === "skills" && <SkillsIcon />}
                  {app.icon === "contact" && <ContactIcon />}
                  {app.icon === "tetris" && <TetrisIcon />}
                  {app.icon === "algorithms" && <AlgorithmsIcon />}
                </div>
                {/* macOS-style indicator dot */}
                {hasIndicator && (
                  <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-red-500"></div>
                )}
                <span 
                  className="font-medium text-gray-200"
                  style={{ fontSize: `${dock.fontSize}px` }}
                >
                  {app.name}
                </span>
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
              onToggleFullscreen={appType === 'tetris' ? undefined : () => toggleFullscreen(appType)}
              fullscreen={fullscreenWindows[appType]}
              minimized={isMinimized}
              zIndex={zBase + orderIndex}
              customSize={appType === 'tetris' ? { width: 300, height: 600 } : undefined}
            >
              {render()}
            </AppWindow>
          );
        })}
      </AnimatePresence>
      </div>
    </div>
  );
}
