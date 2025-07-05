import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
    const token = await getToken({ req })

    // If no token, redirect to login
    if (!token) return NextResponse.redirect(new URL('/auth/signin', req.url))

    // If want to allow user to see the page
    if (token?.role === 'admmin') return NextResponse.redirect(new URL('/dashboard', req.url))

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard',
        '/admin'
    ]
}