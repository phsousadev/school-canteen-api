import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateProductsUseCase } from '../use-cases/factories/make-update-product-use-case'

export async function updateProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    productId: z.string().uuid(),
  })

  const bodySchema = z.object({
    name: z.string(),
    price: z.number(),
    categoryId: z.string(),
    canteenId: z.string(),
  })

  const { productId } = paramsSchema.parse(request.params)
  const data = bodySchema.parse(request.body)

  try {
    const productUseCase = makeUpdateProductsUseCase()

    const { product } = await productUseCase.execute({
      productId,
      data,
    })

    return reply.status(200).send(product)
  } catch (err) {
    throw new Error()
  }
}
