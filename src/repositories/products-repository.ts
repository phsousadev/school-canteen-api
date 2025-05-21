import { Prisma, Product } from '@prisma/client'

export interface UpdateProductInput {
  name: string
  price: number
  categoryId: string
  canteenId: string
}

export interface ProductsRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>
  listProducts(): Promise<Product[]>
  listProductsByCategory(categoryId?: string): Promise<Product[]>
  findProductById(productId: string): Promise<Product | null>
  findProductByName(name: string): Promise<Product | null>
  update(productId: string, data: UpdateProductInput): Promise<Product>
  delete(productId: string): Promise<void>
}
