import { PrismaPetsRepository } from '@/infra/database/prisma/repositories/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/infra/database/prisma/repositories/prisma-orgs-repository'
import { CreatePetUseCase } from '@/domain/use-cases/create-pet'

export function makeCreatePetUseCase() {
    const petsRepository = new PrismaPetsRepository()
    const orgsRepository = new PrismaOrgsRepository()

    return new CreatePetUseCase(petsRepository, orgsRepository)
}