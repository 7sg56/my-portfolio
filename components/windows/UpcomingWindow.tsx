"use client";

import React from "react";
import AppWindow from "@/components/windows/AppWindow";

export default function UpcomingWindow(props: {
  open?: boolean;
  fullscreen?: boolean;
  zIndex?: number;
  onClose?: () => void;
  onMinimize?: () => void;
  onToggleFullscreen?: () => void;
}) {
  const { open, fullscreen, zIndex, onClose, onMinimize, onToggleFullscreen } = props;
  if (!open) return null;
  return (
    <AppWindow
      title="Upcoming Portfolio"
      fullscreen={!!fullscreen}
      zIndex={zIndex}
      onClose={onClose}
      onMinimize={onMinimize}
      onToggleFullscreen={onToggleFullscreen}
    >
      <div className="space-y-2">
        <div className="text-zinc-100 text-lg font-semibold">Coming soon</div>
        <div className="text-zinc-400">This area will showcase the next iteration of my portfolio. Stay tuned!</div>
      </div>
    </AppWindow>
  );
}
