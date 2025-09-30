"use client";

import React from "react";
import { motion } from "motion/react";
import TodoWidget from "@/components/widgets/TodoWidget";

// Allow optional size overrides for widgets
type DesktopItem = {
  id: string;
  type: "folder" | "widget" | "app";
  name: string;
  icon: string;
  x: number;
  y: number;
  appType?: "finder" | "about" | "projects" | "gallery" | "upcoming";
  widgetType?: "todo";
  widthPx?: number;
  heightPx?: number;
};

type DesktopItemProps = {
  item: DesktopItem;
  isSelected: boolean;
  onClick: (itemId: string, event: React.MouseEvent) => void;
  onDoubleClick: (item: DesktopItem) => void;
};

export default function DesktopItemComponent({ 
  item, 
  isSelected, 
  onClick, 
  onDoubleClick 
}: DesktopItemProps) {
  // Render desktop widget
  const renderDesktopWidget = (item: DesktopItem) => {
    switch (item.widgetType) {
      case "todo":
        return <TodoWidget />;
      default:
        return null;
    }
  };

  const widgetWidth = item.widthPx ?? 224; // matches previous w-56
  const widgetHeight = item.heightPx ?? 192; // matches previous h-48

  return (
    <motion.div
      className={`absolute cursor-pointer group ${
        isSelected ? 'ring-2 ring-blue-400 shadow-lg' : ''
      }`}
      style={{ left: item.x, top: item.y }}
      onClick={(e) => onClick(item.id, e)}
      onDoubleClick={() => onDoubleClick(item)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {item.type === "widget" ? (
        <div
          style={{ width: widgetWidth, height: widgetHeight }}
        >
          {renderDesktopWidget(item)}
        </div>
      ) : (
        <div className="flex flex-col items-center w-20 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-700/50 flex items-center justify-center text-2xl mb-1 hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-800/90 transition-all duration-200 shadow-lg">
            {item.icon}
          </div>
          <span className="text-gray-100 text-xs font-medium drop-shadow-lg">
            {item.name}
          </span>
        </div>
      )}
    </motion.div>
  );
}
