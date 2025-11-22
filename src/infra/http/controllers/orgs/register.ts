import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgAlreadyExistsError } from '@/core/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/infra/http/factories/make-register-org-use-case'

export const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    city: z.string(),
    whatsapp: z.string(),
    latitude: z.number(),
    longitude: z.number(),
})

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password, address, city, whatsapp, latitude, longitude } =
        registerBodySchema.parse(request.body)

    try {
        const registerOrgUseCase = makeRegisterOrgUseCase()

        await registerOrgUseCase.execute({
            name,
            email,
            password,
            address,
            city,
            whatsapp,
            latitude,
            longitude,
        })
    } catch (err) {
        if (err instanceof OrgAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }
        throw err
    }

    return reply.status(201).send()
}