"use client";

import React, { useState, useEffect } from "react";

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

type SimpleTask = { id: number; title: string; completed: boolean };

const tasks: SimpleTask[] = [
  { id: 1, title: "Running high on NextJs", completed: false },
  { id: 2, title: "Petting Mr.Rowlins", completed: false },
  { id: 3, title: "Watching The Punisher", completed: false },
  { id: 4, title: "Romancing a Marlboro Red", completed: false },
  { id: 5, title: "Searching for a code partner", completed: false },
  { id: 6, title: "Looking up for a Shawarma", completed: false },
];

export default function TodoWidget({ span }: { span?: Span }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tasks.length);
    }, 5000); // 5 seconds = 5000 milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.4)] h-full w-full ${spanToClasses(span)}`}>
      <div className="h-full w-full p-4 flex flex-col">
        <div className="text-xs font-mono text-zinc-400 mb-3">Things I be doing</div>
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {tasks.map((task, index) => {
              const isActive = index === currentIndex;
              
              return (
                <div
                  key={index}
                  className={`absolute text-lg font-bold font-mono text-zinc-200 text-center px-4 transition-all duration-800 ease-in-out ${
                    isActive 
                      ? 'opacity-100 scale-100 translate-x-0' 
                      : 'opacity-0 scale-75 translate-x-0'
                  }`}
                >
                  {task.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
