import { styled } from "../../../styles";


export const Icon = styled('div', {
    display: 'flex',
    width: '3rem',
    height: '3rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    cursor: 'pointer',
    position: 'relative',
  
    backgroundColor: '$gray800',

    span: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '1.5rem',
      height: '1.5rem',
      background: '$green500',
      color: '$white',
      borderRadius: '100%',
      border: '3px solid $gray900',
      padding: 0,
      fontWeight: 'bold',
      fontSize: '0.875rem',

      right: 'calc(0px - 12px)',
      top: 'calc(0px - 12px)',
    }
  })