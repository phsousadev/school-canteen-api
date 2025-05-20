import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListProductsUseCase } from '../use-cases/factories/make-list-products-use-case'

export async function listProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const productUseCase = makeListProductsUseCase()

    const products = await productUseCase.execute()

    return products
  } catch (err) {}

  return reply.status(201).send()
}
