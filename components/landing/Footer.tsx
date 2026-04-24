export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: '40px 0', color: 'var(--ink-50)', fontSize: 13 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <div>© 2026 ListingAssistant.net — Built for agents who close.</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ transition: 'color .15s' }}>Privacy</a>
          <a href="#" style={{ transition: 'color .15s' }}>Terms</a>
          <a href="mailto:hello@listingassistant.net">hello@listingassistant.net</a>
        </div>
      </div>
    </footer>
  )
}
