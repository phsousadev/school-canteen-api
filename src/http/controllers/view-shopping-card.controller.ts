import { FastifyReply, FastifyRequest } from 'fastify'
import { makeShoppingCartUseCase } from '../use-cases/factories/make-shopping-cart-use-case'
import { calculateCartTotals } from '@/utils/calculate-cart-total.utils'

export async function viewShoppingCartController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub
  try {
    const shoppingCartUseCase = makeShoppingCartUseCase()

    const { cart } = await shoppingCartUseCase.getCart({ userId })

    const { totalItems, totalPrice } = calculateCartTotals(cart.items)

    return reply.status(200).send({
      id: cart.id,
      userId: cart.userId,
      items: cart.items,
      totalItems,
      totalPrice,
    })
  } catch (err) {}

  return reply.status(200).send()
}
