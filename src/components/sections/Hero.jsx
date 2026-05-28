import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { stats, projects, personal } from '@/data'
import BlurText from '../react-bits/BlurText'
import Grainient from '../canvas/Grainient'

/* ─── Auto-rotating slot ─── */
function Rotator({ items, ms = 2800, children }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % items.length), ms)
    return () => clearInterval(t)
  }, [items.length, ms, i])
  return children(items[i], i, setI, items)
}

/* ─── Project icon SVGs ─── */
const ProjectIcon = ({ index }) => {
  const icons = [
    <svg key={0} width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <filter id="gem-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="gem-g" x1="28" y1="8" x2="28" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7DF9FF"/>
          <stop offset="100%" stopColor="#a855f7"/>
        </linearGradient>
      </defs>
      <g filter="url(#gem-glow)">
        <path d="M28 10 L38 20 L28 46 L18 20 Z" fill="url(#gem-g)" opacity="0.9"/>
        <path d="M28 10 L28 46" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round"/>
        <path d="M18 20 L38 20" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round"/>
        <path d="M28 10 L18 20 L28 46 L38 20 L28 10" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" strokeLinejoin="round"/>
      </g>
    </svg>,
    <svg key={1} width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <filter id="campus-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="campus-g" x1="12" y1="12" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399"/>
          <stop offset="100%" stopColor="#059669"/>
        </linearGradient>
      </defs>
      <g filter="url(#campus-glow)">
        <path d="M28 14 L44 22 L28 30 L12 22 Z" fill="url(#campus-g)" opacity="0.9"/>
        <path d="M18 25.5 V33 C18 37 28 40 28 40 C28 40 38 37 38 33 V25.5" stroke="url(#campus-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="28" cy="22" r="3" fill="#ffffff"/>
        <circle cx="12" cy="22" r="3" fill="#34D399"/>
        <circle cx="44" cy="22" r="3" fill="#34D399"/>
        <path d="M28 40 V46" stroke="#34D399" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="28" cy="46" r="3.5" fill="#34D399"/>
      </g>
    </svg>,
    <svg key={2} width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="22" fill="#1a1a2e" opacity="0.95"/>
      <path d="M28 14c-7.732 0-14 6.268-14 14 0 6.186 4.014 11.426 9.572 13.282.7.13.956-.304.956-.674 0-.332-.012-1.212-.018-2.38-3.894.846-4.716-1.878-4.716-1.878-.636-1.616-1.554-2.046-1.554-2.046-1.27-.87.096-.852.096-.852 1.404.098 2.144 1.442 2.144 1.442 1.248 2.14 3.274 1.522 4.072 1.164.126-.904.488-1.522.888-1.872-3.11-.354-6.378-1.556-6.378-6.926 0-1.53.546-2.78 1.442-3.762-.144-.354-.624-1.78.138-3.71 0 0 1.176-.376 3.852 1.436A13.41 13.41 0 0128 22.47c1.19.006 2.388.162 3.508.472 2.674-1.812 3.848-1.436 3.848-1.436.764 1.93.284 3.356.14 3.71.898.982 1.44 2.232 1.44 3.762 0 5.384-3.274 6.568-6.392 6.914.502.434.952 1.286.952 2.594 0 1.874-.016 3.382-.016 3.844 0 .372.254.81.964.672C37.99 39.42 42 34.182 42 28c0-7.732-6.268-14-14-14z" fill="white" opacity="0.85"/>
    </svg>
  ]
  return (
    <div style={{ filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.6))' }}>
      {icons[index % icons.length]}
    </div>
  )
}

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
                <BlurText text={personal.tagline} delay={80} animateBy="words" direction="top" />
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

          {/* ── RIGHT: Stats circle + Purple project card ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              justifyContent: 'space-between',
            }}
          >
            {/* ── Stats circle ── */}
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: isMobile ? 0 : 20 }}>
              <Rotator items={stats} ms={2800}>
                {(stat, idx, setIdx, all) => (
                  <div style={{
                    width: 250, height: 250,
                    borderRadius: '50%',
                    border: '4px solid rgba(255,255,255,0.18)',
                    background: '#000',
                    position: 'relative',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          position: 'absolute', inset: 0,
                          display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center',
                          textAlign: 'center', padding: 28,
                        }}
                      >
                        <span style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 'clamp(44px, 5.5vw, 64px)',
                          fontWeight: 800,
                          letterSpacing: '-0.04em',
                          color: '#fff',
                          lineHeight: 1,
                          marginBottom: 10,
                        }}>{stat.value}</span>
                        <span style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          color: 'rgba(255,255,255,0.45)',
                          fontWeight: 500,
                          letterSpacing: '0.04em',
                          lineHeight: 1.4,
                          maxWidth: 140,
                        }}>{stat.label}</span>
                      </motion.div>
                    </AnimatePresence>
                    {/* Dot indicators */}
                    <div style={{
                      position: 'absolute', bottom: 24, left: 0, right: 0,
                      display: 'flex', gap: 6, justifyContent: 'center', zIndex: 3,
                    }}>
                      {all.map((_, j) => (
                        <button key={j} onClick={() => setIdx(j)} style={{
                          width: 6, height: 6, borderRadius: '50%',
                          border: 'none', padding: 0, cursor: 'pointer',
                          background: '#fff',
                          opacity: j === idx ? 1 : 0.2,
                          transition: 'opacity 0.3s',
                        }} />
                      ))}
                    </div>
                  </div>
                )}
              </Rotator>
            </div>

            {/* ── Purple projects card ── */}
            <Rotator items={projects} ms={4200}>
              {(proj, idx, setIdx, all) => (
                <div style={{
                  flex: 1,
                  borderRadius: 24,
                  background: 'linear-gradient(155deg, #5B3FE4 0%, #4A32CC 45%, #3D2AB5 100%)',
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 290,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 16px 48px -12px rgba(75,50,204,0.4)',
                }}>
                  <a
                    href={proj.link || proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      textDecoration: 'none',
                      color: 'inherit',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Inner dark card with icon */}
                    <div style={{
                      borderRadius: 16,
                      background: '#08081a',
                      padding: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 130,
                      marginBottom: 20,
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'radial-gradient(ellipse at 50% 55%, rgba(168,85,247,0.15) 0%, transparent 65%)',
                        pointerEvents: 'none',
                      }} />
                      {proj.inDevelopment && (
                        <div style={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          color: '#38bdf8',
                          background: 'rgba(56, 189, 248, 0.1)',
                          padding: '0.15rem 0.4rem',
                          borderRadius: 4,
                          border: '1px solid rgba(56, 189, 248, 0.25)',
                          zIndex: 3,
                        }}>
                          In Development
                        </div>
                      )}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.4 }}
                          style={{ position: 'relative', zIndex: 2 }}
                        >
                          <ProjectIcon index={idx} />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Description text */}
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                        style={{
                          color: '#fff',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 'clamp(15px, 1.8vw, 19px)',
                          fontWeight: 500,
                          lineHeight: 1.35,
                          letterSpacing: '-0.02em',
                          flex: 1,
                          margin: '0 0 20px 0',
                          paddingRight: 48,
                        }}
                      >
                        {proj.isGithub ? 'See more projects & open source on GitHub.' : proj.description.split('.')[0] + '.'}
                      </motion.p>
                    </AnimatePresence>

                    {/* Bottom: dash indicators */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingBottom: 8 }}>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        {all.map((_, j) => (
                          <button key={j} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIdx(j); }} style={{
                            height: 3, borderRadius: 2,
                            width: j === idx ? 24 : 8,
                            border: 'none', padding: 0, cursor: 'pointer',
                            background: '#fff',
                            opacity: j === idx ? 1 : 0.28,
                            transition: 'all 0.3s',
                          }} />
                        ))}
                      </div>
                    </div>
                  </a>

                  {/* The Black Cutout Overlay + Arrow Button */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0, right: 0,
                    width: 68, height: 68,
                    background: '#000',
                    borderTopLeftRadius: 24,
                    zIndex: 10,
                  }}>
                    {/* Top inverse corner */}
                    <div style={{
                      position: 'absolute',
                      top: -24, right: 0,
                      width: 24, height: 24,
                      background: 'transparent',
                      borderBottomRightRadius: 24,
                      boxShadow: '12px 12px 0 12px #000',
                    }} />
                    {/* Left inverse corner */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0, left: -24,
                      width: 24, height: 24,
                      background: 'transparent',
                      borderBottomRightRadius: 24,
                      boxShadow: '12px 12px 0 12px #000',
                    }} />

                    <button
                      onClick={() => setIdx((idx + 1) % all.length)}
                      style={{
                        position: 'absolute',
                        bottom: 12, right: 12,
                        width: 44, height: 44, borderRadius: '50%',
                        background: '#000',
                        border: '1px solid rgba(255,255,255,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'rgba(255,255,255,0.8)',
                        transition: 'all 0.25s',
                        padding: 0,
                      }}
                      aria-label="Next project"
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#fff'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </Rotator>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
