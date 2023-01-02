import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/logo.svg'
import { Container, Header, Icon } from '../styles/pages/app'
import Image from 'next/image'
import { Handbag } from 'phosphor-react'
import { CartProvider } from 'use-shopping-cart'
import { PUBLIC_KEY } from '../lib/stripe'
import { ShoppingCartContext, ShoppingCartContextProvider } from '../contexts/ShoppingCartContext'
import { useContext } from 'react'
import { HeaderContainer } from './components/Header'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <CartProvider
      mode="payment"
      cartMode="checkout-session"
      stripe={PUBLIC_KEY}
      currency="USD"
    >
      <ShoppingCartContextProvider>
        <Container>
          <Header>
            <HeaderContainer />
          </Header>
          <Component {...pageProps} />
        </Container>
      </ShoppingCartContextProvider>
    </CartProvider>
  )
}
