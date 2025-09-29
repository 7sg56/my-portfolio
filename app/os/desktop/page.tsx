"use client";

import React, { useState, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import MenuBar from "@/components/desktop/MenuBar";
import Dock from "@/components/desktop/Dock";
import DesktopItemComponent from "@/components/desktop/DesktopItem";
import DesktopBackground from "@/components/desktop/DesktopBackground";
import AppWindow from "@/components/windows/AppWindow";
import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import GalleryWindow from "@/components/windows/GalleryWindow";
import UpcomingWindow from "@/components/windows/UpcomingWindow";
import FinderWindow from "@/components/windows/FinderWindow";

// Desktop item types
type DesktopItem = {
  id: string;
  type: "folder" | "widget" | "app";
  name: string;
  icon: string;
  x: number;
  y: number;
  appType?: "finder" | "about" | "projects" | "gallery" | "upcoming";
  widgetType?: "clock" | "weather" | "todo" | "3d";
};

// Dock app definitions
const dockApps = [
  { id: "finder", name: "Finder", icon: "/window.svg", appType: "finder" },
  { id: "about", name: "About", icon: "/window.svg", appType: "about" },
  { id: "projects", name: "Projects", icon: "/globe.svg", appType: "projects" },
  { id: "gallery", name: "Gallery", icon: "/file.svg", appType: "gallery" },
  { id: "upcoming", name: "Upcoming", icon: "/next.svg", appType: "upcoming" },
  { id: "terminal", name: "Terminal", icon: "/window.svg", appType: "terminal" },
];

// Desktop items (folders, widgets, etc.)
const desktopItems: DesktopItem[] = [
  { id: "clock", type: "widget", name: "Clock", icon: "🕐", x: 50, y: 50, widgetType: "clock" },
  { id: "weather", type: "widget", name: "Weather", icon: "🌤️", x: 350, y: 50, widgetType: "weather" },
  { id: "todo", type: "widget", name: "Todo", icon: "📝", x: 650, y: 50, widgetType: "todo" },
  { id: "3d", type: "widget", name: "3D Model", icon: "🎮", x: 950, y: 50, widgetType: "3d" },
  { id: "finder-app", type: "app", name: "Finder", icon: "🔍", x: 50, y: 400, appType: "finder" },
  { id: "projects-folder", type: "folder", name: "Projects", icon: "📁", x: 200, y: 400 },
  { id: "gallery-folder", type: "folder", name: "Gallery", icon: "📁", x: 350, y: 400 },
];

export default function DesktopOSPage() {
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({});
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [finderPath, setFinderPath] = useState<string>("/");

  // Open window handler
  const openWindow = useCallback((appType: string) => {
    setOpenWindows(prev => ({ ...prev, [appType]: true }));
    setFocusedWindow(appType);
  }, []);

  // Close window handler
  const closeWindow = useCallback((appType: string) => {
    setOpenWindows(prev => ({ ...prev, [appType]: false }));
    if (focusedWindow === appType) {
      setFocusedWindow(null);
    }
  }, [focusedWindow]);

  // Focus window handler
  const focusWindow = useCallback((appType: string) => {
    setFocusedWindow(appType);
  }, []);

  // Handle dock app click
  const handleDockAppClick = (app: typeof dockApps[0]) => {
    if (app.appType === "terminal") {
      // Navigate to terminal
      window.location.href = "/os/terminal";
    } else {
      openWindow(app.appType!);
    }
  };

  // Handle desktop item double click
  const handleDesktopItemDoubleClick = (item: DesktopItem) => {
    if (item.type === "widget") {
      // Widgets are always visible, just focus them
      return;
    } else if (item.type === "folder") {
      // Open folders in Finder with appropriate path
      if (item.name === "Projects") {
        setFinderPath("/Desktop/Projects");
      } else if (item.name === "Gallery") {
        setFinderPath("/Desktop/Gallery");
      } else {
        setFinderPath("/Desktop");
      }
      openWindow("finder");
    } else if (item.type === "app" && item.appType) {
      // Open app
      openWindow(item.appType);
    }
  };

  // Handle desktop item selection
  const handleDesktopItemClick = (itemId: string, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      // Multi-select
      setSelectedItems(prev => 
        prev.includes(itemId) 
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      // Single select
      setSelectedItems([itemId]);
    }
  };


  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {/* Desktop Background */}
      <DesktopBackground backgroundImage="/bg.jpg" />

      {/* Menu Bar */}
      <MenuBar />

      {/* Desktop Items */}
      <div className="absolute inset-0 pt-8">
        {desktopItems.map((item) => (
          <DesktopItemComponent
            key={item.id}
            item={item}
            isSelected={selectedItems.includes(item.id)}
            onClick={handleDesktopItemClick}
            onDoubleClick={handleDesktopItemDoubleClick}
          />
        ))}
      </div>

      {/* Dock */}
      <Dock apps={dockApps} onAppClick={handleDockAppClick} />

      {/* Windows */}
      <AnimatePresence>
            {openWindows.finder && (
              <AppWindow
                title="Finder"
                onClose={() => closeWindow("finder")}
                zIndex={focusedWindow === "finder" ? 50 : 40}
              >
                <FinderWindow initialPath={finderPath} />
              </AppWindow>
            )}

        {openWindows.about && (
          <AppWindow
            title="About Me"
            onClose={() => closeWindow("about")}
            zIndex={focusedWindow === "about" ? 50 : 40}
          >
            <AboutWindow />
          </AppWindow>
        )}

        {openWindows.projects && (
          <AppWindow
            title="Projects"
            onClose={() => closeWindow("projects")}
            zIndex={focusedWindow === "projects" ? 50 : 40}
          >
            <ProjectsWindow />
          </AppWindow>
        )}

        {openWindows.gallery && (
          <AppWindow
            title="Gallery"
            onClose={() => closeWindow("gallery")}
            zIndex={focusedWindow === "gallery" ? 50 : 40}
          >
            <GalleryWindow />
          </AppWindow>
        )}

        {openWindows.upcoming && (
          <AppWindow
            title="Upcoming"
            onClose={() => closeWindow("upcoming")}
            zIndex={focusedWindow === "upcoming" ? 50 : 40}
          >
            <UpcomingWindow />
          </AppWindow>
        )}
      </AnimatePresence>
    </div>
  );
}