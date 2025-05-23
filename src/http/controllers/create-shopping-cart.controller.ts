import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ProductNotFoundError } from '../use-cases/errors/product-not-found-error'
import { makeShoppingCartUseCase } from '../use-cases/factories/make-shopping-cart-use-case'
import { calculateCartTotals } from '@/utils/calculate-cart-total.utils'

export async function addItemToCartController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  const addItemBodySchema = z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
  })

  const { productId, quantity } = addItemBodySchema.parse(request.body)

  if (!userId) {
    return reply.status(401).send({ message: 'User not found.' })
  }

  try {
    const shoppingCartUseCase = makeShoppingCartUseCase()

    const { cart } = await shoppingCartUseCase.addItem({
      userId,
      productId,
      quantity,
    })

    const { totalItems, totalPrice } = calculateCartTotals(cart.items)

    return reply.status(200).send({
      message: `Item added in cart successfully.`,
      cart: {
        id: cart.id,
        userId: cart.userId,
        items: cart.items,
        totalItems,
        totalPrice,
      },
    })
  } catch (err) {
    if (err instanceof ProductNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
