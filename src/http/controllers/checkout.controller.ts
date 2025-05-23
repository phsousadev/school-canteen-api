import { FastifyReply, FastifyRequest } from 'fastify'
import { makeShoppingCartUseCase } from '../use-cases/factories/make-shopping-cart-use-case'

export async function checkoutCartController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  try {
    const shoppingCartUseCase = makeShoppingCartUseCase()

    const { orderId, orderStatus, totalPrice, itemsCount } =
      await shoppingCartUseCase.checkout({ userId })

    return reply.status(201).send({
      message: 'Checkout successful! Your cart has been emptied.',
      order: {
        id: orderId,
        status: orderStatus,
        totalPrice,
        itemsCount,
      },
    })
  } catch (err) {
    throw new Error()
  }
}
