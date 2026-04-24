const shimmer: React.CSSProperties = {
  background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.4s infinite',
  borderRadius: 6,
}

export default function DashboardLoading() {
  return (
    <>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 28px' }}>
        {/* Header row */}
        <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ ...shimmer, width: 200, height: 28, marginBottom: 10 }} />
            <div style={{ ...shimmer, width: 80, height: 16 }} />
          </div>
          {/* Stat cards */}
          <div style={{ display: 'flex', gap: 16 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 10, padding: '12px 18px', minWidth: 80, textAlign: 'center' }}>
                <div style={{ ...shimmer, width: 36, height: 28, margin: '0 auto 8px' }} />
                <div style={{ ...shimmer, width: 50, height: 12, margin: '0 auto' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Webhook block */}
        <div style={{ background: 'var(--navy-50)', border: '1px solid var(--navy-100)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ ...shimmer, width: 160, height: 14, marginBottom: 12 }} />
          <div style={{ ...shimmer, width: '100%', height: 36, borderRadius: 6 }} />
          <div style={{ ...shimmer, width: 280, height: 12, marginTop: 10 }} />
        </div>

        {/* Table skeleton */}
        <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ background: 'var(--navy-50)', padding: '12px 16px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 24 }}>
            {[90, 120, 140, 80, 90, 70, 80].map((w, i) => (
              <div key={i} style={{ ...shimmer, width: w, height: 11 }} />
            ))}
          </div>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ padding: '18px 16px', borderBottom: i < 5 ? '1px solid var(--line)' : 'none', display: 'flex', gap: 24, alignItems: 'center' }}>
              <div style={{ ...shimmer, width: 90, height: 14 }} />
              <div>
                <div style={{ ...shimmer, width: 130, height: 13, marginBottom: 6 }} />
                <div style={{ ...shimmer, width: 90, height: 11 }} />
              </div>
              <div style={{ ...shimmer, width: 140, height: 13 }} />
              <div style={{ ...shimmer, width: 60, height: 20, borderRadius: 4 }} />
              <div style={{ ...shimmer, width: 80, height: 24, borderRadius: 20 }} />
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ ...shimmer, width: 32, height: 20, borderRadius: 4 }} />
                <div style={{ ...shimmer, width: 32, height: 20, borderRadius: 4 }} />
              </div>
              <div style={{ ...shimmer, width: 60, height: 13 }} />
              <div style={{ ...shimmer, width: 48, height: 28, borderRadius: 6 }} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
