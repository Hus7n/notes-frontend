import Link from "next/link";
import {NoteEditor} from "@/components/notes/note-editor";

export default async function NotePage({params ,} : {params : Promise<{id : string}>}){

    const {id} = await params;

    return(
        <div className="space-y-5">
            <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-glass-muted transition hover:text-white">
                <span aria-hidden>←</span>
                Back to dashboard
            </Link>
            <NoteEditor noteId = {id}/>
        </div>
    )
}