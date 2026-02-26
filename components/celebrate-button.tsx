"use client"

import { useCallback } from "react"
import confetti from "canvas-confetti"
import { PartyPopper } from "lucide-react"

interface CelebrateButtonProps {
  onCelebrate: () => void
}

export function CelebrateButton({ onCelebrate }: CelebrateButtonProps) {
  const fireConfetti = useCallback(() => {
    // First burst — center
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#d4a34a", "#f5d98e", "#fff", "#ffb347", "#ffd700"],
    })

    // Left burst
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.65 },
        colors: ["#d4a34a", "#f5d98e", "#fff", "#ffb347", "#ffd700"],
      })
    }, 200)

    // Right burst
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.65 },
        colors: ["#d4a34a", "#f5d98e", "#fff", "#ffb347", "#ffd700"],
      })
    }, 400)

    // Grand finale — shower
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.35 },
        colors: ["#d4a34a", "#f5d98e", "#fff", "#ffb347", "#ffd700"],
        gravity: 0.8,
        scalar: 1.2,
      })
    }, 700)

    onCelebrate()
  }, [onCelebrate])

  return (
    <button
      onClick={fireConfetti}
      className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full
        bg-primary text-primary-foreground font-[var(--font-inter)] font-semibold text-lg
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-[0_0_40px_rgba(212,163,74,0.4)]
        active:scale-95
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Celebrate birthday with confetti"
    >
      <PartyPopper className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
      <span>Celebrate</span>
      <span className="absolute inset-0 rounded-full border border-gold-light/30 animate-ping opacity-20 pointer-events-none" />
    </button>
  )
}
