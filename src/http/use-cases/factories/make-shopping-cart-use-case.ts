import { PrismaCartsRepository } from '@/repositories/prisma/prisma-carts-repository'
import { ShoppingCartUseCase } from '../shopping-cart'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'

export function makeShoppingCartUseCase() {
  const prismaProductRepository = new PrismaProductsRepository()
  const prismaOrderRepository = new PrismaOrdersRepository()
  const prismaCartRepository = new PrismaCartsRepository()
  const cartUseCase = new ShoppingCartUseCase(
    prismaCartRepository,
    prismaProductRepository,
    prismaOrderRepository,
  )

  return cartUseCase
}
