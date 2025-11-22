import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    await prisma.pet.deleteMany()
    await prisma.org.deleteMany()

    console.log('🌱 Starting database seed...')

    const passwordHash = await hash('123456', 6)

    const orgSP = await prisma.org.create({
        data: {
            name: 'Adote Me SP',
            email: 'admin@adoteme.com',
            password_hash: passwordHash,
            address: 'Rua Augusta, 123',
            city: 'São Paulo',
            whatsapp: '11999999999',
            latitude: -23.55052,
            longitude: -46.633308,
        },
    })

    const orgRJ = await prisma.org.create({
        data: {
            name: 'Cão Feliz RJ',
            email: 'contato@caofeliz.com',
            password_hash: passwordHash,
            address: 'Av. Atlântica, 400',
            city: 'Rio de Janeiro',
            whatsapp: '21988888888',
            latitude: -22.906847,
            longitude: -43.172896,
        },
    })

    await prisma.pet.createMany({
        data: [
            {
                name: 'Alfredo',
                description: 'Um cachorro muito simpático',
                age: 'adult',
                size: 'medium',
                energyLevel: 'medium',
                independencyLevel: 'high',
                environment: 'indoor',
                org_id: orgSP.id,
                photos: ['https://images.unsplash.com/photo-1543466835-00a7907e9de1'],
            },
            {
                name: 'Jujuba',
                description: 'Gata brincalhona',
                age: 'puppy',
                size: 'small',
                energyLevel: 'high',
                independencyLevel: 'low',
                environment: 'indoor',
                org_id: orgSP.id,
                photos: ['https://images.unsplash.com/photo-1574158622682-e40e69881006'],
            },
        ],
    })

    await prisma.pet.create({
        data: {
            name: 'Thor',
            description: 'Pastor Alemão protetor',
            age: 'senior',
            size: 'large',
            energyLevel: 'low',
            independencyLevel: 'high',
            environment: 'spacious',
            org_id: orgRJ.id,
            photos: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95'],
        },
    })

    console.log('✅ Seed finished successfully!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })