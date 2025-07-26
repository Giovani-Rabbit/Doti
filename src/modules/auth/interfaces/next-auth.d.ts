import NextAuth from "next-auth";

declare module "next-auth" {
    export interface UserObject {
        id: number;
        email: string;
        name: string;
        exp: number;
    }

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
        user: UserObject;
        accessToken: string;
        validity: number;
    }
}

declare module "next-auth/jwt" {
    export interface JWT {
        data: User;
        error: "AccessTokenError";
    }
}
