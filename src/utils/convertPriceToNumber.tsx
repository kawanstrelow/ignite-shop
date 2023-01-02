export function convertPriceToNumber(price: string) {
  const priceToNumber = price.replace('R$ ', '').replace(',', '.')
  return priceToNumber
}