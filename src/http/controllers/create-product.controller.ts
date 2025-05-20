import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeProductUseCase } from '../use-cases/factories/make-products-use-case'
import { ProductAlreadyExistsError } from '../use-cases/errors/product-already-exists-error'

export async function createProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const productBodySchema = z.object({
    name: z.string(),
    price: z.number(),
    categoryId: z.string(),
    canteenId: z.string(),
  })

  const { name, price, categoryId, canteenId } = productBodySchema.parse(
    request.body,
  )

  try {
    const productUseCase = makeProductUseCase()

    await productUseCase.execute({
      name,
      price,
      categoryId,
      canteenId,
    })
  } catch (err) {
    if (err instanceof ProductAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
