import { Prisma, Product } from '@prisma/client'
import { ProductsRepository } from '@/repositories/products-repository'
import { ProductAlreadyExistsError } from './errors/product-already-exists-error'

interface ProductUseCaseRequest {
  name: string
  price: number
  categoryId: string
  canteenId: string
}

interface ProductUseCaseResponse {
  product: Product
}

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    price,
    categoryId,
    canteenId,
  }: ProductUseCaseRequest): Promise<ProductUseCaseResponse> {
    const productAlreadyExists =
      await this.productsRepository.findProductByName(name)

    if (productAlreadyExists) throw new ProductAlreadyExistsError()

    const product = await this.productsRepository.create({
      name,
      price: new Prisma.Decimal(price),
      category: {
        connect: { id: categoryId },
      },
      canteen: {
        connect: { id: canteenId },
      },
    })

    return {
      product,
    }
  }
}
