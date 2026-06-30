export default function AuthLayout({
    children,
} : {children : React.ReactNode}){
    return(
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="glass-strong w-full max-w-md rounded-3xl p-8 md:p-10">
                {children}
            </div>
        </div>
    )
}