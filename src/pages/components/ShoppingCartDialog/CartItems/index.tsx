import { CartItemContainer, CartItemDetails, CartItemImageContainer } from "./styles";
import Image from 'next/image'
import { useShoppingCart } from "use-shopping-cart";

interface CartItemsProps {
    id: string,
    name: string,
    price: string,
    imgUrl: string,
    quantity: number
}

export function CartItems({id, name, price, imgUrl, quantity}: CartItemsProps) {

    const { removeItem }= useShoppingCart()

    function handleRemoveItem() {
        removeItem(id)
    }

     return (
        <CartItemContainer>
            <CartItemImageContainer>
                <Image src={imgUrl} width={95} height={95} alt="" />
            </CartItemImageContainer>
            
            <CartItemDetails>
                <p>{`(${quantity}) ${name}`}</p>
                <h3>{price}</h3>
                <span onClick={handleRemoveItem}>Remover</span>
            </CartItemDetails>
        </CartItemContainer>
    )
}