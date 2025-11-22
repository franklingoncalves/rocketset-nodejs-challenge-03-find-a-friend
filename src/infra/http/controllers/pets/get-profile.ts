import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetProfileUseCase } from '@/infra/http/factories/make-get-pet-profile-use-case'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

export const getPetProfileParamsSchema = z.object({
    id: z.string().uuid(),
})

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
    const { id } = getPetProfileParamsSchema.parse(request.params)

    try {
        const getPetProfileUseCase = makeGetPetProfileUseCase()

        const { pet } = await getPetProfileUseCase.execute({ petId: id })

        return reply.status(200).send({ pet })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }
}