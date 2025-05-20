import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { env } from '@/env'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get profile user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('it should be to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Carter',
      email: 'john.carter@example.com',
      password: await hash('123456', env.ROUNDS_HASH_GENERATOR),
      role: 'STUDENT',
      phone: '+14085551234',
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Carter')
  })

  it('it should be to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        userId: 'non-exists-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
