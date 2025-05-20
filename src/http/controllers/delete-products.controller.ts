import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDeleteProductsUseCase } from '../use-cases/factories/make-delete-product-use-case'

export async function deleteProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteParamsSchema = z.object({
    productId: z.string().uuid(),
  })

  const { productId } = deleteParamsSchema.parse(request.params)

  try {
    const deleteProductUseCase = makeDeleteProductsUseCase()

    await deleteProductUseCase.execute({ productId })

    return reply.status(204).send()
  } catch (err) {
    return reply.status(500).send({ message: 'Error deleting product.' })
  }
}
