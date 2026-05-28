import { useState, useEffect } from 'react'
import { personal } from '@/data'

export default function Navbar({ onThemeToggle, theme }) {
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setHidden(y > lastScrollY && y > 100)
      setLastScrollY(y)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navLinks = [
    { label: 'Projects', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          background: scrolled ? 'rgba(0,0,0,0.6)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <nav style={{
          width: '100%',
          padding: '24px clamp(20px, 3.5vw, 48px)',
          display: 'flex',
          alignItems: 'center',
          gap: 0,
        }}>

          {/* ── Logo: D-shaped outline icon + stacked name ── */}
          <a href="#" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textDecoration: 'none',
            flexShrink: 0,
            width: 140, // Ensures predictable width for Hero cutout
          }}>
            {/* D-shaped icon */}
            <svg width="36" height="40" viewBox="0 0 38 42" fill="none">
              <path
                d="M2 2 L2 40 L24 40 Q36 40 36 28 L36 14 Q36 2 24 2 Z"
                stroke="white"
                strokeWidth="1.8"
                fill="none"
                strokeLinejoin="round"
              />
            </svg>
            {/* Name text */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.05,
            }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                fontWeight: 500,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}>Niranjan</span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                fontWeight: 500,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}>Patil</span>
            </div>
          </a>

          {/* ── Desktop nav pill ── */}
          <div className="desktop-nav-pill" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            marginLeft: 32,
            padding: '8px 12px 8px 24px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.45)',
            border: '1px solid rgba(255,255,255,0.6)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 4px 24px -4px rgba(0,0,0,0.15)',
          }}>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'rgba(15, 23, 42, 0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => e.target.style.color = '#000'}
                onMouseLeave={e => e.target.style.color = 'rgba(15, 23, 42, 0.75)'}
              >
                {link.label}
              </a>
            ))}

            {/* Theme toggle */}
            <button
              onClick={onThemeToggle}
              aria-label="Toggle theme"
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: '1px dashed rgba(15, 23, 42, 0.45)',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Sun-like dot pattern */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="2.5" fill="rgba(15, 23, 42, 0.9)" />
                <circle cx="8" cy="1.5" r="1.2" fill="rgba(15, 23, 42, 0.7)" />
                <circle cx="8" cy="14.5" r="1.2" fill="rgba(15, 23, 42, 0.7)" />
                <circle cx="1.5" cy="8" r="1.2" fill="rgba(15, 23, 42, 0.7)" />
                <circle cx="14.5" cy="8" r="1.2" fill="rgba(15, 23, 42, 0.7)" />
                <circle cx="3.5" cy="3.5" r="1" fill="rgba(15, 23, 42, 0.6)" />
                <circle cx="12.5" cy="3.5" r="1" fill="rgba(15, 23, 42, 0.6)" />
                <circle cx="3.5" cy="12.5" r="1" fill="rgba(15, 23, 42, 0.6)" />
                <circle cx="12.5" cy="12.5" r="1" fill="rgba(15, 23, 42, 0.6)" />
              </svg>
            </button>
          </div>

          <div style={{ flex: 1 }} />

          {/* ── Mobile controls ── */}
          <div className="mobile-nav-controls" style={{ display: 'none', alignItems: 'center', gap: 10 }}>
            <button
              onClick={onThemeToggle}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', padding: 0,
              }}
              aria-label="Toggle theme"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="2.5" fill="rgba(255,255,255,0.9)" />
                <circle cx="8" cy="1.5" r="1.2" fill="rgba(255,255,255,0.7)" />
                <circle cx="8" cy="14.5" r="1.2" fill="rgba(255,255,255,0.7)" />
                <circle cx="1.5" cy="8" r="1.2" fill="rgba(255,255,255,0.7)" />
                <circle cx="14.5" cy="8" r="1.2" fill="rgba(255,255,255,0.7)" />
              </svg>
            </button>
            <button
              onClick={() => setMobileOpen(o => !o)}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff', fontSize: 16, padding: 0,
              }}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>

        <style>{`
          @media (max-width: 768px) {
            .desktop-nav-pill { display: none !important; }
            .mobile-nav-controls { display: flex !important; }
          }
        `}</style>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'rgba(0,0,0,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 32,
        }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 36, fontWeight: 700, color: '#fff',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${personal.email}`}
            onClick={() => setMobileOpen(false)}
            style={{
              padding: '14px 32px', borderRadius: 999,
              background: '#7DF9FF', color: '#000',
              fontWeight: 700, fontSize: 15,
              textDecoration: 'none', marginTop: 16,
            }}
          >
            Hire Me
          </a>
        </div>
      )}
    </>
  )
}
