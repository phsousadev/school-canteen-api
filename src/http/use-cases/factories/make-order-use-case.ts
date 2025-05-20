import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { CreateOrderUseCase } from '../create-order'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'

export function makeOrderUseCase() {
  const prismaOrderRepository = new PrismaOrdersRepository()
  const prismaProductRepository = new PrismaProductsRepository()
  const orderRepository = new CreateOrderUseCase(
    prismaOrderRepository,
    prismaProductRepository,
  )

  return orderRepository
}
