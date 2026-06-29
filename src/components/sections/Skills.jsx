import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Skills.css'
import SectionLabel from '@/components/ui/SectionLabel'

/* ─── Skill rows — exactly like davidhaz.com ───────────────────────
   Each row: [word1] [pill with 3D image] [word2]
   On hover: pill scales up + glow, tech tags slide in below
──────────────────────────────────────────────────────────────────── */
const SKILLS = [
  {
    word1: 'Mobile',
    word2: 'development',
    image: `${import.meta.env.BASE_URL}skill_mobile.png`,
    alt: 'Smartphone 3D icon',
    tags: ['Flutter', 'Dart', 'Firebase', 'Android Studio', 'Provider / Riverpod'],
    glow: 'rgba(124, 58, 237, 0.55)',
  },
  {
    word1: 'Java &',
    word2: 'Spring backend',
    image: `${import.meta.env.BASE_URL}skill_java.png`,
    alt: 'Gear 3D icon',
    tags: ['Java (8 · 17 · 21)', 'Spring Boot 3', 'Spring MVC', 'Spring Data JPA', 'Spring Security'],
    glow: 'rgba(245, 158, 11, 0.55)',
  },
  {
    word1: 'Web &',
    word2: 'frontend',
    image: `${import.meta.env.BASE_URL}skill_web.png`,
    alt: 'Cursor 3D icon',
    tags: ['React.js', 'JavaScript', 'HTML5 / CSS3', 'Tailwind CSS'],
    glow: 'rgba(16, 185, 129, 0.55)',
  },
  {
    word1: 'APIs &',
    word2: 'messaging',
    image: `${import.meta.env.BASE_URL}skill_api.png`,
    alt: 'Network 3D icon',
    tags: ['REST APIs', 'Apache Kafka', 'JWT / OAuth2', 'WebSockets'],
    glow: 'rgba(236, 72, 153, 0.55)',
  },
  {
    word1: 'Databases &',
    word2: 'DevOps',
    image: `${import.meta.env.BASE_URL}skill_db.png`,
    alt: 'Database 3D icon',
    tags: ['PostgreSQL', 'MongoDB', 'MySQL', 'Docker', 'Git / GitHub', 'CI/CD'],
    glow: 'rgba(59, 130, 246, 0.55)',
  },
]

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
                <span className="dh-word">{skill.word1}</span>

                {/* Pill with 3D image */}
                <div className={`dh-pill${active ? ' dh-pill--active' : ''}`}>
                  <img
                    src={skill.image}
                    alt={skill.alt}
                    className="dh-pill-img"
                    draggable={false}
                  />
                </div>

                {/* Right word */}
                <span className="dh-word">{skill.word2}</span>
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
                    {skill.tags.map((tag, j) => (
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
