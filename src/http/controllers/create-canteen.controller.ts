import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCanteenUseCase } from '../use-cases/factories/make-canteen-use-case'
import { CanteenAlreadyExistsError } from '../use-cases/errors/canteen-already-exists-error'

export async function createCanteenController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const canteenBodySchema = z.object({
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const { name, latitude, longitude } = canteenBodySchema.parse(request.body)

  try {
    const canteenUseCase = makeCanteenUseCase()

    await canteenUseCase.execute({
      name,
      latitude,
      longitude,
    })
  } catch (err) {
    if (err instanceof CanteenAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
