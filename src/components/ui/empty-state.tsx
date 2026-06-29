
export function EmptyState({title , description} : {
    title : string , description : string
}){
    return(
        <div className="glass-subtle rounded-2xl border-dashed p-12 text-center">
            <h3 className="text-lg font-medium text-white">
                {title}
            </h3>
            <p className="mt-2 text-sm text-glass-muted">
                {description}
            </p>
        </div>
    )
}