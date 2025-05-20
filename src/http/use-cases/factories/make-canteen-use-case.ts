import { PrismaCanteenRepository } from '@/repositories/prisma/prisma-canteen-repository'
import { CreateCanteenUseCase } from '../create-canteen'

export function makeCanteenUseCase() {
  const prismaCanteenRepository = new PrismaCanteenRepository()
  const canteenUseCase = new CreateCanteenUseCase(prismaCanteenRepository)

  return canteenUseCase
}
