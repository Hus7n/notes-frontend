"use client";
import {z} from "zod";
import { useAuth } from "@/lib/auth-context";
import { signupSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {Input} from "@/components/ui/input";
import { Link } from "lucide-react";
import {Button} from "@/components/ui/button";

type FormData = z.infer<typeof signupSchema>;

export function SignupForm(){
    const {signup} = useAuth();
    const [error , setError] = useState("");
    const {
        register , handleSubmit , formState : {isSubmitting , errors},
    } = useForm<FormData>({ resolver : zodResolver(signupSchema)});

    async function onSubmit(data : FormData){
        setError("");
        try{
            await signup(data.email , data.password , data.displayName);
        }catch(e){
            setError(e instanceof Error ? e.message : "Signup failed");
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                    Name
                </label>
                <Input {...register("displayName")}/>
                {errors.displayName && (
                    <p className="mt-1 text-sm text-red-300">{errors.displayName.message}</p>
                )}
            </div>
            <div>
                <label className="mb-2 block text-sm font-medium text-white/80">Email</label>
                <Input type = "email" {...register("email")}/>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-white/80">Password</label>
                <Input type = "password" {...register("password")}/>
                {errors.password && (
                    <p className="mt-1 text-sm text-red-300">{errors.password.message}</p>
                )}
            </div>
            {error && <p className="text-sm text-red-300">{error}</p>}
            <Button type="submit" className="w-full" loading = {isSubmitting}>
                Create Account
            </Button>
                <p className="text-center text-sm text-glass-muted">
                    Already have an account ? {""}
                    <Link href = "/login" className = "text-white underline underline-offset-4 hover:text-violet-200">
                    Log In
                    </Link>
                </p>
        </form>
    )
}