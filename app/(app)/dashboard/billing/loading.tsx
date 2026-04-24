const shimmer: React.CSSProperties = {
  background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.4s infinite',
  borderRadius: 6,
}

export default function BillingLoading() {
  return (
    <>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>
      <div style={{ maxWidth: 540, margin: '48px auto', padding: '0 24px' }}>
        <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 16, padding: '32px 36px', boxShadow: 'var(--shadow-md)' }}>
          {/* Price placeholder */}
          <div style={{ ...shimmer, width: 120, height: 20, marginBottom: 12 }} />
          <div style={{ ...shimmer, width: 80, height: 44, marginBottom: 8 }} />
          <div style={{ ...shimmer, width: 100, height: 14, marginBottom: 28 }} />

          {/* Features list */}
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ ...shimmer, width: 16, height: 16, borderRadius: '50%', flexShrink: 0 }} />
              <div style={{ ...shimmer, width: 180 + i * 20, height: 14 }} />
            </div>
          ))}

          {/* Button */}
          <div style={{ ...shimmer, width: '100%', height: 48, borderRadius: 8, marginTop: 24 }} />
        </div>
      </div>
    </>
  )
}
