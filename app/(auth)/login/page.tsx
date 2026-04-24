'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 18, padding: 40, boxShadow: 'var(--shadow-md)' }}>
        <h1 style={{ fontSize: 28, letterSpacing: '-0.03em', marginBottom: 8 }}>Welcome back</h1>
        <p style={{ color: 'var(--ink-70)', fontSize: 15, marginBottom: 28 }}>Log in to your ListingAssistant dashboard.</p>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#DC2626', fontSize: 14 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input id="email" type="email" placeholder="jane@brokerage.com" value={form.email} required
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--navy-700)'; e.target.style.boxShadow = '0 0 0 3px rgba(27,58,107,.12)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--line-2)'; e.target.style.boxShadow = 'none' }}
            />
          </div>
          <div>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input id="password" type="password" placeholder="••••••••" value={form.password} required
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
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
            {loading ? 'Logging in…' : 'Log in →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--ink-50)', fontSize: 14 }}>
          Don't have an account?{' '}
          <Link href="/signup" style={{ color: 'var(--navy)', fontWeight: 500 }}>Sign up free</Link>
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
