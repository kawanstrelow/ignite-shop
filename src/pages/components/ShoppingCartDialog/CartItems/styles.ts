import { styled } from "../../../../styles";

export const CartItemContainer = styled('div', {
    display: 'flex',
    marginBottom: '1.5rem'
})

export const CartItemDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    p: {
        color: '$gray300',
        fontSize: '$md',
        lineHeight: '1.8rem',
        marginBottom: '0.125rem'
    },

    h3: {
        color: '$gray100',
        fontSize: '$md',
        lineHeight: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem'
    },

    span: {
        color: '$green500',
        fontSize: '1rem',
        lineHeight: '1.6rem',
        fontWeight: 'bold',
        cursor: 'pointer'
    }
})

export const CartItemImageContainer = styled('div', {
    width: '6.375rem',
    height: '5.8125rem',
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    marginRight: '1.25rem',
    padding: '0.25rem',
  
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  
    img: {
      objectFit: 'cover',
    },
  })