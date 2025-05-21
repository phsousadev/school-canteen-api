import { Order, OrderStatus, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrdersRepository } from '../orders-repository'

export class PrismaOrdersRepository implements OrdersRepository {
  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    const order = await prisma.order.create({
      data,
    })

    return order
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    })

    return order
  }

  async listOrders(userId?: string, status?: OrderStatus): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: {
        ...(userId && { userId }),
        ...(status && { status }),
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return orders
  }
}
