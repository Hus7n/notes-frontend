import { cn } from "@/lib/utils";

export function Textarea({className , ...props} :
    React.TextareaHTMLAttributes<HTMLTextAreaElement>){
        return(
            <textarea
            className={cn(
                "glass-input resize-none",className
            )}
            {...props}/>
        );
    }