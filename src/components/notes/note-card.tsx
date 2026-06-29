"use client";

import { cn, formatDate } from "@/lib/utils";
import { noteGlassColors } from "@/lib/note-colors";
import { Note } from "@/types";
import {motion} from "framer-motion";
import Link from "next/link";

export function NoteCard({note} : {note : Note}){
    return(
        <motion.div 
        whileHover={{y : -4 , scale : 1.01}}
        transition={{duration : 0.2 , ease : "easeOut"}}>
            <Link 
            href={`/notes/${note.id}`}
            className={cn(
                "glass block rounded-2xl border p-5 shadow-glass transition hover:bg-white/15 hover:shadow-glass-lg",
                noteGlassColors[note.color] ?? noteGlassColors.default
            )}>
                <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-1 font-medium text-white">
                        {note.title || "Untitled"}
                    </h3>
                    {note.is_pinned && (
                        <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-white/80 backdrop-blur-sm">
                            Pinned
                            </span>
                    )}
                </div>
                <p className="mt-2 line-clamp-3 text-sm text-white/70">
                {note.content || "No content"}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-glass-subtle">
                    <span>{formatDate(note.updated_at)}</span>
                    {note.role === "viewer" && (
                        <span>by{note.owner_name || note.owner_email}</span>
                    )}
                </div>
            </Link>
        </motion.div>
    )
}