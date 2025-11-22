# Find A Friend API

REST API for a pet adoption system, built with Node.js, Fastify, and TypeScript. The project follows SOLID principles and utilizes TDD (Test Driven Development).

## 🚀 Technologies

- Node.js (v22)
- TypeScript
- Fastify
- Vitest
- Prisma ORM
- PostgreSQL
- Docker

## 📋 Project Requirements

### Functional Requirements (FRs)

- [x] It must be possible to register a pet.
- [x] It must be possible to list all available pets for adoption in a specific city.
- [x] It must be possible to filter pets by their characteristics (age, size, energy level, independence level, environment).
- [x] It must be possible to view details of a specific pet.
- [x] It must be possible to register an organization (ORG).
- [x] It must be possible to authenticate as an organization (ORG).

### Business Rules (BRs)

- [x] The city is required to list pets.
- [x] An ORG must have an address and a WhatsApp number.
- [x] A pet must be linked to an ORG.
- [x] The user interested in adoption will contact the ORG directly via WhatsApp.
- [x] All filters, besides the city, are optional.
- [ ] To access admin routes (like registering a pet), the ORG must be logged in.