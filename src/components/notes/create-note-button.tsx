"use client";

import { api } from "@/lib/api";
import { useRouter } from "next/router";
import { useState } from "react";
import {Button} from "@/components/ui/button";

export function CreateNoteButton(){
    const router = useRouter();
    const [loading , setLoading] = useState(false);

    async function handleCreate(){
        setLoading(true);
        try{
            const {note} = await api.createNote();
            router.push(`/notes/${note.id}`);
        }finally{
            setLoading(false);
        }
    }

    return(
        <Button onClick ={handleCreate} loading = {loading}>
            New Note
        </Button>
    )
}