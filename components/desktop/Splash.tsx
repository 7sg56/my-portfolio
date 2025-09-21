"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Splash({ show, progress }: { show: boolean; progress: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(progress)));
  const isComplete = pct >= 100;
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[70] flex items-center justify-center"
          initial={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
          animate={{ 
            backgroundColor: isComplete ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 1)" 
          }}
          exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Main content - same width as progress bar */}
          <motion.div 
            className="w-64 text-center"
            animate={{ opacity: isComplete ? 0 : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-bold text-white mb-8"
            >
                    Sourish&apos;s Desktop
            </motion.h1>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="w-full"
            >
              <div className="w-full bg-zinc-800 h-1">
                <motion.div
                  className="bg-white h-1"
                  initial={{ width: "0%" }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <div className="text-center mt-4 text-zinc-400 text-sm font-mono">
                {pct}%
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}