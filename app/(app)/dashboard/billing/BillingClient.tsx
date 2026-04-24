'use client'
import { useState } from 'react'

export default function BillingClient({ status, periodEnd, hasCustomer }: {
  status: string
  periodEnd: string | null
  hasCustomer: boolean
}) {
  const [loading, setLoading] = useState(false)

  async function startCheckout() {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    else setLoading(false)
  }

  async function openPortal() {
    setLoading(true)
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    else setLoading(false)
  }

  const isActive = status === 'active'

  return (
    <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 14, padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: '"Inter Tight"' }}>Agent Plan</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
            <span style={{ fontFamily: '"Inter Tight"', fontWeight: 600, fontSize: 48, color: 'var(--navy-900)', letterSpacing: '-0.04em' }}>$20</span>
            <span style={{ color: 'var(--ink-50)', fontSize: 14 }}>/month</span>
          </div>
        </div>
        <div style={{
          padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, fontFamily: '"JetBrains Mono"',
          background: isActive ? '#E6F4EC' : 'var(--orange-50)',
          color: isActive ? 'var(--ok)' : 'var(--orange-600)',
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          {isActive ? '● Active' : '○ Inactive'}
        </div>
      </div>

      {isActive && periodEnd && (
        <p style={{ color: 'var(--ink-70)', fontSize: 14, marginBottom: 20 }}>
          Your subscription renews on <strong>{new Date(periodEnd).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>.
        </p>
      )}

      <div style={{ height: 1, background: 'var(--line)', margin: '20px 0' }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {['Unlimited leads', 'Instant email + SMS follow-up', '1-hour call reminders', 'Lead dashboard', 'Webhook API'].map(f => (
          <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14, color: 'var(--ink)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            {f}
          </li>
        ))}
      </ul>

      {isActive ? (
        <button onClick={openPortal} disabled={loading} style={{ padding: '12px 24px', background: 'var(--navy)', color: 'white', borderRadius: 8, fontWeight: 500, fontSize: 14, border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Opening portal…' : 'Manage subscription →'}
        </button>
      ) : (
        <button onClick={startCheckout} disabled={loading} style={{ padding: '14px 28px', background: 'var(--orange)', color: 'white', borderRadius: 8, fontWeight: 500, fontSize: 15, border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1, boxShadow: 'inset 0 0 0 1px var(--orange-600)' }}>
          {loading ? 'Redirecting to checkout…' : 'Subscribe — $20/month →'}
        </button>
      )}
      <p style={{ color: 'var(--ink-50)', fontSize: 12, marginTop: 10 }}>Cancel anytime. No setup fees.</p>
    </div>
  )
}
