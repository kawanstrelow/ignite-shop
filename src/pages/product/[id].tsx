import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext'
import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import { ShoppingCartDialog } from '../components/ShoppingCartDialog'
// import { ShoppingCartDialogContainer } from '../components/ShoppingCartDialog/styles'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    defaultPriceId: string
    sku: string
    currency: string
  }
}

// interface ProductProps {
//   product: {
//     id: string
//     name: string
//     imageUrl: string
//     price: string
//     description: string
//     defaultPriceId: string
//   }
// }

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart()

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const { showShoppingCartContainer, handleShoppingCartContainer } = useContext(ShoppingCartContext)

  useEffect(() => {
  }, [showShoppingCartContainer])

  function handleShowOrHideShoppingCart(param?: string) {
        handleShoppingCartContainer(param)
  }

  async function handleAddProductToCart() {
    const productdata = {
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      description: product.description,
      defaultPriceId: product.defaultPriceId,
      sku: 'teste',
    }

    try {
      addItem(product, { count: 1 })
      handleShowOrHideShoppingCart('open')
    } catch (err) {
      alert('Falha ao adicionar o produto no carrinho')
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} - Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleAddProductToCart}
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
      {showShoppingCartContainer ? <ShoppingCartDialog /> : ''}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_MvKyxsh9vnp2ui' } }],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = String(params!.id)

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
