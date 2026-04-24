import Link from 'next/link'

export default function PricingSection() {
  const features = [
    'Unlimited leads — no per-message fees',
    'Instant email + SMS follow-up, personalized',
    'Smart call reminders based on lead activity',
    'Zillow, Realtor.com & website form integrations',
    'Works alongside your existing CRM',
    'Webhook API for any lead source',
  ]

  return (
    <section id="pricing" style={{ background: 'var(--navy)', color: 'white', padding: '112px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
      }} />
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: '"JetBrains Mono"', fontSize: 12, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <span style={{ display: 'block', width: 18, height: 1, background: 'var(--orange)' }} />
          Pricing
          <span style={{ display: 'block', width: 18, height: 1, background: 'var(--orange)' }} />
        </div>
        <h2 style={{ color: 'white', fontSize: 'clamp(32px, 3.5vw, 44px)', letterSpacing: '-0.03em', lineHeight: 1.1, textAlign: 'center' }}>
          One plan. One price.<br />No calculator required.
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,.7)', marginTop: 16, fontSize: 17, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
          We built ListingAssistant to pay for itself with a single extra closed deal per year. Everything else is upside.
        </p>

        <div style={{ maxWidth: 460, margin: '56px auto 0', background: 'white', color: 'var(--ink)', borderRadius: 18, padding: 36, boxShadow: '0 40px 80px -20px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.08)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--orange)', color: 'white', fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 999, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: '"JetBrains Mono"' }}>
            Launch pricing
          </div>
          <div style={{ fontFamily: '"Inter Tight"', fontWeight: 600, fontSize: 14, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Agent plan</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 18 }}>
            <span style={{ fontFamily: '"Inter Tight"', fontWeight: 500, fontSize: 28, color: 'var(--navy-900)', alignSelf: 'flex-start', marginTop: 6 }}>$</span>
            <span style={{ fontFamily: '"Inter Tight"', fontWeight: 600, fontSize: 72, color: 'var(--navy-900)', letterSpacing: '-0.04em', lineHeight: 1 }}>20</span>
            <span style={{ color: 'var(--ink-50)', fontSize: 15, marginLeft: 2 }}>/ month</span>
          </div>
          <div style={{ color: 'var(--ink-70)', fontSize: 14, marginTop: 8 }}>Billed monthly. Cancel in one click.</div>
          <div style={{ height: 1, background: 'var(--line)', margin: '24px 0' }} />
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {features.map(f => (
              <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--ink)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M20 6L9 17l-5-5"/></svg>
                {f}
              </li>
            ))}
          </ul>
          <Link href="/signup" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            width: '100%', marginTop: 28, padding: '15px 24px',
            background: 'var(--orange)', color: 'white', borderRadius: 8,
            fontWeight: 500, fontSize: 15.5,
            boxShadow: 'inset 0 0 0 1px var(--orange-600), 0 1px 2px rgba(219,111,0,.20)',
          }}>
            Get started — $20/mo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
          <p style={{ textAlign: 'center', color: 'var(--ink-50)', fontSize: 12.5, marginTop: 14 }}>
            Founding members get this price locked in for life.
          </p>
        </div>
      </div>
    </section>
  )
}
