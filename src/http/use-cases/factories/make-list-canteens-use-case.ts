import { ListCanteensUseCase } from '../list-canteens'
import { PrismaCanteenRepository } from '@/repositories/prisma/prisma-canteen-repository'

export function makeListCanteensUseCase() {
  const prismaCanteensRepository = new PrismaCanteenRepository()
  const canteenUseCase = new ListCanteensUseCase(prismaCanteensRepository)

  return canteenUseCase
}
