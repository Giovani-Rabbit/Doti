import NextAuth from "next-auth";

declare module "next-auth" {
    export interface UserObject {
        id: number;
        email: string;
        name: string;
        exp: number;
    }

    interface Session {
        id: string;
        name: string;
        email: string;
        accessToken: string;
        exp: number;
        error?: string;
    }

    interface User {
        id: string;
        name: string;
        email: string;
        accessToken: string;
        validity: number;
    }
}

declare module "next-auth/jwt" {
    export interface JWT {
        id: string;
        name: string;
        email: string;
        accessToken: string;
        validity: number;
        error: "AccessTokenError";
    }
}
