import { Org } from '@/domain/entities/org'

export interface OrgsRepository {
    create(org: Org): Promise<void>
    findByEmail(email: string): Promise<Org | null>
    findById(id: string): Promise<Org | null>
}