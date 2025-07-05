import { compare } from "bcryptjs"
import NextAuth, { AuthOptions } from "next-auth"

import User from "@/models/User"
import dbConnect from "@/lib/mongoose"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                await dbConnect()

                const user = await User.findOne({ email: credentials?.email })

                if (!user) throw new Error('User not found')
                if (!user.password) throw new Error('User has no password')

                const isPasswordValid = await compare(credentials!.password, user.password)
                if (!isPasswordValid) throw new Error('Invalid password')

                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user?.image,
                    allowedPaths: user?.allowedPaths
                }
            }
        })
    ],

    session: {
        strategy: 'jwt',
        maxAge: 3 * 60 * 60
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.allowedPaths = user.allowedPaths
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string
                session.user.allowedPaths = token.allowedPaths as string[]
            }

            return session
        },
    },

    pages: {
        signIn: '/',
        error: '/sign-in'
    },

    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)