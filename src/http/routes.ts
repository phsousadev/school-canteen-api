import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { authenticate } from './controllers/authenticate.controller'
import { createProductController } from './controllers/create-product.controller'
import { createCategoryController } from './controllers/create-categoy.controller'
import { createCanteenController } from './controllers/create-canteen.controller'
import { createOrderController } from './controllers/create-order.controller'
import { listCategoriesController } from './controllers/lis-categories.controller'
import { listProductsController } from './controllers/list-products.controller'
import { listCanteensController } from './controllers/lis-canteens.controller'
import { listOrdersController } from './controllers/list-orders.controller'
import { deleteProductController } from './controllers/delete-products.controller'
import { updateProductController } from './controllers/update-products.controller'

export async function appRoutes(app: FastifyInstance) {
  // Users
  app.post('/users', register)

  // Sessions
  app.post('/sessions', authenticate)

  // Categories
  app.get('/categories', listCategoriesController)
  app.post('/categories', createCategoryController)

  // Products
  app.post('/products', createProductController)
  app.get('/products', listProductsController)
  app.delete('/products/:productId', deleteProductController)
  app.put('/products/:productId', updateProductController)

  // Canteens
  app.post('/canteens', createCanteenController)
  app.get('/canteens', listCanteensController)

  // Orders
  app.post('/orders', createOrderController)
  app.get('/orders', listOrdersController)
}
