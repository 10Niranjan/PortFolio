import { useEffect, useRef } from 'react'

const VISIBLE_COUNT = 4 // roughly this many items are spread across the card height at once
const REPEATS = 4       // duplicate the base list this many times for a seamless loop buffer

/**
 * Full-height vertical "curved loop": text items drift continuously top → bottom
 * across the entire card, centered item reads brightest/largest, items fade + blur
 * + bow outward toward the top/bottom edges (the "ribbon" look).
 *
 * Positions are driven by a single requestAnimationFrame loop that writes
 * transform/opacity/filter directly onto each item's DOM node — no React state,
 * so the component never re-renders after mount. Spacing and fade distance are
 * derived from the measured container height so items span the full card on any
 * screen size instead of a fixed pixel band.
 */
export default function CurvedLoop({ items, speed = 72 }) {
  const containerRef = useRef(null)
  const itemRefs = useRef([])
  const offsetRef = useRef(0)
  const loopItems = useRef(Array.from({ length: items.length * REPEATS }, (_, i) => items[i % items.length])).current

  useEffect(() => {
    let raf
    let last = performance.now()

    const tick = now => {
      const dt = Math.min((now - last) / 1000, 0.05) // clamp so a backgrounded tab can't cause a jump on resume
      last = now

      const containerHeight = containerRef.current?.clientHeight || 0
      if (containerHeight > 0) {
        const step = containerHeight / VISIBLE_COUNT
        const cycle = items.length * step
        const center = containerHeight / 2
        const maxDist = containerHeight / 2

        // Adding makes y = i*step - offset shrink over time, i.e. items drift
        // upward — bottom → top, as required.
        offsetRef.current += speed * dt
        if (offsetRef.current >= cycle) offsetRef.current -= cycle
        const offset = offsetRef.current

        for (let i = 0; i < loopItems.length; i++) {
          const el = itemRefs.current[i]
          if (!el) continue
          const y = i * step - offset
          const absDist = Math.min(Math.abs(y - center), maxDist)
          const t = absDist / maxDist
          const opacity = 1 - t * 0.95
          const scale = 1.08 - t * 0.4
          const blur = t * 3.5
          el.style.transform = `translate3d(-50%, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`
          el.style.opacity = opacity.toFixed(3)
          el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'
        }
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [items.length, speed, loopItems])

  return (
    <div
      ref={containerRef}
      className="curved-loop"
    >
      <style>{`
        .curved-loop {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%);
        }
        .curved-loop-item {
          position: absolute;
          top: 0;
          left: 50%;
          max-width: 92%;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          pointer-events: none;
          will-change: transform, opacity, filter;
        }
      `}</style>
      {loopItems.map((label, i) => (
        <span key={i} ref={el => (itemRefs.current[i] = el)} className="curved-loop-item">
          {label}
        </span>
      ))}
    </div>
  )
}
