import { Canteen } from '@prisma/client'
import { CanteenRepository } from '@/repositories/canteen-repository'

interface ListCanteensResponse {
  canteens: Canteen[]
}

export class ListCanteensUseCase {
  constructor(private canteensRepository: CanteenRepository) {}

  async execute(): Promise<ListCanteensResponse> {
    const canteens = await this.canteensRepository.listCanteens()

    return {
      canteens,
    }
  }
}
