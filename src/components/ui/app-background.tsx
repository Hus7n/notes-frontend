
export function Appbackground(){
    return(
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-blur from-indigo-950 via-violet-900 to-slate-900"/>
            <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl"/>
            <div className="absolute right-0 top-1/4 h-[112] w-[md] rounded-full bg-indigo-500/25 blur-3xl"/>
            <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"/>
            <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl"/>
        </div>
    )
}