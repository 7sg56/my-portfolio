"use client";

import React from "react";
import WidgetCard from "@/components/widgets/WidgetCard";
import { currentTrack } from "@/config/site";

type Span = { cols?: 1 | 2 | 3; rows?: 1 | 2 | 3 | 4 };
function spanToClasses(span?: Span): string {
  if (!span) return "";
  const cls: string[] = [];
  if (span.cols === 1) cls.push("col-span-1");
  if (span.cols === 2) cls.push("col-span-2");
  if (span.cols === 3) cls.push("col-span-3");
  if (span.rows === 1) cls.push("row-span-1");
  if (span.rows === 2) cls.push("row-span-2");
  if (span.rows === 3) cls.push("row-span-3");
  if (span.rows === 4) cls.push("row-span-4");
  return cls.join(" ");
}

export default function NowListeningWidget({ span, visible = true }: { span?: Span; visible?: boolean }) {
  const handleSpotifyClick = () => {
    window.open(currentTrack.spotifyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <WidgetCard 
      title="Now Listening" 
      className={`${spanToClasses(span)} ${visible ? "opacity-100" : "opacity-60"} cursor-pointer hover:bg-zinc-800/80 transition-colors`}
    >
      <div 
        className="font-mono text-zinc-200 h-full flex flex-col justify-center gap-3 p-2"
        onClick={handleSpotifyClick}
      >
        {/* Compact horizontal layout */}
        <div className="flex items-center gap-3">
          {/* Small Spotify Icon */}
          <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-200 rounded-md flex items-center justify-center shadow-lg flex-shrink-0">
            <svg 
              className="w-8 h-8 text-white" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.48.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>

          {/* Track Info - Bigger and left-aligned */}
          <div className="flex-1 min-w-0 text-left">
            <div className="text-xl font-bold text-white truncate leading-tight">
              {currentTrack.title}
            </div>
            <div className="text-sm text-zinc-400 truncate mt-0.5">
              {currentTrack.artist}
            </div>
          </div>
        </div>

        {/* Bottom Spotify branding */}
        <div className="flex justify-center gap-1 text-xs text-gray-300">
          <span>Listen on Spotify</span>
        </div>
      </div>
    </WidgetCard>
  );
}
