"use client";

import { useAuth } from "@/lib/auth-context";
import {Button} from "@/components/ui/button";

export function Header(){
    const{user , logout} = useAuth();

    return(
        <header className="sticky top-0 z-40 border-b border-white/10 bg-white/5 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-sm font-bold shadow-glass-sm backdrop-blur-xl">
            N
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-white">Notes</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-glass-muted sm:inline">{user?.email}</span>
          <Button variant="ghost" onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </div>
    </header>
    )
}