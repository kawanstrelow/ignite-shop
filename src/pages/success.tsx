import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { ImageContainer, ImagesContainer, SuccessContainer } from '../styles/pages/success'
import { useShoppingCart } from 'use-shopping-cart'
import { useEffect } from 'react'

interface SuccessProps {
  customerName: string
  productsList: [],
  quantityItems: number
}

export default function Success({ customerName, productsList, quantityItems }: SuccessProps) {

  useEffect(() => {
    clearCart()
  }, [])

  const {clearCart} = useShoppingCart()

  return (
    <>
      <Head>
        <title>Compra efetuada - Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

      <ImagesContainer>
        {productsList.map(item => 
          <ImageContainer>
            <Image src={item.imgUrl} width={120} height={110} alt={''} />
          </ImageContainer>
        )}
      </ImagesContainer>
        

        <p>
          Uhuul <strong>{customerName}</strong>, suas compras<br></br>
          de {quantityItems} camisetas já estão a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }



  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })
  
  let productsList = []
  let quantityItems = 0
  
  for (let product of session.line_items!.data) {
      const prod = product.price!.product as Stripe.Product
      const productItem = {
        imgUrl: String(prod.images)
      }
      productsList.push(productItem)
      quantityItems = quantityItems + product.quantity!
  }

  const customerName = session.customer_details!.name

    return {
    props: {
      customerName,
      productsList,
      quantityItems
    },
  }
}
