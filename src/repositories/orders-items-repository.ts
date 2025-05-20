import { Prisma, OrderItem } from '@prisma/client'

export interface OrderItemsRepository {
  create(data: Prisma.OrderItemCreateInput): Promise<OrderItem>
  findById(id: string): Promise<OrderItem | null>
  findByOrderId(orderId: string): Promise<OrderItem[]>
  listItems(): Promise<OrderItem[]>
}
