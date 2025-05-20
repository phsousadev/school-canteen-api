import { env } from '@/env'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'
import type { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
}

interface RegisteUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
  }: RegisterUseCaseRequest): Promise<RegisteUseCaseResponse> {
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
