"use client";

import React, { useState } from "react";
import AppWindow from "@/components/windows/AppWindow";

type TabType = "intro" | "work" | "offwork" | "hobbies" | "contact";

export default function AboutWindow(props: {
  open?: boolean;
  fullscreen?: boolean;
  zIndex?: number;
  onClose?: () => void;
  onMinimize?: () => void;
  onToggleFullscreen?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabType>("intro");
  
  if (!props.open) return null;

  const tabs: { id: TabType; label: string }[] = [
    { id: "intro", label: "Intro" },
    { id: "work", label: "Work" },
    { id: "offwork", label: "Off Work" },
    { id: "hobbies", label: "Hobbies" },
    { id: "contact", label: "Contact" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "intro":
        return (
          <div className="space-y-4">
            <div className="text-sm" style={{ color: "#cdd6f4" }}>
              <div className="border" style={{ borderColor: "#45475a" }}>
                <div className="bg-zinc-800 px-3 py-1 text-xs" style={{ color: "#a6adc8" }}>
                  intro.txt
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Name:</span> s0urishg - just a dude who codes
                  </div>
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Role:</span> Full-stack developer who&apos;s always running high on NextJS
                  </div>
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Description:</span> Building cool stuff and petting the kitty when not coding
                  </div>
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Status:</span> Always up for a Shawarma and searching for a code partner
                  </div>
                  <div className="pt-2">
                    <span style={{ color: "#a6e3a1" }}>Current Activities:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Running high on NextJS</div>
                      <div>• Petting the kitty</div>
                      <div>• Watching The Punisher</div>
                      <div>• Romancing a Marlboro Red</div>
                      <div>• Cooking Chicken Changezi</div>
                      <div>• Always up for a Shawarma</div>
                      <div>• Searching for a code partner</div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span style={{ color: "#a6e3a1" }}>Personality:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Coffee-driven development</div>
                      <div>• Night owl coder</div>
                      <div>• Music while coding</div>
                      <div>• Always learning, always building</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "work":
        return (
          <div className="space-y-4">
            <div className="text-sm" style={{ color: "#cdd6f4" }}>
              <div className="border" style={{ borderColor: "#45475a" }}>
                <div className="bg-zinc-800 px-3 py-1 text-xs" style={{ color: "#a6adc8" }}>
                  work.txt
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <span style={{ color: "#a6e3a1" }}>What I do:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Building websites that don&apos;t break (mostly)</div>
                      <div>• Running high on NextJS</div>
                      <div>• Making things pretty with code</div>
                      <div>• Always learning new stuff</div>
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Current Focus:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Building this portfolio</div>
                      <div>• Petting the kitty between commits</div>
                      <div>• Searching for a code partner</div>
                      <div>• Making websites that actually work</div>
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Goals:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Keep building cool stuff</div>
                      <div>• Maybe find that perfect code partner</div>
                      <div>• Make websites that don&apos;t break</div>
                      <div>• Always keep learning</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "offwork":
        return (
          <div className="space-y-4">
            <div className="text-sm" style={{ color: "#cdd6f4" }}>
              <div className="border" style={{ borderColor: "#45475a" }}>
                <div className="bg-zinc-800 px-3 py-1 text-xs" style={{ color: "#a6adc8" }}>
                  offwork.txt
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <span style={{ color: "#a6e3a1" }}>When I&apos;m not coding:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Petting the kitty</div>
                      <div>• Watching The Punisher</div>
                      <div>• Romancing a Marlboro Red</div>
                      <div>• Cooking Chicken Changezi</div>
                      <div>• Always up for a Shawarma</div>
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Relaxation:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Coffee and coding</div>
                      <div>• Music while working</div>
                      <div>• Night owl sessions</div>
                      <div>• Just chilling with the kitty</div>
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Social:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Always up for a Shawarma</div>
                      <div>• Searching for a code partner</div>
                      <div>• Just hanging out</div>
                      <div>• Meeting new people</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "hobbies":
        return (
          <div className="space-y-4">
            <div className="text-sm" style={{ color: "#cdd6f4" }}>
              <div className="border" style={{ borderColor: "#45475a" }}>
                <div className="bg-zinc-800 px-3 py-1 text-xs" style={{ color: "#a6adc8" }}>
                  hobbies.txt
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Things I enjoy:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Petting the kitty</div>
                      <div>• Watching The Punisher</div>
                      <div>• Cooking Chicken Changezi</div>
                      <div>• Always up for a Shawarma</div>
                      <div>• Romancing a Marlboro Red</div>
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Entertainment:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Binge-watching shows</div>
                      <div>• Music while coding</div>
                      <div>• Coffee and chill</div>
                      <div>• Just hanging out</div>
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Social:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Always up for a Shawarma</div>
                      <div>• Searching for a code partner</div>
                      <div>• Meeting new people</div>
                      <div>• Just chilling with friends</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            <div className="text-sm" style={{ color: "#cdd6f4" }}>
              <div className="border" style={{ borderColor: "#45475a" }}>
                <div className="bg-zinc-800 px-3 py-1 text-xs" style={{ color: "#a6adc8" }}>
                  contact.txt
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Get in touch:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Email: s0urishg@example.com</div>
                      <div>• GitHub: github.com/s0urishg</div>
                      <div>• LinkedIn: linkedin.com/in/s0urishg</div>
                      <div>• Twitter: @s0urishg</div>
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Let&apos;s connect:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Always up for a Shawarma</div>
                      <div>• Searching for a code partner</div>
                      <div>• Hit me up if you want to build something cool</div>
                      <div>• Just want to chat about NextJS</div>
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "#a6e3a1" }}>Message me:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      <div>• Hey! Always up for a Shawarma</div>
                      <div>• Looking for a code partner</div>
                      <div>• Let&apos;s build something together</div>
                      <div>• Just want to hang out</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  
  return (
    <AppWindow
      title="About Me"
      fullscreen={!!props.fullscreen}
      zIndex={props.zIndex}
      onClose={props.onClose}
      onMinimize={props.onMinimize}
      onToggleFullscreen={props.onToggleFullscreen}
    >
      <div className="w-full h-full" style={{ backgroundColor: "rgba(30,30,46,0.95)", color: "#cdd6f4" }}>
        {/* Terminal Header */}
        <div className="flex items-center gap-2 p-3 border-b" style={{ borderColor: "#45475a" }}>
          <span className="text-xs" style={{ color: "#a6adc8" }}>about@portfolio — zsh</span>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b" style={{ borderColor: "#45475a" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-mono border-r transition-colors ${
                activeTab === tab.id
                  ? "bg-zinc-800 text-white"
                  : "hover:bg-zinc-800/50 text-zinc-400"
              }`}
              style={{ 
                borderColor: "#45475a",
                backgroundColor: activeTab === tab.id ? "rgba(49,50,68,0.8)" : "transparent"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 h-full overflow-y-auto font-mono text-sm">
          {renderTabContent()}
        </div>

        {/* Terminal Footer */}
        <div className="p-2 text-xs border-t" style={{ borderColor: "#45475a", color: "#a6adc8" }}>
          Type &apos;help&apos; for available commands. Theme: Catppuccin Mocha
        </div>
      </div>
    </AppWindow>
  );
}
