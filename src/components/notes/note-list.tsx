"use client";

import { Note } from "@/types";
import {EmptyState} from "@/components/ui/empty-state";
import { NoteCard } from "./note-card";

export function NoteList({notes , emptyTitle , emptyDescription} : 
    {notes : Note[] , emptyTitle : string , emptyDescription : string}){
        if(notes.length === 0){
            return <EmptyState title={emptyTitle} description = {emptyDescription}/>
        }

        return(
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {notes.map((note) => (
                    <NoteCard key={note.id} note={note}/>
                ))}
            </div>
        )
    }