"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useSession } from "next-auth/react"

const AuthTokenContext = createContext<string | null>(null)

interface AuthTokenProviderProps {
    children: ReactNode
}

export function AuthTokenProvider({ children }: AuthTokenProviderProps) {
    const { data: session } = useSession()
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if (session?.accessToken) {
            setToken(session.accessToken)
        } else {
            setToken(null)
        }
    }, [session]);

    return (
        <AuthTokenContext.Provider value={token} >
            {children}
        </AuthTokenContext.Provider>
    )
}

export function useAuthToken(): string | null {
    return useContext(AuthTokenContext)
}
