import { Icon } from "./styles";
import Image from 'next/image'
import LogoImg from '../../../assets/logo.svg'
import { Handbag } from "phosphor-react";
import { useContext } from "react";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import { useShoppingCart } from "use-shopping-cart";

export function HeaderContainer() {

  const { cartDetails } = useShoppingCart()
  const cartProducts = Object.values(Object(cartDetails))

  const {
    handleShoppingCartContainer,
  } = useContext(ShoppingCartContext);

  function handleShowOrHideShoppingCart() {
        handleShoppingCartContainer('open')
  }

  function calcQuantity(data: any) {
    let total = 0
    for (let item of data) {
        let quantity = item.quantity
        total = total + quantity
    }
    return total
}

    return (
        <>
            <a href={'/'}>
              <Image src={LogoImg} alt="" />
            </a>
            <Icon onClick={handleShowOrHideShoppingCart}>
              <Handbag size={24} color={'#8D8D99'} weight="bold" />
              {calcQuantity(cartProducts) >= 1 ? <span>{calcQuantity(cartProducts)}</span> : ''}
            </Icon>

        </>
    )
}

