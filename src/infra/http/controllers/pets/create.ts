import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '@/infra/http/factories/make-create-pet-use-case'
import { PetAge, PetEnergyLevel, PetEnvironment, PetIndependencyLevel, PetSize } from '@/domain/entities/pet'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { PetPresenter } from '@/infra/http/presenters/pet-presenter'

export const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    age: z.nativeEnum(PetAge),
    size: z.nativeEnum(PetSize),
    energyLevel: z.nativeEnum(PetEnergyLevel),
    independencyLevel: z.nativeEnum(PetIndependencyLevel),
    environment: z.nativeEnum(PetEnvironment),
    photos: z.array(z.string()).optional(),
})

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const body = createPetBodySchema.parse(request.body)

    try {
        const createPetUseCase = makeCreatePetUseCase()

        const orgId = request.user.sub

        const { pet } = await createPetUseCase.execute({
            ...body,
            orgId,
        })

        return reply.status(201).send({
            pet: PetPresenter.toHTTP(pet)
        })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }
}