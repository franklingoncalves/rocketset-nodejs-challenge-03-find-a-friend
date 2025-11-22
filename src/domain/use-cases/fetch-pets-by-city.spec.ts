import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/infra/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/infra/repositories/in-memory/in-memory-orgs-repository'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'
import { Org } from '@/domain/entities/org'
import { Pet, PetAge, PetEnergyLevel, PetEnvironment, PetIndependencyLevel, PetSize } from '@/domain/entities/pet'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FetchPetsByCityUseCase

describe('Fetch Pets by City Use Case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        sut = new FetchPetsByCityUseCase(petsRepository)
    })

    it('should be able to list pets by city', async () => {
        const orgSP = new Org({
            name: 'Org SP',
            email: 'sp@example.com',
            password_hash: '123456',
            address: 'Rua SP',
            whatsapp: '1199999999',
            city: 'São Paulo',
            latitude: -23.55052,
            longitude: -46.633308,
        })
        await orgsRepository.create(orgSP)

        const orgRJ = new Org({
            name: 'Org RJ',
            email: 'rj@example.com',
            password_hash: '123456',
            address: 'Rua RJ',
            whatsapp: '2199999999',
            city: 'Rio de Janeiro',
            latitude: -22.906847,
            longitude: -43.172896,
        })
        await orgsRepository.create(orgRJ)

        await petsRepository.create(
            new Pet({
                orgId: orgSP.id,
                name: 'Rex SP',
                age: PetAge.ADULT,
                size: PetSize.MEDIUM,
                energyLevel: PetEnergyLevel.MEDIUM,
                independencyLevel: PetIndependencyLevel.MEDIUM,
                environment: PetEnvironment.INDOOR,
            }),
        )

        await petsRepository.create(
            new Pet({
                orgId: orgRJ.id,
                name: 'Rex RJ',
                age: PetAge.ADULT,
                size: PetSize.MEDIUM,
                energyLevel: PetEnergyLevel.MEDIUM,
                independencyLevel: PetIndependencyLevel.MEDIUM,
                environment: PetEnvironment.INDOOR,
            }),
        )

        const { pets } = await sut.execute({ city: 'São Paulo' })

        expect(pets).toHaveLength(1)
        expect(pets[0].name).toEqual('Rex SP')
    })

    it('should be able to filter pets by characteristics', async () => {
        const org = new Org({
            name: 'Org SP',
            email: 'sp@example.com',
            password_hash: '123456',
            address: 'Rua SP',
            whatsapp: '1199999999',
            city: 'São Paulo',
            latitude: -23.55052,
            longitude: -46.633308,
        })
        await orgsRepository.create(org)

        await petsRepository.create(
            new Pet({
                orgId: org.id,
                name: 'Puppy',
                age: PetAge.PUPPY,
                size: PetSize.SMALL,
                energyLevel: PetEnergyLevel.HIGH,
                independencyLevel: PetIndependencyLevel.LOW,
                environment: PetEnvironment.INDOOR,
            }),
        )

        await petsRepository.create(
            new Pet({
                orgId: org.id,
                name: 'Adult',
                age: PetAge.ADULT,
                size: PetSize.SMALL,
                energyLevel: PetEnergyLevel.HIGH,
                independencyLevel: PetIndependencyLevel.LOW,
                environment: PetEnvironment.INDOOR,
            }),
        )

        const { pets } = await sut.execute({
            city: 'São Paulo',
            age: PetAge.PUPPY,
        })

        expect(pets).toHaveLength(1)
        expect(pets[0].name).toEqual('Puppy')
    })
})