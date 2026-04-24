export default function HowItWorksSection() {
  return (
    <section id="how" style={{ padding: '112px 0' }}>
      <div className="container">
        <div className="how-head">
          <div>
            <div style={{ fontFamily: '"JetBrains Mono"', fontSize: 12, color: 'var(--orange-600)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'block', width: 18, height: 1, background: 'var(--orange)' }} />
              How it works
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>Set it up once.<br />Never miss another lead.</h2>
          </div>
          <p style={{ color: 'var(--ink-70)', fontSize: 16, lineHeight: 1.6, maxWidth: 420 }}>
            Three steps. No complex integrations. No new CRM to learn. Your leads get replies in seconds while you stay focused on what you do best — closing.
          </p>
        </div>

        <div className="steps">
          {/* Connector — rendered via .steps::before in CSS */}

          {/* Step 1 */}
          <div className="reveal" style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 18, padding: 28, position: 'relative', overflow: 'hidden', transition: 'transform .2s, box-shadow .2s' }}>
            <div style={{ fontFamily: '"JetBrains Mono"', fontSize: 12, color: 'var(--orange-600)', letterSpacing: '0.08em', fontWeight: 500 }}>STEP 01</div>
            <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, marginTop: 12 }}>A new lead comes in</h3>
            <p style={{ color: 'var(--ink-70)', marginTop: 10, fontSize: 14.5, lineHeight: 1.55 }}>From Zillow, your website, open-house sign-in sheet — anywhere. We pick it up the second it lands.</p>
            <div style={{ marginTop: 24, background: 'var(--navy-50)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
              {[['name', 'Sarah Chen', 'Zillow'], ['phone', '+1 (512) 555-0104', 'Zillow'], ['email', 's.chen@…', 'Zillow'], ['interest', '412 Maplewood Dr', 'Zillow']].map(([label, value, src]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'white', border: '1px solid var(--line)', padding: '6px 10px', borderRadius: 5, fontSize: 11, color: 'var(--ink-70)', fontFamily: '"JetBrains Mono"', marginTop: label === 'name' ? 0 : 6 }}>
                  <span style={{ color: 'var(--ink-30)', minWidth: 44 }}>{label}</span>
                  <span style={{ color: 'var(--navy-900)', fontWeight: 500 }}>{value}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 9.5, padding: '2px 6px', background: 'var(--orange-50)', color: 'var(--orange-600)', borderRadius: 3, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{src}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="reveal" style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 18, padding: 28, position: 'relative', overflow: 'hidden', transition: 'transform .2s, box-shadow .2s' }}>
            <div style={{ fontFamily: '"JetBrains Mono"', fontSize: 12, color: 'var(--orange-600)', letterSpacing: '0.08em', fontWeight: 500 }}>STEP 02</div>
            <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, marginTop: 12 }}>Personalized reply, instantly</h3>
            <p style={{ color: 'var(--ink-70)', marginTop: 10, fontSize: 14.5, lineHeight: 1.55 }}>We send a warm, on-brand email and SMS within seconds — mentioning the property, their name, and your availability.</p>
            <div style={{ marginTop: 24, background: 'var(--navy-50)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
              <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 6, padding: 10, fontSize: 11, lineHeight: 1.5 }}>
                <div style={{ fontFamily: '"JetBrains Mono"', color: 'var(--ink-30)', fontSize: 9.5, textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.06em' }}>To: Sarah Chen · Auto-sent 00:03s</div>
                <div style={{ color: 'var(--ink)' }}>Hi <span style={{ color: 'var(--orange-600)', background: 'var(--orange-50)', padding: '0 3px', borderRadius: 3 }}>Sarah</span>, thanks for reaching out about <span style={{ color: 'var(--orange-600)', background: 'var(--orange-50)', padding: '0 3px', borderRadius: 3 }}>412 Maplewood</span>. Happy to set up a showing — does <span style={{ color: 'var(--orange-600)', background: 'var(--orange-50)', padding: '0 3px', borderRadius: 3 }}>Thursday 4pm</span> work?</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, fontSize: 10, color: 'var(--ok)', fontFamily: '"JetBrains Mono"' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  DELIVERED — EMAIL + SMS
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="reveal" style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 18, padding: 28, position: 'relative', overflow: 'hidden', transition: 'transform .2s, box-shadow .2s' }}>
            <div style={{ fontFamily: '"JetBrains Mono"', fontSize: 12, color: 'var(--orange-600)', letterSpacing: '0.08em', fontWeight: 500 }}>STEP 03</div>
            <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, marginTop: 12 }}>You get reminded to call</h3>
            <p style={{ color: 'var(--ink-70)', marginTop: 10, fontSize: 14.5, lineHeight: 1.55 }}>When the lead engages, we nudge you with context — who, what, why now — so your call feels personal, not scripted.</p>
            <div style={{ marginTop: 24, background: 'var(--navy-50)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
              <div style={{ background: 'white', borderRadius: 6, padding: 12, border: '1px solid var(--line)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--orange-50)', color: 'var(--orange-600)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy-900)' }}>Call Sarah now</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-50)', marginTop: 2, lineHeight: 1.4 }}>She opened your email 3 times and replied "Thursday works"</div>
                  <div style={{ marginTop: 8, fontFamily: '"JetBrains Mono"', fontSize: 10, color: 'white', background: 'var(--navy)', padding: '4px 8px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    TAP TO CALL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
