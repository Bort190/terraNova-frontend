import {createContext, type PropsWithChildren, useContext, useState} from "react";
import {login} from "@/axios/Endpoints/login.ts";
import type {User} from "@/utils/testAuth.ts";

export type AuthContextType = {
    authToken: string | null;
    currentUser: User | null;
    handleLogin: ({email, password}: {email:string, password: string}) => Promise<void>;
    handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({children}: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    async function handleLogin({email, password}){
        try {
            const response = await login(email, password)
            const {authToken, user} = response[1];

            setAuthToken(authToken)
            setCurrentUser(user)
        } catch {
            setCurrentUser(null)
            setAuthToken(null)
        }
    }

    async function handleLogout() {
        setAuthToken(null)
        setCurrentUser(null)
    }

    return <AuthContext.Provider
        value={{authToken, currentUser, handleLogin, handleLogout}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used inside of a AuthProvider")
    }

    return context;
}
