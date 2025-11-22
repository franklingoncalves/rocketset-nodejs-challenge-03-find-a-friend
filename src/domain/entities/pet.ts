import { randomUUID } from 'node:crypto'

export enum PetAge {
    PUPPY = 'puppy',
    YOUNG = 'young',
    ADULT = 'adult',
    SENIOR = 'senior',
}

export enum PetSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export enum PetEnergyLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    VERY_HIGH = 'very_high',
}

export enum PetEnvironment {
    INDOOR = 'indoor',
    OUTDOOR = 'outdoor',
    SPACIOUS = 'spacious',
}

export enum PetIndependencyLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export interface PetProps {
    orgId: string
    name: string
    description?: string
    age: PetAge
    size: PetSize
    energyLevel: PetEnergyLevel
    independencyLevel: PetIndependencyLevel
    environment: PetEnvironment
    photos?: string[]
}

export class Pet {
    private _id: string
    private props: PetProps

    constructor(props: PetProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = {
            ...props,
            photos: props.photos ?? [],
        }
    }

    get id() { return this._id }
    get orgId() { return this.props.orgId }
    get name() { return this.props.name }
    get description() { return this.props.description }
    get age() { return this.props.age }
    get size() { return this.props.size }
    get energyLevel() { return this.props.energyLevel }
    get independencyLevel() { return this.props.independencyLevel }
    get environment() { return this.props.environment }
    get photos() { return this.props.photos }
}