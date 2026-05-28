import { motion } from 'framer-motion'
import { personal } from '@/data'
import Grainient from '../canvas/Grainient'

/* davidhaz.com Contact section:
   - Full-height panel with Grainient background (blue/purple tones)
   - Massive centered heading
   - Email CTA button + plain text fallback */

export default function Contact() {
  return (
    <section id="contact" style={{
      position: 'relative',
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      overflow: 'hidden',
      padding: 'clamp(5rem, 10vh, 8rem) clamp(20px, 3.5vw, 48px)',
      borderRadius: '32px 32px 0 0',
    }}>
      {/* Grainient background */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: '32px 32px 0 0',
        overflow: 'hidden',
      }}>
        <Grainient
          color1="#3B28B8"
          color2="#7DF9FF"
          color3="#0B1A3F"
          warpStrength={0.85}
          warpFrequency={3.5}
          warpSpeed={1.2}
          warpAmplitude={60}
          blendAngle={-20}
          blendSoftness={0.18}
          rotationAmount={300}
          noiseScale={1.5}
          grainAmount={0.07}
          grainScale={1.8}
          grainAnimated={true}
          timeSpeed={0.16}
          contrast={1.4}
          gamma={1.05}
          saturation={0.95}
          zoom={0.85}
          centerX={0.0}
          centerY={0.05}
        />
      </div>

      {/* Dark overlay for text legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.35)',
        borderRadius: '32px 32px 0 0',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '2.5rem',
          maxWidth: 780,
        }}
      >
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.02,
          color: '#fff',
          margin: 0,
        }}>
          Wanna build{' '}
          <br />
          something{' '}
          <span style={{
            background: 'linear-gradient(135deg, #7DF9FF 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            awesome
          </span>
          <br />
          together?
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <motion.a
            href={`mailto:${personal.email}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.7rem',
              padding: '1rem 2.5rem',
              borderRadius: 999,
              border: '1.5px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
            whileHover={{
              background: 'rgba(255,255,255,0.16)',
              borderColor: 'rgba(255,255,255,0.35)',
              y: -3,
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            }}
            transition={{ duration: 0.2 }}
          >
            <span style={{ color: '#7DF9FF', fontSize: '0.7rem' }}>✦</span>
            Let&apos;s talk
            <span style={{ color: '#7DF9FF', fontSize: '0.7rem' }}>✦</span>
          </motion.a>

          <p style={{
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.45)',
            margin: 0,
          }}>
            Don&apos;t like flashy buttons? Reach out at{' '}
            <a
              href={`mailto:${personal.email}`}
              style={{
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              {personal.email}
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  )
}
