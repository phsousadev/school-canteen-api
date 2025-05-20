import { Order } from '@prisma/client'
import { OrdersRepository } from '@/repositories/orders-repository'
import { ProductsRepository } from '@/repositories/products-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { ProductNotFoundError } from './errors/product-not-found-error'

interface OrderItemInput {
  productId: string
  quantity: number
  unitPrice: number
}

interface CreateOrderUseCaseRequest {
  userId: string
  items: OrderItemInput[]
}

interface CreateOrderUseCaseResponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    userId,
    items,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    for (const item of items) {
      const product = await this.productsRepository.findProductById(
        item.productId,
      )

      if (!product) {
        throw new ProductNotFoundError(
          `Product with ID ${item.productId} not found.`,
        )
      }
    }

    const order = await this.ordersRepository.create({
      user: { connect: { id: userId } },
      status: 'PENDING',
      items: {
        create: items.map((item) => ({
          product: { connect: { id: item.productId } },
          quantity: item.quantity,
          unitPrice: new Decimal(item.unitPrice),
        })),
      },
    })

    return {
      order,
    }
  }
}
