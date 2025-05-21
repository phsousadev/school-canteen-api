import { Order, OrderStatus, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrderResponse, OrdersRepository } from '../orders-repository'

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

  async listOrders(
    userId?: string,
    status?: OrderStatus,
  ): Promise<OrderResponse[]> {
    const orders = await prisma.order.findMany({
      where: {
        ...(userId && { userId }),
        ...(status && { status }),
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },

        items: {
          select: {
            id: true,
            quantity: true,
            unitPrice: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return orders
  }
}
