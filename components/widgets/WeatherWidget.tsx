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
    <WidgetCard title="Weather" headerExtra={<span>Chennai</span>} className={spanToClasses(span)}>
      <div className="font-mono text-gray-100 flex flex-col justify-center h-full">
        {error && <div className="text-red-400 text-center text-sm bg-red-500/20 px-3 py-2 rounded-lg">{error}</div>}
        {data ? (
          <div className="space-y-4 text-center">
            <div className="text-5xl font-bold text-gray-100">{Math.round(data.temp ?? 0)}°C</div>
            <div className="text-gray-300 text-sm font-medium">{desc}</div>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <span>💨</span>
                <span>{Math.round(data.wind ?? 0)} km/h</span>
              </div>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full"></div>
          </div>
        ) : (
          <div className="text-gray-400 text-center text-sm flex items-center justify-center h-full">
            <div className="animate-pulse">Loading weather...</div>
          </div>
        )}
      </div>
    </WidgetCard>
  );
}
