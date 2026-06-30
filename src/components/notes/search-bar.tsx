"use client";
import {Input} from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBar({value , onChange} : 
    {value : string , onChange : (value : string) => void}){
        return(
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-4 w-4" />

        <Input 
        className="mb-2 max-w-2xl"
        placeholder = "Search by title , content or owner..."
        value = {value}
        onChange = {(e) => onChange(e.target.value)}
        />
        </div>
        );
    }