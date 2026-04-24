import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LeadsTable from '@/components/dashboard/LeadsTable'
import SubscriptionGate from '@/components/dashboard/SubscriptionGate'
import WebhookCard from '@/components/dashboard/WebhookCard'

export const dynamic = 'force-dynamic'

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ subscribed?: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: sub }, { data: leads }, { data: token }, { data: profile }] = await Promise.all([
    supabase.from('subscriptions').select('*').eq('user_id', user.id).single(),
    supabase.from('leads').select('*').eq('agent_id', user.id).order('created_at', { ascending: false }),
    supabase.from('webhook_tokens').select('token').eq('user_id', user.id).single(),
    supabase.from('profiles').select('full_name').eq('id', user.id).single(),
  ])

  const isActive = sub?.status === 'active'
  const params = await searchParams
  const justSubscribed = params.subscribed === 'true'

  return (
    <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 28px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, letterSpacing: '-0.03em' }}>
            {profile?.full_name ? `${profile.full_name}'s Leads` : 'Your Leads'}
          </h1>
          <p style={{ color: 'var(--ink-50)', fontSize: 14, marginTop: 4 }}>
            {leads?.length ?? 0} total lead{leads?.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { label: 'New', value: leads?.filter(l => l.status === 'new').length ?? 0, color: 'var(--orange)' },
            { label: 'Contacted', value: leads?.filter(l => l.status === 'contacted').length ?? 0, color: 'var(--ok)' },
            { label: 'Total', value: leads?.length ?? 0, color: 'var(--navy)' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 10, padding: '12px 18px', textAlign: 'center', minWidth: 80 }}>
              <div style={{ fontFamily: '"Inter Tight"', fontWeight: 600, fontSize: 24, color, letterSpacing: '-0.02em' }}>{value}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-50)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {justSubscribed && (
        <div style={{ background: '#E6F4EC', border: '1px solid #9BC8AC', borderRadius: 10, padding: '14px 20px', marginBottom: 24, color: 'var(--ok)', fontSize: 14, fontWeight: 500 }}>
          🎉 Subscription activated! You're all set. Your webhook is ready below.
        </div>
      )}

      {!isActive ? (
        <SubscriptionGate />
      ) : (
        <>
          <WebhookCard token={token?.token ?? ''} />

          <LeadsTable leads={leads ?? []} />
        </>
      )}
    </div>
  )
}
