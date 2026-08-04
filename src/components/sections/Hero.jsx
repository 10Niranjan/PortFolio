import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { personal } from '@/data'
import BlurText from '../react-bits/BlurText'
import CurvedLoop from '../react-bits/CurvedLoop'
import Grainient from '../canvas/Grainient'

// Static — defined once outside the component so it isn't recreated on every render.
const SHOWCASE_TAGS = [
  'Software Developer',
  'Backend Developer',
  'Android Developer',
  'Flutter Developer',
  'Modern Web Solutions',
  'High-Fidelity Interfaces',
]

export default function Hero() {
  const cardRef = useRef(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const [winW, setWinW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1400)

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!cardRef.current) return
    const ro = new ResizeObserver(([e]) => {
      setDims({ w: e.contentRect.width, h: e.contentRect.height })
    })
    ro.observe(cardRef.current)
    return () => ro.disconnect()
  }, [])

  const isMobile = winW < 1024
  const r = 24  // matching davidhaz border-radius exactly
  const { w, h } = dims

  // Top-left cutout for Logo (desktop only)
  const tlW = isMobile ? 0 : 160
  const tlH = isMobile ? 0 : 88

  // Bottom-left cutout for Tagline (desktop only)
  const blW = isMobile ? 0 : w * 0.58
  const blH = isMobile ? 0 : 300

  // Complex SVG path for TWO cutouts (Top-Left and Bottom-Left)
  const pathData = (w > 0 && h > 0)
    ? isMobile
      ? `M 0,${r} A ${r},${r} 0 0,1 ${r},0 L ${w-r},0 A ${r},${r} 0 0,1 ${w},${r} L ${w},${h-r} A ${r},${r} 0 0,1 ${w-r},${h} L ${r},${h} A ${r},${r} 0 0,1 0,${h-r} Z`
      : `M ${tlW+r},0
         L ${w-r},0
         A ${r},${r} 0 0,1 ${w},${r}
         L ${w},${h-r}
         A ${r},${r} 0 0,1 ${w-r},${h}
         L ${blW+r},${h}
         A ${r},${r} 0 0,1 ${blW},${h-r}
         L ${blW},${h-blH+r}
         A ${r},${r} 0 0,0 ${blW-r},${h-blH}
         L ${r},${h-blH}
         A ${r},${r} 0 0,1 0,${h-blH-r}
         L 0,${tlH+r}
         A ${r},${r} 0 0,1 ${r},${tlH}
         L ${tlW-r},${tlH}
         A ${r},${r} 0 0,0 ${tlW},${tlH-r}
         L ${tlW},${r}
         A ${r},${r} 0 0,1 ${tlW+r},0 Z`.replace(/\s+/g, ' ')
    : ''

  return (
    <section
      id="hero"
      style={{
        background: '#000',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: isMobile ? '80px' : '0px',  // Desktop starts at absolute top
        paddingBottom: '2rem',
        overflow: 'hidden',
      }}
    >
      {/* SVG ClipPath definition */}
      {w > 0 && h > 0 && (
        <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
          <defs>
            <clipPath id="hero-cutouts">
              <path d={pathData} />
            </clipPath>
          </defs>
        </svg>
      )}

      <div style={{
        width: '100%',
        padding: '0 clamp(20px, 3.5vw, 48px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2.3fr 0.7fr',
          gap: 16,
          alignItems: 'stretch',
          minHeight: isMobile ? 'auto' : 'calc(100svh - 40px)', // space at bottom
          paddingTop: isMobile ? 0 : 16, // small shift down so it looks balanced with navbar
        }}>

          {/* ── LEFT: Grainient card with Double cutouts ── */}
          <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            minHeight: isMobile ? 420 : 0,
          }}>
            {/* The Grainient card */}
            <div
              ref={cardRef}
              style={{
                flex: 1,
                position: 'relative',
                clipPath: (w > 0 && h > 0) ? 'url(#hero-cutouts)' : 'none',
                borderRadius: (w > 0 && h > 0) ? 0 : `${r}px`,
                overflow: 'hidden',
                minHeight: isMobile ? 420 : 0,
              }}
            >
              <Grainient
                color1="#00FF87"
                color2="#7C3AED"
                color3="#00E5FF"
                warpStrength={1.4}
                warpFrequency={4.2}
                warpSpeed={1.5}
                warpAmplitude={50}
                blendAngle={25}
                blendSoftness={0.15}
                rotationAmount={360}
                noiseScale={1.6}
                grainAmount={0.06}
                grainScale={1.6}
                grainAnimated={true}
                timeSpeed={0.2}
                contrast={1.6}
                gamma={1.05}
                saturation={1.2}
                zoom={0.85}
                centerX={0.0}
                centerY={0.0}
              />

              {/* SVG border overlay — traces the exact clipped shape */}
              {w > 0 && h > 0 && (
                <svg
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    pointerEvents: 'none', zIndex: 2,
                  }}
                  viewBox={`0 0 ${w} ${h}`}
                  preserveAspectRatio="none"
                >
                  <path d={pathData} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                </svg>
              )}
            </div>

            {/* Tagline + scroll arrow — positioned precisely in the bottom-left cutout */}
            <div style={isMobile
              ? { padding: '32px 4px 8px' }
              : {
                  position: 'absolute',
                  left: 0,   // Aligns perfectly with logo due to container padding
                  bottom: 0,
                  width: `calc(${blW}px - 24px)`,
                  height: blH,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                  paddingBottom: 24,
                  zIndex: 10,
                }
            }>
              <h1 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 'clamp(32px, 8vw, 40px)' : 'clamp(36px, 3.4vw, 48px)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#fff',
                marginBottom: 32,
                margin: 0,
                paddingBottom: 32,
              }}>
                <BlurText
                  text={personal.tagline}
                  delay={30}
                  animateBy="words"
                  direction="top"
                  animationFrom={{ filter: 'blur(4px)', opacity: 0.4, y: -10 }}
                />
              </h1>

              <motion.a
                href="#work"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                whileHover={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v12M8 14l-5-5M8 14l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* ── RIGHT: Full-height curved loop showcase ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: isMobile ? 24 : 32,
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'linear-gradient(155deg, rgba(91,63,228,0.14) 0%, rgba(0,0,0,0.4) 60%)',
              minHeight: isMobile ? 320 : 0,
            }}
          >
            <CurvedLoop items={SHOWCASE_TAGS} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
