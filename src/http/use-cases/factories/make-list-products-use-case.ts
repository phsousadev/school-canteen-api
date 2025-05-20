import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { ListProductsUseCase } from '../list-products'

export function makeListProductsUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()
  const productUseCase = new ListProductsUseCase(prismaProductsRepository)

  return productUseCase
}
