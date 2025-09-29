"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function BootLog({ progress, title = "Booting Sourish’s Portfolio…" }: { progress: number; title?: string }) {
  const lines = useMemo(
    () => [
      "SOURISH 486DX BIOS v1.23   © 1995 Sourish Microsystems",
      "Primary Master:  WDC AC2540H  540MB  LBA",
      "Primary Slave :  None",
      "Secondary Mast:  MATSHITA CD-ROM CR-8004",
      "Secondary Slav:  None",
      "Video BIOS:     VGA Compatible, 512KB",
      "Memory Test:    640K OK + 15360K OK",
      "Keyboard:       Detected",
      "Mouse:          PS/2 Compatible",
      "Floppy Drive A: 1.44MB 3½\"",
      "",
      "Detecting IDE Primary Master...    WDC AC2540H",
      "Detecting IDE Secondary Master...  MATSHITA CR-8004",
      "",
      "PCI Device Listing...",
      " Bus  Dev  Fun  Vendor  Device  Class   IRQ",
      " 00   01   00   8086    1237    Host    --",
      " 00   02   00   8086    7000    ISA     --",
      " 00   02   01   8086    7010    IDE     14",
      " 00   02   02   8086    7020    USB     11",
      " 00   09   00   10EC    8139    LAN     10",
      "",
      "Press DEL to enter SETUP, F12 for Boot Menu",
      "Verifying DMI Pool Data............. OK",
      "Boot from ATAPI CD-ROM :  ...",
      "Boot from Hard Disk...",
      "",
      "Loading Portfolio OS...",
      "Initializing modules: projects, skills, terminal, widgets",
      "Mounting home directory... OK",
      "Starting services... OK",
      "Target: Graphical Interface (default)",
      "",
      "Handing off to bootloader...",
    ],
    []
  );

  const [visible, setVisible] = useState(0);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visible >= lines.length) return;
    const jitter = (min: number, max: number) => Math.random() * (max - min) + min;
    const timer = setTimeout(() => setVisible((v) => Math.min(lines.length, v + 1)), jitter(25, 80));
    return () => clearTimeout(timer);
  }, [visible, lines.length]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [visible]);

  const pct = Math.max(0, Math.min(100, Math.round(progress)));
  const barWidth = 28;
  const filled = Math.round((pct / 100) * barWidth);
  const empty = barWidth - filled;

  return (
    <div className="relative w-full h-full bg-black">
      {/* Scrollable terminal body with sticky top title and sticky bottom progress */}
      <div className="absolute inset-0 overflow-auto crt-flicker">
        <div className="relative min-h-full font-mono text-green-200 text-xs md:text-sm leading-relaxed">
          {/* Sticky top line (title as part of the log) */}
          <div className="sticky top-0 z-10 bg-black/85 px-4 py-1.5">
            <span className="crt-glow">[ BIOS ] {title}</span>
          </div>

          {/* Log content */}
          <div className="px-4 py-3 pb-14">
            <AnimatePresence initial={false}>
              {lines.slice(0, visible).map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.08 }}>
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>
            <span className="inline-block w-2 h-4 align-text-top bg-green-300 ml-1 animate-pulse" />
            <div ref={endRef} />
          </div>
        </div>
      </div>

      {/* Always-on-bottom ASCII progress bar (outside scroll area) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/85 px-4 py-2">
        <span className="text-green-400 font-mono text-xs">[
          <span className="text-green-400">{"█".repeat(filled)}</span>
          <span className="text-green-900">{"░".repeat(empty)}</span>
        ] {pct}%</span>
      </div>

      {/* Subtle scanline and vignette effects */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "repeating-linear-gradient(180deg, rgba(16,255,106,0.12) 0, rgba(16,255,106,0.12) 1px, transparent 2px)",
      }} />
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(80% 80% at 50% 50%, transparent 62%, rgba(0,0,0,0.45) 100%)"
      }} />
      <div className="crt-scanline" />
    </div>
  );
}
