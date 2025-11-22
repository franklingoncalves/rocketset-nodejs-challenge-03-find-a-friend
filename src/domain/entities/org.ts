import { randomUUID } from 'node:crypto'

export interface OrgProps {
    name: string
    email: string
    password_hash: string
    address: string
    city: string
    whatsapp: string
    latitude: number  // <--- Novo
    longitude: number // <--- Novo
}

export class Org {
    private _id: string
    private props: OrgProps

    constructor(props: OrgProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = props
    }

    get id() { return this._id }
    get name() { return this.props.name }
    get email() { return this.props.email }
    get password_hash() { return this.props.password_hash }
    get address() { return this.props.address }
    get city() { return this.props.city }
    get whatsapp() { return this.props.whatsapp }
    get latitude() { return this.props.latitude }
    get longitude() { return this.props.longitude }
}