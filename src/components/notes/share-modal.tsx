"use client";

import {z} from "zod";
import { shareSchema } from "@/lib/validators";
import { useEffect, useState } from "react";
import type { Share } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { api } from "@/lib/api";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UserPlus, UserRoundPlus } from "lucide-react";

type FormData = z.infer<typeof shareSchema>

export function ShareModal({
    noteId ,
    open ,
    onClose ,
} : {
    noteId : string;
    open : boolean;
    onClose : () => void
}) {
    const [shares , setShares] = useState<Share[]>([]);
    const [error , setError] = useState("");
    const{
        register ,
        handleSubmit ,
        reset ,
        formState : {isSubmitting} ,
    } = useForm<FormData>({resolver : zodResolver(shareSchema)});

    useEffect(() => {
        if(open){
            api.getShares(noteId).then((data) => setShares(data.shares));
        }
    },[open , noteId]);

    async function onSubmit(data : FormData){
        setError("");
        try{
            await api.shareNote(noteId , data.email);
            const updated = await api.getShares(noteId);
            setShares(updated.shares);
            reset();
        }catch(e){
            setError(e instanceof Error ? e.message : "Failed to share");
        }
    } 

    async function revoke(shareId : string){
        await api.revokeShare(noteId , shareId);
        const updated = await api.getShares(noteId);
        setShares(updated.shares);
    }

    if(!open) return null;

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="glass-strong w-full max-w-md rounded-3xl p-6 shadow-glass-lg md:p-8">
                <div className="mb-6 flex items-center justify-between">
                    <UserPlus />
                    <h2 className="text-lg font-semibold text-white">Share note</h2>
                    <button onClick={onClose}
                    className="rounded-lg px-2 py-1 text-sm text-glass-muted transition hover:bg-white/10 hover:text-white">
                        Close</button>
                </div>

                <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Recipient email" {...register("email")}/>
                    <Button type="submit" loading = {isSubmitting}>
                        <UserRoundPlus/>
                        Share</Button>
                </form>
                {error && <p className="mt-2 text-sm text-red-300">{error}</p>}

                <ul className="mt-6 space-y-2">
                    {shares.map((share) => (
                        <li key={share.id}
                        className="glass-subtle flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/90">
                            <span>{share.user.email}</span>
                            <Button variant="ghost" onClick={() => revoke(share.id)}>
                                Revoke
                            </Button>
                        </li>
                    ))}
                    {shares.length === 0 && (
                        <p className="text-sm text-glass-muted">Not shared with anyone yet</p>
                    )}
                </ul>
            </div>
        </div>
    )
}