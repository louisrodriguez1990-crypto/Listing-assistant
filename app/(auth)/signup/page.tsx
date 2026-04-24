'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmationSent, setConfirmationSent] = useState(false)
  const [form, setForm] = useState({ full_name: '', email: '', password: '', phone: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.full_name, phone: form.phone },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.session) {
      router.push('/dashboard')
    } else {
      setConfirmationSent(true)
      setLoading(false)
    }
  }

  if (confirmationSent) {
    return (
      <div style={{ width: '100%', maxWidth: 460 }}>
        <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 18, padding: 40, boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
          <h1 style={{ fontSize: 24, letterSpacing: '-0.03em', marginBottom: 8 }}>Check your inbox</h1>
          <p style={{ color: 'var(--ink-70)', fontSize: 15, lineHeight: 1.6, marginBottom: 8 }}>
            We sent a confirmation link to <strong>{form.email}</strong>.
          </p>
          <p style={{ color: 'var(--ink-50)', fontSize: 14 }}>
            Click the link in that email to activate your account and log in.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: 460 }}>
      <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 18, padding: 40, boxShadow: 'var(--shadow-md)' }}>
        <h1 style={{ fontSize: 28, letterSpacing: '-0.03em', marginBottom: 8 }}>Create your account</h1>
        <p style={{ color: 'var(--ink-70)', fontSize: 15, marginBottom: 28 }}>Start capturing and converting leads automatically.</p>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#DC2626', fontSize: 14 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field label="Full name" id="full_name" type="text" placeholder="Jane Appleseed" value={form.full_name} onChange={v => setForm(f => ({ ...f, full_name: v }))} required />
          <Field label="Work email" id="email" type="email" placeholder="jane@brokerage.com" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} required />
          <Field label="Phone (for SMS reminders)" id="phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} />
          <Field label="Password" id="password" type="password" placeholder="8+ characters" value={form.password} onChange={v => setForm(f => ({ ...f, password: v }))} required />

          <button type="submit" disabled={loading} style={{
            marginTop: 8, padding: '14px', background: 'var(--orange)', color: 'white',
            borderRadius: 8, fontWeight: 500, fontSize: 15, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, transition: 'opacity .15s',
          }}>
            {loading ? 'Creating account…' : 'Create account →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--ink-50)', fontSize: 14 }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--navy)', fontWeight: 500 }}>Log in</Link>
        </p>
      </div>
    </div>
  )
}

function Field({ label, id, type, placeholder, value, onChange, required }: {
  label: string; id: string; type: string; placeholder: string;
  value: string; onChange: (v: string) => void; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--ink-70)', marginBottom: 6, fontFamily: '"JetBrains Mono"', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </label>
      <input
        id={id} type={type} placeholder={placeholder} value={value} required={required}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--line-2)', borderRadius: 8, background: 'white', fontFamily: 'inherit', fontSize: 15, color: 'var(--ink)', outline: 'none', transition: 'border .15s, box-shadow .15s' }}
        onFocus={e => { e.target.style.borderColor = 'var(--navy-700)'; e.target.style.boxShadow = '0 0 0 3px rgba(27,58,107,.12)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--line-2)'; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}
