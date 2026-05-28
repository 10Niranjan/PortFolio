import { useEffect, useRef } from 'react'

// Fluid animated gradient background using HTML5 Canvas
// Each "blob" is a soft radial gradient that drifts around the canvas
export default function FluidBackground() {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let width, height

    // Blob configuration
    const blobs = [
      { x: 0.2, y: 0.3, vx: 0.0003, vy: 0.0002, r: 0.4, color: 'rgba(124, 58, 237, 0.5)' },  // purple
      { x: 0.7, y: 0.2, vx: -0.0002, vy: 0.0003, r: 0.35, color: 'rgba(200, 245, 66, 0.35)' }, // lime
      { x: 0.5, y: 0.7, vx: 0.0002, vy: -0.0002, r: 0.38, color: 'rgba(59, 130, 246, 0.3)' },  // blue
      { x: 0.85, y: 0.6, vx: -0.0003, vy: -0.0002, r: 0.3, color: 'rgba(236, 72, 153, 0.25)' }, // pink
    ]

    const resize = () => {
      width  = canvas.width  = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-bg').trim() || '#080808'
      ctx.fillRect(0, 0, width, height)

      blobs.forEach(blob => {
        // Drift
        blob.x += blob.vx
        blob.y += blob.vy

        // Bounce
        if (blob.x < -0.1 || blob.x > 1.1) blob.vx *= -1
        if (blob.y < -0.1 || blob.y > 1.1) blob.vy *= -1

        const cx = blob.x * width
        const cy = blob.y * height
        const r  = blob.r * Math.max(width, height)

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        grad.addColorStop(0,   blob.color)
        grad.addColorStop(1,   'rgba(0,0,0,0)')

        ctx.globalCompositeOperation = 'lighter'
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalCompositeOperation = 'source-over'
      animRef.current = requestAnimationFrame(draw)
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animRef.current)
      } else {
        animRef.current = requestAnimationFrame(draw)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibility)
    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
