import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUserCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserCaseRequest): Promise<AuthenticateUserCaseResponse> {
    const user = await this.usersRepository.findUserByEmail(email)

    if (!user) throw new InvalidCredentialsError()

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) throw new InvalidCredentialsError()

    return {
      user,
    }
  }
}
