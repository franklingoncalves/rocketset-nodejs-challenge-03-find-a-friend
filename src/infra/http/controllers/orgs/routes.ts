import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { register, registerBodySchema } from './register'

export async function orgsRoutes(app: FastifyInstance) {
    const appWithTypeProvider = app.withTypeProvider<ZodTypeProvider>()

    appWithTypeProvider.post(
        '/orgs',
        {
            schema: {
                tags: ['Orgs'],
                summary: 'Create a new organization',
                body: registerBodySchema,
                response: {
                    201: z.null().describe('Organization created successfully')
                }
            },
        },
        register,
    )
}