import { Pet } from '@/domain/entities/pet'
import { FindManyNearbyParams, PetsRepository } from '@/domain/repositories/pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []

    constructor(private orgsRepository: InMemoryOrgsRepository) { }

    async create(pet: Pet) {
        this.items.push(pet)
    }

    async findById(id: string) {
        const pet = this.items.find((item) => item.id === id)
        return pet || null
    }

    async findManyByCity(params: FindManyNearbyParams) {
        const orgsInCity = this.orgsRepository.items.filter(
            (org) => org.city === params.city,
        )

        const petsInCity = this.items.filter((pet) =>
            orgsInCity.some((org) => org.id === pet.orgId),
        )

        const filteredPets = petsInCity.filter((pet) => {
            if (params.age && pet.age !== params.age) return false
            if (params.size && pet.size !== params.size) return false
            if (params.energyLevel && pet.energyLevel !== params.energyLevel) return false
            if (params.environment && pet.environment !== params.environment) return false
            if (params.independencyLevel && pet.independencyLevel !== params.independencyLevel) return false

            return true
        })

        return filteredPets
    }
}