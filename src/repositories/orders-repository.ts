import { Prisma, Order, OrderStatus } from '@prisma/client'

export interface OrdersRepository {
  create(data: Prisma.OrderCreateInput): Promise<Order>
  findById(id: string): Promise<Order | null>
  listOrders(userId?: string, status?: OrderStatus): Promise<Order[]>
}
