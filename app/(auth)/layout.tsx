import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '20px 28px', borderBottom: '1px solid var(--line)', background: 'white' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: '"Inter Tight"', fontWeight: 600, fontSize: 17, color: 'var(--navy-900)', letterSpacing: '-0.01em' }}>
          <span style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--navy)', display: 'grid', placeItems: 'center', color: 'white', position: 'relative' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21V12h6v9"/></svg>
            <span style={{ position: 'absolute', width: 7, height: 7, borderRadius: 2, background: 'var(--orange)', right: -3, bottom: -3, boxShadow: '0 0 0 2px var(--bg)' }} />
          </span>
          ListingAssistant
        </Link>
      </header>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        {children}
      </div>
    </div>
  )
}
