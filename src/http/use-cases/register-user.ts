import { env } from '@/env'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
}
export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password, phone }: RegisterUserUseCaseRequest) {
    const password_hash = await hash(password, env.ROUNDS_HASH_GENERATOR)

    const userWithSameEmail = await this.usersRepository.findUserByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlredyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      phone,
      role: 'STUDENT',
      password: password_hash,
    })
  }
}
