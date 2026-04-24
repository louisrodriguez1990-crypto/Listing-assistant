'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(250,250,247,0.92)' : 'rgba(250,250,247,0.7)',
        backdropFilter: 'saturate(180%) blur(16px)',
        WebkitBackdropFilter: 'saturate(180%) blur(16px)',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'background .2s, border-color .2s, box-shadow .2s',
      }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: '"Inter Tight"', fontWeight: 600, fontSize: 17, color: 'var(--navy-900)', letterSpacing: '-0.01em' }}>
          <span style={{
            width: 28, height: 28, borderRadius: 7, background: 'var(--navy)',
            display: 'grid', placeItems: 'center', color: 'white', position: 'relative',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21V12h6v9"/></svg>
            <span style={{ position: 'absolute', width: 7, height: 7, borderRadius: 2, background: 'var(--orange)', right: -3, bottom: -3, boxShadow: '0 0 0 2px var(--bg)' }} />
          </span>
          ListingAssistant
        </Link>

        <nav style={{ display: 'flex', gap: 32 }} className="hide-mobile">
          {[['#problem', 'Problem'], ['#how', 'How it works'], ['#pricing', 'Pricing']].map(([href, label]) => (
            <a key={href} href={href} style={{ color: 'var(--ink-70)', fontSize: 14, fontWeight: 500, transition: 'color .15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--navy)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-70)')}
            >{label}</a>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/login" className="hide-login" style={{ color: 'var(--ink-70)', fontSize: 14, fontWeight: 500, padding: '10px 14px' }}>Log in</Link>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px',
            background: 'var(--navy)', color: 'white', borderRadius: 8,
            fontWeight: 500, fontSize: 14, boxShadow: 'inset 0 0 0 1px var(--navy-900), 0 1px 2px rgba(16,37,67,.15)',
          }}>
            Get started
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </header>
  )
}
