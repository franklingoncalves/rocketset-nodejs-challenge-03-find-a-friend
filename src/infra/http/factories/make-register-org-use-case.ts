import { RegisterOrgUseCase } from '@/domain/use-cases/register-org'
import { orgsRepository } from '@/lib/in-memory-db'

export function makeRegisterOrgUseCase() {
    const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

    return registerOrgUseCase
}