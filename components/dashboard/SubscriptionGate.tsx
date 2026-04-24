import Link from 'next/link'

export default function SubscriptionGate() {
  return (
    <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 16, padding: '48px 40px', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--orange-50)', color: 'var(--orange)', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <h2 style={{ fontSize: 22, marginBottom: 10 }}>Subscribe to unlock your dashboard</h2>
      <p style={{ color: 'var(--ink-70)', fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
        Get instant email + SMS follow-up, a lead dashboard, and 1-hour call reminders — all for $20/month.
      </p>
      <Link href="/dashboard/billing" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px',
        background: 'var(--orange)', color: 'white', borderRadius: 8, fontWeight: 500, fontSize: 15,
        boxShadow: 'inset 0 0 0 1px var(--orange-600)',
      }}>
        Subscribe — $20/mo
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </Link>
      <p style={{ color: 'var(--ink-50)', fontSize: 12, marginTop: 12 }}>Cancel anytime. No setup fees.</p>
    </div>
  )
}
