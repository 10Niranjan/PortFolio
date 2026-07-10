import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * SectionLabel — animated eyebrow text used across all sections.
 * On scroll-into-view:
 *   1. Each letter flies in from below + fades in (staggered)
 *   2. A shimmer scan-line sweeps L→R once
 *   3. The underline glows and pulses
 */
export default function SectionLabel({ children, style = {}, align = 'left' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const letters = String(children).split('')

  return (
    <div
      ref={ref}
      style={{
        display: 'block',
        marginBottom: '3.5rem',
        textAlign: align,
        ...style,
      }}
    >
      {/* Wrapper: inline-block */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Letter-by-letter animated text */}
        <p style={{
          fontSize: 'clamp(0.85rem, 1.1vw, 1.05rem)',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-muted)',
          margin: 0,
          position: 'relative',
          display: 'inline-flex',
          gap: 0,
          overflow: 'hidden',
          fontFamily: "'Outfit', sans-serif",
        }}>
          {letters.map((char, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.035,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
            </motion.span>
          ))}

          {/* Shimmer scan line sweeping L→R */}
          <motion.span
            aria-hidden
            style={{
              position: 'absolute',
              top: 0, left: 0, bottom: 0,
              width: '40%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(125,249,255,0.65) 50%, transparent 100%)',
              pointerEvents: 'none',
              borderRadius: 2,
            }}
            initial={{ x: '-100%', opacity: 0 }}
            animate={inView ? { x: '280%', opacity: [0, 1, 1, 0] } : {}}
            transition={{
              delay: letters.length * 0.035 + 0.15,
              duration: 0.75,
              ease: 'easeInOut',
            }}
          />
        </p>
      </div>
    </div>
  )
}
