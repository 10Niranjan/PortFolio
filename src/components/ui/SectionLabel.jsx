import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * SectionLabel — animated eyebrow text used across all sections.
 * On scroll-into-view:
 *   1. Each letter flies in from below + fades in (staggered)
 *   2. A shimmer scan-line sweeps L→R once
 *   3. The underline glows and pulses
 */
export default function SectionLabel({ children, style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const letters = String(children).split('')

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', marginBottom: '3rem', ...style }}>
      {/* Letter-by-letter animated text */}
      <p style={{
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
        margin: 0,
        position: 'relative',
        display: 'inline-flex',
        gap: 0,
        overflow: 'hidden',
        paddingBottom: '6px',
      }}>
        {letters.map((char, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.04,
              duration: 0.35,
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
            background: 'linear-gradient(90deg, transparent 0%, rgba(125,249,255,0.55) 50%, transparent 100%)',
            pointerEvents: 'none',
            borderRadius: 2,
          }}
          initial={{ x: '-100%', opacity: 0 }}
          animate={inView ? { x: '280%', opacity: [0, 1, 1, 0] } : {}}
          transition={{
            delay: letters.length * 0.04 + 0.1,
            duration: 0.7,
            ease: 'easeInOut',
          }}
        />
      </p>

      {/* Glowing pulsing underline */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 1,
          background: 'linear-gradient(90deg, rgba(125,249,255,0.7) 0%, rgba(168,85,247,0.5) 100%)',
          borderRadius: 1,
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: '100%', opacity: 1 } : {}}
        transition={{
          delay: letters.length * 0.04 + 0.05,
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* Ambient glow below line */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: -3,
          left: '10%',
          right: '10%',
          height: 8,
          background: 'radial-gradient(ellipse at center, rgba(125,249,255,0.35) 0%, transparent 70%)',
          filter: 'blur(4px)',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? {
          opacity: [0, 1, 0.6, 1, 0.6],
          scaleX: 1,
        } : {}}
        transition={{
          delay: letters.length * 0.04 + 0.5,
          duration: 0.4,
          opacity: { repeat: Infinity, repeatType: 'mirror', duration: 2.5, delay: letters.length * 0.04 + 0.8 },
          scaleX: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
      />
    </div>
  )
}
