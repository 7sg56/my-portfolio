"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

type DockApp = {
  id: string;
  name: string;
  icon: string;
  appType: string;
};

type DockProps = {
  apps: DockApp[];
  onAppClick: (app: DockApp) => void;
};

export default function Dock({ apps, onAppClick }: DockProps) {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <div className="glass-1 border border-theme rounded-2xl px-4 py-3 flex items-end gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        {apps.map((app) => (
          <motion.button
            key={app.id}
            className="flex flex-col items-center w-16 h-16 text-gray-100 hover:scale-110 transition-transform duration-200"
            onClick={() => onAppClick(app)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 glass-2 border border-theme rounded-xl flex items-center justify-center mb-1 hover:glass-1 transition-colors duration-200 shadow-md">
              <Image src={app.icon} alt={app.name} width={32} height={32} className="w-8 h-8" />
            </div>
            <span className="text-xs font-medium text-gray-200">{app.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
