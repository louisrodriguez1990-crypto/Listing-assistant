'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function DashboardNav({ user, hasActiveSub }: { user: User; hasActiveSub: boolean }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const links = [
    { href: '/dashboard', label: 'Leads' },
    { href: '/dashboard/settings', label: 'Settings' },
    { href: '/dashboard/billing', label: 'Billing' },
  ]

  return (
    <header style={{ background: 'white', borderBottom: '1px solid var(--line)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', height: 64 }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: '"Inter Tight"', fontWeight: 600, fontSize: 16, color: 'var(--navy-900)', letterSpacing: '-0.01em', marginRight: 32 }}>
          <span style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--navy)', display: 'grid', placeItems: 'center', color: 'white', position: 'relative' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21V12h6v9"/></svg>
            <span style={{ position: 'absolute', width: 6, height: 6, borderRadius: 2, background: 'var(--orange)', right: -2, bottom: -2, boxShadow: '0 0 0 2px white' }} />
          </span>
          ListingAssistant
        </Link>

        <nav style={{ display: 'flex', gap: 4, flex: 1 }}>
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} style={{
                padding: '6px 14px', borderRadius: 7, fontSize: 14, fontWeight: 500,
                color: active ? 'var(--navy)' : 'var(--ink-70)',
                background: active ? 'var(--navy-50)' : 'transparent',
                transition: 'background .15s, color .15s',
              }}>
                {label}
              </Link>
            )
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {!hasActiveSub && (
            <Link href="/dashboard/billing" style={{ padding: '7px 14px', background: 'var(--orange)', color: 'white', borderRadius: 7, fontSize: 13, fontWeight: 500 }}>
              Upgrade →
            </Link>
          )}
          <div style={{ fontSize: 13, color: 'var(--ink-50)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
          <button onClick={handleLogout} style={{ padding: '7px 12px', border: '1px solid var(--line)', borderRadius: 7, fontSize: 13, color: 'var(--ink-70)', background: 'white', cursor: 'pointer' }}>
            Log out
          </button>
        </div>
      </div>
    </header>
  )
}
