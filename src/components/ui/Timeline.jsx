import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATUS_COLOR = {
  'In Progress': '#38bdf8',
  'Live': '#34d399',
  'Completed': '#a3a3a3',
  'Certified': '#f59e0b',
  'Ongoing': '#a855f7',
}

export default function Timeline({ items }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, i) => {
        const color = STATUS_COLOR[item.status] || 'var(--color-muted)'
        const isLast = i === items.length - 1
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '20px 1fr',
              gap: '1rem',
              paddingBottom: isLast ? 0 : '1.5rem',
            }}
          >
            {/* Dot + connecting line */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <span style={{
                width: 9, height: 9, borderRadius: '50%',
                background: color,
                marginTop: 4, flexShrink: 0, position: 'relative', zIndex: 1,
              }} />
              {!isLast && (
                <span style={{
                  position: 'absolute', top: 13, bottom: '-24px', left: '50%',
                  width: 1, background: 'var(--color-border)', transform: 'translateX(-50%)',
                }} />
              )}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <h4 style={{
                  margin: 0,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                }}>
                  {item.title}
                </h4>
                <span style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color,
                  background: `color-mix(in srgb, ${color} 12%, transparent)`,
                  padding: '0.15rem 0.5rem',
                  borderRadius: 6,
                  border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
                }}>
                  {item.status}
                </span>
              </div>
              <p style={{
                margin: '0.3rem 0 0',
                fontSize: '0.88rem',
                color: 'var(--color-muted)',
                lineHeight: 1.5,
              }}>
                {item.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
