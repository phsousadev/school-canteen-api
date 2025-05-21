import { Order, OrderStatus } from '@prisma/client'
import { OrdersRepository } from '@/repositories/orders-repository'

interface ListOrdersRequest {
  userId?: string
  status?: OrderStatus
}

interface ListOrdersResponse {
  orders: Order[]
}

export class ListOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    userId,
    status,
  }: ListOrdersRequest = {}): Promise<ListOrdersResponse> {
    const orders = await this.ordersRepository.listOrders(userId, status)

    return {
      orders,
    }
  }
}
