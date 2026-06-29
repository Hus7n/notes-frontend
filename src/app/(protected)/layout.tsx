"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import {Spinner} from "@/components/ui/spinner";
import {Header} from "@/components/layout/header";

export default function ProtectedLayout({children}:{children : React.ReactNode}){
    const router = useRouter();
    const {user , loading} = useAuth();

    useEffect(() => {
        if(!loading && !user){
            router.replace("/login");
        }
    },[user , router , loading]);

    if(loading){
        return(
            <div className="flex min-h-screen items-center justify-center">
                <Spinner/>
            </div>
        )
    }

    if(!user)
        return null;

    return(
        <div className="min-h-screen">
            <Header/>
            <main className="mx-auto max-w-5xl px-4 py-8">
                {children}
            </main>
        </div>
    )
}