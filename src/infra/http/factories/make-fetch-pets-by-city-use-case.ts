import { PrismaPetsRepository } from '@/infra/database/prisma/repositories/prisma-pets-repository'
import { FetchPetsByCityUseCase } from '@/domain/use-cases/fetch-pets-by-city'

export function makeFetchPetsByCityUseCase() {
    const petsRepository = new PrismaPetsRepository()
    return new FetchPetsByCityUseCase(petsRepository)
}