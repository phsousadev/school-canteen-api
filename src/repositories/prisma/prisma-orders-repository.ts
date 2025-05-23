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
    return orders as unknown as OrderResponse[]
  }

  async createOrderWithItems(
    userId: string,
    items: { productId: string; quantity: number; unitPrice: Prisma.Decimal }[],
  ): Promise<Order> {
    const newOrder = await prisma.$transaction(async (prismaTx) => {
      const order = await prismaTx.order.create({
        data: {
          userId,
          status: 'PENDING',
        },
      })

      const orderItemsData = items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }))

      await prismaTx.orderItem.createMany({
        data: orderItemsData,
      })

      return order
    })

    return newOrder
  }
}
