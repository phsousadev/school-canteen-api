import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { authenticate } from './controllers/authenticate.controller'
import { createProductController } from './controllers/create-product.controller'
import { createCategoryController } from './controllers/create-categoy.controller'
import { createCanteenController } from './controllers/create-canteen.controller'
import { createOrderController } from './controllers/create-order.controller'
import { listCategoriesController } from './controllers/list-categories.controller'
import { listProductsController } from './controllers/list-products.controller'
import { listCanteensController } from './controllers/list-canteens.controller'
import { listOrdersController } from './controllers/list-orders.controller'
import { deleteProductController } from './controllers/delete-products.controller'
import { updateProductController } from './controllers/update-products.controller'
import { profileController } from './controllers/profile.controller'
import { verifyJwt } from './middlewares/verify-jwt'
import { refresh } from './controllers/refresh.controller'
import { verifyUserRole } from './middlewares/verify-user-role'
import { addItemToCartController } from './controllers/create-shopping-cart.controller'
import { viewShoppingCartController } from './controllers/view-shopping-card.controller'
import { updateCartItemQuantityController } from './controllers/update-shopping-cart.controller'

export async function appRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    reply.send({ message: '🍽️ Bem-vindo à School Canteen API' })
  })

  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  app.register(async (privateRoutes) => {
    privateRoutes.addHook('onRequest', verifyJwt)

    // Categories
    privateRoutes.post(
      '/categories',
      { onRequest: [verifyUserRole('ADMIN')] },
      createCategoryController,
    )
    privateRoutes.get('/categories', listCategoriesController)

    // Products
    privateRoutes.post(
      '/products',
      { onRequest: [verifyUserRole('ADMIN')] },
      createProductController,
    )
    privateRoutes.get('/products', listProductsController)
    privateRoutes.delete(
      '/products/:productId',
      { onRequest: [verifyUserRole('ADMIN')] },
      deleteProductController,
    )
    privateRoutes.put(
      '/products/:productId',
      { onRequest: [verifyUserRole('ADMIN')] },
      updateProductController,
    )

    // Canteens
    privateRoutes.post(
      '/canteens',
      { onRequest: [verifyUserRole('ADMIN')] },
      createCanteenController,
    )
    privateRoutes.get('/canteens', listCanteensController)

    // Shopping cart
    privateRoutes.post('/shopping-carts', addItemToCartController)
    privateRoutes.get('/shopping-carts', viewShoppingCartController)
    privateRoutes.put('/shopping-carts', updateCartItemQuantityController)

    // Orders
    privateRoutes.post('/orders', createOrderController)
    privateRoutes.get('/orders', listOrdersController)

    // Profile
    privateRoutes.get('/me', profileController)
  })
}
