import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personal } from '@/data'

/* davidhaz.com About section:
   - Dark section, full-width
   - Left: very large display name initials / monogram in gradient
   - Right: bio text with word-by-word blur-in, location chip, availability badge, CTA */

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const words = personal.bio.split(' ')

  return (
    <section id="about" style={{
      padding: 'clamp(5rem, 10vh, 8rem) clamp(20px, 3.5vw, 48px)',
    }}>
      <p style={{
        fontSize: '0.72rem', fontWeight: 700,
        letterSpacing: '0.13em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
        marginBottom: '4rem',
      }}>
        About
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(2.5rem, 6vw, 6rem)',
        alignItems: 'center',
      }}>
        {/* Left: big monogram card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            borderRadius: 28,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
            minHeight: 380,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            padding: '3rem 2rem',
            overflow: 'hidden',
          }}
        >
          {/* Ambient glow rings */}
          <div style={{
            position: 'absolute',
            width: 320, height: 320,
            borderRadius: '50%',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)',
            animation: 'ringPulse 5s ease-in-out infinite',
            pointerEvents: 'none',
          }} />

          {/* Initials */}
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(5rem, 12vw, 9rem)',
            fontWeight: 900,
            letterSpacing: '-0.06em',
            lineHeight: 0.9,
            background: 'linear-gradient(135deg, #7DF9FF 0%, #4B0EAF 60%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative',
            zIndex: 2,
          }}>
            {personal.initials}
          </span>

          {/* Info chips */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 2 }}>
            <span style={{
              padding: '0.35rem 1.1rem',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.5)',
            }}>
              {personal.location}
            </span>
            <span style={{
              padding: '0.35rem 1.1rem',
              borderRadius: 999,
              border: '1px solid rgba(125,249,255,0.35)',
              background: 'rgba(125,249,255,0.07)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#7DF9FF',
            }}>
              {personal.availability}
            </span>
          </div>
        </motion.div>

        {/* Right: Bio + CTA */}
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            lineHeight: 1.82,
            color: 'rgba(255,255,255,0.82)',
            margin: 0,
          }}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline' }}
                initial={{ opacity: 0.1, filter: 'blur(4px)' }}
                animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{ delay: 0.015 * i, duration: 0.45, ease: 'easeOut' }}
              >
                {word}{' '}
              </motion.span>
            ))}
          </p>

          <motion.a
            href={`mailto:${personal.email}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.9rem 1.9rem',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600,
              textDecoration: 'none',
              width: 'fit-content',
              transition: 'all 0.25s',
            }}
            whileHover={{
              background: 'rgba(255,255,255,0.09)',
              borderColor: 'rgba(255,255,255,0.24)',
              y: -2,
              boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
            }}
          >
            <span style={{ color: '#7DF9FF', fontSize: '0.65rem' }}>✦</span>
            Get in touch
            <span style={{ color: '#7DF9FF', fontSize: '0.65rem' }}>✦</span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
