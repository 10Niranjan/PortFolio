import { useState } from 'react'

// Layout
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Sections
import Hero    from '@/components/sections/Hero'
import Work    from '@/components/sections/Work'
import About   from '@/components/sections/About'
import Skills  from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

export default function App() {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.classList.toggle('light', next === 'light')
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar onThemeToggle={toggleTheme} theme={theme} />
      <main>
        <Hero />
        <Work />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
