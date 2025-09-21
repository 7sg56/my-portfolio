"use client";

import React from "react";
import AppWindow from "@/components/windows/AppWindow";
import { SPOTIFY_EMBED_URL } from "@/config/site";

export default function SpotifyWindow(props: {
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
      title="Spotify — Playlist"
      fullscreen={!!fullscreen}
      zIndex={zIndex}
      onClose={onClose}
      onMinimize={onMinimize}
      onToggleFullscreen={onToggleFullscreen}
    >
      <div className="aspect-video w-full">
        <iframe
          title="Spotify playlist"
          style={{ borderRadius: 12 }}
          src={SPOTIFY_EMBED_URL}
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
        <div className="mt-2 text-xs text-zinc-400">
          Update playlist: set SPOTIFY_EMBED_URL in config/site.ts (replace PLAYLIST_ID).
        </div>
      </div>
    </AppWindow>
  );
}
