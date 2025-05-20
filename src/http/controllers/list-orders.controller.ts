import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListOrdersUseCase } from '../use-cases/factories/make-list-orders-use-case'

interface ListOrdersQuery {
  userId?: string
}

export async function listOrdersController(
  request: FastifyRequest<{ Querystring: ListOrdersQuery }>,
  reply: FastifyReply,
) {
  try {
    const orderUseCase = makeListOrdersUseCase()

    const { userId } = request.query

    const orders = await orderUseCase.execute({ userId })

    return reply.status(200).send(orders)
  } catch (err) {
    console.error(err)
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
