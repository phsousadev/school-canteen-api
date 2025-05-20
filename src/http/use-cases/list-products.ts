import { Product } from '@prisma/client'
import { ProductsRepository } from '@/repositories/products-repository'

interface ListProductsResponse {
  products: Product[]
}

export class ListProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<ListProductsResponse> {
    const products = await this.productsRepository.listProducts()

    return {
      products,
    }
  }
}
