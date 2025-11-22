import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { Org } from '@/domain/entities/org'

export class PrismaOrgsRepository implements OrgsRepository {
    async create(org: Org) {
        await prisma.org.create({
            data: {
                id: org.id,
                name: org.name,
                email: org.email,
                password_hash: org.password_hash,
                address: org.address,
                city: org.city,
                whatsapp: org.whatsapp,
                latitude: org.latitude,
                longitude: org.longitude,
            },
        })
    }

    async findByEmail(email: string): Promise<Org | null> {
        const orgPrisma = await prisma.org.findUnique({
            where: {
                email,
            },
        })

        if (!orgPrisma) {
            return null
        }

        return new Org(
            {
                name: orgPrisma.name,
                email: orgPrisma.email,
                password_hash: orgPrisma.password_hash,
                address: orgPrisma.address,
                city: orgPrisma.city,
                whatsapp: orgPrisma.whatsapp,
                latitude: orgPrisma.latitude.toNumber(),
                longitude: orgPrisma.longitude.toNumber(),
            },
            orgPrisma.id,
        )
    }

    async findById(id: string): Promise<Org | null> {
        const orgPrisma = await prisma.org.findUnique({
            where: {
                id,
            },
        })

        if (!orgPrisma) {
            return null
        }

        return new Org(
            {
                name: orgPrisma.name,
                email: orgPrisma.email,
                password_hash: orgPrisma.password_hash,
                address: orgPrisma.address,
                city: orgPrisma.city,
                whatsapp: orgPrisma.whatsapp,
                latitude: orgPrisma.latitude.toNumber(),
                longitude: orgPrisma.longitude.toNumber(),
            },
            orgPrisma.id,
        )
    }
}