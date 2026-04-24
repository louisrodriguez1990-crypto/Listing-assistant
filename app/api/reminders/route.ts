import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendAgentReminderEmail } from '@/lib/resend'

export const dynamic = 'force-dynamic'

// Called by Vercel Cron every 15 minutes.
// Vercel automatically sends Authorization: Bearer <CRON_SECRET> when the env var is set.
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()

  // Leads >55 min old, not yet reminded, still actionable
  const cutoff = new Date(Date.now() - 55 * 60 * 1000).toISOString()
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .lte('created_at', cutoff)
    .eq('reminder_sent', false)
    .in('status', ['new', 'contacted'])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!leads || leads.length === 0) {
    return NextResponse.json({ processed: 0 })
  }

  let sent = 0
  let failed = 0

  for (const lead of leads) {
    try {
      const { data: authUser } = await supabase.auth.admin.getUserById(lead.agent_id)
      const agentEmail = authUser?.user?.email
      if (!agentEmail) continue

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', lead.agent_id)
        .single()

      const agentName = profile?.full_name || agentEmail.split('@')[0] || 'Agent'

      await sendAgentReminderEmail({
        agentEmail,
        agentName,
        leadName: lead.name,
        leadPhone: lead.phone,
        leadEmail: lead.email,
        propertyInterest: lead.property_interest,
        leadId: lead.id,
      })

      await supabase
        .from('leads')
        .update({ reminder_sent: true, status: 'reminder_sent' })
        .eq('id', lead.id)

      sent++
    } catch (err) {
      console.error(`Reminder failed for lead ${lead.id}:`, err)
      // Mark reminder_sent anyway to prevent infinite retry loops
      await supabase
        .from('leads')
        .update({ reminder_sent: true })
        .eq('id', lead.id)
      failed++
    }
  }

  return NextResponse.json({ processed: sent, failed })
}
