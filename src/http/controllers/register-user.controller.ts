import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUserUseCase } from '../use-cases/register-user'
import { PrismaUsersReporitory } from '@/repositories/prisma/prisma-users-repository'
import { UserAlredyExistsError } from '../use-cases/errors/user-alredy-exists-error'

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    password: z.string().min(6),
  })

  const { name, email, password, phone } = registerBodySchema.parse(
    request.body,
  )

  try {
    const prismaUsersRepository = new PrismaUsersReporitory()
    const registerUserUseCase = new RegisterUserUseCase(prismaUsersRepository)

    await registerUserUseCase.execute({
      name,
      email,
      phone,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlredyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
