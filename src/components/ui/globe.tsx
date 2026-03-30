import { useEffect, useRef, useState } from "react"
import createGlobe from "cobe"

interface LiveLocation {
  location: [number, number]
  baseViewers: number
}

const liveLocations: LiveLocation[] = [
  { location: [51.51, -0.13], baseViewers: 2845 },    // London
  { location: [40.71, -74.01], baseViewers: 1570 },    // New York
  { location: [34.05, -118.24], baseViewers: 3210 },   // Los Angeles
  { location: [35.68, 139.69], baseViewers: 1008 },    // Tokyo
  { location: [-33.87, 151.21], baseViewers: 1111 },   // Sydney
  { location: [48.86, 2.35], baseViewers: 890 },       // Paris
]

function latLngTo2D(
  lat: number,
  lng: number,
  phi: number,
  theta: number,
  size: number
): { x: number; y: number; visible: boolean } {
  const latRad = (lat * Math.PI) / 180
  const lngRad = (lng * Math.PI) / 180

  const x3d = Math.cos(latRad) * Math.sin(lngRad + phi)
  const y3d = -Math.sin(latRad) * Math.cos(theta) + Math.cos(latRad) * Math.sin(theta) * Math.cos(lngRad + phi)
  const z3d = Math.sin(latRad) * Math.sin(theta) + Math.cos(latRad) * Math.cos(theta) * Math.cos(lngRad + phi)

  const r = size / 2
  return {
    x: r + x3d * r,
    y: r - y3d * r,
    visible: z3d > 0.2,
  }
}

export function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const phiRef = useRef(0)
  const labelElsRef = useRef<(HTMLDivElement | null)[]>([])
  const [viewers, setViewers] = useState(() => liveLocations.map((l) => l.baseViewers))

  // Randomize viewer counts
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) =>
        prev.map((v) => Math.max(100, v + Math.floor(Math.random() * 61) - 30))
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Globe + label animation
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = canvas.offsetWidth

    if (width === 0) return

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi: 0,
      theta: 0.15,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 40000,
      mapBrightness: 1.8,
      baseColor: [1, 1, 1],
      markerColor: [0.9, 0.15, 0.15],
      glowColor: [0.9, 0.9, 0.9],
      markers: liveLocations.map((m) => ({
        location: m.location,
        size: 0.06,
      })),
      onRender: (state: Record<string, number>) => {
        phiRef.current += 0.004
        state.phi = phiRef.current
        state.theta = 0.15
        state.width = width * dpr
        state.height = width * dpr
      },
    })

    setTimeout(() => {
      if (canvas) canvas.style.opacity = "1"
    }, 100)

    // Separate animation loop for HTML labels
    let labelRaf: number
    function updateLabels() {
      const size = canvas.offsetWidth
      liveLocations.forEach((loc, i) => {
        const el = labelElsRef.current[i]
        if (!el) return
        const pos = latLngTo2D(loc.location[0], loc.location[1], phiRef.current, 0.15, size)
        el.style.left = `${pos.x}px`
        el.style.top = `${pos.y}px`
        el.style.opacity = pos.visible ? "1" : "0"
      })
      labelRaf = requestAnimationFrame(updateLabels)
    }
    labelRaf = requestAnimationFrame(updateLabels)

    return () => {
      globe.destroy()
      cancelAnimationFrame(labelRaf)
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative aspect-square select-none overflow-visible ${className}`}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0,
          transition: "opacity 1s ease",
          touchAction: "none",
        }}
      />
      {liveLocations.map((_, i) => (
        <div
          key={i}
          ref={(el) => { labelElsRef.current[i] = el }}
          className="absolute pointer-events-none"
          style={{ opacity: 0, transform: "translate(-50%, -100%) translateY(-10px)", transition: "opacity 0.4s ease" }}
        >
          {/* Red dot */}
          <div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[calc(100%+6px)] w-2 h-2 rounded-full bg-red-500"
            style={{ boxShadow: "0 0 8px rgba(239,68,68,0.7)" }}
          />
          {/* LIVE badge */}
          <div className="flex items-center bg-black/85 backdrop-blur-sm rounded-md px-2.5 py-1.5 gap-2 border border-white/10 whitespace-nowrap shadow-lg">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-500 text-[10px] font-bold tracking-wider uppercase">Live</span>
            </div>
            <div className="w-px h-3 bg-white/20" />
            <span className="text-white/90 text-[10px] font-medium tabular-nums viewer-count" data-index={i}>
              {viewers[i].toLocaleString()} watching
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
