import { PetsRepository } from '@/domain/repositories/pets-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Pet } from '@/domain/entities/pet'

interface GetPetProfileUseCaseRequest {
    petId: string
}

interface GetPetProfileUseCaseResponse {
    pet: Pet
}

export class GetPetProfileUseCase {
    constructor(private petsRepository: PetsRepository) { }

    async execute({
        petId,
    }: GetPetProfileUseCaseRequest): Promise<GetPetProfileUseCaseResponse> {
        const pet = await this.petsRepository.findById(petId)

        if (!pet) {
            throw new ResourceNotFoundError()
        }

        return { pet }
    }
}