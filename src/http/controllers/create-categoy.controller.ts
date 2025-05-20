import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCategoryUseCase } from '../use-cases/factories/make-category-use-case'
import { CategoryAlreadyExistsError } from '../use-cases/errors/category-already-exists-error'

export async function createCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const categoryBodySchema = z.object({
    name: z.string(),
  })

  const { name } = categoryBodySchema.parse(request.body)

  try {
    const categoryUseCase = makeCategoryUseCase()

    await categoryUseCase.execute({
      name,
    })
  } catch (err) {
    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
