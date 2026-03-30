import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

interface GlobeProps {
  className?: string
  speed?: number
}

const markers = [
  { location: [51.51, -0.13] as [number, number] },   // London
  { location: [40.71, -74.01] as [number, number] },   // New York
  { location: [34.05, -118.24] as [number, number] },  // Los Angeles
  { location: [35.68, 139.69] as [number, number] },   // Tokyo
  { location: [-33.87, 151.21] as [number, number] },  // Sydney
  { location: [1.35, 103.82] as [number, number] },    // Singapore
  { location: [25.2, 55.27] as [number, number] },     // Dubai
  { location: [-23.55, -46.63] as [number, number] },  // Sao Paulo
  { location: [48.86, 2.35] as [number, number] },     // Paris
  { location: [37.57, 126.98] as [number, number] },   // Seoul
]

const arcs = [
  { from: [51.51, -0.13] as [number, number], to: [40.71, -74.01] as [number, number] },
  { from: [34.05, -118.24] as [number, number], to: [35.68, 139.69] as [number, number] },
  { from: [51.51, -0.13] as [number, number], to: [25.2, 55.27] as [number, number] },
  { from: [40.71, -74.01] as [number, number], to: [-23.55, -46.63] as [number, number] },
  { from: [35.68, 139.69] as [number, number], to: [-33.87, 151.21] as [number, number] },
  { from: [48.86, 2.35] as [number, number], to: [1.35, 103.82] as [number, number] },
  { from: [51.51, -0.13] as [number, number], to: [37.57, 126.98] as [number, number] },
  { from: [34.05, -118.24] as [number, number], to: [48.86, 2.35] as [number, number] },
]

export function Globe({ className = "", speed = 0.002 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      let phi = 0

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.15,
        dark: 1,
        diffuse: 2,
        mapSamples: 20000,
        mapBrightness: 8,
        baseColor: [0.08, 0.08, 0.12],
        markerColor: [0.14, 0.45, 0.86],
        glowColor: [0.05, 0.1, 0.2],
        markerElevation: 0.02,
        markers: markers.map((m) => ({ location: m.location, size: 0.03 })),
        // @ts-expect-error cobe supports arcs
        arcs: arcs.map((a) => ({ from: a.from, to: a.to })),
        arcColor: [0.14, 0.45, 0.86],
        arcWidth: 0.4,
        arcHeight: 0.3,
        opacity: 0.85,
        onRender: (state: Record<string, number>) => {
          if (!isPausedRef.current) phi += speed
          state.phi = phi + phiOffsetRef.current + dragOffset.current.phi
          state.theta = 0.15 + thetaOffsetRef.current + dragOffset.current.theta
        },
      })

      setTimeout(() => {
        if (canvas) canvas.style.opacity = "1"
      })
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [speed])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          touchAction: "none",
        }}
      />
    </div>
  )
}
