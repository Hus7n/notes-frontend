"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links=[
    {href : "/dashboard" , label : "My notes"},
    {href : "/dashboard/shared" , label : "Shared with me"},
    {href : "/dashboard/pinned" , label : "Pinned"}
];

export function DashboardNav(){
    const pathname = usePathname();

    return(
        <nav className="glass-subtle inline-flex gap-2 rounded-2xl p-2">            
        {links.map((link) =>(
                <Link
                key={link.href}
                href={link.href}
                className = {cn(
                    "rounded-xl px-4 py-2.5 text-sm font-medium transition",
                    pathname === link.href
                    ?"glass-nav-active"
                    : "glass-nav-inactive" 
                )}>{link.label}</Link>
            ))}
        </nav>
    )
}