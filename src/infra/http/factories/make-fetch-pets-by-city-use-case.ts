import { FetchPetsByCityUseCase } from '@/domain/use-cases/fetch-pets-by-city'
import { petsRepository } from '@/lib/in-memory-db'

export function makeFetchPetsByCityUseCase() {
    return new FetchPetsByCityUseCase(petsRepository)
}