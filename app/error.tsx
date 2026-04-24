'use client'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled error:', error)
  }, [error])

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '40px 20px',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--orange-50)', color: 'var(--orange)', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 style={{ fontSize: 22, letterSpacing: '-0.02em', marginBottom: 10 }}>Something went wrong</h2>
        <p style={{ color: 'var(--ink-70)', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
          An unexpected error occurred. Please try again — if the issue persists, contact{' '}
          <a href="mailto:hello@listingassistant.net" style={{ color: 'var(--navy)' }}>hello@listingassistant.net</a>.
        </p>
        <button
          onClick={reset}
          style={{ padding: '12px 24px', background: 'var(--navy)', color: 'white', borderRadius: 8, border: 'none', fontWeight: 500, fontSize: 14, cursor: 'pointer' }}
        >
          Try again
        </button>
      </div>
    </div>
  )
}
