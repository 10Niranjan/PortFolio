import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personal } from '@/data'
import SpotifyPlayer from './SpotifyPlayer'

/* davidhaz.com About section:
   - Dark section, full-width
   - Left: very large display name initials / monogram in gradient
   - Right: bio text with word-by-word blur-in, location chip, availability badge, CTA */

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const wordsRaw = personal.bio.split(' ')
  let isBold = false
  const words = wordsRaw.map(word => {
    let currentBold = isBold
    let cleanWord = word
    if (cleanWord.startsWith('**')) {
      currentBold = true
      isBold = true
      cleanWord = cleanWord.substring(2)
    }
    if (cleanWord.endsWith('**')) {
      cleanWord = cleanWord.substring(0, cleanWord.length - 2)
      currentBold = true
      isBold = false
    }
    return { text: cleanWord, bold: currentBold }
  })
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
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)',
        gap: 'clamp(2.5rem, 6vw, 6rem)',
        alignItems: 'center',
      }}>
        {/* Left: Portrait photo card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            borderRadius: 28,
            border: '1px solid rgba(255,255,255,0.10)',
            overflow: 'hidden',
            aspectRatio: '3 / 4',
            width: '100%',
            maxWidth: 420,
            margin: '0 auto',
            boxShadow: '0 0 60px rgba(124,58,237,0.18), 0 24px 64px rgba(0,0,0,0.55)',
          }}
        >
          {/* Photo fills card completely */}
          <img
            src={`${import.meta.env.BASE_URL}niranjan_original.jpg`}
            alt={personal.name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
          />

          {/* Subtle purple tint overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, rgba(124,58,237,0.08) 0%, transparent 50%)',
            pointerEvents: 'none',
          }} />



        </motion.div>

        {/* Right: Bio + CTA */}
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            lineHeight: 1.82,
            color: 'rgba(255,255,255,0.82)',
            margin: 0,
          }}>
            {words.map((w, i) => (
              <motion.span
                key={i}
                style={{ 
                  display: 'inline',
                  fontWeight: w.bold ? 700 : 400,
                  color: w.bold ? '#fff' : 'rgba(255,255,255,0.75)',
                  letterSpacing: '-0.01em',
                }}
                initial={{ opacity: 0.1, filter: 'blur(4px)' }}
                animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{ delay: 0.015 * i, duration: 0.45, ease: 'easeOut' }}
              >
                {w.text}{' '}
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
              gap: '1rem',
              padding: '0.85rem 2.2rem',
              borderRadius: 999,
              border: '1.5px solid #fff',
              background: 'transparent',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 500,
              textDecoration: 'none',
              width: 'fit-content',
              transition: 'all 0.25s',
              fontFamily: 'inherit',
            }}
            whileHover={{
              background: 'rgba(255,255,255,0.1)',
              y: -2,
              boxShadow: '0 8px 24px rgba(255,255,255,0.15)',
            }}
          >
            <span style={{ color: '#fff', fontSize: '0.8rem' }}>✦</span>
            Get in touch
            <span style={{ color: '#fff', fontSize: '0.8rem' }}>✦</span>
          </motion.a>

          <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-start' }}>
            <SpotifyPlayer />
          </div>
        </div>
      </div>
    </section>
  )
}
