import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeOrderUseCase } from '../use-cases/factories/make-order-use-case'
import { ProductNotFoundError } from '../use-cases/errors/product-not-found-error'

export async function createOrderController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrderBodySchema = z.object({
    items: z
      .array(
        z.object({
          productId: z.string().uuid(),
          quantity: z.number().int().positive(),
          unitPrice: z.number().positive(),
        }),
      )
      .min(1),
  })

  const { items } = createOrderBodySchema.parse(request.body)

  const userId = request.user.sub

  try {
    const createOrderUseCase = makeOrderUseCase()

    const order = await createOrderUseCase.execute({
      userId,
      items,
    })

    return reply.status(201).send(order)
  } catch (err) {
    if (err instanceof ProductNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
