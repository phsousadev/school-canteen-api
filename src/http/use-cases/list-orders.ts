import { Order } from '@prisma/client'
import { OrdersRepository } from '@/repositories/orders-repository'

interface ListOrdersRequest {
  userId?: string
}

interface ListOrdersResponse {
  orders: Order[]
}

export class ListOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    userId,
  }: ListOrdersRequest = {}): Promise<ListOrdersResponse> {
    const orders = await this.ordersRepository.listOrders(userId)

    return {
      orders,
    }
  }
}
