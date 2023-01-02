import { styled } from "../../../styles"



export const ShoppingCartContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  right: 0,
  top: 0,
  height: '100vh',
  width: 480,
  padding: '4.5rem 3rem 3rem 3rem',
  background: '$gray800',

  button: {
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    marginTop: '3.5rem',
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})

export const CloseShoppingCartContainerButton = styled('div', {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    width: '1.5rem',
    height: '1.5rem',
    color: '#8D8D99',
    cursor: 'pointer'
})

export const ShoppingCartQuantifyInfo = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 'auto',

    h3: {
        fontWeight: '1rem',
        color: '$gray100',
        lineHeight: '1.6rem'
    },

    span: {
        fontWeight: '$md',
        color: '$gray300',
        lineHeight: '1.8rem'
    }
})

export const ShoppingCartTotalValueInfo = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',

    h3: {
        fontSize: '$md',
        color: '$gray100',
        lineHeight: '1.6rem'
    },

    span: {
        fontSize: '$xl',
        color: '$gray100',
        lineHeight: '2.1rem'
    }
})

export const CartItemsContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '2rem'
})
