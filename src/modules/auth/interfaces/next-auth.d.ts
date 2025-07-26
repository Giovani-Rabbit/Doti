import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            accessToken: string;
        };
        error?: string;
    }

    interface User {
        id: string;
        name: string;
        email: string;
        accessToken: string;
        accessTokenExpires: number;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        email: string;
        accessToken: string;
        accessTokenExpires: number;
        error?: string;
    }
}
