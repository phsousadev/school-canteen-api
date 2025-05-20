import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Carter',
      email: 'john.carter@example.com',
      password: '123456',
      phone: '+5586992269188',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Carter',
      email: 'john.carter@example.com',
      password: '123456',
      phone: '+5586992269188',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same twice', async () => {
    const email = 'john.carter@example.com'

    await sut.execute({
      name: 'John Carter',
      email,
      password: '123456',
      phone: '+5586992269188',
    })

    await expect(() =>
      sut.execute({
        name: 'John Carter',
        email,
        password: '123456',
        phone: '+5586992269188',
      }),
    ).rejects.toBeInstanceOf(UserAlredyExistsError)
  })
})
