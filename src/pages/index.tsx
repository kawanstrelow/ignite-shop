import { HomeContainer, Icon, Product } from '../styles/pages/home'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import Image from 'next/image'
import { stripe } from '../lib/stripe'
import { GetStaticPaths, GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'
import Head from 'next/head'
import { Handbag } from 'phosphor-react'
import { useContext } from 'react'
import { ShoppingCartContext } from '../contexts/ShoppingCartContext'
import { ShoppingCartDialog } from './components/ShoppingCartDialog'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  
  const { handleShoppingCartContainer, showShoppingCartContainer } = useContext(ShoppingCartContext)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  function handleCloseShoppingCart() {
      handleShoppingCartContainer('close')
  }

  return (
    <>
      <Head>
        <title>Home - Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
              onClick={handleCloseShoppingCart}
            >
              <Product className="keen-slider__slide">
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt={''}
                />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <Icon>
                    <Handbag size={32} color={'#ffffff'} weight="bold"/>
                  </Icon>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
      {showShoppingCartContainer ? <ShoppingCartDialog /> : ''}

    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
