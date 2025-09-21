"use client";

import React from "react";
import AppWindow from "@/components/windows/AppWindow";

const sample = [
  { title: "Photography", desc: "Cityscapes and street photography", img: "/next.svg" },
  { title: "Sketching", desc: "Ink and charcoal", img: "/vercel.svg" },
  { title: "Music", desc: "Guitar covers and loops", img: "/globe.svg" },
];

export default function GalleryWindow(props: {
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
      title="Gallery — Hobbies"
      fullscreen={!!fullscreen}
      zIndex={zIndex}
      onClose={onClose}
      onMinimize={onMinimize}
      onToggleFullscreen={onToggleFullscreen}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sample.map((g) => (
          <div key={g.title} className="border border-zinc-800 rounded overflow-hidden">
            <div className="bg-zinc-900/50 flex items-center justify-center h-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.img} alt="" className="h-10 w-10 opacity-80" />
            </div>
            <div className="p-2">
              <div className="text-zinc-100 text-sm">{g.title}</div>
              <div className="text-zinc-400 text-xs">{g.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-zinc-500">Replace with your images in public/gallery and update this window.</div>
    </AppWindow>
  );
}
