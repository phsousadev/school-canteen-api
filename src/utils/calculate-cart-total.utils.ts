import { CartItem } from '@prisma/client'

export function calculateCartTotals(items: CartItem[]): {
  totalItems: number
  totalPrice: number
} {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.unitPrice.toNumber() * item.quantity,
    0,
  )
  return { totalItems, totalPrice: parseFloat(totalPrice.toFixed(2)) }
}
