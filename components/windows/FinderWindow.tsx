"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import AppWindow from "@/components/windows/AppWindow";

// File/Folder types
type FileItem = {
  id: string;
  name: string;
  type: "folder" | "file" | "app";
  icon: string;
  size?: string;
  modified?: string;
  path: string;
  children?: FileItem[];
};

// View modes
type ViewMode = "list" | "grid" | "column";

// Sidebar items
const sidebarItems = [
  { id: "favorites", name: "Favorites", icon: "⭐", items: [
    { id: "desktop", name: "Desktop", icon: "🖥️", path: "/Desktop" },
    { id: "downloads", name: "Downloads", icon: "📥", path: "/Downloads" },
    { id: "documents", name: "Documents", icon: "📄", path: "/Documents" },
    { id: "pictures", name: "Pictures", icon: "🖼️", path: "/Pictures" },
  ]},
  { id: "devices", name: "Devices", icon: "💾", items: [
    { id: "macintosh", name: "Macintosh HD", icon: "💿", path: "/" },
  ]},
  { id: "locations", name: "Locations", icon: "🌐", items: [
    { id: "network", name: "Network", icon: "🌍", path: "/Network" },
  ]},
];

// Sample file system data
const fileSystem: FileItem[] = [
  {
    id: "desktop",
    name: "Desktop",
    icon: "🖥️",
    type: "folder",
    path: "/Desktop",
    children: [
      { id: "projects-folder", name: "Projects", icon: "📁", type: "folder", path: "/Desktop/Projects" },
      { id: "gallery-folder", name: "Gallery", icon: "📁", type: "folder", path: "/Desktop/Gallery" },
      { id: "clock-widget", name: "Clock", icon: "🕐", type: "file", path: "/Desktop/Clock", size: "Widget" },
      { id: "weather-widget", name: "Weather", icon: "🌤️", type: "file", path: "/Desktop/Weather", size: "Widget" },
      { id: "todo-widget", name: "Todo", icon: "📝", type: "file", path: "/Desktop/Todo", size: "Widget" },
      { id: "3d-widget", name: "3D Model", icon: "🎮", type: "file", path: "/Desktop/3D Model", size: "Widget" },
    ]
  },
  {
    id: "applications",
    name: "Applications",
    icon: "📱",
    type: "folder",
    path: "/Applications",
    children: [
      { id: "finder", name: "Finder", icon: "🔍", type: "app", path: "/Applications/Finder.app" },
      { id: "safari", name: "Safari", icon: "🧭", type: "app", path: "/Applications/Safari.app" },
      { id: "mail", name: "Mail", icon: "📧", type: "app", path: "/Applications/Mail.app" },
      { id: "photos", name: "Photos", icon: "📸", type: "app", path: "/Applications/Photos.app" },
      { id: "terminal", name: "Terminal", icon: "💻", type: "app", path: "/Applications/Terminal.app" },
    ]
  },
  {
    id: "documents",
    name: "Documents",
    icon: "📄",
    type: "folder",
    path: "/Documents",
    children: [
      { id: "portfolio", name: "Portfolio", icon: "📁", type: "folder", path: "/Documents/Portfolio" },
      { id: "resume", name: "Resume.pdf", icon: "📄", type: "file", path: "/Documents/Resume.pdf", size: "2.1 MB" },
      { id: "projects", name: "Projects", icon: "📁", type: "folder", path: "/Documents/Projects" },
    ]
  },
  {
    id: "downloads",
    name: "Downloads",
    icon: "📥",
    type: "folder",
    path: "/Downloads",
    children: [
      { id: "image1", name: "image1.jpg", icon: "🖼️", type: "file", path: "/Downloads/image1.jpg", size: "1.2 MB" },
      { id: "document", name: "document.pdf", icon: "📄", type: "file", path: "/Downloads/document.pdf", size: "3.4 MB" },
    ]
  },
  {
    id: "pictures",
    name: "Pictures",
    icon: "🖼️",
    type: "folder",
    path: "/Pictures",
    children: [
      { id: "screenshot1", name: "Screenshot 2024-01-01.png", icon: "📸", type: "file", path: "/Pictures/Screenshot 2024-01-01.png", size: "4.2 MB" },
      { id: "vacation", name: "Vacation 2024", icon: "📁", type: "folder", path: "/Pictures/Vacation 2024" },
    ]
  },
  // Desktop folder contents
  {
    id: "desktop-projects",
    name: "Projects",
    icon: "📁",
    type: "folder",
    path: "/Desktop/Projects",
    children: [
      { id: "portfolio-project", name: "Portfolio Website", icon: "🌐", type: "folder", path: "/Desktop/Projects/Portfolio Website" },
      { id: "react-app", name: "React App", icon: "⚛️", type: "folder", path: "/Desktop/Projects/React App" },
      { id: "node-api", name: "Node.js API", icon: "🟢", type: "folder", path: "/Desktop/Projects/Node.js API" },
      { id: "mobile-app", name: "Mobile App", icon: "📱", type: "folder", path: "/Desktop/Projects/Mobile App" },
    ]
  },
  {
    id: "desktop-gallery",
    name: "Gallery",
    icon: "📁",
    type: "folder",
    path: "/Desktop/Gallery",
    children: [
      { id: "sample1", name: "sample1.jpg", icon: "🖼️", type: "file", path: "/Desktop/Gallery/sample1.jpg", size: "1.2 MB" },
      { id: "sample2", name: "sample2.svg", icon: "🎨", type: "file", path: "/Desktop/Gallery/sample2.svg", size: "0.8 MB" },
      { id: "sample3", name: "sample3.svg", icon: "🎨", type: "file", path: "/Desktop/Gallery/sample3.svg", size: "0.9 MB" },
      { id: "background", name: "bg.jpg", icon: "🖼️", type: "file", path: "/Desktop/Gallery/bg.jpg", size: "2.1 MB" },
    ]
  },
];

export default function FinderWindow({ initialPath = "/" }: { initialPath?: string }) {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get current directory contents
  const getCurrentContents = useCallback(() => {
    if (currentPath === "/") {
      return fileSystem;
    }
    
    // Find the current directory in the file system
    const findDirectory = (items: FileItem[], path: string): FileItem[] => {
      for (const item of items) {
        if (item.path === path) {
          return item.children || [];
        }
        if (item.children) {
          const found = findDirectory(item.children, path);
          if (found.length > 0) return found;
        }
      }
      return [];
    };
    
    return findDirectory(fileSystem, currentPath);
  }, [currentPath]);

  // Navigate to directory
  const navigateTo = useCallback((path: string) => {
    setCurrentPath(path);
    setSelectedItems([]);
  }, []);

  // Handle item selection
  const handleItemClick = useCallback((itemId: string, event: React.MouseEvent) => {
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
  }, []);

  // Handle item double click
  const handleItemDoubleClick = useCallback((item: FileItem) => {
    if (item.type === "folder") {
      navigateTo(item.path);
    } else if (item.type === "app") {
      // Handle app launch (would integrate with your app system)
      console.log("Launching app:", item.name);
    }
  }, [navigateTo]);

  // Get breadcrumb path
  const getBreadcrumb = () => {
    const parts = currentPath.split("/").filter(Boolean);
    return parts.length > 0 ? parts : ["Macintosh HD"];
  };

  const currentContents = getCurrentContents();
  const filteredContents = searchQuery 
    ? currentContents.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentContents;

  return (
    <div className="flex h-full bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl">
      {/* Sidebar */}
      {!sidebarCollapsed && (
        <motion.div 
          className="w-64 bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-r border-gray-700/50 flex flex-col shadow-xl"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 256, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
        >
          <div className="p-4 border-b border-gray-700/50">
            <h2 className="font-semibold text-gray-100">Finder</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {sidebarItems.map((section) => (
              <div key={section.id} className="mb-4">
                <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {section.name}
                </div>
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    className="w-full px-4 py-2 text-left hover:bg-gray-700/60 flex items-center gap-3 transition-colors duration-200 rounded-lg mx-2"
                    onClick={() => navigateTo(item.path)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm text-gray-200">{item.name}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 flex items-center px-4 gap-2 shadow-lg">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 hover:bg-gray-700/60 rounded text-gray-200 transition-colors duration-200"
          >
            {sidebarCollapsed ? "▶" : "◀"}
          </button>
          
          <div className="flex gap-1">
            <button
              onClick={() => navigateTo("/")}
              className="p-1 hover:bg-gray-700/60 rounded text-gray-200 transition-colors duration-200"
            >
              ⬅
            </button>
            <button
              onClick={() => navigateTo("/")}
              className="p-1 hover:bg-gray-700/60 rounded text-gray-200 transition-colors duration-200"
            >
              ➡
            </button>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1 rounded transition-colors duration-200 ${
                  viewMode === "grid" 
                    ? "bg-blue-500 text-white shadow-md" 
                    : "hover:bg-gray-700/60 text-gray-200"
                }`}
              >
                ⊞
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 rounded transition-colors duration-200 ${
                  viewMode === "list" 
                    ? "bg-blue-500 text-white shadow-md" 
                    : "hover:bg-gray-700/60 text-gray-200"
                }`}
              >
                ☰
              </button>
              <button
                onClick={() => setViewMode("column")}
                className={`p-1 rounded transition-colors duration-200 ${
                  viewMode === "column" 
                    ? "bg-blue-500 text-white shadow-md" 
                    : "hover:bg-gray-700/60 text-gray-200"
                }`}
              >
                ║
              </button>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1 bg-gray-700/80 border border-gray-600/50 rounded-md text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="h-8 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 flex items-center px-4">
          <div className="flex items-center gap-1 text-sm">
            {getBreadcrumb().map((part, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-gray-400">›</span>}
                <button
                  onClick={() => {
                    const path = "/" + getBreadcrumb().slice(0, index + 1).join("/");
                    navigateTo(path);
                  }}
                  className="hover:text-blue-400 text-gray-200 transition-colors duration-200"
                >
                  {part}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl">
          {viewMode === "grid" && (
            <div className="grid grid-cols-6 gap-4">
              {filteredContents.map((item) => (
                <motion.div
                  key={item.id}
                  className={`flex flex-col items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700/60 transition-colors duration-200 shadow-md ${
                    selectedItems.includes(item.id) ? "bg-blue-500/40 ring-2 ring-blue-500 shadow-lg" : ""
                  }`}
                  onClick={(e) => handleItemClick(item.id, e)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <div className="text-xs text-center text-gray-200 max-w-full truncate font-medium">
                    {item.name}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {viewMode === "list" && (
            <div className="space-y-1">
              {filteredContents.map((item) => (
                <motion.div
                  key={item.id}
                  className={`flex items-center p-2 rounded hover:bg-gray-700/60 cursor-pointer transition-colors duration-200 shadow-sm ${
                    selectedItems.includes(item.id) ? "bg-blue-500/40 ring-2 ring-blue-500 shadow-md" : ""
                  }`}
                  onClick={(e) => handleItemClick(item.id, e)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  whileHover={{ x: 4 }}
                >
                  <span className="text-2xl mr-3">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-200">{item.name}</div>
                    {item.size && <div className="text-sm text-gray-400">{item.size}</div>}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {viewMode === "column" && (
            <div className="flex gap-4">
              <div className="flex-1">
                {filteredContents.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`flex items-center p-2 rounded hover:bg-gray-700/60 cursor-pointer transition-colors duration-200 shadow-sm ${
                      selectedItems.includes(item.id) ? "bg-blue-500/40 ring-2 ring-blue-500 shadow-md" : ""
                    }`}
                    onClick={(e) => handleItemClick(item.id, e)}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-200">{item.name}</div>
                      {item.size && <div className="text-sm text-gray-400">{item.size}</div>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
