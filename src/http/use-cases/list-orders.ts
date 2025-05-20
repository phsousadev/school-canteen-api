import { Order } from '@prisma/client'
import { OrdersRepository } from '@/repositories/orders-repository'

interface ListOrdersResponse {
  orders: Order[]
}

export class ListOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(): Promise<ListOrdersResponse> {
    const orders = await this.ordersRepository.listOrders()

    return {
      orders,
    }
  }
}
