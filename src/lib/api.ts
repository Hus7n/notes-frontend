
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:4000";

let accessToken : string | null = null ;
let refreshPromise : Promise<string | null> | null = null ;

export  function setAcccessToken(token : string | null){
    accessToken = token;
}

export function getAccessToken(){
    return accessToken;
}

async function refreshAccessToken() : Promise<string | null> {
    if(!refreshPromise){
        refreshPromise = fetch(`${API_URL}/api/auth/refresh` ,{
            method : "POST" ,
            credentials : "include",
        })
        .then(async (res) => {
            if(!res.ok) return null;
            const data = await res.json();
            accessToken = data.accessToken;
            return data.accessToken as string;
        })
        .finally(() =>{
            refreshPromise = null;
        });
    }
    return refreshPromise;
}

export async function apiFetch<T>(path:string , options : RequestInit = {}) : Promise<T> {
    const headers = new Headers(options.headers);

    if(accessToken){
        headers.set("Authorization" , `Bearer ${accessToken}`);
    }

    if(!(options.body instanceof FormData)) {
        headers.set("Content-Type" , "application / json");
    }

    let res = await fetch(`${API_URL}${path}` , {
        ...options,
        headers,
        credentials : "include",
    });

    if(res.status === 401 && !path.includes("/auth/")) {
        const newToken = await refreshAccessToken();
        if(newToken){
            headers.set("Authorization" , `Bearer ${newToken}`);
            res = await fetch(`${API_URL}${path}`,{
                ...options,
                headers,
                credentials : "include",
            });
        }
    }

    if(!res.ok){
        const err = await res.json().catch(() =>({
            error : "Request failed"
        }));
        throw new Error(err.error ?? "Request failed");
    }

    if(res.status === 204) return undefined as T;
    return res.json();
}

export const api = {
    signup:(body : { 
        email : string ; 
        password : string ;
        displayName : string }) =>
    apiFetch<{
        accessToken : string ;
        user : import("@/types").User
    }>(
        "/api/auth/signup",
        {method : "POST" , body : JSON.stringify(body)}
    ),

    login:(body : {
        email : string ;
        password : string ;
    }) =>
        apiFetch<{
            accessToken : string ;
            user : import("@/types").User
        }>(
            "/api/auth/login",
            {method : "POST " , body : JSON.stringify(body)}
        ),

    logout: () =>
        apiFetch<{ok : boolean}>(
            "/api/auth/logout",
            {method : "POST"}
        ),

    me: () =>
        apiFetch<{user : import("@/types").User}>("/api/auth/me"),

    refresh : () =>
        apiFetch<{
            accessToken : string ;
            user : import("@/types").User
        }>(
            "/api/auth/refresh",
            {method : "POST"}
        ),

    getNotes : (params?: {q?: string ; section ?: string}) => {
        const search = new URLSearchParams();
        if(params?.q)
            search.set("q" , params.q);

        if(params?.section)
            search.set("section" , params.section);

        const qs = search.toString();
        return apiFetch<{ notes : import("@/types").Note[]}>(
            `/api/notes ${qs ? `?${qs}` : ""}`
        );
    },

    getNote :(id : string) =>
        apiFetch<{note : import("@/types").Note}>(`/api/notes/${id}`),

    createNote : () =>
        apiFetch<{
            note : import("@/types").Note
        }>("/api/notes",{
            method : "POST",
            body : JSON.stringify({title : "Untitled" , content : ""}),
        }),

    updateNote : (
        id : string ,
        body : Partial <{
        title : string ;
        content : string ;
        color : string ;
        is_pinned : boolean;
        }>
    ) => 
        apiFetch<{note : import("@/types").Note}>(`/api/notes/${id}`,{
            method : "POST",
            body : JSON.stringify(body),
        }),

    deleteNote:(id: string) =>
        apiFetch<{ok : boolean}>(`/api/notes/${id}` , {method : "DELETE"}),

    getShares : (noteId : string) =>
        apiFetch<{shares : import("@/types").Share[]}>(
            `/api/notes/${noteId}/shares`
        ),

    shareNote : (noteId : string , email : string) =>
        apiFetch<{share : unknown}>(`/api/notes/${noteId}/shares`,{
            method : "POST" ,
            body : JSON.stringify({email}),
        }),

    revokeShare : (noteId : string , shareId : string) =>
        apiFetch<{ok : boolean}>(`/api/notes/${noteId}/shares/${shareId}`,{
            method : "DELETE",
        }),

    getImages : (noteId : string) =>
        apiFetch<{images : import("@/types").NoteImage[]}>(
            `/api/notes/${noteId}/images`
        ),

    uploadImage : (noteId : string , file : File) =>{
        const form = new FormData();
        form.append("image",file);
        return apiFetch<{image : import("@/types").NoteImage}>(
            `/api/notes/${noteId}/images`,
            {method : "POST" , body : form}
        );
    },

    deleteImage :(noteID : string , imageId : string) =>
        apiFetch<{ok : boolean}>(`/api/notes/${noteID}/images/${imageId}`,{
            method : "DELETE",
        }),
};

export function getApiUrl(){
    return API_URL;
}