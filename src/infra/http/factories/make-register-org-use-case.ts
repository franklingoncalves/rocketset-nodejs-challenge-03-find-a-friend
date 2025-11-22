import { InMemoryOrgsRepository } from '@/infra/repositories/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from '@/domain/use-cases/register-org'

export function makeRegisterOrgUseCase() {
    // TODO: Trocar pelo PrismaOrgsRepository
    const orgsRepository = new InMemoryOrgsRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

    return registerOrgUseCase
}