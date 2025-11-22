import { hash } from 'bcryptjs'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { OrgAlreadyExistsError } from '@/core/errors/org-already-exists-error'
import { Org } from '@/domain/entities/org'

interface RegisterOrgUseCaseRequest {
    name: string
    email: string
    password: string
    address: string
    city: string
    whatsapp: string
    latitude: number
    longitude: number
}

interface RegisterOrgUseCaseResponse {
    org: Org
}

export class RegisterOrgUseCase {
    constructor(private orgsRepository: OrgsRepository) { }

    async execute({
        name,
        email,
        password,
        address,
        city,
        whatsapp,
        latitude,
        longitude,
    }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
        const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

        if (orgWithSameEmail) {
            throw new OrgAlreadyExistsError()
        }

        const password_hash = await hash(password, 6)

        const org = new Org({
            name,
            email,
            password_hash,
            address,
            city,
            whatsapp,
            latitude,
            longitude,
        })

        await this.orgsRepository.create(org)

        return { org }
    }
}