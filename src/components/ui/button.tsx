import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>&{
    variant ?: "primary" | "secondary" | "ghost" | "danger";
    loading ?: boolean;
}
export function Button({
    className ,
    variant = "primary",
    loading ,
    children ,
    disabled ,
    ...props

}: ButtonProps){
    return(
        <button
        className={cn(
            "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:opacity-50",
            variant === "primary" && 
            "border border-white/30 bg-white/20 text-white shadow-glass-sm backdrop-blur-xl hover:bg-white/30",

            variant === "secondary" &&
            "border border-white/20 bg-white/10 text-white shadow-glass-sm backdrop-blur-xl hover:bg-white/20",

            variant === "ghost" &&
            "text-white/80 backdrop-blur-sm hover:border hover:border-white/15 hover:bg-white/10 hover:text-white",
            
            variant === "danger" &&
            "border border-red-400/30 bg-red-500/20 text-red-100 shadow-glass-sm backdrop-blur-xl hover:bg-red-500/30",
            className
        )}
        disabled={disabled || loading}
        {...props}>
            {loading ? "Loading..." : children}
        </button>
    )
}