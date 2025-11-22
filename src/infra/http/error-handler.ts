import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import { env } from '@/infra/env'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error.',
            issues: error.format(),
        })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // TODO: Enviar para DataDog
    }

    return reply.status(500).send({ message: 'Internal server error.' })
}