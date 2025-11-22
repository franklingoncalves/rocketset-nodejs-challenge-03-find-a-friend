import { CreatePetUseCase } from '@/domain/use-cases/create-pet'
import { orgsRepository, petsRepository } from '@/lib/in-memory-db'

export function makeCreatePetUseCase() {
    return new CreatePetUseCase(petsRepository, orgsRepository)
}