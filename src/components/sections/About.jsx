import { motion } from 'framer-motion'
import { personal } from '@/data'
import SpotifyPlayer from './SpotifyPlayer'
import SectionLabel from '@/components/ui/SectionLabel'
import CircularText from '@/components/react-bits/CircularText'
import DecryptedText from '@/components/react-bits/DecryptedText'

/* davidhaz.com About section:
   - Dark section, full-width
   - Left: very large display name initials / monogram in gradient
   - Right: bio text with decrypt-reveal-in, location chip, availability badge, CTA */

export default function About() {
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
  // Flatten back into one string with a per-character bold mask, so the
  // decrypt effect runs as a single left-to-right pass over the whole
  // paragraph instead of restarting per word/segment.
  let bioText = ''
  const boldMask = []
  words.forEach((w, i) => {
    for (const ch of w.text) {
      bioText += ch
      boldMask.push(w.bold)
    }
    if (i < words.length - 1) {
      bioText += ' '
      boldMask.push(false)
    }
  })
  return (
    <section id="about" style={{
      padding: 'clamp(5rem, 10vh, 8rem) clamp(20px, 3.5vw, 48px)',
    }}>
      <style>{`
        @media (max-width: 700px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-avatar-badge { bottom: -14px !important; right: -14px !important; }
        }
        .bio-encrypted { color: var(--color-muted); opacity: 0.55; }
        .bio-bold { font-weight: 700; color: var(--color-text); }
        .bio-muted { font-weight: 400; color: var(--color-muted); }
      `}</style>

      <SectionLabel style={{ marginBottom: '4rem' }}>About</SectionLabel>

      <div className="about-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)',
        gap: 'clamp(2.5rem, 6vw, 6rem)',
        alignItems: 'center',
      }}>
        {/* Left: Portrait photo card */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 420, margin: '0 auto' }}>
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

        {/* Rotating availability badge — overlaps the photo card's bottom-right corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="about-avatar-badge"
          style={{
            position: 'absolute',
            bottom: -28,
            right: -28,
            width: 112,
            height: 112,
            borderRadius: '50%',
            background: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularText
            text={`${personal.availability.toUpperCase()} • PUNE, INDIA • `}
            size={100}
            fontSize={9}
            spinDuration={16}
          />
          <span style={{
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#34d399',
            boxShadow: '0 0 8px rgba(52,211,153,0.8)',
          }} />
        </motion.div>
        </div>

        {/* Right: Bio + CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            lineHeight: 1.82,
            color: 'var(--color-text)',
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            <DecryptedText
              text={bioText}
              animateOn="view"
              sequential
              speed={18}
              revealDirection="start"
              className={i => (boldMask[i] ? 'bio-bold' : 'bio-muted')}
              encryptedClassName="bio-encrypted"
            />
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
              border: '1.5px solid var(--color-text)',
              background: 'transparent',
              color: 'var(--color-text)',
              fontSize: '1rem',
              fontWeight: 500,
              textDecoration: 'none',
              width: 'fit-content',
              transition: 'all 0.25s',
              fontFamily: 'inherit',
            }}
            whileHover={{
              background: 'var(--glass-bg)',
              y: -2,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}
          >
            <span style={{ color: 'var(--color-text)', fontSize: '0.8rem' }}>✦</span>
            Get in touch
            <span style={{ color: 'var(--color-text)', fontSize: '0.8rem' }}>✦</span>
          </motion.a>

          <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-start' }}>
            <SpotifyPlayer />
          </div>
        </div>
      </div>
    </section>
  )
}
