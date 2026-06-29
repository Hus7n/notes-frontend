export default function AuthLayout({
    children,
} : {children : React.ReactNode}){
    return(
        <div className="flex min-h-screen items-centre justify-centre p-4">
            <div className="glass-strong w-full max-w-md rounded-3xl p-8 md:p-10">
                {children}
            </div>
        </div>
    )
}