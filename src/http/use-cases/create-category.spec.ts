import { describe, it, expect, beforeEach } from 'vitest'
import { CreateCategoryUseCase } from './create-category'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error'

let categoriesRepository: InMemoryCategoriesRepository
let sut: CreateCategoryUseCase

describe('Create Category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreateCategoryUseCase(categoriesRepository)
  })

  it('should be able to create a new category', async () => {
    const category = await categoriesRepository.create({ name: 'Snacks' })

    expect(category).toHaveProperty('id')
    expect(category.name).toBe('Snacks')
  })

  it('should not allow creating a category with a duplicate name', async () => {
    categoriesRepository.create({ name: 'Drinks' })

    await expect(() => sut.execute({ name: 'Drinks' })).rejects.toBeInstanceOf(
      CategoryAlreadyExistsError,
    )
  })
})
