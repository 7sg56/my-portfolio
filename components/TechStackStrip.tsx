"use client"

import type React from "react"
import { cn } from "@/lib/utils"

type Item = string | { label: string }

type Props = {
  items?: Item[]
  duration?: number // seconds for one full loop
  pauseOnHover?: boolean
  className?: string
}

function renderLabel(item: Item) {
  if (typeof item === "string") return item
  return item.label
}

export default function TechStackStrip({
  items = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Vercel",
    "Supabase",
    "Prisma",
    "PostgreSQL",
    "Stripe",
  ],
  duration = 22,
  pauseOnHover = true,
  className,
}: Props) {
  // Duplicate list to create seamless loop
  const loop = [...items, ...items]

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-background", className)}
      role="region"
      aria-label="Technology stack scrolling list"
    >
      <div
        className={cn("group flex", pauseOnHover && "hover:[&_.marquee-track]:[animation-play-state:paused]")}
        style={
          {
            // CSS variable for dynamic duration
            "--marquee-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        <div className="marquee-track flex w-max">
          {loop.map((item, i) => (
            <span
              key={i}
              className="mx-3 my-3 inline-flex items-center rounded-full bg-secondary px-4 py-2 text-base font-bold text-secondary-foreground whitespace-nowrap shadow-sm"
              aria-hidden={i >= items.length ? true : undefined}
            >
              {renderLabel(item)}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee var(--marquee-duration) linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  )
}
