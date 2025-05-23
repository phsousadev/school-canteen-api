import { Cart, CartItem } from '@prisma/client'
import { CartsRepository } from '@/repositories/carts-repository'
import { ProductsRepository } from '@/repositories/products-repository'
import { OrdersRepository } from '@/repositories/orders-repository'
import { ProductNotFoundError } from './errors/product-not-found-error'
import { CartEmptyError } from './errors/cart-empty-error'
import { Decimal } from '@prisma/client/runtime/library'
import { CartNotfoundAndNotRemoval } from './errors/cart-not-found-and-not-removal-error'

interface AddItemToCartUseCaseRequest {
  userId: string
  productId: string
  quantity: number
}

interface UpdateItemQuantityUseCaseRequest {
  userId: string
  productId: string
  newQuantity: number
}

interface RemoveItemFromCartUseCaseRequest {
  userId: string
  productId: string
}

interface GetCartUseCaseRequest {
  userId: string
}

interface CheckoutCartUseCaseRequest {
  userId: string
}

interface CartUseCaseResponse {
  cart: Cart & { items: CartItem[] }
}

interface CheckoutUseCaseResponse {
  orderId: string
  orderStatus: string
  totalPrice: number
  itemsCount: number
}

export class ShoppingCartUseCase {
  constructor(
    private cartsRepository: CartsRepository,
    private productsRepository: ProductsRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async addItem({
    userId,
    productId,
    quantity,
  }: AddItemToCartUseCaseRequest): Promise<CartUseCaseResponse> {
    const product = await this.productsRepository.findProductById(productId)

    if (!product) {
      throw new ProductNotFoundError()
    }

    const updatedCart = await this.cartsRepository.addItemOrUpdateQuantity(
      userId,
      productId,
      quantity,
      product.price,
    )

    return {
      cart: updatedCart,
    }
  }

  async getCart({
    userId,
  }: GetCartUseCaseRequest): Promise<CartUseCaseResponse> {
    const cart = await this.cartsRepository.findByUserId(userId)

    if (!cart) {
      throw new CartNotfoundAndNotRemoval()
    }

    return {
      cart,
    }
  }

  async updateItemQuantity({
    userId,
    productId,
    newQuantity,
  }: UpdateItemQuantityUseCaseRequest): Promise<CartUseCaseResponse | null> {
    const updatedCart = await this.cartsRepository.updateItemQuantity(
      userId,
      productId,
      newQuantity,
    )

    if (!updatedCart) {
      throw new CartNotfoundAndNotRemoval()
    }

    return {
      cart: updatedCart,
    }
  }

  async removeItem({
    userId,
    productId,
  }: RemoveItemFromCartUseCaseRequest): Promise<CartUseCaseResponse | null> {
    const updatedCart = await this.cartsRepository.removeItem(userId, productId)

    if (!updatedCart) {
      throw new CartNotfoundAndNotRemoval()
    }

    return {
      cart: updatedCart,
    }
  }

  async checkout({
    userId,
  }: CheckoutCartUseCaseRequest): Promise<CheckoutUseCaseResponse> {
    const cart = await this.cartsRepository.findByUserId(userId)

    if (!cart || cart.items.length === 0) {
      throw new CartEmptyError()
    }

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.unitPrice.toNumber() * item.quantity,
      0,
    )

    const order = await this.ordersRepository.create({
      user: { connect: { id: userId } },
      status: 'PENDING',
      items: {
        create: cart.items.map((item) => ({
          product: { connect: { id: item.productId } },
          quantity: item.quantity,
          unitPrice: new Decimal(item.unitPrice),
        })),
      },
    })

    await this.cartsRepository.clearCart(userId)

    return {
      orderId: order.id,
      orderStatus: order.status,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      itemsCount: totalItems,
    }
  }
}
