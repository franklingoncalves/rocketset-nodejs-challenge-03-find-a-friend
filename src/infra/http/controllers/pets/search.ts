import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchPetsByCityUseCase } from '@/infra/http/factories/make-fetch-pets-by-city-use-case'
import { PetAge, PetEnergyLevel, PetEnvironment, PetIndependencyLevel, PetSize } from '@/domain/entities/pet'
import { PetPresenter } from '@/infra/http/presenters/pet-presenter'

export const searchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.nativeEnum(PetAge).optional(),
    size: z.nativeEnum(PetSize).optional(),
    energyLevel: z.nativeEnum(PetEnergyLevel).optional(),
    independencyLevel: z.nativeEnum(PetIndependencyLevel).optional(),
    environment: z.nativeEnum(PetEnvironment).optional(),
})

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const query = searchPetsQuerySchema.parse(request.query)

    const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase()

    const { pets } = await fetchPetsByCityUseCase.execute(query)

    return reply.status(200).send({
        pets: pets.map(PetPresenter.toHTTP),
    })
}