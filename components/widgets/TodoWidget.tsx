"use client";

import React from "react";
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

type SimpleTask = { id: number; title: string; completed: boolean };

const tasks: SimpleTask[] = [
  { id: 1, title: " Running high on NextJs", completed: false },
  { id: 2, title: " Petting the kitty", completed: false },
  { id: 4, title: " Watching The Punisher", completed: false },
  { id: 3, title: " Romancing a Marlboro Red", completed: false },
  { id: 5, title: " Cooking Chicken Changezi", completed: false },
  { id: 8, title: " Searching for a code partner" , completed: false },
  { id: 6, title: " Always up for a Shawarma", completed: false },
];

export default function TodoWidget({ span }: { span?: Span }) {
  return (
    <WidgetCard title="Things I be doing" className={spanToClasses(span)}>
      <div className="font-mono text-gray-100 h-full flex flex-col gap-3 min-h-0">
        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
          {tasks.map((t) => (
            <div key={t.id} className="rounded-lg border border-gray-600/30 bg-gray-700/40 px-4 py-3 hover:bg-gray-700/60 transition-colors duration-200">
              <div className={`text-sm ${t.completed ? "line-through text-gray-400" : "text-gray-100"}`}>
                {t.title}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full"></div>
      </div>
    </WidgetCard>
  );
}
