import { Category, Prisma } from '@prisma/client'

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>
  listCategories(): Promise<Category[]>
  findCategoryById(categoryId: string): Promise<Category | null>
  findCategoryByName(name: string): Promise<Category | null>
}
