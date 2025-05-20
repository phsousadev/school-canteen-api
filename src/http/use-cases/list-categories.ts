import { Category } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { CategoriesRepository } from '@/repositories/categories-repository'

interface ListCategoriesResponse {
  categories: Category[]
}

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<ListCategoriesResponse> {
    const categories = await this.categoriesRepository.listCategories()

    if (!categories) throw new ResourceNotFoundError()

    return {
      categories,
    }
  }
}
