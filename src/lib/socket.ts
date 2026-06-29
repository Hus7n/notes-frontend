import { io , type Socket } from "socket.io-client";
import { getAccessToken, getApiUrl } from "@/lib/api";

let socket : Socket | null = null;

export function getSocket(){
    if(!socket){
        socket = io(getApiUrl(),{
            autoConnect : false ,
            withCredentials : true,
        });
    }
            return socket;
}

export function connectSocket(){
    const s = getSocket();
    const token = getAccessToken();
    if(!token) return s;

    s.auth = {token};
    if(!s.connected) s.connect();
    return s;
}

export function disconnectSocket(){
    if(socket?.connected) socket.disconnect();
}
