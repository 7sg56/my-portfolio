"use client";

import React, { useState } from "react";
import { BACKGROUND_IMAGE } from "@/config/site";
import AppDrawer from "@/components/desktop/AppDrawer";

type DesktopProps = {
  onAction: (command: string) => void;
  onOpenTerminal?: () => void;
};

type DesktopItem = { 
  key: "terminal" | "about" | "upcoming" | "projects" | "gallery"; 
  label: string; 
  icon?: string;
  description?: string;
};

const desktopItems: DesktopItem[] = [
  { 
    key: "terminal", 
    label: "Terminal", 
    icon: "/window.svg",
    description: "Command Line Interface"
  },
  { 
    key: "about", 
    label: "About Me", 
    icon: "/globe.svg",
    description: "Personal Information"
  },
  { 
    key: "projects", 
    label: "Projects", 
    icon: "/globe.svg",
    description: "Portfolio & Work"
  },
  { 
    key: "gallery", 
    label: "Gallery", 
    icon: "/file.svg",
    description: "Photos & Artwork"
  },
  { 
    key: "upcoming", 
    label: "Upcoming", 
    icon: "/file.svg",
    description: "Future Plans"
  },
];

export default function Desktop({ onAction, onOpenTerminal }: DesktopProps) {
  const handleDoubleClick = (key: DesktopItem["key"]) => {
    switch (key) {
      case "terminal":
        onOpenTerminal?.();
        break;
      case "about":
        onAction("__open_window__about");
        break;
      case "upcoming":
        onAction("__open_window__upcoming");
        break;
      case "projects":
        onAction("__open_window__projects");
        break;
      case "gallery":
        onAction("__open_window__gallery");
        break;
    }
  };

  return (
    <div className="absolute inset-0 select-none pointer-events-none" aria-label="Desktop background">
      {/* background image */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* subtle gradient overlay for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#0b1220,transparent_40%),radial-gradient(circle_at_80%_30%,#1a1f35,transparent_40%),radial-gradient(circle_at_50%_80%,#111827,transparent_40%)] opacity-70" />

      {/* Desktop layout - empty canvas (widgets are managed in page), plus AppDrawer */}
      <div className="relative z-10 h-full" />
      <AppDrawer
        onOpen={(key) => {
          switch (key) {
            case "terminal":
              onOpenTerminal?.();
              break;
            case "about":
              onAction("__open_window__about");
              break;
            case "upcoming":
              onAction("__open_window__upcoming");
              break;
            case "projects":
              onAction("__open_window__projects");
              break;
            case "gallery":
              onAction("__open_window__gallery");
              break;
          }
        }}
        active={{}}
      />
    </div>
  );
}
