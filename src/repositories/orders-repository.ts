import { Prisma, Order } from '@prisma/client'

export interface OrdersRepository {
  create(data: Prisma.OrderCreateInput): Promise<Order>
  findById(id: string): Promise<Order | null>
  listOrders(): Promise<Order[]>
  findByUserId(userId: string): Promise<Order[]>
}
