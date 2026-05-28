import { personal } from '@/data'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="section-wrapper border-t" style={{ borderColor: 'var(--color-border)' }}>
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          © {year} <span className="text-primary font-medium">{personal.name}</span>. Crafted with ☕ & passion.
        </p>
        <div className="flex items-center gap-6">
          {Object.entries(personal.socials).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-primary capitalize transition-colors duration-200 no-underline"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
