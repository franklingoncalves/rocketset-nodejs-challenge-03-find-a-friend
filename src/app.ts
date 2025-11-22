import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyJwt from '@fastify/jwt'
import {
    serializerCompiler,
    validatorCompiler,
    jsonSchemaTransform,
    ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './infra/env'
import { errorHandler } from './infra/http/error-handler'
import { orgsRoutes } from './infra/http/controllers/orgs/routes'
import { petsRoutes } from './infra/http/controllers/pets/routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Find a Friend API',
            description: 'API for pet adoption management.',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '10m',
    },
})

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler(errorHandler)