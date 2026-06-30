"use client";
import {z} from "zod";
import { useAuth } from "@/lib/auth-context";
import { loginSchema } from "@/lib/validators";
import { useState } from "react";
import {useForm} from "react-hook-form";
import{zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import  Link  from "next/link";

type FormData =  z.infer<typeof loginSchema>;

export function LoginForm(){
    const {login} = useAuth();
    const [error , setError] = useState("");
    const {
        register , handleSubmit , formState : {isSubmitting},
    } = useForm<FormData>({ resolver : zodResolver(loginSchema) });

    async function onSubmit(data : FormData){
        setError("");
        try{
            await login(data.email , data.password);
        }catch(e){
            setError(e instanceof Error ? e.message : "Login failed");
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="mb-2 block text-sm font-medium text-white/80">Email</label>
                <Input type = "email" {...register("email")}/>
            </div>
            <div>
                <label className="mb-2 block text-sm font-medium text-white/80">Password</label>
                <Input type = "password" {...register("password")}/>
            </div>
            {error && <p className="text-sm text-red-300">{error}</p>}
            <Button type="submit" className=" mt-6 w-full" loading = {isSubmitting}>
                Log In
            </Button>
            <p className="mt-6 text-center text-sm text-glass-muted">
                Dont have an account?{" "}
                <Link href="/signup" 
                className = "font-medium text-white underline underline-offset-4 hover:text-violet-200">
                    Sign Up
                </Link>
            </p>
        </form>
    )

}
