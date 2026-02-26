"use client"

import { useState, useEffect } from "react"
import { SplineScene } from "@/components/spline-scene"
import { CelebrateButton } from "@/components/celebrate-button"
import { BirthdayMessage } from "@/components/birthday-message"
import { FloatingCandles } from "@/components/floating-candles"
import { Sparkles, PartyPopper } from "lucide-react"
import confetti from "canvas-confetti"
import { Howl } from "howler"

export default function BirthdayPage() {
  const [celebrated, setCelebrated] = useState(false)

  // Audio setup - Party Horn / Music
  const sound = new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'],
    volume: 0.5,
  })

  const handleCelebrate = () => {
    if (celebrated) return
    setCelebrated(true)

    // 1. Play Sound
    sound.play()

    // 2. Continuous Confetti Fountain for 5 seconds
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)

      const particleCount = 50 * (timeLeft / duration)
      // Random bursts from the left and right
      confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } })
    }, 250)
  }

  return (
    <main className="relative min-h-screen flex flex-col bg-[#050505] text-white overflow-hidden font-sans">

      {/* Background Layer: Candles & Glow */}
      <FloatingCandles />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <section className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 px-6 py-12">

        {/* Animated Header Badge */}
        <div className="animate-in fade-in slide-in-from-top duration-1000 flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
            A Magical Moment
          </span>
        </div>

        {/* Main Typography */}
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
            Happy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-gold to-yellow-500 drop-shadow-sm">
              Birthday
            </span>
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium tracking-wide max-w-md mx-auto leading-relaxed">
            {"May your day be as extraordinary as you are."}
          </p>
        </div>

        {/* The 3D Cake Container */}
        <div className="relative w-full max-w-3xl h-[450px] md:h-[550px]">
          {/* External glow for the 3D scene */}
          <div className="absolute inset-0 bg-gold/5 blur-3xl scale-90" />

          <div className="relative w-full h-full rounded-[40px] border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm overflow-hidden shadow-2xl">
            <SplineScene />
          </div>
        </div>

        {/* Interaction Button / Message */}
        <div className="relative h-40 w-full flex flex-col items-center justify-center">
          {!celebrated ? (
            <div className="animate-in fade-in zoom-in slide-in-from-bottom-4 duration-700 delay-500">
              <CelebrateButton onCelebrate={handleCelebrate} />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6 text-center animate-in zoom-in fade-in duration-700">
              <BirthdayMessage visible={celebrated} />

              <button
                onClick={() => setCelebrated(false)}
                className="group flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-all"
              >
                <PartyPopper className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                Reset the Party
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Subtle Footer */}
      <footer className="relative z-10 py-8 text-center opacity-30">
        <p className="text-[10px] uppercase tracking-[0.4em]">Handcrafted with Love • 2026</p>
      </footer>
    </main>
  )
}