import NextAuth, { UserObject } from "next-auth"
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";

const handler = NextAuth({
    pages: {
        signIn: "/sign-in"
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" }
            },

            async authorize(credentials) {
                const apiURL = process.env.NEXT_PUBLIC_API_URL;

                if (!credentials) return null;

                const requestCredentials = {
                    email: credentials.email,
                    password: credentials.password
                }

                const res = await fetch(`${apiURL}/sign-in`, {
                    method: 'POST',
                    body: JSON.stringify(requestCredentials),
                    headers: { "Content-Type": "application/json" }
                })

                if (!res.ok) return null;

                const jwtToken = res.headers.get("authorization");

                if (!jwtToken) {
                    console.log("Could not get request Token");
                    return null;
                }

                const user: UserObject = jwtDecode(jwtToken);

                if (!user) {
                    console.log("Could not get JWT user");
                    return null;
                }

                return {
                    id: jwtToken,
                    user: user,
                    accessToken: jwtToken,
                    validity: user.exp
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user && account) {
                return { ...token, data: user };
            }

            return { ...token, error: "AccessTokenError" } as JWT;
        },
        async session({ session, token }) {
            session.user = token.data.user;
            session.expires = token.data.validity;
            session.error = token.error;
            return session;
        },
    }
})

export { handler as GET, handler as POST }