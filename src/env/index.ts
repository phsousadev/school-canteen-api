import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'uat', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3001),
  JWT_SECRET: z.string(),
  ROUNDS_HASH_GENERATOR: z.coerce.number().default(2),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(`Invalid environment variable`, _env.error.format())

  throw new Error(`Invalid environment variable.`)
}

export const env = _env.data
