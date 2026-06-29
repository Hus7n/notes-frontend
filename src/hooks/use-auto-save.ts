"use client";
import { api } from "@/lib/api";
import { useCallback, useEffect, useRef } from "react";

export function useAutoSave(noteId : string , values : {title : string , content : string} , enabled : boolean , onSaved?: () => void){

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastSavedRef = useRef(values);

    const save = useCallback(async () => {
        if(!enabled) return;
        await api.updateNote(noteId , values);
        lastSavedRef.current = values;
        onSaved?.();
    },[noteId , values , enabled ,onSaved]);

    useEffect(() =>{
        if(!enabled) return;

        const changed = values.title !== lastSavedRef.current.title ||
                        values.content !== lastSavedRef.current.content;

        if(!changed) return;

        if(timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(save , 600);

        return () => {
            if(timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    },[values , save , enabled]);

    return {saveNow : save};
}