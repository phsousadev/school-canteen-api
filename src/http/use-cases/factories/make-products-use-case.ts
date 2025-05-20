import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { CreateProductUseCase } from '../create-product'

export function makeProductUseCase() {
  const prismaProductRepository = new PrismaProductsRepository()
  const categoryUseCase = new CreateProductUseCase(prismaProductRepository)

  return categoryUseCase
}
