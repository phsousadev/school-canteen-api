import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>
  listProducts(): Promise<Product[]>
  listProductsByCategory(categoryId?: string): Promise<Product[]>
  findProductById(productId: string): Promise<Product | null>
  findProductByName(name: string): Promise<Product | null>
}
