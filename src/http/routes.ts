import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { authenticate } from './controllers/authenticate.controller'
import { createProductController } from './controllers/create-product.controller'
import { createCategoryController } from './controllers/create-categoy.controller'
import { createCanteenController } from './controllers/create-canteen.controller'
import { createOrderController } from './controllers/create-order.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/products', createProductController)
  app.post('/categories', createCategoryController)
  app.post('/canteens', createCanteenController)
  app.post('/orders', createOrderController)
}
