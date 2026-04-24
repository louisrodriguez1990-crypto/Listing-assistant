import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendLeadFollowUpEmail } from '@/lib/resend'
import { sendLeadFollowUpSms } from '@/lib/twilio'

export const dynamic = 'force-dynamic'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function hasEnoughDigits(phone: string) {
  return phone.replace(/\D/g, '').length >= 7
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 })
  }

  const supabase = createServiceClient()

  // Verify token and get agent
  const { data: tokenRow, error: tokenErr } = await supabase
    .from('webhook_tokens')
    .select('user_id')
    .eq('token', token)
    .single()

  if (tokenErr || !tokenRow) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  // Check active subscription
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', tokenRow.user_id)
    .single()

  if (sub?.status !== 'active') {
    return NextResponse.json({ error: 'Subscription inactive' }, { status: 402 })
  }

  // Parse lead data
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { name, email, phone, source = 'webhook' } = body
  let { property_interest } = body

  // Validate required fields
  if (!name?.trim()) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
  }
  if (phone && !hasEnoughDigits(phone)) {
    return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
  }

  // Sanitize free-text field
  if (property_interest && property_interest.length > 500) {
    property_interest = property_interest.slice(0, 500)
  }

  // Get agent profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, phone')
    .eq('id', tokenRow.user_id)
    .single()

  const { data: authUser } = await supabase.auth.admin.getUserById(tokenRow.user_id)
  const agentEmail = authUser?.user?.email ?? ''
  const agentName = profile?.full_name || agentEmail.split('@')[0] || 'Your Agent'

  // Insert lead
  const { data: lead, error: insertErr } = await supabase
    .from('leads')
    .insert({
      agent_id: tokenRow.user_id,
      name: name.trim(),
      email: email?.trim() || null,
      phone: phone?.trim() || null,
      property_interest: property_interest || null,
      source,
    })
    .select()
    .single()

  if (insertErr || !lead) {
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }

  // Fire follow-ups in parallel
  const updates: Record<string, boolean> = {}

  const results = await Promise.allSettled([
    email
      ? sendLeadFollowUpEmail({ agentName, agentEmail, leadName: name.trim(), leadEmail: email, propertyInterest: property_interest })
          .then(() => { updates.email_sent = true })
      : Promise.resolve(),
    phone
      ? sendLeadFollowUpSms({ to: phone, agentName, leadName: name.trim(), propertyInterest: property_interest })
          .then(() => { updates.sms_sent = true })
      : Promise.resolve(),
  ])

  // Log any failures
  results.forEach((result, i) => {
    if (result.status === 'rejected') {
      console.error(`Lead follow-up ${i === 0 ? 'email' : 'SMS'} failed for lead ${lead.id}:`, result.reason)
    }
  })

  // Update DB: set sent flags and mark contacted if at least one notification went out
  if (Object.keys(updates).length > 0) {
    await supabase
      .from('leads')
      .update({ ...updates, status: 'contacted' })
      .eq('id', lead.id)
  }

  return NextResponse.json({ success: true, lead_id: lead.id }, { status: 201 })
}
