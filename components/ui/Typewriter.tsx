"use client";

import React from "react";

type TypewriterProps = {
  lines: string[];
  charIntervalMs?: number;
  lineDelayMs?: number;
  className?: string;
  onDone?: () => void;
};

export default function Typewriter({
  lines,
  charIntervalMs = 12,
  lineDelayMs = 200,
  className,
  onDone,
}: TypewriterProps) {
  const [output, setOutput] = React.useState<string>("");
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    let lineIdx = 0;
    let charIdx = 0;

    function typeNext() {
      if (!mounted) return;
      if (lineIdx >= lines.length) {
        setDone(true);
        onDone?.();
        return;
      }
      const line = lines[lineIdx];
      if (charIdx <= line.length) {
        setOutput((prev) => prev + line.slice(charIdx - 1, charIdx));
        charIdx++;
        setTimeout(typeNext, charIntervalMs);
      } else {
        setOutput((prev) => prev + "\n");
        charIdx = 0;
        lineIdx++;
        setTimeout(typeNext, lineDelayMs);
      }
    }

    setOutput("");
    setDone(false);
    const id = setTimeout(typeNext, 300);
    return () => {
      mounted = false;
      clearTimeout(id);
    };
  }, [lines, charIntervalMs, lineDelayMs, onDone]);

  return (
    <pre className={className} aria-live="polite">
      {output}
      {!done && <span className="animate-pulse">▮</span>}
    </pre>
  );
}
