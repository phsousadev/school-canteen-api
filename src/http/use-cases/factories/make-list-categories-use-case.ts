import { PrismaCategoriesReporitory } from '@/repositories/prisma/prisma-categories-repository'
import { ListCategoriesUseCase } from '../list-categories'

export function makeListCategoriesUseCase() {
  const prismaCategoryRepository = new PrismaCategoriesReporitory()
  const categoryUseCase = new ListCategoriesUseCase(prismaCategoryRepository)

  return categoryUseCase
}
