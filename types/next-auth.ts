import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null
            email?: string | null
            image?: string | null
            role: string | null
            allowedPaths?: string[]
        }
    }

    interface User {
        role: string | null
        allowedPaths?: string[]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: string | null
        allowedPaths?: string[]
    }
}
