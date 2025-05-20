import { ProductsRepository } from '@/repositories/products-repository'
import { Prisma, Product } from '@prisma/client'

interface UpdateProductUseCaseRequest {
  productId: string
  data: Prisma.ProductUpdateInput
}

interface UpdateProductUseCaseResponse {
  product: Product
}

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
    data,
  }: UpdateProductUseCaseRequest): Promise<UpdateProductUseCaseResponse> {
    const product = await this.productsRepository.update(productId, data)

    return { product }
  }
}
