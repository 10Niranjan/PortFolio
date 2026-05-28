import { useState } from 'react'
import { motion } from 'framer-motion'
import { skills } from '@/data'

/* davidhaz.com Skills section:
   - Horizontal accordion rows with large typography
   - Center panel expands on hover to show tech pills with skill color glow
   - Very tight, typographic, minimal aesthetic */

export default function Skills() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="skills" style={{
      padding: 'clamp(5rem, 10vh, 8rem) clamp(20px, 3.5vw, 48px)',
    }}>
      <p style={{
        fontSize: '0.72rem', fontWeight: 700,
        letterSpacing: '0.13em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
        marginBottom: '3.5rem',
      }}>
        Skills &amp; Expertise
      </p>

      <div>
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: '2rem',
              padding: hovered === i ? '2.25rem 0' : '1.75rem 0',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              cursor: 'default',
              transition: 'padding 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* Left label */}
            <motion.p
              animate={{ color: hovered === i ? '#7DF9FF' : '#fff' }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                margin: 0,
                userSelect: 'none',
              }}
            >
              {skill.label1}
            </motion.p>

            {/* Center expanding chip panel */}
            <div style={{
              minWidth: hovered === i ? 260 : 80,
              minHeight: hovered === i ? 90 : 50,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.3rem',
              padding: hovered === i ? '0.75rem' : '0.4rem',
              background: hovered === i
                ? `linear-gradient(135deg, ${skill.color} 0%, rgba(0,0,0,0.5) 120%)`
                : 'rgba(255,255,255,0.04)',
              boxShadow: hovered === i ? `0 0 60px ${skill.color}55` : 'none',
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              overflow: 'hidden',
            }}>
              {hovered === i
                ? skill.items.map((item, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: j * 0.04, duration: 0.28 }}
                      style={{
                        padding: '0.2rem 0.65rem',
                        borderRadius: 999,
                        background: 'rgba(255,255,255,0.15)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        color: '#fff',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item}
                    </motion.span>
                  ))
                : <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: skill.color,
                    display: 'block',
                    boxShadow: `0 0 8px ${skill.color}`,
                  }} />
              }
            </div>

            {/* Right label */}
            <motion.p
              animate={{ color: hovered === i ? '#7DF9FF' : '#fff' }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                textAlign: 'right',
                margin: 0,
                userSelect: 'none',
              }}
            >
              {skill.label2}
            </motion.p>
          </motion.div>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
      </div>
    </section>
  )
}
