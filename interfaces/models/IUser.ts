export interface IUser {
    name: string
    email: string
    image?: string
    password: string
    isActive?: boolean
    allowedPaths?: string[]
    role: string
}