import { Pet, PetAge, PetEnergyLevel, PetEnvironment, PetIndependencyLevel, PetSize } from '@/domain/entities/pet'
import { PetsRepository } from '@/domain/repositories/pets-repository'

interface FetchPetsByCityUseCaseRequest {
    city: string
    age?: PetAge
    size?: PetSize
    energyLevel?: PetEnergyLevel
    independencyLevel?: PetIndependencyLevel
    environment?: PetEnvironment
}

interface FetchPetsByCityUseCaseResponse {
    pets: Pet[]
}

export class FetchPetsByCityUseCase {
    constructor(private petsRepository: PetsRepository) { }

    async execute({
        city,
        age,
        size,
        energyLevel,
        independencyLevel,
        environment,
    }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
        const pets = await this.petsRepository.findManyByCity({
            city,
            age,
            size,
            energyLevel,
            independencyLevel,
            environment,
        })

        return { pets }
    }
}