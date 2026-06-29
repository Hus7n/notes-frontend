export type User = {
    id : string ;
    email : string ;
    displayName : string | null;
};

export type Note = {
    id : string ;
    owner_id : string ;
    title : string ;
    content : string ;
    color : string ;
    is_pinned : boolean ;
    created_at : string ;
    updated_at : string ;
    owner_email ?: string ;
    owner_name ?: string ;
    role ?: "owner" | "viewer";
};

export type NoteImage = {
    id : string ;
    note_id : string ;
    blob_url : string ;
    file_name : string ;
    mime_type : string ;
    size_bytes : number ;
    sort_order : number ;
    created_at : string ;
};

export type Share = {
    id : string ;
    created_at : string ;
    user : {
        id : string ;
        email : string ;
        displayName : string | null ;
    };
};