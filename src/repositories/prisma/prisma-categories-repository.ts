import { Prisma, Category } from '@prisma/client'
import { CategoriesRepository } from '../categories-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCategoriesReporitory implements CategoriesRepository {
  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category = await prisma.category.create({
      data,
    })

    return category
  }

  async findCategoryById(categoryId: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    })

    return category
  }

  async findCategoryByName(name: string): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        name,
      },
    })

    return category
  }
}
