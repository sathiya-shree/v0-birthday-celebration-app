"use client"

import { Heart, Cake, Star } from "lucide-react"

interface BirthdayMessageProps {
  visible: boolean
}

export function BirthdayMessage({ visible }: BirthdayMessageProps) {
  if (!visible) return null

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out w-full max-w-2xl mx-auto px-4">
      <div className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-md p-8 md:p-12 text-center">
        {/* Decorative corner stars */}
        <Star className="absolute top-4 left-4 w-4 h-4 text-gold/40 animate-pulse" />
        <Star className="absolute top-4 right-4 w-4 h-4 text-gold/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <Star className="absolute bottom-4 left-4 w-4 h-4 text-gold/40 animate-pulse" style={{ animationDelay: "1s" }} />
        <Star className="absolute bottom-4 right-4 w-4 h-4 text-gold/40 animate-pulse" style={{ animationDelay: "1.5s" }} />

        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <Cake className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
          Happy Birthday!
        </h2>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-[var(--font-inter)] mb-6 text-pretty">
          {"Today is your special day, and the whole world is a little brighter because you're in it. May this year bring you endless joy, unforgettable adventures, and all the love your heart can hold. Here's to another amazing trip around the sun!"}
        </p>

        <div className="flex items-center justify-center gap-2 text-primary">
          <Heart className="w-4 h-4 fill-current" />
          <span className="text-sm font-[var(--font-inter)] font-medium">
            With all the love in the world
          </span>
          <Heart className="w-4 h-4 fill-current" />
        </div>
      </div>
    </div>
  )
}
