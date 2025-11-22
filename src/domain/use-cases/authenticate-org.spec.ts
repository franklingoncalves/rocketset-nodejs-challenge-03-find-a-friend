import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/infra/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'
import { Org } from '@/domain/entities/org' // <--- Importe a Entidade

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new AuthenticateOrgUseCase(orgsRepository)
    })

    it('should be able to authenticate', async () => {
        await orgsRepository.create(
            new Org({
                name: 'Org Test',
                email: 'org@example.com',
                password_hash: await hash('123456', 6),
                address: 'Rua Teste',
                whatsapp: '999999999',
                city: 'Test City',
                latitude: -23.55052,
                longitude: -46.633308,
            }),
        )

        const { org } = await sut.execute({
            email: 'org@example.com',
            password: '123456',
        })

        expect(org.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() =>
            sut.execute({
                email: 'wrong@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await orgsRepository.create(
            new Org({
                name: 'Org Test',
                email: 'org@example.com',
                password_hash: await hash('123456', 6),
                address: 'Rua Teste',
                whatsapp: '999999999',
                city: 'Test City',
                latitude: -23.55052,
                longitude: -46.633308,
            }),
        )

        await expect(() =>
            sut.execute({
                email: 'org@example.com',
                password: '1234567',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})