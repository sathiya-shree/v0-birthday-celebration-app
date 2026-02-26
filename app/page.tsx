"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion" // Added for animations
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
    
    // Confetti Fountain
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
      
      {/* 🌸 Ambient Flower Bouquets */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -bottom-20 -left-20 z-0 text-pink-500/20"
      >
        <Flower2 size={400} />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-20 -right-20 z-0 text-purple-500/20"
      >
        <Flower2 size={400} />
      </motion.div>

      <section className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 px-6 py-12">
        
        <AnimatePresence mode="wait">
          {!celebrated ? (
            /* --- STATE 1: THE CAKE & CELEBRATE BUTTON --- */
            <motion.div 
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-8 w-full"
            >
              <div className="text-center space-y-4">
                <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase font-bold">{today}</p>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
                  Happy <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-gold to-yellow-500">Birthday</span>
                </h1>
              </div>

              <div className="relative w-full max-w-2xl h-[400px] md:h-[500px]">
                <div className="absolute inset-0 bg-gold/5 blur-3xl scale-90" />
                <div className="relative w-full h-full rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl">
                  <SplineScene />
                </div>
              </div>

              <CelebrateButton onCelebrate={handleCelebrate} />
              
              {/* Secret Icons */}
              <div className="flex gap-8">
                <motion.button whileHover={{ scale: 1.2 }} onClick={() => setActiveSecret(secrets.gift)} className="text-gold/40 hover:text-gold"><Gift /></motion.button>
                <motion.button whileHover={{ scale: 1.2 }} onClick={() => setActiveSecret(secrets.heart)} className="text-pink-500/40 hover:text-pink-500"><Heart /></motion.button>
                <motion.button whileHover={{ scale: 1.2 }} onClick={() => setActiveSecret(secrets.star)} className="text-blue-400/40 hover:text-blue-400"><Star /></motion.button>
              </div>
            </motion.div>
          ) : (
            /* --- STATE 2: THE HBD BOX & LETTER ONLY --- */
            <motion.div 
              key="message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 100 }}
              className="flex flex-col items-center gap-6 text-center max-w-2xl w-full"
            >
              <BirthdayMessage visible={celebrated} />

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-4 p-10 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
              >
                {/* Decorative glow inside the letter */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-2xl rounded-full -mr-16 -mt-16" />
                
                <h3 className="text-gold font-bold mb-6 uppercase tracking-[0.3em] text-[10px]">A Letter For You</h3>
                <p className="text-white/90 leading-relaxed italic text-lg md:text-xl font-light">
                  "Every year, you grow more wonderful. This app is just a small piece of the joy you bring into my life. I hope today is filled with laughter, love, and the biggest cake you can find. You deserve the world!"
                </p>
                <p className="mt-8 text-gold font-serif italic text-lg">— Handcrafted with love</p>
              </motion.div>

              <button 
                onClick={() => setCelebrated(false)} 
                className="mt-8 group flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-all underline underline-offset-8"
              >
                <PartyPopper className="w-3 h-3 group-hover:rotate-12" />
                Return to Cake
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Secret Message Popup */}
      <AnimatePresence>
        {activeSecret && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="bg-[#111] border border-gold/20 p-10 rounded-[40px] text-center max-w-xs shadow-2xl"
            >
              <p className="mb-8 text-xl font-medium leading-relaxed">{activeSecret}</p>
              <button onClick={() => setActiveSecret(null)} className="text-[10px] uppercase font-bold tracking-widest text-gold border border-gold/30 px-6 py-3 rounded-full hover:bg-gold/10 transition-colors">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 py-8 text-center opacity-30">
        <p className="text-[10px] uppercase tracking-[0.4em]">Made with Love • 2026</p>
      </footer>
    </main>
  )
}
