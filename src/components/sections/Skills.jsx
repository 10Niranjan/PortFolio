import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Skills.css'
import SectionLabel from '@/components/ui/SectionLabel'
import { skills as SKILLS } from '@/data'

/* ─── Skill rows — exactly like davidhaz.com ───────────────────────
   Each row: [word1] [pill with 3D image] [word2]
   On hover: pill scales up + glow, tech tags slide in below
──────────────────────────────────────────────────────────────────── */
const tagContainerVariants = {
  hidden: { height: 0, opacity: 0 },
  show: {
    height: 'auto',
    opacity: 1,
    transition: {
      height:  { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.22 },
      staggerChildren: 0.04,
      delayChildren:   0.05,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height:  { duration: 0.28, ease: [0.4, 0, 1, 1] },
      opacity: { duration: 0.15 },
    },
  },
}

const tagVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.88 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 380, damping: 26 } },
  exit:   { opacity: 0, y: 4, scale: 0.95, transition: { duration: 0.1 } },
}

export default function Skills() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="skills" className="dh-skills-section">
      <SectionLabel align="center">Skills &amp; Expertise</SectionLabel>

      {/* Rows */}
      <div className="dh-rows">
        {SKILLS.map((skill, i) => {
          const active = hovered === i
          return (
            <div key={i} className="dh-row-wrap">
              {/* ── Main row ── */}
              <div
                className={`dh-row${active ? ' dh-row--active' : ''}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ '--glow': skill.glow }}
              >
                {/* Left word */}
                <span className="dh-word">{skill.label1}</span>

                {/* Pill with 3D image */}
                <div className={`dh-pill${active ? ' dh-pill--active' : ''}`}>
                  {skill.image ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${skill.image}`}
                      alt={skill.alt}
                      className="dh-pill-img"
                      draggable={false}
                    />
                  ) : (
                    <svg className="dh-pill-img" viewBox="0 0 24 24" role="img" aria-label={skill.alt}
                      fill="none" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ width: '45%', height: '65%' }}>
                      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
                      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
                    </svg>
                  )}
                </div>

                {/* Right word */}
                <span className="dh-word">{skill.label2}</span>
              </div>

              {/* ── Tech tags — slide in below ── */}
              <AnimatePresence>
                {active && (
                  <motion.div
                    key="tags"
                    variants={tagContainerVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="dh-tags-row"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {skill.items.map((tag, j) => (
                      <motion.span key={j} variants={tagVariants} className="dh-tag">
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
