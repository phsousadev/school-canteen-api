import { Cart, CartItem, Prisma } from '@prisma/client'
import { CartsRepository } from '../carts-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCartsRepository implements CartsRepository {
  async findByUserId(
    userId: string,
  ): Promise<(Cart & { items: CartItem[] }) | null> {
    let cart: (Cart & { items: CartItem[] }) | null =
      await prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
      })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: true },
      })
    }

    return cart
  }

  async addItemOrUpdateQuantity(
    userId: string,
    productId: string,
    quantityToAdd: number,
    unitPrice: Prisma.Decimal,
  ): Promise<Cart & { items: CartItem[] }> {
    const cart = (await this.findByUserId(userId)) as Cart & {
      items: CartItem[]
    }

    const cartItem: CartItem | undefined = cart.items.find(
      (item) => item.productId === productId,
    )

    if (cartItem) {
      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantityToAdd },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: quantityToAdd,
          unitPrice,
        },
      })
    }

    return this.findByUserId(userId) as Promise<Cart & { items: CartItem[] }>
  }

  async updateItemQuantity(
    userId: string,
    productId: string,
    newQuantity: number,
  ): Promise<(Cart & { items: CartItem[] }) | null> {
    const cart = await this.findByUserId(userId)
    if (!cart) return null

    const cartItem: CartItem | undefined = cart.items.find(
      (item) => item.productId === productId,
    )
    if (!cartItem) return null

    if (newQuantity <= 0) {
      await prisma.cartItem.delete({
        where: { id: cartItem.id },
      })
    } else {
      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: newQuantity },
      })
    }
    return this.findByUserId(userId)
  }

  async removeItem(
    userId: string,
    productId: string,
  ): Promise<(Cart & { items: CartItem[] }) | null> {
    const cart = await this.findByUserId(userId)

    if (!cart) return null

    console.log(typeof productId)

    const cartItem: CartItem | undefined = cart.items.find(
      (item) => item.id === productId,
    )

    if (!cartItem) return null

    await prisma.cartItem.delete({
      where: { id: cartItem.id },
    })

    return this.findByUserId(userId)
  }

  async clearCart(userId: string): Promise<void> {
    const cart = await this.findByUserId(userId)
    if (!cart) return

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })
  }

  async deleteCart(userId: string): Promise<void> {
    const cart: Cart | null = await prisma.cart.findUnique({
      where: { userId },
    })

    if (!cart) return

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })
    await prisma.cart.delete({
      where: { id: cart.id },
    })
  }
}
