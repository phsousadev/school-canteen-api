import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListOrdersUseCase } from '../use-cases/factories/make-list-orders-use-case'

export async function listOrdersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const orderUseCase = makeListOrdersUseCase()

    const orders = await orderUseCase.execute()

    return orders
  } catch (err) {}

  return reply.status(201).send()
}
