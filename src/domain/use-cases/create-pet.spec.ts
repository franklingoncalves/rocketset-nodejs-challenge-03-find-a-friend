import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/infra/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/infra/repositories/in-memory/in-memory-orgs-repository'
import { CreatePetUseCase } from './create-pet'
import { Org } from '@/domain/entities/org'
import { PetAge, PetEnergyLevel, PetEnvironment, PetIndependencyLevel, PetSize } from '@/domain/entities/pet'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        sut = new CreatePetUseCase(petsRepository, orgsRepository)
    })

    it('should be able to create a pet', async () => {
        const org = new Org({
            name: 'Org Test',
            email: 'org@example.com',
            password_hash: '123456',
            address: 'Rua Teste',
            whatsapp: '999999999',
            city: 'Test City',
            latitude: -23.55052,
            longitude: -46.633308,
        })

        await orgsRepository.create(org)

        const { pet } = await sut.execute({
            orgId: org.id,
            name: 'Rex',
            description: 'Doguinho',
            age: PetAge.PUPPY,
            size: PetSize.SMALL,
            energyLevel: PetEnergyLevel.HIGH,
            independencyLevel: PetIndependencyLevel.LOW,
            environment: PetEnvironment.INDOOR,
            photos: ['photo-1.jpg'],
        })

        expect(pet.id).toEqual(expect.any(String))
        expect(petsRepository.items).toHaveLength(1)
    })

    it('should not be able to create a pet with non-existing org', async () => {
        await expect(() =>
            sut.execute({
                orgId: 'non-existing-org-id',
                name: 'Rex',
                description: 'Doguinho',
                age: PetAge.PUPPY,
                size: PetSize.SMALL,
                energyLevel: PetEnergyLevel.HIGH,
                independencyLevel: PetIndependencyLevel.LOW,
                environment: PetEnvironment.INDOOR,
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})