import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '@/data'

/* davidhaz.com Work section: 
   - "Selected Work" eyebrow label
   - Full-width horizontal project rows with large number index, title, tags, arrow 
   - Hover reveals subtle teal/lime accent underline + row lifts */

function ProjectRow({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.a
      ref={ref}
      href={project.link || project.github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '3.5rem 1fr auto',
        alignItems: 'center',
        gap: '2rem',
        padding: '2rem 0',
        borderTop: '1px solid var(--color-border)',
        textDecoration: 'none',
        color: 'var(--color-text)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'opacity 0.25s',
      }}
      whileHover={{ opacity: 0.75 }}
    >
      {/* Index number */}
      <span style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.8rem',
        fontWeight: 500,
        color: 'var(--color-muted)',
        letterSpacing: '0.04em',
        flexShrink: 0,
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Title + tags */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--color-text)',
            margin: 0,
          }}>
            {project.title}
          </h2>
          {project.inDevelopment && (
            <span style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#38bdf8',
              background: 'rgba(56, 189, 248, 0.1)',
              padding: '0.2rem 0.5rem',
              borderRadius: 6,
              border: '1px solid rgba(56, 189, 248, 0.25)',
              display: 'inline-flex',
              alignItems: 'center',
              height: 'fit-content',
            }}>
              In Development
            </span>
          )}
        </div>
        {project.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                background: 'var(--glass-bg)',
                padding: '0.2rem 0.6rem',
                borderRadius: 999,
                border: '1px solid var(--glass-border)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}
        {project.isGithub && (
          <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', margin: 0 }}>
            {project.description}
          </p>
        )}
      </div>

      {/* Arrow */}
      <div style={{
        width: 44, height: 44,
        borderRadius: '50%',
        border: '1.5px solid var(--glass-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        color: 'var(--color-muted)',
        transition: 'all 0.25s',
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3.5 14.5L14.5 3.5M14.5 3.5H6.5M14.5 3.5v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Hover border-bottom accent line */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 1,
          background: 'linear-gradient(90deg, rgba(125,249,255,0.6) 0%, rgba(75,14,175,0.4) 100%)',
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35 }}
      />
    </motion.a>
  )
}

export default function Work() {
  return (
    <section id="work" style={{
      padding: 'clamp(5rem, 10vh, 8rem) clamp(20px, 3.5vw, 48px)',
    }}>
      <p style={{
        fontSize: '0.72rem', fontWeight: 700,
        letterSpacing: '0.13em', textTransform: 'uppercase',
        color: 'var(--color-muted)',
        marginBottom: '3rem',
      }}>
        Selected Work
      </p>

      <div>
        {projects.filter(p => !p.isGithub).map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
        {/* GitHub row at the end */}
        {projects.filter(p => p.isGithub).map((project, i) => (
          <ProjectRow key={project.id} project={project} index={projects.filter(p => !p.isGithub).length + i} />
        ))}
        <div style={{ borderTop: '1px solid var(--color-border)' }} />
      </div>
    </section>
  )
}
