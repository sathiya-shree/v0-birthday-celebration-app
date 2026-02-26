"use client"

import { useState, useMemo } from "react"
import { SplineScene } from "@/components/spline-scene"
import { CelebrateButton } from "@/components/celebrate-button"
import { BirthdayMessage } from "@/components/birthday-message"
import { FloatingCandles } from "@/components/floating-candles"
import { Sparkles, PartyPopper, Gift, Heart, Star, Flower2 } from "lucide-react"
import confetti from "canvas-confetti"
import { Howl } from "howler"

export default function BirthdayPage() {
  const [celebrated, setCelebrated] = useState(false)
  const [activeSecret, setActiveSecret] = useState<string | null>(null)

  // 1. Get Today's Date
  const today = new Date().toLocaleDateString('en-US', { 
    month: 'long', day: 'numeric', year: 'numeric' 
  });

  const sound = useMemo(() => new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'],
    volume: 0.5,
  }), [])

  const handleCelebrate = () => {
    if (celebrated) return
    setCelebrated(true)
    sound.play()
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)
      confetti({ particleCount: 40, spread: 70, origin: { x: Math.random(), y: Math.random() - 0.2 } })
    }, 250)
  }

  // Secret Messages for Icons
  const secrets = {
    gift: "You are the greatest gift I've ever known! 🎁",
    heart: "Sending you infinite love on your special day. ❤️",
    star: "Keep shining bright like the star you are! ✨"
  }

  return (
    <main className="relative min-h-screen flex flex-col bg-[#050505] text-white overflow-hidden font-sans">
      <FloatingCandles />
      
      {/* 🌸 Flower Bouquets (Corners) */}
      <div className="absolute -bottom-10 -left-10 z-20 opacity-80 animate-pulse text-pink-500/40 scale-150">
        <Flower2 size={200} />
      </div>
      <div className="absolute -bottom-10 -right-10 z-20 opacity-80 animate-pulse text-purple-500/40 scale-150 delay-700">
        <Flower2 size={200} />
      </div>

      <section className="relative z-10 flex-1 flex flex-col items-center justify-start gap-8 px-6 py-12">
        
        {/* Date & Badge */}
        <div className="flex flex-col items-center gap-3">
            <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase font-bold">{today}</p>
            <div className="animate-in fade-in slide-in-from-top duration-1000 flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">A Magical Moment</span>
            </div>
        </div>

        {/* Main Heading */}
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
            Happy <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-gold to-yellow-500">Birthday</span>
          </h1>
        </div>

        {/* 3D Cake Box */}
        <div className="relative w-full max-w-2xl h-[400px] md:h-[500px]">
          <div className="absolute inset-0 bg-gold/5 blur-3xl scale-90" />
          <div className="relative w-full h-full rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl">
            <SplineScene />
          </div>
        </div>

        {/* ✉️ The Birthday Letter Section */}
        {celebrated && (
            <div className="max-w-lg text-center animate-in fade-in zoom-in duration-1000 p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-lg">
                <h3 className="text-gold font-bold mb-4 uppercase tracking-widest text-xs">My Letter To You</h3>
                <p className="text-white/80 leading-relaxed italic text-sm md:text-base">
                    "Every year, you grow more wonderful. This app is just a small piece of the joy you bring into my life. I hope today is filled with laughter, love, and the biggest cake you can find. You deserve the world!"
                </p>
            </div>
        )}

        {/* 🎁 Clickable Secret Icons */}
        <div className="flex gap-8 mt-4">
            <button onClick={() => setActiveSecret(secrets.gift)} className="hover:scale-125 transition-transform text-gold/60 hover:text-gold"><Gift /></button>
            <button onClick={() => setActiveSecret(secrets.heart)} className="hover:scale-125 transition-transform text-pink-500/60 hover:text-pink-500"><Heart /></button>
            <button onClick={() => setActiveSecret(secrets.star)} className="hover:scale-125 transition-transform text-blue-400/60 hover:text-blue-400"><Star /></button>
        </div>

        {/* Secret Popup Message */}
        {activeSecret && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-6">
                <div className="bg-[#111] border border-gold/20 p-8 rounded-3xl text-center max-w-xs shadow-2xl">
                    <p className="mb-6 font-medium">{activeSecret}</p>
                    <button onClick={() => setActiveSecret(null)} className="text-[10px] uppercase font-bold tracking-widest text-gold border border-gold/20 px-4 py-2 rounded-full hover:bg-gold/10">Close</button>
                </div>
            </div>
        )}

        <div className="relative h-32 flex flex-col items-center justify-center">
          {!celebrated ? (
            <CelebrateButton onCelebrate={handleCelebrate} />
          ) : (
            <div className="flex flex-col items-center gap-6 text-center animate-in zoom-in fade-in duration-700">
              <BirthdayMessage visible={celebrated} />
              <button onClick={() => setCelebrated(false)} className="group flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-all">
                <PartyPopper className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                Reset the Party
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="relative z-10 py-8 text-center opacity-30">
        <p className="text-[10px] uppercase tracking-[0.4em]">Handcrafted with Love • 2026</p>
      </footer>
    </main>
  )
}
