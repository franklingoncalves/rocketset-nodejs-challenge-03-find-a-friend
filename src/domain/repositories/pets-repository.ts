import { Pet, PetAge, PetEnergyLevel, PetEnvironment, PetIndependencyLevel, PetSize } from '@/domain/entities/pet'

export interface FindManyNearbyParams {
    city: string
    age?: PetAge
    size?: PetSize
    energyLevel?: PetEnergyLevel
    environment?: PetEnvironment
    independencyLevel?: PetIndependencyLevel
}

export interface PetsRepository {
    create(pet: Pet): Promise<void>
    findById(id: string): Promise<Pet | null>
    findManyByCity(params: FindManyNearbyParams): Promise<Pet[]>
}