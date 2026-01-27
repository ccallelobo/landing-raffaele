"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  className?: string;
}

export default function BeforeAfterSlider({ className = "" }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updatePosition(e.clientX);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Prevent text selection while dragging
  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = "none";
    } else {
      document.body.style.userSelect = "";
    }
    return () => {
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className}`}
      style={{ cursor: isDragging ? "ew-resize" : "default" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* AFTER layer (full, sits behind) */}
      <div className="absolute inset-0 bg-gradient-to-br from-brass/20 via-parchment to-ivory flex items-center justify-center">
        <div className="text-center">
          <span className="text-noir/20 text-[11px] tracking-[0.4em] uppercase font-semibold block mb-2">
            Después
          </span>
          <span className="text-noir/10 font-display text-5xl">D</span>
        </div>
      </div>

      {/* BEFORE layer (clipped) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-noir/10 via-warm-gray/30 to-divider flex items-center justify-center"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="text-center">
          <span className="text-noir/20 text-[11px] tracking-[0.4em] uppercase font-semibold block mb-2">
            Antes
          </span>
          <span className="text-noir/10 font-display text-5xl">A</span>
        </div>
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* Vertical line */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]" />

        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-ew-resize">
          <div
            className={`w-11 h-11 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.25)] flex items-center justify-center transition-transform duration-150 ${
              isDragging ? "scale-110" : "hover:scale-105"
            }`}
          >
            {/* Arrows */}
            <svg
              className="w-5 h-5 text-noir/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12H4m0 0l3-3m-3 3l3 3m8-3h4m0 0l-3-3m3 3l-3 3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
