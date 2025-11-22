import fastify from 'fastify'
import {
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { errorHandler } from './infra/http/error-handler'
import { orgsRoutes } from './infra/http/controllers/orgs/routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(orgsRoutes)

app.setErrorHandler(errorHandler)