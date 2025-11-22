import { Pet as PrismaPet } from '@prisma/client'
import { FindManyNearbyParams, PetsRepository } from '@/domain/repositories/pets-repository'
import { Pet, PetAge, PetEnergyLevel, PetEnvironment, PetIndependencyLevel, PetSize } from '@/domain/entities/pet'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
    async create(pet: Pet) {
        await prisma.pet.create({
            data: {
                id: pet.id,
                name: pet.name,
                description: pet.description,
                age: pet.age,
                size: pet.size,
                energyLevel: pet.energyLevel,
                independencyLevel: pet.independencyLevel,
                environment: pet.environment,
                photos: pet.photos,
                org_id: pet.orgId,
            },
        })
    }

    async findById(id: string): Promise<Pet | null> {
        const petPrisma = await prisma.pet.findUnique({
            where: {
                id,
            },
        })

        if (!petPrisma) {
            return null
        }

        return new Pet(
            {
                name: petPrisma.name,
                description: petPrisma.description ?? undefined,
                age: petPrisma.age as PetAge,
                size: petPrisma.size as PetSize,
                energyLevel: petPrisma.energyLevel as PetEnergyLevel,
                independencyLevel: petPrisma.independencyLevel as PetIndependencyLevel,
                environment: petPrisma.environment as PetEnvironment,
                photos: petPrisma.photos,
                orgId: petPrisma.org_id,
            },
            petPrisma.id,
        )
    }

    async findManyByCity(params: FindManyNearbyParams): Promise<Pet[]> {
        const petsPrisma = await prisma.pet.findMany({
            where: {
                age: params.age,
                size: params.size,
                energyLevel: params.energyLevel,
                environment: params.environment,
                independencyLevel: params.independencyLevel,
                org: {
                    city: {
                        contains: params.city,
                        mode: 'insensitive',
                    },
                },
            },
        })

        // 2. Agora tipamos explicitamente: (petPrisma: PrismaPet)
        return petsPrisma.map((petPrisma: PrismaPet) => {
            return new Pet(
                {
                    name: petPrisma.name,
                    description: petPrisma.description ?? undefined,
                    age: petPrisma.age as PetAge,
                    size: petPrisma.size as PetSize,
                    energyLevel: petPrisma.energyLevel as PetEnergyLevel,
                    independencyLevel: petPrisma.independencyLevel as PetIndependencyLevel,
                    environment: petPrisma.environment as PetEnvironment,
                    photos: petPrisma.photos,
                    orgId: petPrisma.org_id,
                },
                petPrisma.id,
            )
        })
    }
}