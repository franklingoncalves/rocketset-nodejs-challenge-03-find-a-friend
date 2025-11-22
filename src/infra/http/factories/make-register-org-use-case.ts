import { PrismaOrgsRepository } from '@/infra/database/prisma/repositories/prisma-orgs-repository'
import { RegisterOrgUseCase } from '@/domain/use-cases/register-org'

export function makeRegisterOrgUseCase() {
    const orgsRepository = new PrismaOrgsRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

    return registerOrgUseCase
}