import { PrismaOrgsRepository } from '@/infra/database/prisma/repositories/prisma-orgs-repository'
import { AuthenticateOrgUseCase } from '@/domain/use-cases/authenticate-org'

export function makeAuthenticateOrgUseCase() {
    const orgsRepository = new PrismaOrgsRepository()
    const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgsRepository)

    return authenticateOrgUseCase
}