import { PrismaCategoriesReporitory } from '@/repositories/prisma/prisma-categories-repository'
import { CreateCategoryUseCase } from '../create-category'

export function makeCategoryUseCase() {
  const prismaCategoryRepository = new PrismaCategoriesReporitory()
  const categoryUseCase = new CreateCategoryUseCase(prismaCategoryRepository)

  return categoryUseCase
}
