import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is not set')
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-04-22.dahlia',
    })
  }
  return _stripe
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as any)[prop]
  },
})

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID!

export async function getOrCreateCustomer(userId: string, email: string, name?: string) {
  const s = getStripe()
  const existing = await s.customers.list({ email, limit: 1 })
  if (existing.data.length > 0) return existing.data[0]

  return s.customers.create({
    email,
    name,
    metadata: { supabase_user_id: userId },
  })
}

export async function createCheckoutSession(customerId: string, userId: string) {
  return getStripe().checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?subscribed=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    metadata: { user_id: userId },
    subscription_data: {
      metadata: { user_id: userId },
    },
  })
}

export async function createPortalSession(customerId: string) {
  return getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  })
}
