import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeListOrdersUseCase } from '../use-cases/factories/make-list-orders-use-case'
import { OrderStatus } from '@prisma/client'

export async function listOrdersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const rawQuerySchema = z.object({
    status: z.string().optional(),
  })

  const validStatuses = [
    'PENDING',
    'IN_PREPARATION',
    'READY',
    'DELIVERED',
  ] as const

  try {
    const { status } = rawQuerySchema.parse(request.query)

    const userId = request.user.sub

    let parsedStatus: OrderStatus | undefined

    if (status) {
      const upperCased = status.toUpperCase()

      if (!validStatuses.includes(upperCased as OrderStatus)) {
        return reply.status(400).send({
          message: `Invalid status. Expected one of: ${validStatuses.join(', ')}`,
        })
      }

      parsedStatus = upperCased as OrderStatus
    }

    const orderUseCase = makeListOrdersUseCase()

    const orders = await orderUseCase.execute({
      userId,
      status: parsedStatus,
    })

    return reply.status(200).send(orders)
  } catch (err) {
    console.error(err)
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
