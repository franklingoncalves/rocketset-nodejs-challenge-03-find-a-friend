import { compare } from 'bcryptjs'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'
import { Org } from '@/domain/entities/org'

interface AuthenticateOrgUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateOrgUseCaseResponse {
    org: Org
}

export class AuthenticateOrgUseCase {
    constructor(private orgsRepository: OrgsRepository) { }

    async execute({
        email,
        password,
    }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
        const org = await this.orgsRepository.findByEmail(email)

        if (!org) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatch = await compare(password, org.password_hash)

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError()
        }

        return { org }
    }
}