import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1100,
  margin: '0 auto',
})

export const Icon = styled('div', {
  display: 'flex',
  width: '3rem',
  height: '3rem',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,

  backgroundColor: '$gray800',
})
