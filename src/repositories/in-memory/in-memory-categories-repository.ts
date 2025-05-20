import { Category, Prisma } from '@prisma/client'
import { CategoriesRepository } from '../categories-repository'
import { randomUUID } from 'crypto'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category: Category = {
      id: randomUUID(),
      name: data.name,
    }

    this.items.push(category)

    return category
  }

  async findCategoryById(id: string): Promise<Category | null> {
    const category = this.items.find((item) => item.id === id)
    return category ?? null
  }

  async findCategoryByName(name: string): Promise<Category | null> {
    const category = this.items.find((item) => item.name === name)
    return category ?? null
  }

  async listCategories(): Promise<Category[]> {
    return this.items
  }
}
