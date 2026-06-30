"use client";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {Button} from "@/components/ui/button";
import { Plus } from "lucide-react";

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
        <div className="flex justify-start">
            <Button onClick ={handleCreate} loading = {loading} className="mb-2">
                <Plus className="mr-2 h-4 w-4"/>
            Create Note
        </Button>
        </div>
    )
}