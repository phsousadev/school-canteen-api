import type { Category } from '@prisma/client'
import { CategoriesRepository } from '@/repositories/categories-repository'
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error'

interface CategoryUseCaseRequest {
  name: string
}

interface CategoryUseCaseResponse {
  category: Category
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    name,
  }: CategoryUseCaseRequest): Promise<CategoryUseCaseResponse> {
    const category = await this.categoriesRepository.create({
      name,
    })

    const categoryAlreadyExists =
      await this.categoriesRepository.findCategoryByName(name)

    if (categoryAlreadyExists) throw new CategoryAlreadyExistsError()

    return {
      category,
    }
  }
}
