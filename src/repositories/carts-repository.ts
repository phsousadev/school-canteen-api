import { Prisma, Cart, CartItem } from '@prisma/client'

export interface CartsRepository {
  findByUserId(userId: string): Promise<(Cart & { items: CartItem[] }) | null>

  addItemOrUpdateQuantity(
    userId: string,
    productId: string,
    quantity: number,
    unitPrice: Prisma.Decimal,
  ): Promise<Cart & { items: CartItem[] }>

  updateItemQuantity(
    userId: string,
    productId: string,
    newQuantity: number,
  ): Promise<(Cart & { items: CartItem[] }) | null>

  removeItem(
    userId: string,
    productId: string,
  ): Promise<(Cart & { items: CartItem[] }) | null>

  clearCart(userId: string): Promise<void>

  deleteCart(userId: string): Promise<void>
}
