"use client";

import React, { useEffect, useState } from "react";
import WidgetCard from "@/components/widgets/WidgetCard";

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

export default function ClockWidget({ span }: { span?: Span }) {
  const [now, setNow] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeString = mounted
    ? now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      })
    : "--:--:--";

  const dateString = mounted
    ? now.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Kolkata",
      })
    : "India Standard Time";

  return (
    <WidgetCard title="Time" headerExtra={<span>IST</span>} className={spanToClasses(span)}>
      <div className="font-mono text-gray-100 h-full flex flex-col justify-center items-center space-y-3">
        <div className="text-center">
          <div className="text-4xl font-bold leading-none mb-3 text-gray-100">{timeString}</div>
          <div className="text-sm text-gray-300 leading-relaxed">{dateString}</div>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full"></div>
      </div>
    </WidgetCard>
  );
}