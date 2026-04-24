'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ full_name: '', phone: '', brokerage: '' })

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) setForm({ full_name: data.full_name ?? '', phone: data.phone ?? '', brokerage: data.brokerage ?? '' })
    }
    load()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').upsert({ id: user.id, ...form })
    }
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 28px' }}>
      <h1 style={{ fontSize: 24, letterSpacing: '-0.03em', marginBottom: 4 }}>Settings</h1>
      <p style={{ color: 'var(--ink-50)', fontSize: 14, marginBottom: 28 }}>This info is used to personalize follow-up messages to your leads.</p>

      <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 14, padding: 32 }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Field label="Your full name" id="full_name" type="text" placeholder="Jane Appleseed" value={form.full_name} onChange={v => setForm(f => ({ ...f, full_name: v }))} />
          <Field label="Your phone number" id="phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} />
          <Field label="Brokerage" id="brokerage" type="text" placeholder="Keller Williams" value={form.brokerage} onChange={v => setForm(f => ({ ...f, brokerage: v }))} />

          <div style={{ paddingTop: 8, display: 'flex', alignItems: 'center', gap: 16 }}>
            <button type="submit" disabled={loading} style={{ padding: '12px 24px', background: 'var(--navy)', color: 'white', borderRadius: 8, fontWeight: 500, fontSize: 14, border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Saving…' : 'Save changes'}
            </button>
            {saved && <span style={{ color: 'var(--ok)', fontSize: 14, fontWeight: 500 }}>✓ Saved</span>}
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, id, type, placeholder, value, onChange }: { label: string; id: string; type: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--ink-70)', marginBottom: 6, fontFamily: '"JetBrains Mono"', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--line-2)', borderRadius: 8, fontFamily: 'inherit', fontSize: 15, color: 'var(--ink)', outline: 'none', transition: 'border .15s, box-shadow .15s' }}
        onFocus={e => { e.target.style.borderColor = 'var(--navy-700)'; e.target.style.boxShadow = '0 0 0 3px rgba(27,58,107,.12)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--line-2)'; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}
