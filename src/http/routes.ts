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

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.register(async (privateRoutes) => {
    privateRoutes.addHook('onRequest', verifyJwt)

    // Categories
    privateRoutes.get('/categories', listCategoriesController)
    privateRoutes.post('/categories', createCategoryController)

    // Products
    privateRoutes.post('/products', createProductController)
    privateRoutes.get('/products', listProductsController)
    privateRoutes.delete('/products/:productId', deleteProductController)
    privateRoutes.put('/products/:productId', updateProductController)

    // Canteens
    privateRoutes.post('/canteens', createCanteenController)
    privateRoutes.get('/canteens', listCanteensController)

    // Orders
    privateRoutes.post('/orders', createOrderController)
    privateRoutes.get('/orders', listOrdersController)

    // Profile
    privateRoutes.get('/me', profileController)
  })
}
