import { API, apiEnv } from './env'
import { createPool } from './db'

// Stripe's REST API in test mode, called directly so the suite needs no Stripe SDK
async function stripeForm(path: string, fields: Record<string, string>) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiEnv().STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(fields),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(`stripe ${path}: ${json.error?.message}`)
  return json
}

// Saves a Stripe test card for a user the way the profile page does: the setup-intent call
// creates the user's Stripe customer, the test card is attached to it, then saved through the API
export async function saveTestCard(email: string, token: string, testToken: string, makeDefault: boolean) {
  const setup = await fetch(`${API}/payment-methods/setup-intent`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (setup.status !== 200) throw new Error(`setup-intent failed: ${setup.status}`)

  const db = createPool()
  let customer: string
  try {
    const row = await db.query('SELECT stripe_customer_id FROM users WHERE email = $1', [email])
    customer = row.rows[0].stripe_customer_id
  } finally {
    await db.end()
  }

  const method = await stripeForm('/payment_methods', { type: 'card', 'card[token]': testToken })
  await stripeForm(`/payment_methods/${method.id}/attach`, { customer })

  const saved = await fetch(`${API}/payment-methods/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ paymentMethodId: method.id, makeDefault }),
  })
  if (saved.status !== 201) throw new Error(`save card failed: ${saved.status}`)
  return method.id as string
}
