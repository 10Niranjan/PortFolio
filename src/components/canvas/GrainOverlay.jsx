import { useEffect, useRef } from 'react'

// Film grain overlay — creates a tactile, premium texture
// Renders random noise on a canvas and refreshes every few frames
export default function GrainOverlay() {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)
  const frameRef  = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let width, height

    const resize = () => {
      width  = canvas.width  = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const drawGrain = () => {
      frameRef.current++

      // Only redraw every 3 frames (perf optimization)
      if (frameRef.current % 3 === 0) {
        const imageData = ctx.createImageData(width, height)
        const data      = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const grain = Math.random() * 255
          data[i]     = grain  // R
          data[i + 1] = grain  // G
          data[i + 2] = grain  // B
          data[i + 3] = 12     // A — very subtle (0-255), ~5% opacity
        }

        ctx.putImageData(imageData, 0, 0)
      }

      animRef.current = requestAnimationFrame(drawGrain)
    }

    resize()
    window.addEventListener('resize', resize)
    animRef.current = requestAnimationFrame(drawGrain)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ mixBlendMode: 'overlay', opacity: 0.6 }}
      aria-hidden="true"
    />
  )
}
