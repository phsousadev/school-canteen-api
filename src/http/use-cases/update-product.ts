import {
  ProductsRepository,
  UpdateProductInput,
} from '@/repositories/products-repository'
import { Product } from '@prisma/client'

interface UpdateProductUseCaseRequest {
  productId: string
  data: UpdateProductInput
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
