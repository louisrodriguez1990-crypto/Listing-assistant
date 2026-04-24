'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    })

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 18, padding: 40, boxShadow: 'var(--shadow-md)' }}>
        {sent ? (
          <>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📬</div>
            <h1 style={{ fontSize: 24, letterSpacing: '-0.03em', marginBottom: 8 }}>Check your inbox</h1>
            <p style={{ color: 'var(--ink-70)', fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
              We sent a password reset link to <strong>{email}</strong>. Click the link in that email to set a new password.
            </p>
            <p style={{ color: 'var(--ink-50)', fontSize: 13 }}>
              Didn't get it? Check your spam folder or{' '}
              <button
                onClick={() => { setSent(false) }}
                style={{ color: 'var(--navy)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 13 }}
              >
                try again
              </button>.
            </p>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 26, letterSpacing: '-0.03em', marginBottom: 8 }}>Forgot your password?</h1>
            <p style={{ color: 'var(--ink-70)', fontSize: 15, marginBottom: 28 }}>Enter your email and we'll send you a reset link.</p>

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#DC2626', fontSize: 14 }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input
                  id="email" type="email" placeholder="jane@brokerage.com" value={email} required
                  onChange={e => setEmail(e.target.value)}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'var(--navy-700)'; e.target.style.boxShadow = '0 0 0 3px rgba(27,58,107,.12)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--line-2)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <button type="submit" disabled={loading} style={{
                marginTop: 8, padding: '14px', background: 'var(--navy)', color: 'white',
                borderRadius: 8, fontWeight: 500, fontSize: 15, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1, transition: 'opacity .15s',
              }}>
                {loading ? 'Sending…' : 'Send reset link →'}
              </button>
            </form>
          </>
        )}

        <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--ink-50)', fontSize: 14 }}>
          <Link href="/login" style={{ color: 'var(--navy)', fontWeight: 500 }}>← Back to login</Link>
        </p>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--ink-70)',
  marginBottom: 6, fontFamily: '"JetBrains Mono"', textTransform: 'uppercase', letterSpacing: '0.06em',
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', border: '1px solid var(--line-2)',
  borderRadius: 8, background: 'white', fontFamily: 'inherit', fontSize: 15,
  color: 'var(--ink)', outline: 'none', transition: 'border .15s, box-shadow .15s',
}
