import { FastifyInstance, FastifyError } from 'fastify'
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

    const fastifyError = error as FastifyError

    if (fastifyError.code === 'FST_ERR_VALIDATION') {
        return reply.status(400).send({
            message: 'Validation error.',
            issues: fastifyError.validation,
        })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error.' })
}