import { FastifyInstance } from 'fastify'
import { registerUser } from './controllers/register-user.controller'
import { authenticate } from './controllers/authenticate.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)
}
