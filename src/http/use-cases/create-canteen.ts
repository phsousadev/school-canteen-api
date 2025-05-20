import type { Canteen } from '@prisma/client'
import { CanteenRepository } from '@/repositories/canteen-repository'
import { CanteenAlreadyExistsError } from './errors/canteen-already-exists-error'

interface CreateCanteenUseCaseRequest {
  name: string
  latitude: number
  longitude: number
}

interface CreateCanteenUseCaseResponse {
  canteen: Canteen
}

export class CreateCanteenUseCase {
  constructor(private canteenRepository: CanteenRepository) {}

  async execute({
    name,
    latitude,
    longitude,
  }: CreateCanteenUseCaseRequest): Promise<CreateCanteenUseCaseResponse> {
    const canteenAlreadyExists = await this.canteenRepository.findByName(name)

    if (canteenAlreadyExists) throw new CanteenAlreadyExistsError()
    const canteen = await this.canteenRepository.create({
      name,
      latitude,
      longitude,
    })

    return {
      canteen,
    }
  }
}
