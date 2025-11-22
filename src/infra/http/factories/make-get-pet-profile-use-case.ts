import { GetPetProfileUseCase } from '@/domain/use-cases/get-pet-profile'
import { petsRepository } from '@/lib/in-memory-db'

export function makeGetPetProfileUseCase() {
    return new GetPetProfileUseCase(petsRepository)
}