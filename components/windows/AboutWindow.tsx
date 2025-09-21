"use client";

import React from "react";
import { motion } from "motion/react";
import AppWindow from "@/components/windows/AppWindow";

export default function AboutWindow(props: {
  open?: boolean;
  fullscreen?: boolean;
  zIndex?: number;
  onClose?: () => void;
  onMinimize?: () => void;
  onToggleFullscreen?: () => void;
}) {
  if (!props.open) return null;
  
  return (
    <AppWindow
      title="About Me"
      fullscreen={!!props.fullscreen}
      zIndex={props.zIndex}
      onClose={props.onClose}
      onMinimize={props.onMinimize}
      onToggleFullscreen={props.onToggleFullscreen}
    >
      <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-y-auto">
        <div className="p-8 max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Hey, I&apos;m a Developer</h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Full-stack developer passionate about creating beautiful, functional web experiences
            </p>
          </motion.div>

          {/* About Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-800/50 rounded-lg p-6 border border-zinc-700"
            >
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span>🚀</span> What I Do
              </h2>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">▸</span>
                  Frontend development with React, Next.js, TypeScript
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">▸</span>
                  Backend APIs with Node.js, Python, and modern frameworks
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">▸</span>
                  UI/UX design with Tailwind CSS and Framer Motion
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">▸</span>
                  Database design and optimization
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-zinc-800/50 rounded-lg p-6 border border-zinc-700"
            >
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span>💡</span> Interests
              </h2>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">▸</span>
                  Open source contributions and community building
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">▸</span>
                  Modern web technologies and performance optimization
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">▸</span>
                  AI/ML integration in web applications
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">▸</span>
                  Mentoring and knowledge sharing
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-semibold text-white mb-8 text-center">
              <span className="mr-3">📈</span>Journey
            </h2>
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-4 h-4 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="bg-zinc-800/30 rounded-lg p-6 flex-1 border border-zinc-700/50">
                  <h3 className="text-xl font-semibold text-white mb-2">Current Focus</h3>
                  <p className="text-zinc-400 mb-3">Building modern web applications</p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS"].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-4 h-4 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="bg-zinc-800/30 rounded-lg p-6 flex-1 border border-zinc-700/50">
                  <h3 className="text-xl font-semibold text-white mb-2">Learning & Growing</h3>
                  <p className="text-zinc-400 mb-3">Exploring new technologies and best practices</p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "AI/ML", "Cloud", "DevOps"].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-zinc-800/50 to-zinc-700/50 rounded-lg p-6 border border-zinc-600"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <span>⚡</span> Quick Facts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
                <div className="text-2xl mb-2">☕</div>
                <div className="text-sm text-zinc-300">Coffee-driven development</div>
              </div>
              <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
                <div className="text-2xl mb-2">🌙</div>
                <div className="text-sm text-zinc-300">Night owl coder</div>
              </div>
              <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
                <div className="text-2xl mb-2">🎵</div>
                <div className="text-sm text-zinc-300">Music while coding</div>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12 pt-8 border-t border-zinc-700"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              <span className="mr-3">📫</span>Let&apos;s Connect
            </h2>
            <div className="flex justify-center gap-6 flex-wrap">
              <a
                href="mailto:hello@example.com"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <span>📧</span> Email
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <span>🐙</span> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
              >
                <span>💼</span> LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </AppWindow>
  );
}
