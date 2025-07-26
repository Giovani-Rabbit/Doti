import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        const baseUrl = req.nextUrl.origin;

        console.log("CHECANDO-----------------------------")
        console.log(Date.now(), token?.data.accessTokenExpires)
        if (token && Date.now() >= token.data.accessTokenExpires) {
            const response = NextResponse.redirect(`${baseUrl}/api/auth/signin`);
            // Clear the session cookies
            response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
            response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });

            return response;
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token;
            }
        }
    }
);

export const config = {
    matcher: [
        '/app/:path*',
        '/admin/:path*',
        '/'
    ],
};