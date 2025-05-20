import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { ListOrdersUseCase } from '../list-orders'

export function makeListOrdersUseCase() {
  const prismaOrderRepository = new PrismaOrdersRepository()
  const orderUseCase = new ListOrdersUseCase(prismaOrderRepository)

  return orderUseCase
}
