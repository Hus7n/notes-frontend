"use client";

import { api } from "@/lib/api";
import { NoteImage } from "@/types";
import { useState , useRef } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

export function ImageGallery({
noteId ,
images ,
canEdit ,
onChange ,
}:{
    noteId : string ;
    images : NoteImage[];
    canEdit : boolean ;
    onChange : (images : NoteImage[]) => void;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading , setUploading] = useState(false);

    async function handleUpload(file : File){
        setUploading(true);
        try{
            const {image} = await api.uploadImage(noteId , file);
            onChange([...images , image]);
        }finally{
            setUploading(false);
        }
    }

    async function handleDelete(imageId : string){
        await api.deleteImage(noteId , imageId);
        onChange(images.filter((img) => img.id !== imageId));
    }

    function imageSrc(url : string){
        if(url.startsWith("http")) return url;
        return `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}${url}`;
    } 

    return(
        <div className="space-y-4">
            {canEdit && (
                <>
                <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if(file) handleUpload(file);
                }}/>
                <Button
                variant="secondary"
                loading={uploading}
                onClick={() => inputRef.current?.click()}
                >
                    <ImagePlus/>
                    Upload Image
                </Button>
                </>
            )}

            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {images.map((img) => (
                        <div key={img.id}
                         className="glass-subtle relative overflow-hidden rounded-1xl">
                            <Image
                            src = {imageSrc(img.blob_url)}
                            alt = {img.file_name}
                            width = {300}
                            height = {200}
                            className ="h-32 w-full object-cover"
                            unoptimized/>
                            {canEdit && (
                                <button
                                onClick={() => handleDelete(img.id)}
                                className="absolute right-2 top-2 rounded-lg border border-white/20 bg-black/40 px-2 py-1 text-xs text-white backdrop-blur-md transition hover:bg-red-500/40">
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}