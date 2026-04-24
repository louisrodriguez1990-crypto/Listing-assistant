import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BillingClient from './BillingClient'

export const dynamic = 'force-dynamic'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 28px' }}>
      <h1 style={{ fontSize: 24, letterSpacing: '-0.03em', marginBottom: 4 }}>Billing</h1>
      <p style={{ color: 'var(--ink-50)', fontSize: 14, marginBottom: 28 }}>Manage your ListingAssistant subscription.</p>

      <BillingClient
        status={sub?.status ?? 'inactive'}
        periodEnd={sub?.current_period_end ?? null}
        hasCustomer={!!sub?.stripe_customer_id}
      />
    </div>
  )
}
