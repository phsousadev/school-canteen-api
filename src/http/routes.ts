import { FastifyInstance } from 'fastify'
import { registerUser } from './controllers/register-user.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
}
