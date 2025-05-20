import { Prisma, Product } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ProductsRepository } from '../products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const product = await prisma.product.create({
      data,
    })

    return product
  }

  async listProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany()
    return products
  }

  async findProductById(productId: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    return product
  }

  async findProductByName(name: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: { name },
    })

    return product
  }

  async listProductsByCategory(categoryId?: string): Promise<Product[]> {
    return await prisma.product.findMany({
      where: categoryId ? { categoryId } : undefined,
    })
  }

  async update(
    productId: string,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data,
    })

    return updatedProduct
  }

  async delete(productId: string): Promise<void> {
    await prisma.product.delete({
      where: { id: productId },
    })
  }
}
