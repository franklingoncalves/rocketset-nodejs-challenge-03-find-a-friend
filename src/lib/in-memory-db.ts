import { InMemoryOrgsRepository } from '@/infra/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/infra/repositories/in-memory/in-memory-pets-repository'

export const orgsRepository = new InMemoryOrgsRepository()
export const petsRepository = new InMemoryPetsRepository(orgsRepository)