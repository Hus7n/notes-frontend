"use client";
import { connectSocket } from "@/lib/socket";
import type {Note} from "@/types";
import { useEffect } from "react";

export function useNoteRealtime(noteId : string , onUpdate :
                                 (note : Note) => void ,
                                onDelete? : () => void){
        useEffect(() => {
            const socket = connectSocket();
            socket.emit("join:note" , noteId);

            const handleUpdate = (note : Note) => onUpdate(note);
            const handleDelete = () => onDelete?.();

            socket.on("note : updated" , handleUpdate);
            socket.on("note : deleted" , handleDelete);

            return () => {
                socket.emit("leave : note" , noteId);
                socket.off("note : updated" , handleUpdate);
                socket.off("note : deleted" , handleDelete);
            };
        },[noteId , onUpdate , onDelete]);
                        
}