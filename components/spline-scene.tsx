"use client"

export function SplineScene() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent">
      {/* Ambient floating particles - Layered behind the cake */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold/30 animate-pulse"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Your Interactive Spline Cake */}
      <iframe
        src='https://my.spline.design/monsterbirthdaycake-etA7DKzX80JXKlGqCUjsyyec/'
        frameBorder='0'
        width='100%'
        height='100%'
        className="relative z-10"
        title="Interactive Birthday Cake"
      />
    </div>
  )
}