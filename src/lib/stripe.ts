import Stripe from 'stripe'

const SECRET_KEY: any = process.env.STRIPE_SECRET_KEY
export const PUBLIC_KEY: any = process.env.STRIPE_PUBLIC_KEY

export const stripe = new Stripe(SECRET_KEY, {
  apiVersion: '2022-11-15',
  appInfo: { name: 'Ignite-shop' },
})
