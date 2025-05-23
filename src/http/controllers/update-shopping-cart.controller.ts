import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeShoppingCartUseCase } from '../use-cases/factories/make-shopping-cart-use-case'
import { calculateCartTotals } from '@/utils/calculate-cart-total.utils'

export async function updateCartItemQuantityController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  const updateQuantityBodySchema = z.object({
    productId: z.string().uuid(),
    newQuantity: z.number().int().min(0),
  })

  const { productId, newQuantity } = updateQuantityBodySchema.parse(
    request.body,
  )

  try {
    const shoppingCartUseCase = makeShoppingCartUseCase()

    const result = await shoppingCartUseCase.updateItemQuantity({
      userId,
      productId,
      newQuantity,
    })

    if (!result) {
      return reply.status(404).send({ message: 'Cart item not found.' })
    }

    const { cart } = result
    const { totalItems, totalPrice } = calculateCartTotals(cart.items)

    return reply.status(200).send({
      message: 'Item quantity updated successfully.',
      cart: {
        id: cart.id,
        userId: cart.userId,
        items: cart.items,
        totalItems,
        totalPrice,
      },
    })
  } catch (error) {}
}
