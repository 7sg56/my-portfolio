"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useDragControls } from "motion/react";

export type WindowProps = {
  id?: string;
  title: string;
  open?: boolean;
  fullscreen?: boolean;
  zIndex?: number;
  onClose?: () => void;
  onMinimize?: () => void;
  onToggleFullscreen?: () => void;
  children: React.ReactNode;
};

export default function AppWindow({
  id,
  title,
  fullscreen = false,
  zIndex = 40,
  onClose,
  onMinimize,
  onToggleFullscreen,
  children,
}: WindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Enable full layout animation only briefly on fullscreen toggle to avoid content update lag
  const [fsAnim, setFsAnim] = useState(false);
  useEffect(() => {
    setFsAnim(true);
    const t = setTimeout(() => setFsAnim(false), 250);
    return () => clearTimeout(t);
  }, [fullscreen]);

  // Local size state for windowed mode
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 900, h: 560 });
  const [savedSize, setSavedSize] = useState<{ w: number; h: number } | null>(null);
  const prevFsRef = useRef(fullscreen);

  // Sync save/restore size when toggling fullscreen
  useEffect(() => {
    const prev = prevFsRef.current;
    if (!prev && fullscreen) {
      // entering fullscreen, save windowed size
      setSavedSize(size);
    } else if (prev && !fullscreen) {
      // leaving fullscreen, restore windowed size if saved
      if (savedSize) setSize(savedSize);
    }
    prevFsRef.current = fullscreen;
  }, [fullscreen, savedSize, size]);

  // Disable dragging when fullscreen
  const dragProps = useMemo(
    () =>
      fullscreen
        ? { drag: false as const }
        : {
            drag: true as const,
            dragListener: false,
            dragControls,
            dragMomentum: false,
            dragElastic: 0.08,
            dragConstraints: containerRef,
          },
    [fullscreen, dragControls]
  );

  // Resize handler (bottom-right corner)
  const startResize = (e: React.PointerEvent) => {
    if (fullscreen) return;
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = size.w;
    const startH = size.h;

    const bounds = containerRef.current?.getBoundingClientRect();
    const maxW = (bounds?.width || window.innerWidth) - 32; // padding allowance
    const maxH = (bounds?.height || window.innerHeight) - 32;

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      const nextW = Math.min(Math.max(360, startW + dx), maxW);
      const nextH = Math.min(Math.max(240, startH + dy), maxH);
      setSize({ w: nextW, h: nextH });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div ref={containerRef} className="fixed inset-0 p-4 pointer-events-none" style={{ zIndex }}>
      <motion.div
        layout={fsAnim ? true : "position"}
        layoutId={id}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 260, damping: 24, layout: { duration: 0.18 } }}
        className={
          (fullscreen
            ? "pointer-events-auto h-full"
            : "pointer-events-auto") +
          " relative rounded-lg border backdrop-blur p-3 flex flex-col font-mono text-sm"
        }
        style={{
          borderColor: "#45475a",
          backgroundColor: "rgba(30,30,46,0.85)",
          width: fullscreen ? "100%" : size.w,
          height: fullscreen ? "100%" : size.h,
        }}
        {...dragProps}
      >
        <div
          className="flex items-center gap-2 pb-2 cursor-default select-none"
          onDoubleClick={onToggleFullscreen}
          onPointerDown={(e) => dragControls.start(e)}
        >
          <button
            type="button"
            title="Close"
            aria-label="Close"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onClose}
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "#f38ba8" }}
          />
          <button
            type="button"
            title="Minimize"
            aria-label="Minimize"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onMinimize}
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "#f9e2af" }}
          />
          <button
            type="button"
            title="Toggle fullscreen"
            aria-label="Toggle fullscreen"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onToggleFullscreen}
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "#a6e3a1" }}
          />
          <span className="ml-3 text-xs" style={{ color: "#a6adc8" }}>
            {title}
          </span>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto pr-2" style={{ color: "#cdd6f4" }}>
          {children}
        </div>

        {/* Resize corner handle */}
        {!fullscreen && (
          <div
            onPointerDown={startResize}
            className="absolute bottom-2 right-2 h-3 w-3 rounded-sm border border-zinc-400/30 bg-zinc-500/40 cursor-se-resize"
          />
        )}
      </motion.div>
    </div>
  );
}
