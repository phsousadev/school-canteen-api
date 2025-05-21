import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListCanteensUseCase } from '../use-cases/factories/make-list-canteens-use-case'

export async function listCanteensController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const canteenuseCase = makeListCanteensUseCase()

    const canteens = await canteenuseCase.execute()

    return canteens
  } catch (err) {}

  return reply.status(201).send()
}
