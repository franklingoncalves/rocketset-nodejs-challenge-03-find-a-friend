import { AuthenticateOrgUseCase } from '@/domain/use-cases/authenticate-org'
import { orgsRepository } from '@/lib/in-memory-db'

export function makeAuthenticateOrgUseCase() {
    const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgsRepository)

    return authenticateOrgUseCase
}