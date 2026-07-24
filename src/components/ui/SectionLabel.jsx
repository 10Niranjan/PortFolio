/**
 * SectionLabel — static eyebrow text used across all sections.
 */
export default function SectionLabel({ children, style = {}, align = 'left' }) {
  return (
    <div
      style={{
        display: 'block',
        marginBottom: '3.5rem',
        textAlign: align,
        ...style,
      }}
    >
      <p style={{
        fontSize: 'clamp(0.85rem, 1.1vw, 1.05rem)',
        fontWeight: 700,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
        margin: 0,
        fontFamily: "'Outfit', sans-serif",
      }}>
        {children}
      </p>
    </div>
  )
}
