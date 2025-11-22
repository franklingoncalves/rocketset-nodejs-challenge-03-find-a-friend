import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/infra/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/infra/repositories/in-memory/in-memory-orgs-repository'
import { GetPetProfileUseCase } from './get-pet-profile'
import { Pet, PetAge, PetEnergyLevel, PetEnvironment, PetIndependencyLevel, PetSize } from '@/domain/entities/pet'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetProfileUseCase

describe('Get Pet Profile Use Case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        sut = new GetPetProfileUseCase(petsRepository)
    })

    it('should be able to get pet profile', async () => {
        const createdPet = new Pet({
            orgId: 'org-1',
            name: 'Rex',
            description: 'Doguinho',
            age: PetAge.ADULT,
            size: PetSize.MEDIUM,
            energyLevel: PetEnergyLevel.HIGH,
            independencyLevel: PetIndependencyLevel.LOW,
            environment: PetEnvironment.OUTDOOR,
        })

        await petsRepository.create(createdPet)

        const { pet } = await sut.execute({
            petId: createdPet.id,
        })

        expect(pet.id).toEqual(expect.any(String))
        expect(pet.name).toEqual('Rex')
    })

    it('should not be able to get profile of a non-existing pet', async () => {
        await expect(() =>
            sut.execute({
                petId: 'non-existing-id',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})