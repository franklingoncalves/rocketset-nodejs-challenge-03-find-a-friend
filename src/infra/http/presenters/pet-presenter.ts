import { Pet } from '@/domain/entities/pet'

export class PetPresenter {
    static toHTTP(pet: Pet) {
        return {
            id: pet.id,
            name: pet.name,
            description: pet.description,
            age: pet.age,
            size: pet.size,
            energyLevel: pet.energyLevel,
            independencyLevel: pet.independencyLevel,
            environment: pet.environment,
            photos: pet.photos,
            orgId: pet.orgId,
        }
    }
}