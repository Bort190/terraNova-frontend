import {createContext, type PropsWithChildren, useContext, useEffect, useState} from "react";
import {login} from "@/axios/Endpoints/login.ts";
import api from "@/axios/client.ts";

export type AuthContextType = {
    currentUser: User | null;
    isLoading: boolean;
    handleLogin: ({email, password}: { email: string, password: string }) => Promise<User | null>;
    handleLogout: () => Promise<void>;
}

type User = {
    id: number;
    email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({children}: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await api.get('/user');
                setCurrentUser(res.data);
            } catch {
                setCurrentUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        void fetchUser();
    }, []);

    async function handleLogin({email, password}: { email: string, password: string }) {
        try {
            const {success, user} = await login(email, password)

            if (success) {
                setCurrentUser(user)
                return user;
            }
            return null;
        } catch {
            setCurrentUser(null)
        }
    }

    async function handleLogout() {
        try {
            await api.get('/logout')
        } catch (error) {
            console.error(error)
        } finally {
            setCurrentUser(null);
        }
    }

    return <AuthContext.Provider
        value={{currentUser, isLoading, handleLogin, handleLogout}}>
        {children}
    </AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used inside of a AuthProvider")
    }

    return context;
}
