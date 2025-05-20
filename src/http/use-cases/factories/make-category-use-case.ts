import { PrismaCategoriesReporitory } from '@/repositories/prisma/prisma-categories-repository'
import { CategoryUseCase } from '../create-category'

export function makeCategoryUseCase() {
  const prismaCategoryRepository = new PrismaCategoriesReporitory()
  const categoryUseCase = new CategoryUseCase(prismaCategoryRepository)

  return categoryUseCase
}
