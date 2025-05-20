import { OrderItem, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrderItemsRepository } from '../orders-items-repository'

export class PrismaOrderItemsRepository implements OrderItemsRepository {
  async create(data: Prisma.OrderItemCreateInput): Promise<OrderItem> {
    const item = await prisma.orderItem.create({
      data,
    })

    return item
  }

  async findById(id: string): Promise<OrderItem | null> {
    const item = await prisma.orderItem.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
        order: true,
      },
    })

    return item
  }

  async findByOrderId(orderId: string): Promise<OrderItem[]> {
    const items = await prisma.orderItem.findMany({
      where: {
        orderId,
      },
      include: {
        product: true,
      },
    })

    return items
  }

  async listItems(): Promise<OrderItem[]> {
    const items = await prisma.orderItem.findMany({
      include: {
        product: true,
        order: true,
      },
      orderBy: {
        order: {
          createdAt: 'desc',
        },
      },
    })

    return items
  }
}
