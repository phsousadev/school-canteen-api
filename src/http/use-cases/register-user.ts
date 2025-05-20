import { env } from '@/env'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'
import type { User } from '@prisma/client'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const password_hash = await hash(password, env.ROUNDS_HASH_GENERATOR)

    const userWithSameEmail = await this.usersRepository.findUserByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlredyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      phone,
      role: 'STUDENT',
      password: password_hash,
    })

    return {
      user,
    }
  }
}
