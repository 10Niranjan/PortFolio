import { useState, useEffect } from 'react'
import { personal } from '@/data'

const username = personal.socials.github.split('/').pop()

export default function GitHubStats() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetch(`https://api.github.com/users/${username}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then(r => r.json()),
    ])
      .then(([user, repos]) => {
        if (cancelled) return
        const langCounts = {}
        for (const repo of repos) {
          if (repo.language) langCounts[repo.language] = (langCounts[repo.language] || 0) + 1
        }
        const topLanguages = Object.entries(langCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([lang]) => lang)

        setData({
          publicRepos: user.public_repos,
          followers: user.followers,
          topLanguages,
        })
      })
      .catch(() => !cancelled && setError(true))
    return () => { cancelled = true }
  }, [])

  if (error || !data) return null

  const items = [
    { value: data.publicRepos, label: 'Public repos' },
    { value: data.followers, label: 'Followers' },
    { value: data.topLanguages.length, label: 'Top languages', sub: data.topLanguages.join(' · ') },
  ]

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '1.25rem',
    }}>
      {items.map(item => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--color-text)',
            lineHeight: 1,
          }}>
            {item.value}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            {item.label}{item.sub ? ` — ${item.sub}` : ''}
          </span>
        </div>
      ))}
    </div>
  )
}
