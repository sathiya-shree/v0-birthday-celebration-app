"use client"

import { Sparkles, Box } from "lucide-react"

export function SplineScene() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Ambient floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold/20 animate-pulse"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Scene placeholder */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Rotating wireframe cube */}
        <div className="relative w-40 h-40 md:w-56 md:h-56 perspective-1000">
          <div className="w-full h-full animate-spin" style={{ animationDuration: "12s" }}>
            <div className="absolute inset-0 border-2 border-gold/30 rounded-xl" />
            <div
              className="absolute inset-4 border-2 border-gold/20 rounded-xl"
              style={{ transform: "rotateY(45deg)" }}
            />
            <div
              className="absolute inset-8 border-2 border-gold/10 rounded-xl"
              style={{ transform: "rotateX(45deg)" }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Box className="w-12 h-12 md:w-16 md:h-16 text-gold/60 animate-pulse" />
          </div>
        </div>

        {/* Label */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-sm text-muted-foreground font-[var(--font-inter)]">
            Spline 3D Scene Placeholder
          </span>
        </div>
      </div>
    </div>
  )
}
