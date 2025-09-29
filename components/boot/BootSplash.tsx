"use client";

import { motion } from "motion/react";

export default function BootSplash() {
  return (
    <div className="w-full h-[75vh] grid place-items-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="text-2xl md:text-3xl font-semibold mb-2">Booting Sourish’s Portfolio…</div>
        <div className="text-sm text-zinc-400">initializing kernel | mounting fs | starting services</div>
      </motion.div>
    </div>
  );
}
