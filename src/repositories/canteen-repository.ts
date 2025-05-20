import { Prisma, Canteen } from '@prisma/client'

export interface CanteensRepository {
  create(data: Prisma.CanteenCreateInput): Promise<Canteen>
  findById(id: string): Promise<Canteen | null>
  findByName(name: string): Promise<Canteen | null>
  listCanteens(): Promise<Canteen[]>
}
