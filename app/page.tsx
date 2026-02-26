"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SplineScene } from "@/components/spline-scene"
import { CelebrateButton } from "@/components/celebrate-button"
import { BirthdayMessage } from "@/components/birthday-message"
import { FloatingCandles } from "@/components/floating-candles"
import { Sparkles, PartyPopper, Gift, Heart, Star, Flower2, MailOpen, Mail } from "lucide-react"
import confetti from "canvas-confetti"
import { Howl } from "howler"

export default function BirthdayPage() {
  const [celebrated, setCelebrated] = useState(false)
  const [activeSecret, setActiveSecret] = useState<string | null>(null)

  const today = new Date().toLocaleDateString('en-US', { 
    month: 'long', day: 'numeric', year: 'numeric' 
  });

  const sound = useMemo(() => new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'],
    volume: 0.5,
    html5: true
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
      confetti({ 
        particleCount: 40, 
        spread: 80, 
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FF69B4', '#8A2BE2'] 
      })
    }, 250)
  }

  const secrets = {
    gift: "You are the greatest gift I've ever known! 🎁",
    heart: "Sending you infinite love on your special day. ❤️",
    star: "Keep shining bright like the star you are! ✨"
  }

  return (
    <main className="relative min-h-screen flex flex-col bg-[#050505] text-white overflow-hidden font-sans">
      <FloatingCandles />
      
      {/* 🌸 Ambient Background Flowers */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -bottom-20 -left-20 z-0 text-pink-500/20"
      >
        <Flower2 size={400} />
      </motion.div>

      <section className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 px-6 py-12">
        
        <AnimatePresence mode="wait">
          {!celebrated ? (
            /* --- STATE 1: CAKE & INTERACTIVE ELEMENTS --- */
            <motion.div 
              key="setup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-8 w-full"
            >
              <div className="text-center space-y-4">
                <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase font-bold">{today}</p>
                
                {/* Updated Badge with Letter Icon */}
                <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                  {celebrated ? <MailOpen className="w-4 h-4 text-gold" /> : <Mail className="w-4 h-4 text-gold animate-bounce" />}
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">A Magical Moment</span>
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
                  Happy <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-gold to-yellow-500">Birthday</span>
                </h1>
              </div>

              {/* Spline Container */}
              <div className="relative w-full max-w-2xl h-[400px] md:h-[500px]">
                <div className="absolute inset-0 bg-gold/5 blur-3xl scale-90" />
                <div className="relative w-full h-full rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl">
                  <SplineScene />
                </div>
              </div>

              <CelebrateButton onCelebrate={handleCelebrate} />
              
              <div className="flex gap-8">
                <motion.button whileHover={{ scale: 1.2 }} onClick={() => setActiveSecret(secrets.gift)} className="text-gold/40 hover:text-gold"><Gift /></motion.button>
                <motion.button whileHover={{ scale: 1.2 }} onClick={() => setActiveSecret(secrets.heart)} className="text-pink-500/40 hover:text-pink-500"><Heart /></motion.button>
                <motion.button whileHover={{ scale: 1.2 }} onClick={() => setActiveSecret(secrets.star)} className="text-blue-400/40 hover:text-blue-400"><Star /></motion.button>
              </div>
            </motion.div>
          ) : (
            /* --- STATE 2: HBD BOX & THE LETTER REVEAL --- */
            <motion.div 
              key="message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 text-center max-w-2xl w-full"
            >
              {/* Main HBD Box */}
              <BirthdayMessage visible={celebrated} />

              {/* The Physical Letter Animation */}
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ delay: 0.6, duration: 1, ease: "circOut" }}
                className="mt-4 w-full p-10 rounded-[40px] border border-gold/20 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl shadow-2xl relative overflow-hidden"
              >
                <MailOpen className="absolute top-6 right-8 text-gold/20 w-12 h-12" />
                
                <h3 className="text-gold font-bold mb-6 uppercase tracking-[0.4em] text-[11px]">Personal Note</h3>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-white/90 leading-relaxed italic text-lg md:text-xl font-light"
                >
                  "Every year, you grow more wonderful. This app is just a small piece of the joy you bring into my life. I hope today is filled with laughter, love, and the biggest cake you can find. You deserve the world!"
                </motion.p>
                
                <div className="mt-8 pt-6 border-t border-white/5">
                   <p className="text-gold font-serif italic text-xl">With all my love,</p>
                   <p className="text-white/40 text-[10px] mt-2 tracking-widest uppercase">February 2026</p>
                </div>
              </motion.div>

              <button 
                onClick={() => setCelebrated(false)} 
                className="mt-8 group flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-all"
              >
                <PartyPopper className="w-3 h-3 group-hover:rotate-12" />
                Show Cake Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Secret Popups */}
      <AnimatePresence>
        {activeSecret && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
          >
            <motion.div 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              className="bg-[#111] border border-gold/20 p-10 rounded-[40px] text-center max-w-xs"
            >
              <p className="text-xl font-medium mb-8">{activeSecret}</p>
              <button onClick={() => setActiveSecret(null)} className="text-[10px] uppercase font-bold tracking-widest text-gold border border-gold/30 px-6 py-3 rounded-full">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 py-8 text-center opacity-30">
        <p className="text-[10px] uppercase tracking-[0.4em]">Handcrafted with Love • 2026</p>
      </footer>
    </main>
  )
}
