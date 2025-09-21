"use client";

import React from "react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <div className="absolute top-12 left-12 w-1/3 h-1/2 z-10">
      <div className="pl-6 pr-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, x: -40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="text-white space-y-6"
        >
          <div className="text-2xl text-zinc-300 font-light tracking-wide">
            Hello, I'm
          </div>
          <div className="text-6xl font-black text-white leading-none tracking-tight">
            Sourish Ghosh
          </div>
          <div className="text-xl text-zinc-400 font-mono font-medium tracking-wider">
            FullStack Dev | Leetcoder | etc
          </div>
          <div className="pt-2">
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
