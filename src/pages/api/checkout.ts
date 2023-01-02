import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cartProducts } = req.body

  const checkoutProductsAdjusted = cartProducts

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!checkoutProductsAdjusted) {
    return res.status(400).json({ error: 'Data not found.' })
  }

  const checkoutProducts = []

  for (let product of checkoutProductsAdjusted) {
    checkoutProducts.push({
      price: product.defaultPriceId,
      quantity: product.quantity,
    })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: checkoutProducts,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
