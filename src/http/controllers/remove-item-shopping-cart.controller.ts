import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeShoppingCartUseCase } from '../use-cases/factories/make-shopping-cart-use-case'
import { calculateCartTotals } from '@/utils/calculate-cart-total.utils'

export async function removeItemShoppingCart(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const removeCartItemParamsSchema = z.object({
    productId: z.string().uuid(),
  })

  const { productId } = removeCartItemParamsSchema.parse(request.params)

  const userId = request.user.sub

  try {
    const shoppingCartUseCase = makeShoppingCartUseCase()

    const result = await shoppingCartUseCase.removeItem({
      userId,
      productId,
    })

    if (!result) {
      return reply.status(404).send({ message: 'Cart item not found.' })
    }

    const { cart } = result
    const { totalItems, totalPrice } = calculateCartTotals(cart.items)

    return reply.status(200).send({
      message: 'Item removed from cart successfully.',
      cart: {
        id: cart.id,
        userId: cart.userId,
        items: cart.items,
        totalItems,
        totalPrice,
      },
    })
  } catch (err) {
    throw new Error()
  }
}
