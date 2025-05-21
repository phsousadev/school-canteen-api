import { PrismaUsersReporitory } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersReporitory()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
