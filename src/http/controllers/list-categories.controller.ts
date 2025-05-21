import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListCategoriesUseCase } from '../use-cases/factories/make-list-categories-use-case'

export async function listCategoriesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const productUseCase = makeListCategoriesUseCase()

    const categories = await productUseCase.execute()

    return categories
  } catch (err) {}

  return reply.status(201).send()
}
