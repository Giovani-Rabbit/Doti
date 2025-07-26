import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

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

                const account = await res.json();

                if (!account) {
                    console.log("Nao foi possivel pegar o usuario do body da requisicao");
                    return null;
                }

                console.log("authorization: ", account)

                return {
                    id: account.id,
                    name: account.name,
                    email: account.email,
                    accessToken: account.accessToken,
                    accessTokenExpires: Date.now() + (account.expires_in * 1000)
                };
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user, account }) {
            console.log(user, account)
            if (user && account) {
                console.debug("PRIMEIRO LOGIN");
                return { ...token, data: user };
            }

            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id
            return session
        },
    }
})

export { handler as GET, handler as POST }