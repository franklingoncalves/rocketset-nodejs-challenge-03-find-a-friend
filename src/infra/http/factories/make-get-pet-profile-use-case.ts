import { PrismaPetsRepository } from '@/infra/database/prisma/repositories/prisma-pets-repository'
import { GetPetProfileUseCase } from '@/domain/use-cases/get-pet-profile'

export function makeGetPetProfileUseCase() {
    const petsRepository = new PrismaPetsRepository()
    return new GetPetProfileUseCase(petsRepository)
}