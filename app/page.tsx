"use client"

import { useState } from "react"
import { SplineScene } from "@/components/spline-scene"
import { CelebrateButton } from "@/components/celebrate-button"
import { BirthdayMessage } from "@/components/birthday-message"
import { FloatingCandles } from "@/components/floating-candles"
import { Sparkles } from "lucide-react"

export default function BirthdayPage() {
  const [celebrated, setCelebrated] = useState(false)

  return (
    <main className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "url('/images/birthday-glow.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,163,74,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Floating candles background */}
      <FloatingCandles />

      {/* Hero section */}
      <section className="relative flex-1 flex flex-col items-center justify-center gap-8 px-4 py-12 md:py-20">
        {/* Top badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/40 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="text-xs font-[var(--font-inter)] text-muted-foreground uppercase tracking-widest">
            A Special Day
          </span>
          <Sparkles className="w-3.5 h-3.5 text-gold" />
        </div>

        {/* Main heading */}
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground text-balance">
            Happy
            <span className="block text-primary">Birthday</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground font-[var(--font-inter)] max-w-lg mx-auto text-pretty leading-relaxed">
            {"Every year you shine brighter. Today, we celebrate the incredible person you are."}
          </p>
        </div>

        {/* Spline 3D Scene placeholder */}
        <div className="w-full max-w-md h-64 md:h-80 rounded-2xl border border-border bg-secondary/30 backdrop-blur-sm overflow-hidden">
          <SplineScene />
        </div>

        {/* Celebrate button */}
        {!celebrated && (
          <div className="animate-in fade-in zoom-in duration-500">
            <CelebrateButton onCelebrate={() => setCelebrated(true)} />
          </div>
        )}

        {/* Birthday message */}
        <BirthdayMessage visible={celebrated} />

        {/* Repeat celebration link */}
        {celebrated && (
          <button
            onClick={() => {
              setCelebrated(false)
              setTimeout(() => setCelebrated(false), 100)
            }}
            className="text-sm text-muted-foreground font-[var(--font-inter)] hover:text-primary transition-colors duration-200 underline underline-offset-4"
          >
            Celebrate again
          </button>
        )}
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center">
        <p className="text-xs text-muted-foreground font-[var(--font-inter)]">
          {"Made with love, just for you"}
        </p>
      </footer>
    </main>
  )
}
