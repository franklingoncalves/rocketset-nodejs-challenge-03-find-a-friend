import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJwt } from '@/infra/http/middlewares/verify-jwt'
import { create, createPetBodySchema } from './create'
import { search, searchPetsQuerySchema } from './search'
import { getPetProfileParamsSchema, getProfile } from './get-profile'

export async function petsRoutes(app: FastifyInstance) {
    const appWithTypeProvider = app.withTypeProvider<ZodTypeProvider>()

    appWithTypeProvider.post(
        '/orgs/pets',
        {
            onRequest: [verifyJwt],
            schema: {
                tags: ['Pets'],
                summary: 'Create a new pet',
                security: [{ bearerAuth: [] }],
                body: createPetBodySchema,
                response: {
                    201: z.object({
                        pet: z.object({ id: z.string() }).passthrough()
                    }),
                },
            },
        },
        create,
    )

    appWithTypeProvider.get(
        '/pets',
        {
            schema: {
                tags: ['Pets'],
                summary: 'Search pets by city',
                querystring: searchPetsQuerySchema,
                response: {
                    200: z.object({
                        pets: z.array(z.object({ id: z.string() }).passthrough()),
                    }),
                },
            },
        },
        search,
    )

    appWithTypeProvider.get(
        '/pets/:id',
        {
            schema: {
                tags: ['Pets'],
                summary: 'Get pet details',
                params: getPetProfileParamsSchema,
                response: {
                    200: z.object({
                        pet: z.object({ id: z.string() }).passthrough(),
                    }),
                },
            },
        },
        getProfile,
    )
}