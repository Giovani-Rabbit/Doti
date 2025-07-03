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

                const jwtToken = res.headers.get("authorization");

                if (!jwtToken) {
                    console.log("Nao foi possivel pegar o token da requisicao");
                    return null;
                }

                const account = await res.json();

                if (!account) {
                    console.log("Nao foi possivel pegar o usuario do body da requisicao");
                    return null;
                }

                return { ...account, accessToken: jwtToken };
            }
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            console.log(token, account)
            if (account) {
                token.accessToken = account.access_token;
                token.id = account.id;
            }

            return token;
        },
    }
})

export { handler as GET, handler as POST }