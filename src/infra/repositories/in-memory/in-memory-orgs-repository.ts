import { Org } from '@/domain/entities/org'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
    public items: Org[] = []

    async create(org: Org) {
        this.items.push(org)
    }

    async findByEmail(email: string) {
        const org = this.items.find((item) => item.email === email)
        return org || null
    }

    async findById(id: string) {
        const org = this.items.find((item) => item.id === id)
        return org || null
    }
}