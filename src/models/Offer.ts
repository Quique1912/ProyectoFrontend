export default interface Offer{
    id: number
    title: string
    description?: string
    active: boolean
    contactEmail?:string
    location?:string
    published: string
    expired:string
    idCategory?: number | null
}