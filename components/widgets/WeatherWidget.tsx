"use client";

import React, { useEffect, useMemo, useState } from "react";
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

// Fixed-location weather widget (Chennai, India) using Open-Meteo (no API key)
export default function WeatherWidget({ span }: { span?: Span }) {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    temp?: number;
    wind?: number;
    code?: number;
  } | null>(null);

  useEffect(() => {
    const lat = 13.0827; // Chennai
    const lon = 80.2707;
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m`;
    fetch(weatherUrl)
      .then((r) => r.json())
      .then((json) => {
        const cur = json.current || {};
        setData({ temp: cur.temperature_2m, wind: cur.wind_speed_10m, code: cur.weather_code });
      })
      .catch(() => setError("Weather fetch failed"));
  }, []);

  const desc = useMemo(() => {
    const code = data?.code;
    if (code == null) return "";
    // tiny map for common codes
    const map: Record<number, string> = {
      0: "Clear",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      61: "Light rain",
      63: "Rain",
      71: "Snow",
      95: "Thunderstorm",
    };
    return map[code] || `Code ${code}`;
  }, [data?.code]);

  return (
    <WidgetCard title="Weather" headerExtra={<span> Chennai, India</span>} className={spanToClasses(span)}>
      <div className="font-mono text-zinc-200 flex flex-col justify-center h-full">
        {error && <div className="text-red-300 text-center text-xs">{error}</div>}
        {data ? (
          <div className="space-y-2 text-center">
            <div className="text-2xl font-bold text-white">{Math.round(data.temp ?? 0)}°C</div>
            <div className="text-zinc-200 text-xs">{desc}</div>
            <div className="text-zinc-400 text-xs">Wind: {Math.round(data.wind ?? 0)} km/h</div>
          </div>
        ) : (
          <div className="text-zinc-400 text-center text-xs">Loading…</div>
        )}
      </div>
    </WidgetCard>
  );
}
