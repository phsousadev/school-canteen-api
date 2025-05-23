import { Prisma, Canteen } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { CanteenRepository } from '../canteen-repository'

export class PrismaCanteenRepository implements CanteenRepository {
  async create(data: Prisma.CanteenCreateInput): Promise<Canteen> {
    const canteen = await prisma.canteen.create({
      data,
    })

    return canteen
  }

  async findById(id: string): Promise<Canteen | null> {
    const canteen = await prisma.canteen.findUnique({
      where: {
        id,
      },
    })

    return canteen
  }

  async findByName(name: string): Promise<Canteen | null> {
    const canteen = await prisma.canteen.findFirst({
      where: {
        name,
      },
    })

    return canteen
  }

  async listCanteens(): Promise<Canteen[]> {
    const canteens = await prisma.canteen.findMany({
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return canteens
  }
}
