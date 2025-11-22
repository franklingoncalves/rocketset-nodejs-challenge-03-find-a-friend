import { Pet, PetAge, PetEnergyLevel, PetEnvironment, PetIndependencyLevel, PetSize } from '@/domain/entities/pet'
import { PetsRepository } from '@/domain/repositories/pets-repository'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
    orgId: string
    name: string
    description?: string
    age: PetAge
    size: PetSize
    energyLevel: PetEnergyLevel
    independencyLevel: PetIndependencyLevel
    environment: PetEnvironment
    photos?: string[]
}

interface CreatePetUseCaseResponse {
    pet: Pet
}

export class CreatePetUseCase {
    constructor(
        private petsRepository: PetsRepository,
        private orgsRepository: OrgsRepository,
    ) { }

    async execute({
        orgId,
        name,
        description,
        age,
        size,
        energyLevel,
        independencyLevel,
        environment,
        photos,
    }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        const org = await this.orgsRepository.findById(orgId)

        if (!org) {
            throw new ResourceNotFoundError()
        }

        const pet = new Pet({
            orgId,
            name,
            description,
            age,
            size,
            energyLevel,
            independencyLevel,
            environment,
            photos,
        })

        await this.petsRepository.create(pet)

        return { pet }
    }
}