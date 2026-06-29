"use client";
import {Input} from "@/components/ui/input";

export function SearchBar({value , onChange} : 
    {value : string , onChange : (value : string) => void}){
        return(
        <Input 
        placeholder = "Search by title , content or owner..."
        value = {value}
        onChange = {(e) => onChange(e.target.value)}/>
        );
    }