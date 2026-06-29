"use client";
import {User} from "@/types";
import { createContext , useCallback, useContext, useEffect, useState  } from "react";
import { useRouter } from "next/navigation";
import { api, setAcccessToken } from "@/lib/api";

type AuthContextValue = {
    user : User | null ;
    loading : boolean ;
    login : (email : string , password : string) => Promise<void>;
    signup : (email : string , password : string , displayName : string) => Promise<void>;
    logout : () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children} : {children : React.ReactNode}){
    const [user , setUser] = useState<User | null>(null);
    const [loading , setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        api
        .refresh()
        .then((data) => {
            setAcccessToken(data.accessToken);
            setUser(data.user);
        })
        .catch(() =>{
            setUser(null);
            setAcccessToken(null);
        })
        .finally(() => {setLoading(false)});
    },[]);

    const login = useCallback(async(email : string, password : string) => {
        const data = await api.login({email , password});
        setAcccessToken(data.accessToken);
        setUser(data.user);
        router.push("/dashboard");
    },[router]);

    const logout = useCallback(async () => {
        await api.logout();
        setAcccessToken(null);
        setUser(null);
        router.push("/login");
    },[router]);

    const signup = useCallback(async(email : string , password : string , displayName : string) => {
        const data = await api.signup({email , password , displayName});
        setAcccessToken(data.accessToken);
        setUser(data.user);
        router.push("/dashboard");
    },[router]);

    return(
        <AuthContext.Provider value={{user , loading , login , signup , logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx)
        throw new Error("useAuth must be used within AuthProvider ");
    return ctx;
}
