import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/infra/repositories/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from './register-org'
import { OrgAlreadyExistsError } from '@/core/errors/org-already-exists-error'
import { compare } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new RegisterOrgUseCase(orgsRepository)
    })

    it('should be able to register', async () => {
        const { org } = await sut.execute({
            name: 'Org Test',
            email: 'org@example.com',
            password: '123456',
            address: 'Rua Teste',
            whatsapp: '999999999',
            city: 'Test City',
            latitude: -23.55052,
            longitude: -46.633308,
        })

        expect(org.id).toEqual(expect.any(String))
        expect(orgsRepository.items).toHaveLength(1)

        expect(org.address).toEqual('Rua Teste')
        expect(org.whatsapp).toEqual('999999999')
    })

    it('should hash org password upon registration', async () => {
        const { org } = await sut.execute({
            name: 'Org Test',
            email: 'org@example.com',
            password: '123456',
            address: 'Rua Teste',
            whatsapp: '999999999',
            city: 'Test City',
            latitude: -23.55052,
            longitude: -46.633308,
        })

        const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const email = 'org@example.com'

        await sut.execute({
            name: 'Org Test',
            email,
            password: '123456',
            address: 'Rua Teste',
            whatsapp: '999999999',
            city: 'Test City',
            latitude: -23.55052,
            longitude: -46.633308,
        })

        await expect(() =>
            sut.execute({
                name: 'Org Test 2',
                email,
                password: '123456',
                address: 'Rua Teste 2',
                whatsapp: '999999999',
                city: 'Test City',
                latitude: -23.55052,
                longitude: -46.633308,
            }),
        ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
    })
})