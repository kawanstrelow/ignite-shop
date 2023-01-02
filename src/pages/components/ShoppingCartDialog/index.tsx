import axios from "axios";
import { X } from "phosphor-react";
import { useContext, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import { convertPriceToNumber } from "../../../utils/convertPriceToNumber";
import { CartItems } from "./CartItems";
import { CartItemsContainer, CloseShoppingCartContainerButton, ShoppingCartContainer, ShoppingCartQuantifyInfo, ShoppingCartTotalValueInfo } from "./styles";

export function ShoppingCartDialog() {

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    const { cartDetails } = useShoppingCart()
    const cartProducts = Object.values(Object(cartDetails))

    const { handleShoppingCartContainer } = useContext(ShoppingCartContext)

    function handleCloseShoppingCart() {
        handleShoppingCartContainer('close')
    }

    function calcTotal(data: any) {
        let total = 0

        for (let item of data) {
            let price = Number(convertPriceToNumber(item.price))
            let quantity = item.quantity

            total = total + (price * quantity)
        }

        return total.toFixed(2).replace('.',',')
    }

    function calcQuantity(data: any) {
        let total = 0
        for (let item of data) {
            let quantity = item.quantity
            total = total + quantity
        }
        return total
    }

    async function handleCheckout() {
        try {
          setIsCreatingCheckoutSession(true)
          const response = await axios.post('/api/checkout', {
            cartProducts,
          })
          const { checkoutUrl } = response.data
          window.location.href = checkoutUrl
        } catch (err) {
          setIsCreatingCheckoutSession(false)
          alert('Falha ao redirecionar ao checkout')
        }
      }

    return (
        <ShoppingCartContainer>
            <CloseShoppingCartContainerButton onClick={handleCloseShoppingCart}>
                <X size={32} weight="bold" />
            </CloseShoppingCartContainerButton>
            <h1>Sacola de compras</h1>
            <CartItemsContainer>
                {cartProducts.map(item => 
                    <CartItems key={item.id} id={item.id} name={item.name} price={item.price} imgUrl={item.imageUrl} quantity={item.quantity} />
                )}
            </CartItemsContainer>

            <ShoppingCartQuantifyInfo>
                <h3>Quantidade</h3>
                <span>{calcQuantity(cartProducts)} item(s)</span>
            </ShoppingCartQuantifyInfo>
            <ShoppingCartTotalValueInfo>
                <h3>Valor total</h3>
                <span>R$ {cartProducts ? calcTotal(cartProducts) : '0,00'}</span>
            </ShoppingCartTotalValueInfo>

            <button disabled={isCreatingCheckoutSession} onClick={handleCheckout} >
                Finalizar compra
            </button>
        </ShoppingCartContainer>
    )
}