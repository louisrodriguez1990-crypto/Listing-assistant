import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(to right, rgba(27,58,107,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,58,107,0.05) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 85%)',
      }} />

      <div className="container">
        {/* grid-template-columns / gap / alignItems live in .hero-grid CSS class */}
        <div className="hero-grid">

          {/* Left copy */}
          <div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 12px 6px 8px', border: '1px solid var(--line)', background: 'white',
              borderRadius: 999, fontSize: 12.5, color: 'var(--ink-70)', fontWeight: 500,
              boxShadow: 'var(--shadow-sm)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--orange)', boxShadow: '0 0 0 3px var(--orange-50)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
              <strong style={{ color: 'var(--navy)' }}>Private beta</strong>&nbsp;·&nbsp;Built for real estate agents
            </span>

            <h1 style={{ fontSize: 'clamp(36px, 5.6vw, 68px)', lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 600, marginTop: 24 }}>
              Automate your listings.<br />
              <span style={{ color: 'var(--orange)', fontStyle: 'italic', fontFamily: '"Inter Tight"', fontWeight: 500 }}>Close more deals.</span>
            </h1>

            <p style={{ fontSize: 'clamp(16px, 2vw, 18.5px)', color: 'var(--ink-70)', lineHeight: 1.5, maxWidth: 520, marginTop: 24 }}>
              The moment a new lead comes in, ListingAssistant sends a personalized email and SMS — then reminds you to call. No more leads slipping through the cracks.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 36, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/signup" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 22px', background: 'var(--orange)', color: 'white',
                borderRadius: 8, fontWeight: 500, fontSize: 'clamp(14px, 2vw, 15.5px)',
                boxShadow: 'inset 0 0 0 1px var(--orange-600), 0 1px 2px rgba(219,111,0,.20)',
              }}>
                Get started free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </Link>
              <a href="#how" style={{ color: 'var(--ink-70)', fontSize: 'clamp(14px, 2vw, 15.5px)', fontWeight: 500, padding: '14px 8px' }}>See how it works</a>
            </div>

            <div style={{ display: 'flex', gap: 20, marginTop: 40, color: 'var(--ink-50)', fontSize: 13.5, flexWrap: 'wrap' }}>
              {['No setup fees', 'Cancel anytime', 'Works with any CRM'].map(text => (
                <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Right visual — hidden on ≤640px via .hero-visual CSS class */}
          <div className="hero-visual">
            {/* Property card */}
            <div style={{
              background: 'white', borderRadius: 18, boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden', position: 'relative', zIndex: 2,
              transform: 'rotate(-1.2deg)',
            }}>
              <div style={{
                height: 210,
                background: 'linear-gradient(135deg, #2B5597 0%, #1B3A6B 100%)',
                position: 'relative', display: 'flex', alignItems: 'flex-end',
                justifyContent: 'space-between', padding: 16,
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.28), transparent 55%)' }} />
                <span style={{ position: 'relative', zIndex: 2, background: 'rgba(255,255,255,.95)', color: 'var(--navy)', fontSize: 11, fontWeight: 600, padding: '5px 10px', borderRadius: 4, letterSpacing: '0.04em', fontFamily: '"JetBrains Mono"' }}>FOR SALE</span>
                <span style={{ position: 'relative', zIndex: 2, color: 'white', fontFamily: '"Inter Tight"', fontWeight: 600, fontSize: 22, letterSpacing: '-0.02em' }}>$745,000</span>
              </div>
              <div style={{ padding: '18px 20px 20px' }}>
                <div style={{ fontFamily: '"Inter Tight"', fontWeight: 600, fontSize: 16, color: 'var(--navy-900)' }}>412 Maplewood Drive</div>
                <div style={{ display: 'flex', gap: 14, color: 'var(--ink-50)', fontSize: 13, marginTop: 4 }}>
                  <span>3 bd</span><span>·</span><span>2 ba</span><span>·</span><span>1,840 sqft</span><span>·</span><span>Austin, TX</span>
                </div>
                <div style={{ height: 1, background: 'var(--line)', margin: '14px 0' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: 'var(--orange-50)', borderRadius: 8, border: '1px solid rgba(245,130,10,.15)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--orange)', animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0 }} />
                  <div style={{ fontSize: 13, color: 'var(--navy-900)', fontWeight: 500 }}>
                    New lead — Sarah Chen
                    <span style={{ display: 'block', fontFamily: '"JetBrains Mono"', fontSize: 11.5, color: 'var(--ink-50)', marginTop: 2, fontWeight: 400 }}>inquired 14s ago · zillow.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating email card */}
            <div style={{
              position: 'absolute', right: -12, top: 150,
              background: 'white', borderRadius: 12, padding: '14px 16px',
              boxShadow: 'var(--shadow-lg)', zIndex: 3, width: 280,
              transform: 'rotate(2deg)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--navy)', color: 'white', display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 600 }}>LA</span>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--navy-900)' }}>ListingAssistant</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ink-50)', fontFamily: '"JetBrains Mono"' }}>09:41</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-70)', lineHeight: 1.5 }}>Hi Sarah — thanks for the interest in 412 Maplewood. I've blocked Thursday 4pm for a showing if that works?</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--line)', fontSize: 11, color: 'var(--ok)', fontWeight: 500 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                Sent automatically · Email + SMS
              </div>
            </div>

            {/* Floating SMS */}
            <div style={{
              position: 'absolute', left: -28, bottom: 40,
              background: 'white', borderRadius: 12, padding: '12px 14px',
              boxShadow: 'var(--shadow-md)', zIndex: 3, width: 240,
              transform: 'rotate(-3deg)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--ink-50)', marginBottom: 6, fontFamily: '"JetBrains Mono"' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                REMINDER — 2:00 PM
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.45 }}><strong>Call Sarah Chen</strong> about Maplewood — she opened your email 3 times.</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
