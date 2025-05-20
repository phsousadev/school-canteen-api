import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListProductsUseCase } from '../use-cases/factories/make-list-products-use-case'

interface ListProductsQuery {
  categoryId?: string
}

export async function listProductsController(
  request: FastifyRequest<{ Querystring: ListProductsQuery }>,
  reply: FastifyReply,
) {
  try {
    const productUseCase = makeListProductsUseCase()

    const { categoryId } = request.query

    const products = await productUseCase.execute({ categoryId })

    return reply.status(200).send(products)
  } catch (err) {
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
