"use client";

import { noteGlassColors , noteColorSwatches } from "@/lib/note-colors";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type {Note , NoteImage} from "@/types";
import { useNoteRealtime } from "@/hooks/use-note-realtime";
import {useAutoSave} from "@/hooks/use-auto-save";
import { Spinner } from "../ui/spinner";
import {motion} from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ImageGallery } from "./image-gallery";
import {ShareModal} from "./share-modal";

const colors = ["default" , "yellow" , "green" , "blue" , "pink" , "purple"] as const;

export function NoteEditor({noteId} : {noteId : string}) {
    const router = useRouter();
    const [note , setNote] = useState<Note | null>(null);
    const [title , setTitle] = useState("");
    const [content , setContent] = useState("");
    const [images , setImages] = useState<NoteImage[]>([]);
    const [loading , setLoading] = useState(true);
    const [shareOpen , setShareOpen] = useState(false);
    const [savedAt , setSavedAt] = useState<string | null>(null);

    
    const isOwner = note?.role === "owner";

    useEffect(() => {
        Promise.all([api.getNote(noteId) , api.getImages(noteId)])
        .then (([noteRes , imgRes]) => {
            setNote(noteRes.note);
            setTitle(noteRes.note.title);
            setContent(noteRes.note.content);
            setImages(imgRes.images);
        })
        .finally(() => setLoading(false));
    },[noteId]);

    const handleRealtimeUpdate = useCallback((updated : Note) => {
        setNote(updated);
        setTitle(updated.title)
        setContent(updated.content);
    },[]);

    useNoteRealtime(noteId , handleRealtimeUpdate , () => router.push("/dashboard"));

    useAutoSave(
        noteId,
        {title , content} ,
        isOwner ,
        () => setSavedAt(new Date().toLocaleTimeString())
    );

    async function togglePin(){
        if(!note || !isOwner) return;
        const updated = await api.updateNote(noteId , {is_pinned : !note.is_pinned});
        setNote(updated.note);
    }

    async function changeColor(color : string){
        if(!isOwner) return;
        const updated = await api.updateNote(noteId , {color});
        setNote(updated.note);
    }

    async function handleDelete(){
        if(!isOwner || !confirm("Delete this note?")) return;
        await api.deleteNote(noteId);
        router.push("/dashboard");
    }

    if(loading) return <Spinner/>;
    if(!note) return <p className="text-glass-muted">Note not found</p>;

    return(
        <motion.div
        initial = {{opacity : 0 , y : 12}}
        animate = {{opacity : 1 , y : 0}}
        className={cn("glass-strong rounded-3xl p-6 md:p-8",
        noteGlassColors[note.color] ?? noteGlassColors.default)}>
            <div className="mb-6 flex flex-wrap items-center gap-2">
                {isOwner && (
                    <>
                    <Button variant="secondary" onClick={togglePin}>
                        {note.is_pinned ? "Unpin" : "Pin"}
                    </Button>
                    <Button variant="secondary" onClick={() =>{setShareOpen(true)}}>
                        Share
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                    <div className="flex gap-2 rounded-xl border border-white/15  bg-white/5 p-1.5 backdrop-blur-sm">
                        {colors.map((c) => (
                            <button
                            key={c}
                            onClick={() => changeColor(c)}
                            className={cn("h-7 w-7 rounded-full border border-white/30 shadow-glass-sm backdrop-blur-sm transition hover:scale-110",
                                noteColorSwatches[c],
                                note.color === c && "ring-2 ring-white/80 ring-offset-2 ring-offset-transparent"
                            )}
                            title = {c}/>
                        ))}
                    </div>
                    </>
                )}
                {!isOwner && (
                    <span className="rounded-full border border-white/20  bg-white/10 px-3 py-1 text-sm text-white/70 backdrop-blur-sm">
                        View only - shared by owner</span>
                )}
                {savedAt && isOwner && (
                    <span className="ml-auto text-xs text-glass-subtle">Saved {savedAt}</span>
                )}
            </div>
            <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            readOnly = {!isOwner}
            className="mb-4 border-none bg-transparent px-0 text-2xl font-semibold shadow-none backdrop-blur-none placeholder:text-white/30 focus:border-none focus:bg-transparent"/>

            <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            readOnly = {!isOwner}
            rows={12}
            className="min-h-70 border-none bg-transparent px-0 shadow-none backdrop-blur-none placeholder:text-white/30 focus:border-none focus:bg-transparent"/>

            <div className="mt-8 border-t border-white/10 pt-6">
                <ImageGallery
                noteId={noteId}
                images={images}
                canEdit={isOwner}
                onChange={setImages}/>
            </div>

            <ShareModal noteId = {noteId} open = {shareOpen} onClose = {() => setShareOpen(false)}/>
        </motion.div>
    )


}