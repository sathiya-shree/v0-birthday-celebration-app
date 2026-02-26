"use client"

export function FloatingCandles() {
  const candles = [
    { left: "8%", delay: "0s", duration: "6s", height: "60px" },
    { left: "22%", delay: "1.2s", duration: "5s", height: "48px" },
    { left: "38%", delay: "0.6s", duration: "7s", height: "56px" },
    { left: "55%", delay: "1.8s", duration: "5.5s", height: "52px" },
    { left: "72%", delay: "0.3s", duration: "6.5s", height: "64px" },
    { left: "88%", delay: "2s", duration: "5.8s", height: "44px" },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {candles.map((candle, i) => (
        <div
          key={i}
          className="absolute bottom-0 animate-bounce"
          style={{
            left: candle.left,
            animationDelay: candle.delay,
            animationDuration: candle.duration,
          }}
        >
          {/* Flame */}
          <div className="relative mx-auto w-3 mb-0.5">
            <div
              className="w-3 h-4 rounded-full bg-gold animate-pulse"
              style={{
                animationDelay: candle.delay,
                boxShadow: "0 0 12px 4px rgba(212,163,74,0.5), 0 0 24px 8px rgba(212,163,74,0.2)",
              }}
            />
          </div>
          {/* Candle body */}
          <div
            className="w-2 mx-auto rounded-sm bg-warm-white/80"
            style={{ height: candle.height }}
          />
        </div>
      ))}
    </div>
  )
}
