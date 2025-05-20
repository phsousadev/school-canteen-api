import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { env } from '@/env'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate User Use Case', () => {
  it('it should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: 'john.carter@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('it should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
