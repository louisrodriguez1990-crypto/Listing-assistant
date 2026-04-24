export default function ProblemSection() {
  return (
    <section id="problem" style={{ background: 'white', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '112px 0' }}>
      <div className="container problem-grid">
        <div className="reveal">
          <div style={{ fontFamily: '"JetBrains Mono"', fontSize: 12, color: 'var(--orange-600)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'block', width: 18, height: 1, background: 'var(--orange)' }} />
            The problem
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            Every minute you wait, your lead is already talking to another agent.
          </h2>
          <p style={{ color: 'var(--ink-70)', fontSize: 17, marginTop: 20, lineHeight: 1.6, maxWidth: 460 }}>
            78% of home buyers work with the first agent who calls them back. But between showings, paperwork, and open houses, you can't reply in the first 5 minutes — and that's where deals die.
          </p>

          <div className="stat-row">
            {[
              { num: '78%', label: 'of leads go with the first agent who replies' },
              { num: '5min', label: 'response window before the lead goes cold' },
              { num: '$8k+', label: 'avg. commission lost per missed lead' },
            ].map(({ num, label }, i) => (
              <div key={num} style={{ padding: '24px 20px 0 0', borderRight: i < 2 ? '1px solid var(--line)' : 'none' }}>
                <div style={{ fontFamily: '"Inter Tight"', fontWeight: 600, fontSize: 42, color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {num.replace(/(\d+)(%|min|\$|k\+|k|\+)/, (_, n, u) => n).includes('$') ? (
                    <>{num}</>
                  ) : (
                    <>{num.replace(/[^0-9]/g, '')}<span style={{ color: 'var(--orange)' }}>{num.replace(/[0-9]/g, '')}</span></>
                  )}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-50)', marginTop: 8, lineHeight: 1.4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal">
          <div style={{ background: 'var(--navy-50)', border: '1px solid var(--line)', borderRadius: 18, padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 16, borderBottom: '1px solid var(--line-2)', marginBottom: 20 }}>
              <span style={{ fontFamily: '"Inter Tight"', fontWeight: 600, color: 'var(--navy-900)', fontSize: 15 }}>A typical Tuesday, without us</span>
              <span style={{ fontFamily: '"JetBrains Mono"', fontSize: 11, color: 'var(--ink-50)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Lead #4412</span>
            </div>
            {[
              { time: '9:14 AM', event: 'Lead submits inquiry on Zillow', sub: 'From: Sarah C. · Budget $700–800k', type: 'normal' },
              { time: '9:15 AM', event: "You're at a showing across town", sub: 'Phone on silent, notification missed', type: 'normal' },
              { time: '9:22 AM', event: 'Competing agent replies first', sub: 'Sarah books a showing with them at 4pm', type: 'cold' },
              { time: '2:40 PM', event: 'You finally see the inquiry', sub: 'Too late — lead is already engaged elsewhere', type: 'lost' },
            ].map(({ time, event, sub, type }) => (
              <div key={time} style={{
                display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16, alignItems: 'start',
                padding: '14px 0', borderTop: '1px dashed var(--line-2)', position: 'relative',
                opacity: type === 'lost' ? 0.6 : 1,
              }}>
                <div style={{ fontFamily: '"JetBrains Mono"', fontSize: 12, color: 'var(--ink-50)', paddingTop: 2 }}>{time}</div>
                <div style={{ position: 'absolute', left: 78, top: 20, width: 8, height: 8, borderRadius: '50%', background: type === 'cold' ? '#C93030' : type === 'lost' ? 'var(--ink-30)' : 'var(--navy)', boxShadow: '0 0 0 4px var(--navy-50)' }} />
                <div style={{ fontSize: 14.5, color: type === 'cold' ? '#9A1B1B' : type === 'lost' ? 'var(--ink-50)' : 'var(--navy-900)', fontWeight: 500, textDecoration: type === 'lost' ? 'line-through' : 'none' }}>
                  {event}
                  <small style={{ display: 'block', fontWeight: 400, color: 'var(--ink-50)', fontSize: 12.5, marginTop: 3 }}>{sub}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
