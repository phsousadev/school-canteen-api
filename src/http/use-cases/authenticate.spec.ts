import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { env } from '@/env'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('it should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Carter',
      email: 'john.carter@example.com',
      password: await hash('123456', env.ROUNDS_HASH_GENERATOR),
      role: 'STUDENT',
      phone: '+14085551234',
    })

    const { user } = await sut.execute({
      email: 'john.carter@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('it not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'john.carter@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('it should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Carter',
      email: 'john.carter@example.com',
      password: await hash('123456', env.ROUNDS_HASH_GENERATOR),
      role: 'STUDENT',
      phone: '+14085551234',
    })

    expect(() =>
      sut.execute({
        email: 'john.carter@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
