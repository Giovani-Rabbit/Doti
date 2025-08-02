import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token?.accessToken) {
        return NextResponse.json({ error: "No access token" }, { status: 401 })
    }

    const response = NextResponse.json({ ok: true })

    response.cookies.set("access-token", token.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
    })

    return response
}
