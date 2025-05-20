import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>
  listProducts(): Promise<Product[]>
  listProductsByCategory(categoryId?: string): Promise<Product[]>
  findProductById(productId: string): Promise<Product | null>
  findProductByName(name: string): Promise<Product | null>
  update(productId: string, data: Prisma.ProductUpdateInput): Promise<Product>
  delete(productId: string): Promise<void>
}
