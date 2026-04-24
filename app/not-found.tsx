import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--bg)', fontFamily: 'inherit' }}>
      <Link href="/" style={{ marginBottom: 48, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <div style={{ width: 28, height: 28, background: 'var(--navy)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <span style={{ fontFamily: '"Inter Tight"', fontWeight: 700, fontSize: 16, color: 'var(--navy)', letterSpacing: '-0.02em' }}>ListingAssistant</span>
      </Link>

      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ fontFamily: '"Inter Tight"', fontWeight: 700, fontSize: 96, color: 'var(--navy)', letterSpacing: '-0.06em', lineHeight: 1, marginBottom: 16 }}>404</div>
        <h1 style={{ fontSize: 24, letterSpacing: '-0.03em', marginBottom: 12 }}>Page not found</h1>
        <p style={{ color: 'var(--ink-50)', fontSize: 16, lineHeight: 1.6, marginBottom: 36 }}>
          This page doesn't exist or may have been moved. Let's get you back on track.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/dashboard" style={{ padding: '12px 24px', background: 'var(--navy)', color: 'white', borderRadius: 8, fontWeight: 500, fontSize: 15, textDecoration: 'none' }}>
            Go to dashboard
          </Link>
          <Link href="/" style={{ padding: '12px 24px', background: 'white', color: 'var(--ink)', border: '1px solid var(--line)', borderRadius: 8, fontWeight: 500, fontSize: 15, textDecoration: 'none' }}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
