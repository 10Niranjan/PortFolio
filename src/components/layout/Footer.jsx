import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personal } from '@/data'

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <footer
      ref={ref}
      className="section-wrapper border-t"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="section-container flex items-center justify-center">
        <motion.a
          href={personal.portfolioRepo}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            textDecoration: 'none',
            paddingBottom: '6px',
            overflow: 'visible',
          }}
          whileHover={{ color: 'var(--color-text)' }}
        >
          {/* GitHub SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>

          {/* Letter-by-letter text */}
          {'View source on GitHub'.split('').map((char, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 + i * 0.03,
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
            </motion.span>
          ))}

          {/* Shimmer sweep */}
          <motion.span
            aria-hidden
            style={{
              position: 'absolute',
              top: 0, left: 0, bottom: 0,
              width: '35%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(125,249,255,0.5) 50%, transparent 100%)',
              pointerEvents: 'none',
              borderRadius: 2,
            }}
            initial={{ x: '-100%', opacity: 0 }}
            animate={inView ? { x: '320%', opacity: [0, 1, 1, 0] } : {}}
            transition={{ delay: 0.85, duration: 0.65, ease: 'easeInOut' }}
          />

          {/* Glowing underline */}
          <motion.span
            aria-hidden
            style={{
              position: 'absolute',
              bottom: 0, left: 0,
              height: 1,
              background: 'linear-gradient(90deg, rgba(125,249,255,0.7) 0%, rgba(168,85,247,0.5) 100%)',
              borderRadius: 1,
            }}
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ delay: 0.8, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Pulse glow */}
          <motion.span
            aria-hidden
            style={{
              position: 'absolute',
              bottom: -3, left: '10%', right: '10%',
              height: 8,
              background: 'radial-gradient(ellipse at center, rgba(125,249,255,0.3) 0%, transparent 70%)',
              filter: 'blur(4px)',
              pointerEvents: 'none',
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: [0, 1, 0.6, 1, 0.6], scaleX: 1 } : {}}
            transition={{
              delay: 1.1,
              scaleX: { duration: 0.4 },
              opacity: { repeat: Infinity, repeatType: 'mirror', duration: 2.5, delay: 1.2 },
            }}
          />
        </motion.a>
      </div>
    </footer>
  )
}
