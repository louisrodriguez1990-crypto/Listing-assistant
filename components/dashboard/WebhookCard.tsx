'use client'
import { useState } from 'react'

export default function WebhookCard({ token }: { token: string }) {
  const [copied, setCopied] = useState(false)
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/leads/webhook?token=${token || '...'}`

  async function handleCopy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: 'var(--navy-50)', border: '1px solid var(--navy-100)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 8 }}>Your Lead Intake Webhook</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <code style={{ fontFamily: '"JetBrains Mono"', fontSize: 12, background: 'white', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--line)', color: 'var(--ink)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {url}
        </code>
        <button
          onClick={handleCopy}
          style={{
            flexShrink: 0, padding: '8px 14px', background: copied ? 'var(--ok)' : 'var(--navy)', color: 'white',
            border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer',
            transition: 'background .2s', whiteSpace: 'nowrap', fontFamily: '"JetBrains Mono"',
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <p style={{ fontSize: 12, color: 'var(--ink-50)', marginTop: 8 }}>
        POST JSON with: <code style={{ fontFamily: '"JetBrains Mono"', background: 'rgba(0,0,0,.05)', padding: '1px 4px', borderRadius: 3 }}>name, email, phone, property_interest, source</code>
      </p>
    </div>
  )
}
