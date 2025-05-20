import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'

let categoriesRepository: InMemoryCategoriesRepository

describe('List Categories', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
  })

  it('should return a list of categories with id and name only', async () => {
    await categoriesRepository.create({ name: 'Snacks' })
    await categoriesRepository.create({ name: 'Drinks' })
    await categoriesRepository.create({ name: 'Fruits' })

    const categories = await categoriesRepository.listCategories()

    expect(categories).toHaveLength(3)
    expect(categories[0]).toHaveProperty('id')
    expect(categories[0]).toHaveProperty('name')
    expect(categories[0]).not.toHaveProperty('createdAt')
  })
})
