"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { commands, aliases, type CommandHandler, type Env, type ThemeName } from "@/components/terminal/commands";

type HistoryItem = {
  id: string;
  command: string;
  output?: React.ReactNode;
};

function Banner({ visible, onQuick }: { visible: boolean; onQuick: (cmd: string) => void }) {
  if (!visible) return null;
  return (
    <div className="text-zinc-300">
      <pre className="whitespace-pre leading-5" style={{ color: "#cdd6f4" }}>
{`  _____                           _     _     _     _       
 / ____|                         | |   | |   | |   | |      
| (___   ___  _   _ _ __ ___  ___| |_  | |__ | |__ | | ___  
 \\___ \\ / _ \\| | | | '__/ _ \\/ __| __| | '_ \\| '_ \\| |/ _ \\ 
 ____) | (_) | |_| | | |  __/\\__ \\ |_  | | | | | | | |  __/ 
|_____/ \\___/ \\__,_|_|  \\___||___/\\__| |_| |_|_| |_|_|\\___| 
         
`}
      </pre>
      <div className="mt-1" style={{ color: "#a6adc8" }}>Click a quick link or type <span className="text-zinc-200">help</span>:</div>
      <div className="mt-2 flex flex-wrap gap-2">
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => onQuick("about details")}>About</button>
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => onQuick("projects list")}>Projects</button>
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => onQuick("skills")}>Skills</button>
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => onQuick("socials")}>Socials</button>
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => onQuick("resume")}>Resume</button>
      </div>
    </div>
  );
}

function Prompt({ text }: { text: string }) {
  const [user, host, path] = React.useMemo(() => {
    const match = text.match(/^(.*)@(.*):(.*)$/);
    return match ? [match[1], match[2], match[3]] : [text, "", ""];
  }, [text]);
  return (
    <span className="shrink-0 select-none">
      <span style={{ color: "#a6e3a1" }}>{user}</span>
      <span className="text-zinc-400">@</span>
      <span style={{ color: "#89b4fa" }}>{host}</span>
      <span className="text-zinc-400">{path}$</span>
    </span>
  );
}

type TerminalProps = {
  onMinimize?: () => void;
  onClose?: () => void;
  onToggleFullscreen?: () => void;
  fullscreen?: boolean;
  externalCommand?: string | null;
  onExternalConsumed?: () => void;
};

export default function Terminal({ onMinimize, onClose, onToggleFullscreen, fullscreen = true, externalCommand = null, onExternalConsumed }: TerminalProps) {
  const [history, setHistory] = useState<HistoryItem[]>(() => []);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [theme, setTheme] = useState<ThemeName>("mocha");
  const [bannerVisible, setBannerVisible] = useState(true);
  const [prompt, setPrompt] = useState<string>("s0urishg@7sg56:~");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const envRef = useRef<Env | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [history.length]);

  const historyCommands = useMemo(() => history.map(h => h.command).filter(Boolean), [history]);

  const env: Env = useMemo(() => ({
    setTheme,
    setBannerVisible,
    setPrompt,
    open: (url: string) => {
      try {
        const u = url.startsWith("http") ? url : `https://${url}`;
        window.open(u, "_blank", "noopener,noreferrer");
      } catch {}
    },
    run: (cmd: string) => {
      run(cmd);
      inputRef.current?.focus();
    },
    theme,
    prompt,
    bannerVisible,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [theme, prompt, bannerVisible]);

  const run = useCallback((raw: string) => {
    const id = crypto.randomUUID();
    const text = raw.trim();
    if (!text) return;

    const [cmd, ...args] = text.split(/\s+/);
    let key = cmd.toLowerCase();
    if (!commands[key] && aliases[key]) key = aliases[key];

    if (key === "clear") {
      setHistory([]);
      return;
    }


    const handler: CommandHandler | undefined = commands[key];
    const ctx = envRef.current ?? env;
    const output = handler ? handler(args, ctx) : (
      <div className="text-red-300">
        Command not found: <span className="text-red-100">{cmd}</span>. Type <span className="text-zinc-200">help</span>.
      </div>
    );

    setHistory(prev => [...prev, { id, command: text, output }]);
  }, [env]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = input;
      setInput("");
      setHistoryIndex(null);
      run(val);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!historyCommands.length) return;
      setHistoryIndex(prev => {
        const next = prev === null ? historyCommands.length - 1 : Math.max(0, prev - 1);
        setInput(historyCommands[next] ?? "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const next = Math.min(historyCommands.length - 1, historyIndex + 1);
      setHistoryIndex(next);
      setInput(historyCommands[next] ?? "");
    } else if (e.key === "c" && (e.ctrlKey || e.metaKey)) {
      // Simulate ^C to cancel current line
      e.preventDefault();
      setInput("");
    }
  };

  const frameStyle = theme === "mocha"
    ? { borderColor: "#45475a", backgroundColor: "rgba(30,30,46,0.85)" }
    : {};

  // keep envRef pointing to latest env
  useEffect(() => { envRef.current = env; }, [env]);

  // consume external command requests
  useEffect(() => {
    if (externalCommand && externalCommand.trim()) {
      run(externalCommand);
      onExternalConsumed?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalCommand]);

  return (
    <div className={fullscreen ? "fixed inset-0 p-4 pointer-events-none z-40" : "relative z-40 w-full max-w-4xl mx-auto"}>
      <div className={fullscreen ? "pointer-events-auto h-full rounded-lg border backdrop-blur p-3 flex flex-col" : "pointer-events-auto rounded-lg border backdrop-blur p-3"} style={frameStyle}>
        {/* window bar */}
        <div className="flex items-center gap-2 pb-2">
          <button type="button" title="Close" aria-label="Close" onClick={onClose} className="h-3 w-3 rounded-full" style={{ backgroundColor: "#f38ba8" }} />
          <button type="button" title="Minimize" aria-label="Minimize" onClick={onMinimize} className="h-3 w-3 rounded-full" style={{ backgroundColor: "#f9e2af" }} />
          <button type="button" title="Toggle fullscreen" aria-label="Toggle fullscreen" onClick={onToggleFullscreen} className="h-3 w-3 rounded-full" style={{ backgroundColor: "#a6e3a1" }} />
          <span className="ml-3 text-xs" style={{ color: "#a6adc8" }}>sourish@portfolio — zsh</span>
        </div>

        {/* terminal content */}
        <div ref={containerRef} className={fullscreen ? "flex-1 overflow-y-auto pr-2 font-mono text-sm" : "h-[70vh] overflow-y-auto pr-2 font-mono text-sm"} style={{ color: "#cdd6f4" }}>
          <Banner visible={bannerVisible} onQuick={(cmd) => run(cmd)} />
          <div className="my-3 border-t" style={{ borderColor: "#313244" }} />
          {history.map(item => (
            <div key={item.id} className="mb-2">
              <div className="flex items-start gap-2">
                <Prompt text={prompt} />
                <span className="whitespace-pre-wrap break-words">{item.command}</span>
              </div>
              {item.output && <div className="mt-1 pl-6">{item.output}</div>}
            </div>
          ))}
        </div>

        {/* prompt input */}
        <div className="mt-2 flex items-center gap-2 font-mono text-sm" style={{ color: "#cdd6f4" }}>
          <Prompt text={prompt} />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent outline-none placeholder-zinc-600"
            placeholder="type a command… (try: help)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck={false}
            style={{ caretColor: "#a6e3a1" }}
          />
        </div>

        <div className="mt-2 text-[10px]" style={{ color: "#a6adc8" }}>Type 'clear' to clear the screen. Theme: Catppuccin Mocha</div>
      </div>
    </div>
  );
}
