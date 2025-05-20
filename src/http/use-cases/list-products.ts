import { Product } from '@prisma/client'
import { ProductsRepository } from '@/repositories/products-repository'

interface ListProductsRequest {
  categoryId?: string
}

interface ProductFormatted extends Omit<Product, 'price'> {
  price: string
}

interface ListProductsResponse {
  products: ProductFormatted[]
}

export class ListProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    categoryId,
  }: ListProductsRequest = {}): Promise<ListProductsResponse> {
    let products: Product[]

    if (categoryId) {
      products =
        await this.productsRepository.listProductsByCategory(categoryId)
    } else {
      products = await this.productsRepository.listProducts()
    }

    const productsFormatted = products.map((product) => ({
      ...product,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(product.price)),
    }))

    return {
      products: productsFormatted,
    }
  }
}
